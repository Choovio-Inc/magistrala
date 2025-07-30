'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await login(email, password);
      // Redirect to dashboard on success
      window.location.href = '/';
    } catch (error) {
      setError('Login failed. Please check your credentials.');
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTestLogin = async () => {
    setIsLoading(true);
    setError('');

    try {
      // Use test credentials
      await login('sri@choovio.com', 'admin123');
      window.location.href = '/';
    } catch (error) {
      setError('Test login failed.');
      console.error('Test login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#474dff] to-[#6366f1] p-4"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #474dff 0%, #6366f1 100%)',
        padding: '16px'
      }}
    >
      <Card 
        className="w-full max-w-md"
        style={{
          width: '100%',
          maxWidth: '28rem',
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          border: '1px solid #e5e7eb'
        }}
      >
        <CardHeader 
          className="space-y-1 text-center"
          style={{ padding: '24px 24px 0 24px', textAlign: 'center' }}
        >
          <div 
            className="w-48 mx-auto mb-8 flex items-center justify-center"
            style={{ width: '192px', margin: '0 auto 32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <img 
              src="/logo.png" 
              alt="Logo" 
              style={{ width: "192px", height: "auto" }} 
            />
          </div>
          <CardTitle 
            className="text-2xl font-bold"
            style={{
              fontSize: '1.5rem',
              lineHeight: '2rem',
              fontWeight: '700',
              margin: '0'
            }}
          >
            Login to Total Solutions
          </CardTitle>
          <p 
            className="text-gray-600"
            style={{ color: '#6b7280', margin: '8px 0 0 0' }}
          >
            Welcome back to the Choovio IoT platform
          </p>
        </CardHeader>
        <CardContent style={{ padding: '24px' }}>
          <form onSubmit={handleLogin} className="space-y-4" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {error && (
              <div 
                className="text-red-600 text-sm p-3 bg-red-50 border border-red-200 rounded"
                style={{ 
                  color: '#dc2626', 
                  fontSize: '0.875rem',
                  padding: '12px',
                  backgroundColor: '#fef2f2',
                  border: '1px solid #fecaca',
                  borderRadius: '6px'
                }}
              >
                {error}
              </div>
            )}
            
            <div className="space-y-2" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label 
                htmlFor="email" 
                className="block text-sm font-medium text-gray-700"
                style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#374151'
                }}
              >
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                style={{
                  width: '100%',
                  height: '40px',
                  padding: '8px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '0.875rem',
                  backgroundColor: 'white'
                }}
              />
            </div>
            <div className="space-y-2" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label 
                htmlFor="password" 
                className="block text-sm font-medium text-gray-700"
                style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#374151'
                }}
              >
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                style={{
                  width: '100%',
                  height: '40px',
                  padding: '8px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '0.875rem',
                  backgroundColor: 'white'
                }}
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-[#474dff] hover:bg-[#3b41e6]" 
              disabled={isLoading}
              style={{
                width: '100%',
                height: '40px',
                backgroundColor: '#474dff',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '0.875rem',
                fontWeight: '500',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                opacity: isLoading ? 0.5 : 1
              }}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
          
          <div 
            className="mt-4 pt-4 border-t"
            style={{
              marginTop: '16px',
              paddingTop: '16px',
              borderTop: '1px solid #e5e7eb'
            }}
          >
            <Button 
              onClick={handleTestLogin}
              variant="outline" 
              className="w-full"
              disabled={isLoading}
              style={{
                width: '100%',
                height: '40px',
                backgroundColor: 'white',
                color: '#374151',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '0.875rem',
                fontWeight: '500',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                opacity: isLoading ? 0.5 : 1
              }}
            >
              {isLoading ? 'Logging in...' : 'Login with Test Account'}
            </Button>
            <p 
              className="text-xs text-gray-500 mt-2 text-center"
              style={{
                fontSize: '0.75rem',
                color: '#6b7280',
                marginTop: '8px',
                textAlign: 'center'
              }}
            >
              Test credentials: sri@choovio.com / admin123
            </p>
          </div>
          
          <div 
            className="mt-6 text-center"
            style={{ marginTop: '24px', textAlign: 'center' }}
          >
            <p 
              className="text-sm text-gray-600"
              style={{ fontSize: '0.875rem', color: '#6b7280' }}
            >
              Don't have an account?{' '}
              <Link 
                href="/auth/register" 
                className="text-[#474dff] hover:underline font-medium"
                style={{
                  color: '#474dff',
                  textDecoration: 'none',
                  fontWeight: '500'
                }}
              >
                Sign up
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 