import { useState } from 'react';

import { cn } from '@/lib/utils';

import styles from './product-tabs.module.scss';

const tabs = [
  'Celular',
  'Acessórios',
  'Tablets',
  'Notebooks',
  'TVs',
  'Ver todos',
];

export function ProductsTabs() {
  const [active, setActive] = useState('Celular');

  return (
    <div className={styles.tabs}>
      {tabs.map((tab) => (
        <button
          key={tab}
          type="button"
          onClick={() => setActive(tab)}
          className={cn(styles.tab, active === tab && styles.tabActive)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
