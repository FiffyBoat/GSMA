export function normalizeLooseText(value?: string | null) {
  return (value || "")
    .trim()
    .toLowerCase()
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ");
}

export function equalsLooseText(
  left?: string | null,
  right?: string | null
) {
  return normalizeLooseText(left) === normalizeLooseText(right);
}

export function includesLooseText(
  source?: string | null,
  query?: string | null
) {
  const normalizedSource = normalizeLooseText(source);
  const normalizedQuery = normalizeLooseText(query);

  if (!normalizedQuery) {
    return false;
  }

  return normalizedSource.includes(normalizedQuery);
}
