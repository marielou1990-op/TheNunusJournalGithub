import { Link } from "react-router-dom";
import { Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Product } from "@/lib/products";
import { useCart } from "@/hooks/use-cart";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
    toast.success(`${product.title} added to cart!`);
  };

  return (
    <Link to={`/product/${product.id}`}>
      <Card className="group overflow-hidden hover:shadow-soft transition-all duration-300 h-full flex flex-col">
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img
            src={product.image}
            alt={product.title}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 bg-card/80 backdrop-blur-sm hover:bg-card"
            onClick={(e) => {
              e.preventDefault();
              toast.success("Added to favorites!");
            }}
          >
            <Heart className="h-4 w-4" />
          </Button>
          
          {product.bestseller && (
            <Badge className="absolute top-2 left-2 bg-primary">
              Bestseller
            </Badge>
          )}
        </div>

        <CardContent className="p-4 flex-1">
          <h3 className="font-display font-semibold text-base mb-1 line-clamp-2 group-hover:text-primary transition-colors">
            {product.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
            {product.shortDescription}
          </p>
          {product.rating && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <span className="text-primary">★</span>
              <span>{product.rating}</span>
              <span>({product.reviewCount})</span>
            </div>
          )}
        </CardContent>

        <CardFooter className="p-4 pt-0 flex items-center justify-between gap-2">
          <span className="font-display font-bold text-lg text-primary">
            ${product.price.toFixed(2)}
          </span>
          <Button 
            size="sm" 
            onClick={handleAddToCart}
            className="gap-2"
          >
            <ShoppingCart className="h-4 w-4" />
            Add to cart
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
