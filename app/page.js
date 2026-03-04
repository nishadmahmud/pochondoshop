import Hero from "../components/Hero/Hero";
import TrustStats from "../components/TrustStats/TrustStats";
import RepairServices from "../components/RepairServices/RepairServices";
import RepairPricing from "../components/RepairPricing/RepairPricing";
import ShopCategories from "../components/ShopCategories/ShopCategories";
import NewArrivals from "../components/NewArrivals/NewArrivals";
import DiscountedParts from "../components/DiscountedParts/DiscountedParts";
import FeaturedProducts from "../components/FeaturedProducts/FeaturedProducts";
import BestDeals from "../components/BestDeals/BestDeals";
import Testimonials from "../components/Testimonials/Testimonials";
import FAQ from "../components/FAQ/FAQ";
import BlogTips from "../components/BlogTips/BlogTips";
import CTABanner from "../components/CTABanner/CTABanner";

import {
  getSlidersFromServer,
  getCategoriesFromServer,
  getNewArrivalsFromServer,
  getProducts,
  getBlogs,
  getBannerFromServer,
  getBestDealsFromServer,
  getBestSellersFromServer
} from "../lib/api";

export default async function Home() {
  let categories = [];
  let newArrivals = [];
  let heroSlides = [];
  let homeBanners = [];
  let bestDealsCards = [];
  let flashSaleProducts = [];
  let featuredProducts = [];
  let blogPosts = [];

  const toMoney = (v) => `৳ ${Number(v || 0).toLocaleString("en-IN")}`;
  const normalizeDiscount = (discount, type) => {
    const d = Number(discount || 0);
    if (!d || d <= 0) return null;
    return String(type).toLowerCase() === "percentage"
      ? `-${d}%`
      : `৳ ${d.toLocaleString("en-IN")}`;
  };

  try {
    const res = await getCategoriesFromServer();
    if (res?.success && res?.data) categories = res.data;
  } catch (error) { console.error("Failed to fetch categories:", error); }

  try {
    const res = await getBannerFromServer();
    if (res?.success && Array.isArray(res?.banners)) {
      homeBanners = res.banners.map(b => ({
        id: b.id,
        image: b.image_path,
        link: b.button_url || "/"
      }));
    }
  } catch (error) { console.error("Failed to fetch banners:", error); }

  try {
    const res = await getSlidersFromServer();
    const sliderData = res?.success ? res?.sliders : null;
    let images = [];
    if (Array.isArray(sliderData) && sliderData.length > 0) {
      images = sliderData[0].image_path || [];
    }

    heroSlides = images.map((img, idx) => ({
      id: idx,
      title: "",
      subtitle: "",
      buttonText: "",
      buttonLink: "",
      image: img,
    }));
  } catch (error) { console.error("Failed to fetch sliders:", error); }

  try {
    const res = await getNewArrivalsFromServer();
    const items = res?.success ? res?.data?.data : null;
    if (Array.isArray(items)) {
      newArrivals = items.slice(0, 10).map((p) => {
        const discountValue = Number(p.discount || 0);
        const discountType = p.discount_type;
        const hasDiscount = discountValue > 0 && String(discountType || '').toLowerCase() !== '0';

        const originalPrice = Number(p.retails_price || 0);
        const discountedPrice = hasDiscount
          ? (String(discountType).toLowerCase() === 'percentage'
            ? Math.max(0, Math.round(originalPrice * (1 - discountValue / 100)))
            : Math.max(0, originalPrice - discountValue))
          : originalPrice;

        return {
          id: p.id,
          name: p.name,
          brand: p.brands?.name || "Others",
          price: toMoney(discountedPrice),
          oldPrice: hasDiscount ? toMoney(originalPrice) : null,
          discount: hasDiscount ? normalizeDiscount(discountValue, discountType) : null,
          imageUrl: p.image_path || p.image_path1 || p.image_path2 || p.image_url || "/no-image.svg",
        };
      });
    }
  } catch (error) { console.error("Failed to fetch new arrivals:", error); }

  try {
    const res = await getBestDealsFromServer();
    const items = res?.success ? res?.data : null;
    if (Array.isArray(items)) {
      // Sort items by price descending for the best deals section
      const sortedItems = [...items].sort((a, b) => {
        const priceA = Number(a.discounted_price || a.retails_price || 0);
        const priceB = Number(b.discounted_price || b.retails_price || 0);
        return priceB - priceA;
      });

      bestDealsCards = sortedItems.slice(0, 2).map((pp, idx) => {
        const p = pp;
        const originalPrice = Number(p.retails_price || 0);
        const discountValue = Number(p.discount || 0);
        const discountType = p.discount_type;
        const hasDiscount = discountValue > 0 && String(discountType || '').toLowerCase() !== '0';

        const discountedPrice = hasDiscount
          ? (String(discountType).toLowerCase() === 'percentage'
            ? Math.max(0, Math.round(originalPrice * (1 - discountValue / 100)))
            : Math.max(0, originalPrice - discountValue))
          : originalPrice;

        const savingsValue = Math.max(0, originalPrice - discountedPrice);

        const badge = hasDiscount ? (String(discountType).toLowerCase() === 'percentage' ? `-${discountValue}%` : `Save ৳${discountValue}`) : (idx === 0 ? "BEST DEAL" : "HOT DEAL");
        const descParts = [];
        if (p.brands?.name) descParts.push(p.brands.name);
        if (p.status) descParts.push(p.status);
        if (savingsValue > 0) descParts.push(`Save ৳ ${savingsValue.toLocaleString("en-IN")}`);

        const slugName = pp.name ? pp.name.toLowerCase().replace(/\s+/g, "-") : "product";
        const slugWithId = pp.id ? `${slugName}-${pp.id}` : slugName;

        return {
          id: pp.id,
          title: pp.name,
          description: descParts.join(" • ") || "Limited time offer.",
          price: toMoney(discountedPrice),
          oldPrice: hasDiscount ? toMoney(originalPrice) : null,
          savings: savingsValue > 0 ? `Save ৳ ${savingsValue.toLocaleString("en-IN")}` : null,
          imageUrl: p.image_path || p.image_url || "/no-image.svg",
          badge,
          link: `/product/${slugWithId}`,
        };
      });

      flashSaleProducts = items.filter(p => p.image_path || p.image_url).slice(0, 10).map((p) => {
        const originalPrice = Number(p.retails_price || 0);
        const discountValue = Number(p.discount || 0);
        const discountType = p.discount_type;
        const hasDiscount = discountValue > 0 && String(discountType || '').toLowerCase() !== '0';

        const discountedPrice = hasDiscount
          ? (String(discountType).toLowerCase() === 'percentage'
            ? Math.max(0, Math.round(originalPrice * (1 - discountValue / 100)))
            : Math.max(0, originalPrice - discountValue))
          : originalPrice;

        return {
          id: p.id,
          name: p.name,
          price: toMoney(discountedPrice),
          oldPrice: hasDiscount ? toMoney(originalPrice) : null,
          discount: hasDiscount ? normalizeDiscount(discountValue, discountType) : null,
          imageUrl: p.image_path || p.image_url || "/no-image.svg",
        };
      });
    }
  } catch (error) { console.error("Failed to fetch best deals:", error); }

  try {
    const res = await getBestSellersFromServer();
    const items = res?.success ? (res.data?.data || res.data) : null;
    if (Array.isArray(items)) {
      featuredProducts = items.map((p) => {
        const originalPrice = Number(p.retails_price || 0);
        const discountValue = Number(p.discount || 0);
        const discountType = p.discount_type;
        const hasDiscount = discountValue > 0 && String(discountType || '').toLowerCase() !== '0';

        const discountedPrice = hasDiscount
          ? (String(discountType).toLowerCase() === 'percentage'
            ? Math.max(0, Math.round(originalPrice * (1 - discountValue / 100)))
            : Math.max(0, originalPrice - discountValue))
          : originalPrice;

        return {
          id: p.id,
          name: p.name,
          price: toMoney(discountedPrice),
          oldPrice: hasDiscount ? toMoney(originalPrice) : null,
          discount: hasDiscount ? normalizeDiscount(discountValue, discountType) : null,
          imageUrl: p.image_path || p.image_url || "/no-image.svg",
        };
      });
    }
  } catch (error) { console.error("Failed to fetch best sellers:", error); }

  try {
    const res = await getBlogs();
    if (res?.success && Array.isArray(res?.data)) {
      blogPosts = res.data.slice(0, 3).map(b => ({
        id: b.id,
        title: b.title,
        excerpt: b.content ? b.content.replace(/<[^>]+>/g, '').substring(0, 100) + '...' : 'Read our latest insights...',
        date: new Date(b.created_at || Date.now()).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        category: b.category_id || 'Tech News',
        readTime: '5 min read',
        image: b.image || "/images/blog-fallback.jpg",
        slug: b.title ? b.title.toLowerCase().replace(/\s+/g, '-') : String(b.id)
      }));
    }
  } catch (error) { console.error("Failed to fetch blogs:", error); }

  return (
    <>
      <Hero slides={heroSlides} banners={homeBanners} />
      <TrustStats />

      <ShopCategories categories={categories} flashSaleProducts={flashSaleProducts} />
      <NewArrivals products={newArrivals} />
      <DiscountedParts />
      <FeaturedProducts products={featuredProducts} />
      <BestDeals deals={bestDealsCards} />
      <BlogTips posts={blogPosts} />
      <CTABanner />
      <Testimonials />
      <FAQ />
    </>
  );
}
