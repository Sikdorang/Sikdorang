import { http } from 'msw';

export const handlers = [
  // @ts-expect-error: 타입 무시하고 넘어감
  http.get('/api/test', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ msg: '모킹된 메시지' }));
  }),
];
