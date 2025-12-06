'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { FaGraduationCap, FaCircleQuestion, FaGear, FaRobot, FaChartLine, FaUsers, FaCircleUser, FaBell, FaArrowRightFromBracket } from 'react-icons/fa6';

export default function Header() {
    const { data: session } = useSession();

    return (
        <header id="header" className="bg-dark-secondary border-b border-dark-border sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 py-4">
                <nav className="flex items-center justify-between">
                    <div className="flex items-center space-x-8">
                        <Link href={session ? "/home" : "/"} className="flex items-center space-x-2">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                <FaGraduationCap className="text-white text-lg" />
                            </div>
                            <h1 className="text-2xl font-bold text-white">MenaFina</h1>
                        </Link>
                        {session && (
                            <div className="hidden md:flex items-center space-x-6">
                                <Link href="/chatbot" className="text-gray-400 hover:text-white transition-colors text-sm font-medium flex items-center">
                                    <FaRobot className="mr-2" />Chatbot
                                </Link>
                                <Link href="/simulator" className="text-gray-400 hover:text-white transition-colors text-sm font-medium flex items-center">
                                    <FaChartLine className="mr-2" />Simulator
                                </Link>
                                <Link href="/prof-student-space" className="text-gray-400 hover:text-white transition-colors text-sm font-medium flex items-center">
                                    <FaUsers className="mr-2" />Prof-Student Space
                                </Link>
                                <Link href="/account" className="text-gray-400 hover:text-white transition-colors text-sm font-medium flex items-center">
                                    <FaCircleUser className="mr-2" />My Account
                                </Link>
                            </div>
                        )}
                    </div>

                    <div className="flex items-center space-x-4">
                        {session ? (
                            <>
                                <button className="text-gray-400 hover:text-white transition-colors">
                                    <FaBell className="text-lg" />
                                </button>
                                <button className="text-gray-400 hover:text-white transition-colors">
                                    <FaGear className="text-lg" />
                                </button>
                                <div className="flex items-center space-x-3 pl-4 border-l border-gray-700">
                                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-blue-500 bg-gray-600">
                                        {session.user?.image ? (
                                            <img src={session.user.image} alt="User" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-xs">User</div>
                                        )}
                                    </div>
                                    <button
                                        onClick={() => signOut({ callbackUrl: '/' })}
                                        className="text-gray-400 hover:text-red-400 transition-colors"
                                        title="Sign Out"
                                    >
                                        <FaArrowRightFromBracket className="text-lg" />
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <Link href="/login" className="text-white bg-transparent border border-gray-600 hover:border-blue-500 px-4 py-2 rounded-lg text-sm font-medium transition-all">
                                    Sign In
                                </Link>
                                <Link href="/register" className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-lg hover:shadow-blue-500/20">
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>
                </nav>
            </div>
        </header>
    );
}
