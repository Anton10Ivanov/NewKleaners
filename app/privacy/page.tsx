'use client';

import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { UnifiedContainer } from '@/components/layout/UnifiedContainer';

export default function PrivacyPage() {
  return (
    <div className='min-h-screen bg-background'>
      <Header />
      <main className='py-20'>
        <UnifiedContainer size='xl' padding='lg'>
          <div className='max-w-4xl mx-auto'>
            <h1 className='text-4xl font-bold text-oxford-blue mb-8'>Privacy Policy</h1>
            <div className='prose prose-lg max-w-none'>
              <p className='text-gray-600 mb-8'>Last updated: January 2024</p>

              <h2 className='text-2xl font-semibold text-oxford-blue mb-4'>
                1. Information We Collect
              </h2>
              <p className='text-gray-700 mb-6'>
                We collect information you provide directly to us, such as when you create an
                account, book a service, or contact us for support.
              </p>

              <h2 className='text-2xl font-semibold text-oxford-blue mb-4'>
                2. How We Use Your Information
              </h2>
              <p className='text-gray-700 mb-6'>
                We use the information we collect to provide, maintain, and improve our services,
                process transactions, and communicate with you.
              </p>

              <h2 className='text-2xl font-semibold text-oxford-blue mb-4'>
                3. Information Sharing
              </h2>
              <p className='text-gray-700 mb-6'>
                We do not sell, trade, or otherwise transfer your personal information to third
                parties without your consent, except as described in this policy.
              </p>

              <h2 className='text-2xl font-semibold text-oxford-blue mb-4'>4. Data Security</h2>
              <p className='text-gray-700 mb-6'>
                We implement appropriate security measures to protect your personal information
                against unauthorized access, alteration, disclosure, or destruction.
              </p>

              <h2 className='text-2xl font-semibold text-oxford-blue mb-4'>5. Your Rights</h2>
              <p className='text-gray-700 mb-6'>
                You have the right to access, update, or delete your personal information. You may
                also opt out of certain communications from us.
              </p>

              <h2 className='text-2xl font-semibold text-oxford-blue mb-4'>6. Contact Us</h2>
              <p className='text-gray-700 mb-6'>
                If you have any questions about this Privacy Policy, please contact us at
                privacy@kleaners.de
              </p>
            </div>
          </div>
        </UnifiedContainer>
      </main>
      <Footer />
    </div>
  );
}
