import { Brands } from '@/components/features/brands/brands';
import { Categories } from '@/components/features/home/categories';
import { homeCategories } from '@/components/features/home/categories-data';
import { HeroBanner } from '@/components/features/home/hero-banner';
import { PartnersBanners } from '@/components/features/partners-banners/partners-banners';
import { Products } from '@/components/features/products';
import { Footer } from '@/components/shared/footer';
import { Header } from '@/components/shared/header';
import { useProducts } from '@/hooks/use-products';

export default function App() {
  const { products, status, retry } = useProducts();
  const loaded = status === 'success';

  return (
    <>
      <Header />
      <main>
        <HeroBanner />
        <Categories categories={homeCategories} initialActiveName="Tecnologia" />
        <Products
          products={products}
          loading={status === 'loading'}
          error={status === 'error'}
          onRetry={retry}
        />
        <Brands />
        <PartnersBanners />
        {loaded && <Products products={products} all />}
        <PartnersBanners />
        {loaded && <Products products={products} all />}
        <Brands />
        {loaded && <Products products={products} all />}
      </main>
      <Footer />
    </>
  );
}
