'use client';

import React, { useState } from 'react';
import { PrivateRoute } from '@/components/auth/PrivateRoute';
import { Sidebar } from '@/components/ui/sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Shield, 
  Smartphone, 
  Key, 
  AlertTriangle,
  CheckCircle,
  X,
  ArrowLeft,
  Monitor,
  Globe,
  Clock,
  Trash2,
  Download,
  Eye,
  EyeOff
} from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';

// Mock security data
const securityData = {
  twoFactorEnabled: false,
  backupCodes: ['12345678', '87654321', '11223344', '44332211'],
  sessions: [
    {
      id: 'session-1',
      device: 'Chrome on Mac',
      location: 'San Francisco, CA',
      ip: '192.168.1.100',
      lastActive: '2024-01-29T10:30:00Z',
      isCurrent: true
    },
    {
      id: 'session-2',
      device: 'Mobile Safari',
      location: 'San Francisco, CA',
      ip: '192.168.1.101',
      lastActive: '2024-01-28T15:45:00Z',
      isCurrent: false
    },
    {
      id: 'session-3',
      device: 'Chrome on Windows',
      location: 'New York, NY',
      ip: '203.0.113.1',
      lastActive: '2024-01-27T09:15:00Z',
      isCurrent: false
    }
  ],
  loginHistory: [
    {
      id: 'login-1',
      date: '2024-01-29T10:30:00Z',
      device: 'Chrome on Mac',
      location: 'San Francisco, CA',
      ip: '192.168.1.100',
      status: 'success'
    },
    {
      id: 'login-2',
      date: '2024-01-28T15:45:00Z',
      device: 'Mobile Safari',
      location: 'San Francisco, CA',
      ip: '192.168.1.101',
      status: 'success'
    },
    {
      id: 'login-3',
      date: '2024-01-27T09:15:00Z',
      device: 'Chrome on Windows',
      location: 'New York, NY',
      ip: '203.0.113.1',
      status: 'success'
    }
  ]
};

