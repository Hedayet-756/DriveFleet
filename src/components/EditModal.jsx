"use client";

import { authClient } from "@/lib/auth-client";
import { Button, FieldError, Input, Label, Modal, Surface, TextField, Select, ListBox, TextArea } from "@heroui/react";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { BiEdit } from "react-icons/bi";

export function EditModal({ carData }) {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    const {
        _id,
        carName = 'Toyota Camry 2024',
        dailyPrice = 50,
        carType = 'Sedan',
        imageUrl = 'https://cdn.pixabay.com/photo/2020/03/24/20/53/norway-4965490_1280.jpg',
        seatCapacity = 5,
        pickupLocation = 'Dhaka, Bangladesh',
        availability = 'Available',
        description = 'Experience premier luxury, ultimate comfort, and top-tier fuel efficiency. Perfect for corporate travels, weddings, and family weekend getaways.'
    } = carData;

    const onsubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const Cars = Object.fromEntries(formData.entries());
        console.log('New Car:', Cars);
        try {

            const { data: tokenData } = await authClient.token()
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/addcar/${_id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${tokenData.token}`
                },
                body: JSON.stringify(Cars)
            });

            if (res.ok) {
                // ১. প্রথমে টোস্ট মেসেজটি দেখান
                toast.success('Car Edited successfully!');

                // ২. তারপর অল-কার পেজে রিডাইরেক্ট করুন
                router.push('/All-Car');
                // ৩. ডেটা রিফ্রেশ করার জন্য (অপশনাল কিন্তু কার্যকরী)
                router.refresh();
            } else {
                toast.error('Failed to Edit the car.');
            }

        } catch (error) {
            console.error("Edit Error:", error);
            toast.error('Something went wrong!');
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <Modal.Trigger>
                <Button onClick={() => setIsOpen(true)} className=" flex items-center gap-1.5 py-2 px-4 bg-amber-500 text-white font-bold py-2 px-4 rounded-xl hover:bg-amber-600 transition-colors shadow-sm cursor-pointer">
                    <BiEdit />   Edit Car
                </Button>
            </Modal.Trigger>
            <Modal.Backdrop>
                <Modal.Container placement="auto">
                    <Modal.Dialog className="sm:max-w-md overflow-y-auto flex flex-col custom-scrollbar">
                        <Modal.CloseTrigger onClick={() => setIsOpen(false)} />
                        <Modal.Header>
                            <Modal.Heading>Edit Car Details</Modal.Heading>
                        </Modal.Header>
                        <Modal.Body className="p-4">
                            <Surface variant="default">
                                <form className="space-y-6" onSubmit={onsubmit}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="md:col-span-2">
                                            <TextField name="carName" isRequired defaultValue={carName}>
                                                <Label className="text-gray-700 font-semibold">Car Name</Label>
                                                <Input placeholder="e.g. Toyota Camry 2024" className="rounded-xl" />
                                                <FieldError />
                                            </TextField>
                                        </div>
                                        <TextField name="dailyPrice" type="number" isRequired defaultValue={dailyPrice?.toString()}>
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
                                                defaultSelectedKeys={[carType]}
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
                                        <TextField name="seatCapacity" type="number" isRequired defaultValue={seatCapacity?.toString()}>
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
                                                defaultSelectedKeys={[availability]}
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
                                            <TextField name="pickupLocation" isRequired defaultValue={pickupLocation}>
                                                <Label className="text-gray-700 font-semibold">Pickup Location</Label>
                                                <Input placeholder="Airport, City Center, or Specific Address" className="rounded-xl" />
                                                <FieldError />
                                            </TextField>
                                        </div>

                                        <div className="md:col-span-2">
                                            <TextField name="imageUrl" isRequired defaultValue={imageUrl}>
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
                                            <TextField name="description" isRequired defaultValue={description}>
                                                <Label className="text-gray-700 font-semibold">Description</Label>
                                                <TextArea
                                                    placeholder="Tell us about the car's condition, features..."
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
                                            Update Listing Car
                                        </Button>
                                    </div>
                                </form>
                            </Surface>
                        </Modal.Body>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}