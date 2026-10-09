import { Container } from '@/components/ui/container';

import styles from './brands.module.scss';

const brands = [
  { name: 'Converse', logo: '/Logo.png' },
  { name: 'Converse', logo: '/Logo.png' },
  { name: 'Converse', logo: '/Logo.png' },
  { name: 'Converse', logo: '/Logo.png' },
  { name: 'Converse', logo: '/Logo.png' },
];

export function Brands() {
  return (
    <section className={styles.section}>
      <Container>
        <h2 className={styles.title}>Navegue por marcas</h2>

        <ul className={styles.list}>
          {brands.map((brand, index) => (
            <li key={index} className={styles.item}>
              <img
                src={brand.logo}
                alt={brand.name}
                width={80}
                height={80}
                loading="lazy"
                className={styles.logo}
              />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
