'use client';

import Header from '@/components/Header';
import Link from 'next/link';
import {
    FaGraduationCap,
    FaArrowLeft,
    FaBell,
    FaStar,
    FaBook,
    FaUsers,
    FaCalendar,
    FaClock,
    FaTwitter,
    FaLinkedin,
    FaFacebook,
    FaCalendarCheck
} from 'react-icons/fa6';

export default function ProfessorProfilePage() {
    return (
        <div className="bg-dark-primary text-white font-inter min-h-screen flex flex-col">
            <Header />

            <main id="main-content" className="max-w-7xl w-full mx-auto px-6 py-8 flex-grow">
                <section id="professor-info" className="bg-dark-secondary rounded-xl p-8 mb-8 border border-dark-border">
                    <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-6">
                        <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0 bg-gray-700">
                            {/* Placeholder for professor avatar */}
                            <div className="w-full h-full flex items-center justify-center text-4xl">👨‍🏫</div>
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <div className="flex flex-col md:flex-row items-center justify-between mb-4">
                                <div>
                                    <h1 className="text-3xl font-bold text-white mb-2">Dr. Michael Chen</h1>
                                    <p className="text-lg text-gray-400 mb-2">Financial Economics Professor</p>
                                    <p className="text-gray-500">Harvard Business School</p>
                                </div>
                                <div className="flex items-center space-x-4 mt-4 md:mt-0">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-yellow-400">4.8</div>
                                        <div className="flex items-center justify-center space-x-1 mb-1 text-yellow-400 text-sm">
                                            <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                                        </div>
                                        <div className="text-sm text-gray-400">248 reviews</div>
                                    </div>
                                </div>
                            </div>
                            <p className="text-gray-300 leading-relaxed mb-4">
                                Experienced financial economics professor with 15+ years in academia and industry. Specializes in investment theory, portfolio management, and financial modeling.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-6">
                                <div className="flex items-center space-x-2 text-gray-400">
                                    <FaBook />
                                    <span>12 Courses</span>
                                </div>
                                <div className="flex items-center space-x-2 text-gray-400">
                                    <FaUsers />
                                    <span>1,247 Students</span>
                                </div>
                                <div className="flex items-center space-x-2 text-gray-400">
                                    <FaCalendar />
                                    <span>Member since 2020</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <section id="courses-section" className="bg-dark-secondary rounded-xl p-6 border border-dark-border">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-white">Courses &amp; Tutorials</h2>
                                <div className="flex items-center space-x-4">
                                    <select className="bg-dark-primary border border-dark-border rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-600">
                                        <option>All Courses</option>
                                        <option>Beginner</option>
                                        <option>Intermediate</option>
                                        <option>Advanced</option>
                                    </select>
                                </div>
                            </div>

                            <div id="courses-grid" className="space-y-6">
                                {/* Course 1 */}
                                <div className="bg-dark-primary rounded-lg p-6 border border-dark-border hover:border-blue-500/50 transition-colors">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex-1">
                                            <h3 className="text-xl font-semibold text-white mb-2">Investment Portfolio Management</h3>
                                            <p className="text-gray-400 mb-3">Learn advanced portfolio optimization techniques and risk management strategies for modern investment portfolios.</p>
                                            <div className="flex items-center space-x-4 mb-4">
                                                <span className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-sm">Advanced</span>
                                                <span className="text-gray-500 text-sm">8 weeks</span>
                                                <span className="text-gray-500 text-sm">24 lessons</span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-2xl font-bold text-green-400 mb-1">$299</div>
                                            <div className="flex items-center justify-end space-x-1">
                                                <FaStar className="text-yellow-400 text-sm" />
                                                <span className="text-white font-semibold">4.9</span>
                                                <span className="text-gray-400 text-sm">(89)</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
                                        <div className="flex items-center space-x-4">
                                            <div className="flex items-center space-x-2 text-gray-400">
                                                <FaUsers className="text-sm" />
                                                <span className="text-sm">342 enrolled</span>
                                            </div>
                                            <div className="flex items-center space-x-2 text-gray-400">
                                                <FaClock className="text-sm" />
                                                <span className="text-sm">Updated 2 days ago</span>
                                            </div>
                                        </div>
                                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors w-full sm:w-auto">
                                            View Details
                                        </button>
                                    </div>
                                </div>

                                {/* Course 2 */}
                                <div className="bg-dark-primary rounded-lg p-6 border border-dark-border hover:border-blue-500/50 transition-colors">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex-1">
                                            <h3 className="text-xl font-semibold text-white mb-2">Financial Modeling Fundamentals</h3>
                                            <p className="text-gray-400 mb-3">Master the essentials of financial modeling using Excel and Python for business valuation and forecasting.</p>
                                            <div className="flex items-center space-x-4 mb-4">
                                                <span className="bg-green-600/20 text-green-400 px-3 py-1 rounded-full text-sm">Intermediate</span>
                                                <span className="text-gray-500 text-sm">6 weeks</span>
                                                <span className="text-gray-500 text-sm">18 lessons</span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-2xl font-bold text-green-400 mb-1">$199</div>
                                            <div className="flex items-center justify-end space-x-1">
                                                <FaStar className="text-yellow-400 text-sm" />
                                                <span className="text-white font-semibold">4.7</span>
                                                <span className="text-gray-400 text-sm">(156)</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
                                        <div className="flex items-center space-x-4">
                                            <div className="flex items-center space-x-2 text-gray-400">
                                                <FaUsers className="text-sm" />
                                                <span className="text-sm">567 enrolled</span>
                                            </div>
                                            <div className="flex items-center space-x-2 text-gray-400">
                                                <FaClock className="text-sm" />
                                                <span className="text-sm">Updated 1 week ago</span>
                                            </div>
                                        </div>
                                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors w-full sm:w-auto">
                                            View Details
                                        </button>
                                    </div>
                                </div>

                                {/* Course 3 */}
                                <div className="bg-dark-primary rounded-lg p-6 border border-dark-border hover:border-blue-500/50 transition-colors">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex-1">
                                            <h3 className="text-xl font-semibold text-white mb-2">Cryptocurrency &amp; Blockchain Finance</h3>
                                            <p className="text-gray-400 mb-3">Explore the financial implications of blockchain technology and cryptocurrency markets in modern finance.</p>
                                            <div className="flex items-center space-x-4 mb-4">
                                                <span className="bg-purple-600/20 text-purple-400 px-3 py-1 rounded-full text-sm">Beginner</span>
                                                <span className="text-gray-500 text-sm">4 weeks</span>
                                                <span className="text-gray-500 text-sm">12 lessons</span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-2xl font-bold text-green-400 mb-1">$149</div>
                                            <div className="flex items-center justify-end space-x-1">
                                                <FaStar className="text-yellow-400 text-sm" />
                                                <span className="text-white font-semibold">4.6</span>
                                                <span className="text-gray-400 text-sm">(203)</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
                                        <div className="flex items-center space-x-4">
                                            <div className="flex items-center space-x-2 text-gray-400">
                                                <FaUsers className="text-sm" />
                                                <span className="text-sm">789 enrolled</span>
                                            </div>
                                            <div className="flex items-center space-x-2 text-gray-400">
                                                <FaClock className="text-sm" />
                                                <span className="text-sm">Updated 3 days ago</span>
                                            </div>
                                        </div>
                                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors w-full sm:w-auto">
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div className="lg:col-span-1">
                        <section id="calendar-section" className="bg-dark-secondary rounded-xl p-6 border border-dark-border mb-6">
                            <h2 className="text-xl font-bold text-white mb-4">Upcoming Meetings</h2>
                            <div className="space-y-4">
                                <div className="bg-dark-primary rounded-lg p-4 border border-dark-border">
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="font-semibold text-white">Portfolio Review Session</h4>
                                        <span className="text-xs text-blue-400 bg-blue-400/20 px-2 py-1 rounded">Available</span>
                                    </div>
                                    <p className="text-gray-400 text-sm mb-2">Dec 15, 2024 - 2:00 PM</p>
                                    <p className="text-gray-500 text-xs mb-3">45 minutes • Online</p>
                                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm transition-colors">
                                        Mark Interest
                                    </button>
                                </div>

                                <div className="bg-dark-primary rounded-lg p-4 border border-dark-border">
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="font-semibold text-white">Financial Modeling Q&amp;A</h4>
                                        <span className="text-xs text-green-400 bg-green-400/20 px-2 py-1 rounded">Available</span>
                                    </div>
                                    <p className="text-gray-400 text-sm mb-2">Dec 18, 2024 - 4:00 PM</p>
                                    <p className="text-gray-500 text-xs mb-3">30 minutes • Online</p>
                                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm transition-colors">
                                        Mark Interest
                                    </button>
                                </div>

                                <div className="bg-dark-primary rounded-lg p-4 border border-dark-border">
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="font-semibold text-white">Investment Strategy Workshop</h4>
                                        <span className="text-xs text-red-400 bg-red-400/20 px-2 py-1 rounded">Full</span>
                                    </div>
                                    <p className="text-gray-400 text-sm mb-2">Dec 20, 2024 - 1:00 PM</p>
                                    <p className="text-gray-500 text-xs mb-3">60 minutes • Online</p>
                                    <button disabled className="w-full bg-gray-600 text-gray-400 py-2 rounded-lg text-sm cursor-not-allowed">
                                        Fully Booked
                                    </button>
                                </div>
                            </div>
                        </section>

                        <section id="quick-stats" className="bg-dark-secondary rounded-xl p-6 border border-dark-border">
                            <h2 className="text-xl font-bold text-white mb-4">Quick Stats</h2>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-400">Total Students</span>
                                    <span className="text-white font-semibold">1,247</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-400">Average Rating</span>
                                    <span className="text-white font-semibold">4.8/5</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-400">Response Rate</span>
                                    <span className="text-white font-semibold">98%</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-400">Experience</span>
                                    <span className="text-white font-semibold">15+ years</span>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </main>

            <footer id="footer" className="bg-dark-secondary border-t border-dark-border py-12 mt-12">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="col-span-1 md:col-span-2">
                            <div className="flex items-center space-x-2 mb-4">
                                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                    <FaGraduationCap className="text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-white">MenaFina</h3>
                            </div>
                            <p className="text-gray-400 mb-4 max-w-md">
                                Empowering the next generation of financial professionals through innovative education and technology.
                            </p>
                            <div className="flex space-x-4">
                                <button className="text-gray-400 hover:text-blue-400 transition-colors">
                                    <FaTwitter className="text-xl" />
                                </button>
                                <button className="text-gray-400 hover:text-blue-400 transition-colors">
                                    <FaLinkedin className="text-xl" />
                                </button>
                                <button className="text-gray-400 hover:text-blue-400 transition-colors">
                                    <FaFacebook className="text-xl" />
                                </button>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
                            <ul className="space-y-2">
                                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Courses</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Professors</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-white font-semibold mb-4">Support</h4>
                            <ul className="space-y-2">
                                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">FAQ</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-dark-border mt-8 pt-8 text-center">
                        <p className="text-gray-400">© 2024 MenaFina. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
