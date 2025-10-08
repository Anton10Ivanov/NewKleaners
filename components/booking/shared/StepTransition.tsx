'use client';

import React from 'react';

import { AnimatePresence, motion } from 'framer-motion';

import { cn } from '@/lib/utils';

interface StepTransitionProps {
  children: React.ReactNode;
  stepKey: string | number;
  direction?: 'forward' | 'backward';
  className?: string;
}

export const StepTransition: React.FC<StepTransitionProps> = ({
  children,
  stepKey,
  direction = 'forward',
  className,
}) => {
  const variants = {
    enter: {
      x: direction === 'forward' ? 300 : -300,
      opacity: 0,
    },
    center: {
      x: 0,
      opacity: 1,
    },
    exit: {
      x: direction === 'forward' ? -300 : 300,
      opacity: 0,
    },
  };

  return (
    <AnimatePresence mode='wait'>
      <motion.div
        key={stepKey}
        variants={variants}
        initial='enter'
        animate='center'
        exit='exit'
        transition={{
          type: 'tween',
          ease: 'easeInOut',
          duration: 0.3,
        }}
        className={cn('w-full', className)}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
