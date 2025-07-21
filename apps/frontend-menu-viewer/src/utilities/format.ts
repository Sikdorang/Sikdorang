export function formatNumber(num: number): string {
  return num.toLocaleString('ko-KR');
}

export function formatIndex(index: number): string {
  return index.toString().padStart(2, '0');
}

export function formatDateTime(dateStr: string): string {
  const date = new Date(dateStr);
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const hh = String(date.getHours()).padStart(2, '0');
  const min = String(date.getMinutes()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd} ${hh}:${min}`;
}
