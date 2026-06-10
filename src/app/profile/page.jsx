'use client';

import { authClient } from '@/lib/auth-client';
import { Button, Card, FieldError, Form, Input, Label, TextField } from '@heroui/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { LuUser, LuMail, LuImage, LuSave } from 'react-icons/lu';

const ProfilePage = () => {
    const router = useRouter();
    const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);

    // Better-Auth থেকে লগইন থাকা ইউজারের ডাটা নেওয়া হচ্ছে
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;

    if (isPending) {
        return (
            <div className="min-h-[70vh] flex items-center justify-center">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-cyan-500"></div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4">
                <p className="text-gray-600 font-medium">Please log in to view your profile.</p>
                <Button onClick={() => router.push('/login')} className="bg-cyan-500 text-white font-bold rounded-xl">
                    Go to Login
                </Button>
            </div>
        );
    }

    // প্রোফাইল ইনফরমেশন আপডেট হ্যান্ডলার
    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setIsUpdatingProfile(true);

        const formData = new FormData(e.currentTarget);
        const updatedData = Object.fromEntries(formData.entries());

        try {
            const { data, error } = await authClient.updateUser({
                name: updatedData.name,
                image: updatedData.image
            });

            if (data) {
                toast.success('Profile updated successfully!');
                router.push('/');
                router.refresh();
            }
            if (error) {
                toast.error(error.message || 'Failed to update profile');
            }
        } catch (err) {
            console.error(err);
            toast.error('Something went wrong!');
        } finally {
            setIsUpdatingProfile(false);
        }
    };

    return (
        <div className="max-w-xl mx-auto px-4 py-10 min-h-[80vh]">

            <Card className="p-6 bg-white rounded-2xl shadow-xl border border-slate-100">
                <div className="mb-6 text-center">
                    <h2 className="text-2xl font-bold text-slate-800">Account Settings</h2>
                    <p className="text-sm text-slate-500 mt-1">Update your profile name and image URL</p>
                </div>

                <Form onSubmit={handleUpdateProfile} className="space-y-5">
                    {/* ফুল নেম ইনপুট */}
                    <TextField name="name" isRequired defaultValue={user?.name}>
                        <Label className="text-slate-700 font-semibold text-sm flex items-center gap-1.5 mb-1">
                            <LuUser className="text-cyan-500" /> Full Name
                        </Label>
                        <Input placeholder="Enter your full name" className="rounded-xl" />
                        <FieldError className="text-xs text-red-500 mt-1" />
                    </TextField>

                    {/* ইমেইল ইনপুট (লকড) */}
                    <TextField isDisabled defaultValue={user?.email}>
                        <Label className="text-slate-400 font-semibold text-sm flex items-center gap-1.5 mb-1">
                            <LuMail className="text-slate-400" /> Email Address
                        </Label>
                        <Input className="rounded-xl bg-slate-50 text-slate-400 cursor-not-allowed" />
                    </TextField>

                    {/* প্রোফাইল ইমেজ ইউআরএল */}
                    <TextField name="image" defaultValue={user?.image}>
                        <Label className="text-slate-700 font-semibold text-sm flex items-center gap-1.5 mb-1">
                            <LuImage className="text-cyan-500" /> Profile Image URL
                        </Label>
                        <Input placeholder="https://example.com/avatar.jpg" className="rounded-xl" />
                        <FieldError className="text-xs text-red-500 mt-1" />
                    </TextField>

                    {/* প্রোফাইল সেভ বাটন */}
                    <div className="pt-2">
                        <Button
                            type="submit"
                            isLoading={isUpdatingProfile}
                            className='w-full font-bold py-3.5 rounded-xl text-white bg-cyan-500 hover:bg-cyan-600 transition-all cursor-pointer shadow-md shadow-cyan-100 flex items-center justify-center gap-2'
                        >
                            {!isUpdatingProfile && <LuSave className="text-lg" />}
                            {isUpdatingProfile ? 'Saving Info...' : 'Save Changes'}
                        </Button>
                    </div>
                </Form>
            </Card>

        </div>
    );
};

export default ProfilePage;