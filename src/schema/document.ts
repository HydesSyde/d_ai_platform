import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { users } from "./users.js";

export const documents = pgTable("documents", {
    id: serial("id").primaryKey(),
    userId: integer("user_id").references(()=> users.id).notNull(),
    title: text("text").default(""),
    originalFileName: text("original_file_name").default(""),
    content: text("content").notNull(),
    mimeType: text("mime_type").default(""),
    sizeByte: integer("size_byte").default(0),
    storageKey: text("storage_key").default(""),
    status: text("status").default("pending"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow()
});