import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

const AdminSettings = () => {
  const { toast } = useToast();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Store Settings</CardTitle>
          <CardDescription>General store configuration</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Store Name</Label>
            <Input placeholder="TheNunuJournals" defaultValue="TheNunuJournals" />
          </div>
          <div className="space-y-2">
            <Label>Contact Email</Label>
            <Input type="email" placeholder="hello@example.com" />
          </div>
          <div className="space-y-2">
            <Label>Default Currency</Label>
            <Input placeholder="EUR" defaultValue="EUR" disabled />
          </div>
          <Button onClick={() => toast({ title: 'Settings saved' })}>
            Save Settings
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tax Settings</CardTitle>
          <CardDescription>Configure tax rates and rules</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>VAT Rate (%)</Label>
            <Input type="number" step="0.01" placeholder="19.00" defaultValue="19.00" />
          </div>
          <div className="space-y-2">
            <Label>Tax Display</Label>
            <Input placeholder="Prices include VAT" defaultValue="Prices include VAT" />
          </div>
          <Button onClick={() => toast({ title: 'Tax settings saved' })}>
            Save Tax Settings
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Social Media</CardTitle>
          <CardDescription>Connect your social media accounts</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Instagram</Label>
            <Input placeholder="@thenunujournals" />
          </div>
          <div className="space-y-2">
            <Label>Facebook</Label>
            <Input placeholder="facebook.com/thenunujournals" />
          </div>
          <div className="space-y-2">
            <Label>Twitter/X</Label>
            <Input placeholder="@thenunujournals" />
          </div>
          <Button onClick={() => toast({ title: 'Social links saved' })}>
            Save Social Links
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Newsletter Integration</CardTitle>
          <CardDescription>Connect Mailchimp or SendGrid for newsletters</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Newsletter Provider</Label>
            <Input placeholder="Mailchimp / SendGrid" />
          </div>
          <div className="space-y-2">
            <Label>API Key</Label>
            <Input type="password" placeholder="Your API key" />
          </div>
          <div className="space-y-2">
            <Label>List ID / Audience ID</Label>
            <Input placeholder="List identifier" />
          </div>
          <Button onClick={() => toast({ title: 'Newsletter integration saved' })}>
            Save Integration
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSettings;
