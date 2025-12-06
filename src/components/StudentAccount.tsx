import {
    FaPenToSquare,
    FaCircle,
    FaEnvelope,
    FaPhone,
    FaLocationDot,
    FaCalendar,
    FaCalendarCheck,
    FaBook,
    FaStar,
    FaRightFromBracket,
    FaChevronLeft,
    FaChevronRight,
    FaClock
} from 'react-icons/fa6';
import { signOut } from 'next-auth/react';

export default function StudentAccount() {
    return (
        <main id="main-content" className="max-w-7xl mx-auto px-6 py-8 w-full flex-grow">
            <div id="page-header" className="mb-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">My Account</h1>
                        <p className="text-gray-400">Manage your profile and view your upcoming meetings</p>
                    </div>
                    <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center">
                        <FaPenToSquare className="mr-2" />Edit Profile
                    </button>
                </div>
            </div>

            <div id="account-layout" className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div id="account-config-section" className="lg:col-span-1">
                    <div className="bg-dark-secondary rounded-xl border border-dark-border p-6">
                        <div className="flex flex-col items-center mb-6">
                            <div className="w-32 h-32 rounded-full border-4 border-dark-border mb-4 overflow-hidden bg-gray-700">
                                {/* Placeholder for avatar */}
                                <div className="w-full h-full flex items-center justify-center text-4xl">👩‍🎓</div>
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-1">Sarah Johnson</h2>
                            <p className="text-gray-400 text-sm mb-3">Student</p>
                            <span className="bg-green-500/20 text-green-400 px-4 py-1 rounded-full text-sm font-medium flex items-center">
                                <FaCircle className="text-xs mr-2" />Active
                            </span>
                        </div>

                        <div id="account-info" className="space-y-4 mb-6">
                            <div className="bg-dark-primary rounded-lg p-4 border border-dark-border">
                                <div className="flex items-center text-gray-400 text-sm mb-1">
                                    <FaEnvelope className="w-5" />
                                    <span className="ml-2">Email</span>
                                </div>
                                <p className="text-white font-medium ml-7">sarah.johnson@email.com</p>
                            </div>

                            <div className="bg-dark-primary rounded-lg p-4 border border-dark-border">
                                <div className="flex items-center text-gray-400 text-sm mb-1">
                                    <FaPhone className="w-5" />
                                    <span className="ml-2">Phone</span>
                                </div>
                                <p className="text-white font-medium ml-7">+1 (555) 123-4567</p>
                            </div>

                            <div className="bg-dark-primary rounded-lg p-4 border border-dark-border">
                                <div className="flex items-center text-gray-400 text-sm mb-1">
                                    <FaLocationDot className="w-5" />
                                    <span className="ml-2">Location</span>
                                </div>
                                <p className="text-white font-medium ml-7">New York, USA</p>
                            </div>

                            <div className="bg-dark-primary rounded-lg p-4 border border-dark-border">
                                <div className="flex items-center text-gray-400 text-sm mb-1">
                                    <FaCalendar className="w-5" />
                                    <span className="ml-2">Member Since</span>
                                </div>
                                <p className="text-white font-medium ml-7">January 2024</p>
                            </div>
                        </div>

                        <div id="account-stats" className="space-y-3 mb-6">
                            <h3 className="text-white font-semibold mb-4">Statistics</h3>
                            <div className="flex items-center justify-between bg-dark-primary rounded-lg p-3 border border-dark-border">
                                <div className="flex items-center">
                                    <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center mr-3">
                                        <FaCalendarCheck className="text-blue-400" />
                                    </div>
                                    <span className="text-gray-300 text-sm">Interesting Meets</span>
                                </div>
                                <span className="text-white font-bold text-lg">8</span>
                            </div>

                            <div className="flex items-center justify-between bg-dark-primary rounded-lg p-3 border border-dark-border">
                                <div className="flex items-center">
                                    <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center mr-3">
                                        <FaBook className="text-purple-400" />
                                    </div>
                                    <span className="text-gray-300 text-sm">Enrolled Courses</span>
                                </div>
                                <span className="text-white font-bold text-lg">12</span>
                            </div>

                            <div className="flex items-center justify-between bg-dark-primary rounded-lg p-3 border border-dark-border">
                                <div className="flex items-center">
                                    <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center mr-3">
                                        <FaStar className="text-green-400" />
                                    </div>
                                    <span className="text-gray-300 text-sm">Ratings Given</span>
                                </div>
                                <span className="text-white font-bold text-lg">24</span>
                            </div>
                        </div>

                        <button
                            onClick={() => signOut({ callbackUrl: '/' })}
                            className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 px-4 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center"
                        >
                            <FaRightFromBracket className="mr-2" />Logout
                        </button>
                    </div>
                </div>

                <div id="calendar-section" className="lg:col-span-2">
                    <div className="bg-dark-secondary rounded-xl border border-dark-border p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-white">My Calendar - Interesting Meets</h2>
                            <div className="flex items-center space-x-2">
                                <button className="bg-dark-primary hover:bg-dark-muted text-gray-400 hover:text-white px-4 py-2 rounded-lg transition-all duration-300">
                                    <FaChevronLeft />
                                </button>
                                <span className="text-white font-semibold px-4">December 2024</span>
                                <button className="bg-dark-primary hover:bg-dark-muted text-gray-400 hover:text-white px-4 py-2 rounded-lg transition-all duration-300">
                                    <FaChevronRight />
                                </button>
                            </div>
                        </div>

                        <div id="calendar-grid" className="mb-6">
                            <div className="grid grid-cols-7 gap-2 mb-3">
                                <div className="text-center text-gray-400 text-sm font-semibold py-2">Sun</div>
                                <div className="text-center text-gray-400 text-sm font-semibold py-2">Mon</div>
                                <div className="text-center text-gray-400 text-sm font-semibold py-2">Tue</div>
                                <div className="text-center text-gray-400 text-sm font-semibold py-2">Wed</div>
                                <div className="text-center text-gray-400 text-sm font-semibold py-2">Thu</div>
                                <div className="text-center text-gray-400 text-sm font-semibold py-2">Fri</div>
                                <div className="text-center text-gray-400 text-sm font-semibold py-2">Sat</div>
                            </div>

                            <div className="grid grid-cols-7 gap-2">
                                <div className="bg-dark-primary rounded-lg p-3 text-center text-gray-600 h-24"></div>
                                <div className="bg-dark-primary rounded-lg p-3 text-center text-gray-600 h-24"></div>
                                <div className="bg-dark-primary rounded-lg p-3 text-center text-gray-600 h-24"></div>
                                <div className="bg-dark-primary rounded-lg p-3 text-center text-gray-600 h-24"></div>
                                <div className="bg-dark-primary rounded-lg p-3 text-center text-gray-600 h-24"></div>
                                <div className="bg-dark-primary rounded-lg p-3 text-center h-24">
                                    <div className="text-white font-semibold mb-1">1</div>
                                </div>
                                <div className="bg-dark-primary rounded-lg p-3 text-center h-24">
                                    <div className="text-white font-semibold mb-1">2</div>
                                </div>
                                <div className="bg-dark-primary rounded-lg p-3 text-center h-24">
                                    <div className="text-white font-semibold mb-1">3</div>
                                </div>
                                <div className="bg-dark-primary rounded-lg p-3 text-center h-24 border-2 border-blue-500">
                                    <div className="text-white font-semibold mb-1">4</div>
                                    <div className="w-2 h-2 bg-blue-500 rounded-full mx-auto"></div>
                                </div>
                                <div className="bg-dark-primary rounded-lg p-3 text-center h-24">
                                    <div className="text-white font-semibold mb-1">5</div>
                                </div>
                                <div className="bg-dark-primary rounded-lg p-3 text-center h-24">
                                    <div className="text-white font-semibold mb-1">6</div>
                                </div>
                                <div className="bg-dark-primary rounded-lg p-3 text-center h-24 border-2 border-purple-500">
                                    <div className="text-white font-semibold mb-1">7</div>
                                    <div className="w-2 h-2 bg-purple-500 rounded-full mx-auto"></div>
                                </div>
                                <div className="bg-dark-primary rounded-lg p-3 text-center h-24">
                                    <div className="text-white font-semibold mb-1">8</div>
                                </div>
                                <div className="bg-dark-primary rounded-lg p-3 text-center h-24">
                                    <div className="text-white font-semibold mb-1">9</div>
                                </div>
                                <div className="bg-dark-primary rounded-lg p-3 text-center h-24">
                                    <div className="text-white font-semibold mb-1">10</div>
                                </div>
                                <div className="bg-dark-primary rounded-lg p-3 text-center h-24 border-2 border-blue-500">
                                    <div className="text-white font-semibold mb-1">11</div>
                                    <div className="w-2 h-2 bg-blue-500 rounded-full mx-auto"></div>
                                </div>
                                <div className="bg-dark-primary rounded-lg p-3 text-center h-24">
                                    <div className="text-white font-semibold mb-1">12</div>
                                </div>
                                <div className="bg-dark-primary rounded-lg p-3 text-center h-24">
                                    <div className="text-white font-semibold mb-1">13</div>
                                </div>
                                <div className="bg-dark-primary rounded-lg p-3 text-center h-24 border-2 border-green-500">
                                    <div className="text-white font-semibold mb-1">14</div>
                                    <div className="w-2 h-2 bg-green-500 rounded-full mx-auto"></div>
                                </div>
                                <div className="bg-dark-primary rounded-lg p-3 text-center h-24">
                                    <div className="text-white font-semibold mb-1">15</div>
                                </div>
                                <div className="bg-dark-primary rounded-lg p-3 text-center h-24">
                                    <div className="text-white font-semibold mb-1">16</div>
                                </div>
                                <div className="bg-dark-primary rounded-lg p-3 text-center h-24">
                                    <div className="text-white font-semibold mb-1">17</div>
                                </div>
                                <div className="bg-dark-primary rounded-lg p-3 text-center h-24 border-2 border-blue-500">
                                    <div className="text-white font-semibold mb-1">18</div>
                                    <div className="w-2 h-2 bg-blue-500 rounded-full mx-auto"></div>
                                </div>
                                <div className="bg-dark-primary rounded-lg p-3 text-center h-24">
                                    <div className="text-white font-semibold mb-1">19</div>
                                </div>
                                <div className="bg-dark-primary rounded-lg p-3 text-center h-24 border-2 border-purple-500">
                                    <div className="text-white font-semibold mb-1">20</div>
                                    <div className="w-2 h-2 bg-purple-500 rounded-full mx-auto"></div>
                                </div>
                                <div className="bg-dark-primary rounded-lg p-3 text-center h-24">
                                    <div className="text-white font-semibold mb-1">21</div>
                                </div>
                                <div className="bg-dark-primary rounded-lg p-3 text-center h-24">
                                    <div className="text-white font-semibold mb-1">22</div>
                                </div>
                                <div className="bg-dark-primary rounded-lg p-3 text-center h-24">
                                    <div className="text-white font-semibold mb-1">23</div>
                                </div>
                                <div className="bg-dark-primary rounded-lg p-3 text-center h-24">
                                    <div className="text-white font-semibold mb-1">24</div>
                                </div>
                                <div className="bg-dark-primary rounded-lg p-3 text-center h-24 border-2 border-green-500">
                                    <div className="text-white font-semibold mb-1">25</div>
                                    <div className="w-2 h-2 bg-green-500 rounded-full mx-auto"></div>
                                </div>
                                <div className="bg-dark-primary rounded-lg p-3 text-center h-24">
                                    <div className="text-white font-semibold mb-1">26</div>
                                </div>
                                <div className="bg-dark-primary rounded-lg p-3 text-center h-24">
                                    <div className="text-white font-semibold mb-1">27</div>
                                </div>
                                <div className="bg-dark-primary rounded-lg p-3 text-center h-24 border-2 border-blue-500">
                                    <div className="text-white font-semibold mb-1">28</div>
                                    <div className="w-2 h-2 bg-blue-500 rounded-full mx-auto"></div>
                                </div>
                                <div className="bg-dark-primary rounded-lg p-3 text-center h-24">
                                    <div className="text-white font-semibold mb-1">29</div>
                                </div>
                                <div className="bg-dark-primary rounded-lg p-3 text-center h-24">
                                    <div className="text-white font-semibold mb-1">30</div>
                                </div>
                                <div className="bg-dark-primary rounded-lg p-3 text-center h-24">
                                    <div className="text-white font-semibold mb-1">31</div>
                                </div>
                            </div>
                        </div>

                        <div id="upcoming-meets" className="space-y-4">
                            <h3 className="text-xl font-bold text-white mb-4">Upcoming Interesting Meets</h3>

                            <div className="bg-dark-primary rounded-lg p-4 border-l-4 border-blue-500">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center mb-2">
                                            <FaCalendar className="text-blue-400 mr-2" />
                                            <span className="text-white font-semibold">Financial Markets Overview</span>
                                        </div>
                                        <p className="text-gray-400 text-sm mb-2">Prof. Michael Anderson</p>
                                        <div className="flex items-center text-gray-400 text-sm">
                                            <FaClock className="mr-2" />
                                            <span>Dec 4, 2024 - 2:00 PM</span>
                                        </div>
                                    </div>
                                    <button className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300">
                                        View Details
                                    </button>
                                </div>
                            </div>

                            <div className="bg-dark-primary rounded-lg p-4 border-l-4 border-purple-500">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center mb-2">
                                            <FaCalendar className="text-purple-400 mr-2" />
                                            <span className="text-white font-semibold">Investment Strategies Workshop</span>
                                        </div>
                                        <p className="text-gray-400 text-sm mb-2">Prof. Jennifer Lee</p>
                                        <div className="flex items-center text-gray-400 text-sm">
                                            <FaClock className="mr-2" />
                                            <span>Dec 7, 2024 - 10:00 AM</span>
                                        </div>
                                    </div>
                                    <button className="bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300">
                                        View Details
                                    </button>
                                </div>
                            </div>

                            <div className="bg-dark-primary rounded-lg p-4 border-l-4 border-blue-500">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center mb-2">
                                            <FaCalendar className="text-blue-400 mr-2" />
                                            <span className="text-white font-semibold">Risk Management Fundamentals</span>
                                        </div>
                                        <p className="text-gray-400 text-sm mb-2">Prof. David Chen</p>
                                        <div className="flex items-center text-gray-400 text-sm">
                                            <FaClock className="mr-2" />
                                            <span>Dec 11, 2024 - 3:30 PM</span>
                                        </div>
                                    </div>
                                    <button className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300">
                                        View Details
                                    </button>
                                </div>
                            </div>

                            <div className="bg-dark-primary rounded-lg p-4 border-l-4 border-green-500">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center mb-2">
                                            <FaCalendar className="text-green-400 mr-2" />
                                            <span className="text-white font-semibold">Portfolio Diversification Techniques</span>
                                        </div>
                                        <p className="text-gray-400 text-sm mb-2">Prof. Sarah Williams</p>
                                        <div className="flex items-center text-gray-400 text-sm">
                                            <FaClock className="mr-2" />
                                            <span>Dec 14, 2024 - 1:00 PM</span>
                                        </div>
                                    </div>
                                    <button className="bg-green-500/20 hover:bg-green-500/30 text-green-400 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300">
                                        View Details
                                    </button>
                                </div>
                            </div>

                            <div className="bg-dark-primary rounded-lg p-4 border-l-4 border-blue-500">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center mb-2">
                                            <FaCalendar className="text-blue-400 mr-2" />
                                            <span className="text-white font-semibold">Cryptocurrency &amp; Blockchain Basics</span>
                                        </div>
                                        <p className="text-gray-400 text-sm mb-2">Prof. Robert Martinez</p>
                                        <div className="flex items-center text-gray-400 text-sm">
                                            <FaClock className="mr-2" />
                                            <span>Dec 18, 2024 - 4:00 PM</span>
                                        </div>
                                    </div>
                                    <button className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
