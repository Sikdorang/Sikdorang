import { http } from 'msw';

export const handlers = [
  http.get('/api/test', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ msg: '모킹된 메시지' }));
  }),
];
