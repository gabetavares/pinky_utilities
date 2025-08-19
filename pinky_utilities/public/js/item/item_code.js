function format_item_code(item_code) {
  return (item_code || '')
    .toString()
    .trim()
    .replace(/_/g, '-')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .toUpperCase();
}