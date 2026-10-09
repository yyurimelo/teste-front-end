import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Container } from '@/components/ui/container';
import type { Product } from '@/types/product';

import { ProductCard } from './product-card';
import { ProductsSkeleton } from './products-skeleton';
import { ProductsTabs } from './product-tabs';

import styles from './products.module.scss';

type ProductsProps = {
  products: Product[];
  loading?: boolean;
  error?: boolean;
  onRetry?: () => void;
  all?: boolean;
};

export function Products({
  products,
  loading = false,
  error = false,
  onRetry,
  all = false,
}: ProductsProps) {
  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.heading}>
          <span className={styles.separator} aria-hidden="true" />
          <h2 className={styles.title}>Produtos relacionados</h2>
          <span className={styles.separator} aria-hidden="true" />
        </div>

        {all ? (
          <span className={styles.seeAll}>Ver todos</span>
        ) : (
          <ProductsTabs />
        )}

        {loading ? (
          <ProductsSkeleton />
        ) : error ? (
          <div className={styles.error}>
            <p>
              Não foi possível carregar os produtos. Verifique sua conexão e
              tente novamente.
            </p>
            <Button onClick={onRetry}>Tentar novamente</Button>
          </div>
        ) : (
          <div className={styles.carouselWrapper}>
            <Carousel>
              <CarouselContent>
                {products.map((product) => (
                  <CarouselItem key={product.productName}>
                    <div className={styles.itemInner}>
                      <ProductCard product={product} />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>

              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        )}
      </Container>
    </section>
  );
}
