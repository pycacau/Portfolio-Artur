import { useEffect, useState } from 'react';
import { loadReviews } from '@/lib/reviews';
export default function useReviews() {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState('');
  useEffect(() => {
    let active = true, busy = false;
    const controller = new AbortController();
    const refresh = async () => {
      if (busy || document.hidden) return;
      busy = true;
      try {
        const next = await loadReviews(controller.signal);
        if (active) { setReviews(current => JSON.stringify(current) === JSON.stringify(next) ? current : next); setError(''); }
      } catch (failure) {
        if (active && failure.name !== 'AbortError') setError('As avaliações estão temporariamente indisponíveis. Tente novamente mais tarde.');
      } finally { busy = false; }
    };
    refresh();
    const timer = window.setInterval(refresh, 30000);
    document.addEventListener('visibilitychange', refresh);
    return () => { active = false; controller.abort(); window.clearInterval(timer); document.removeEventListener('visibilitychange', refresh); };
  }, []);
  return { reviews, error };
}
