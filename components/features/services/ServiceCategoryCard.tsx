'use client';

import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface ServiceCategoryCardProps {
  title: string;
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  labels: string[];
  accentColorClass?: string; // e.g. 'blue-500'
  imageSrc?: string;
  imageAlt?: string;
  description?: string;
  trustSignals?: string[];
}

export function ServiceCategoryCard(props: ServiceCategoryCardProps): JSX.Element {
  const {
    title,
    href,
    icon: Icon,
    labels,
    accentColorClass,
    imageSrc,
    imageAlt,
    description,
    trustSignals,
  } = props;

  return (
    <Link href={href} className='block group'>
      <Card
        className={cn(
          'overflow-hidden rounded-2xl border-2 transition-all duration-300 hover:shadow-xl',
          accentColorClass
            ? `border-${accentColorClass} hover:border-${accentColorClass.replace('500', '600')}`
            : 'border-gray-200 hover:border-gray-300',
        )}
      >
        {/* Media section - Golden ratio: smaller section (38.2% of total height) */}
        <div className='relative h-48 md:h-52 lg:h-56 w-full overflow-hidden'>
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={imageAlt || title}
              fill
              className='object-cover transition-transform duration-500 group-hover:scale-110'
              sizes='(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw'
              priority={false}
            />
          ) : (
            <div
              className={cn(
                'flex h-full w-full items-center justify-center',
                accentColorClass
                  ? `bg-gradient-to-br from-${accentColorClass} to-${accentColorClass.replace('500', '700')}`
                  : 'bg-gradient-to-br from-gray-400 to-gray-600',
              )}
            >
              <Icon className='h-16 w-16 text-white opacity-90' aria-hidden='true' />
            </div>
          )}
        </div>

        {/* Information section - Larger section (61.8% of total height) */}
        <div className='px-5 py-6 bg-card flex flex-col justify-between min-h-[200px]'>
          {/* Group 1: Heading and Description */}
          <div className='space-y-0'>
            <h3 className='text-2xl font-bold text-black tracking-tight'>{title}</h3>
            <p className='text-sm text-gray-500 leading-relaxed'>
              {description || 'Professional cleaning services tailored to your specific needs'}
            </p>
          </div>

          {/* Group 2: Trust Signals */}
          {trustSignals && trustSignals.length > 0 && (
            <div className='mt-2 space-y-0'>
              {trustSignals.map((signal, index) => (
                <div key={index} className='flex items-center gap-2'>
                  <div className='w-4 h-4 rounded-sm bg-green-500 flex items-center justify-center'>
                    <svg
                      className='w-3 h-3 text-white'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M5 13l4 4L19 7'
                      />
                    </svg>
                  </div>
                  <span className='text-sm text-oxford-blue-700 font-normal'>{signal}</span>
                </div>
              ))}
            </div>
          )}

          {/* Group 3: Examples and Tags */}
          {labels.length > 0 && (
            <div className='mt-6'>
              <p className='text-xs font-semibold text-oxford-blue-500 uppercase tracking-wide mb-2'>
                Examples
              </p>
              <div className='flex flex-wrap gap-1 max-h-[56px] overflow-hidden'>
                {labels.map(label => (
                  <span
                    key={label}
                    className={cn(
                      'inline-flex items-center rounded-md px-3 py-1 text-[11px] font-medium',
                      'bg-seasalt-100 text-oxford-blue-700 border',
                      accentColorClass ? `border-${accentColorClass}` : 'border-gray-300',
                    )}
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </Card>
    </Link>
  );
}
