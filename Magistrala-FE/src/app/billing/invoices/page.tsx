'use client';

import React from 'react';
import { PrivateRoute } from '@/components/auth/PrivateRoute';
import { Sidebar } from '@/components/ui/sidebar';
import { PageHeader } from '@/components/ui/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Receipt, 
  Download,
  Search,
  Filter,
  Calendar,
  DollarSign
} from 'lucide-react';
import { useNotifications } from '@/contexts/NotificationContext';

// Mock invoices data
const invoices = [
  {
    id: 'INV-2024-001',
    amount: 99.00,
    status: 'paid',
    date: '2024-01-15',
    dueDate: '2024-01-15',
    description: 'Professional Plan - January 2024'
  },
  {
    id: 'INV-2023-012',
    amount: 99.00,
    status: 'paid',
    date: '2023-12-15',
    dueDate: '2023-12-15',
    description: 'Professional Plan - December 2023'
  },
  {
    id: 'INV-2023-011',
    amount: 99.00,
    status: 'paid',
    date: '2023-11-15',
    dueDate: '2023-11-15',
    description: 'Professional Plan - November 2023'
  },
  {
    id: 'INV-2023-010',
    amount: 99.00,
    status: 'paid',
    date: '2023-10-15',
    dueDate: '2023-10-15',
    description: 'Professional Plan - October 2023'
  },
  {
    id: 'INV-2023-009',
    amount: 99.00,
    status: 'paid',
    date: '2023-09-15',
    dueDate: '2023-09-15',
    description: 'Professional Plan - September 2023'
  }
];

export default function InvoicesPage() {
  const { unreadCount } = useNotifications();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
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
            title="Invoices"
            breadcrumbs={[
              { label: 'Choovio' },
              { label: 'Billing' },
              { label: 'Invoices' }
            ]}
            notificationCount={unreadCount}
            onNotificationClick={() => {
              console.log('Notification clicked');
            }}
          />

          {/* Main Content */}
          <main className="p-6 space-y-6">
            {/* Search and Filters */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search invoices..."
                      className="pl-10"
                    />
                  </div>
                  <Button variant="outline">
                    <Calendar className="h-4 w-4 mr-2" />
                    Date Range
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Invoices Table */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Receipt className="h-5 w-5" />
                  Invoice History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Invoice</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {invoices.map((invoice) => (
                      <TableRow key={invoice.id} className="hover:bg-gray-50">
                        <TableCell>
                          <div className="font-medium">{invoice.id}</div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm text-gray-600">
                            {invoice.description}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {new Date(invoice.date).toLocaleDateString()}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-semibold">
                            ${invoice.amount.toFixed(2)}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(invoice.status)}>
                            {invoice.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Receipt className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Paid</p>
                      <p className="text-2xl font-bold text-green-600">
                        ${invoices.reduce((sum, inv) => sum + inv.amount, 0).toFixed(2)}
                      </p>
                    </div>
                    <DollarSign className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Invoices</p>
                      <p className="text-2xl font-bold">{invoices.length}</p>
                    </div>
                    <Receipt className="h-8 w-8 text-[#474dff]" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Average Amount</p>
                      <p className="text-2xl font-bold">
                        ${(invoices.reduce((sum, inv) => sum + inv.amount, 0) / invoices.length).toFixed(2)}
                      </p>
                    </div>
                    <Calendar className="h-8 w-8 text-purple-600" />
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