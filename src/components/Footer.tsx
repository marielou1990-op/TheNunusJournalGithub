import { Link } from "react-router-dom";
import { Youtube, Instagram } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function Footer() {
  const handleNewsletterSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email');
    toast.success(`Thanks for subscribing! Check ${email} for your 10% off code.`);
    e.currentTarget.reset();
  };

  return (
    <footer className="bg-card border-t mt-20">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="space-y-4">
            <h3 className="font-display font-semibold text-lg">TheNunuJournals</h3>
            <p className="text-sm text-muted-foreground">
              Handmade, functional & uniquely adorable stickers for planners and Field Notes.
            </p>
            <div className="flex gap-4">
              <a href="https://youtube.com/@thenunujournals" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
              <a href="https://instagram.com/thenunujournals" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/shop?category=Planner Kits" className="text-muted-foreground hover:text-primary transition-colors">Planner Kits</Link></li>
              <li><Link to="/shop?category=Seasonal" className="text-muted-foreground hover:text-primary transition-colors">Seasonal</Link></li>
              <li><Link to="/shop?category=Field Notes Add-ons" className="text-muted-foreground hover:text-primary transition-colors">Field Notes</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4">Info</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">About</Link></li>
              <li><Link to="/policies" className="text-muted-foreground hover:text-primary transition-colors">Shop Policies</Link></li>
              <li><Link to="/faq" className="text-muted-foreground hover:text-primary transition-colors">FAQ</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4">Newsletter</h4>
            <p className="text-sm text-muted-foreground mb-4">Get 10% off your first order!</p>
            <form onSubmit={handleNewsletterSignup} className="flex gap-2">
              <Input
                type="email"
                name="email"
                placeholder="Your email"
                required
                className="text-sm"
              />
              <Button type="submit" size="sm">
                Join
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} TheNunuJournals. Made with ♡ in Cyprus.</p>
        </div>
      </div>
    </footer>
  );
}
