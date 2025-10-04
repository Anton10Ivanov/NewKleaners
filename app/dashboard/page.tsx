'use client';

import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { UnifiedContainer } from '@/components/layout/UnifiedContainer';
import { useAuth } from '@/components/providers/AuthProvider';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  AlertCircle,
  ArrowRight,
  Calendar,
  CheckCircle,
  Clock,
  MapPin,
  Plus,
  Star
} from 'lucide-react';
import Link from 'next/link';

const upcomingBookings = [
  {
    id: 'BK001',
    service: 'Home Cleaning',
    date: '2024-01-15',
    time: '10:00 AM',
    status: 'confirmed',
    address: '123 Main St, Frankfurt',
    duration: '3 hours',
    price: '$120'
  },
  {
    id: 'BK002',
    service: 'Office Cleaning',
    date: '2024-01-20',
    time: '2:00 PM',
    status: 'pending',
    address: '456 Business Ave, Frankfurt',
    duration: '4 hours',
    price: '$180'
  }
];

const pastBookings = [
  {
    id: 'BK003',
    service: 'Deep Cleaning',
    date: '2024-01-05',
    time: '9:00 AM',
    status: 'completed',
    address: '789 Residential St, Frankfurt',
    duration: '5 hours',
    price: '$200',
    rating: 5
  }
];

export default function DashboardPage() {
  const { user } = useAuth();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="w-4 h-4" />;
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Welcome Section */}
        <section className="bg-gradient-to-br from-seasalt via-seasalt-50 to-orange-peel-50 py-12">
          <UnifiedContainer size="xl" padding="lg">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h1 className="text-3xl font-bold text-oxford-blue mb-2">
                  Welcome back, {user?.email?.split('@')[0] || 'User'}!
                </h1>
                <p className="text-oxford-blue-600">
                  Manage your bookings and cleaning services
                </p>
              </div>
              <Link href="/book">
                <Button className="bg-orange-peel hover:bg-orange-peel-600 text-black">
                  <Plus className="w-4 h-4 mr-2" />
                  Book New Service
                </Button>
              </Link>
            </div>
          </UnifiedContainer>
        </section>

        {/* Quick Stats */}
        <section className="py-8">
          <UnifiedContainer size="xl" padding="lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Upcoming Bookings</p>
                      <p className="text-2xl font-bold text-oxford-blue">
                        {upcomingBookings.length}
                      </p>
                    </div>
                    <Calendar className="w-8 h-8 text-orange-peel" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Bookings</p>
                      <p className="text-2xl font-bold text-oxford-blue">
                        {upcomingBookings.length + pastBookings.length}
                      </p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Average Rating</p>
                      <p className="text-2xl font-bold text-oxford-blue">4.8</p>
                    </div>
                    <Star className="w-8 h-8 text-yellow-500" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </UnifiedContainer>
        </section>

        {/* Upcoming Bookings */}
        <section className="py-8">
          <UnifiedContainer size="xl" padding="lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-oxford-blue">Upcoming Bookings</h2>
              <Link href="/bookings">
                <Button variant="outline">
                  View All
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {upcomingBookings.map((booking) => (
                <Card key={booking.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{booking.service}</CardTitle>
                        <CardDescription>Booking #{booking.id}</CardDescription>
                      </div>
                      <Badge className={getStatusColor(booking.status)}>
                        <div className="flex items-center">
                          {getStatusIcon(booking.status)}
                          <span className="ml-1 capitalize">{booking.status}</span>
                        </div>
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        {new Date(booking.date).toLocaleDateString()} at {booking.time}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-2" />
                        {booking.address}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="w-4 h-4 mr-2" />
                        {booking.duration}
                      </div>
                      <div className="flex justify-between items-center pt-2 border-t">
                        <span className="font-semibold text-lg">{booking.price}</span>
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </UnifiedContainer>
        </section>

        {/* Recent Bookings */}
        <section className="py-8 bg-gray-50">
          <UnifiedContainer size="xl" padding="lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-oxford-blue">Recent Bookings</h2>
              <Link href="/bookings">
                <Button variant="outline">
                  View All
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pastBookings.map((booking) => (
                <Card key={booking.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{booking.service}</CardTitle>
                        <CardDescription>Booking #{booking.id}</CardDescription>
                      </div>
                      <Badge className={getStatusColor(booking.status)}>
                        <div className="flex items-center">
                          {getStatusIcon(booking.status)}
                          <span className="ml-1 capitalize">{booking.status}</span>
                        </div>
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        {new Date(booking.date).toLocaleDateString()} at {booking.time}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-2" />
                        {booking.address}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="w-4 h-4 mr-2" />
                        {booking.duration}
                      </div>
                      {booking.rating && (
                        <div className="flex items-center text-sm text-gray-600">
                          <Star className="w-4 h-4 mr-2 text-yellow-500" />
                          Rated {booking.rating}/5 stars
                        </div>
                      )}
                      <div className="flex justify-between items-center pt-2 border-t">
                        <span className="font-semibold text-lg">{booking.price}</span>
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </UnifiedContainer>
        </section>
      </main>
      <Footer />
    </div>
  );
}
