import { formatPrice } from '@/lib/format';
import type { Product } from '@/types/product';

import { ProductDialog } from './product-dialog';

import styles from './product-card.module.scss';

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.imageWrap}>
        <img
          src={product.photo}
          alt={product.productName}
          width={300}
          height={300}
          loading="lazy"
          className={styles.image}
        />
      </div>

      <div className={styles.body}>
        <p className={styles.description}>{product.descriptionShort}</p>

        <div className={styles.prices}>
          <span className={styles.originalPrice}>
            {formatPrice(product.price * 1.2)}
          </span>

          <span className={styles.price}>{formatPrice(product.price)}</span>

          <span className={styles.installments}>
            ou 2x {formatPrice(product.price / 2)} sem juros
          </span>

          <span className={styles.freeShipping}>Frete grátis</span>
        </div>

        <ProductDialog product={product} triggerClassName={styles.trigger} />
      </div>
    </article>
  );
}
