import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';

import styles from './hero-banner.module.scss';

export function HeroBanner() {
  return (
    <section className={styles.hero}>
      <img
        src="/black-friday-wallpaper.jpg"
        alt="Produtos em promoção nas prateleiras da Econverse"
        width={4096}
        height={2304}
        className={styles.image}
      />

      <div className={styles.overlay} aria-hidden="true" />

      <Container className={styles.content}>
        <h2 className={styles.title}>Venha conhecer nossas promoções</h2>

        <p className={styles.text}>
          <span className={styles.highlight}>50% Off</span>
          <span> nos produtos</span>
        </p>

        <div className={styles.buttonWrap}>
          <Button className={styles.button}>Ver produto</Button>
        </div>
      </Container>
    </section>
  );
}
