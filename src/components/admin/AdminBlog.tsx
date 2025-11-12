import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const mockPosts = [
  {
    id: '1',
    title: 'How to Get Started with Planner Stickers',
    slug: 'get-started-planner-stickers',
    excerpt: 'A beginner\'s guide to decorating your planner with stickers',
    status: 'published',
    date: '2025-01-10',
  },
];

const AdminBlog = () => {
  const [posts] = useState(mockPosts);
  const { toast } = useToast();

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Blog Posts</CardTitle>
            <CardDescription>Manage your blog content</CardDescription>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                New Post
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create Blog Post</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input placeholder="Post title" />
                </div>
                <div className="space-y-2">
                  <Label>Slug (URL)</Label>
                  <Input placeholder="post-url-slug" />
                </div>
                <div className="space-y-2">
                  <Label>Featured Image URL</Label>
                  <Input placeholder="https://..." />
                </div>
                <div className="space-y-2">
                  <Label>Excerpt</Label>
                  <Textarea placeholder="Short description for previews" rows={2} />
                </div>
                <div className="space-y-2">
                  <Label>Content (Markdown supported)</Label>
                  <Textarea placeholder="Write your post content..." rows={10} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>SEO Meta Title</Label>
                    <Input placeholder="SEO optimized title" />
                  </div>
                  <div className="space-y-2">
                    <Label>SEO Meta Description</Label>
                    <Input placeholder="SEO description (max 160 chars)" />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">Save as Draft</Button>
                  <Button className="flex-1">Publish</Button>
                </div>
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
                <TableHead>Slug</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell className="font-medium">{post.title}</TableCell>
                  <TableCell className="text-muted-foreground">{post.slug}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${post.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {post.status}
                    </span>
                  </TableCell>
                  <TableCell>{post.date}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon">
                        <Eye className="w-4 h-4" />
                      </Button>
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

export default AdminBlog;
