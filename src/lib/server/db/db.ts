import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';

// ✅ Force Drizzle to use the correct SQLite file
const sqlite = new Database('/workspace/fli-business-plan/backend/pb_data/data.db', { fileMustExist: true });
export const db = drizzle(sqlite);
