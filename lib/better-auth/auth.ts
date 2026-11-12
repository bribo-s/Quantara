import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { memoryAdapter } from "better-auth/adapters/memory";
import { connectToDatabase } from "@/database/mongoose";
import { nextCookies } from "better-auth/next-js";

let authInstance: ReturnType<typeof betterAuth> | null = null;

export const getAuth = async () => {
    if(authInstance) return authInstance;

    const secret = process.env.BETTER_AUTH_SECRET || "signalist_demo_super_secret_key_1234567890";
    const baseURL = process.env.BETTER_AUTH_URL || "http://localhost:3000";

    const mongoose = await connectToDatabase();
    const db = mongoose?.connection?.db;

    if(db) {
        authInstance = betterAuth({
            database: mongodbAdapter(db as any),
            secret,
            baseURL,
            emailAndPassword: {
                enabled: true,
                disableSignUp: false,
                requireEmailVerification: false,
                minPasswordLength: 8,
                maxPasswordLength: 128,
                autoSignIn: true,
            },
            plugins: [nextCookies()],
        });

        return authInstance;
    }

    // Demo/Recruiter fallback in-memory store
    const memoryDb: Record<string, any[]> = (global as any).__betterAuthMemoryDb || {
        user: [
            {
                id: 'demo-investor',
                name: 'Alex Morgan (Demo)',
                email: 'demo@signalist.app',
                emailVerified: true,
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        ],
        session: [],
        account: [],
        verification: [],
    };
    (global as any).__betterAuthMemoryDb = memoryDb;

    authInstance = betterAuth({
        database: memoryAdapter(memoryDb),
        secret,
        baseURL,
        emailAndPassword: {
            enabled: true,
            disableSignUp: false,
            requireEmailVerification: false,
            minPasswordLength: 8,
            maxPasswordLength: 128,
            autoSignIn: true,
        },
        plugins: [nextCookies()],
    });

    return authInstance;
}

export const auth = await getAuth();
