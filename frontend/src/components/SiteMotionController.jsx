import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ANIME_SCRIPT_ID = 'animejs-runtime';

function setupAnimeAnimations() {
  const animeRuntime = window.anime;
  if (!animeRuntime?.createScope || !animeRuntime?.animate) return null;

  const { createScope, animate, stagger } = animeRuntime;
  const cleanups = [];

  const scope = createScope({
    root: document.body,
    mediaQueries: {
      mobile: '(max-width: 767px)',
      reduceMotion: '(prefers-reduced-motion: reduce)',
    },
  }).add((self) => {
    const { mobile, reduceMotion } = self.matches;

    if (!mobile && !reduceMotion) {
      document.querySelectorAll('[data-anime-hover]').forEach((element) => {
        const enter = () => animate(element, { scale: 1.018, duration: 150, ease: 'out(3)' });
        const leave = () => animate(element, { scale: 1, duration: 190, ease: 'out(4)' });
        element.addEventListener('pointerenter', enter);
        element.addEventListener('pointerleave', leave);
        cleanups.push(() => {
          element.removeEventListener('pointerenter', enter);
          element.removeEventListener('pointerleave', leave);
        });
      });

      document.querySelectorAll('[data-anime-card]').forEach((element) => {
        const enter = () => animate(element, { translateY: -4, duration: 170, ease: 'out(3)' });
        const leave = () => animate(element, { translateY: 0, duration: 200, ease: 'out(4)' });
        element.addEventListener('pointerenter', enter);
        element.addEventListener('pointerleave', leave);
        cleanups.push(() => {
          element.removeEventListener('pointerenter', enter);
          element.removeEventListener('pointerleave', leave);
        });
      });
    }

    document.querySelectorAll('[data-anime-stagger]').forEach((group) => {
      const items = group.querySelectorAll('[data-anime-stagger-item]');
      if (!items.length) return;
      animate(items, {
        opacity: reduceMotion ? 1 : [0.7, 1],
        translateY: reduceMotion ? 0 : [mobile ? 8 : 12, 0],
        duration: reduceMotion ? 0 : mobile ? 230 : 310,
        delay: reduceMotion ? 0 : stagger(mobile ? 22 : 35),
        ease: 'out(3)',
      });
    });

    const pulseTargets = document.querySelectorAll('[data-anime-pulse]');
    if (!reduceMotion && pulseTargets.length) {
      animate(pulseTargets, {
        scale: [1, 1.16, 1],
        opacity: [0.72, 1, 0.72],
        duration: 1350,
        delay: stagger(120),
        loop: true,
        ease: 'inOut(2)',
      });
    }
  });

  return {
    revert() {
      cleanups.forEach((cleanup) => cleanup());
      scope.revert?.();
    },
  };
}

export default function SiteMotionController() {
  const location = useLocation();

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(
      {
        desktop: '(min-width: 768px)',
        mobile: '(max-width: 767px)',
        reduceMotion: '(prefers-reduced-motion: reduce)',
      },
      (context) => {
        const { desktop, reduceMotion } = context.conditions;

        if (reduceMotion) {
          gsap.set('[data-gsap-reveal], [data-gsap-title]', { clearProps: 'all' });
          return;
        }

        gsap.utils.toArray('[data-gsap-reveal]').forEach((element) => {
          gsap.fromTo(
            element,
            { autoAlpha: 0, y: desktop ? 24 : 14 },
            {
              autoAlpha: 1,
              y: 0,
              duration: desktop ? 0.5 : 0.36,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: element,
                start: desktop ? 'top 90%' : 'top 96%',
                once: true,
                invalidateOnRefresh: true,
              },
            },
          );
        });

        gsap.utils.toArray('[data-gsap-title]').forEach((element) => {
          gsap.fromTo(
            element,
            { autoAlpha: 0, y: desktop ? 18 : 10, letterSpacing: desktop ? '-0.075em' : undefined },
            {
              autoAlpha: 1,
              y: 0,
              letterSpacing: '',
              duration: desktop ? 0.52 : 0.38,
              ease: 'power4.out',
              scrollTrigger: {
                trigger: element,
                start: 'top 92%',
                once: true,
              },
            },
          );
        });

        gsap.utils.toArray('[data-gsap-seam]').forEach((element) => {
          gsap.fromTo(
            element,
            { opacity: 0.65, y: -6 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: 'power2.out',
              scrollTrigger: { trigger: element.parentElement, start: 'top 98%', once: true },
            },
          );
        });

        if (desktop) {
          gsap.utils.toArray('[data-atmosphere-orb]').forEach((element, index) => {
            gsap.to(element, {
              xPercent: index % 2 === 0 ? 8 : -8,
              yPercent: index % 3 === 0 ? -10 : 10,
              duration: 8 + index * 1.4,
              repeat: -1,
              yoyo: true,
              ease: 'sine.inOut',
            });
          });
        }

      },
    );

    const refreshId = window.requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => {
      window.cancelAnimationFrame(refreshId);
      mm.revert();
    };
  }, [location.pathname]);

  useEffect(() => {
    let animeScope = null;
    let attempts = 0;
    let timerId;

    const init = () => {
      animeScope = setupAnimeAnimations();
      if (animeScope || attempts >= 20) return;
      attempts += 1;
      timerId = window.setTimeout(init, 120);
    };

    init();

    const script = document.getElementById(ANIME_SCRIPT_ID);
    const handleLoad = () => {
      animeScope?.revert?.();
      animeScope = setupAnimeAnimations();
    };
    script?.addEventListener('load', handleLoad, { once: true });

    return () => {
      window.clearTimeout(timerId);
      script?.removeEventListener('load', handleLoad);
      animeScope?.revert?.();
    };
  }, [location.pathname]);

  return null;
}
