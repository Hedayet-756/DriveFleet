'use client';
import { authClient } from '@/lib/auth-client';
import { Button, FieldError, Input, Label, TextArea, TextField, Select, ListBox } from '@heroui/react';
import { redirect, useRouter } from 'next/navigation';
import React from 'react';
import toast from 'react-hot-toast';

const AddCarPage = () => {
    const router = useRouter();

    const onsubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const Cars = Object.fromEntries(formData.entries());
        console.log('New Car:', Cars);

        try {

            const { data: tokenData } = await authClient.token()
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/addcar`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${tokenData.token}`
                },
                body: JSON.stringify(Cars)
            });

            if (res.ok) {
                toast.success('Car Added successfully!');

                router.push('/All-Car');
                router.refresh();
            } else {
                toast.error('Failed to Add the car.');
            }
        } catch (error) {
            console.error("Delete Error:", error);
            toast.error('Something went wrong!');
        }
    }
    return (
        <div className="mx-auto p-5 max-w-7xl">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Add a New Car Listing</h1>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 max-w-3xl overflow-hidden">
                <div className="bg-cyan-500 py-4 px-10">
                    <p className="text-white font-medium">Please fill in the car details below</p>
                </div>

                <form className="p-10 space-y-6" onSubmit={onsubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        <div className="md:col-span-2">
                            <TextField name="carName" isRequired>
                                <Label className="text-gray-700 font-semibold">Car Name</Label>
                                <Input placeholder="e.g. Toyota Camry 2024" className="rounded-xl" />
                                <FieldError />
                            </TextField>
                        </div>

                        <TextField name="dailyPrice" type="number" isRequired>
                            <Label className="text-gray-700 font-semibold">Daily Rent Price (USD)</Label>
                            <Input
                                type="number"
                                placeholder="50"
                                className="rounded-xl"
                            />
                            <FieldError />
                        </TextField>

                        <div>
                            <Select
                                name="carType"
                                isRequired
                                className="w-full"
                                placeholder="Select car type"
                            >
                                <Label className="text-gray-700 font-semibold">Car Type</Label>
                                <Select.Trigger className="rounded-xl">
                                    <Select.Value />
                                    <Select.Indicator />
                                </Select.Trigger>
                                <Select.Popover>
                                    <ListBox>
                                        <ListBox.Item id="Sedan">Sedan</ListBox.Item>
                                        <ListBox.Item id="SUV">SUV</ListBox.Item>
                                        <ListBox.Item id="Hatchback">Hatchback</ListBox.Item>
                                        <ListBox.Item id="Luxury">Luxury</ListBox.Item>
                                        <ListBox.Item id="Hybrid">Hybrid / EV</ListBox.Item>
                                    </ListBox>
                                </Select.Popover>
                            </Select>
                        </div>

                        <TextField name="seatCapacity" type="number" isRequired>
                            <Label className="text-gray-700 font-semibold">Seat Capacity</Label>
                            <Input type="number" placeholder="4 or 7" className="rounded-xl" />
                            <FieldError />
                        </TextField>

                        <div>
                            <Select
                                name="availability"
                                isRequired
                                className="w-full"
                                placeholder="Status"
                                defaultValue="Available"
                            >
                                <Label className="text-gray-700 font-semibold">Availability Status</Label>
                                <Select.Trigger className="rounded-xl">
                                    <Select.Value />
                                    <Select.Indicator />
                                </Select.Trigger>
                                <Select.Popover>
                                    <ListBox>
                                        <ListBox.Item id="Available">Available</ListBox.Item>
                                        <ListBox.Item id="Booked">Booked</ListBox.Item>
                                        <ListBox.Item id="Maintenance">Maintenance</ListBox.Item>
                                    </ListBox>
                                </Select.Popover>
                            </Select>
                        </div>

                        <div className="md:col-span-2">
                            <TextField name="pickupLocation" isRequired>
                                <Label className="text-gray-700 font-semibold">Pickup Location</Label>
                                <Input placeholder="Airport, City Center, or Specific Address" className="rounded-xl" />
                                <FieldError />
                            </TextField>
                        </div>

                        <div className="md:col-span-2">
                            <TextField name="imageUrl" isRequired>
                                <Label className="text-gray-700 font-semibold">Image URL (imgbb/postimage)</Label>
                                <Input
                                    type="url"
                                    placeholder="https://i.ibb.co/your-image-link.jpg"
                                    className="rounded-xl"
                                />
                                <FieldError />
                            </TextField>
                        </div>

                        <div className="md:col-span-2">
                            <TextField name="description" isRequired>
                                <Label className="text-gray-700 font-semibold">Description</Label>
                                <TextArea
                                    placeholder="Tell us about the car's condition, features (AC, Bluetooth, Autopilot), etc."
                                    className="rounded-2xl min-h-[100px]"
                                />
                                <FieldError />
                            </TextField>
                        </div>
                    </div>

                    <div className="pt-4">
                        <Button

                            type="submit"
                            className="w-full bg-cyan-500 text-white font-bold py-6 rounded-xl hover:bg-cyan-600 shadow-lg shadow-cyan-200 transition-all active:scale-95 cursor-pointer"
                        >
                            Submit Car Listing
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddCarPage;