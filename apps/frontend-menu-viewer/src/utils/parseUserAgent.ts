import { UAParser } from 'ua-parser-js';

export function getDeviceType(): 'mobile' | 'tablet' | 'desktop' {
  const parser = new UAParser();
  const result = parser.getResult();

  if (result.device.type === 'mobile') return 'mobile';
  if (result.device.type === 'tablet') return 'tablet';
  return 'desktop';
}
