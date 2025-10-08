'use client';

import React from 'react';

import { motion } from 'framer-motion';
import { Check, Loader2 } from 'lucide-react';

import type { ButtonProps } from '@/components/ui/button';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface EnhancedButtonProps extends ButtonProps {
  loading?: boolean;
  success?: boolean;
  successDuration?: number;
  ripple?: boolean;
  hapticFeedback?: boolean;
  children: React.ReactNode;
}

export const EnhancedButton: React.FC<EnhancedButtonProps> = ({
  loading = false,
  success = false,
  successDuration = 2000,
  ripple = true,
  hapticFeedback = true,
  className,
  children,
  onClick,
  disabled,
  ...props
}) => {
  const [showSuccess, setShowSuccess] = React.useState(false);
  const [rippleEffect, setRippleEffect] = React.useState<{
    x: number;
    y: number;
    show: boolean;
  }>({ x: 0, y: 0, show: false });

  // Handle success state
  React.useEffect(() => {
    if (success) {
      setShowSuccess(true);
      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, successDuration);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [success, successDuration]);

  // Handle ripple effect
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (ripple && !disabled) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setRippleEffect({ x, y, show: true });

      setTimeout(() => {
        setRippleEffect(prev => ({ ...prev, show: false }));
      }, 600);
    }

    // Haptic feedback for mobile
    if (hapticFeedback && 'vibrate' in navigator) {
      navigator.vibrate(50);
    }

    onClick?.(e);
  };

  const isDisabled = disabled || loading || showSuccess;

  return (
    <motion.div
      className='relative overflow-hidden'
      whileHover={!isDisabled ? { scale: 1.02 } : {}}
      whileTap={!isDisabled ? { scale: 0.98 } : {}}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <Button
        className={cn(
          'relative min-h-[44px] min-w-[44px] transition-all duration-300',
          {
            'bg-green-500 hover:bg-green-600': showSuccess,
            'cursor-not-allowed': isDisabled,
          },
          className,
        )}
        onClick={handleClick}
        disabled={isDisabled}
        {...props}
      >
        {/* Ripple Effect */}
        {rippleEffect.show && (
          <motion.div
            className='absolute inset-0 bg-white/20 rounded-full'
            style={{
              left: rippleEffect.x - 20,
              top: rippleEffect.y - 20,
              width: 40,
              height: 40,
            }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 4, opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        )}

        {/* Content */}
        <motion.div
          className='flex items-center justify-center gap-2'
          animate={{
            scale: showSuccess ? [1, 1.1, 1] : 1,
          }}
          transition={{ duration: 0.3 }}
        >
          {loading && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
            >
              <Loader2 className='w-4 h-4 animate-spin' />
            </motion.div>
          )}

          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
            >
              <Check className='w-4 h-4' />
            </motion.div>
          )}

          {!loading && !showSuccess && children}
        </motion.div>
      </Button>
    </motion.div>
  );
};
