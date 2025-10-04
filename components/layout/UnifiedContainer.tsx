import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const containerVariants = cva('mx-auto w-full', {
  variants: {
    size: {
      sm: 'max-w-2xl', // 672px - Forms, narrow content
      md: 'max-w-4xl', // 896px - Articles, medium content
      lg: 'max-w-6xl', // 1152px - Wide content, dashboards
      xl: 'max-w-7xl', // 1280px - Main content areas (default)
      '2xl': 'max-w-[1400px]', // 1400px - Ultra-wide content
      'ultra-wide': 'max-w-[1600px]', // 1600px - Maximum width
      full: 'max-w-none', // No constraint
    },
    padding: {
      none: '',
      sm: 'px-4 sm:px-6', // 16px → 24px
      md: 'px-4 sm:px-6 lg:px-8', // 16px → 24px → 32px
      lg: 'px-4 sm:px-6 lg:px-8 xl:px-10', // 16px → 24px → 32px → 40px
      xl: 'px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12', // 16px → 24px → 32px → 40px → 48px
      '2xl': 'px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 3xl:px-16', // 16px → 24px → 32px → 40px → 48px → 64px
    },
    center: {
      true: 'flex flex-col items-center',
      false: '',
    },
  },
  defaultVariants: {
    size: 'xl',
    padding: 'md',
    center: false,
  },
});

interface UnifiedContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {
  breakout?: boolean;
}

export function UnifiedContainer({
  className,
  size,
  padding,
  center,
  breakout = false,
  children,
  ...props
}: UnifiedContainerProps) {
  if (breakout) {
    return (
      <div className='w-full'>
        <div className={cn(containerVariants({ size, padding, center, className }))} {...props}>
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className={cn(containerVariants({ size, padding, center, className }))} {...props}>
      {children}
    </div>
  );
}
