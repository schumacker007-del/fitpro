export function normalizeSearchText(value: string): string {
  return value
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .trim();
}

export function matchesSearchQuery(query: string, ...fields: (string | undefined)[]): boolean {
  const normalizedQuery = normalizeSearchText(query);
  if (!normalizedQuery) return true;

  const tokens = normalizedQuery.split(/\s+/).filter(Boolean);
  const haystack = normalizeSearchText(fields.filter(Boolean).join(' '));

  return tokens.every((token) => haystack.includes(token));
}
