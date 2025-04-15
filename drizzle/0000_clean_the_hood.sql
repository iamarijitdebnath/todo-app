CREATE TYPE "public"."todo_status" AS ENUM('completed', 'progress', 'start');--> statement-breakpoint
CREATE TABLE "todos" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"status" "todo_status" DEFAULT 'start' NOT NULL
);
