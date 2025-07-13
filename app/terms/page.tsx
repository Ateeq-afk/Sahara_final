import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText, AlertTriangle, Scale, Shield } from 'lucide-react'

export const metadata = {
  title: 'Terms of Service | Sahara Developers',
  description: 'Terms and conditions for using Sahara Developers services and website.',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="p-3 bg-blue-100 rounded-full">
                <Scale className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These terms govern your use of Sahara Developers services and website. Please read them carefully.
            </p>
            <p className="text-sm text-gray-500 mt-4">Last updated: January 2024</p>
          </div>

          <div className="space-y-8">
            {/* Acceptance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                  Acceptance of Terms
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  By accessing and using Sahara Developers' website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>
              </CardContent>
            </Card>

            {/* Services */}
            <Card>
              <CardHeader>
                <CardTitle>Our Services</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  Sahara Developers provides construction and interior design services including but not limited to:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Residential construction and renovation</li>
                  <li>Commercial construction projects</li>
                  <li>Interior design and decoration</li>
                  <li>Project management and consultation</li>
                  <li>Material sourcing and supply</li>
                  <li>Architectural planning and design</li>
                </ul>
                <p className="text-gray-600 mt-4">
                  All services are subject to availability, local regulations, and our professional capabilities.
                </p>
              </CardContent>
            </Card>

            {/* Client Responsibilities */}
            <Card>
              <CardHeader>
                <CardTitle>Client Responsibilities</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">As a client, you agree to:</p>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Provide accurate and complete information about your project requirements</li>
                  <li>Obtain necessary permits and approvals as required by local authorities</li>
                  <li>Make payments according to the agreed schedule</li>
                  <li>Provide safe and accessible site conditions</li>
                  <li>Communicate changes or concerns in a timely manner</li>
                  <li>Comply with all applicable laws and regulations</li>
                  <li>Maintain appropriate insurance coverage for your property</li>
                </ul>
              </CardContent>
            </Card>

            {/* Payment Terms */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Terms</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Payment Schedule</h4>
                  <p className="text-gray-600">Unless otherwise specified in your contract:</p>
                  <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
                    <li>30% advance payment upon contract signing</li>
                    <li>40% payment upon completion of structural work</li>
                    <li>30% final payment upon project completion</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Late Payments</h4>
                  <p className="text-gray-600">
                    Late payments may result in project delays and additional charges. Interest may be charged on overdue amounts at a rate of 2% per month.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Refunds</h4>
                  <p className="text-gray-600">
                    Refunds are subject to the terms specified in your individual contract and may be reduced by costs already incurred.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Project Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Project Timeline and Delays</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  Project timelines are estimates based on normal working conditions. Delays may occur due to:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Weather conditions and natural disasters</li>
                  <li>Material availability and supply chain issues</li>
                  <li>Permit delays and regulatory changes</li>
                  <li>Client-requested changes or modifications</li>
                  <li>Site access and preparation issues</li>
                  <li>Force majeure events</li>
                </ul>
                <p className="text-gray-600 mt-4">
                  We will make reasonable efforts to minimize delays and keep you informed of any issues that may affect the timeline.
                </p>
              </CardContent>
            </Card>

            {/* Warranty and Liability */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-600" />
                  Warranty and Liability
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Warranty Period</h4>
                  <p className="text-gray-600">
                    We provide a 12-month warranty on structural work and a 6-month warranty on finishing work from the date of project completion, subject to normal wear and tear.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Limitation of Liability</h4>
                  <p className="text-gray-600">
                    Our liability is limited to the contract value. We are not responsible for indirect, consequential, or punitive damages. Client insurance should cover property damage during construction.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Third-Party Materials</h4>
                  <p className="text-gray-600">
                    Warranty on third-party materials and equipment is subject to manufacturer's terms and conditions.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Changes and Modifications */}
            <Card>
              <CardHeader>
                <CardTitle>Changes and Modifications</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Changes to the original scope of work must be documented in writing and may result in:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Additional costs and revised payment schedules</li>
                  <li>Extended project timelines</li>
                  <li>Modified material specifications</li>
                  <li>Updated contract terms</li>
                </ul>
                <p className="text-gray-600 mt-4">
                  All change orders must be approved and signed by both parties before implementation.
                </p>
              </CardContent>
            </Card>

            {/* Termination */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-orange-600" />
                  Contract Termination
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">By Client</h4>
                  <p className="text-gray-600">
                    Clients may terminate the contract with 30 days written notice. Payment is due for all work completed and materials ordered up to the termination date.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">By Sahara Developers</h4>
                  <p className="text-gray-600">
                    We may terminate the contract for non-payment, safety violations, or material breach of contract terms after providing reasonable notice and opportunity to cure.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Intellectual Property */}
            <Card>
              <CardHeader>
                <CardTitle>Intellectual Property</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  All designs, plans, and drawings created by Sahara Developers remain our intellectual property unless specifically transferred in writing. Clients receive a license to use the designs for the intended project only.
                </p>
              </CardContent>
            </Card>

            {/* Dispute Resolution */}
            <Card>
              <CardHeader>
                <CardTitle>Dispute Resolution</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Mediation</h4>
                  <p className="text-gray-600">
                    Any disputes will first be addressed through good faith negotiations and, if necessary, mediation.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Jurisdiction</h4>
                  <p className="text-gray-600">
                    These terms are governed by the laws of Karnataka, India. Any legal proceedings will be conducted in Bangalore courts.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  For questions about these terms or our services, please contact us:
                </p>
                <div className="space-y-2 text-gray-600">
                  <p><strong>Email:</strong> legal@saharadevelopers.in</p>
                  <p><strong>Phone:</strong> +91 95918 37216</p>
                  <p><strong>Address:</strong> 100-feet Ring Road, 8th Main Road, BTM Layout 1st Stage, Bangalore, Karnataka 560029</p>
                </div>
              </CardContent>
            </Card>

            {/* Updates */}
            <Card>
              <CardHeader>
                <CardTitle>Terms Updates</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We reserve the right to modify these terms at any time. Updated terms will be posted on our website with the revision date. Continued use of our services constitutes acceptance of the updated terms.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}