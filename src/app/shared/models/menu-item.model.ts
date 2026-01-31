import { CarouselItem } from './carousel-item.model';

export type MenuCategory = 'popular' | 'frappe' | 'espresso' | 'pastries';

export interface MenuItem extends CarouselItem {
    id: number;
    category: MenuCategory;
    description?: string;
    img?: string;
}
