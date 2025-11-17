export interface Variant {
  id: string;
  sku?: string;
  price?: number;
  stock?: number;
  options?: { name: string; value: string }[];
}

export interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  shortDescription: string;
  image: string;
  images?: string[];
  tags: string[];
  category: string;
  inStock?: boolean;
  stockCount?: number;
  featured?: boolean;
  bestseller?: boolean;
  compatibility?: string[];
  materials?: string;
  size?: string;
  rating?: number;
  reviewCount?: number;
  sku?: string;
  stock?: number;
  weight?: number;
  dimensions?: { length: number; width: number; height: number };
  shippingClass?: string;
  variants?: Variant[];
}

export const products: Product[] = [
  {
    id: "daily-todos",
    title: "Icon Stickers | Daily To Do's",
    price: 5.50,
    shortDescription: "Essential lifestyle icon stickers for daily task tracking.",
    description:
      "Track your daily activities with these versatile icon stickers! Features lightbulbs, markers, weights, credit cards, sneakers, hearts, money, books, vitamins, salad bowls, coffee cups, apples, and more. Perfect for habit tracking, meal planning, exercise logging, and daily to-dos in soft peach, green, and brown tones.",
    image: "/images/product-daily-todos.jpg",
    images: [],
    tags: ["icons", "functional", "lifestyle", "habits"],
    category: "Icon Stickers",
    inStock: true,
    stockCount: 48,
    featured: true,
    bestseller: true,
    compatibility: ["All Planners", "Bullet Journals", "Hobonichi"],
    materials: "High-quality matte sticker paper",
    size: "One sheet with multiple icon stickers",
    rating: 4.9,
    reviewCount: 142,
  },
  {
    id: "farm-kit",
    title: "Planner Kit | Cozy Farm Vibes",
    price: 6.50,
    shortDescription: "Complete farm-themed planner kit with functional elements.",
    description:
      "Embrace farm life! This comprehensive planner kit includes day headers, farm animals (chickens, birds), vegetables (carrots, corn, apples), jars, weekly trackers, to-do sections, motivational text like 'well done!', 'cool!', 'veggies time!', and 'need caffeine!'. Features habit tracker boxes and decorative farm elements in soft peachy-green tones.",
    image: "/images/product-farm-kit.png",
    images: [],
    tags: ["plannerkit", "farm", "kit", "functional", "nature"],
    category: "Planner Kits",
    inStock: true,
    stockCount: 32,
    featured: true,
    bestseller: true,
    compatibility: ["Weekly Planners", "Hobonichi Cousin", "Standard Planners"],
    materials: "Premium matte sticker paper with repositionable adhesive",
    size: "Full sheet with multiple functional elements",
    rating: 5.0,
    reviewCount: 98
  },
  {
    id: "farm-addon",
    title: "Planner Add-ons | Cozy Farm Vibes",
    price: 4.50,
    shortDescription: "Farm-themed decorative add-on stickers.",
    description:
      "Farm-themed decorative add-ons perfect for any planner! Features repeating patterns of chickens with hearts, coffee cups, corn, jars, apples, and vegetable baskets. Great for decorating planner pages with a cozy farmhouse aesthetic.",
    image: "/images/product-farm-addon.png",
    images: [],
    tags: ["addons", "farm", "decorative", "nature"],
    category: "Add-ons",
    inStock: true,
    stockCount: 40,
    compatibility: ["All Planners", "Journals"],
    materials: "Matte sticker paper",
    size: "One sheet (P0004)",
    rating: 4.8,
    reviewCount: 67
  },
  {
    id: "forest-kit",
    title: "Planner Kit | Forest Magic",
    price: 6.50,
    shortDescription: "Complete forest-themed planner kit with woodland elements.",
    description:
      "Enter the enchanted forest! This comprehensive planner kit includes day headers, forest animals (foxes, mushrooms, acorns), trees, leaves, coffee cups, weekly trackers, to-do sections, motivational text like 'good job!', 'not bad!', 'nature time!', and 'yes!'. Features habit tracker boxes and decorative woodland elements in green, pink, and brown tones.",
    image: "/images/product-forest-kit.png",
    images: [],
    tags: ["plannerkit", "forest", "woodland", "kit", "functional", "nature"],
    category: "Planner Kits",
    inStock: true,
    stockCount: 35,
    featured: true,
    bestseller: true,
    compatibility: ["Weekly Planners", "Hobonichi Cousin", "Standard Planners"],
    materials: "Premium matte sticker paper with repositionable adhesive",
    size: "Full sheet with multiple functional elements",
    rating: 5.0,
    reviewCount: 134
  },
  {
    id: "forest-addon",
    title: "Planner Add-ons | Forest Magic",
    price: 4.50,
    shortDescription: "Forest-themed decorative add-on stickers.",
    description:
      "Bring the forest to your planner! Features repeating patterns of coffee cups, mushrooms, oak leaves, trees, apples, acorns, and foxes. Perfect for decorating planner pages with a magical woodland aesthetic in soft green, pink, and brown tones.",
    image: "/images/product-forest-addon.png",
    images: [],
    tags: ["addons", "forest", "woodland", "decorative", "nature"],
    category: "Add-ons",
    inStock: true,
    stockCount: 38,
    compatibility: ["All Planners", "Journals"],
    materials: "Matte sticker paper",
    size: "One sheet (P0005)",
    rating: 4.7,
    reviewCount: 82
  },
  {
    id: "frosty-adventures",
    title: "Seasonal Stickers | Frosty Adventures",
    price: 5.50,
    shortDescription: "Winter-themed stickers with polar bears, penguins, and snow.",
    description:
      "Winter wonderland awaits! These seasonal stickers feature adorable polar bears in sweaters, penguins with hot chocolate, reindeer, and frosted trees. Perfect for winter planning and celebrating the snowy season in soft pastels.",
    image: "/images/product-frosty-adventures.jpg",
    images: [],
    tags: ["seasonal", "winter", "christmas", "animals"],
    category: "Seasonal",
    inStock: true,
    stockCount: 42,
    featured: true,
    bestseller: true,
    compatibility: ["All Planners", "Journals"],
    materials: "High-quality matte sticker paper",
    size: "One sheet - Frosty Adventures",
    rating: 4.9,
    reviewCount: 156
  },
  {
    id: "halloween-weekly-kit-2",
    title: "Halloween Weekly Planner Kit",
    price: 6.50,
    shortDescription: "Complete Halloween weekly planner kit with functional trackers.",
    description:
      "Ultimate Halloween planning! This comprehensive kit includes weekly day letters (m/t/w/t/f/s/s), habit trackers with cute Halloween icons (black cats, pumpkins, skulls, ghosts), full and half boxes, checklists, and decorative elements in soft pastels.",
    image: "/images/product-halloween-weekly-kit.png",
    images: [],
    tags: ["plannerkit", "halloween", "seasonal", "weekly", "kit", "functional"],
    category: "Planner Kits",
    inStock: true,
    stockCount: 30,
    featured: true,
    bestseller: true,
    compatibility: ["Weekly Planners", "Hobonichi Weeks", "Standard Planners"],
    materials: "Premium matte sticker paper with repositionable adhesive",
    size: "Full sheet - Halloween Weekly Planner Kit",
    rating: 5.0,
    reviewCount: 187
  },
  {
    id: "happy-holidays",
    title: "Seasonal Stickers | Happy Holidays",
    price: 5.50,
    shortDescription: "Christmas holiday stickers with ornaments, hot cocoa, and trees.",
    description:
      "Holiday cheer in every sticker! Features adorable polar bears, hot chocolate mugs with whipped cream and gifts, Christmas ornaments, and tiny Christmas trees. Perfect for holiday planning in festive pink, green, and cream tones.",
    image: "/images/product-happy-holidays.jpg",
    images: [],
    tags: ["seasonal", "christmas", "holiday", "winter"],
    category: "Seasonal",
    inStock: true,
    stockCount: 36,
    featured: true,
    bestseller: true,
    compatibility: ["All Planners", "Journals"],
    materials: "High-quality matte sticker paper",
    size: "One sheet - Happy Holidays!",
    rating: 4.9,
    reviewCount: 203
  },
  {
    id: "healthy-meal-time",
    title: "Planner Stickers | Healthy Meal Time!",
    price: 5.50,
    shortDescription: "Healthy eating stickers with vegetables and Mr. Boo.",
    description:
      "Eat your veggies! These stickers feature Mr. Boo with various healthy foods including onions, bok choy, peas in pod, carrots, and vegetable combinations. Perfect for meal planning, nutrition tracking, and healthy eating goals in soft green and peachy tones.",
    image: "/images/product-healthy-meal.jpg",
    images: [],
    tags: ["planner", "food", "healthy", "mrboo", "functional"],
    category: "Planner Stickers",
    inStock: true,
    stockCount: 44,
    featured: true,
    compatibility: ["All Planners", "Meal Planners", "Health Journals"],
    materials: "High-quality matte sticker paper",
    size: "One sheet - Healthy Meal Time! (912, 910, 192)",
    rating: 4.8,
    reviewCount: 115
  },
  {
    id: "mrboo-halloween-notes",
    title: "Holiday Add-ons | Mr. Boo Halloween Notes",
    price: 4.50,
    shortDescription: "Halloween-themed note stickers with Mr. Boo and spooky frames.",
    description:
      "Spooky notes! Features Mr. Boo ghost shapes perfect for writing notes, plus Halloween-themed frames with mummies, bats, and stitches. Perfect for adding fun note sections to your Halloween planning.",
    image: "/images/product-mrboo-halloween-notes.png",
    images: [],
    tags: ["addons", "halloween", "notes", "mrboo", "seasonal"],
    category: "Add-ons",
    inStock: true,
    stockCount: 34,
    compatibility: ["All Planners", "Journals", "Notebooks"],
    materials: "Matte sticker paper",
    size: "One sheet (H0002)",
    rating: 4.7,
    reviewCount: 91
  },
  {
    id: "boo-moods",
    title: "Planner Stickers | Mr. Boo Daily Moods",
    price: 5.50,
    shortDescription: "Adorable mood tracker stickers featuring Mr. Boo characters.",
    description:
      "Track your daily moods with Mr. Boo! These charming stickers feature a variety of emotional expressions from drinking coffee to feeling peaceful. Perfect for daily mood tracking in planners and journals. Features multiple emotions and activities in cute character form.",
    image: "/images/product-boo-moods.png",
    images: [],
    tags: ["planner", "mrboo", "moodtracker", "functional", "cute"],
    category: "Planner Stickers",
    inStock: true,
    stockCount: 50,
    featured: true,
    bestseller: true,
    compatibility: ["All Planners", "Hobonichi", "Bullet Journals"],
    materials: "High-quality matte sticker paper",
    size: "One sheet (B0001)",
    rating: 5.0,
    reviewCount: 142
  },
  {
    id: "mood-boosters",
    title: "Planner Add-ons | Daily Mood Boosters",
    price: 5.50,
    shortDescription: "Coffee-themed mood booster stickers for daily planning.",
    description:
      "Coffee-focused mood boosters to brighten planning sessions. Includes coffee cups and related motifs in pastel tones.",
    image: "/images/product-mood-boosters.png",
    images: [],
    tags: ["addons", "coffee", "moodtracker", "functional"],
    category: "Add-ons",
    inStock: true,
    stockCount: 45,
    featured: true,
    compatibility: ["All Planners", "Journals"],
    materials: "Premium matte sticker paper",
    size: "One sheet (E0002)",
    rating: 4.9,
    reviewCount: 88
  },
  {
    id: "cleaning-chores",
    title: "Planner Stickers | Cleaning Chores",
    price: 5.50,
    shortDescription: "Fun stickers to track cleaning tasks and chores.",
    description:
      "Make chore tracking fun! Features Mr. Boo with cleaning supplies including sponges, spray bottles, and buckets. Perfect for household planning and cleaning schedules. Includes various poses showing different cleaning activities.",
    image: "/images/product-cleaning-chores.jpg",
    images: [],
    tags: ["planner", "functional", "chores", "cleaning", "mrboo"],
    category: "Planner Stickers",
    inStock: true,
    stockCount: 38,
    featured: true,
    compatibility: ["All Planners", "Household Planners"],
    materials: "High-quality matte sticker paper",
    size: "One sheet - Time for Chores",
    rating: 4.8,
    reviewCount: 65
  },
  {
    id: "coffee-kit",
    title: "Planner Kit | Coffee is Love, Coffee is Life",
    price: 6.50,
    shortDescription: "Complete coffee-themed planner kit with functional elements.",
    description:
      "For coffee lovers! This comprehensive planner kit includes day headers, coffee icons, clouds, to-do boxes, checkboxes, and motivational text like 'need coffee', 'not bad!', 'yes!', and 'latte love'. Features a weekly tracker section and decorative coffee-themed elements in soft browns and blues.",
    image: "/images/product-coffee-kit.png",
    images: [],
    tags: ["plannerkit", "coffee", "kit", "functional"],
    category: "Planner Kits",
    inStock: true,
    stockCount: 35,
    featured: true,
    bestseller: true,
    compatibility: ["Weekly Planners", "Hobonichi Cousin", "Standard Planners"],
    materials: "Premium matte sticker paper with repositionable adhesive",
    size: "Full sheet with multiple functional elements",
    rating: 5.0,
    reviewCount: 156
  },
  {
    id: "coffee-addon",
    title: "Planner Add-ons | Coffee is Love, Coffee is Life",
    price: 4.50,
    shortDescription: "Coffee-themed decorative add-on stickers.",
    description:
      "Simple coffee-themed add-ons perfect for any planner! Features coffee beans, clouds, cups, envelopes, and coins in a minimalist brown and blue palette. Great for decorating planner pages or marking special coffee moments.",
    image: "/images/product-coffee-addon.png",
    images: [],
    tags: ["addons", "coffee", "decorative"],
    category: "Add-ons",
    inStock: true,
    stockCount: 42,
    compatibility: ["All Planners", "Journals"],
    materials: "Matte sticker paper",
    size: "One sheet (P0001)",
    rating: 4.7,
    reviewCount: 73
  },
  {
    id: "coffee-time",
    title: "Planner Stickers | Coffee Time (Powered by Coffee)",
    price: 5.50,
    shortDescription: "Coffee-powered stickers featuring Mr. Boo and coffee drinks.",
    description:
      "Powered by Coffee! These stickers combine Mr. Boo with various coffee drinks - from cold brew to hot cups. Perfect for coffee lovers who want to track their daily caffeine adventures. Features multiple coffee styles and Mr. Boo enjoying his favorite beverages.",
    image: "/images/product-coffee-time.jpg",
    images: [],
    tags: ["planner", "coffee", "mrboo", "functional"],
    category: "Planner Stickers",
    inStock: true,
    stockCount: 40,
    featured: true,
    compatibility: ["All Planners", "Coffee Journals"],
    materials: "High-quality matte sticker paper",
    size: "One sheet - Powered by Coffee",
    rating: 4.9,
    reviewCount: 124
  },
  {
    id: "cosy-cute",
    title: "Planner Stickers | Cosy & Cute",
    price: 5.50,
    shortDescription: "Cozy lifestyle stickers with Mr. Boo and everyday items.",
    description:
      "Embrace the cozy life! Features Mr. Boo with coffee, plants, blankets, books, burgers, mushrooms, and pears. Perfect for tracking self-care, meals, reading time, and cozy moments. Includes various lifestyle icons in soft, muted colors.",
    image: "/images/product-cosy-cute.png",
    images: [],
    tags: ["planner", "lifestyle", "cozy", "mrboo", "selfcare"],
    category: "Planner Stickers",
    inStock: true,
    stockCount: 36,
    featured: true,
    bestseller: true,
    compatibility: ["All Planners", "Bullet Journals", "Hobonichi"],
    materials: "High-quality matte sticker paper",
    size: "Large sheet - Cosy & Cute (N60, 312, 026)",
    rating: 5.0,
    reviewCount: 198
  },
  {
    id: "cozy-autumn",
    title: "Seasonal Stickers | Cozy Autumn Vibes",
    price: 5.50,
    shortDescription: "Fall-themed stickers with squirrels, pumpkins, and pumpkin spice lattes.",
    description:
      "Fall in love with autumn! These seasonal stickers feature adorable squirrels with acorns, pumpkins, Mr. Boo in fall attire, and pumpkin spice lattes. Perfect for autumn planning and celebrating cozy fall vibes.",
    image: "/images/product-cozy-autumn.jpg",
    images: [],
    tags: ["seasonal", "autumn", "fall", "pumpkin", "mrboo"],
    category: "Seasonal",
    inStock: true,
    stockCount: 44,
    featured: true,
    bestseller: true,
    compatibility: ["All Planners", "Journals"],
    materials: "High-quality matte sticker paper",
    size: "One sheet - Cozy Autumn Vibes",
    rating: 4.9,
    reviewCount: 167
  },
  {
    id: "cozy-corner",
    title: "Deco Stickers | Cozy Corner",
    price: 5.50,
    shortDescription: "Comfort-themed deco stickers with food, nature, and Mr. Boo.",
    description:
      "Create your cozy corner! Features Mr. Boo with coffee, umbrellas, mushrooms, eggs, burgers, leaves, croissants, and cups. Perfect for decorating planner pages with comfort and lifestyle themes in soft green and warm tones.",
    image: "/images/product-cozy-corner.jpg",
    images: [],
    tags: ["deco", "lifestyle", "cozy", "mrboo", "food"],
    category: "Deco Stickers",
    inStock: true,
    stockCount: 33,
    featured: true,
    compatibility: ["All Planners", "Journals", "Scrapbooks"],
    materials: "High-quality matte sticker paper",
    size: "One sheet - Cozy Corner (026, 946, 912)",
    rating: 4.8,
    reviewCount: 109
  },
  {
    id: "halloween-planner-kit",
    title: "Halloween Planner Kit",
    price: 5.50,
    shortDescription: "Complete Halloween weekly planner kit with functional and decorative stickers.",
    description:
      "Everything you need for a spooky-cute planner spread! This comprehensive Halloween planner kit includes functional headers, weekly tracker boxes, decorative elements, checkboxes, and adorable Mr. Boo stickers. Features habit trackers, motivational quotes, and pastel color-coded sections perfect for weekly planning. Includes full and half boxes, icons, and decorative strips.",
    image: "/images/product-halloween-kit.png",
    images: [],
    tags: ["plannerkit", "halloween", "seasonal", "kit", "functional"],
    category: "Planner Kits",
    inStock: true,
    stockCount: 42,
    featured: false,
    bestseller: false,
    compatibility: ["Weekly Planners", "Hobonichi Weeks", "Standard Planners"],
    materials: "Premium matte sticker paper with repositionable adhesive",
    size: "Full sheet with multiple functional and decorative elements",
    rating: 4.9,
    reviewCount: 78
  },
  {
    id: "mrboo-halloween",
    title: "Holiday Planner Stickers | Mr. Boo's Favorite Season",
    price: 3.30,
    shortDescription: "Adorable Halloween stickers featuring Mr. Boo and friends.",
    description:
      "Meet Mr. Boo! These charming Halloween stickers feature Mr. Boo the cat along with ghosts, pumpkins, witch hats, candy, and cozy autumn elements. Perfect for adding a cute spooky touch to your planner pages. Printed on high-quality matte sticker paper.",
    image: "/images/product-mrboo-halloween-notes.png",
    images: [],
    tags: ["halloween", "seasonal", "mrboo"],
    category: "Seasonal",
    inStock: true,
    stockCount: 38,
    compatibility: ["All Planners", "Journals", "Notebooks"],
    materials: "Matte sticker paper",
    size: "One sheet (H-BOO)",
    rating: 4.7,
    reviewCount: 91
  },
  {
    id: "fieldnotes-addons",
    title: "Field Notes Add-ons | Functional Basics",
    price: 2.80,
    shortDescription: "Small functional stickers perfect for Field Notes journals.",
    description:
      "Essential functional stickers designed specifically for Field Notes notebooks. Includes checkboxes, flags, stars, tabs, and priority markers in soft teal and coral.",
    image: "/images/product-fieldnotes.jpg",
    images: [],
    tags: ["fieldnotes", "functional", "addons", "bulletjournal"],
    category: "Field Notes Add-ons",
    inStock: true,
    stockCount: 67,
    featured: true,
    compatibility: ["Field Notes", "Small Notebooks"],
    materials: "Matte sticker paper",
    size: "Field Notes compatible",
    rating: 4.8,
    reviewCount: 156
  },
  {
    id: "spring-seasonal",
    title: "Seasonal Collection | Spring Blooms",
    price: 3.50,
    shortDescription: "Spring-themed stickers with flowers and butterflies.",
    description:
      "Spring with floral accents and butterflies; pastel palette for fresh planning.",
    image: "/images/product-spring.jpg",
    images: [],
    tags: ["seasonal", "spring", "flowers", "planner"],
    category: "Seasonal",
    inStock: true,
    stockCount: 34,
    bestseller: false,
    compatibility: ["All Planners", "Journals"],
    materials: "High-quality matte sticker paper",
    size: "Standard sheet",
    rating: 4.7,
    reviewCount: 93
  },
  {
    id: "field-notes-mini",
    title: "Field Notes Add-on | Mini Stamps",
    price: 1.50,
    shortDescription: "Tiny stamps for Field Notes planning.",
    description:
      "Small stamps to mark tasks quickly in Field Notes.",
    image: "/images/product-fieldnotes.jpg",
    images: [],
    tags: ["fieldnotes", "addons", "mini"],
    category: "Field Notes Add-ons",
    inStock: true,
    stockCount: 12,
    compatibility: ["Field Notes"],
    materials: "Foam stamp",
    size: "Mini",
    rating: 4.2,
    reviewCount: 12
  },
];

