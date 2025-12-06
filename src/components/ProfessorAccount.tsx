'use client';

import {
    FaUserGear,
    FaCamera,
    FaCalendarDays,
    FaPenToSquare,
    FaBookOpen,
    FaPlus,
    FaUsers,
    FaClock,
    FaCircleCheck,
    FaEllipsisVertical,
    FaStar,
    FaCirclePlay,
    FaCirclePause
} from 'react-icons/fa6';
import { useSession } from 'next-auth/react';

export default function ProfessorAccount() {
    const { data: session } = useSession();

    return (
        <main id="main-content" className="max-w-7xl mx-auto px-6 py-8 w-full flex-grow">
            <div id="page-header" className="mb-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">Professor Account</h1>
                        <p className="text-gray-400">Manage your profile, courses, and scheduled meetings</p>
                    </div>
                    <div className="flex items-center space-x-3">
                        <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg" alt="Professor" className="w-12 h-12 rounded-full object-cover" />
                        <div>
                            <div className="text-white font-medium">{session?.user?.name || 'Dr. Sarah Johnson'}</div>
                            <div className="text-sm text-gray-400">Financial Economics</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div id="account-config" className="lg:col-span-1">
                    <div className="bg-dark-secondary rounded-xl border border-dark-border p-6">
                        <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                            <FaUserGear className="text-blue-400 mr-3" />
                            Account Configuration
                        </h2>

                        <div className="space-y-6">
                            <div className="text-center mb-6">
                                <div className="relative inline-block">
                                    <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg" alt="Profile" className="w-24 h-24 rounded-full object-cover mx-auto" />
                                    <button className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white w-8 h-8 rounded-full flex items-center justify-center transition-colors">
                                        <FaCamera className="text-sm" />
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                                <input type="text" defaultValue={session?.user?.name || "Dr. Sarah Johnson"} className="w-full bg-dark-primary border border-dark-border rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                                <input type="email" defaultValue={session?.user?.email || "sarah.johnson@menafina.edu"} className="w-full bg-dark-primary border border-dark-border rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Department</label>
                                <input type="text" defaultValue="Financial Economics" className="w-full bg-dark-primary border border-dark-border rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Office Hours</label>
                                <input type="text" defaultValue="Mon-Wed 2:00-4:00 PM" className="w-full bg-dark-primary border border-dark-border rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
                                <textarea rows={3} defaultValue="PhD in Financial Economics with 15 years of experience in investment banking and academic research." className="w-full bg-dark-primary border border-dark-border rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none resize-none"></textarea>
                            </div>

                            <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 rounded-lg font-medium transition-all duration-300">
                                Update Profile
                            </button>
                        </div>
                    </div>
                </div>

                <div id="main-content-area" className="lg:col-span-2 space-y-8">
                    <div id="calendar-section" className="bg-dark-secondary rounded-xl border border-dark-border p-6">
                        <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                            <FaCalendarDays className="text-purple-400 mr-3" />
                            My Meeting Calendar
                        </h2>

                        <div className="grid grid-cols-7 gap-2 mb-4">
                            <div className="text-center text-gray-400 font-medium py-2">Sun</div>
                            <div className="text-center text-gray-400 font-medium py-2">Mon</div>
                            <div className="text-center text-gray-400 font-medium py-2">Tue</div>
                            <div className="text-center text-gray-400 font-medium py-2">Wed</div>
                            <div className="text-center text-gray-400 font-medium py-2">Thu</div>
                            <div className="text-center text-gray-400 font-medium py-2">Fri</div>
                            <div className="text-center text-gray-400 font-medium py-2">Sat</div>
                        </div>

                        <div className="grid grid-cols-7 gap-2">
                            <div className="text-center text-gray-500 py-2">29</div>
                            <div className="text-center text-gray-500 py-2">30</div>
                            <div className="text-center text-white py-2 hover:bg-dark-muted rounded cursor-pointer">1</div>
                            <div className="text-center text-white py-2 hover:bg-dark-muted rounded cursor-pointer">2</div>
                            <div className="text-center text-white py-2 hover:bg-dark-muted rounded cursor-pointer">3</div>
                            <div className="text-center text-white py-2 bg-blue-600 rounded cursor-pointer relative">
                                4
                                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-300 rounded-full"></div>
                            </div>
                            <div className="text-center text-white py-2 hover:bg-dark-muted rounded cursor-pointer">5</div>
                            <div className="text-center text-white py-2 hover:bg-dark-muted rounded cursor-pointer">6</div>
                            <div className="text-center text-white py-2 hover:bg-dark-muted rounded cursor-pointer">7</div>
                            <div className="text-center text-white py-2 bg-purple-600 rounded cursor-pointer relative">
                                8
                                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-purple-300 rounded-full"></div>
                            </div>
                            <div className="text-center text-white py-2 hover:bg-dark-muted rounded cursor-pointer">9</div>
                            <div className="text-center text-white py-2 hover:bg-dark-muted rounded cursor-pointer">10</div>
                            <div className="text-center text-white py-2 bg-green-600 rounded cursor-pointer relative">
                                11
                                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-green-300 rounded-full"></div>
                            </div>
                            <div className="text-center text-white py-2 hover:bg-dark-muted rounded cursor-pointer">12</div>
                        </div>

                        <div className="mt-6 space-y-3">
                            <div className="flex items-center justify-between bg-dark-primary rounded-lg p-4 border border-dark-border">
                                <div className="flex items-center space-x-3">
                                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                    <div>
                                        <div className="text-white font-medium">Portfolio Analysis Session</div>
                                        <div className="text-sm text-gray-400">Dec 4, 2024 - 2:00 PM</div>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded">Confirmed</span>
                                    <button className="text-gray-400 hover:text-white">
                                        <FaPenToSquare />
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center justify-between bg-dark-primary rounded-lg p-4 border border-dark-border">
                                <div className="flex items-center space-x-3">
                                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                                    <div>
                                        <div className="text-white font-medium">Investment Strategies Workshop</div>
                                        <div className="text-sm text-gray-400">Dec 8, 2024 - 10:00 AM</div>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="text-xs bg-purple-600 text-white px-2 py-1 rounded">Scheduled</span>
                                    <button className="text-gray-400 hover:text-white">
                                        <FaPenToSquare />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="courses-section" className="bg-dark-secondary rounded-xl border border-dark-border p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-semibold text-white flex items-center">
                                <FaBookOpen className="text-green-400 mr-3" />
                                My Courses & Tutorials
                            </h2>
                            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center">
                                <FaPlus className="mr-2" />
                                Add Course
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div className="bg-dark-primary rounded-lg border border-dark-border p-5">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-white mb-2">Advanced Portfolio Management</h3>
                                        <p className="text-gray-400 mb-3">Comprehensive course covering modern portfolio theory, risk assessment, and optimization strategies.</p>
                                        <div className="flex items-center space-x-4 text-sm">
                                            <span className="text-gray-400 flex items-center">
                                                <FaUsers className="mr-1" />
                                                45 students
                                            </span>
                                            <span className="text-gray-400 flex items-center">
                                                <FaClock className="mr-1" />
                                                12 weeks
                                            </span>
                                            <span className="text-green-400 flex items-center">
                                                <FaCircleCheck className="mr-1" />
                                                Active
                                            </span>
                                        </div>
                                    </div>
                                    <button className="text-gray-400 hover:text-white">
                                        <FaEllipsisVertical />
                                    </button>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <div className="flex items-center text-yellow-400">
                                            <FaStar className="text-sm" />
                                            <FaStar className="text-sm" />
                                            <FaStar className="text-sm" />
                                            <FaStar className="text-sm" />
                                            <FaStar className="text-sm" />
                                            <span className="text-white ml-2 text-sm">4.8</span>
                                        </div>
                                        <span className="text-gray-400 text-sm">(42 reviews)</span>
                                    </div>
                                    <div className="flex space-x-2">
                                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors">
                                            View Ratings
                                        </button>
                                        <button className="bg-dark-muted hover:bg-gray-600 text-white px-3 py-1 rounded text-sm transition-colors">
                                            Edit
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-dark-primary rounded-lg border border-dark-border p-5">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-white mb-2">Financial Risk Analysis</h3>
                                        <p className="text-gray-400 mb-3">In-depth tutorial series on identifying, measuring, and managing financial risks in various market conditions.</p>
                                        <div className="flex items-center space-x-4 text-sm">
                                            <span className="text-gray-400 flex items-center">
                                                <FaUsers className="mr-1" />
                                                28 students
                                            </span>
                                            <span className="text-gray-400 flex items-center">
                                                <FaClock className="mr-1" />
                                                8 weeks
                                            </span>
                                            <span className="text-blue-400 flex items-center">
                                                <FaCirclePlay className="mr-1" />
                                                In Progress
                                            </span>
                                        </div>
                                    </div>
                                    <button className="text-gray-400 hover:text-white">
                                        <FaEllipsisVertical />
                                    </button>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <div className="flex items-center text-yellow-400">
                                            <FaStar className="text-sm" />
                                            <FaStar className="text-sm" />
                                            <FaStar className="text-sm" />
                                            <FaStar className="text-sm" />
                                            <FaStar className="text-sm" />
                                            <span className="text-white ml-2 text-sm">4.9</span>
                                        </div>
                                        <span className="text-gray-400 text-sm">(58 reviews)</span>
                                    </div>
                                    <div className="flex space-x-2">
                                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors">
                                            View Ratings
                                        </button>
                                        <button className="bg-dark-muted hover:bg-gray-600 text-white px-3 py-1 rounded text-sm transition-colors">
                                            Edit
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-dark-primary rounded-lg border border-dark-border p-5">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-white mb-2">Cryptocurrency & Digital Assets</h3>
                                        <p className="text-gray-400 mb-3">Explore the fundamentals of cryptocurrency trading, blockchain technology, and digital asset management.</p>
                                        <div className="flex items-center space-x-4 text-sm">
                                            <span className="text-gray-400 flex items-center">
                                                <FaUsers className="mr-1" />
                                                67 students
                                            </span>
                                            <span className="text-gray-400 flex items-center">
                                                <FaClock className="mr-1" />
                                                6 weeks
                                            </span>
                                            <span className="text-orange-400 flex items-center">
                                                <FaCirclePause className="mr-1" />
                                                Draft
                                            </span>
                                        </div>
                                    </div>
                                    <button className="text-gray-400 hover:text-white">
                                        <FaEllipsisVertical />
                                    </button>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <div className="flex items-center text-yellow-400">
                                            <FaStar className="text-sm" />
                                            <FaStar className="text-sm" />
                                            <FaStar className="text-sm" />
                                            <FaStar className="text-sm" />
                                            <FaStar className="text-sm" />
                                            <span className="text-white ml-2 text-sm">4.6</span>
                                        </div>
                                        <span className="text-gray-400 text-sm">(23 reviews)</span>
                                    </div>
                                    <div className="flex space-x-2">
                                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors">
                                            View Ratings
                                        </button>
                                        <button className="bg-dark-muted hover:bg-gray-600 text-white px-3 py-1 rounded text-sm transition-colors">
                                            Edit
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
