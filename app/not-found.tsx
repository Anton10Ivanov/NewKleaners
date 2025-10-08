'use client';

import Link from 'next/link';

import { ArrowLeft, Home, Search } from 'lucide-react';

import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { UnifiedContainer } from '@/components/layout/UnifiedContainer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function NotFound() {
  return (
    <div className='min-h-screen bg-background'>
      <Header />
      <main className='flex items-center justify-center min-h-[60vh]'>
        <UnifiedContainer size='xl' padding='lg'>
          <div className='text-center space-y-8'>
            <div className='space-y-4'>
              <h1 className='text-6xl font-bold text-oxford-blue'>404</h1>
              <h2 className='text-3xl font-semibold text-oxford-blue'>Page Not Found</h2>
              <p className='text-xl text-oxford-blue-600 max-w-2xl mx-auto'>
                Sorry, we couldn't find the page you're looking for. It might have been moved,
                deleted, or you entered the wrong URL.
              </p>
            </div>

            <Card className='max-w-md mx-auto'>
              <CardHeader>
                <CardTitle className='flex items-center justify-center'>
                  <Search className='w-5 h-5 mr-2' />
                  What would you like to do?
                </CardTitle>
                <CardDescription>
                  Here are some helpful links to get you back on track
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                <Link href='/' className='block'>
                  <Button className='w-full'>
                    <Home className='w-4 h-4 mr-2' />
                    Go to Homepage
                  </Button>
                </Link>
                <Link href='/book' className='block'>
                  <Button variant='outline' className='w-full'>
                    Book a Cleaning Service
                  </Button>
                </Link>
                <Link href='/services' className='block'>
                  <Button variant='outline' className='w-full'>
                    View Our Services
                  </Button>
                </Link>
                <Button variant='ghost' onClick={() => window.history.back()} className='w-full'>
                  <ArrowLeft className='w-4 h-4 mr-2' />
                  Go Back
                </Button>
              </CardContent>
            </Card>
          </div>
        </UnifiedContainer>
      </main>
      <Footer />
    </div>
  );
}
