'use client';

import { useSession } from 'next-auth/react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StudentAccount from '@/components/StudentAccount';
import ProfessorAccount from '@/components/ProfessorAccount';

export default function AccountPage() {
    const { data: session } = useSession();

    return (
        <div className="bg-dark-primary text-white font-inter min-h-screen flex flex-col">
            <Header />
            {session?.user?.role === 'professor' ? <ProfessorAccount /> : <StudentAccount />}
            <Footer />
        </div>
    );
}
