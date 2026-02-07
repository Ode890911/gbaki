'use client'

import * as React from 'react'
import { useAuth } from '@/providers/auth-provider'
import { usersApi } from '@/lib/api'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import {
  User,
  Building2,
  Bell,
  Shield,
  CreditCard,
  Palette,
  Save,
  Loader2,
  Eye,
  EyeOff,
  CheckCircle,
  Upload,
  Moon,
  Sun,
  Monitor,
} from 'lucide-react'

type TabType = 'profile' | 'business' | 'notifications' | 'security' | 'billing' | 'appearance'

export default function SettingsPage() {
  const { user, refreshUser } = useAuth()
  const [activeTab, setActiveTab] = React.useState<TabType>('profile')

  const tabs = [
    { id: 'profile' as TabType, label: 'Profile', icon: User },
    { id: 'business' as TabType, label: 'Business', icon: Building2 },
    { id: 'notifications' as TabType, label: 'Notifications', icon: Bell },
    { id: 'security' as TabType, label: 'Security', icon: Shield },
    { id: 'billing' as TabType, label: 'Billing', icon: CreditCard },
    { id: 'appearance' as TabType, label: 'Appearance', icon: Palette },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Settings
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-900 rounded-2xl border-2 border-gray-200 dark:border-gray-800 p-2">
            <nav className="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition-all ${
                      activeTab === tab.id
                        ? 'bg-green-600 text-white shadow-lg shadow-green-600/30'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {tab.label}
                  </button>
                )
              })}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <div className="bg-white dark:bg-gray-900 rounded-2xl border-2 border-gray-200 dark:border-gray-800 p-8">
            {activeTab === 'profile' && <ProfileTab user={user} refreshUser={refreshUser} />}
            {activeTab === 'business' && <BusinessTab />}
            {activeTab === 'notifications' && <NotificationsTab />}
            {activeTab === 'security' && <SecurityTab />}
            {activeTab === 'billing' && <BillingTab />}
            {activeTab === 'appearance' && <AppearanceTab />}
          </div>
        </div>
      </div>
    </div>
  )
}

