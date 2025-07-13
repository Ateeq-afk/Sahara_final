import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CreditCard, Calendar, DollarSign, CheckCircle, Clock, AlertCircle } from 'lucide-react'

export default async function PaymentsPage() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect('/login')
  }

  const payments = [
    {
      id: 1,
      amount: 150000,
      dueDate: '2024-02-15',
      status: 'paid',
      description: 'Initial Payment - 30%',
      paidDate: '2024-02-10',
      method: 'Bank Transfer'
    },
    {
      id: 2,
      amount: 200000,
      dueDate: '2024-03-15',
      status: 'pending',
      description: 'Progress Payment - 40%',
      paidDate: null,
      method: null
    },
    {
      id: 3,
      amount: 150000,
      dueDate: '2024-04-30',
      status: 'upcoming',
      description: 'Final Payment - 30%',
      paidDate: null,
      method: null
    }
  ]

  const totalAmount = payments.reduce((sum, payment) => sum + payment.amount, 0)
  const paidAmount = payments.filter(p => p.status === 'paid').reduce((sum, payment) => sum + payment.amount, 0)
  const pendingAmount = payments.filter(p => p.status === 'pending').reduce((sum, payment) => sum + payment.amount, 0)

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Payments</h1>
        <p className="text-gray-600 mt-2">Track your payment schedule and history</p>
      </div>

      {/* Payment Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Amount</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{totalAmount.toLocaleString()}</div>
            <p className="text-xs text-gray-500 mt-1">Project total</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Paid Amount</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">₹{paidAmount.toLocaleString()}</div>
            <p className="text-xs text-gray-500 mt-1">{Math.round((paidAmount / totalAmount) * 100)}% completed</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Pending Amount</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">₹{pendingAmount.toLocaleString()}</div>
            <p className="text-xs text-gray-500 mt-1">Due soon</p>
          </CardContent>
        </Card>
      </div>

      {/* Payment Schedule */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">Payment Schedule</h2>
        
        {payments.map((payment) => {
          const StatusIcon = payment.status === 'paid' ? CheckCircle : 
                           payment.status === 'pending' ? AlertCircle : Clock
          const statusColor = payment.status === 'paid' ? 'text-green-600' :
                            payment.status === 'pending' ? 'text-orange-600' : 'text-gray-400'
          
          return (
            <Card key={payment.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${
                      payment.status === 'paid' ? 'bg-green-50' :
                      payment.status === 'pending' ? 'bg-orange-50' : 'bg-gray-50'
                    }`}>
                      <StatusIcon className={`h-5 w-5 ${statusColor}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-base sm:text-lg">{payment.description}</CardTitle>
                      <CardDescription className="mt-1">
                        ₹{payment.amount.toLocaleString()}
                      </CardDescription>
                    </div>
                  </div>
                  <Badge variant={payment.status === 'paid' ? 'default' : 
                               payment.status === 'pending' ? 'destructive' : 'secondary'}
                         className="w-fit">
                    {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-2 sm:space-y-0 sm:flex sm:items-center sm:gap-6">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="h-4 w-4" />
                      Due: {new Date(payment.dueDate).toLocaleDateString()}
                    </div>
                    {payment.paidDate && (
                      <div className="flex items-center gap-2 text-sm text-green-600">
                        <CheckCircle className="h-4 w-4" />
                        Paid: {new Date(payment.paidDate).toLocaleDateString()}
                      </div>
                    )}
                    {payment.method && (
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <CreditCard className="h-4 w-4" />
                        {payment.method}
                      </div>
                    )}
                  </div>
                  {payment.status === 'pending' && (
                    <Button size="sm" className="w-full sm:w-auto">
                      <DollarSign className="h-4 w-4 mr-2" />
                      Pay Now
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}