import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    fullname: varchar("full_name", {length: 50}).notNull(),
    email: varchar("email", {length: 50}).notNull(),
    password: varchar("password").notNull()
})