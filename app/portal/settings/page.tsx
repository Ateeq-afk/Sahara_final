import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Bell, Mail, MessageSquare, Shield, Eye, Download, Trash2 } from 'lucide-react'

export default async function SettingsPage() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect('/login')
  }

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-2">Manage your account preferences and privacy settings</p>
      </div>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notification Preferences
          </CardTitle>
          <CardDescription>
            Choose how you want to receive updates about your projects
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-gray-600">Receive project updates via email</p>
                </div>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <MessageSquare className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium">SMS Notifications</p>
                  <p className="text-sm text-gray-600">Get important updates via SMS</p>
                </div>
              </div>
              <Switch />
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <Bell className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="font-medium">Push Notifications</p>
                  <p className="text-sm text-gray-600">Browser notifications for real-time updates</p>
                </div>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
          
          <div className="pt-4 border-t">
            <h4 className="font-medium mb-4">Email Frequency</h4>
            <div className="space-y-3">
              <label className="flex items-center space-x-3">
                <input type="radio" name="frequency" value="immediate" defaultChecked className="text-blue-600" />
                <span className="text-sm">Immediate - Get notified right away</span>
              </label>
              <label className="flex items-center space-x-3">
                <input type="radio" name="frequency" value="daily" className="text-blue-600" />
                <span className="text-sm">Daily Digest - Once per day summary</span>
              </label>
              <label className="flex items-center space-x-3">
                <input type="radio" name="frequency" value="weekly" className="text-blue-600" />
                <span className="text-sm">Weekly Summary - Weekly project updates</span>
              </label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Privacy Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Privacy & Security
          </CardTitle>
          <CardDescription>
            Control your privacy and security preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <Eye className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium">Profile Visibility</p>
                  <p className="text-sm text-gray-600">Allow team members to see your profile</p>
                </div>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <Download className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium">Data Export</p>
                  <p className="text-sm text-gray-600">Download your account data</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Export Data
              </Button>
            </div>
          </div>
          
          <div className="pt-4 border-t">
            <h4 className="font-medium mb-4">Password & Security</h4>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" placeholder="Enter current password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" placeholder="Enter new password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input id="confirm-password" type="password" placeholder="Confirm new password" />
              </div>
              <Button className="w-full sm:w-auto">
                Update Password
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Communication Preferences */}
      <Card>
        <CardHeader>
          <CardTitle>Communication Preferences</CardTitle>
          <CardDescription>
            Choose your preferred communication methods
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="preferred-time">Preferred Contact Time</Label>
              <select 
                id="preferred-time" 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="morning">Morning (9 AM - 12 PM)</option>
                <option value="afternoon">Afternoon (12 PM - 5 PM)</option>
                <option value="evening">Evening (5 PM - 8 PM)</option>
                <option value="anytime">Anytime</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="preferred-method">Preferred Contact Method</Label>
              <select 
                id="preferred-method" 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="email">Email</option>
                <option value="phone">Phone Call</option>
                <option value="sms">SMS</option>
                <option value="whatsapp">WhatsApp</option>
              </select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="emergency-contact">Emergency Contact Number</Label>
            <Input id="emergency-contact" placeholder="+91 98765 43210" />
          </div>
        </CardContent>
      </Card>

      {/* Account Management */}
      <Card>
        <CardHeader>
          <CardTitle className="text-red-600">Account Management</CardTitle>
          <CardDescription>
            Permanent actions for your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 border border-red-200 rounded-lg bg-red-50">
            <div className="flex items-start gap-3">
              <Trash2 className="h-5 w-5 text-red-600 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-medium text-red-900">Delete Account</h4>
                <p className="text-sm text-red-700 mt-1">
                  Permanently delete your account and all associated data. This action cannot be undone.
                </p>
                <Button variant="destructive" size="sm" className="mt-3">
                  Request Account Deletion
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Settings */}
      <div className="flex flex-col sm:flex-row gap-4 pt-6">
        <Button className="flex-1 sm:flex-none">
          Save All Settings
        </Button>
        <Button variant="outline" className="flex-1 sm:flex-none">
          Reset to Defaults
        </Button>
      </div>
    </div>
  )
}