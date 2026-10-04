import React from 'react';
import { BriefcaseBusiness, Star, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, MotionConfig } from 'framer-motion';
import { feedbackExamples } from '@/data/feedbackExamples';
import { composeFeedbacks } from '@/lib/reviews';
import useReviews from '@/hooks/useReviews';
import './Testimonials.css';

const StoryCard = ({ item, duplicate = false }) => (
  <article className="feedback-card" aria-hidden={duplicate ? 'true' : undefined}>
    <div className="feedback-card__label"><span />{item.isExample ? 'Espaço reservado' : 'Avaliação enviada'}</div>
    {!item.isExample && <div className="feedback-card__stars" aria-label={`${item.rating} de 5 estrelas`}>
      {[1,2,3,4,5].map(value => <Star key={value} size={13} fill={value <= item.rating ? 'currentColor' : 'none'} aria-hidden="true" />)}
    </div>}
    <p className="feedback-card__text">{item.text}</p>
    <div className="feedback-card__client">
      <div className="feedback-card__avatar" aria-hidden="true">{item.photoUrl ? <img src={item.photoUrl} alt="" width="42" height="42" loading="lazy" /> : item.isExample ? item.id.slice(-2) : item.name.split(/\s+/).slice(0,2).map(part => part[0]).join('')}</div>
      <div className="feedback-card__identity">
        <h3>{item.isExample ? 'Seu comentário aparece aqui' : item.name}</h3>
        <p>{item.isExample ? item.role : item.projectName || 'Projeto web'}</p>
      </div>
    </div>
    {item.projectUrl && <a className="feedback-card__project" href={item.projectUrl} target="_blank" rel="noopener noreferrer nofollow ugc" tabIndex={duplicate ? -1 : undefined}>Ver projeto<ArrowUpRight size={12} /></a>}
  </article>
);

export const TestimonialsColumn = ({ testimonials, duration = 18, direction = 'up', decorative = false }) => {
  return (
    <div className="feedback-column" data-direction={direction}>
      <motion.div className="feedback-column__track" drag={false} draggable={false}
        animate={{ y: direction === 'down' ? ['-50%', '0%'] : ['0%', '-50%'] }}
        transition={{ duration, repeat: Infinity, ease: 'linear', repeatType: 'loop' }}>
        {[false, true].map(copy => (
          <div className="feedback-column__group" key={String(copy)} aria-hidden={copy ? 'true' : undefined}>
            {testimonials.map(item => <StoryCard key={item.id} item={item} duplicate={copy || decorative} />)}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default function Testimonials() {
  const { reviews, error } = useReviews();
  const items = composeFeedbacks(reviews, feedbackExamples);
  const columns = [0,1,2].map(index => items.filter((_, itemIndex) => itemIndex % 3 === index));
  const durations = [18, 23, 20];
  const average = reviews.length ? (reviews.reduce((total, review) => total + review.rating, 0) / reviews.length).toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) : null;
  const renderColumns = (decorative = false) => columns.map((column, index) => <TestimonialsColumn key={index}
    testimonials={column} duration={durations[index] * column.length / 3} direction={index === 1 ? 'down' : 'up'} decorative={decorative} />);
  return (
    <MotionConfig reducedMotion="never">
    <section id="depoimentos" className="portfolio-section portfolio-section--paper feedback-section py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 min-w-0">
        <div className="feedback-heading">
          <div>
            <div className="section-eyebrow section-eyebrow--dark mb-5" data-gsap-reveal>
              <BriefcaseBusiness size={12} />
              <span>Feedbacks & experiências</span>
            </div>
            <h2 className="display-title display-title--dark text-[clamp(2.8rem,10vw,5rem)] md:text-[5.2rem]" data-gsap-title>
              FEEDBACKS<br />& EXPERIÊNCIAS
            </h2>
          </div>
          <p className="feedback-heading__description" data-gsap-reveal>
            Compartilhe a sua experiência e ajude outras pessoas a conhecerem meu trabalho.
          </p>
        </div>

        <div className="feedback-toolbar">
          <span><span className="feedback-toolbar__dot" />{reviews.length ? `${reviews.length} ${reviews.length === 1 ? 'avaliação recebida' : 'avaliações recebidas'} · ${average}/5` : 'Ainda sem avaliações recebidas'}</span>
          <Link to="/avaliar" className="feedback-review-link">Deixar uma avaliação<ArrowUpRight size={14} /></Link>
        </div>

        {error && <p className="feedback-unavailable" role="status">{error}</p>}
        <div id="feedback-columns" className="feedback-wall">
          <div className="feedback-wall__columns">
            {renderColumns()}
          </div>
          <div className="feedback-wall__blur" aria-hidden="true">
            <div className="feedback-wall__columns">{renderColumns(true)}</div>
          </div>
        </div>
      </div>
    </section>
    </MotionConfig>
  );
}
