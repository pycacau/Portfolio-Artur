import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, rmSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import worker from '../server/index.js';
import { fixture } from './review-fixture.js';
import { composeFeedbacks, loadReviews } from '../frontend/src/lib/reviews.js';
import { feedbackExamples } from '../frontend/src/data/feedbackExamples.js';
function submission(fields = {}, options = {}) {
  const data = new FormData();
  const requestId = crypto.randomUUID();
  const defaults = { name: `Pessoa do teste ${requestId}`, rating: '5', comment: 'Avaliação de teste local; nunca publicada no site.', projectName: 'Projeto de teste', projectUrl: 'https://example.test/project', requestId, consent: 'true' };
  for (const [key, value] of Object.entries({ ...defaults, ...fields })) data.set(key, value);
  return new Request('https://portfolio.test/api/reviews', { method: 'POST', body: data, headers: { Origin: options.origin || 'https://portfolio.test', ...(options.ip ? { 'CF-Connecting-IP': options.ip } : {}) } });
}
const get = path => new Request(`https://portfolio.test${path}`);
test('replacement retains 20 slots until 20 real reviews, then grows with all real reviews', () => {
  assert.equal(feedbackExamples.length, 20);
  for (const count of [0,1,19,20,21,125]) {
    const real = Array.from({ length: count }, (_, i) => ({ id: `real-${i}`, name: `Test ${i}`, rating: 1 + i % 5, text: 'Local test', isExample: false }));
    const rows = composeFeedbacks(real, feedbackExamples);
    assert.equal(rows.length, Math.max(20, count));
    assert.equal(rows.filter(row => !row.isExample).length, count);
    assert.equal(rows.filter(row => row.isExample).length, Math.max(20-count,0));
    assert.deepEqual(rows.slice(0,count),real);
  }
});
test('anonymous submission, genuine 1-5 star ratings, idempotency and persistent SQL across restart', async () => {
  const directory = mkdtempSync(join(tmpdir(),'artur-reviews-')); const file = join(directory,'reviews.sqlite');
  let f = fixture(file); const requestId = crypto.randomUUID();
  try {
    const sent = await worker.fetch(submission({ requestId, rating:'2', name:'Ana do teste', comment:'Bom atendimento. Tenho sugestões para melhorar.' }), f.env);
    assert.equal(sent.status,201);const payload=await sent.json();assert.equal(payload.review.rating,2);
    const repeat = await worker.fetch(submission({ requestId }), f.env);assert.equal((await repeat.json()).review.id,payload.review.id);
    f.sqlite.close(); f=fixture(file,false);
    const list=await worker.fetch(get('/api/reviews'),f.env);const data=await list.json();assert.equal(data.total,1);assert.equal(data.items[0].name,'Ana do teste');assert.equal(data.items[0].rating,2);assert.equal(data.items[0].isExample,false);
  } finally {f.sqlite.close();rmSync(directory,{recursive:true,force:true});}
});
test('duplicate names ignore casing, accents and extra spaces, including older reviews without changing them', async () => {
  const f = fixture(':memory:', false);
  try {
    f.sqlite.exec(readFileSync('drizzle/0000_curved_prowler.sql', 'utf8'));
    const id = crypto.randomUUID(), requestId = crypto.randomUUID();
    f.sqlite.prepare('INSERT INTO reviews (id, request_id, name, rating, comment, project_name, project_url, photo_key, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)').run(id, requestId, 'Artur Maciel', 5, 'Comentário de teste que deve ser preservado.', 'Meu portfólio', 'https://example.test/', `review-photos/${id}`, 1000);
    const before = f.sqlite.prepare('SELECT * FROM reviews WHERE id = ?').get(id);
    f.sqlite.exec(readFileSync('drizzle/0001_dizzy_ricochet.sql', 'utf8'));
    for (const name of ['Artur Maciel', 'ARTUR MACIEL', '  Ártur   Maciél  ', 'Artur\tMaciel']) {
      const response = await worker.fetch(submission({ name }), f.env);
      assert.equal(response.status, 409);
      assert.match((await response.json()).error, /Já existe uma avaliação com esse nome/);
    }
    const repeat = await worker.fetch(submission({ requestId, name: 'Artur Maciel' }), f.env);
    assert.equal(repeat.status, 201); assert.equal((await repeat.json()).review.id, id);
    const after = f.sqlite.prepare('SELECT * FROM reviews WHERE id = ?').get(id);
    assert.equal(after.name_key, null); delete after.name_key; assert.deepEqual(after, before);
    const newReview = await worker.fetch(submission({ name: 'João da Silva' }), f.env);
    assert.equal(newReview.status, 201);
    const duplicate = await worker.fetch(submission({ name: '  JOAO   DA SILVA ', photo: new Blob(['invalid'], {type:'image/png'}) }), f.env);
    assert.equal(duplicate.status, 409); assert.equal(f.objects.size, 0);
    assert.equal(f.sqlite.prepare('SELECT COUNT(*) AS total FROM reviews').get().total, 2);
  } finally { f.sqlite.close(); }
});
test('different simultaneous requests for the same normalized name save only one review and photo', async () => {
  const f = fixture();
  try {
    const photo = new Blob([new Uint8Array([255,216,255,0])], {type:'image/jpeg'});
    const responses = await Promise.all([
      worker.fetch(submission({name:'Arthur Maciel', photo}), f.env),
      worker.fetch(submission({name:'  ARTHUR   MACIÉL ', photo}), f.env),
    ]);
    assert.deepEqual(responses.map(response => response.status).sort(), [201,409]);
    assert.equal(f.sqlite.prepare('SELECT COUNT(*) AS total FROM reviews').get().total, 1);
    assert.equal(f.sqlite.prepare('SELECT name_key FROM reviews').get().name_key, 'arthur maciel');
    assert.equal(f.objects.size, 1);
  } finally { f.sqlite.close(); }
});
test('invalid fields, consent, URL schemes, request types, origin and honeypot are rejected without saving', async () => {
  const f=fixture();
  for (const fields of [{name:'A'},{rating:'0'},{rating:'6'},{rating:'3.5'},{comment:'curto'},{comment:'x'.repeat(1501)},{consent:'false'},{projectUrl:'javascript:alert(1)'},{projectUrl:'https://user:password@example.test'},{companyWebsite:'spam'},{requestId:'invalid'}]) {const r=await worker.fetch(submission(fields),f.env);assert.equal(r.status,400);}
  assert.equal((await worker.fetch(submission({}, {origin:'https://other.test'}),f.env)).status,403);
  assert.equal((await worker.fetch(new Request('https://portfolio.test/api/reviews',{method:'POST',body:'{}'}),f.env)).status,400);
  assert.equal((await (await worker.fetch(get('/api/reviews'),f.env)).json()).total,0);f.sqlite.close();
});
test('photo bytes persist separately, are served with image headers, and forged/oversized files are rejected', async () => {
  const f=fixture();const photo=new Blob([Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+a5l8AAAAASUVORK5CYII=','base64')],{type:'image/png'});
  const sent=await worker.fetch(submission({photo}),f.env);assert.equal(sent.status,201);const item=(await sent.json()).review;assert(item.photoUrl);assert.equal(f.objects.size,1);
  const response=await worker.fetch(get(item.photoUrl),f.env);assert.equal(response.status,200);assert.equal(response.headers.get('Content-Type'),'image/png');assert.deepEqual(new Uint8Array(await response.arrayBuffer()),new Uint8Array(await photo.arrayBuffer()));
  for(const bad of [new Blob(['<svg/>'],{type:'image/png'}),new Blob([new Uint8Array(1024*1024+1)],{type:'image/png'})])assert.equal((await worker.fetch(submission({photo:bad}),f.env)).status,400);
  assert.equal(f.objects.size,1);f.sqlite.close();
});
test('storage failures return recoverable errors, orphaned photos are cleaned, and missing API routes never return SPA HTML',async()=>{
 const f=fixture();assert.equal((await worker.fetch(get('/api/reviews'),{})).status,503);
 const old=f.env.DB;f.env.DB={...old,prepare(sql){if(sql.startsWith('INSERT INTO reviews'))throw new Error('simulated local write failure');return old.prepare(sql)}};
 const photo=new Blob([new Uint8Array([255,216,255,0])],{type:'image/jpeg'});const response=await worker.fetch(submission({photo}),f.env);assert.equal(response.status,503);assert.equal(f.objects.size,0);
 assert.equal((await worker.fetch(get('/api/missing'),f.env)).status,404);
 assert.equal((await worker.fetch(get('/avaliar'),f.env)).status,200);f.sqlite.close();
});
test('concurrent retries save only once; rate limit rejects excess submissions; frontend reads every page',async()=>{
 const f=fixture();const requestId=crypto.randomUUID();const results=await Promise.all([worker.fetch(submission({requestId}),f.env),worker.fetch(submission({requestId}),f.env)]);assert(results.every(r=>r.status===201));assert.equal((await (await worker.fetch(get('/api/reviews'),f.env)).json()).total,1);
 for(let i=0;i<5;i++)assert.equal((await worker.fetch(submission({}, {ip:'192.0.2.15'}),f.env)).status,201);
 assert.equal((await worker.fetch(submission({}, {ip:'192.0.2.15'}),f.env)).status,429);
 for(let i=0;i<101;i++)assert.equal((await worker.fetch(submission(),f.env)).status,201);
 const first=await (await worker.fetch(get('/api/reviews'),f.env)).json();assert.equal(first.items.length,100);assert.equal(first.nextCursor,'100');
 const originalFetch=globalThis.fetch;globalThis.fetch=url=>worker.fetch(get(url),f.env);
 try {const rows=await loadReviews();assert.equal(rows.length,107);assert.equal(new Set(rows.map(r=>r.id)).size,107);}finally{globalThis.fetch=originalFetch;f.sqlite.close();}
});
