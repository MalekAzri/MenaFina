import Link from 'next/link';
import { FaChalkboardUser, FaUserGraduate, FaUserPlus } from 'react-icons/fa6';

export default function HeroSection() {
    return (
        <section id="hero-section" className="min-h-[700px] flex items-center justify-center bg-gradient-to-br from-dark-primary via-dark-secondary to-dark-primary relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-600/10 pointer-events-none"></div>
            <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
                <div className="mb-8">
                    <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent leading-tight">
                        Welcome to MenaFina
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                        Your comprehensive platform for financial education, connecting students and professors in an innovative learning ecosystem.
                    </p>
                </div>

                <div id="auth-buttons" className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
                    <Link href="/login" className="group relative bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl w-64 flex items-center justify-center">
                        <FaChalkboardUser className="mr-3" />
                        Get Started
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity"></div>
                    </Link>
                    <Link href="/register" className="group relative bg-dark-secondary border border-dark-border hover:border-purple-500 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg w-64 flex items-center justify-center">
                        <FaUserPlus className="mr-3 text-purple-400" />
                        Register
                    </Link>
                </div>
            </div>
        </section>
    );
}
