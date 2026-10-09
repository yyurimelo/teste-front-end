import { Button } from '@/components/ui/button';

import styles from './partner-banner-card.module.scss';

type PartnerBannerCardProps = {
  title: string;
  description: string;
  image: string;
  href: string;
  ctaLabel?: string;
};

export function PartnerBannerCard({
  title,
  description,
  image,
  ctaLabel = 'Confira',
}: PartnerBannerCardProps) {
  return (
    <div className={styles.card}>
      <img
        src={image}
        alt={title}
        width={634}
        height={350}
        loading="lazy"
        className={styles.image}
      />

      <div className={styles.overlay} aria-hidden="true" />

      <div className={styles.wrapper}>
        <div className={styles.content}>
          <h3 className={styles.title}>{title}</h3>

          <p className={styles.description}>{description}</p>

          <Button className={styles.cta}>{ctaLabel}</Button>
        </div>
      </div>
    </div>
  );
}
