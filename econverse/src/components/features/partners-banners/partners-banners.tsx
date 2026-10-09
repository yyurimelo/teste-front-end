import { Container } from '@/components/ui/container';

import { PartnerBannerCard } from './partner-banner-card';

import styles from './partners-banners.module.scss';

const banners = [
  {
    title: 'Parceiros',
    description: 'Lorem ipsum dolor sit amet, consectetur',
    image: '/partners.png',
    href: '/parceiros',
  },
  {
    title: 'Parceiros',
    description: 'Lorem ipsum dolor sit amet, consectetur',
    image: '/partners.png',
    href: '/parceiros',
  },
];

export function PartnersBanners() {
  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.grid}>
          {banners.map((banner, index) => (
            <PartnerBannerCard key={index} {...banner} />
          ))}
        </div>
      </Container>
    </section>
  );
}
