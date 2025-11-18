import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCurrentCatalog, Product as ProductType } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Heart, Star } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { toast } from "sonner";
import ProductCard from "@/components/ProductCard";

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const catalog = getCurrentCatalog() as ProductType[];
  const product = catalog.find(p => p.id === id) as ProductType | undefined;

  const [quantity, setQuantity] = useState<number>(1);
  const { addToCart } = useCart();

  // Reset quantity to 1 when product changes
  useEffect(() => {
    setQuantity(1);
  }, [id]);

  const variants = product?.variants ?? [];
  const [selectedVariant, setSelectedVariant] = useState<string>(variants.length ? variants[0].id : "");

  const handleAddToCart = () => {
    if (!product) return;
    let price = product.price;
    if (variants.length > 0 && selectedVariant) {
      const v = variants.find(v => v.id === selectedVariant);
      if (v?.price != null) price = v.price;
    }
    const productForCart = { ...product, price, id: product.id + (selectedVariant || "") } as ProductType & { price: number };
    addToCart(productForCart, quantity);
    toast.success(`Added ${quantity} × ${product.title} to cart!`);
  };

  if (!product) {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-2xl font-display font-bold mb-4">Product not found</h1>
        <Link to="/shop">
          <Button>Back to Shop</Button>
        </Link>
      </div>
    );
  }

  const relatedProducts = catalog
    .filter(p => p.id !== product!.id && p.category === product!.category)
    .slice(0, 4);

  return (
    <div className="min-h-screen">
      <div className="container py-8">
        <nav className="flex gap-2 text-sm text-muted-foreground mb-8">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-primary">Shop</Link>
          <span>/</span>
          <span className="text-foreground">{product.title}</span>
        </nav>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-square rounded-2xl overflow-hidden bg-muted">
              <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
            </div>
            {variants.length > 0 && (
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">Variant</span>
                </div>
                <select value={selectedVariant} onChange={(e) => setSelectedVariant(e.target.value)} className="w-full border rounded px-2 py-1">
                  {variants.map(v => (
                    <option key={v.id} value={v.id}>{v.sku ?? v.id}</option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {product.bestseller && (<Badge className="bg-primary">Bestseller</Badge>)}
            <div>
              <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">{product.title}</h1>
              <p className="text-lg text-muted-foreground">{product.shortDescription}</p>
            </div>

            {product.rating && (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 text-primary">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating!) ? 'fill-current' : ''}`} />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">{product.rating} ({product.reviewCount} reviews)</span>
              </div>
            )}

            // Display price for selected variant if applicable
            <div className="text-3xl font-display font-bold text-primary">
              ${typeof (variants[0]?.price ?? product.price) === 'number' ? (variants.length && selectedVariant ? (variants.find(v => v.id === selectedVariant)?.price ?? product.price) : product.price).toFixed(2) : product.price.toFixed(2)}
            </div>

            {product.inStock ? (
              <Badge variant="secondary" className="bg-secondary">In Stock ({product.stockCount} available)</Badge>
            ) : (
              <Badge variant="destructive">Out of Stock</Badge>
            )}

            {/* Quantity */}
            <div className="flex items-center gap-4">
              <label className="font-display font-semibold">Quantity:</label>
              <div className="flex items-center gap-2">
                <button className="border rounded px-2 py-1" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                  -
                </button>
                <span className="w-8 text-center font-semibold">{quantity}</span>
                <button className="border rounded px-2 py-1" onClick={() => setQuantity(quantity + 1)}>
                  +
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button size="lg" className="flex-1 gap-2" onClick={handleAddToCart} disabled={!product.inStock}>
                <ShoppingCart className="h-5 w-5" />
                Add to Cart — ${( (variants.length && selectedVariant ? (variants.find(v => v.id === selectedVariant)?.price ?? product.price) : product.price) * quantity).toFixed(2)}
              </Button>
              <Button variant="outline" size="lg"><Heart className="h-5 w-5" /></Button>
            </div>

            {/* Product Details */}
            <div className="border-t pt-6 space-y-4">
              <div>
                <h3 className="font-display font-semibold mb-2">Description</h3>
                <p className="text-muted-foreground">{product.description}</p>
              </div>

              {product.compatibility && (
                <div>
                  <h3 className="font-display font-semibold mb-2">Compatible with:</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.compatibility.map((item) => (
                      <span key={item} className="px-2 py-1 bg-secondary rounded text-sm">{item}</span>
                    ))}
                  </div>
                </div>
              )}

              {product.materials && (
                <div>
                  <h3 className="font-display font-semibold mb-2">Materials</h3>
                  <p className="text-muted-foreground">{product.materials}</p>
                </div>
              )}

              {product.size && (
                <div>
                  <h3 className="font-display font-semibold mb-2">Size</h3>
                  <p className="text-muted-foreground">{product.size}</p>
                </div>
              )}

              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm text-muted-foreground"><strong>Shipping & Customs:</strong> Buyers are responsible for any customs and import taxes that may apply. We're not responsible for delays due to customs.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-display font-bold mb-6">You might also like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
