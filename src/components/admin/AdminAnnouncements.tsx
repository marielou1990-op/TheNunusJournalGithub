import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const mockAnnouncements = [
  {
    id: '1',
    title: 'Holiday Sale',
    body: '🎄 20% off all items until Dec 25th!\nUse code: HOLIDAY20',
    active: true,
    lastUpdated: '2025-01-10',
  },
];

const AdminAnnouncements = () => {
  const [announcements] = useState(mockAnnouncements);
  const { toast } = useToast();

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Announcements</CardTitle>
            <CardDescription>Manage site-wide announcements</CardDescription>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                New Announcement
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Announcement</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input placeholder="Announcement title" />
                </div>
                <div className="space-y-2">
                  <Label>Content (supports emojis and line breaks)</Label>
                  <Textarea 
                    placeholder="🎉 Exciting news!&#10;New products arriving soon!" 
                    rows={4}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Active</Label>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Schedule for later</Label>
                  <Switch />
                </div>
                <Button className="w-full">Create Announcement</Button>
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
                <TableHead>Title</TableHead>
                <TableHead>Content Preview</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {announcements.map((announcement) => (
                <TableRow key={announcement.id}>
                  <TableCell className="font-medium">{announcement.title}</TableCell>
                  <TableCell>
                    <div className="max-w-xs whitespace-pre-line text-sm text-muted-foreground line-clamp-2">
                      {announcement.body}
                    </div>
                  </TableCell>
                  <TableCell>{announcement.lastUpdated}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${announcement.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {announcement.active ? 'Active' : 'Inactive'}
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

export default AdminAnnouncements;
