'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Referral, ReferralProgram } from '@/src/types/referral';
import { 
  Users, 
  Gift, 
  DollarSign, 
  TrendingUp,
  Send,
  Copy,
  CheckCircle,
  Clock,
  XCircle,
  Link2,
  Share2
} from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';

export default function ReferralsPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [activeProgram, setActiveProgram] = useState<ReferralProgram | null>(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalReferrals: 0,
    successfulReferrals: 0,
    totalEarned: 0,
    pendingRewards: 0
  });
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteForm, setInviteForm] = useState({
    referredEmail: '',
    message: ''
  });

  useEffect(() => {
    fetchReferrals();
    fetchActiveProgram();
  }, []);

  const fetchReferrals = async () => {
    try {
      const response = await fetch('/api/referrals');
      if (!response.ok) throw new Error('Failed to fetch referrals');
      
      const data = await response.json();
      setReferrals(data.referrals);
      
      // Calculate stats
      const successful = data.referrals.filter((r: Referral) => r.status === 'converted');
      const earned = successful.reduce((sum: number, r: Referral) => 
        sum + (r.rewards.referrerReward?.value || 0), 0
      );
      const pending = data.referrals.filter((r: Referral) => 
        r.rewards.referrerReward?.status === 'pending'
      ).reduce((sum: number, r: Referral) => 
        sum + (r.rewards.referrerReward?.value || 0), 0
      );

      setStats({
        totalReferrals: data.referrals.length,
        successfulReferrals: successful.length,
        totalEarned: earned,
        pendingRewards: pending
      });
    } catch (error) {
      console.error('Error fetching referrals:', error);
      toast.error('Failed to load referrals');
    } finally {
      setLoading(false);
    }
  };

  const fetchActiveProgram = async () => {
    try {
      const response = await fetch('/api/referral-programs?active=true');
      if (!response.ok) throw new Error('Failed to fetch program');
      
      const data = await response.json();
      if (data.programs.length > 0) {
        setActiveProgram(data.programs[0]);
      }
    } catch (error) {
      console.error('Error fetching program:', error);
    }
  };

  const handleSendInvite = async () => {
    try {
      const response = await fetch('/api/referrals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inviteForm)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to send invite');
      }

      toast.success('Referral invitation sent!');
      setShowInviteModal(false);
      setInviteForm({ referredEmail: '', message: '' });
      fetchReferrals();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to send invite');
    }
  };

  const copyReferralLink = async () => {
    if (referrals.length > 0 && referrals[0].referralLink) {
      await navigator.clipboard.writeText(referrals[0].referralLink);
      toast.success('Referral link copied!');
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'converted': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'signed_up': return <Users className="h-4 w-4 text-blue-500" />;
      case 'clicked': return <Link2 className="h-4 w-4 text-yellow-500" />;
      case 'pending': return <Clock className="h-4 w-4 text-gray-500" />;
      case 'expired': return <XCircle className="h-4 w-4 text-red-500" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'converted': return 'bg-green-100 text-green-800';
      case 'signed_up': return 'bg-blue-100 text-blue-800';
      case 'clicked': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-gray-100 text-gray-800';
      case 'expired': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Referral Program</h1>
          <p className="text-muted-foreground">Earn rewards by referring new customers</p>
        </div>
        <Dialog open={showInviteModal} onOpenChange={setShowInviteModal}>
          <DialogTrigger asChild>
            <Button>
              <Send className="mr-2 h-4 w-4" />
              Send Invite
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Send Referral Invitation</DialogTitle>
              <DialogDescription>
                Invite someone to Sahara Developers and earn rewards when they become a customer
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={inviteForm.referredEmail}
                  onChange={(e) => setInviteForm({ ...inviteForm, referredEmail: e.target.value })}
                  placeholder="friend@example.com"
                  required
                />
              </div>
              <div>
                <Label htmlFor="message">Personal Message (Optional)</Label>
                <Textarea
                  id="message"
                  value={inviteForm.message}
                  onChange={(e) => setInviteForm({ ...inviteForm, message: e.target.value })}
                  placeholder="Add a personal note to your invitation..."
                  rows={3}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowInviteModal(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSendInvite}>
                  Send Invitation
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 mb-6 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Referrals</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalReferrals}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Successful</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.successfulReferrals}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Earned</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalEarned.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Rewards</CardTitle>
            <Gift className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.pendingRewards.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      {activeProgram && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Active Program: {activeProgram.name}</CardTitle>
            <CardDescription>{activeProgram.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Your Rewards</h4>
                <p className="text-sm text-muted-foreground">
                  {activeProgram.rewards.referrer.defaultReward?.type === 'percentage'
                    ? `${activeProgram.rewards.referrer.defaultReward.value}% commission`
                    : activeProgram.rewards.referrer.defaultReward?.type === 'fixed'
                    ? `$${activeProgram.rewards.referrer.defaultReward.value} per referral`
                    : 'Custom rewards'}
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Friend's Benefit</h4>
                <p className="text-sm text-muted-foreground">
                  {activeProgram.rewards.referred.type === 'percentage'
                    ? `${activeProgram.rewards.referred.value}% off first project`
                    : activeProgram.rewards.referred.type === 'fixed'
                    ? `$${activeProgram.rewards.referred.value} off first project`
                    : 'Special discount'}
                </p>
              </div>
            </div>

            {referrals.length > 0 && referrals[0].referralLink && (
              <div className="mt-6 p-4 bg-muted rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium mb-1">Your Referral Link</p>
                    <p className="text-xs text-muted-foreground font-mono">
                      {referrals[0].referralLink}
                    </p>
                  </div>
                  <Button size="sm" variant="outline" onClick={copyReferralLink}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Your Referrals</CardTitle>
          <CardDescription>Track the status of your referrals</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-center py-8 text-muted-foreground">Loading referrals...</p>
          ) : referrals.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">You haven't made any referrals yet</p>
              <Button onClick={() => setShowInviteModal(true)}>
                Send Your First Invite
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {referrals.map((referral) => (
                <div key={referral.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    {getStatusIcon(referral.status)}
                    <div>
                      <p className="font-medium">{referral.referredEmail}</p>
                      <p className="text-sm text-muted-foreground">
                        Sent {format(new Date(referral.createdAt), 'MMM d, yyyy')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge className={getStatusColor(referral.status)}>
                      {referral.status.replace('_', ' ')}
                    </Badge>
                    {referral.rewards.referrerReward && (
                      <div className="text-right">
                        <p className="font-semibold">
                          ${referral.rewards.referrerReward.value}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {referral.rewards.referrerReward.status}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}