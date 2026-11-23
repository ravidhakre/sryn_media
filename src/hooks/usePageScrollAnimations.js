import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function usePageScrollAnimations(pageRef, progressRef, onProgressChange) {
  useEffect(() => {
    if (!pageRef.current) return;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: pageRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.4,
        onUpdate: (self) => {
          if (progressRef) {
            progressRef.current = self.progress;
          }
          if (onProgressChange) {
            onProgressChange(Math.round(self.progress * 100));
          }
        },
      });

      gsap.utils.toArray('.reveal-block').forEach((el) => {
        gsap.fromTo(
          el,
          { y: 34, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              once: true,
            },
          }
        );
      });
    }, pageRef);

    return () => ctx.revert();
  }, [pageRef, progressRef, onProgressChange]);
}
