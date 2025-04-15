import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';

let db: ReturnType<typeof drizzle> | null = null;

export const getDb = async () => {
    if (!db) {
        console.log('🆕 Creating new Drizzle + Neon connection...');
        const sql = await neon(process.env.DATABASE_URL!);
        db = await drizzle(sql);
    } else {
        console.log('✅ Reusing existing Drizzle + Neon connection.');
    }

    return db;
};