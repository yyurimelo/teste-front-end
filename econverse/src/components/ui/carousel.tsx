import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
  type RefObject,
} from 'react';

import { ChevronLeftIcon, ChevronRightIcon } from '@/components/ui/icons';
import { cn } from '@/lib/utils';

import styles from './carousel.module.scss';

type CarouselContextValue = {
  viewportRef: RefObject<HTMLDivElement | null>;
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
};

const CarouselContext = createContext<CarouselContextValue | null>(null);

function useCarousel() {
  const context = useContext(CarouselContext);

  if (!context) {
    throw new Error('useCarousel deve ser usado dentro de <Carousel />');
  }

  return context;
}

type CarouselProps = {
  className?: string;
  children: ReactNode;
};

export function Carousel({ className, children }: CarouselProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const updateArrows = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    setCanScrollPrev(viewport.scrollLeft > 0);
    setCanScrollNext(
      viewport.scrollLeft + viewport.clientWidth < viewport.scrollWidth - 1,
    );
  }, []);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    updateArrows();
    viewport.addEventListener('scroll', updateArrows, { passive: true });

    const observer = new ResizeObserver(updateArrows);
    observer.observe(viewport);

    return () => {
      viewport.removeEventListener('scroll', updateArrows);
      observer.disconnect();
    };
  }, [updateArrows]);

  const scrollByItem = useCallback((direction: 1 | -1) => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const item = viewport.querySelector<HTMLElement>(`.${styles.item}`);
    const amount = item?.offsetWidth ?? viewport.clientWidth;

    viewport.scrollBy({ left: direction * amount, behavior: 'smooth' });
  }, []);

  const scrollPrev = useCallback(() => scrollByItem(-1), [scrollByItem]);
  const scrollNext = useCallback(() => scrollByItem(1), [scrollByItem]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        scrollPrev();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        scrollNext();
      }
    },
    [scrollPrev, scrollNext],
  );

  return (
    <CarouselContext.Provider
      value={{
        viewportRef,
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
      }}
    >
      <div
        role="region"
        aria-roledescription="carousel"
        className={cn(styles.carousel, className)}
        onKeyDownCapture={handleKeyDown}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  );
}

export function CarouselContent({ children }: { children: ReactNode }) {
  const { viewportRef } = useCarousel();

  return (
    <div ref={viewportRef} className={styles.viewport}>
      <div className={styles.track}>{children}</div>
    </div>
  );
}

export function CarouselItem({ children }: { children: ReactNode }) {
  return (
    <div role="group" aria-roledescription="slide" className={styles.item}>
      {children}
    </div>
  );
}

export function CarouselPrevious() {
  const { scrollPrev, canScrollPrev } = useCarousel();

  return (
    <button
      type="button"
      className={cn(styles.arrow, styles.previous)}
      onClick={scrollPrev}
      disabled={!canScrollPrev}
      aria-label="Slide anterior"
    >
      <ChevronLeftIcon />
    </button>
  );
}

export function CarouselNext() {
  const { scrollNext, canScrollNext } = useCarousel();

  return (
    <button
      type="button"
      className={cn(styles.arrow, styles.next)}
      onClick={scrollNext}
      disabled={!canScrollNext}
      aria-label="Próximo slide"
    >
      <ChevronRightIcon />
    </button>
  );
}
