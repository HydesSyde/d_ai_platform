import {type InferSelectModel } from "drizzle-orm";
import { users } from "../schema/users.js";

export type User = InferSelectModel<typeof users>;