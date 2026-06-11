"use client";

import { authClient } from "@/lib/auth-client";
import { TrashBin } from "@gravity-ui/icons";
import { AlertDialog, Button } from "@heroui/react";
import { redirect, useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { LuTrash2 } from "react-icons/lu";

export function DeleteCard({ carData }) {
    const router = useRouter();

    const handleDelete = async () => {
        try {
            const { data: tokenData } = await authClient.token()

            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/addcar/${carData?._id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${tokenData.token}`
                }
            });
            if (res.ok) {
                toast.success('Car deleted successfully!');
                router.push('/All-Car');
                router.refresh();
            } else {
                toast.error('Failed to delete the car.');
            }

        } catch (error) {
            console.error("Delete Error:", error);
            toast.error('Something went wrong!');
        }
    }


    return (
        <AlertDialog>
            <AlertDialog.Trigger className="group flex items-center gap-3 rounded-2xl bg-surface p-4 shadow-xs select-none hover:bg-surface-secondary">
                <button className="flex items-center gap-1.5 bg-red-500 text-white font-bold py-2 px-4 rounded-xl hover:bg-red-600 transition-colors shadow-sm cursor-pointer">
                    <LuTrash2 className="text-sm" /> Delete
                </button>
            </AlertDialog.Trigger>
            <AlertDialog.Backdrop>
                <AlertDialog.Container>
                    <AlertDialog.Dialog className="sm:max-w-[400px]">
                        <AlertDialog.CloseTrigger />
                        <AlertDialog.Header>
                            <AlertDialog.Icon status="danger">
                                <TrashBin className="size-5" />
                            </AlertDialog.Icon>
                            <AlertDialog.Heading>Delete {carData?.carName} permenantly?</AlertDialog.Heading>
                        </AlertDialog.Header>
                        <AlertDialog.Body>
                            <p>
                                Warning: You are about to remove <strong> {carData?.carName} </strong>from the DriveFleet database permanently. You will lose all pricing, features, and booking configurations for this car. Proceed anyway?
                            </p>
                        </AlertDialog.Body>
                        <AlertDialog.Footer>
                            <Button slot="close" variant="tertiary">
                                Cancel
                            </Button>
                            <Button onClick={handleDelete} slot="close" variant="danger">
                                Delete Item
                            </Button>
                        </AlertDialog.Footer>
                    </AlertDialog.Dialog>
                </AlertDialog.Container>
            </AlertDialog.Backdrop>
        </AlertDialog>
    );
}