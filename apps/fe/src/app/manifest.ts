import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'sikdorang',
    short_name: 'sikdorang',
    description: '디지털 메뉴판 올인원 솔루션',
    id: 'sikdorang',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    display_override: ['standalone', 'window-controls-overlay'],
    orientation: 'landscape',
    background_color: '#10161a',
    theme_color: '#3e84ff',
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