export const categories = [
  "All",
  "Planner Kits",
  "Planner Stickers",
  "Icon Stickers",
  "Deco Stickers",
  "Seasonal",
  "Field Notes Add-ons",
  "Add-ons"
];

export const tags = [
  "planner",
  "hobonichi",
  "fieldnotes",
  "seasonal",
  "functional",
  "kit",
  "washi",
  "mrboo",
  "coffee",
  "moodtracker",
  "cozy",
  "lifestyle",
  "cute",
  "icons",
  "farm",
  "nature",
  "forest",
  "woodland",
  "winter",
  "halloween",
  "christmas",
  "holiday",
  "healthy",
  "food"
];

export const getCurrentCatalog = (): Product[] => {
  let base: Product[] = [];
  try {
    if (typeof window !== 'undefined') {
      const raw = localStorage.getItem('catalog_products');
      base = raw ? JSON.parse(raw) : products;
    } else {
      base = products;
    }
  } catch {
    base = products;
  }
  // Attach variants to known seeds if missing (runtime patch)
  const patched = base.map(p => {
    if (p.variants && p.variants.length > 0) return p;
    if (p.id === 'daily-todos') {
      return {
        ...p,
        variants: [
          { id: 'dt-v1', sku: 'DT-S1', price: 5.50, stock: 12, options: [{ name: 'Sheet', value: 'A' }] },
          { id: 'dt-v2', sku: 'DT-S2', price: 6.00, stock: 8, options: [{ name: 'Sheet', value: 'B' }] },
        ],
      };
    }
    if (p.id === 'forest-kit') {
      return {
        ...p,
        variants: [
          { id: 'fk-v1', sku: 'FK-S1', price: 6.50, stock: 9, options: [{ name: 'Sheet', value: 'Full' }] },
          { id: 'fk-v2', sku: 'FK-S2', price: 7.00, stock: 5, options: [{ name: 'Sheet', value: 'Mini' }] },
        ],
      };
    }
    return p;
  });
  return patched;
};
