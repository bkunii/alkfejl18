
export function dateToString(date: Date): string {
  if (date !== null && date !== undefined) {
    return date.toLocaleDateString('hu-HU', {year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'});
  } else {
    return '';
  }
}
