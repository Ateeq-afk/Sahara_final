import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Shield, Eye, Lock, FileText } from 'lucide-react'

export const metadata = {
  title: 'Privacy Policy | Sahara Developers',
  description: 'Learn how Sahara Developers collects, uses, and protects your personal information.',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="p-3 bg-blue-100 rounded-full">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Your privacy is important to us. This policy explains how we collect, use, and protect your information.
            </p>
            <p className="text-sm text-gray-500 mt-4">Last updated: January 2024</p>
          </div>

          <div className="space-y-8">
            {/* Information Collection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5 text-blue-600" />
                  Information We Collect
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Personal Information</h4>
                  <p className="text-gray-600">We collect information you provide directly to us, such as:</p>
                  <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
                    <li>Name, email address, and phone number</li>
                    <li>Project requirements and preferences</li>
                    <li>Communication preferences</li>
                    <li>Payment and billing information</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Automatically Collected Information</h4>
                  <p className="text-gray-600">We automatically collect certain information when you use our services:</p>
                  <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
                    <li>Device information and IP address</li>
                    <li>Browser type and version</li>
                    <li>Usage patterns and preferences</li>
                    <li>Location data (with your consent)</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* How We Use Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-green-600" />
                  How We Use Your Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">We use the information we collect to:</p>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Provide and improve our construction services</li>
                  <li>Communicate with you about your projects</li>
                  <li>Process payments and manage billing</li>
                  <li>Send project updates and notifications</li>
                  <li>Comply with legal obligations</li>
                  <li>Improve our website and services</li>
                  <li>Provide customer support</li>
                </ul>
              </CardContent>
            </Card>

            {/* Information Sharing */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-purple-600" />
                  Information Sharing and Disclosure
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except in the following cases:
                </p>
                
                <div>
                  <h4 className="font-semibold mb-2">Service Providers</h4>
                  <p className="text-gray-600">
                    We may share information with trusted third-party service providers who assist us in operating our business, such as payment processors, material suppliers, and subcontractors.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Legal Requirements</h4>
                  <p className="text-gray-600">
                    We may disclose information if required by law, regulation, legal process, or governmental request.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Business Transfers</h4>
                  <p className="text-gray-600">
                    In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Data Security */}
            <Card>
              <CardHeader>
                <CardTitle>Data Security</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>SSL encryption for data transmission</li>
                  <li>Secure servers and databases</li>
                  <li>Regular security audits and updates</li>
                  <li>Access controls and authentication</li>
                  <li>Employee training on data protection</li>
                </ul>
              </CardContent>
            </Card>

            {/* Your Rights */}
            <Card>
              <CardHeader>
                <CardTitle>Your Rights and Choices</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">You have the following rights regarding your personal information:</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-1">Access</h4>
                    <p className="text-gray-600 text-sm">Request access to your personal information</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Correction</h4>
                    <p className="text-gray-600 text-sm">Update or correct your information</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Deletion</h4>
                    <p className="text-gray-600 text-sm">Request deletion of your data</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Portability</h4>
                    <p className="text-gray-600 text-sm">Export your data in a readable format</p>
                  </div>
                </div>
                
                <p className="text-gray-600 mt-4">
                  To exercise these rights, please contact us at privacy@saharadevelopers.in
                </p>
              </CardContent>
            </Card>

            {/* Cookies and Tracking */}
            <Card>
              <CardHeader>
                <CardTitle>Cookies and Tracking Technologies</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  We use cookies and similar tracking technologies to enhance your experience on our website:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Essential cookies for website functionality</li>
                  <li>Analytics cookies to understand usage patterns</li>
                  <li>Preference cookies to remember your settings</li>
                  <li>Marketing cookies for personalized content</li>
                </ul>
                <p className="text-gray-600 mt-4">
                  You can control cookie preferences through your browser settings.
                </p>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Us</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  If you have any questions about this Privacy Policy or our data practices, please contact us:
                </p>
                <div className="space-y-2 text-gray-600">
                  <p><strong>Email:</strong> privacy@saharadevelopers.in</p>
                  <p><strong>Phone:</strong> +91 95918 37216</p>
                  <p><strong>Address:</strong> 100-feet Ring Road, 8th Main Road, BTM Layout 1st Stage, Bangalore, Karnataka 560029</p>
                </div>
              </CardContent>
            </Card>

            {/* Updates */}
            <Card>
              <CardHeader>
                <CardTitle>Policy Updates</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on our website and updating the "Last updated" date. Your continued use of our services after any changes constitutes acceptance of the updated policy.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}