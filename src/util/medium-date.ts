export function mediumDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', { dateStyle: 'medium' });
}
