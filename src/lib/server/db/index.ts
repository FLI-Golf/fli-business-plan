import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';

// ✅ Make sure Drizzle is using the correct database path
const databasePath = 'backend/pb_data/data.db';
console.log(`✅ DEBUG: Connecting to SQLite Database at: ${databasePath}`);

const client = new Database(databasePath);
export const db = drizzle(client);
