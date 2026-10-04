import React, { useLayoutEffect, useRef, useState } from 'react';
import { FileCode2, FolderOpen, Globe, Github } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '@/data/projects';
import './Projects.css';

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const sectionRef = useRef(null);
  const tabRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const project = projects[activeIndex];
  const number = String(activeIndex + 1).padStart(2, '0');
  const count = String(projects.length).padStart(2, '0');

  useLayoutEffect(() => {
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const folder = sectionRef.current.querySelector('.project-archive__folder');
      gsap.fromTo(folder, { y: 32, opacity: 0.7 }, {
        y: 0, opacity: 1, ease: 'none',
        scrollTrigger: { trigger: folder, start: 'top 95%', end: 'top 65%', scrub: 0.5 },
      });
    });
    return () => media.revert();
  }, []);

  function navigateList(event, index) {
    let next;
    if (event.key === 'ArrowDown') next = (index + 1) % projects.length;
    else if (event.key === 'ArrowUp') next = (index - 1 + projects.length) % projects.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = projects.length - 1;
    else return;
    event.preventDefault();
    setActiveIndex(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <section ref={sectionRef} id="projetos" aria-labelledby="projects-title"
      className="portfolio-section portfolio-section--dark project-archive">
      <div className="project-archive__container">
        <header className="project-archive__header">
          <div>
            <div className="section-eyebrow section-eyebrow--light mb-4" data-gsap-reveal>
              <span>Do planejamento à tela</span>
            </div>
            <h2 id="projects-title" className="display-title display-title--light project-archive__title" data-gsap-title>
              PROJETOS REALIZADOS.
            </h2>
          </div>
          <p data-gsap-reveal>Selecione um projeto para explorar.</p>
        </header>

        <div className="project-archive__folder">
          <div className="project-archive__folder-tab"><FolderOpen size={18} aria-hidden="true" />Projetos</div>
          <div className="project-archive__workspace">
            <div className="project-archive__toolbar">
              <span className="project-archive__path"><span>Portfólio</span><span aria-hidden="true">/</span>Projetos</span>
              <span>{count} arquivos</span>
            </div>
            <div className="project-archive__body">
              <div className="project-archive__directory">
                <div className="project-archive__directory-inner">
                  <div className="project-archive__list-heading" aria-hidden="true"><span>Nome do projeto</span><span>Nº</span></div>
                  <div className="project-archive__list" role="tablist" aria-label="Projetos realizados" aria-orientation="vertical">
                    {projects.map((item, index) => (
                      <button key={item.title} ref={element => { tabRefs.current[index] = element; }}
                        type="button" role="tab" id={`project-tab-${index}`} aria-selected={activeIndex === index}
                        aria-controls="project-preview" tabIndex={activeIndex === index ? 0 : -1}
                        className="project-archive__file" onClick={() => setActiveIndex(index)}
                        onKeyDown={event => navigateList(event, index)}>
                        <FileCode2 size={20} aria-hidden="true" />
                        <span className="project-archive__file-name"><strong>{item.title}</strong><span>{item.type}</span></span>
                        <span className="project-archive__file-number">{String(index + 1).padStart(2, '0')}</span>
                      </button>
                    ))}
                  </div>
                  <span className="project-archive__directory-footer">Sites & experiências digitais</span>
                </div>
              </div>

              <div id="project-preview" role="tabpanel" aria-labelledby={`project-tab-${activeIndex}`}
                tabIndex={0} className="project-archive__preview">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.article key={project.title} className="project-archive__document"
                    initial={reduceMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                    exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -4 }}
                    transition={{ duration: reduceMotion ? 0 : 0.16 }}>
                    <div className="project-archive__image-frame">
                      <div className="project-archive__browser-bar">
                        <span className="project-archive__browser-dots" aria-hidden="true"><i /><i /><i /></span>
                        <span className="project-archive__address"><Globe size={12} aria-hidden="true" />{project.demo ? new URL(project.demo).hostname.replace(/^www\./, '') : project.type}</span>
                      </div>
                      <div className="project-archive__image-window">
                        <img src={project.image} alt={`Página inicial de ${project.title}`}
                          width={project.imageWidth || 1920} height={project.imageHeight || 1080} decoding="async" />
                      </div>
                    </div>
                    <div className="project-archive__details">
                      <div className="project-archive__project-heading"><h3>{project.title}</h3><span>{project.type}</span></div>
                      <p>{project.description}</p>
                      <div className="project-archive__actions">
                        <ul className="project-archive__tags" aria-label="Tecnologias e recursos">
                          {project.tags.map(tag => <li key={tag}>{tag}</li>)}
                        </ul>
                        <div className="project-archive__links">
                          {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer"
                            aria-label={`Ver código de ${project.title} (abre em nova aba)`}><Github size={16} aria-hidden="true" />Código</a>}
                          {project.demo && <a className="project-archive__visit" href={project.demo} target="_blank" rel="noopener noreferrer"
                            aria-label={`Visitar ${project.title} (abre em nova aba)`}><span className="project-archive__visit-icon"><Globe size={16} aria-hidden="true" /></span>Visitar site</a>}
                        </div>
                      </div>
                    </div>
                  </motion.article>
                </AnimatePresence>
              </div>
            </div>
            <div className="project-archive__status"><span>Arquivo selecionado</span><span>{number} / {count}</span></div>
          </div>
        </div>
        <div className="project-archive__closing"><p>O próximo projeto pode ser o seu.</p><a href="#contato">Vamos conversar</a></div>
      </div>
    </section>
  );
}
