// Premium animation variants for Zerin Heritage
// Inspired by Sakura Global's sophisticated scroll experience

// Custom easing curve for premium feel
export const premiumEasing = [0.25, 0.1, 0.25, 1.0];

// Section reveal animations
export const sectionVariants = {
  hidden: { 
    opacity: 0, 
    y: 60 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      ease: premiumEasing
    }
  }
};

// Staggered container for grids
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    }
  }
};

// Grid item animations
export const gridItemVariants = {
  hidden: { 
    opacity: 0, 
    y: 60,
    scale: 0.95
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: premiumEasing
    }
  }
};

// Header text animations with stagger
export const headerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.05
    }
  }
};

export const headerItemVariants = {
  hidden: { 
    opacity: 0, 
    y: 30 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: premiumEasing
    }
  }
};

// Button hover animations
export const buttonHoverVariants = {
  initial: { scale: 1 },
  hover: { 
    scale: 1.05,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1]
    }
  },
  tap: { 
    scale: 0.95,
    transition: {
      duration: 0.1
    }
  }
};

// Image zoom on hover
export const imageZoomVariants = {
  initial: { scale: 1 },
  hover: { 
    scale: 1.08,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1]
    }
  }
};

// Fade in overlay
export const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

// Slide up from bottom
export const slideUpVariants = {
  hidden: { 
    opacity: 0, 
    y: 40 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: premiumEasing
    }
  }
};

// Page transition
export const pageTransitionVariants = {
  initial: { 
    opacity: 0, 
    y: 20 
  },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: premiumEasing
    }
  },
  exit: { 
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.4,
      ease: premiumEasing
    }
  }
};

// Viewport options for scroll triggers
export const viewportOptions = {
  once: true,
  margin: "-80px",
  amount: 0.1
};

export const viewportOptionsLarge = {
  once: true,
  margin: "-120px",
  amount: 0.2
};
