'use client';

import { useState } from 'react';

import Link from 'next/link';

import { LogOut, Menu, User, X } from 'lucide-react';

import { UnifiedContainer } from '@/components/layout/UnifiedContainer';
import { useAuth } from '@/components/providers/AuthProvider';
import { Button } from '@/components/ui/button';


export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    setIsMenuOpen(false);
  };

  return (
    <header className='bg-oxford-blue text-seasalt shadow-lg sticky top-0 z-50'>
      <UnifiedContainer size='xl' padding='md'>
        <div className='flex items-center justify-between h-16'>
          {/* Logo */}
          <Link href='/' className='flex items-center space-x-2'>
            <div className='w-8 h-8 bg-orange-peel rounded-lg flex items-center justify-center'>
              <span className='text-black font-bold text-lg'>K</span>
            </div>
            <span className='text-xl font-bold text-seasalt'>Kleaners</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className='hidden md:flex items-center space-x-8'>
            <Link href='/services' className='nav-link'>
              Services
            </Link>
            <Link href='/how-it-works' className='nav-link'>
              How it Works
            </Link>
            <Link href='/about' className='nav-link'>
              About
            </Link>
            <Link href='/contact' className='nav-link'>
              Contact
            </Link>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className='hidden md:flex items-center space-x-4'>
            <Link href='/book'>
              <Button
                size='sm'
                className='bg-orange-peel text-black hover:bg-orange-peel-600 mr-2'
              >
                Book Now
              </Button>
            </Link>
            {user ? (
              <div className='flex items-center space-x-4'>
                <Link href='/dashboard'>
                  <Button
                    variant='outline'
                    size='sm'
                    className='border-seasalt text-seasalt hover:bg-seasalt hover:text-oxford-blue'
                  >
                    <User className='w-4 h-4 mr-2' />
                    Dashboard
                  </Button>
                </Link>
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={handleSignOut}
                  className='text-seasalt hover:bg-seasalt/10'
                >
                  <LogOut className='w-4 h-4 mr-2' />
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className='flex items-center space-x-4'>
                <Link href='/auth/signin'>
                  <Button variant='ghost' size='sm' className='text-seasalt hover:bg-seasalt/10'>
                    Sign In
                  </Button>
                </Link>
                <Link href='/auth/signup'>
                  <Button size='sm' className='bg-orange-peel text-black hover:bg-orange-peel-600'>
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className='md:hidden p-2'
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label='Toggle menu'
          >
            {isMenuOpen ? <X className='w-6 h-6' /> : <Menu className='w-6 h-6' />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className='md:hidden py-4 border-t border-seasalt/20'>
            <nav className='flex flex-col space-y-4'>
              <Link href='/services' className='nav-link py-2' onClick={() => setIsMenuOpen(false)}>
                Services
              </Link>
              <Link
                href='/how-it-works'
                className='nav-link py-2'
                onClick={() => setIsMenuOpen(false)}
              >
                How it Works
              </Link>
              <Link href='/about' className='nav-link py-2' onClick={() => setIsMenuOpen(false)}>
                About
              </Link>
              <Link href='/contact' className='nav-link py-2' onClick={() => setIsMenuOpen(false)}>
                Contact
              </Link>

              <div className='pt-4 border-t border-seasalt/20'>
                <Link
                  href='/book'
                  className='nav-link py-2 font-semibold text-orange-peel'
                  onClick={() => setIsMenuOpen(false)}
                >
                  Book Now
                </Link>
                {user ? (
                  <div className='flex flex-col space-y-2'>
                    <Link
                      href='/dashboard'
                      className='nav-link py-2'
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <button onClick={handleSignOut} className='nav-link py-2 text-left'>
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <div className='flex flex-col space-y-2'>
                    <Link
                      href='/auth/signin'
                      className='nav-link py-2'
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Link
                      href='/auth/signup'
                      className='nav-link py-2'
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Get Started
                    </Link>
                  </div>
                )}
              </div>
            </nav>
          </div>
        )}
      </UnifiedContainer>
    </header>
  );
}
