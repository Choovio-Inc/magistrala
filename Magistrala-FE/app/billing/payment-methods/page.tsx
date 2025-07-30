'use client';

import React from 'react';
import { PrivateRoute } from '@/shared/components/auth/PrivateRoute';
import { Sidebar } from '@/components/ui/sidebar';
import { PageHeader } from '@/components/ui/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  CreditCard, 
  DollarSign, 
  Plus,
  Edit,
  Trash2,
  Shield,
  CheckCircle
} from 'lucide-react';
import { useNotifications } from '@/contexts/NotificationContext';

// Mock payment methods data
const paymentMethods = [
  {
    id: 'pm_1',
    type: 'card',
    last4: '4242',
    brand: 'visa',
    expiry: '12/25',
    isDefault: true,
    name: 'John Doe'
  },
  {
    id: 'pm_2',
    type: 'card',
    last4: '5555',
    brand: 'mastercard',
    expiry: '08/26',
    isDefault: false,
    name: 'John Doe'
  }
];

export default function PaymentMethodsPage() {
  const { unreadCount } = useNotifications();

  return (
    <PrivateRoute allowedRoles={[0, 1]}>
      <div className="flex h-screen bg-gray-50">
        <div className="w-64 flex-shrink-0">
          <Sidebar />
        </div>
        
        <div className="flex-1 overflow-auto">
          <PageHeader
            title="Payment Methods"
            breadcrumbs={[
              { label: 'Choovio' },
              { label: 'Billing' },
              { label: 'Payment Methods' }
            ]}
            notificationCount={unreadCount}
            onNotificationClick={() => {
              console.log('Notification clicked');
            }}
          />

          {/* Main Content */}
          <main className="p-6 space-y-6">
            {/* Payment Methods List */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Saved Payment Methods
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {paymentMethods.map((method) => (
                    <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded flex items-center justify-center">
                          <CreditCard className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <p className="font-medium">
                            {method.brand.charAt(0).toUpperCase() + method.brand.slice(1)} •••• {method.last4}
                          </p>
                          <p className="text-sm text-gray-500">
                            {method.name} • Expires {method.expiry}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {method.isDefault && (
                          <Badge variant="secondary" className="flex items-center gap-1">
                            <CheckCircle className="h-3 w-3" />
                            Default
                          </Badge>
                        )}
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Security Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security & Privacy
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Secure Payment Processing</h4>
                      <p className="text-sm text-gray-600">
                        All payment information is encrypted and securely processed through our PCI-compliant payment processor.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-[#474dff] mt-0.5" />
                    <div>
                      <h4 className="font-medium">Tokenized Storage</h4>
                      <p className="text-sm text-gray-600">
                        We never store your full card details. Instead, we use secure tokens for recurring payments.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </PrivateRoute>
  );
} 