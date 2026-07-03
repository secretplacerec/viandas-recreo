export interface Product {
  id: string;
  name: string;
  unitType: 'gramos' | 'unidades' | 'ml';
  weight: number; // peso/cantidad por unidad
  createdAt: Date;
}

export interface PackItem {
  id: string;
  packId: string;
  productId: string;
  product: Product;
  quantity: number;
}

export interface Pack {
  id: string;
  day: number; // 1-20 (días hábiles del mes)
  weekNum: number; // 1-4 (semana del mes)
  packNum: number; // 1, 2, 3 (recreo del día)
  items: PackItem[];
  createdAt: Date;
}

export interface MonthConfig {
  id: string;
  year: number;
  month: number;
  workDays: number; // 20 por defecto
  packsPerDay: number; // 3 por defecto
}

export interface ShoppingItem {
  productId: string;
  product: Product;
  totalGrams?: number;
  totalUnits?: number;
  totalQuantity: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
