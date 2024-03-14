"use client";
import React from "react";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";

export default function SignoutButton({ }: { type?: string }) {
    const handleSignOut = async () => {
        await signOut({
            callbackUrl: "/login",
            redirect: true,
        });
        localStorage.removeItem('token');
        toast.success("User signed out");
    };

    return (
        <div>
            <button
                className="signout p-2 text-white rounded-md"
                onClick={handleSignOut}
            >
                Sign Out
            </button>
        </div>
    );
}