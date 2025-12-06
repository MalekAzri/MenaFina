'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
    return (
        <div className="min-h-screen flex flex-col font-inter bg-dark-primary text-white">
            <Header />

            <main id="main-content" className="flex-grow">
                <section id="login-section" className="min-h-[800px] flex items-center justify-center bg-gradient-to-br from-dark-primary via-dark-secondary to-dark-primary relative overflow-hidden py-12">
                    {/* Background effects */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-600/10 pointer-events-none"></div>
                    <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>
                    <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none"></div>

                    <LoginForm />
                </section>
            </main>

            <Footer />
        </div>
    );
}
