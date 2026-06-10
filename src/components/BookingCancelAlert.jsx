"use client";

import { authClient } from "@/lib/auth-client";
import { TrashBin } from "@gravity-ui/icons";
import { AlertDialog, Button } from "@heroui/react";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";

export function BookingCancelAlert({ bookingId }) {
    const handleCancelBooking = async () => {

        const res = await fetch(`http://localhost:5000/bookings/${bookingId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const data = await res.json();
        console.log(data);
        if (res.ok) {
            redirect('/my-bookings');
            toast.success('Booking cancelled successfully!');
            // Optionally, you can trigger a refresh or update the UI to reflect the cancellation
        } else {
            toast.error(`Failed to cancel booking: ${data.message}`);
        }
    }
    return (
        <AlertDialog>
            <Button
                type="button"
                className="flex items-center gap-1.5 px-4 py-2 border border-rose-200 bg-white hover:bg-rose-50 text-rose-500 text-sm font-semibold rounded-md transition-colors h-auto min-w-0"
            >
                <TrashBin className="text-base" /> Cancel
            </Button>
            <AlertDialog.Backdrop>
                <AlertDialog.Container>
                    <AlertDialog.Dialog className="sm:max-w-[400px]">
                        <AlertDialog.CloseTrigger />
                        <AlertDialog.Header>
                            <AlertDialog.Icon status="danger" />
                            <AlertDialog.Heading>Cancel Tour Booking?</AlertDialog.Heading>
                        </AlertDialog.Header>
                        <AlertDialog.Body>
                            <p>
                                Are you sure you want to cancel this booking? This action will remove your reserved slot for this trip.
                            </p>
                        </AlertDialog.Body>
                        <AlertDialog.Footer>
                            <Button slot="close" variant="tertiary">
                                Keep Booking
                            </Button>
                            <Button onClick={handleCancelBooking} slot="close" variant="danger">
                                Yes, Cancel Tour
                            </Button>
                        </AlertDialog.Footer>
                    </AlertDialog.Dialog>
                </AlertDialog.Container>
            </AlertDialog.Backdrop>
        </AlertDialog>
    );
}