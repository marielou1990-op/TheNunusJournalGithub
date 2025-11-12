import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

const AdminShipping = () => {
  const { toast } = useToast();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Shipping Zones & Rates</CardTitle>
          <CardDescription>Configure shipping options by region</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-semibold">European Union</h3>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Standard Shipping Rate (EUR)</Label>
                  <Input type="number" step="0.01" placeholder="5.00" />
                </div>
                <div className="space-y-2">
                  <Label>Express Shipping Rate (EUR)</Label>
                  <Input type="number" step="0.01" placeholder="12.00" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <Label>Free shipping over (EUR)</Label>
                <Input type="number" step="0.01" placeholder="50.00" className="w-32" />
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="font-semibold">International</h3>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Standard Shipping Rate (EUR)</Label>
                  <Input type="number" step="0.01" placeholder="15.00" />
                </div>
                <div className="space-y-2">
                  <Label>Express Shipping Rate (EUR)</Label>
                  <Input type="number" step="0.01" placeholder="25.00" />
                </div>
              </div>
            </div>
          </div>

          <Button onClick={() => toast({ title: 'Shipping rates updated' })}>
            Save Shipping Rates
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Package Defaults</CardTitle>
          <CardDescription>Default dimensions and weight for shipping calculations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Length (cm)</Label>
              <Input type="number" placeholder="10" />
            </div>
            <div className="space-y-2">
              <Label>Width (cm)</Label>
              <Input type="number" placeholder="10" />
            </div>
            <div className="space-y-2">
              <Label>Height (cm)</Label>
              <Input type="number" placeholder="2" />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Default Weight (g)</Label>
            <Input type="number" placeholder="50" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>Enable automatic carrier rates</Label>
              <p className="text-sm text-muted-foreground">Get real-time rates from carriers</p>
            </div>
            <Switch />
          </div>
          <Button onClick={() => toast({ title: 'Package defaults updated' })}>
            Save Defaults
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Handling Fees</CardTitle>
          <CardDescription>Additional fees for order processing</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Handling Fee (EUR)</Label>
            <Input type="number" step="0.01" placeholder="2.00" />
          </div>
          <Button onClick={() => toast({ title: 'Handling fees updated' })}>
            Save Handling Fee
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminShipping;
