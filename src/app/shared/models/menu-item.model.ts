import { CarouselItem } from './carousel-item.model';

export type MenuCategory = 'popular' | 'frappe' | 'espresso' | 'pastries';

export interface MenuItem extends CarouselItem {
  id: number;
  name: string;
  price: number;
  image: string;
  alt: string;
  category: MenuCategory;
  description?: string;
  img?: string;
}
