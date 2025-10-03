export const staggerChildren = (index: number, baseDelay: number = 0.1) => {
  return {
    animationDelay: `${index * baseDelay}s`,
  };
};

export const getTransformStyle = (offset: number) => {
  return {
    transform: `translateY(${offset}px)`,
  };
};

export const springTransition = {
  type: "spring",
  stiffness: 260,
  damping: 20,
};

export const easeOutTransition = {
  duration: 0.6,
  ease: [0.25, 0.46, 0.45, 0.94],
};
