'use client';

import React from 'react';
import { PrivateRoute } from '@/shared/components/auth/PrivateRoute';
import { Sidebar } from '@/components/ui/sidebar';
import { PageHeader } from '@/components/ui/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  CreditCard, 
  DollarSign, 
  Receipt, 
  BarChart3,
  Calendar,
  Download,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useNotifications } from '@/contexts/NotificationContext';

// Mock billing data
const billingData = {
  currentPlan: {
    name: 'Professional Plan',
    price: '$99/month',
    status: 'active',
    nextBilling: '2024-02-15',
    features: [
      'Up to 100 devices',
      'Advanced analytics',
      'Priority support',
      'Custom integrations'
    ]
  },
  usage: {
    devices: 45,
    maxDevices: 100,
    storage: 75,
    maxStorage: 100,
    apiCalls: 85000,
    maxApiCalls: 100000
  },
  recentInvoices: [
    {
      id: 'INV-2024-001',
      amount: 99.00,
      status: 'paid',
      date: '2024-01-15',
      dueDate: '2024-01-15'
    },
    {
      id: 'INV-2023-012',
      amount: 99.00,
      status: 'paid',
      date: '2023-12-15',
      dueDate: '2023-12-15'
    },
    {
      id: 'INV-2023-011',
      amount: 99.00,
      status: 'paid',
      date: '2023-11-15',
      dueDate: '2023-11-15'
    }
  ],
  paymentMethods: [
    {
      id: 'pm_1',
      type: 'card',
      last4: '4242',
      brand: 'visa',
      expiry: '12/25',
      isDefault: true
    }
  ]
};

export default function BillingPage() {
  const { unreadCount } = useNotifications();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
      case 'paid':
        return <CheckCircle className="h-4 w-4" />;
      case 'pending':
        return <Clock className="h-4 w-4" />;
      default:
        return <AlertTriangle className="h-4 w-4" />;
    }
  };

  return (
    <PrivateRoute allowedRoles={[0, 1]}>
      <div className="flex h-screen bg-gray-50">
        <div className="w-64 flex-shrink-0">
          <Sidebar />
        </div>
        
        <div className="flex-1 overflow-auto">
          <PageHeader
            title="Billing Overview"
            breadcrumbs={[
              { label: 'Choovio' },
              { label: 'Billing' }
            ]}
            notificationCount={unreadCount}
            onNotificationClick={() => {
              console.log('Notification clicked');
            }}
          />

          {/* Main Content */}
          <main className="p-6 space-y-6">
            {/* Current Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Current Plan
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-semibold">{billingData.currentPlan.name}</h3>
                          <p className="text-2xl font-bold text-[#474dff]">{billingData.currentPlan.price}</p>
                        </div>
                        <Badge className={getStatusColor(billingData.currentPlan.status)}>
                          {billingData.currentPlan.status}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <p className="text-sm text-gray-600">
                          Next billing date: <span className="font-medium">{billingData.currentPlan.nextBilling}</span>
                        </p>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-medium text-sm">Plan Features:</h4>
                        <ul className="space-y-1">
                          {billingData.currentPlan.features.map((feature, index) => (
                            <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                              <CheckCircle className="h-3 w-3 text-green-500" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Device Usage</span>
                          <span className="text-sm text-gray-600">
                            {billingData.usage.devices} / {billingData.usage.maxDevices}
                          </span>
                        </div>
                        <Progress value={(billingData.usage.devices / billingData.usage.maxDevices) * 100} />
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Storage Usage</span>
                          <span className="text-sm text-gray-600">
                            {billingData.usage.storage}% / 100%
                          </span>
                        </div>
                        <Progress value={billingData.usage.storage} />
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">API Calls</span>
                          <span className="text-sm text-gray-600">
                            {billingData.usage.apiCalls.toLocaleString()} / {billingData.usage.maxApiCalls.toLocaleString()}
                          </span>
                        </div>
                        <Progress value={(billingData.usage.apiCalls / billingData.usage.maxApiCalls) * 100} />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Recent Invoices */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Receipt className="h-5 w-5" />
                    Recent Invoices
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {billingData.recentInvoices.map((invoice) => (
                      <div key={invoice.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Receipt className="h-4 w-4 text-gray-400" />
                          <div>
                            <p className="font-medium">{invoice.id}</p>
                            <p className="text-sm text-gray-500">
                              {new Date(invoice.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-semibold">${invoice.amount.toFixed(2)}</span>
                          <Badge className={getStatusColor(invoice.status)}>
                            {invoice.status}
                          </Badge>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Payment Methods */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    Payment Methods
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {billingData.paymentMethods.map((method) => (
                      <div key={method.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <CreditCard className="h-4 w-4 text-gray-400" />
                          <div>
                            <p className="font-medium">
                              {method.brand.charAt(0).toUpperCase() + method.brand.slice(1)} •••• {method.last4}
                            </p>
                            <p className="text-sm text-gray-500">Expires {method.expiry}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {method.isDefault && (
                            <Badge variant="secondary">Default</Badge>
                          )}
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                        </div>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Add Payment Method
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </main>
        </div>
      </div>
    </PrivateRoute>
  );
} 