export default function SecurityPage() {
  const [security, setSecurity] = useState(securityData);
  const [showBackupCodes, setShowBackupCodes] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleTwoFactorToggle = async (enabled: boolean) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSecurity(prev => ({
        ...prev,
        twoFactorEnabled: enabled
      }));
      
      toast.success(`Two-factor authentication ${enabled ? 'enabled' : 'disabled'}`);
    } catch (error) {
      toast.error('Failed to update two-factor authentication');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRevokeSession = async (sessionId: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSecurity(prev => ({
        ...prev,
        sessions: prev.sessions.filter(session => session.id !== sessionId)
      }));
      
      toast.success('Session revoked successfully');
    } catch (error) {
      toast.error('Failed to revoke session');
    }
  };

  const handleRevokeAllSessions = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSecurity(prev => ({
        ...prev,
        sessions: prev.sessions.filter(session => session.isCurrent)
      }));
      
      toast.success('All other sessions revoked successfully');
    } catch (error) {
      toast.error('Failed to revoke sessions');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const getStatusIcon = (status: string) => {
    return status === 'success' ? (
      <CheckCircle className="h-4 w-4 text-green-500" />
    ) : (
      <AlertTriangle className="h-4 w-4 text-red-500" />
    );
  };

  return (
    <PrivateRoute allowedRoles={[0, 1]}>
      <div className="flex h-screen bg-gray-50">
        <div className="w-64 flex-shrink-0">
          <Sidebar />
        </div>
        
        <div className="flex-1 overflow-auto">
          {/* Header */}
          <header className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link href="/profile">
                  <Button variant="ghost" size="sm">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Profile
                  </Button>
                </Link>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Security Settings</h1>
                  <nav className="flex items-center space-x-2 text-sm text-gray-500">
                    <span>Choovio</span>
                    <span>›</span>
                    <span>Profile</span>
                    <span>›</span>
                    <span>Security</span>
                  </nav>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="p-6 space-y-6">
            <div className="max-w-6xl mx-auto space-y-6">
              {/* Two-Factor Authentication */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Two-Factor Authentication
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Smartphone className="h-5 w-5 text-[#474dff]" />
                        <div>
                          <h4 className="font-medium">Two-Factor Authentication</h4>
                          <p className="text-sm text-gray-600">
                            Add an extra layer of security to your account
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Switch
                          checked={security.twoFactorEnabled}
                          onCheckedChange={handleTwoFactorToggle}
                          disabled={isLoading}
                        />
                        <Badge variant={security.twoFactorEnabled ? 'default' : 'secondary'}>
                          {security.twoFactorEnabled ? 'Enabled' : 'Disabled'}
                        </Badge>
                      </div>
                    </div>

                    {security.twoFactorEnabled && (
                      <div className="space-y-4">
                        <Alert>
                          <Shield className="h-4 w-4" />
                          <AlertDescription>
                            Two-factor authentication is now enabled. You'll need to enter a code from your authenticator app when signing in.
                          </AlertDescription>
                        </Alert>

                        <div className="space-y-3">
                          <h5 className="font-medium">Backup Codes</h5>
                          <p className="text-sm text-gray-600">
                            Save these backup codes in a secure location. You can use them to access your account if you lose your authenticator device.
                          </p>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                            {security.backupCodes.map((code, index) => (
                              <div key={index} className="p-2 bg-gray-100 rounded text-center font-mono text-sm">
                                {showBackupCodes ? code : '••••••••'}
                              </div>
                            ))}
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setShowBackupCodes(!showBackupCodes)}
                            >
                              {showBackupCodes ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              {showBackupCodes ? 'Hide' : 'Show'} Codes
                            </Button>
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Active Sessions */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Monitor className="h-5 w-5" />
                      Active Sessions
                    </CardTitle>
                    <Button variant="outline" size="sm" onClick={handleRevokeAllSessions}>
                      Revoke All Other Sessions
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Device</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>IP Address</TableHead>
                        <TableHead>Last Active</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {security.sessions.map((session) => (
                        <TableRow key={session.id}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Monitor className="h-4 w-4 text-gray-400" />
                              <div>
                                <p className="font-medium">{session.device}</p>
                                {session.isCurrent && (
                                  <Badge variant="secondary" className="text-xs">
                                    Current Session
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Globe className="h-4 w-4 text-gray-400" />
                              {session.location}
                            </div>
                          </TableCell>
                          <TableCell className="font-mono text-sm">
                            {session.ip}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-gray-400" />
                              {formatDate(session.lastActive)}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="default" className="bg-green-100 text-green-800">
                              Active
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {!session.isCurrent && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleRevokeSession(session.id)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Login History */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Key className="h-5 w-5" />
                    Login History
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date & Time</TableHead>
                        <TableHead>Device</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>IP Address</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {security.loginHistory.map((login) => (
                        <TableRow key={login.id}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-gray-400" />
                              {formatDate(login.date)}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Monitor className="h-4 w-4 text-gray-400" />
                              {login.device}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Globe className="h-4 w-4 text-gray-400" />
                              {login.location}
                            </div>
                          </TableCell>
                          <TableCell className="font-mono text-sm">
                            {login.ip}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getStatusIcon(login.status)}
                              <Badge variant="default" className="bg-green-100 text-green-800">
                                {login.status}
                              </Badge>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Security Tips */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Security Best Practices
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h4 className="font-medium">Account Security</h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                          <span>Use a strong, unique password</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                          <span>Enable two-factor authentication</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                          <span>Regularly review active sessions</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                          <span>Keep backup codes in a safe place</span>
                        </li>
                      </ul>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-medium">Device Security</h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                          <span>Keep your devices updated</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                          <span>Use antivirus software</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                          <span>Be cautious on public networks</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                          <span>Log out when using shared devices</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </PrivateRoute>
  );
} 