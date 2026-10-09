import { useState, type ComponentType } from 'react';

import { CrownSimpleIcon, type IconProps } from '@/components/ui/icons';
import { cn } from '@/lib/utils';

import styles from './navigation.module.scss';

type NavigationItem = {
  label: string;
  highlight?: boolean;
  icon?: ComponentType<IconProps>;
};

const navigationItems: NavigationItem[] = [
  { label: 'Todas categorias' },
  { label: 'Supermercado' },
  { label: 'Livros' },
  { label: 'Moda' },
  { label: 'Lançamentos' },
  { label: 'Ofertas do dia', highlight: true },
  { label: 'Assinatura', icon: CrownSimpleIcon },
];

const defaultActive =
  navigationItems.find((item) => item.highlight)?.label ??
  navigationItems[0].label;

export function Navigation() {
  const [active, setActive] = useState(defaultActive);

  return (
    <nav className={styles.nav}>
      {navigationItems.map(({ label, icon: Icon }) => {
        const isActive = active === label;

        return (
          <a
            key={label}
            href="#"
            aria-current={isActive ? 'page' : undefined}
            onClick={(event) => {
              event.preventDefault();
              setActive(label);
            }}
            className={cn(styles.item, isActive && styles.itemActive)}
          >
            {Icon && <Icon size={18} weight="bold"/>}
            {label}
          </a>
        );
      })}
    </nav>
  );
}
