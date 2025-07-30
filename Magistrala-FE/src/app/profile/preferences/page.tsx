'use client';

import React, { useState } from 'react';
import { PrivateRoute } from '@/components/auth/PrivateRoute';
import { Sidebar } from '@/components/ui/sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { 
  Palette, 
  Bell, 
  Globe, 
  Save
} from 'lucide-react';
import { toast } from 'sonner';

export default function PreferencesPage() {
  const [preferences, setPreferences] = useState({
    theme: 'light',
    language: 'en',
    notifications: {
      email: true,
      push: true,
      security: true,
      updates: true
    }
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Preferences saved successfully');
    } catch (error) {
      toast.error('Failed to save preferences');
    } finally {
      setIsLoading(false);
    }
  };

  const themes = [
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
    { value: 'auto', label: 'Auto' }
  ];

  const languages = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Español' },
    { value: 'fr', label: 'Français' },
    { value: 'de', label: 'Deutsch' }
  ];

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
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Preferences</h1>
                <p className="text-sm text-gray-600">Customize your experience</p>
              </div>
              <Button onClick={handleSave} disabled={isLoading}>
                <Save className="h-4 w-4 mr-2" />
                {isLoading ? 'Saving...' : 'Save'}
              </Button>
            </div>
          </header>

          {/* Main Content */}
          <main className="p-6">
            <div className="max-w-2xl mx-auto space-y-6">
              {/* Appearance */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="h-5 w-5" />
                    Appearance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Theme</Label>
                    <Select
                      value={preferences.theme}
                      onValueChange={(value) => setPreferences(prev => ({ ...prev, theme: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {themes.map((theme) => (
                          <SelectItem key={theme.value} value={theme.value}>
                            {theme.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Language</Label>
                    <Select
                      value={preferences.language}
                      onValueChange={(value) => setPreferences(prev => ({ ...prev, language: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {languages.map((lang) => (
                          <SelectItem key={lang.value} value={lang.value}>
                            {lang.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Notifications */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Notifications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-gray-600">Receive notifications via email</p>
                      </div>
                      <Switch
                        checked={preferences.notifications.email}
                        onCheckedChange={(checked) => setPreferences(prev => ({
                          ...prev,
                          notifications: { ...prev.notifications, email: checked }
                        }))}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Push Notifications</p>
                        <p className="text-sm text-gray-600">Receive push notifications</p>
                      </div>
                      <Switch
                        checked={preferences.notifications.push}
                        onCheckedChange={(checked) => setPreferences(prev => ({
                          ...prev,
                          notifications: { ...prev.notifications, push: checked }
                        }))}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Security Alerts</p>
                        <p className="text-sm text-gray-600">Important security notifications</p>
                      </div>
                      <Switch
                        checked={preferences.notifications.security}
                        onCheckedChange={(checked) => setPreferences(prev => ({
                          ...prev,
                          notifications: { ...prev.notifications, security: checked }
                        }))}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">System Updates</p>
                        <p className="text-sm text-gray-600">Platform updates and maintenance</p>
                      </div>
                      <Switch
                        checked={preferences.notifications.updates}
                        onCheckedChange={(checked) => setPreferences(prev => ({
                          ...prev,
                          notifications: { ...prev.notifications, updates: checked }
                        }))}
                      />
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