"use client";

import { authClient } from "@/lib/auth-client";
import { TrashBin } from "@gravity-ui/icons";
import { AlertDialog, Button } from "@heroui/react";
import { redirect } from "next/navigation";

import { LuTrash2 } from "react-icons/lu";

export function DeleteCard({ destination }) {

    const handleDelete = async () => {
        const { data: tokenData } = await authClient.token();
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/destination/${destination._id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${tokenData?.token || ''}`
            }
        });
        const data = await res.json();
        redirect('/destinations');
        console.log('Updated Destination:', data);
        // toast.success('Destination added successfully!');
    }

    return (
        <AlertDialog>
            <AlertDialog.Trigger className="group flex items-center gap-3 rounded-2xl bg-surface p-4 shadow-xs select-none hover:bg-surface-secondary">
                <button className="flex items-center gap-1.5 px-4 py-2 border border-red-200 text-red-500 rounded-md hover:bg-red-50 transition">
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
                            <AlertDialog.Heading>Delete {destination.destinationName} permenantly?</AlertDialog.Heading>
                        </AlertDialog.Header>
                        <AlertDialog.Body>
                            <p>
                                This will delete the destination <strong>{destination.destinationName}</strong> and all of its data permanently. This action cannot be undone. Are you sure you want to proceed?
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