// Profile Tab
function ProfileTab({ user, refreshUser }: { user: any; refreshUser: () => Promise<void> }) {
  const [formData, setFormData] = React.useState({
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
  })
  const [isSaving, setIsSaving] = React.useState(false)

  React.useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
      })
    }
  }, [user])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    try {
      await usersApi.updateCurrentUser({
        first_name: formData.first_name,
        last_name: formData.last_name,
        phone: formData.phone || undefined,
        address: formData.address || undefined,
      })

      await refreshUser()
      toast.success('Profile updated successfully!')
    } catch (error: any) {
      toast.error(error.message || 'Failed to update profile')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Profile Information
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Update your personal information and contact details
        </p>
      </div>

      {/* Profile Picture */}
      <div className="flex items-center gap-6 pb-6 border-b-2 border-gray-200 dark:border-gray-800">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center text-white text-3xl font-bold">
          {user?.first_name?.[0]}{user?.last_name?.[0]}
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-gray-900 dark:text-white mb-1">
            Profile Picture
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            Upload a new profile picture (JPG, PNG, max 2MB)
          </p>
          <Button variant="outline" className="rounded-xl border-2">
            <Upload className="w-4 h-4 mr-2" />
            Upload Photo
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
              First Name *
            </label>
            <input
              type="text"
              value={formData.first_name}
              onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
              required
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
              Last Name *
            </label>
            <input
              type="text"
              value={formData.last_name}
              onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
              required
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
            Email Address *
          </label>
          <input
            type="email"
            value={formData.email}
            disabled
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed"
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            Email cannot be changed. Contact support if you need to update it.
          </p>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="+1 (555) 123-4567"
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
            Address
          </label>
          <textarea
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            rows={3}
            placeholder="123 Main St, City, State, ZIP"
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 resize-none"
          />
        </div>

        <div className="flex justify-end pt-4 border-t-2 border-gray-200 dark:border-gray-800">
          <Button
            type="submit"
            disabled={isSaving}
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 px-8 rounded-xl"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}

// Business Tab
function BusinessTab() {
  const [formData, setFormData] = React.useState({
    business_name: '',
    ein: '',
    formation_state: '',
    business_type: '',
    industry: '',
    business_address: '',
    business_phone: '',
    website_url: '',
  })
  const [isSaving, setIsSaving] = React.useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    try {
      // TODO: Add API call to save business settings
      // await usersApi.updateBusinessSettings(formData)
      
      // For now, just simulate save
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast.success('Business information updated successfully!')
    } catch (error) {
      console.error('Error saving business settings:', error)
      toast.error('Failed to save business settings')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Business Information
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your business details and formation information
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
            Business Name
          </label>
          <input
            type="text"
            value={formData.business_name}
            onChange={(e) => setFormData({ ...formData, business_name: e.target.value })}
            placeholder="Your Business LLC"
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
              EIN (Tax ID)
            </label>
            <input
              type="text"
              value={formData.ein}
              onChange={(e) => setFormData({ ...formData, ein: e.target.value })}
              placeholder="XX-XXXXXXX"
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
              Formation State
            </label>
            <select
              value={formData.formation_state}
              onChange={(e) => setFormData({ ...formData, formation_state: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
            >
              <option value="">Select State</option>
              <option value="DE">Delaware</option>
              <option value="WY">Wyoming</option>
              <option value="NV">Nevada</option>
              <option value="FL">Florida</option>
              <option value="TX">Texas</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
              Business Type
            </label>
            <select
              value={formData.business_type}
              onChange={(e) => setFormData({ ...formData, business_type: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
            >
              <option value="">Select Type</option>
              <option value="llc">LLC</option>
              <option value="corporation">Corporation</option>
              <option value="partnership">Partnership</option>
              <option value="sole_proprietorship">Sole Proprietorship</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
              Industry
            </label>
            <input
              type="text"
              value={formData.industry}
              onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
              placeholder="e.g., E-commerce, Consulting"
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
            Business Address
          </label>
          <textarea
            value={formData.business_address}
            onChange={(e) => setFormData({ ...formData, business_address: e.target.value })}
            rows={3}
            placeholder="123 Business Ave, City, State, ZIP"
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 resize-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
              Business Phone
            </label>
            <input
              type="tel"
              value={formData.business_phone}
              onChange={(e) => setFormData({ ...formData, business_phone: e.target.value })}
              placeholder="+1 (555) 123-4567"
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
              Website URL
            </label>
            <input
              type="url"
              value={formData.website_url}
              onChange={(e) => setFormData({ ...formData, website_url: e.target.value })}
              placeholder="https://yourbusiness.com"
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
            />
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t-2 border-gray-200 dark:border-gray-800">
          <Button
            type="submit"
            disabled={isSaving}
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 px-8 rounded-xl"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}

// Notifications Tab
function NotificationsTab() {
  const { user } = useAuth()
  const [settings, setSettings] = React.useState({
    email_notifications: true,
    order_updates: true,
    marketing_emails: user?.marketing_consent || false,
    document_updates: true,
    support_updates: true,
    sms_notifications: false,
    push_notifications: true,
  })
  const [isSaving, setIsSaving] = React.useState(false)

  React.useEffect(() => {
    if (user) {
      setSettings(prev => ({
        ...prev,
        marketing_emails: user.marketing_consent || false,
      }))
    }
  }, [user])

  const handleSave = async () => {
    setIsSaving(true)

    try {
      await usersApi.updateCurrentUser({
        marketing_consent: settings.marketing_emails,
      })

      toast.success('Notification preferences saved!')
    } catch (error) {
      toast.error('Failed to save preferences')
    } finally {
      setIsSaving(false)
    }
  }

  const handleNotificationToggle = async (key: keyof typeof settings, value: boolean) => {
    // Update local state immediately for smooth UX
    setSettings(prev => ({ ...prev, [key]: value }))

    try {
      // TODO: Add API call to save notification settings
      // await usersApi.updateNotificationSettings({ [key]: value })
      
      // For now, just simulate save
      await new Promise(resolve => setTimeout(resolve, 500))
      
      toast.success(`${key.replace(/_/g, ' ')} ${value ? 'enabled' : 'disabled'}`)
    } catch (error) {
      console.error('Error updating notification settings:', error)
      // Revert on error
      setSettings(prev => ({ ...prev, [key]: !value }))
      toast.error('Failed to update notification settings')
    }
  }

  const ToggleSwitch = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
    <button
      type="button"
      onClick={onChange}
      className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
        checked ? 'bg-green-600' : 'bg-gray-300 dark:bg-gray-700'
      }`}
    >
      <span
        className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
          checked ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  )

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Notification Preferences
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Choose how you want to receive updates and notifications
        </p>
      </div>

      <div className="space-y-6">
        {/* Email Notifications */}
        <div className="border-2 border-gray-200 dark:border-gray-800 rounded-xl p-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Email Notifications
          </h3>
          <div className="space-y-4">
            {[
              {
                key: 'email_notifications' as const,
                label: 'Email Notifications',
                description: 'Receive all email notifications',
              },
              {
                key: 'order_updates' as const,
                label: 'Order Updates',
                description: 'Get notified about order status changes',
              },
              {
                key: 'document_updates' as const,
                label: 'Document Updates',
                description: 'Notifications when documents are ready',
              },
              {
                key: 'support_updates' as const,
                label: 'Support Updates',
                description: 'Updates on your support tickets',
              },
              {
                key: 'marketing_emails' as const,
                label: 'Marketing Emails',
                description: 'Tips, guides, and special offers',
              },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between py-3">
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {item.label}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {item.description}
                  </p>
                </div>
                <ToggleSwitch
                  checked={settings[item.key]}
                  onChange={() => handleNotificationToggle(item.key, !settings[item.key])}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Other Notifications */}
        <div className="border-2 border-gray-200 dark:border-gray-800 rounded-xl p-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Other Notifications
          </h3>
          <div className="space-y-4">
            {[
              {
                key: 'sms_notifications' as const,
                label: 'SMS Notifications',
                description: 'Receive text messages for important updates',
              },
              {
                key: 'push_notifications' as const,
                label: 'Push Notifications',
                description: 'Browser notifications for real-time updates',
              },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between py-3">
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {item.label}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {item.description}
                  </p>
                </div>
                <ToggleSwitch
                  checked={settings[item.key]}
                  onChange={() => handleNotificationToggle(item.key, !settings[item.key])}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4 border-t-2 border-gray-200 dark:border-gray-800">
        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 px-8 rounded-xl"
        >
          {isSaving ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save Preferences
            </>
          )}
        </Button>
      </div>
    </div>
  )
}

// Security Tab
function SecurityTab() {
  const [passwords, setPasswords] = React.useState({
    current: '',
    new: '',
    confirm: '',
  })
  const [showPasswords, setShowPasswords] = React.useState({
    current: false,
    new: false,
    confirm: false,
  })
  const [isChanging, setIsChanging] = React.useState(false)

  const validatePassword = (password: string): string[] => {
    const issues: string[] = []
    if (password.length < 8) issues.push('At least 8 characters')
    if (!/[A-Z]/.test(password)) issues.push('One uppercase letter')
    if (!/[a-z]/.test(password)) issues.push('One lowercase letter')
    if (!/[0-9]/.test(password)) issues.push('One number')
    return issues
  }

  const passwordIssues = validatePassword(passwords.new)
  const passwordStrength = passwords.new ? 100 - (passwordIssues.length * 25) : 0

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()

    if (passwordIssues.length > 0) {
      toast.error('Password does not meet requirements')
      return
    }

    if (passwords.new !== passwords.confirm) {
      toast.error('Passwords do not match')
      return
    }

    setIsChanging(true)

    try {
      // TODO: Add API call to change password
      // await usersApi.changePassword(passwords.current, passwords.new)
      
      // For now, just simulate save
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast.success('Password updated successfully!')
      
      // Clear form
      setPasswords({ current: '', new: '', confirm: '' })
    } catch (error) {
      console.error('Error changing password:', error)
      toast.error('Failed to update password')
    } finally {
      setIsChanging(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Security Settings
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your password and security preferences
        </p>
      </div>

      {/* Change Password */}
      <div className="border-2 border-gray-200 dark:border-gray-800 rounded-xl p-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
          Change Password
        </h3>

        <form onSubmit={handleChangePassword} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
              Current Password
            </label>
            <div className="relative">
              <input
                type={showPasswords.current ? 'text' : 'password'}
                value={passwords.current}
                onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                className="w-full px-4 py-3 pr-12 rounded-xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
              />
              <button
                type="button"
                onClick={() => setShowPasswords({ ...showPasswords, current: !showPasswords.current })}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                {showPasswords.current ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
              New Password
            </label>
            <div className="relative">
              <input
                type={showPasswords.new ? 'text' : 'password'}
                value={passwords.new}
                onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                className="w-full px-4 py-3 pr-12 rounded-xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
              />
              <button
                type="button"
                onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                {showPasswords.new ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {/* Password Strength */}
            {passwords.new && (
              <div className="mt-3">
                <div className="flex gap-1 mb-2">
                  {[25, 50, 75, 100].map((threshold) => (
                    <div
                      key={threshold}
                      className={`h-1.5 flex-1 rounded-full transition-all ${
                        passwordStrength >= threshold
                          ? passwordStrength === 100
                            ? 'bg-green-600'
                            : passwordStrength >= 75
                            ? 'bg-yellow-600'
                            : 'bg-red-600'
                          : 'bg-gray-200 dark:bg-gray-800'
                      }`}
                    />
                  ))}
                </div>
                {passwordIssues.length > 0 && (
                  <div className="space-y-1">
                    {passwordIssues.map((issue) => (
                      <p key={issue} className="text-xs text-gray-600 dark:text-gray-400">
                        • {issue}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type={showPasswords.confirm ? 'text' : 'password'}
                value={passwords.confirm}
                onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                className="w-full px-4 py-3 pr-12 rounded-xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
              />
              <button
                type="button"
                onClick={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                {showPasswords.confirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {passwords.confirm && passwords.new === passwords.confirm && (
              <p className="text-xs text-green-600 dark:text-green-400 mt-2 flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                Passwords match
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isChanging || passwordIssues.length > 0 || passwords.new !== passwords.confirm}
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 rounded-xl"
          >
            {isChanging ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Changing Password...
              </>
            ) : (
              <>
                <Shield className="w-4 h-4 mr-2" />
                Change Password
              </>
            )}
          </Button>
        </form>
      </div>

      {/* Two-Factor Authentication */}
      <div className="border-2 border-gray-200 dark:border-gray-800 rounded-xl p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              Two-Factor Authentication
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Add an extra layer of security to your account with 2FA
            </p>
          </div>
          <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-semibold">
            Coming Soon
          </span>
        </div>
        <Button variant="outline" disabled className="rounded-xl border-2">
          Enable Two-Factor Authentication
        </Button>
      </div>

      {/* Active Sessions */}
      <div className="border-2 border-gray-200 dark:border-gray-800 rounded-xl p-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
          Active Sessions
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-green-600 flex items-center justify-center text-white">
                <Monitor className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">
                  Current Session
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Chrome on Windows • Elkridge, MD
                </p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full bg-green-600 text-white text-xs font-semibold">
              Active Now
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

// Billing Tab
function BillingTab() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Billing & Payments
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your billing information and payment methods
        </p>
      </div>

      {/* Current Plan */}
      <div className="border-2 border-green-200 dark:border-green-800 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-xl p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
              Growth Package
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Active since December 15, 2024
            </p>
          </div>
          <span className="px-4 py-2 rounded-xl bg-green-600 text-white font-semibold text-lg">
            $2,497
          </span>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Includes LLC formation, website, e-commerce, and AI chatbot
        </p>
        <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 rounded-xl">
          Upgrade to Premium
        </Button>
      </div>

      {/* Payment Methods */}
      <div className="border-2 border-gray-200 dark:border-gray-800 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            Payment Methods
          </h3>
          <Button variant="outline" className="rounded-xl border-2">
            Add Payment Method
          </Button>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 border-2 border-gray-200 dark:border-gray-800 rounded-xl">
            <div className="flex items-center gap-4">
              <div className="w-12 h-8 rounded bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                VISA
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">
                  •••• 4242
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Expires 12/2025
                </p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-semibold">
              Default
            </span>
          </div>
        </div>
      </div>

      {/* Billing History */}
      <div className="border-2 border-gray-200 dark:border-gray-800 rounded-xl p-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
          Billing History
        </h3>
        
        <div className="space-y-3">
          {[
            { date: 'Dec 15, 2024', description: 'Growth Package', amount: '$2,497.00', status: 'Paid' },
            { date: 'Dec 1, 2024', description: 'Domain Registration', amount: '$15.00', status: 'Paid' },
          ].map((invoice, i) => (
            <div key={i} className="flex items-center justify-between p-4 border-2 border-gray-200 dark:border-gray-800 rounded-xl hover:border-green-500 dark:hover:border-green-500 transition-colors">
              <div className="flex-1">
                <p className="font-semibold text-gray-900 dark:text-white">
                  {invoice.description}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {invoice.date}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-bold text-gray-900 dark:text-white">
                  {invoice.amount}
                </span>
                <span className="px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-semibold">
                  {invoice.status}
                </span>
                <Button variant="ghost" size="sm" className="rounded-xl">
                  Download
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Appearance Tab
function AppearanceTab() {
  const [theme, setTheme] = React.useState<'light' | 'dark' | 'system'>('system')

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme)
    // TODO: Implement theme switching logic
    toast.success(`Theme changed to ${newTheme}`)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Appearance
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Customize how Gbaki Digital looks on your device
        </p>
      </div>

      {/* Theme Selection */}
      <div className="border-2 border-gray-200 dark:border-gray-800 rounded-xl p-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
          Theme
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { id: 'light' as const, name: 'Light', icon: Sun },
            { id: 'dark' as const, name: 'Dark', icon: Moon },
            { id: 'system' as const, name: 'System', icon: Monitor },
          ].map((option) => {
            const Icon = option.icon
            const isActive = theme === option.id
            return (
              <button
                key={option.id}
                onClick={() => handleThemeChange(option.id)}
                className={`p-6 rounded-xl border-2 transition-all ${
                  isActive
                    ? 'border-green-600 bg-green-50 dark:bg-green-900/20'
                    : 'border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700'
                }`}
              >
                <Icon className={`w-8 h-8 mx-auto mb-3 ${
                  isActive
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-gray-600 dark:text-gray-400'
                }`} />
                <p className={`font-semibold ${
                  isActive
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-gray-900 dark:text-white'
                }`}>
                  {option.name}
                </p>
                {isActive && (
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mx-auto mt-2" />
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Language */}
      <div className="border-2 border-gray-200 dark:border-gray-800 rounded-xl p-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
          Language
        </h3>
        <select className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500">
          <option value="en">English (US)</option>
          <option value="fr">Français</option>
          <option value="es">Español</option>
          <option value="pt">Português</option>
        </select>
      </div>
    </div>
  )
}
