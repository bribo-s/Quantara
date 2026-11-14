import Header from "@/components/Header";
import {auth} from "@/lib/better-auth/auth";
import {headers, cookies} from "next/headers";
import {redirect} from "next/navigation";

const Layout = async ({ children }: { children : React.ReactNode }) => {
    const headerList = await headers();
    const cookieStore = await cookies();
    const isDemo = cookieStore.get('demo_session')?.value === 'true';

    let user: User | null = null;

    try {
        const session = await auth.api.getSession({ headers: headerList });
        if (session?.user) {
            user = {
                id: session.user.id,
                name: session.user.name,
                email: session.user.email,
            };
        }
    } catch (e) {
        console.warn('Session check fallback:', e);
    }

    if (!user) {
        // If demo session cookie exists or in development, allow demo user
        if (isDemo || process.env.NODE_ENV === 'development') {
            user = {
                id: 'demo-investor',
                name: 'Alex Morgan (Demo)',
                email: 'demo@quantara.app',
            };
        } else {
            redirect('/sign-in');
        }
    }

    return (
        <main className="min-h-screen text-gray-400">
            <Header user={user} />

            <div className="container py-10">
                {children}
            </div>
        </main>
    )
}
export default Layout
