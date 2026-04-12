import { useEffect, useState } from "react";

const MOBILE_QUERY = "(max-width: 767px)";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

const getInitialState = () => {
  if (typeof window === "undefined") {
    return { isMobile: false, prefersReducedMotion: false };
  }

  return {
    isMobile: window.matchMedia(MOBILE_QUERY).matches,
    prefersReducedMotion: window.matchMedia(REDUCED_MOTION_QUERY).matches,
  };
};

export function useDevicePerformance() {
  const [state, setState] = useState(getInitialState);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const mobileMedia = window.matchMedia(MOBILE_QUERY);
    const reducedMotionMedia = window.matchMedia(REDUCED_MOTION_QUERY);

    const handleChange = () => {
      setState({
        isMobile: mobileMedia.matches,
        prefersReducedMotion: reducedMotionMedia.matches,
      });
    };

    handleChange();

    if (mobileMedia.addEventListener && reducedMotionMedia.addEventListener) {
      mobileMedia.addEventListener("change", handleChange);
      reducedMotionMedia.addEventListener("change", handleChange);

      return () => {
        mobileMedia.removeEventListener("change", handleChange);
        reducedMotionMedia.removeEventListener("change", handleChange);
      };
    }

    mobileMedia.addListener(handleChange);
    reducedMotionMedia.addListener(handleChange);

    return () => {
      mobileMedia.removeListener(handleChange);
      reducedMotionMedia.removeListener(handleChange);
    };
  }, []);

  return {
    ...state,
    reduceMotion: state.prefersReducedMotion,
    lowMotion: state.isMobile && !state.prefersReducedMotion,
  };
}
