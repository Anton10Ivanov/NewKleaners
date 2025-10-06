'use client';

import Image from 'next/image';

import { cn } from '@/lib/utils';

interface LogoBarProps {
  className?: string;
}

const TRUST_LOGOS = [
  {
    name: 'Handwerkskammer Frankfurt-Rhein-Main',
    logo: '/images/HWK-logo.webp',
  },
  {
    name: 'Alte Leipziger',
    logo: '/images/AL-logo.webp',
  },
  {
    name: 'Google Maps',
    logo: '/images/maps.webp',
  },
];

export function LogoBar({ className }: LogoBarProps) {
  return (
    <div className={cn('flex justify-center items-center gap-6 md:gap-8', className)}>
      {TRUST_LOGOS.map(logo => (
        <div key={logo.name} className='flex items-center justify-center w-20 h-12 md:w-24 md:h-16'>
          <div className='relative w-full h-full opacity-80 hover:opacity-100 transition-opacity duration-300'>
            <Image
              src={logo.logo}
              alt={logo.name}
              fill
              className='object-contain'
              sizes='(max-width: 768px) 80px, 96px'
            />
          </div>
        </div>
      ))}
    </div>
  );
}
