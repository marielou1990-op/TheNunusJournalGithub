import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, X, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const mockReviews = [
  {
    id: '1',
    productTitle: 'Coffee Time Sticker Set',
    customerName: 'Sarah Johnson',
    rating: 5,
    title: 'Absolutely love these!',
    body: 'The quality is amazing and the designs are so cute. Perfect for my planner!',
    verifiedPurchase: true,
    approved: false,
    date: '2025-01-10',
  },
  {
    id: '2',
    productTitle: 'Cozy Autumn Collection',
    customerName: 'Mike Chen',
    rating: 4,
    title: 'Great stickers',
    body: 'Really nice quality, colors are vibrant. One sticker was slightly off-center but overall happy.',
    verifiedPurchase: true,
    approved: true,
    date: '2025-01-09',
  },
];

const AdminReviews = () => {
  const { toast } = useToast();

  const handleApprove = (id: string) => {
    toast({ title: 'Review approved' });
  };

  const handleReject = (id: string) => {
    toast({ title: 'Review rejected' });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Reviews</CardTitle>
        <CardDescription>Moderate customer reviews</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Review</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockReviews.map((review) => (
                <TableRow key={review.id}>
                  <TableCell className="font-medium">{review.productTitle}</TableCell>
                  <TableCell>
                    <div>
                      <p>{review.customerName}</p>
                      {review.verifiedPurchase && (
                        <Badge variant="secondary" className="text-xs mt-1">
                          Verified Purchase
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-xs">
                      <p className="font-medium text-sm">{review.title}</p>
                      <p className="text-sm text-muted-foreground line-clamp-2">{review.body}</p>
                    </div>
                  </TableCell>
                  <TableCell>{review.date}</TableCell>
                  <TableCell>
                    {review.approved ? (
                      <Badge className="bg-green-100 text-green-800">Approved</Badge>
                    ) : (
                      <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {!review.approved && (
                      <div className="flex gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleApprove(review.id)}
                        >
                          <Check className="w-4 h-4 text-green-600" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleReject(review.id)}
                        >
                          <X className="w-4 h-4 text-red-600" />
                        </Button>
                      </div>
                    )}
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

export default AdminReviews;
