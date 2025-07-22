export function formatNumber(num: number): string {
  return num.toLocaleString('ko-KR');
}

export function formatIndex(index: number): string {
  return index.toString().padStart(2, '0');
}

export function formatDateTime(dateStr: string): string {
  const date = new Date(dateStr);
  const yyyy = date.getUTCFullYear();
  const mm = String(date.getUTCMonth() + 1).padStart(2, '0');
  const dd = String(date.getUTCDate()).padStart(2, '0');
  const hh = String(date.getUTCHours()).padStart(2, '0');
  const min = String(date.getUTCMinutes()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd} ${hh}:${min}`;
}
