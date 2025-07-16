import { menuHandler } from './api/menu';
import { storeHandlers } from './api/store';

export const handlers = [...menuHandler, ...storeHandlers];
