import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAdmin } from '@/hooks/use-admin';
import { Product } from '@/lib/products';

const AdminProducts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>('');
  const { toast } = useToast();
  const { products, addProduct, deleteProduct } = useAdmin();

  // Admin-sourced products
  const allProducts = [...products];

  const filteredProducts = allProducts.filter(p =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.sku?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Image upload handler
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e?.target?.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleAddProduct = (formData: FormData) => {
    try {
      const title = formData.get('title') as string;
      const description = formData.get('description') as string;
      const newProduct = {
        title,
        price: parseFloat(formData.get('price') as string),
        sku: formData.get('sku') as string,
        description,
        shortDescription: description.slice(0, 100) + (description.length > 100 ? '...' : ''),
        image: imagePreview || '/placeholder-product.png', // Upload preview or placeholder
        images: [],
        tags: ['custom'],
        category: 'Planner Stickers', // Default category
        inStock: (formData.get('stock') ?? '0') !== '0',
        stockCount: parseInt(formData.get('stock') as string) || 0,
        featured: false,
        bestseller: false,
        compatibility: ['All Planners'],
        materials: 'High-quality matte sticker paper',
        size: 'One sheet',
        rating: 5.0,
        reviewCount: 0,
        stock: parseInt(formData.get('stock') as string) || 0,
        weight: parseFloat(formData.get('weight') as string) || 0,
        dimensions: undefined,
        shippingClass: formData.get('shipping') as string || 'standard',
      } as Omit<Product, 'id'>;

      addProduct(newProduct);
      toast({ title: 'Product added successfully' });
      setIsDialogOpen(false);
      setImagePreview('');
    } catch (error) {
      toast({ title: 'Failed to add product', variant: 'destructive' });
    }
  };

  const handleDeleteProduct = (productId: number) => {
    if (confirm('Are you sure you want to delete this product?')) {
      deleteProduct(productId);
      toast({ title: 'Product deleted successfully' });
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="container mx-auto px-4 sm:px-6 flex justify-between items-center w-full">
          <div>
            <CardTitle>Products</CardTitle>
            <CardDescription>Manage your product catalog</CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="gap-2">
                <Plus className="w-4 h-4" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-6">
              <DialogHeader>
                <DialogTitle>Create Product</DialogTitle>
              </DialogHeader>
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget as HTMLFormElement);
                handleAddProduct(formData);
              }} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" name="title" placeholder="Product title" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sku">SKU</Label>
                    <Input id="sku" name="sku" placeholder="PROD-001" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" name="description" placeholder="Product description" rows={4} required />
                </div>
                 <div className="mt-4 space-y-2">
                   <Label>Image Upload</Label>
                   <div className="flex items-center gap-4">
                     <Button type="button" variant="outline" onClick={() => document.getElementById('image-upload')?.click()}>
                       Choose Image
                     </Button>
                     <input id="image-upload" type="file" accept="image/*" onChange={handleImageChange} className="hidden" aria-label="Upload product image" />
                     <span className="text-sm text-muted-foreground">
                       {imagePreview ? 'Image selected' : 'No image selected'}
                     </span>
                   </div>
                   {imagePreview && (
                     <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover rounded-lg border mt-2" />
                   )}
                   <div className="text-xs text-muted-foreground">PNG or JPG allowed. You can upload a preview image for the product.</div>
                 </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price (EUR)</Label>
                    <Input id="price" name="price" type="number" step="0.01" placeholder="9.99" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stock">Stock Quantity</Label>
                    <Input id="stock" name="stock" type="number" placeholder="100" defaultValue="100" required />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="weight">Weight (g)</Label>
                    <Input id="weight" name="weight" type="number" placeholder="50" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="shipping">Shipping Class</Label>
                    <Input id="shipping" name="shipping" placeholder="standard" />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button type="submit" className="flex-1">Create Product</Button>
                  <Button type="button" variant="outline" onClick={() => { setIsDialogOpen(false); setImagePreview(''); }}>Cancel</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <img src={product.image} alt={product.title} className="w-12 h-12 object-cover rounded" />
                  </TableCell>
                  <TableCell className="font-medium">{product.title}</TableCell>
                  <TableCell>{product.sku || 'N/A'}</TableCell>
                  <TableCell>€{product.price.toFixed(2)}</TableCell>
                  <TableCell>{product.inStock ? 'In Stock' : 'Out of Stock'}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${product.inStock ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {product.inStock ? 'Active' : 'Inactive'}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" onClick={() => toast({ title: 'Edit functionality coming soon' })}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteProduct(product.id)}
                        className="text-red-600 hover:text-red-800"
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

export default AdminProducts;
