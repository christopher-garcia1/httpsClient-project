import { pgTable, timestamp, varchar, uuid, } from "drizzle-orm/pg-core";


export type NewUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect
export type NewChirp = typeof chirps.$inferInsert
export type NewRefreshToken = typeof refreshTokens.$inferInsert

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  createdAt: timestamp("created_at", {withTimezone: true}).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", {withTimezone: true})
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  email: varchar("email", { length: 256 }).unique().notNull(),
  hashedPassword: varchar("hashed_password").notNull().default("unset")
});


export const chirps = pgTable("chirps", {
  id: uuid("id").primaryKey().defaultRandom(),
  createdAt: timestamp("created_at", {withTimezone: true}).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", {withTimezone: true}).notNull().defaultNow().$onUpdate(() => new Date()),
  body: varchar("body", {length: 140}).notNull(),
  userId: uuid("user_id").notNull().references(()=> users.id, {onDelete: "cascade"})
  
});


export const refreshTokens = pgTable("refresh_tokens", {
  token: varchar("token").primaryKey().notNull(),
  createdAt: timestamp("created_at", {withTimezone: true}).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', {withTimezone: true}).notNull().defaultNow().$onUpdate(() => new Date()),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  expiresAt: timestamp("expires_at", {withTimezone: true}).notNull(),
  revokedAt: timestamp("revoked_at", {withTimezone: true})
})