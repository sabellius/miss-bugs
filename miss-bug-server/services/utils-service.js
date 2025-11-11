export function sortBugs(bugs, sortBy = 'createdAt', sortDir = 'desc') {
  return [...bugs].sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];
    if (sortDir === 'asc')
      return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
    return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
  });
}

export function paginateBugs(bugs, pageIdx = 0, pageSize = 2) {
  const start = pageIdx * pageSize;
  const paginated = bugs.slice(start, start + pageSize);
  return paginated;
}
