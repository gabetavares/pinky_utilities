export function format_item_code(item_code: string) {
  return (item_code || '')
    .toString()
    .replace(/^[-_\s]+/, '')
    .replace(/[_-\s]+/g, '-')
    .toUpperCase();
}