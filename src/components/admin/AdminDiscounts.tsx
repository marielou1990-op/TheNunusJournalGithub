import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const mockCoupons = [
  {
    id: '1',
    code: 'HOLIDAY20',
    type: 'percent',
    amount: 20,
    usageLimit: 100,
    usedCount: 45,
    expiresAt: '2025-12-25',
    active: true,
  },
  {
    id: '2',
    code: 'WELCOME10',
    type: 'fixed',
    amount: 10,
    usageLimit: null,
    usedCount: 23,
    expiresAt: null,
    active: true,
  },
];

const AdminDiscounts = () => {
  const [coupons] = useState(mockCoupons);
  const { toast } = useToast();

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Discount Codes</CardTitle>
            <CardDescription>Create and manage promotional codes</CardDescription>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                New Coupon
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Discount Code</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Coupon Code</Label>
                  <Input placeholder="SUMMER2025" />
                </div>
                <div className="space-y-2">
                  <Label>Discount Type</Label>
                  <Select defaultValue="percent">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percent">Percentage Off</SelectItem>
                      <SelectItem value="fixed">Fixed Amount Off (EUR)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Amount</Label>
                  <Input type="number" placeholder="20" />
                </div>
                <div className="space-y-2">
                  <Label>Usage Limit (optional)</Label>
                  <Input type="number" placeholder="Leave empty for unlimited" />
                </div>
                <div className="space-y-2">
                  <Label>Expiry Date (optional)</Label>
                  <Input type="date" />
                </div>
                <Button className="w-full">Create Coupon</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Usage</TableHead>
                <TableHead>Expires</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {coupons.map((coupon) => (
                <TableRow key={coupon.id}>
                  <TableCell className="font-mono font-bold">{coupon.code}</TableCell>
                  <TableCell className="capitalize">{coupon.type}</TableCell>
                  <TableCell>
                    {coupon.type === 'percent' ? `${coupon.amount}%` : `€${coupon.amount}`}
                  </TableCell>
                  <TableCell>
                    {coupon.usedCount} / {coupon.usageLimit || '∞'}
                  </TableCell>
                  <TableCell>{coupon.expiresAt || 'Never'}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${coupon.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {coupon.active ? 'Active' : 'Inactive'}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => toast({ title: 'Delete functionality coming soon' })}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminDiscounts;
