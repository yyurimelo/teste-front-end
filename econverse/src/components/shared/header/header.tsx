import { Container } from '@/components/ui/container';
import {
  HeartIcon,
  ShoppingCartIcon,
  UserCircleIcon,
} from '@/components/ui/icons';

import { Navigation } from './navigation';
import { SearchBar } from './search-bar';
import { TopBar } from './top-bar';

import styles from './header.module.scss';

export function Header() {
  return (
    <header className={styles.header}>
      <h1 className="sr-only">Econverse</h1>
      <Container className={styles.headerInner}>
        <TopBar />

        <div className={styles.middle}>
          <div className={styles.leftCluster}>
            <img
              src="/Logo.png"
              alt="Econverse"
              width={139}
              height={42}
              className={styles.logo}
            />

            <div className={styles.actions}>
              <img
                src="/icons/box-arrow.svg"
                alt=""
                width={24}
                height={24}
                className={styles.orderIcon}
              />
              <HeartIcon size={28}/>
              <UserCircleIcon size={28} />
              <ShoppingCartIcon size={28} />
            </div>
          </div>

          <div className={styles.searchWrapper}>
            <SearchBar />
          </div>
        </div>

        <Navigation />
      </Container>
    </header>
  );
}
