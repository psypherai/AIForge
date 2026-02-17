/**
 * ID generation utilities — consistent across the monorepo.
 */

/** Generate a prefixed nanoid-style ID. */
export function createId(prefix?: string): string {
  const id = crypto.randomUUID();
  return prefix ? `${prefix}_${id}` : id;
}

/** Validate that a string is a valid UUID. */
export function isValidId(id: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  // Check with or without prefix
  const withoutPrefix = id.includes('_') ? id.split('_').slice(1).join('_') : id;
  return uuidRegex.test(withoutPrefix);
}
