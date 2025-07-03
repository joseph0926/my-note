'use client';

import {
  SpringOptions,
  useScroll,
  useSpring,
  useTransform,
  motion,
} from 'motion/react';

const SPRING = {
  damping: 18,
  mass: 0.4,
} satisfies SpringOptions;

export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const animatedProgress = useSpring(scrollYProgress, SPRING);
  const barWidth = useTransform(animatedProgress, [0, 1], ['0%', '100%']);

  return (
    <div className="bg-muted/30 fixed top-0 left-0 z-10 h-2 w-full overflow-hidden">
      <motion.div
        style={{ width: barWidth }}
        className="h-full origin-left bg-indigo-500"
      />
    </div>
  );
};
