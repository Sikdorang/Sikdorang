import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: '식도랑',
    short_name: '식도랑',
    description: '고민은 줄이고, 선택은 쉽게. 술자리 주문을 도와주는 메뉴판',
    id: 'sikdorang',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    display_override: ['standalone', 'window-controls-overlay'],
    orientation: 'landscape',
    background_color: '#ffffff',
    theme_color: '#10161a',
    lang: 'ko',
    dir: 'ltr',
    icons: [
      {
        src: '/icons/logo/android-launchericon-48-48.png',
        sizes: '48x48',
        type: 'image/png',
      },
      {
        src: '/icons/logo/android-launchericon-72-72.png',
        sizes: '72x72',
        type: 'image/png',
      },
      {
        src: '/icons/logo/android-launchericon-96-96.png',
        sizes: '96x96',
        type: 'image/png',
      },
      {
        src: '/icons/logo/android-launchericon-144-144.png',
        sizes: '144x144',
        type: 'image/png',
      },
      {
        src: '/icons/logo/android-launchericon-192-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icons/logo/android-launchericon-512-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
