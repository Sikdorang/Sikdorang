import { menuHandler } from './api/menu';
import { orderHandler } from './api/order';
import { storeHandlers } from './api/store';

export const handlers = [...menuHandler, ...storeHandlers, ...orderHandler];
