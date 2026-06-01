import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    fullname: varchar("full_name", {length: 50}).notNull(),
    email: varchar("email", {length: 50}).notNull(),
    password: varchar("password").notNull(),
    role: text("role").default("user"),
    token: text("token").default("")
})