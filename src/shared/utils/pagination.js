// 1 2 3 … 62   |   1 … 4 5 6 … 62   |   1 … 60 61 62
export function getPageItems(current, total) {
  const pages = new Set([1, total, current - 1, current, current + 1]);
  if (current <= 3) {
    pages.add(2);
    pages.add(3);
  }
  if (current >= total - 2) {
    pages.add(total - 1);
    pages.add(total - 2);
  }

  const sorted = [...pages]
    .filter((p) => p >= 1 && p <= total)
    .sort((a, b) => a - b);

  const items = [];
  sorted.forEach((page, index) => {
    const previous = sorted[index - 1];
    if (previous && page - previous === 2) items.push(previous + 1); // one page gap: show it
    else if (previous && page - previous > 2) items.push("ellipsis");
    items.push(page);
  });
  return items;
}
