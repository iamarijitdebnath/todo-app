import { pgTable, serial, text, timestamp, pgEnum } from 'drizzle-orm/pg-core';

export const todoStatusEnum = pgEnum('todo_status', ['completed', 'progress', 'start']);

export const todos = pgTable('todos', {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    description: text('description'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    status: todoStatusEnum('status').default('start').notNull(),
});
