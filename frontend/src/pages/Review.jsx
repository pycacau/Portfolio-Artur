import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Star, Camera, Check, LoaderCircle, X } from 'lucide-react';
import { prepareProfilePhoto } from '@/lib/reviews';
import './Review.css';

export default function Review() {
  const [rating, setRating] = useState(0);
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(null);
  const requestId = useRef(null);
  const uploadRef = useRef(null);
  useEffect(() => {
    if (!photo) { setPreview(''); return undefined; }
    const url = URL.createObjectURL(photo); setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [photo]);
  useEffect(() => {
    const title = document.title; document.title = 'Deixe sua avaliação — Artur Maciel';
    return () => { document.title = title; };
  }, []);
  const choosePhoto = event => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type) || file.size > 5 * 1024 * 1024) {
      setError('Escolha uma foto JPG, PNG ou WebP de até 5 MB.'); event.target.value = ''; return;
    }
    setPhoto(file); setError('');
  };
  const submit = async event => {
    event.preventDefault();
    if (busy) return;
    if (!rating) { setError('Escolha sua nota de 1 a 5 estrelas.'); return; }
    const form = new FormData(event.currentTarget);
    setBusy(true); setError('');
    try {
      requestId.current ||= crypto.randomUUID();
      form.set('requestId', requestId.current);
      form.set('rating', String(rating));
      form.set('consent', form.get('consent') === 'on' ? 'true' : 'false');
      form.delete('photo');
      const preparedPhoto = await prepareProfilePhoto(photo);
      if (preparedPhoto) form.set('photo', preparedPhoto, 'profile.webp');
      const response = await fetch('/api/reviews', { method: 'POST', body: form });
      let payload;
      try { payload = await response.json(); } catch { throw new Error('Não foi possível confirmar o envio. Tente novamente.'); }
      if (!response.ok) throw new Error(payload.error || 'Não foi possível enviar sua avaliação.');
      if (!payload.review?.id) throw new Error('Não foi possível confirmar o envio. Tente novamente.');
      setSaved(payload.review);
    } catch (failure) { setError(failure.message || 'Não foi possível enviar agora. Tente novamente.'); }
    finally { setBusy(false); }
  };
  return (
    <main className="review-page">
      <div className="review-page__container">
        <Link to="/#depoimentos" className="review-back"><ArrowLeft size={15} />Voltar ao portfólio</Link>
        {saved ? (
          <section className="review-success" aria-live="polite">
            <span className="review-success__icon"><Check size={32} /></span>
            <p className="section-eyebrow section-eyebrow--dark">Avaliação enviada</p>
            <h1 className="display-title display-title--dark">OBRIGADO<br />PELA CONFIANÇA.</h1>
            <p>{saved.name}, sua avaliação foi salva e já pode aparecer nos feedbacks do portfólio.</p>
            <Link className="review-submit" to="/#depoimentos">Ver avaliações<ArrowUpRight size={18} /></Link>
          </section>
        ) : (
          <>
            <header className="review-heading">
              <p className="section-eyebrow section-eyebrow--dark">Avaliação de projeto</p>
              <h1 className="display-title display-title--dark">SUA EXPERIÊNCIA<br />IMPORTA.</h1>
              <p>Conte como foi desenvolver seu projeto comigo. Sua opinião ajuda a melhorar cada entrega.</p>
            </header>
            <form className="review-form" onSubmit={submit}>
              <fieldset disabled={busy} className="review-form__fields">
                <aside className="review-photo">
                  <div className="review-photo__preview">{preview ? <img src={preview} alt="Prévia da sua foto" /> : <Camera size={32} strokeWidth={1.5} />}</div>
                  <label className="review-photo__choose">{photo ? 'Trocar foto' : 'Adicionar foto'}
                    <input ref={uploadRef} type="file" name="photo" accept="image/jpeg,image/png,image/webp" onChange={choosePhoto} />
                  </label>
                  {photo && <button type="button" className="review-photo__remove" onClick={() => { setPhoto(null); uploadRef.current.value = ''; }}><X size={12} />Remover foto</button>}
                  <p>Foto de perfil opcional.<br />JPG, PNG ou WebP. Até 5 MB.</p>
                  <div className="review-photo__note">Seu nome, comentário e foto serão exibidos no portfólio com a sua autorização.</div>
                </aside>
                <div className="review-form__body">
                  <div className="review-field"><label htmlFor="review-name">Seu nome <span>*</span></label><input id="review-name" name="name" autoComplete="name" placeholder="Como você quer aparecer no site?" minLength={2} maxLength={80} required /></div>
                  <fieldset className="review-rating"><legend>Como foi sua experiência? <span>*</span></legend>
                    <div className="review-rating__stars">{[1,2,3,4,5].map(value => <label key={value} className={value <= rating ? 'is-filled' : ''}>
                      <input type="radio" name="rating" value={value} checked={rating === value} onChange={() => setRating(value)} required aria-label={`${value} ${value === 1 ? 'estrela' : 'estrelas'}`} />
                      <Star size={35} fill={value <= rating ? 'currentColor' : 'none'} strokeWidth={1.5} aria-hidden="true" />
                    </label>)}</div>
                    <p aria-live="polite">{rating ? `${rating} de 5 estrelas` : 'Escolha uma nota de 1 a 5 estrelas'}</p>
                  </fieldset>
                  <div className="review-field"><label htmlFor="review-comment">Seu comentário <span>*</span></label><textarea id="review-comment" name="comment" rows={5} minLength={15} maxLength={1500} required placeholder="O que você achou do processo, do atendimento e do resultado do projeto?" /><small>De 15 a 1.500 caracteres.</small></div>
                  <div className="review-form__row">
                    <div className="review-field"><label htmlFor="review-project">Nome do projeto <small>Opcional</small></label><input id="review-project" name="projectName" maxLength={100} placeholder="Site, loja ou sistema" /></div>
                    <div className="review-field"><label htmlFor="review-url">Link do projeto <small>Opcional</small></label><input id="review-url" name="projectUrl" type="url" maxLength={500} placeholder="https://seusite.com.br" /></div>
                  </div>
                  <div className="review-honeypot" aria-hidden="true"><label htmlFor="company-website">Website da empresa</label><input id="company-website" name="companyWebsite" tabIndex={-1} autoComplete="off" /></div>
                  <label className="review-consent"><input type="checkbox" name="consent" required /><span>Autorizo a publicação da minha avaliação, nome, foto e link do projeto neste portfólio.</span></label>
                  {error && <p role="alert" className="review-error">{error}</p>}
                  <button className="review-submit" type="submit" disabled={busy}>{busy ? <><LoaderCircle size={18} className="review-spinner" />Enviando avaliação…</> : <>Enviar avaliação<ArrowUpRight size={18} /></>}</button>
                </div>
              </fieldset>
            </form>
          </>
        )}
      </div>
    </main>
  );
}
