'use client';

import { authClient } from '@/lib/auth-client';
import { Check } from '@gravity-ui/icons';
import { Button, Card, Description, FieldError, Form, Input, Label, TextField } from '@heroui/react';
import { redirect } from 'next/navigation';
import React from 'react';
import toast from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';

const LoginPage = () => {

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const user = Object.fromEntries(formData.entries());

        const { data, error } = await authClient.signIn.email({
            email: user.email,
            password: user.password
        });
        // console.log('Login Response:', { data, error });

        if (data) {
            toast.success('Login successful!');
            redirect('/');
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
                <h1 className='text-2xl font-bold'>Login</h1>
            </div>
            <Card>
                <Form onSubmit={onSubmit} className="flex w-96 flex-col gap-4">
                    <TextField
                        isRequired
                        name="email"
                        type="email"
                        validate={(value) => {
                            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                                return "Please enter a valid email address";
                            }

                            return null;
                        }}
                    >
                        <Label>Email</Label>
                        <Input placeholder="john@example.com" />
                        <FieldError />
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
                            Login
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
                </div>
            </Card>
        </div>
    );
};

export default LoginPage;
