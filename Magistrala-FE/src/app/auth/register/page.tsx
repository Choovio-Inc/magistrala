'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, EyeOff } from 'lucide-react';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'admin' | 'customer'>('customer');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { register } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await register(name, email, password, role);
      router.push('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
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
            Create Account
          </CardTitle>
          <p 
            className="text-gray-600"
            style={{ color: '#6b7280', margin: '8px 0 0 0' }}
          >
            Join the Choovio IoT platform
          </p>
        </CardHeader>
        <CardContent style={{ padding: '24px' }}>
          <form onSubmit={handleSubmit} className="space-y-4" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {error && (
              <Alert 
                variant="destructive"
                style={{
                  backgroundColor: '#fef2f2',
                  border: '1px solid #fecaca',
                  borderRadius: '6px',
                  padding: '12px',
                  color: '#dc2626'
                }}
              >
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <div className="space-y-2" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Label 
                htmlFor="name"
                style={{
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#374151'
                }}
              >
                Full Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={isLoading}
                style={{
                  width: '100%',
                  height: '40px',
                  padding: '8px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '0.875rem',
                  backgroundColor: 'white',
                  opacity: isLoading ? 0.5 : 1
                }}
              />
            </div>
            
            <div className="space-y-2" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Label 
                htmlFor="email"
                style={{
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#374151'
                }}
              >
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                style={{
                  width: '100%',
                  height: '40px',
                  padding: '8px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '0.875rem',
                  backgroundColor: 'white',
                  opacity: isLoading ? 0.5 : 1
                }}
              />
            </div>
            
            <div className="space-y-2" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Label 
                htmlFor="password"
                style={{
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#374151'
                }}
              >
                Password
              </Label>
              <div className="relative" style={{ position: 'relative' }}>
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  minLength={6}
                  style={{
                    width: '100%',
                    height: '40px',
                    padding: '8px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '0.875rem',
                    backgroundColor: 'white',
                    opacity: isLoading ? 0.5 : 1
                  }}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#6b7280',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            
            <div className="space-y-2" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Label 
                htmlFor="role"
                style={{
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#374151'
                }}
              >
                Role
              </Label>
              <Select value={role} onValueChange={(value: 'admin' | 'customer') => setRole(value)}>
                <SelectTrigger style={{
                  width: '100%',
                  height: '40px',
                  padding: '8px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '0.875rem',
                  backgroundColor: 'white'
                }}>
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="customer">Customer</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
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
              {isLoading ? (
                <div className="flex items-center" style={{ display: 'flex', alignItems: 'center' }}>
                  <div 
                    className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"
                    style={{
                      animation: 'spin 1s linear infinite',
                      borderRadius: '50%',
                      height: '16px',
                      width: '16px',
                      border: '2px solid transparent',
                      borderBottomColor: 'white',
                      marginRight: '8px'
                    }}
                  ></div>
                  Creating account...
                </div>
              ) : (
                'Create Account'
              )}
            </Button>
          </form>
          
          <div 
            className="mt-6 text-center"
            style={{ marginTop: '24px', textAlign: 'center' }}
          >
            <p 
              className="text-sm text-gray-600"
              style={{ fontSize: '0.875rem', color: '#6b7280' }}
            >
              Already have an account?{' '}
              <Link 
                href="/auth/login" 
                className="text-[#474dff] hover:underline font-medium"
                style={{
                  color: '#474dff',
                  textDecoration: 'none',
                  fontWeight: '500'
                }}
              >
                Sign in
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 