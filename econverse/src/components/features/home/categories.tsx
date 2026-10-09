import { useState } from 'react';

import { cn } from '@/lib/utils';

import type { Category } from './categories-data';

import styles from './categories.module.scss';

type CategoriesProps = {
  categories: Category[];
  initialActiveName?: string;
};

export function Categories({
  categories,
  initialActiveName,
}: CategoriesProps) {
  const [activeName, setActiveName] = useState(
    initialActiveName ?? categories[0]?.name,
  );

  return (
    <section aria-label="Categorias" className={styles.section}>
      <div className={styles.wrap}>
        <ul className={styles.list}>
          {categories.map(({ name, icon }) => {
            const isActive = name === activeName;

            return (
              <li key={name} className={styles.item}>
                <button
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActiveName(name)}
                  className={styles.button}
                >
                  <span
                    className={cn(
                      styles.iconBox,
                      isActive && styles.iconBoxActive,
                    )}
                  >
                    <img
                      src={icon}
                      alt=""
                      width={56}
                      height={56}
                      className={cn(styles.icon, isActive && styles.iconActive)}
                    />
                  </span>

                  <span
                    className={cn(styles.label, isActive && styles.labelActive)}
                  >
                    {name}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
