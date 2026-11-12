'use server';

import { auth } from "@/lib/better-auth/auth";
import { inngest } from "@/lib/inngest/client";
import { headers, cookies } from "next/headers";

export const signUpWithEmail = async ({ email, password, fullName, country, investmentGoals, riskTolerance, preferredIndustry }: SignUpFormData) => {
    try {
        const response = await auth.api.signUpEmail({ body: { email, password, name: fullName } });

        if(response) {
            try {
                await inngest.send({
                    name: 'app/user.created',
                    data: { email, name: fullName, country, investmentGoals, riskTolerance, preferredIndustry }
                });
            } catch (inngestErr) {
                console.warn('[Inngest] Background user.created event skipped:', inngestErr);
            }
        }

        return { success: true, data: response };
    } catch (e) {
        console.log('Sign up failed', e);
        return { success: false, error: e instanceof Error ? e.message : 'Sign up failed' };
    }
}

export const signInWithEmail = async ({ email, password }: SignInFormData) => {
    try {
        const response = await auth.api.signInEmail({ body: { email, password } });

        return { success: true, data: response };
    } catch (e) {
        console.log('Sign in failed', e);
        return { success: false, error: e instanceof Error ? e.message : 'Sign in failed' };
    }
}

export const signInAsDemoUser = async () => {
    try {
        const cookieStore = await cookies();
        cookieStore.set('demo_session', 'true', {
            path: '/',
            maxAge: 60 * 60 * 24 * 7,
            httpOnly: true,
            sameSite: 'lax',
        });
        return { success: true };
    } catch (e) {
        console.log('Demo sign in failed', e);
        return { success: false, error: 'Demo sign in failed' };
    }
}

export const signOut = async () => {
    try {
        await auth.api.signOut({ headers: await headers() });
        const cookieStore = await cookies();
        cookieStore.delete('demo_session');
        return { success: true };
    } catch (e) {
        console.log('Sign out failed', e);
        const cookieStore = await cookies();
        cookieStore.delete('demo_session');
        return { success: true };
    }
}
