import { Youtube, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import aboutStudio from "@/assets/about-studio.jpg";

export default function About() {
  return (
    <div className="min-h-screen">
      <div className="bg-muted py-12">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">About TheNunuJournals</h1>
          <p className="text-lg text-muted-foreground">
            Handmade stickers from Cyprus, made with love since 2016
          </p>
        </div>
      </div>

      <div className="container py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <img
              src={aboutStudio}
              alt="TheNunuJournals studio workspace with sticker making supplies"
              className="rounded-2xl shadow-soft"
            />
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-display font-bold">Our Story</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Hi! I'm Marie, the maker behind TheNunuJournals. I started creating stickers in 2016 because I couldn't find functional, cute stickers that fit my Hobonichi planner perfectly.
              </p>
              <p>
                What began as a personal project has grown into a small business serving planner lovers around the world. Each sticker sheet is designed with care, printed on high-quality materials, and cut by hand in my studio in Cyprus.
              </p>
              <p>
                I believe planning should be both functional and fun. That's why every design balances cuteness with usability — pretty stickers that actually help you stay organized.
              </p>
            </div>

            <div className="flex gap-4 pt-4">
              <a href="https://youtube.com/@thenunujournals" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="gap-2">
                  <Youtube className="h-5 w-5" />
                  YouTube
                </Button>
              </a>
              <a href="https://instagram.com/thenunujournals" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="gap-2">
                  <Instagram className="h-5 w-5" />
                  Instagram
                </Button>
              </a>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-card border rounded-lg p-6 text-center">
            <div className="text-4xl font-display font-bold text-primary mb-2">2016</div>
            <p className="text-muted-foreground">Started on Etsy</p>
          </div>
          <div className="bg-card border rounded-lg p-6 text-center">
            <div className="text-4xl font-display font-bold text-primary mb-2">5000+</div>
            <p className="text-muted-foreground">Happy customers</p>
          </div>
          <div className="bg-card border rounded-lg p-6 text-center">
            <div className="text-4xl font-display font-bold text-primary mb-2">100%</div>
            <p className="text-muted-foreground">Handmade with love</p>
          </div>
        </div>

        <div className="mt-16 bg-secondary/30 rounded-2xl p-8 md:p-12">
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-4 text-center">Why Choose Us?</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <div>
              <h3 className="font-display font-semibold mb-2">Quality Materials</h3>
              <p className="text-muted-foreground text-sm">
                All stickers are printed on premium matte paper with repositionable adhesive.
              </p>
            </div>
            <div>
              <h3 className="font-display font-semibold mb-2">Perfect Fit</h3>
              <p className="text-muted-foreground text-sm">
                Sized specifically for Hobonichi, Field Notes, and standard planners.
              </p>
            </div>
            <div>
              <h3 className="font-display font-semibold mb-2">Fast Shipping</h3>
              <p className="text-muted-foreground text-sm">
                Orders ship within 1-3 business days with tracking included.
              </p>
            </div>
            <div>
              <h3 className="font-display font-semibold mb-2">Unique Designs</h3>
              <p className="text-muted-foreground text-sm">
                Each design is created in-house — you won't find these anywhere else!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
