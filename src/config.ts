import type { MigrationConfig } from "drizzle-orm/migrator";

const migrationConfig: MigrationConfig = {
    migrationsFolder: "./src/db/migrations"
}

type DBConfig = {
    url: string,
    migrationConfig: MigrationConfig
}

type JWTConfig = {
    secret: string
}

type Config = {
    api: APIConfig,
    db: DBConfig,
    jwt: JWTConfig
}

process.loadEnvFile()

function envOrThrow(key: string) {
    if (!process.env[key]) {
        throw new Error("Something went wrong")
    }
    return process.env[key]
} 

type APIConfig = {
    fileserverHits: number; 
    port: number;
    platform: string
}

export const config: Config = {
    api: {
        fileserverHits: 0,
        port: Number(envOrThrow("PORT")),
        platform: envOrThrow("PLATFORM")
    },
    db: {
        url: envOrThrow("DB_URL"),
        migrationConfig: migrationConfig
    },
    jwt: {
        secret:envOrThrow("JWT_SECRET")
    }
}