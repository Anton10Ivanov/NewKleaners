'use client';

import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { UnifiedContainer } from '@/components/layout/UnifiedContainer';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-20">
        <UnifiedContainer size="xl" padding="lg">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-oxford-blue mb-8">Terms of Service</h1>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 mb-8">
                Last updated: January 2024
              </p>

              <h2 className="text-2xl font-semibold text-oxford-blue mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700 mb-6">
                By accessing and using Kleaners services, you accept and agree to be bound by the terms and provision of this agreement.
              </p>

              <h2 className="text-2xl font-semibold text-oxford-blue mb-4">2. Use License</h2>
              <p className="text-gray-700 mb-6">
                Permission is granted to temporarily download one copy of the materials on Kleaners website for personal, non-commercial transitory viewing only.
              </p>

              <h2 className="text-2xl font-semibold text-oxford-blue mb-4">3. Service Availability</h2>
              <p className="text-gray-700 mb-6">
                We strive to provide reliable cleaning services, but we cannot guarantee 100% availability due to factors beyond our control.
              </p>

              <h2 className="text-2xl font-semibold text-oxford-blue mb-4">4. User Responsibilities</h2>
              <p className="text-gray-700 mb-6">
                Users are responsible for providing accurate information and ensuring access to the cleaning location at the scheduled time.
              </p>

              <h2 className="text-2xl font-semibold text-oxford-blue mb-4">5. Limitation of Liability</h2>
              <p className="text-gray-700 mb-6">
                In no event shall Kleaners or its suppliers be liable for any damages arising out of the use or inability to use the materials on Kleaners website.
              </p>

              <h2 className="text-2xl font-semibold text-oxford-blue mb-4">6. Contact Information</h2>
              <p className="text-gray-700 mb-6">
                If you have any questions about these Terms of Service, please contact us at legal@kleaners.de
              </p>
            </div>
          </div>
        </UnifiedContainer>
      </main>
      <Footer />
    </div>
  );
}
