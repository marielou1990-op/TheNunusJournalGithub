import { useCart } from "@/lib/cart-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";

export default function Checkout() {
  const { items, totalPrice } = useCart();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Order placed! Check your email for confirmation.");
    navigate("/");
  };

  if (items.length === 0) {
    return (
      <div className="container py-16 text-center">
        <h1 className="text-2xl font-display font-bold mb-4">Your cart is empty</h1>
        <Link to="/shop">
          <Button>Start Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container py-8">
        <h1 className="text-3xl font-display font-bold mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contact Information */}
              <div className="bg-card border rounded-lg p-6 space-y-4">
                <h2 className="font-display font-bold text-xl">Contact Information</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" required placeholder="you@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone (optional)</Label>
                    <Input id="phone" type="tel" placeholder="+1234567890" />
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-card border rounded-lg p-6 space-y-4">
                <h2 className="font-display font-bold text-xl">Shipping Address</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" required placeholder="123 Main Street" />
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State/Province</Label>
                    <Input id="state" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zip">Postal Code</Label>
                    <Input id="zip" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="ca">Canada</SelectItem>
                      <SelectItem value="au">Australia</SelectItem>
                      <SelectItem value="cy">Cyprus</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Shipping Method */}
              <div className="bg-card border rounded-lg p-6 space-y-4">
                <h2 className="font-display font-bold text-xl">Shipping Method</h2>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-muted/50">
                    <input type="radio" name="shipping" value="standard" defaultChecked />
                    <div className="flex-1">
                      <p className="font-semibold">Standard Shipping</p>
                      <p className="text-sm text-muted-foreground">7-14 business days</p>
                    </div>
                    <span className="font-semibold">$4.50</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-muted/50">
                    <input type="radio" name="shipping" value="express" />
                    <div className="flex-1">
                      <p className="font-semibold">Express Courier</p>
                      <p className="text-sm text-muted-foreground">3-5 business days</p>
                    </div>
                    <span className="font-semibold">$12.00</span>
                  </label>
                </div>
                <div className="bg-muted p-3 rounded-lg text-sm text-muted-foreground">
                  Note: Buyers are responsible for any customs and import taxes that may apply.
                </div>
              </div>

              {/* Payment */}
              <div className="bg-card border rounded-lg p-6 space-y-4">
                <h2 className="font-display font-bold text-xl">Payment</h2>
                <p className="text-sm text-muted-foreground">
                  Payment processing would be integrated here (Stripe, PayPal, etc.)
                </p>
                <Button type="submit" size="lg" className="w-full">
                  Place Order
                </Button>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card border rounded-lg p-6 sticky top-20 space-y-4">
              <h2 className="font-display font-bold text-xl">Order Summary</h2>

              <div className="space-y-3">
                {items.map(({ product, quantity }) => (
                  <div key={product.id} className="flex gap-3">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold truncate">{product.title}</p>
                      <p className="text-sm text-muted-foreground">Qty: {quantity}</p>
                    </div>
                    <p className="text-sm font-semibold">
                      ${(product.price * quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>$4.50</span>
                </div>
              </div>

              <Separator />

              <div className="flex justify-between text-lg font-display font-bold">
                <span>Total</span>
                <span className="text-primary">${(totalPrice + 4.50).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
