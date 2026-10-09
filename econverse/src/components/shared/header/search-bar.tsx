import { MagnifyingGlassIcon } from '@/components/ui/icons';

import styles from './search-bar.module.scss';

export function SearchBar() {
  return (
    <div className={styles.searchBar}>
      <input
        type="text"
        placeholder="O que você está buscando?"
        className={styles.input}
      />
      <MagnifyingGlassIcon size={25} className={styles.icon} />
    </div>
  );
}
