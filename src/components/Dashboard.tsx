'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import {
    FaGraduationCap,
    FaRobot,
    FaChartLine,
    FaUsers,
    FaCircleUser,
    FaBell,
    FaGear,
    FaMessage,
    FaClock,
    FaArrowRight,
    FaBuilding,
    FaTrophy,
    FaCalendarCheck,
    FaStar,
    FaChalkboardUser,
    FaBook
} from 'react-icons/fa6';

export default function Dashboard() {
    const { data: session } = useSession();

    return (
        <div className="bg-dark-primary text-white font-inter">
            <main id="main-dashboard">
                <section id="welcome-section" className="bg-gradient-to-r from-dark-primary via-dark-secondary to-dark-primary border-b border-dark-border">
                    <div className="max-w-7xl mx-auto px-6 py-12">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                            <div>
                                <h2 className="text-4xl font-bold text-white mb-2">Welcome Back, {session?.user?.name || 'Student'}!</h2>
                                <p className="text-xl text-gray-400">Ready to continue your financial learning journey?</p>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="bg-dark-secondary border border-dark-border rounded-xl px-6 py-4 text-center">
                                    <div className="text-2xl font-bold text-blue-400">12</div>
                                    <div className="text-sm text-gray-400">Active Courses</div>
                                </div>
                                <div className="bg-dark-secondary border border-dark-border rounded-xl px-6 py-4 text-center">
                                    <div className="text-2xl font-bold text-purple-400">4.8</div>
                                    <div className="text-sm text-gray-400">Avg Rating</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="main-features-grid" className="py-12">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Chatbot Card */}
                            <Link href="/chatbot" className="block">
                                <div id="chatbot-card" className="bg-dark-secondary rounded-2xl border border-dark-border hover:border-blue-500/50 transition-all duration-300 overflow-hidden group cursor-pointer h-full flex flex-col">
                                    <div className="p-8 flex-grow">
                                        <div className="flex items-start justify-between mb-6">
                                            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                                <FaRobot className="text-white text-3xl" />
                                            </div>
                                            <span className="bg-blue-500/20 text-blue-400 text-xs font-semibold px-3 py-1 rounded-full">AI Powered</span>
                                        </div>
                                        <h3 className="text-2xl font-bold text-white mb-3">Talk to Chatbot</h3>
                                        <p className="text-gray-400 mb-6 leading-relaxed">
                                            Get instant answers to your financial questions. Our AI assistant is trained on comprehensive financial knowledge and ready to help you 24/7.
                                        </p>
                                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                                            <div className="flex items-center space-x-2">
                                                <FaMessage />
                                                <span>1,234 Conversations</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <FaClock />
                                                <span>Available 24/7</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gradient-to-r from-blue-500/10 to-blue-600/10 px-8 py-4 border-t border-dark-border mt-auto">
                                        <div className="text-blue-400 font-semibold group-hover:text-blue-300 transition-colors flex items-center space-x-2">
                                            <span>Start Chatting</span>
                                            <FaArrowRight />
                                        </div>
                                    </div>
                                </div>
                            </Link>

                            {/* Simulator Card */}
                            <Link href="/simulator" className="block">
                                <div id="simulator-card" className="bg-dark-secondary rounded-2xl border border-dark-border hover:border-purple-500/50 transition-all duration-300 overflow-hidden group cursor-pointer h-full flex flex-col">
                                    <div className="p-8 flex-grow">
                                        <div className="flex items-start justify-between mb-6">
                                            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                                <FaChartLine className="text-white text-3xl" />
                                            </div>
                                            <span className="bg-purple-500/20 text-purple-400 text-xs font-semibold px-3 py-1 rounded-full">Simulation</span>
                                        </div>
                                        <h3 className="text-2xl font-bold text-white mb-3">Try Simulator</h3>
                                        <p className="text-gray-400 mb-6 leading-relaxed">
                                            Practice investment decisions in a risk-free environment. Analyze companies and receive AI-powered recommendations on whether to invest or not.
                                        </p>
                                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                                            <div className="flex items-center space-x-2">
                                                <FaBuilding />
                                                <span>500+ Companies</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <FaTrophy />
                                                <span>Learn by Doing</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gradient-to-r from-purple-500/10 to-purple-600/10 px-8 py-4 border-t border-dark-border mt-auto">
                                        <div className="text-purple-400 font-semibold group-hover:text-purple-300 transition-colors flex items-center space-x-2">
                                            <span>Launch Simulator</span>
                                            <FaArrowRight />
                                        </div>
                                    </div>
                                </div>
                            </Link>

                            {/* Account Card */}
                            <Link href="/account" className="block">
                                <div id="account-card" className="bg-dark-secondary rounded-2xl border border-dark-border hover:border-green-500/50 transition-all duration-300 overflow-hidden group cursor-pointer h-full flex flex-col">
                                    <div className="p-8 flex-grow">
                                        <div className="flex items-start justify-between mb-6">
                                            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                                <FaCircleUser className="text-white text-3xl" />
                                            </div>
                                            <span className="bg-green-500/20 text-green-400 text-xs font-semibold px-3 py-1 rounded-full">Personal</span>
                                        </div>
                                        <h3 className="text-2xl font-bold text-white mb-3">Check My Account</h3>
                                        <p className="text-gray-400 mb-6 leading-relaxed">
                                            Manage your profile settings, view your learning progress, and check your calendar for upcoming meetings with professors and scheduled sessions.
                                        </p>
                                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                                            <div className="flex items-center space-x-2">
                                                <FaCalendarCheck />
                                                <span>3 Upcoming Meets</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <FaStar />
                                                <span>Profile Complete</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gradient-to-r from-green-500/10 to-green-600/10 px-8 py-4 border-t border-dark-border mt-auto">
                                        <div className="text-green-400 font-semibold group-hover:text-green-300 transition-colors flex items-center space-x-2">
                                            <span>View Account</span>
                                            <FaArrowRight />
                                        </div>
                                    </div>
                                </div>
                            </Link>

                            {/* Prof-Student Space Card */}
                            <Link href="/prof-student-space" className="block">
                                <div id="prof-student-space-card" className="bg-dark-secondary rounded-2xl border border-dark-border hover:border-orange-500/50 transition-all duration-300 overflow-hidden group cursor-pointer h-full flex flex-col">
                                    <div className="p-8 flex-grow">
                                        <div className="flex items-start justify-between mb-6">
                                            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                                <FaUsers className="text-white text-3xl" />
                                            </div>
                                            <span className="bg-orange-500/20 text-orange-400 text-xs font-semibold px-3 py-1 rounded-full">Community</span>
                                        </div>
                                        <h3 className="text-2xl font-bold text-white mb-3">Prof-Student Space</h3>
                                        <p className="text-gray-400 mb-6 leading-relaxed">
                                            Browse professors, explore their courses and tutorials, view ratings, and connect with experts in finance. Schedule meetings and enhance your learning.
                                        </p>
                                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                                            <div className="flex items-center space-x-2">
                                                <FaChalkboardUser />
                                                <span>50+ Professors</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <FaBook />
                                                <span>200+ Courses</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gradient-to-r from-orange-500/10 to-orange-600/10 px-8 py-4 border-t border-dark-border mt-auto">
                                        <div className="text-orange-400 font-semibold group-hover:text-orange-300 transition-colors flex items-center space-x-2">
                                            <span>Explore Space</span>
                                            <FaArrowRight />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </section>

                <section id="recent-activity-section" className="py-12 bg-dark-secondary border-t border-dark-border">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-2xl font-bold text-white">Recent Activity</h3>
                            <button className="text-blue-400 hover:text-blue-300 text-sm font-semibold flex items-center space-x-2">
                                <span>View All</span>
                                <FaArrowRight className="text-xs" />
                            </button>
                        </div>

                        <div id="activity-grid" className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div id="activity-card-1" className="bg-dark-primary rounded-xl border border-dark-border p-6">
                                <div className="flex items-start space-x-4">
                                    <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <FaMessage className="text-blue-400 text-xl" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-white font-semibold mb-1">Chatbot Session</h4>
                                        <p className="text-gray-400 text-sm mb-2">Discussed investment strategies and portfolio diversification</p>
                                        <span className="text-gray-500 text-xs">2 hours ago</span>
                                    </div>
                                </div>
                            </div>

                            <div id="activity-card-2" className="bg-dark-primary rounded-xl border border-dark-border p-6">
                                <div className="flex items-start space-x-4">
                                    <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <FaChartLine className="text-purple-400 text-xl" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-white font-semibold mb-1">Simulator Analysis</h4>
                                        <p className="text-gray-400 text-sm mb-2">Analyzed Tesla Inc. - Received investment recommendation</p>
                                        <span className="text-gray-500 text-xs">5 hours ago</span>
                                    </div>
                                </div>
                            </div>

                            <div id="activity-card-3" className="bg-dark-primary rounded-xl border border-dark-border p-6">
                                <div className="flex items-start space-x-4">
                                    <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <FaCalendarCheck className="text-green-400 text-xl" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-white font-semibold mb-1">Meeting Scheduled</h4>
                                        <p className="text-gray-400 text-sm mb-2">Prof. Sarah Johnson - Financial Markets 101</p>
                                        <span className="text-gray-500 text-xs">Yesterday</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="quick-stats-section" className="py-12">
                    <div className="max-w-7xl mx-auto px-6">
                        <h3 className="text-2xl font-bold text-white mb-8">Your Progress</h3>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <div id="stat-card-1" className="bg-dark-secondary rounded-xl border border-dark-border p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                                        <FaGraduationCap className="text-blue-400 text-xl" />
                                    </div>
                                    <span className="text-green-400 text-sm font-semibold">+12%</span>
                                </div>
                                <div className="text-3xl font-bold text-white mb-1">24</div>
                                <div className="text-gray-400 text-sm">Courses Completed</div>
                            </div>

                            <div id="stat-card-2" className="bg-dark-secondary rounded-xl border border-dark-border p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                                        <FaClock className="text-purple-400 text-xl" />
                                    </div>
                                    <span className="text-green-400 text-sm font-semibold">+8%</span>
                                </div>
                                <div className="text-3xl font-bold text-white mb-1">142</div>
                                <div className="text-gray-400 text-sm">Learning Hours</div>
                            </div>

                            <div id="stat-card-3" className="bg-dark-secondary rounded-xl border border-dark-border p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
                                        <FaUsers className="text-orange-400 text-xl" />
                                    </div>
                                    <span className="text-green-400 text-sm font-semibold">+3</span>
                                </div>
                                <div className="text-3xl font-bold text-white mb-1">15</div>
                                <div className="text-gray-400 text-sm">Prof Connections</div>
                            </div>

                            <div id="stat-card-4" className="bg-dark-secondary rounded-xl border border-dark-border p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                                        <FaStar className="text-green-400 text-xl" />
                                    </div>
                                    <span className="text-green-400 text-sm font-semibold">+0.3</span>
                                </div>
                                <div className="text-3xl font-bold text-white mb-1">4.8</div>
                                <div className="text-gray-400 text-sm">Average Rating</div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
