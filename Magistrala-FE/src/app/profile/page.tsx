'use client';

import React, { useState } from 'react';
import { PrivateRoute } from '@/components/auth/PrivateRoute';
import { Sidebar } from '@/components/ui/sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { 
  User, 
  Shield, 
  Bell, 
  Palette, 
  Key, 
  Mail, 
  Phone, 
  MapPin,
  Edit,
  Save,
  X,
  CheckCircle,
  AlertTriangle,
  Settings,
  Activity
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useProfile } from '@/hooks/useProfile';
import { ProfileOverview } from './components/ProfileOverview';

export default function ProfilePage() {
  const { user } = useAuth();
  const {
    profile,
    isLoading,
    isEditing,
    setIsEditing,
    updateProfile,
    uploadProfilePicture,
    toggleTwoFactor,
    updateNotificationPreferences,
    updateTheme
  } = useProfile();

  const [formData, setFormData] = useState({
    firstName: profile?.user.firstName || '',
    lastName: profile?.user.lastName || '',
    email: profile?.user.email || '',
    phone: '',
    location: '',
    timezone: profile?.preferences.timezone || '',
    language: profile?.preferences.language || ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    if (!profile) return;
    
    await updateProfile({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      location: formData.location,
      timezone: formData.timezone,
      language: formData.language
    });
  };

  const handleCancel = () => {
    if (!profile) return;
    
    setFormData({
      firstName: profile.user.firstName,
      lastName: profile.user.lastName,
      email: profile.user.email,
      phone: '',
      location: '',
      timezone: profile.preferences.timezone,
      language: profile.preferences.language
    });
    setIsEditing(false);
  };

  const handleAvatarUpload = (file: File) => {
    uploadProfilePicture(file);
  };

  const handleNotificationToggle = (type: string, enabled: boolean) => {
    if (!profile) return;
    
    const updatedNotifications = {
      ...profile.preferences.notifications,
        [type]: enabled
    };
    updateNotificationPreferences(updatedNotifications);
  };

  const handleThemeChange = (theme: 'light' | 'dark' | 'auto') => {
    updateTheme(theme);
  };

  if (!profile) {
    return (
      <PrivateRoute allowedRoles={[0, 1]}>
        <div className="flex h-screen bg-gray-50">
          <div className="w-64 flex-shrink-0">
            <Sidebar />
          </div>
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#474dff] mx-auto mb-4"></div>
              <p className="text-gray-600">Loading profile...</p>
            </div>
          </div>
        </div>
      </PrivateRoute>
    );
  }

  return (
    <PrivateRoute allowedRoles={[0, 1]}>
      <div className="flex h-screen bg-gray-50">
        <div className="w-64 flex-shrink-0">
          <Sidebar />
        </div>
        
        <div className="flex-1 overflow-auto">
          {/* Header */}
          <header className="bg-[#474dff] px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-white">Profile Management</h1>
                <nav className="flex items-center space-x-2 text-sm text-white/80">
                  <span>Choovio</span>
                  <span>›</span>
                  <span>Profile</span>
                </nav>
              </div>
              <div className="flex items-center gap-2">
                {isEditing ? (
                  <>
                    <Button variant="outline" onClick={handleCancel} disabled={isLoading} className="pill-button bg-white/10 border-white/20 text-white hover:bg-white/20">
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                    <Button onClick={handleSave} disabled={isLoading} className="pill-button bg-white text-[#474dff] hover:bg-white/90">
                      <Save className="h-4 w-4 mr-2" />
                      {isLoading ? 'Saving...' : 'Save Changes'}
                    </Button>
                  </>
                ) : (
                  <Button onClick={() => setIsEditing(true)} className="pill-button bg-white text-[#474dff] hover:bg-white/90">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                )}
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="p-6 space-y-6">
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
                <TabsTrigger value="preferences">Preferences</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                <ProfileOverview
                  profile={profile}
                  isEditing={isEditing}
                  isLoading={isLoading}
                  formData={formData}
                  onInputChange={handleInputChange}
                  onSave={handleSave}
                  onCancel={handleCancel}
                  onEdit={() => setIsEditing(true)}
                  onAvatarUpload={handleAvatarUpload}
                />
              </TabsContent>

              {/* Security Tab */}
              <TabsContent value="security" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Password Management */}
                  <Card className="pill-card">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Key className="h-5 w-5" />
                        Password & Security
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Change Password</h4>
                          <p className="text-sm text-gray-600">
                            Last changed: {profile.security.lastPasswordChange}
                          </p>
                        </div>
                                             <Button variant="outline" size="sm" className="pill-button">
                          Change Password
                        </Button>
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Two-Factor Authentication</h4>
                          <p className="text-sm text-gray-600">
                            Add an extra layer of security
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={profile.security.twoFactorEnabled}
                            onCheckedChange={(checked) => {
                              toggleTwoFactor(checked);
                            }}
                          />
                          <Badge variant={profile.security.twoFactorEnabled ? 'default' : 'secondary'}>
                            {profile.security.twoFactorEnabled ? 'Enabled' : 'Disabled'}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Login History */}
                  <Card className="pill-card">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Shield className="h-5 w-5" />
                        Recent Login Activity
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {profile.security.loginHistory.map((login, index) => (
                          <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center gap-3">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              <div>
                                <p className="text-sm font-medium">{login.device}</p>
                                <p className="text-xs text-gray-500">{login.location}</p>
                              </div>
                            </div>
                            <p className="text-xs text-gray-500">
                              {new Date(login.date).toLocaleDateString()}
                            </p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Preferences Tab */}
              <TabsContent value="preferences" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Notifications */}
                  <Card className="pill-card">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Bell className="h-5 w-5" />
                        Notification Preferences
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {Object.entries(profile.preferences.notifications).map(([key, enabled]) => (
                        <div key={key} className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium capitalize">{key} Notifications</h4>
                            <p className="text-sm text-gray-600">
                              Receive {key} notifications
                            </p>
                          </div>
                          <Switch
                            checked={enabled}
                            onCheckedChange={(checked) => handleNotificationToggle(key, checked)}
                          />
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Appearance */}
                  <Card className="pill-card">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Palette className="h-5 w-5" />
                        Appearance & Display
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium">Theme</Label>
                        <div className="flex gap-2 mt-2">
                          {['light', 'dark', 'auto'].map((theme) => (
                            <Button
                              key={theme}
                               variant={profile.preferences.theme === theme ? 'default' : 'outline'}
                              size="sm"
                               className="pill-button"
                               onClick={() => handleThemeChange(theme as 'light' | 'dark' | 'auto')}
                            >
                              {theme.charAt(0).toUpperCase() + theme.slice(1)}
                            </Button>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <Label className="text-sm font-medium">Language</Label>
                        <select
                          className="w-full mt-2 p-2 border rounded-md"
                          value={profile.preferences.language}
                          onChange={(e) => {
                            // Handle language change
                            console.log('Language changed to:', e.target.value);
                          }}
                        >
                          <option value="English">English</option>
                          <option value="Spanish">Spanish</option>
                          <option value="French">French</option>
                          <option value="German">German</option>
                        </select>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Activity Tab */}
              <TabsContent value="activity" className="space-y-6">
                <Card className="pill-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="h-5 w-5" />
                      Account Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <CheckCircle className="h-5 w-5 text-green-500" />
                          <div>
                            <h4 className="font-medium">Profile Updated</h4>
                            <p className="text-sm text-gray-600">Personal information modified</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-500">2 hours ago</p>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Shield className="h-5 w-5 text-[#474dff]" />
                          <div>
                            <h4 className="font-medium">Password Changed</h4>
                            <p className="text-sm text-gray-600">Account password updated</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-500">1 week ago</p>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Mail className="h-5 w-5 text-purple-500" />
                          <div>
                            <h4 className="font-medium">Email Verified</h4>
                            <p className="text-sm text-gray-600">Email address confirmed</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-500">2 weeks ago</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </PrivateRoute>
  );
} 
