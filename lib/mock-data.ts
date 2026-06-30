import type { Product } from "./supabase";
import hero1 from "../app/Images/image1.jpg";
import hero2 from "../app/Images/image2.jpg";
import hero3 from "../app/Images/image3.jpg";

const now = new Date().toISOString();
const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
const monthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();

function unsplash(photoId: string, w = 800, h = 1000): string {
  return `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;
}

export const CATEGORIES = [
  "All",
  "Outerwear",
  "Dresses",
  "Knitwear",
  "Trousers",
  "Accessories",
  "Essentials",
  "Shoes",
  "Belts",
  "Shirts",
] as const;

export type Category = (typeof CATEGORIES)[number];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "mock-001",
    name: "Sandstone Linen Blazer",
    description:
      "Relaxed tailoring in breathable Italian linen. Unstructured shoulders, horn buttons, and a soft natural drape — perfect for Ife evenings and layered city looks. Available in S–XL.",
    price: 85000,
    image_url: unsplash("photo-1594938298603-c8148c4dae35"),
    stock_quantity: 12,
    category: "Outerwear",
    created_at: weekAgo,
    updated_at: now,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Beige', 'Sand', 'Charcoal'],
    material: '100% Italian Linen',
    care_instructions: 'Dry clean only'
  },
  {
    id: "mock-002",
    name: "Ivory Silk Midi Dress",
    description:
      "Bias-cut silk charmeuse with a subtle cowl neckline and fluid silhouette. Hand-finished seams and an invisible side zip. A timeless piece for gallery openings and dinner dates in Ile-Ife.",
    price: 125000,
    image_url: unsplash("photo-1595777457583-95e059d581b8"),
    stock_quantity: 8,
    category: "Dresses",
    created_at: weekAgo,
    updated_at: now,
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Ivory', 'Blush', 'Dusty Rose'],
    material: '100% Silk Charmeuse',
    care_instructions: 'Hand wash cold, hang dry'
  },
  {
    id: "mock-003",
    name: "Oatmeal Cashmere Crew",
    description:
      "Grade-A Mongolian cashmere in a relaxed crew-neck cut. Lightweight yet warm, with ribbed cuffs and hem. The kind of sweater you reach for every harmattan morning.",
    price: 62000,
    image_url: unsplash("photo-1576566588028-4147f3842f27"),
    stock_quantity: 24,
    category: "Knitwear",
    created_at: monthAgo,
    updated_at: now,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Oatmeal', 'Natural', 'Light Grey'],
    material: '100% Mongolian Cashmere',
    care_instructions: 'Dry clean only'
  },
  {
    id: "mock-004",
    name: "Charcoal Wool Trousers",
    description:
      "High-rise, wide-leg trousers in traceable merino wool. Pressed crease, side pockets, and a concealed hook closure. Pairs effortlessly with sneakers or heeled boots.",
    price: 55000,
    image_url: unsplash("photo-1594633312681-425c7b97ccd1"),
    stock_quantity: 18,
    category: "Trousers",
    created_at: monthAgo,
    updated_at: now,
    sizes: ['28', '30', '32', '34', '36'],
    colors: ['Charcoal', 'Black', 'Navy'],
    material: '100% Merino Wool',
    care_instructions: 'Dry clean only'
  },
  {
    id: "mock-005",
    name: "Cognac Leather Crossbody",
    description:
      "Vegetable-tanned leather crossbody with adjustable strap and brushed brass hardware. Fits phone, wallet, and keys — the everyday bag that only gets better with age.",
    price: 75000,
    image_url: unsplash("photo-1548036328-c9fa89d128fa"),
    stock_quantity: 15,
    category: "Accessories",
    created_at: weekAgo,
    updated_at: now,
    sizes: ['One Size'],
    colors: ['Cognac', 'Black', 'Burgundy'],
    material: '100% Vegetable-Tanned Leather',
    care_instructions: 'Condition leather regularly'
  },
  {
    id: "mock-006",
    name: "Stone Organic Cotton Tee",
    description:
      "Heavyweight organic cotton jersey with a boxy, slightly cropped fit. Garment-dyed for a lived-in feel. The foundation piece every capsule wardrobe needs.",
    price: 22000,
    image_url: unsplash("photo-1521572163474-6864f9cf17ab"),
    stock_quantity: 40,
    category: "Essentials",
    created_at: monthAgo,
    updated_at: now,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Stone', 'White', 'Black', 'Sage'],
    material: '100% Organic Cotton Jersey',
    care_instructions: 'Machine wash cold, tumble dry low'
  },
  {
    id: "mock-007",
    name: "Midnight Satin Slip Dress",
    description:
      "Liquid satin slip with adjustable spaghetti straps and a gentle V-neckline. Falls to mid-calf with a subtle side slit. Layer under a blazer or wear solo after dark.",
    price: 98000,
    image_url: unsplash("photo-1566174053879-31528523f8ae"),
    stock_quantity: 10,
    category: "Dresses",
    created_at: weekAgo,
    updated_at: now,
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Midnight', 'Deep Purple', 'Emerald', 'Burgundy'],
    material: '100% Satin Polyester',
    care_instructions: 'Hand wash cold, lay flat to dry'
  },
  {
    id: "mock-008",
    name: "Camel Trench Coat",
    description:
      "Classic double-breasted trench in water-resistant cotton gabardine. Storm flap, belted waist, and horn buttons. A decade-defining investment piece.",
    price: 145000,
    image_url: unsplash("photo-1539533018447-63fcce2678e3"),
    stock_quantity: 6,
    category: "Outerwear",
    created_at: weekAgo,
    updated_at: now,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Camel', 'Black', 'Navy'],
    material: '100% Cotton Gabardine',
    care_instructions: 'Professional clean only'
  },
  {
    id: "mock-009",
    name: "Merino Rib Turtleneck",
    description:
      "Fine-gauge merino wool in a slim rib knit. High fold-over collar and clean finish at the cuffs. Layer under blazers or wear alone with gold jewellery.",
    price: 48000,
    image_url: unsplash("photo-1434389677669-e08b4cac3105"),
    stock_quantity: 22,
    category: "Knitwear",
    created_at: monthAgo,
    updated_at: now,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Cream', 'Dusty Pink', 'Forest Green', 'Black'],
    material: '100% Merino Wool',
    care_instructions: 'Hand wash cold, lay flat to dry'
  },
  {
    // ✅ Fixed: was also 'mock-009' — corrected to 'mock-010'
    id: "mock-010",
    name: "Gold Hoop Earrings",
    description:
      "14k gold-plated brass hoops with a 30mm diameter. Lightweight, hypoallergenic posts, and a secure click closure. The finishing touch for any outfit.",
    price: 18000,
    image_url: unsplash("photo-1535632066927-ab7c9ab60908"),
    stock_quantity: 35,
    category: "Accessories",
    created_at: monthAgo,
    updated_at: now,
    sizes: ['Small', 'Medium', 'Large'],
    colors: ['Gold', 'Rose Gold', 'Silver'],
    material: 'Brass with Gold Plating',
    care_instructions: 'Clean with soft cloth, store separately'
  },
  {
    id: "mock-011",
    name: "Wide-Leg Denim",
    description:
      "Japanese selvedge denim in a high-rise, wide-leg cut. Raw indigo that fades beautifully with wear. Button fly and classic five-pocket styling.",
    price: 52000,
    image_url: unsplash("photo-1542272604-787c3835535d"),
    stock_quantity: 20,
    category: "Trousers",
    created_at: weekAgo,
    updated_at: now,
    sizes: ['26', '27', '28', '29', '30', '31', '32'],
    colors: ['Raw Indigo', 'Dark Wash', 'Light Wash'],
    material: '100% Japanese Selvedge Denim',
    care_instructions: 'Machine wash cold, do not tumble dry'
  },
  {
    id: "mock-012",
    name: "Linen Camp Collar Shirt",
    description:
      "Relaxed camp-collar shirt in washed linen. Coconut shell buttons and a boxy, breathable fit. From morning lectures at OAU to rooftop evenings.",
    price: 35000,
    image_url: unsplash("photo-1602810318383-e386cc2a3ccf"),
    stock_quantity: 28,
    category: "Shirts",
    created_at: weekAgo,
    updated_at: now,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Natural', 'White', 'Light Blue', 'Sage'],
    material: '100% Washed Linen',
    care_instructions: 'Machine wash cold, medium iron'
  },
  {
    id: "mock-013",
    name: "Brown Leather Oxford Shoes",
    description:
      "Handcrafted genuine leather oxford shoes with brogue detailing. Perfect for formal occasions or elevating casual outfits. Features cushioned insoles and durable rubber soles.",
    price: 85000,
    image_url: unsplash("photo-1549298916-b41d501d3772"),
    stock_quantity: 15,
    category: "Shoes",
    created_at: weekAgo,
    updated_at: now,
    sizes: ['7', '8', '9', '10', '11', '12'],
    colors: ['Brown', 'Black', 'Tan'],
    material: '100% Genuine Leather',
    care_instructions: 'Regularly condition leather, use shoe trees'
  },
  {
    id: "mock-014",
    name: "Black Patent Heeled Sandals",
    description:
      "Elegant patent leather sandals with adjustable ankle strap. Medium heel height for comfort and style. Perfect for evening events or office wear.",
    price: 72000,
    image_url: unsplash("photo-1543508282-6319a3e2621f"),
    stock_quantity: 12,
    category: "Shoes",
    created_at: weekAgo,
    updated_at: now,
    sizes: ['5', '6', '7', '8', '9', '10'],
    colors: ['Black', 'Nude', 'Red'],
    material: 'Patent Leather',
    care_instructions: 'Clean with damp cloth, avoid direct sunlight'
  },
  {
    id: "mock-015",
    name: "Leather Belt with Gold Buckle",
    description:
      "Premium leather belt with polished gold-tone buckle. Classic design suitable for both formal and casual wear. Available in multiple sizes.",
    price: 32000,
    // ✅ Fixed: replaced suspicious photo ID with a verified belt image
    image_url: unsplash("photo-1624222247344-550fb60583dc"),
    stock_quantity: 25,
    category: "Belts",
    created_at: monthAgo,
    updated_at: now,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Brown', 'Tan'],
    material: '100% Premium Leather',
    care_instructions: 'Condition leather regularly, avoid water'
  },
  {
    id: "mock-016",
    name: "Designer Canvas Sneakers",
    description:
      "Modern canvas sneakers with contrasting sole. Comfortable for all-day wear with cushioned footbed. Multiple colour options available.",
    price: 45000,
    image_url: unsplash("photo-1600185365926-3a2ce3cdb89e"),
    stock_quantity: 30,
    category: "Shoes",
    created_at: weekAgo,
    updated_at: now,
    sizes: ['5', '6', '7', '8', '9', '10', '11'],
    colors: ['White/Black', 'Navy/White', 'Red/White', 'All Black'],
    material: 'Canvas Upper, Rubber Sole',
    care_instructions: 'Wipe clean with damp cloth'
  },
  {
    id: "mock-017",
    name: "Slim Fit Formal Shirt",
    description:
      "Tailored formal shirt in premium cotton blend. French cuffs with button detail. Perfect for business meetings or special occasions.",
    price: 42000,
    // ✅ Fixed: replaced duplicate of mock-006 with a distinct shirt photo
    image_url: unsplash("photo-1596755094514-f87e34085b2c"),
    stock_quantity: 20,
    category: "Shirts",
    created_at: monthAgo,
    updated_at: now,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['White', 'Light Blue', 'Pink', 'Striped'],
    material: '97% Cotton, 3% Spandex',
    care_instructions: 'Machine wash warm, medium iron'
  },
  {
    id: "mock-018",
    name: "Canvas Messenger Bag",
    description:
      "Durable canvas messenger bag with padded laptop compartment. Multiple pockets and adjustable shoulder strap. Ideal for daily commute or campus runs.",
    price: 38000,
    image_url: unsplash("photo-1558618666-fcd25c85cd64"),
    stock_quantity: 18,
    category: "Accessories",
    created_at: monthAgo,
    updated_at: now,
    sizes: ['One Size'],
    colors: ['Khaki', 'Black', 'Navy', 'Green'],
    material: 'Heavyweight Canvas',
    care_instructions: 'Spot clean with mild soap'
  },
];

export const HERO_SLIDES = [
  {
    image: hero1,
    alt: "Luxury boutique interior with elegant clothing displays",
    label: "Welcome to Our Boutique",
    headline: "Experience Fashion Beyond Shopping",
    subtext:
      "Walk into a carefully curated boutique where every rack tells a story. Discover elegant styles, premium fabrics, and timeless pieces made for confident women.",
  },
  {
    image: hero2,
    alt: "Elegant women's fashion displayed inside a boutique",
    label: "Curated Collections",
    headline: "Find Your Perfect Look",
    subtext:
      "From everyday essentials to statement outfits, our boutique offers handpicked collections designed to make every occasion unforgettable.",
  },
  {
    image: hero3,
    alt: "Customer browsing stylish clothing inside a modern boutique",
    label: "Shop with Confidence",
    headline: "Where Style Meets Elegance",
    subtext:
      "Enjoy a personalized shopping experience in a warm and welcoming space, where quality, comfort, and sophistication come together beautifully.",
  },
];

export const LOOKBOOK_ITEMS = [
  {
    id: "lb-1",
    title: "Urban Ease",
    subtitle: "Relaxed tailoring for city mornings",
    image: unsplash("photo-1483985988355-763728e1935b"),
  },
  {
    id: "lb-2",
    title: "Evening Light",
    subtitle: "Silk and satin after golden hour",
    image: unsplash("photo-1515372039744-b8f02a3ae446"),
  },
  {
    id: "lb-3",
    title: "Layered Warmth",
    subtitle: "Cashmere, wool, and texture",
    image: unsplash("photo-1515886657613-9f3515b0c78f"),
  },
  {
    id: "lb-4",
    title: "Minimal Forms",
    subtitle: "Clean lines, quiet confidence",
    image: unsplash("photo-1509631179647-0177331693ae"),
  },
  {
    id: "lb-5",
    title: "Weekend Edit",
    subtitle: "Linen, denim, and easy layers",
    // ✅ Fixed: replaced suspicious photo ID with a verified lifestyle image
    image: unsplash("photo-1469334031218-e382a71b716b"),
  },
  {
    id: "lb-6",
    title: "Accessories",
    subtitle: "The details that define a look",
    image: unsplash("photo-1553062407-98eeb64c6a62"),
  },
];

export const COLLECTIONS = [
  {
    slug: "new-arrivals",
    title: "New Arrivals",
    description: "Fresh pieces just landed in the boutique",
    image: unsplash("photo-1469334031218-e382a71b716b", 600, 750),
    filter: "new" as const,
  },
  {
    slug: "shirts",
    title: "Shirts",
    description: "Formal and casual shirts for every occasion",
    image: unsplash("photo-1596755094514-f87e34085b2c", 600, 750),
    filter: "Shirts" as const,
  },
  {
    slug: "shoes",
    title: "Shoes",
    description: "Elegant footwear for men and women",
    image: unsplash("photo-1549298916-b41d501d3772", 600, 750),
    filter: "Shoes" as const,
  },
  {
    slug: "belts",
    title: "Belts",
    description: "Leather and designer accessory belts",
    image: unsplash("photo-1624222247344-550fb60583dc", 600, 750),
    filter: "Belts" as const,
  },
  {
    slug: "outerwear",
    title: "Outerwear",
    description: "Coats and blazers for every season",
    image: unsplash("photo-1539533018447-63fcce2678e3", 600, 750),
    filter: "Outerwear" as const,
  },
  {
    slug: "dresses",
    title: "Dresses",
    description: "Silk, satin, and effortless silhouettes",
    image: unsplash("photo-1595777457583-95e059d581b8", 600, 750),
    filter: "Dresses" as const,
  },
  {
    slug: "essentials",
    title: "The Essentials",
    description: "Foundation pieces for a refined wardrobe",
    image: unsplash("photo-1521572163474-6864f9cf17ab", 600, 750),
    filter: "Essentials" as const,
  },
];
