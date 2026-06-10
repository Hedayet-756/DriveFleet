'use client';

import { authClient } from '@/lib/auth-client';
import { Button, Card, Description, FieldError, Form, Input, Label, Separator, TextField } from '@heroui/react';
import { useRouter } from 'next/navigation';
import React from 'react';
import toast from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';

const SignUpPage = () => {
    const router = useRouter();
    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const user = Object.fromEntries(formData.entries());
        console.log('New User:', user);

        if (!user.name) {
            toast.error("Name field is required!");
            return;
        }

        const { data, error } = await authClient.signUp.email({
            email: user.email,
            password: user.password,
            name: user.name,          // এখন এটি সঠিকভাবে ভ্যালু পাবে
            image: user.image || ""   // ইমেজ না থাকলে খালি স্ট্রিং পাস হবে
        });
        console.log('SignUp:', data, error);
        if (data) {
            toast.success('Account created successfully!');
            // 🎯 ৩. redirect('/') এর বদলে router.push('/') ব্যবহার করুন
            router.push('/');
            router.refresh(); // স্টেট আপডেট করার জন্য পেজটি রিফ্রেশ হবে
        }
        if (error) {
            toast.error(error.message);
        }
    };

    const handleGoogleSignUp = async () => {
        await authClient.signIn.social({
            provider: 'google'
        });
    };

    return (
        <div className='max-w-7xl mx-auto'>
            <div className="text-center my-4">
                <h1 className='text-2xl font-bold'>Create Account</h1>
            </div>
            <Card>
                <Form onSubmit={onSubmit} className="flex w-96 flex-col gap-4">
                    {/* 🎯 Name Field (name প্রোপার্টি Input-এ নেওয়া হয়েছে) */}
                    <TextField isRequired>
                        <Label className="text-slate-700 font-semibold text-sm">Full Name</Label>
                        <Input name="name" placeholder="John Doe" className="rounded-xl" />
                        <FieldError className="text-xs text-red-500 mt-1" />
                    </TextField>

                    <TextField
                        name="image"
                        type="url">
                        <Label>Image URL</Label>
                        <Input placeholder="Enter the URL of your image" />
                        <FieldError />
                    </TextField>

                    {/* 🎯 Email Field (name প্রোপার্টি Input-এ নেওয়া হয়েছে) */}
                    <TextField isRequired>
                        <Label className="text-slate-700 font-semibold text-sm">Email Address</Label>
                        <Input name="email" type="email" placeholder="your.email@example.com" className="rounded-xl" />
                        <FieldError className="text-xs text-red-500 mt-1" />
                    </TextField>

                    <TextField
                        isRequired
                        minLength={8}
                        name="password"
                        type="password"
                        validate={(value) => {
                            if (value.length < 8) {
                                return "Password must be at least 8 characters";
                            }
                            if (!/[A-Z]/.test(value)) {
                                return "Password must contain at least one uppercase letter";
                            }
                            if (!/[0-9]/.test(value)) {
                                return "Password must contain at least one number";
                            }

                            return null;
                        }}
                    >
                        <Label>Password</Label>
                        <Input placeholder="Enter your password" />
                        <Description>Must be at least 8 characters with 1 uppercase and 1 number</Description>
                        <FieldError />
                    </TextField>

                    <div className="flex justify-center items-center gap-2">
                        <Button type="submit" className='rounded-none w-full bg-cyan-600 hover:bg-cyan-700'>
                            Create Account
                        </Button>
                    </div>
                </Form>
                <div className="mt-6 flex flex-col gap-4">
                    <div className="relative flex py-2 items-center">
                        <div className="flex-grow border-t border-slate-200"></div>
                        <span className="flex-shrink mx-4 text-xs text-slate-400 font-normal">Or sign up with</span>
                        <div className="flex-grow border-t border-slate-200"></div>
                    </div>

                    <Button
                        onClick={handleGoogleSignUp}
                        className="w-full rounded-none bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium py-2 flex items-center justify-center gap-2 shadow-sm"
                    >
                        <FcGoogle />
                        Sign Up With Google
                    </Button>

                    {/* Redirect link */}
                    <div className="text-center text-sm text-slate-500 mt-2">
                        Already have an account?{' '}
                        <a href="/login" className="text-cyan-500 hover:underline font-semibold">
                            Sign In
                        </a>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default SignUpPage;
