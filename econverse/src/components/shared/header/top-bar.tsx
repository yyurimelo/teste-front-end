import {
  CreditCardIcon,
  ShieldCheckIcon,
  TruckIcon,
} from '@/components/ui/icons';

import styles from './top-bar.module.scss';

const items = [
  {
    key: 'secure',
    icon: ShieldCheckIcon,
    content: (
      <>
        <span>Compra</span>
        <span className={styles.highlight}>100% segura</span>
      </>
    ),
  },
  {
    key: 'shipping',
    icon: TruckIcon,
    content: (
      <>
        <span>Frete grátis</span>
        <span className={styles.highlight}>acima de R$ 200</span>
      </>
    ),
  },
  {
    key: 'installments',
    icon: CreditCardIcon,
    content: (
      <>
        <span className={styles.highlight}>Parcele</span>
        <span>suas compras</span>
      </>
    ),
  },
];

export function TopBar() {
  return (
    <div className={styles.topBar}>
      {items.map(({ key, icon: Icon, content }) => (
        <div key={key} className={styles.item}>
          <Icon size={26} weight="bold" />
          <div className={styles.content}>{content}</div>
        </div>
      ))}
    </div>
  );
}
