import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { products } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Heart, Star } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { toast } from "sonner";
import ProductCard from "@/components/ProductCard";

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find(p => p.id === id);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

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

  const relatedProducts = products
    .filter(p => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success(`Added ${quantity} × ${product.title} to cart!`);
  };

  return (
    <div className="min-h-screen">
      <div className="container py-8">
        {/* Breadcrumb */}
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
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {product.bestseller && (
              <Badge className="bg-primary">Bestseller</Badge>
            )}
            
            <div>
              <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">
                {product.title}
              </h1>
              <p className="text-lg text-muted-foreground">
                {product.shortDescription}
              </p>
            </div>

            {product.rating && (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 text-primary">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating!) ? 'fill-current' : ''}`} />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>
            )}

            <div className="text-3xl font-display font-bold text-primary">
              ${product.price.toFixed(2)}
            </div>

            {product.inStock ? (
              <Badge variant="secondary" className="bg-secondary">
                In Stock ({product.stockCount} available)
              </Badge>
            ) : (
              <Badge variant="destructive">Out of Stock</Badge>
            )}

            {/* Quantity */}
            <div className="flex items-center gap-4">
              <label className="font-display font-semibold">Quantity:</label>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </Button>
                <span className="w-12 text-center font-semibold">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </Button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                size="lg"
                className="flex-1 gap-2"
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                <ShoppingCart className="h-5 w-5" />
                Add to Cart — ${(product.price * quantity).toFixed(2)}
              </Button>
              <Button variant="outline" size="lg">
                <Heart className="h-5 w-5" />
              </Button>
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
                    {product.compatibility.map(item => (
                      <Badge key={item} variant="secondary">{item}</Badge>
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
                <p className="text-sm text-muted-foreground">
                  <strong>Shipping & Customs:</strong> Buyers are responsible for any customs and import taxes that may apply. We're not responsible for delays due to customs.
                </p>
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
}
