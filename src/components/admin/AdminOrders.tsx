import { useState } from 'react';
import { useAdmin } from '@/hooks/use-admin';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Eye, Download } from 'lucide-react';

const AdminOrders = () => {
  const { orders, updateOrder } = useAdmin();
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [dialogStatus, setDialogStatus] = useState('');
  const [dialogTracking, setDialogTracking] = useState('');
  const [dialogCarrier, setDialogCarrier] = useState('');

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-800',
      paid: 'bg-blue-100 text-blue-800',
      processing: 'bg-purple-100 text-purple-800',
      shipped: 'bg-green-100 text-green-800',
      delivered: 'bg-green-200 text-green-900',
      cancelled: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const filteredOrders = orders.filter(order =>
    statusFilter === 'all' || order.status === statusFilter
  );

  const handleUpdateOrder = () => {
    if (selectedOrder) {
      updateOrder(selectedOrder.id, {
        status: dialogStatus || selectedOrder.status,
        trackingNumber: dialogTracking,
        carrier: dialogCarrier
      });
      setSelectedOrder(null);
      setDialogStatus('');
      setDialogTracking('');
      setDialogCarrier('');
    }
  };

  const openOrderDialog = (order: any) => {
    setSelectedOrder(order);
    setDialogStatus(order.status);
    setDialogTracking(order.trackingNumber || '');
    setDialogCarrier(order.carrier || '');
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Orders</CardTitle>
            <CardDescription>Manage customer orders and tracking</CardDescription>
          </div>
          <div className="flex gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Tracking</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                   <TableCell>
                     <div>
                       <p className="font-medium">{order.customerName}</p>
                       <p className="text-sm text-muted-foreground">{order.customerEmail}</p>
                     </div>
                   </TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>€{order.total.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(order.status)} variant="secondary">
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {order.trackingNumber ? (
                      <div className="text-sm">
                        <p className="font-medium">{order.trackingNumber}</p>
                        <p className="text-muted-foreground">{order.carrier}</p>
                      </div>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                     <Dialog>
                       <DialogTrigger asChild>
                         <Button variant="ghost" size="icon" onClick={() => openOrderDialog(order)}>
                           <Eye className="w-4 h-4" />
                         </Button>
                       </DialogTrigger>
                       <DialogContent>
                         <DialogHeader>
                           <DialogTitle>Order Details - {order.id}</DialogTitle>
                         </DialogHeader>
                         <div className="space-y-4">
                           <div className="space-y-2">
                             <Label>Order Status</Label>
                             <Select value={dialogStatus} onValueChange={setDialogStatus}>
                               <SelectTrigger>
                                 <SelectValue />
                               </SelectTrigger>
                               <SelectContent>
                                 <SelectItem value="pending">Pending</SelectItem>
                                 <SelectItem value="paid">Paid</SelectItem>
                                 <SelectItem value="processing">Processing</SelectItem>
                                 <SelectItem value="shipped">Shipped</SelectItem>
                                 <SelectItem value="delivered">Delivered</SelectItem>
                                 <SelectItem value="cancelled">Cancelled</SelectItem>
                               </SelectContent>
                             </Select>
                           </div>
                           <div className="space-y-2">
                             <Label>Tracking Number</Label>
                             <Input
                               placeholder="Enter tracking number"
                               value={dialogTracking}
                               onChange={(e) => setDialogTracking(e.target.value)}
                             />
                           </div>
                           <div className="space-y-2">
                             <Label>Carrier</Label>
                             <Input
                               placeholder="DHL, UPS, FedEx, etc."
                               value={dialogCarrier}
                               onChange={(e) => setDialogCarrier(e.target.value)}
                             />
                           </div>
                           <div className="space-y-4">
                             <h4 className="font-semibold">Order Items</h4>
                             {selectedOrder?.items.map((item: any, index: number) => (
                               <div key={index} className="flex justify-between text-sm">
                                 <span>{item.productTitle} (x{item.quantity})</span>
                                 <span>${(item.price * item.quantity).toFixed(2)}</span>
                               </div>
                             ))}
                             <div className="border-t pt-2 flex justify-between font-semibold">
                               <span>Total</span>
                               <span>${selectedOrder?.total.toFixed(2)}</span>
                             </div>
                           </div>
                           <Button className="w-full" onClick={handleUpdateOrder}>
                             Update Order
                           </Button>
                         </div>
                       </DialogContent>
                    </Dialog>
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

export default AdminOrders;
