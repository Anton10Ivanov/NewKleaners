'use client';

import { useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { ArrowRight, Lock, Mail, User } from 'lucide-react';

import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { UnifiedContainer } from '@/components/layout/UnifiedContainer';
import { useAuth } from '@/components/providers/AuthProvider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function SignUpPage() {
  const { signUp } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (!formData.agreeToTerms) {
      setError('Please agree to the terms and conditions');
      setIsLoading(false);
      return;
    }

    try {
      const fullName = `${formData.firstName} ${formData.lastName}`;
      await signUp(formData.email, formData.password, fullName);
      router.push('/dashboard');
    } catch (err) {
      setError('Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-background'>
      <Header />
      <main className='flex items-center justify-center min-h-[80vh] py-12'>
        <UnifiedContainer size='sm' padding='lg'>
          <Card className='w-full max-w-md mx-auto'>
            <CardHeader className='text-center'>
              <CardTitle className='heading-3 text-oxford-blue'>Create Account</CardTitle>
              <CardDescription>Sign up to start booking cleaning services</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className='space-y-6'>
                {error && (
                  <div className='bg-red-50 border border-red-200 rounded-lg p-4'>
                    <p className='body-small text-red-700'>{error}</p>
                  </div>
                )}

                <div className='space-y-4'>
                  <div className='grid grid-cols-2 gap-4'>
                    <div>
                      <Label htmlFor='firstName'>First Name</Label>
                      <div className='relative'>
                        <User className='absolute left-3 top-3 h-4 w-4 text-gray-400' />
                        <Input
                          id='firstName'
                          name='firstName'
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required
                          placeholder='First name'
                          className='pl-10'
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor='lastName'>Last Name</Label>
                      <div className='relative'>
                        <User className='absolute left-3 top-3 h-4 w-4 text-gray-400' />
                        <Input
                          id='lastName'
                          name='lastName'
                          value={formData.lastName}
                          onChange={handleInputChange}
                          required
                          placeholder='Last name'
                          className='pl-10'
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor='email'>Email</Label>
                    <div className='relative'>
                      <Mail className='absolute left-3 top-3 h-4 w-4 text-gray-400' />
                      <Input
                        id='email'
                        name='email'
                        type='email'
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder='Enter your email'
                        className='pl-10'
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor='password'>Password</Label>
                    <div className='relative'>
                      <Lock className='absolute left-3 top-3 h-4 w-4 text-gray-400' />
                      <Input
                        id='password'
                        name='password'
                        type='password'
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                        placeholder='Create a password'
                        className='pl-10'
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor='confirmPassword'>Confirm Password</Label>
                    <div className='relative'>
                      <Lock className='absolute left-3 top-3 h-4 w-4 text-gray-400' />
                      <Input
                        id='confirmPassword'
                        name='confirmPassword'
                        type='password'
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        required
                        placeholder='Confirm your password'
                        className='pl-10'
                      />
                    </div>
                  </div>
                </div>

                <div className='flex items-center space-x-2'>
                  <Checkbox
                    id='agreeToTerms'
                    name='agreeToTerms'
                    checked={formData.agreeToTerms}
                    onCheckedChange={checked =>
                      setFormData(prev => ({ ...prev, agreeToTerms: checked as boolean }))
                    }
                  />
                  <Label htmlFor='agreeToTerms' className='body-small text-gray-600'>
                    I agree to the{' '}
                    <Link href='/terms' className='text-orange-peel hover:underline'>
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link href='/privacy' className='text-orange-peel hover:underline'>
                      Privacy Policy
                    </Link>
                  </Label>
                </div>

                <Button type='submit' className='w-full' disabled={isLoading}>
                  {isLoading ? 'Creating account...' : 'Create Account'}
                  <ArrowRight className='w-4 h-4 ml-2' />
                </Button>
              </form>

              <div className='mt-6 text-center'>
                <p className='body-small text-gray-600'>
                  Already have an account?{' '}
                  <Link href='/auth/signin' className='text-orange-peel hover:underline'>
                    Sign in
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </UnifiedContainer>
      </main>
      <Footer />
    </div>
  );
}
