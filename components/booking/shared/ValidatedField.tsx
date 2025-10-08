'use client';

import React from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, CheckCircle, HelpCircle } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface ValidatedFieldProps extends Omit<React.ComponentProps<'input'>, 'onChange'> {
  label: string;
  value: string;
  onChange: (value: string) => void;
  validate?: (value: string) => Promise<string | null> | string | null;
  helperText?: string;
  required?: boolean;
  debounceMs?: number;
  className?: string;
}

export const ValidatedField: React.FC<ValidatedFieldProps> = ({
  label,
  value,
  onChange,
  validate,
  helperText,
  required = false,
  debounceMs = 300,
  className,
  ...inputProps
}) => {
  const [error, setError] = React.useState<string | null>(null);
  const [isValidating, setIsValidating] = React.useState(false);
  const [isValid, setIsValid] = React.useState(false);
  const [hasBlurred, setHasBlurred] = React.useState(false);

  // Debounced validation
  const debouncedValidate = React.useCallback(
    React.useMemo(() => {
      let timeoutId: NodeJS.Timeout;
      return (val: string) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(async () => {
          if (!validate || val === '') {
            setError(null);
            setIsValidating(false);
            setIsValid(false);
            return;
          }

          setIsValidating(true);
          try {
            const result = await validate(val);
            setError(result);
            setIsValid(!result);
          } catch (err) {
            setError('Validation failed');
            setIsValid(false);
          } finally {
            setIsValidating(false);
          }
        }, debounceMs);
      };
    }, [validate, debounceMs]),
    [validate, debounceMs],
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    debouncedValidate(newValue);
  };

  const handleBlur = () => {
    setHasBlurred(true);
    if (value && validate) {
      debouncedValidate(value);
    }
  };

  const showError = hasBlurred && error;
  const showSuccess = hasBlurred && isValid && value;

  return (
    <div className={cn('space-y-2', className)}>
      {/* Label */}
      <Label htmlFor={inputProps['id']} className='text-sm font-medium'>
        {label}
        {required && <span className='text-red-500 ml-1'>*</span>}
      </Label>

      {/* Input Container */}
      <div className='relative'>
        <Input
          {...inputProps}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          className={cn('transition-all duration-200', {
            'border-red-500 focus:border-red-500 focus:ring-red-500': showError,
            'border-green-500 focus:border-green-500 focus:ring-green-500': showSuccess,
            'border-gray-300 focus:border-orange-500 focus:ring-orange-500':
              !showError && !showSuccess,
          })}
        />

        {/* Status Icons */}
        <div className='absolute right-3 top-1/2 transform -translate-y-1/2'>
          <AnimatePresence mode='wait'>
            {isValidating && (
              <motion.div
                key='validating'
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                className='w-4 h-4'
              >
                <div className='w-4 h-4 border-2 border-orange-500 border-t-transparent rounded-full animate-spin' />
              </motion.div>
            )}

            {showSuccess && (
              <motion.div
                key='success'
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                className='text-green-500'
              >
                <CheckCircle className='w-4 h-4' />
              </motion.div>
            )}

            {showError && (
              <motion.div
                key='error'
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                className='text-red-500'
              >
                <AlertCircle className='w-4 h-4' />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Helper Text / Error Message */}
      <AnimatePresence>
        {(showError || helperText) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className='overflow-hidden'
          >
            {showError ? (
              <div className='flex items-center text-sm text-red-600'>
                <AlertCircle className='w-4 h-4 mr-1 flex-shrink-0' />
                <span>{error}</span>
              </div>
            ) : (
              helperText && (
                <div className='flex items-center text-sm text-gray-600'>
                  <HelpCircle className='w-4 h-4 mr-1 flex-shrink-0' />
                  <span>{helperText}</span>
                </div>
              )
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
