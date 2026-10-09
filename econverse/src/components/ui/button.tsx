import type { ComponentProps } from 'react';

import styles from './button.module.scss';

type ButtonProps = ComponentProps<'button'>;

export function Button({ className, type = 'button', ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={className ? `${styles.button} ${className}` : styles.button}
      {...props}
    />
  );
}
