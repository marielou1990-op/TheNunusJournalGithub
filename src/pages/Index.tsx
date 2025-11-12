import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/products";
import { toast } from "sonner";
import heroBanner from "@/assets/hero-banner-halloween.png";

export default function Index() {
  const featuredProducts = products.filter(p => p.featured);
  const bestsellers = products.filter(p => p.bestseller).slice(0, 4);

  const handleNewsletterSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email');
    toast.success(`Thanks for subscribing! Check ${email} for your 10% off code.`);
    e.currentTarget.reset();
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[500px] md:h-[600px] overflow-hidden">
        <img 
          src={heroBanner}
          alt="TheNunuJournals handmade planner stickers collection"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-background/40" />
        
        <div className="container relative h-full flex items-center">
          <div className="max-w-xl space-y-6">
            <h1 className="text-4xl md:text-6xl font-display font-bold text-balance">
              Stickers that make your planner feel like home ✨
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Handmade, functional & Field-Notes friendly — stickers and planner kits to brighten every page.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/shop">
                <Button size="lg" className="font-display">
                  Shop Stickers
                </Button>
              </Link>
              <Link to="/shop?category=Planner Kits">
                <Button size="lg" variant="secondary" className="font-display">
                  See Planner Kits
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="container py-16">
        <h2 className="text-3xl font-display font-bold mb-8 text-center">
          Featured Collections
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Bestsellers */}
      <section className="bg-muted py-16">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-display font-bold">
              Bestsellers
            </h2>
            <Link to="/shop">
              <Button variant="outline">View all</Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestsellers.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="container py-16">
        <div className="bg-secondary/30 rounded-2xl p-8 md:p-12 text-center">
          <div className="flex justify-center mb-4 text-primary text-3xl">
            ★★★★★
          </div>
          <p className="text-xl md:text-2xl font-display mb-2">
            "These stickers are absolutely perfect! Great quality and so cute."
          </p>
          <p className="text-muted-foreground">
            Average rating: 4.9/5 from 800+ happy planners
          </p>
        </div>
      </section>

      {/* Newsletter */}
      <section className="container py-16">
        <div className="bg-card border rounded-2xl p-8 md:p-12 max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-display font-bold mb-4">
            Join our sticker-loving community
          </h2>
          <p className="text-muted-foreground mb-6">
            Get 10% off your first order plus updates on new releases and exclusive discounts!
          </p>
          <form onSubmit={handleNewsletterSignup} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              name="email"
              placeholder="Your email address"
              required
              className="flex-1"
            />
            <Button type="submit" className="font-display">
              Get 10% Off
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
}
