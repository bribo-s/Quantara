'use client';

import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import InputField from '@/components/forms/InputField';
import FooterLink from '@/components/forms/FooterLink';
import {signInWithEmail, signUpWithEmail} from "@/lib/actions/auth.actions";
import {toast} from "sonner";
import {signInEmail} from "better-auth/api";
import {useRouter} from "next/navigation";

const SignIn = () => {
    const router = useRouter()
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SignInFormData>({
        defaultValues: {
            email: '',
            password: '',
        },
        mode: 'onBlur',
    });

    const onSubmit = async (data: SignInFormData) => {
        try {
            const result = await signInWithEmail(data);
            if(result.success) router.push('/');
        } catch (e) {
            console.error(e);
            toast.error('Sign in failed', {
                description: e instanceof Error ? e.message : 'Failed to sign in.'
            })
        }
    }

    return (
        <>
            <h1 className="form-title">Welcome back</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <InputField
                    name="email"
                    label="Email"
                    placeholder="contact@jsmastery.com"
                    register={register}
                    error={errors.email}
                    validation={{ required: 'Email is required', pattern: /^\w+@\w+\.\w+$/ }}
                />

                <InputField
                    name="password"
                    label="Password"
                    placeholder="Enter your password"
                    type="password"
                    register={register}
                    error={errors.password}
                    validation={{ required: 'Password is required', minLength: 8 }}
                />

                <Button type="submit" disabled={isSubmitting} className="yellow-btn w-full mt-5">
                    {isSubmitting ? 'Signing In' : 'Sign In'}
                </Button>

                <div className="relative my-4 flex items-center justify-center">
                    <div className="border-t border-gray-800 w-full" />
                    <span className="bg-[#0e131f] px-3 text-xs text-gray-400 uppercase font-semibold">Or</span>
                    <div className="border-t border-gray-800 w-full" />
                </div>

                <Button
                    type="button"
                    onClick={async () => {
                        const { signInAsDemoUser } = await import('@/lib/actions/auth.actions');
                        await signInAsDemoUser();
                        toast.success('Signed in as Demo Investor (Recruiter Mode)');
                        router.push('/');
                    }}
                    className="w-full bg-gray-800/90 hover:bg-gray-700 text-yellow-400 border border-yellow-500/30 font-bold py-2 rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-md"
                >
                    <span>⚡ Instant Demo Access (Recruiter Mode)</span>
                </Button>

                <FooterLink text="Don't have an account?" linkText="Create an account" href="/sign-up" />
            </form>
        </>
    );
};
export default SignIn;
