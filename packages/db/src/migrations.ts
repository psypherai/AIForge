/**
 * Migration helpers — track and apply database migrations.
 */

export const MIGRATIONS = [
  {
    version: '001',
    name: 'initial_setup',
    description: 'Create pgvector extension, documents, profiles, conversations, messages tables',
    sql: `-- See pgvector.ts for the full initial migration SQL`,
  },
] as const;
