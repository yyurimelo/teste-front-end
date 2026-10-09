import type { ComponentType } from 'react';

import type { IconProps } from '@phosphor-icons/react/lib';
import { CaretLeftIcon as PhosphorCaretLeft } from '@phosphor-icons/react/CaretLeft';
import { CaretRightIcon as PhosphorCaretRight } from '@phosphor-icons/react/CaretRight';
import { CreditCardIcon as PhosphorCreditCard } from '@phosphor-icons/react/CreditCard';
import { CrownSimpleIcon as PhosphorCrownSimple } from '@phosphor-icons/react/CrownSimple';
import { HeartIcon as PhosphorHeart } from '@phosphor-icons/react/Heart';
import { MagnifyingGlassIcon as PhosphorMagnifyingGlass } from '@phosphor-icons/react/MagnifyingGlass';
import { MinusIcon as PhosphorMinus } from '@phosphor-icons/react/Minus';
import { PlusIcon as PhosphorPlus } from '@phosphor-icons/react/Plus';
import { ShieldCheckIcon as PhosphorShieldCheck } from '@phosphor-icons/react/ShieldCheck';
import { ShoppingCartIcon as PhosphorShoppingCart } from '@phosphor-icons/react/ShoppingCart';
import { TruckIcon as PhosphorTruck } from '@phosphor-icons/react/Truck';
import { UserCircleIcon as PhosphorUserCircle } from '@phosphor-icons/react/UserCircle';
import { XIcon as PhosphorX } from '@phosphor-icons/react/X';

export type { IconProps };

function decorative(Icon: ComponentType<IconProps>) {
  return function DecorativeIcon({
    'aria-hidden': ariaHidden,
    ...props
  }: IconProps) {
    return <Icon aria-hidden={ariaHidden ?? true} {...props} />;
  };
}

export const HeartIcon = decorative(PhosphorHeart);
export const ShoppingCartIcon = decorative(PhosphorShoppingCart);
export const UserCircleIcon = decorative(PhosphorUserCircle);
export const MagnifyingGlassIcon = decorative(PhosphorMagnifyingGlass);
export const ShieldCheckIcon = decorative(PhosphorShieldCheck);
export const TruckIcon = decorative(PhosphorTruck);
export const CreditCardIcon = decorative(PhosphorCreditCard);
export const CrownSimpleIcon = decorative(PhosphorCrownSimple);
export const XIcon = decorative(PhosphorX);
export const MinusIcon = decorative(PhosphorMinus);
export const PlusIcon = decorative(PhosphorPlus);

export const ChevronLeftIcon = decorative(PhosphorCaretLeft);
export const ChevronRightIcon = decorative(PhosphorCaretRight);