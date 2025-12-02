import { Template, PricingPlan, ChartData, Testimonial, FAQItem, BlogPost } from './types';

export const TEMPLATES: Template[] = [
  {
    id: '1',
    name: 'Himalayan Trek',
    category: 'Travel',
    image: 'https://picsum.photos/600/400?random=1',
    description: 'Perfect for trekking agencies and guides. Includes itinerary builder and booking forms.',
  },
  {
    id: '2',
    name: 'Kathmandu Coffee',
    category: 'Restaurant',
    image: 'https://picsum.photos/600/400?random=2',
    description: 'Cozy vibes for cafes and restaurants. Menu management and reservation system included.',
  },
  {
    id: '3',
    name: 'Thamel Boutique',
    category: 'E-commerce',
    image: 'https://picsum.photos/600/400?random=3',
    description: 'Sell handicrafts and fashion online. Integrated with local logistics partners.',
  },
  {
    id: '4',
    name: 'TechStart Nepal',
    category: 'SaaS',
    image: 'https://picsum.photos/600/400?random=4',
    description: 'Modern landing page for startups. High conversion sections and pricing tables.',
  },
  {
    id: '5',
    name: 'Namaste Hotel',
    category: 'Hospitality',
    image: 'https://picsum.photos/600/400?random=5',
    description: 'Elegant hotel booking site with room showcases and amenity listings.',
  },
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'free',
    name: 'Suruwat (Free)',
    priceMonthly: 0,
    priceYearly: 0,
    features: ['1 Website', 'Sewax Subdomain', 'Basic Analytics', 'Community Support'],
  },
  {
    id: 'pro',
    name: 'Byawasaya (Pro)',
    priceMonthly: 1500,
    priceYearly: 15000,
    recommended: true,
    features: ['5 Websites', 'Custom Domain', 'eSewa/Khalti Integration', 'Priority Support', 'No Sewax Branding'],
  },
  {
    id: 'agency',
    name: 'Agency',
    priceMonthly: 5000,
    priceYearly: 50000,
    features: ['Unlimited Websites', 'White Label Client Portal', 'API Access', 'Dedicated Account Manager'],
  },
];

export const MOCK_CHART_DATA: ChartData[] = [
  { name: 'Sun', visitors: 400, sales: 240 },
  { name: 'Mon', visitors: 300, sales: 139 },
  { name: 'Tue', visitors: 200, sales: 980 },
  { name: 'Wed', visitors: 278, sales: 390 },
  { name: 'Thu', visitors: 189, sales: 480 },
  { name: 'Fri', visitors: 239, sales: 380 },
  { name: 'Sat', visitors: 349, sales: 430 },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Aarav Sharma',
    role: 'Founder',
    company: 'Everest Gear',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    content: "Sewax made it incredibly easy to take my trekking gear shop online. The eSewa integration was plug-and-play!",
  },
  {
    id: '2',
    name: 'Priya KC',
    role: 'Freelancer',
    company: 'Design Studio',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    content: "The templates are actually usable for the Nepali market. I built 3 client sites in a week using the Agency plan.",
  },
  {
    id: '3',
    name: 'Ramesh Thapa',
    role: 'Manager',
    company: 'Lumbini Guest House',
    avatar: 'https://randomuser.me/api/portraits/men/12.jpg',
    content: "Customer support speaks my language and understands local business needs. Highly recommended.",
  },
];

export const FAQS: FAQItem[] = [
  {
    question: "Do I need a credit card to sign up?",
    answer: "No! You can start with our Suruwat plan for free. When you upgrade, we accept eSewa, Khalti, and bank transfers.",
  },
  {
    question: "Can I use my own domain name?",
    answer: "Yes, the Byawasaya and Agency plans allow you to connect any custom domain (e.g., yourname.com.np).",
  },
  {
    question: "Is hosting included?",
    answer: "Absolutely. We provide secure, high-speed cloud hosting with global CDN for all sites built on Sewax.",
  },
  {
    question: "How do payouts work?",
    answer: "Payments collected via eSewa/Khalti go directly to your respective merchant accounts. We don't hold your money.",
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: '5 Tips for Selling Handmade Goods Online in Nepal',
    excerpt: 'Learn how to photograph, price, and ship your local handicrafts to a global audience.',
    date: 'Oct 12, 2024',
    category: 'E-commerce',
    image: 'https://picsum.photos/600/300?random=10',
  },
  {
    id: '2',
    title: 'Integrating Fonepay: A Step-by-Step Guide',
    excerpt: 'Accept QR payments directly on your Sewax landing page with our new widget.',
    date: 'Oct 08, 2024',
    category: 'Tutorials',
    image: 'https://picsum.photos/600/300?random=11',
  },
  {
    id: '3',
    title: 'Why Website Speed Matters for SEO in 2024',
    excerpt: 'How our new CDN architecture improves your Google ranking automatically.',
    date: 'Sep 25, 2024',
    category: 'Technology',
    image: 'https://picsum.photos/600/300?random=12',
  },
];