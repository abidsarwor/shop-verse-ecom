
import Layout from "@/components/layout/Layout";
import HeroBanner from "@/components/home/HeroBanner";
import FeaturedCategories from "@/components/home/FeaturedCategories";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import SpecialOffer from "@/components/home/SpecialOffer";
import Testimonials from "@/components/home/Testimonials";
import Newsletter from "@/components/home/Newsletter";

const Index = () => {
  return (
    <Layout>
      <HeroBanner />
      <FeaturedCategories />
      <FeaturedProducts />
      <SpecialOffer />
      <Testimonials />
      <Newsletter />
    </Layout>
  );
};

export default Index;
