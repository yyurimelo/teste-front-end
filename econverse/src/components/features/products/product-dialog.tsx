import { useId, useState } from 'react';

import { Button } from '@/components/ui/button';
import { MinusIcon, PlusIcon } from '@/components/ui/icons';
import { Modal } from '@/components/ui/modal';
import { cn } from '@/lib/utils';
import { formatPrice } from '@/lib/format';
import type { Product } from '@/types/product';

import styles from './product-dialog.module.scss';

type ProductDialogProps = {
  product: Product;
  triggerLabel?: string;
  triggerClassName?: string;
};

export function ProductDialog({
  product,
  triggerLabel = 'COMPRAR',
  triggerClassName,
}: ProductDialogProps) {
  const [open, setOpen] = useState(false);
  const titleId = useId();

  return (
    <>
      <Button
        className={cn(styles.trigger, triggerClassName)}
        onClick={() => setOpen(true)}
      >
        {triggerLabel}
      </Button>

      <Modal open={open} onClose={() => setOpen(false)} titleId={titleId}>
        <DialogContent product={product} titleId={titleId} />
      </Modal>
    </>
  );
}

type DialogContentProps = {
  product: Product;
  titleId: string;
};

function DialogContent({ product, titleId }: DialogContentProps) {
  const [quantity, setQuantity] = useState(1);
  const price = product.price * quantity;

  function handleQuantityChange(newQuantity: number) {
    setQuantity(newQuantity);
  }

  return (
    <div className={styles.grid}>
      <div className={styles.imageWrap}>
        <img
          src={product.photo}
          alt={product.productName}
          width={300}
          height={300}
          className={styles.image}
        />
      </div>

      <div className={styles.details}>
        <h2 id={titleId} className={styles.title}>
          {product.productName}
        </h2>

        <p className={styles.price}>{formatPrice(price)}</p>

        <p className={styles.description}>
          Many desktop publishing packages and web page editors now many
          desktop publishing
        </p>

        <button type="button" className={styles.detailsLink}>
          Veja mais detalhes do produto &gt;
        </button>

        <div className={styles.actions}>
          <div className={styles.stepper}>
            <button
              type="button"
              aria-label="Diminuir quantidade"
              className={styles.stepButton}
              onClick={() => handleQuantityChange(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
            >
              <MinusIcon size={20} weight="light" />
            </button>

            <span className={styles.quantity}>
              {String(quantity).padStart(2, '0')}
            </span>

            <button
              type="button"
              aria-label="Aumentar quantidade"
              className={styles.stepButton}
              onClick={() => handleQuantityChange(quantity + 1)}
            >
              <PlusIcon size={20} weight="light" />
            </button>
          </div>

          <Button className={styles.buyButton}>COMPRAR</Button>
        </div>
      </div>
    </div>
  );
}
