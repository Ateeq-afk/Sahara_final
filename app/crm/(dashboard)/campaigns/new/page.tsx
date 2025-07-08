'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { ArrowLeft, Save, Send } from 'lucide-react';

export default function NewCampaignPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: 'email',
    targetAudience: {
      segments: [] as string[],
      filters: {
        projectStage: [] as string[],
        leadScore: { min: undefined as number | undefined, max: undefined as number | undefined },
        tags: [] as string[],
        location: [] as string[]
      }
    },
    triggers: {
      type: 'immediate',
      schedule: {
        startDate: '',
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
      }
    },
    content: {
      subject: '',
      previewText: '',
      body: '',
      personalization: {
        useDynamicContent: false,
        fields: [] as string[]
      }
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/campaigns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create campaign');
      }

      const data = await response.json();
      toast.success('Campaign created successfully!');
      router.push(`/crm/campaigns/${data.campaign._id}`);
    } catch (error) {
      console.error('Error creating campaign:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to create campaign');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-6 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Create New Campaign</h1>
            <p className="text-muted-foreground">Set up an automated marketing campaign</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Tabs defaultValue="basics" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basics">Basics</TabsTrigger>
            <TabsTrigger value="audience">Audience</TabsTrigger>
            <TabsTrigger value="triggers">Triggers</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
          </TabsList>

          <TabsContent value="basics">
            <Card>
              <CardHeader>
                <CardTitle>Campaign Basics</CardTitle>
                <CardDescription>Define the basic information for your campaign</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">Campaign Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Welcome Series, Project Follow-up"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe the purpose of this campaign..."
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="type">Campaign Type</Label>
                  <Select 
                    value={formData.type}
                    onValueChange={(value) => setFormData({ ...formData, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="sms">SMS</SelectItem>
                      <SelectItem value="push">Push Notification</SelectItem>
                      <SelectItem value="in-app">In-App Message</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="audience">
            <Card>
              <CardHeader>
                <CardTitle>Target Audience</CardTitle>
                <CardDescription>Define who will receive this campaign</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>Lead Score Range</Label>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div>
                      <Input
                        type="number"
                        placeholder="Min score"
                        value={formData.targetAudience.filters.leadScore.min || ''}
                        onChange={(e) => setFormData({
                          ...formData,
                          targetAudience: {
                            ...formData.targetAudience,
                            filters: {
                              ...formData.targetAudience.filters,
                              leadScore: {
                                ...formData.targetAudience.filters.leadScore,
                                min: e.target.value ? parseInt(e.target.value) : undefined
                              }
                            }
                          }
                        })}
                      />
                    </div>
                    <div>
                      <Input
                        type="number"
                        placeholder="Max score"
                        value={formData.targetAudience.filters.leadScore.max || ''}
                        onChange={(e) => setFormData({
                          ...formData,
                          targetAudience: {
                            ...formData.targetAudience,
                            filters: {
                              ...formData.targetAudience.filters,
                              leadScore: {
                                ...formData.targetAudience.filters.leadScore,
                                max: e.target.value ? parseInt(e.target.value) : undefined
                              }
                            }
                          }
                        })}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label>Project Stage</Label>
                  <div className="space-y-2 mt-2">
                    {['Planning', 'Design', 'Construction', 'Completion'].map((stage) => (
                      <div key={stage} className="flex items-center space-x-2">
                        <Checkbox
                          id={stage}
                          checked={formData.targetAudience.filters.projectStage?.includes(stage)}
                          onCheckedChange={(checked) => {
                            const stages = formData.targetAudience.filters.projectStage || [];
                            setFormData({
                              ...formData,
                              targetAudience: {
                                ...formData.targetAudience,
                                filters: {
                                  ...formData.targetAudience.filters,
                                  projectStage: checked
                                    ? [...stages, stage]
                                    : stages.filter(s => s !== stage)
                                }
                              }
                            });
                          }}
                        />
                        <Label htmlFor={stage} className="font-normal">{stage}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="triggers">
            <Card>
              <CardHeader>
                <CardTitle>Campaign Triggers</CardTitle>
                <CardDescription>Define when this campaign should be sent</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Trigger Type</Label>
                  <RadioGroup
                    value={formData.triggers.type}
                    onValueChange={(value) => setFormData({
                      ...formData,
                      triggers: { ...formData.triggers, type: value as any }
                    })}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="immediate" id="immediate" />
                      <Label htmlFor="immediate">Send immediately</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="scheduled" id="scheduled" />
                      <Label htmlFor="scheduled">Schedule for later</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="event-based" id="event-based" />
                      <Label htmlFor="event-based">Based on events</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="project-stage" id="project-stage" />
                      <Label htmlFor="project-stage">Based on project stage</Label>
                    </div>
                  </RadioGroup>
                </div>

                {formData.triggers.type === 'scheduled' && (
                  <div>
                    <Label htmlFor="startDate">Start Date & Time</Label>
                    <Input
                      id="startDate"
                      type="datetime-local"
                      value={formData.triggers.schedule?.startDate || ''}
                      onChange={(e) => setFormData({
                        ...formData,
                        triggers: {
                          ...formData.triggers,
                          schedule: {
                            ...formData.triggers.schedule,
                            startDate: e.target.value
                          }
                        }
                      })}
                      required={formData.triggers.type === 'scheduled'}
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content">
            <Card>
              <CardHeader>
                <CardTitle>Campaign Content</CardTitle>
                <CardDescription>Create your campaign message</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {formData.type === 'email' && (
                  <>
                    <div>
                      <Label htmlFor="subject">Email Subject</Label>
                      <Input
                        id="subject"
                        value={formData.content.subject || ''}
                        onChange={(e) => setFormData({
                          ...formData,
                          content: { ...formData.content, subject: e.target.value }
                        })}
                        placeholder="e.g., Your project update from Sahara Developers"
                        required={formData.type === 'email'}
                      />
                    </div>

                    <div>
                      <Label htmlFor="previewText">Preview Text</Label>
                      <Input
                        id="previewText"
                        value={formData.content.previewText || ''}
                        onChange={(e) => setFormData({
                          ...formData,
                          content: { ...formData.content, previewText: e.target.value }
                        })}
                        placeholder="This appears after the subject in most email clients"
                      />
                    </div>
                  </>
                )}

                <div>
                  <Label htmlFor="body">Message Content</Label>
                  <Textarea
                    id="body"
                    value={formData.content.body}
                    onChange={(e) => setFormData({
                      ...formData,
                      content: { ...formData.content, body: e.target.value }
                    })}
                    placeholder="Write your campaign message here..."
                    rows={10}
                    required
                  />
                  <p className="text-sm text-muted-foreground mt-2">
                    You can use {`{{name}}`} and {`{{email}}`} for personalization
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="personalization"
                    checked={formData.content.personalization?.useDynamicContent}
                    onCheckedChange={(checked) => setFormData({
                      ...formData,
                      content: {
                        ...formData.content,
                        personalization: {
                          useDynamicContent: !!checked,
                          fields: checked ? ['name', 'email'] : []
                        }
                      }
                    })}
                  />
                  <Label htmlFor="personalization">Enable dynamic content personalization</Label>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-4 mt-6">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? (
              <>Creating...</>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Create Campaign
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}