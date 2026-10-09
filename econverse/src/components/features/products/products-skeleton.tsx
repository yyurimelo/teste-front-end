import styles from './products-skeleton.module.scss';

type ProductsSkeletonProps = {
  count?: number;
};

export function ProductsSkeleton({ count = 8 }: ProductsSkeletonProps) {
  return (
    <ul className={styles.skeleton} aria-hidden="true">
      {Array.from({ length: count }).map((_, index) => (
        <li key={index} className={styles.item}>
          <div className={`${styles.pulse} ${styles.imageBlock}`} />

          <div className={styles.textGroup}>
            <div className={`${styles.pulse} ${styles.full}`} />
            <div className={`${styles.pulse} ${styles.threeQuarters}`} />
          </div>

          <div className={styles.pricesGroup}>
            <div className={`${styles.pulse} ${styles.third}`} />
            <div className={`${styles.pulse} ${styles.half}`} />
            <div className={`${styles.pulse} ${styles.twoThirds}`} />
            <div className={`${styles.pulse} ${styles.third}`} />
          </div>

          <div className={`${styles.pulse} ${styles.buttonBlock}`} />
        </li>
      ))}
    </ul>
  );
}
