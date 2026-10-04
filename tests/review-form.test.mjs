import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import worker from '../server/index.js';
import { fixture } from './review-fixture.js';
const require = createRequire(resolve('frontend/package.json'));
const {JSDOM} = require('jsdom'), babel = require('@babel/core');
const dom = new JSDOM('<div id="root"></div>', {url:'https://portfolio.test/avaliar',pretendToBeVisual:true});
const OriginalFormData=globalThis.FormData, originalFetch=globalThis.fetch;
Object.assign(globalThis,{window:dom.window,document:dom.window.document,HTMLElement:dom.window.HTMLElement,SVGElement:dom.window.SVGElement,NodeList:dom.window.NodeList,Element:dom.window.Element,Node:dom.window.Node,getComputedStyle:dom.window.getComputedStyle,requestAnimationFrame:dom.window.requestAnimationFrame.bind(dom.window),cancelAnimationFrame:dom.window.cancelAnimationFrame.bind(dom.window),FormData:dom.window.FormData,IS_REACT_ACT_ENVIRONMENT:true});
window.matchMedia=()=>({matches:false,addListener(){},removeListener(){},addEventListener(){},removeEventListener(){}});
const React=require('react'),{act}=React,router=require('react-router-dom');
const cache=new Map();
function load(file){if(cache.has(file))return cache.get(file).exports;const module={exports:{}};cache.set(file,module);const code=babel.transformSync(readFileSync(file,'utf8'),{presets:[require.resolve('@babel/preset-env'),require.resolve('@babel/preset-react')],babelrc:false,configFile:false}).code;new Function('require','module','exports',code)(name=>name.endsWith('.css')?{}:name.startsWith('@/')?load(resolve('frontend/src',name.slice(2))+(name.includes('useReviews')?'.js':name.includes('reviews')||name.includes('feedbackExamples')?'.js':'.jsx')):require(name),module,module.exports);return module.exports;}
test('actual React form preserves fields on failed request, submits without login, shows success and feeds animated real reviews',async()=>{
 const f=fixture(),root=require('react-dom/client').createRoot(document.getElementById('root'));let fail=true,postedIds=[];
 globalThis.fetch=async(url,options={})=>{if(options.method==='POST'){postedIds.push(options.body.get('requestId'));if(fail)throw new Error('Conexão interrompida.');const data=new OriginalFormData();for(const [key,value] of options.body.entries())data.set(key,value);return worker.fetch(new Request(`https://portfolio.test${url}`,{method:'POST',body:data,headers:{Origin:'https://portfolio.test'}}),f.env);}return worker.fetch(new Request(`https://portfolio.test${url}`),f.env);};
 try {
  const Review=load(resolve('frontend/src/pages/Review.jsx')).default;
  await act(async()=>root.render(React.createElement(router.MemoryRouter,null,React.createElement(Review))));
  assert.equal(document.querySelectorAll('.review-rating input[type=radio]').length,5);
  const name=document.getElementById('review-name'),comment=document.getElementById('review-comment');name.value='Ana de teste local';comment.value='Gostei da experiência. Este envio é somente um teste local.';document.getElementById('review-url').value='https://example.test/project';
  await act(async()=>document.querySelector('input[type=radio][value="4"]').click());document.querySelector('[name=consent]').checked=true;
  const submit=async()=>act(async()=>document.querySelector('form').dispatchEvent(new window.Event('submit',{bubbles:true,cancelable:true})));
  await submit();assert(document.querySelector('[role=alert]').textContent.includes('Conexão'));assert.equal(name.value,'Ana de teste local');assert(comment.value.includes('teste local'));assert.equal(document.querySelector('[name=rating]:checked').value,'4');assert.equal(document.querySelector('button[type=submit]').disabled,false);
  fail=false;await submit();for(let i=0;i<50&&!document.querySelector('.review-success');i++)await act(async()=>new Promise(r=>setTimeout(r,20)));assert.equal(document.querySelectorAll('form').length,0);assert(document.querySelector('.review-success').textContent.includes('Ana de teste local'));assert.equal(postedIds[0],postedIds[1]);assert.equal((await f.env.DB.prepare('SELECT COUNT(*) AS total FROM reviews').first()).total,1);
  const Testimonials=load(resolve('frontend/src/components/Testimonials.jsx')).default;await act(async()=>root.render(React.createElement(router.MemoryRouter,null,React.createElement(Testimonials))));await act(async()=>new Promise(r=>setTimeout(r,120)));
  const originalCards=[...document.querySelectorAll('.feedback-card')].filter(el=>!el.closest('[aria-hidden="true"]'));assert.equal(originalCards.length,20);const placeholders=originalCards.filter(el=>el.querySelector('.feedback-card__label').textContent==='Espaço reservado');assert.equal(placeholders.length,19);assert(placeholders.every(el=>el.querySelector('h3').textContent==='Seu comentário aparece aqui'));const real=originalCards.find(el=>el.querySelector('h3').textContent==='Ana de teste local');assert(real);assert.equal(real.querySelector('.feedback-card__stars').getAttribute('aria-label'),'4 de 5 estrelas');assert.equal(real.querySelector('a').href,'https://example.test/project');assert(document.querySelector('.feedback-toolbar').textContent.includes('1 avaliação recebida · 4,0/5'));assert.equal(document.querySelector('.feedback-review-link').getAttribute('href'),'/avaliar');
  const tracks=[...document.querySelectorAll('.feedback-column__track')];const before=tracks.map(x=>x.style.transform);await act(async()=>new Promise(r=>setTimeout(r,100)));assert(tracks.every((el,i)=>el.style.transform!==before[i]),'Motion actually advances with loaded review data');
  await act(async()=>root.render(React.createElement(router.MemoryRouter,null,React.createElement(Review))));
  document.getElementById('review-name').value='  ANA   DE TESTE LOCAL ';document.getElementById('review-comment').value='Tentativa local de repetir uma avaliação existente.';
  await act(async()=>document.querySelector('input[type=radio][value="5"]').click());document.querySelector('[name=consent]').checked=true;
  await submit();for(let i=0;i<50&&!document.querySelector('[role=alert]');i++)await act(async()=>new Promise(r=>setTimeout(r,20)));
  assert.match(document.querySelector('[role=alert]').textContent,/Já existe uma avaliação com esse nome/);assert.equal(document.querySelector('.review-success'),null);assert.equal(document.getElementById('review-name').value,'  ANA   DE TESTE LOCAL ');assert.equal(document.querySelector('button[type=submit]').disabled,false);assert.equal((await f.env.DB.prepare('SELECT COUNT(*) AS total FROM reviews').first()).total,1);
 }finally{await act(async()=>root.unmount());f.sqlite.close();globalThis.fetch=originalFetch;globalThis.FormData=OriginalFormData;dom.window.close();}
});
