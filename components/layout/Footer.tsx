import Link from 'next/link';

import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
  UserPlus,
} from 'lucide-react';

import { UnifiedContainer } from '@/components/layout/UnifiedContainer';
import { Button } from '@/components/ui/button';

export function Footer() {
  return (
    <footer className='bg-oxford-blue text-seasalt'>
      <UnifiedContainer size='xl' padding='lg'>
        <div className='py-12'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {/* Company Info */}
            <div className='space-y-4'>
              <div className='flex items-center space-x-2'>
                <div className='w-8 h-8 bg-orange-peel rounded-lg flex items-center justify-center'>
                  <span className='text-black font-bold heading-5'>K</span>
                </div>
                <span
                  className='heading-4 font-light text-orange-peel'
                  style={{ fontFamily: 'Raleway, Inter, system-ui, sans-serif' }}
                >
                  Kleaners
                </span>
              </div>
              <p className='body-small text-seasalt/80 leading-relaxed'>
                Professional cleaning services in Frankfurt. Connect with verified providers for
                residential, commercial, and specialized cleaning needs.
              </p>
              <div className='flex space-x-4'>
                <a
                  href='https://facebook.com/kleaners'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-seasalt/60 hover:text-orange-peel transition-colors'
                  aria-label='Follow us on Facebook'
                >
                  <Facebook className='w-5 h-5' />
                </a>
                <a
                  href='https://twitter.com/kleaners'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-seasalt/60 hover:text-orange-peel transition-colors'
                  aria-label='Follow us on Twitter'
                >
                  <Twitter className='w-5 h-5' />
                </a>
                <a
                  href='https://instagram.com/kleaners'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-seasalt/60 hover:text-orange-peel transition-colors'
                  aria-label='Follow us on Instagram'
                >
                  <Instagram className='w-5 h-5' />
                </a>
                <a
                  href='https://linkedin.com/company/kleaners'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-seasalt/60 hover:text-orange-peel transition-colors'
                  aria-label='Follow us on LinkedIn'
                >
                  <Linkedin className='w-5 h-5' />
                </a>
              </div>
            </div>

            {/* Services */}
            <div className='space-y-4'>
              <h3 className='heading-5'>Services</h3>
              <ul className='space-y-2 body-small'>
                <li>
                  <Link
                    href='/services/residential'
                    className='text-seasalt/80 hover:text-orange-peel transition-colors'
                  >
                    Residential Cleaning
                  </Link>
                </li>
                <li>
                  <Link
                    href='/services/commercial'
                    className='text-seasalt/80 hover:text-orange-peel transition-colors'
                  >
                    Commercial Cleaning
                  </Link>
                </li>
                <li>
                  <Link
                    href='/services/windows'
                    className='text-seasalt/80 hover:text-orange-peel transition-colors'
                  >
                    Window Cleaning
                  </Link>
                </li>
                <li>
                  <Link
                    href='/services/garden'
                    className='text-seasalt/80 hover:text-orange-peel transition-colors'
                  >
                    Garden Cleaning
                  </Link>
                </li>
                <li>
                  <Link
                    href='/services/health-safety'
                    className='text-seasalt/80 hover:text-orange-peel transition-colors'
                  >
                    Health & Safety
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div className='space-y-4'>
              <h3 className='text-lg font-semibold'>Company</h3>
              <ul className='space-y-2 text-sm'>
                <li>
                  <Link
                    href='/about'
                    className='text-seasalt/80 hover:text-orange-peel transition-colors'
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href='/how-it-works'
                    className='text-seasalt/80 hover:text-orange-peel transition-colors'
                  >
                    How it Works
                  </Link>
                </li>
                <li>
                  <Link
                    href='/careers'
                    className='text-seasalt/80 hover:text-orange-peel transition-colors'
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href='/press'
                    className='text-seasalt/80 hover:text-orange-peel transition-colors'
                  >
                    Press
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div className='space-y-4'>
              <h3 className='text-lg font-semibold'>Contact</h3>
              <div className='space-y-3 text-sm'>
                <div className='flex items-center space-x-3'>
                  <MapPin className='w-4 h-4 text-orange-peel flex-shrink-0' />
                  <span className='text-seasalt/80'>Frankfurt, Germany</span>
                </div>
                <div className='flex items-center space-x-3'>
                  <Phone className='w-4 h-4 text-orange-peel flex-shrink-0' />
                  <a
                    href='tel:+49123456789'
                    className='text-seasalt/80 hover:text-orange-peel transition-colors'
                  >
                    +49 123 456 789
                  </a>
                </div>
                <div className='flex items-center space-x-3'>
                  <Mail className='w-4 h-4 text-orange-peel flex-shrink-0' />
                  <a
                    href='mailto:info@kleaners.de'
                    className='text-seasalt/80 hover:text-orange-peel transition-colors'
                  >
                    info@kleaners.de
                  </a>
                </div>
                <div className='pt-2 border-t border-seasalt/20'>
                  <h4 className='text-sm font-semibold mb-2'>Working Hours</h4>
                  <ul className='text-seasalt/80 space-y-1'>
                    <li>Mon–Fri: 8:00 – 18:00</li>
                    <li>Sat: 9:00 – 16:00</li>
                    <li>Sun: Closed</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Become a Provider CTA */}
          <div className='mt-12 pt-8 border-t border-seasalt/20'>
            <div className='text-center space-y-4'>
              <h3 className='text-lg font-semibold text-seasalt'>Ready to Start Cleaning?</h3>
              <p className='text-sm text-seasalt/80 max-w-md mx-auto'>
                Join our network of verified cleaning professionals and start earning today.
              </p>
              <Link href='/providers'>
                <Button
                  size='sm'
                  className='bg-orange-peel text-black hover:bg-orange-peel-600 font-medium'
                >
                  <UserPlus className='w-4 h-4 mr-2' />
                  Become a Provider
                </Button>
              </Link>
            </div>
          </div>

          {/* Bottom Section */}
          <div className='mt-8 pt-8 border-t border-seasalt/20'>
            <div className='flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0'>
              <div className='text-sm text-seasalt/60'>© 2024 Kleaners. All rights reserved.</div>
              <div className='flex space-x-6 text-sm'>
                <Link
                  href='/privacy'
                  className='text-seasalt/60 hover:text-orange-peel transition-colors'
                >
                  Privacy Policy
                </Link>
                <Link
                  href='/terms'
                  className='text-seasalt/60 hover:text-orange-peel transition-colors'
                >
                  Terms of Service
                </Link>
                <Link
                  href='/cookies'
                  className='text-seasalt/60 hover:text-orange-peel transition-colors'
                >
                  Cookie Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </UnifiedContainer>
    </footer>
  );
}
