'use client';

import Header from '@/components/Header';
import Link from 'next/link';
import Image from 'next/image';
import {
    FaGraduationCap,
    FaRobot,
    FaChartLine,
    FaUsers,
    FaCircleUser,
    FaBell,
    FaGear,
    FaFilter,
    FaSort,
    FaMagnifyingGlass,
    FaStar,
    FaBook,
    FaUserPlus,
    FaClock,
    FaSignal,
    FaCircle,
    FaArrowRight
} from 'react-icons/fa6';

export default function ProfStudentSpacePage() {
    return (
        <div className="bg-dark-primary text-white font-inter min-h-screen flex flex-col">
            <Header />

            <main id="main-content" className="max-w-7xl mx-auto px-6 py-8 w-full flex-grow">
                <section id="page-header" className="mb-8">
                    <div className="flex flex-col md:flex-row items-center justify-between mb-6 space-y-4 md:space-y-0">
                        <div>
                            <h1 className="text-4xl font-bold text-white mb-2">Prof-Student Space</h1>
                            <p className="text-gray-400 text-lg">Explore courses, tutorials, and connect with expert professors</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button className="bg-dark-secondary hover:bg-dark-muted border border-dark-border text-white px-4 py-2 rounded-lg transition-colors flex items-center">
                                <FaFilter className="mr-2" />Filter
                            </button>
                            <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-2 rounded-lg transition-all flex items-center">
                                <FaSort className="mr-2" />Sort By
                            </button>
                        </div>
                    </div>

                    <div id="search-bar" className="relative">
                        <input type="text" placeholder="Search professors, courses, or topics..." className="w-full bg-dark-secondary border border-dark-border rounded-xl px-6 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors" />
                        <button className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors">
                            <FaMagnifyingGlass className="text-xl" />
                        </button>
                    </div>
                </section>

                <section id="filters-section" className="mb-8">
                    <div className="flex items-center space-x-4 overflow-x-auto pb-2 scrollbar-hide">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg whitespace-nowrap transition-colors">
                            All Professors
                        </button>
                        <button className="bg-dark-secondary hover:bg-dark-muted border border-dark-border text-gray-300 px-6 py-2 rounded-lg whitespace-nowrap transition-colors">
                            Financial Analysis
                        </button>
                        <button className="bg-dark-secondary hover:bg-dark-muted border border-dark-border text-gray-300 px-6 py-2 rounded-lg whitespace-nowrap transition-colors">
                            Investment Strategy
                        </button>
                        <button className="bg-dark-secondary hover:bg-dark-muted border border-dark-border text-gray-300 px-6 py-2 rounded-lg whitespace-nowrap transition-colors">
                            Risk Management
                        </button>
                        <button className="bg-dark-secondary hover:bg-dark-muted border border-dark-border text-gray-300 px-6 py-2 rounded-lg whitespace-nowrap transition-colors">
                            Portfolio Management
                        </button>
                        <button className="bg-dark-secondary hover:bg-dark-muted border border-dark-border text-gray-300 px-6 py-2 rounded-lg whitespace-nowrap transition-colors">
                            Corporate Finance
                        </button>
                    </div>
                </section>

                <section id="professors-grid" className="grid grid-cols-1 gap-6">
                    {/* Professor Card 1 */}
                    <div id="professor-card-1" className="bg-dark-secondary rounded-xl border border-dark-border hover:border-blue-500/50 transition-all duration-300">
                        <div className="p-6">
                            <div className="flex flex-col md:flex-row items-start justify-between mb-6 space-y-4 md:space-y-0">
                                <div className="flex items-start space-x-4">
                                    <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-blue-500 flex-shrink-0 bg-gray-600">
                                        <Image
                                            src="https://ui-avatars.com/api/?name=Michael+Anderson&size=150&background=2563eb&color=fff&bold=true"
                                            alt="Dr. Michael Anderson"
                                            width={80}
                                            height={80}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-white mb-1">Dr. Michael Anderson</h3>
                                        <p className="text-gray-400 mb-2">Professor of Financial Analysis</p>
                                        <div className="flex items-center space-x-4 text-sm flex-wrap gap-y-2">
                                            <div className="flex items-center text-yellow-400">
                                                <FaStar className="mr-1" />
                                                <span className="font-semibold">4.8</span>
                                                <span className="text-gray-500 ml-1">(156 ratings)</span>
                                            </div>
                                            <div className="flex items-center text-gray-400">
                                                <FaBook className="mr-1" />
                                                <span>12 Courses</span>
                                            </div>
                                            <div className="flex items-center text-gray-400">
                                                <FaUsers className="mr-1" />
                                                <span>1,240 Students</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <Link href="/professor-profile" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-2 rounded-lg transition-all flex items-center whitespace-nowrap">
                                    <FaUserPlus className="mr-2" />View Profile
                                </Link>
                            </div>

                            <div id="courses-list-1" className="space-y-4">
                                <div className="bg-dark-primary rounded-lg p-4 border border-dark-border hover:border-blue-500/30 transition-colors">
                                    <div className="flex flex-col sm:flex-row items-start justify-between space-y-4 sm:space-y-0">
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-3 mb-2">
                                                <h4 className="text-lg font-semibold text-white">Advanced Financial Modeling</h4>
                                                <span className="bg-blue-600/20 text-blue-400 text-xs px-3 py-1 rounded-full">Course</span>
                                            </div>
                                            <p className="text-gray-400 text-sm mb-3">Master the art of building sophisticated financial models for investment analysis and corporate valuation.</p>
                                            <div className="flex items-center space-x-6 text-sm flex-wrap gap-y-2">
                                                <div className="flex items-center text-yellow-400">
                                                    <FaStar className="mr-1" />
                                                    <span className="font-semibold">4.9</span>
                                                    <span className="text-gray-500 ml-1">(87)</span>
                                                </div>
                                                <div className="flex items-center text-gray-400">
                                                    <FaClock className="mr-1" />
                                                    <span>8 weeks</span>
                                                </div>
                                                <div className="flex items-center text-gray-400">
                                                    <FaSignal className="mr-1" />
                                                    <span>Advanced</span>
                                                </div>
                                                <div className="flex items-center text-green-400">
                                                    <FaCircle className="mr-1 text-xs" />
                                                    <span>Enrolling Now</span>
                                                </div>
                                            </div>
                                        </div>
                                        <button className="sm:ml-4 bg-dark-secondary hover:bg-dark-muted border border-dark-border text-white px-4 py-2 rounded-lg transition-colors flex-shrink-0">
                                            <FaArrowRight />
                                        </button>
                                    </div>
                                </div>

                                <div className="bg-dark-primary rounded-lg p-4 border border-dark-border hover:border-purple-500/30 transition-colors">
                                    <div className="flex flex-col sm:flex-row items-start justify-between space-y-4 sm:space-y-0">
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-3 mb-2">
                                                <h4 className="text-lg font-semibold text-white">DCF Valuation Techniques</h4>
                                                <span className="bg-purple-600/20 text-purple-400 text-xs px-3 py-1 rounded-full">Tutorial</span>
                                            </div>
                                            <p className="text-gray-400 text-sm mb-3">Learn practical DCF valuation methods with real-world examples and case studies.</p>
                                            <div className="flex items-center space-x-6 text-sm flex-wrap gap-y-2">
                                                <div className="flex items-center text-yellow-400">
                                                    <FaStar className="mr-1" />
                                                    <span className="font-semibold">4.7</span>
                                                    <span className="text-gray-500 ml-1">(43)</span>
                                                </div>
                                                <div className="flex items-center text-gray-400">
                                                    <FaClock className="mr-1" />
                                                    <span>2 hours</span>
                                                </div>
                                                <div className="flex items-center text-gray-400">
                                                    <FaSignal className="mr-1" />
                                                    <span>Intermediate</span>
                                                </div>
                                                <div className="flex items-center text-green-400">
                                                    <FaCircle className="mr-1 text-xs" />
                                                    <span>Available</span>
                                                </div>
                                            </div>
                                        </div>
                                        <button className="sm:ml-4 bg-dark-secondary hover:bg-dark-muted border border-dark-border text-white px-4 py-2 rounded-lg transition-colors flex-shrink-0">
                                            <FaArrowRight />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Professor Card 2 */}
                    <div id="professor-card-2" className="bg-dark-secondary rounded-xl border border-dark-border hover:border-blue-500/50 transition-all duration-300">
                        <div className="p-6">
                            <div className="flex flex-col md:flex-row items-start justify-between mb-6 space-y-4 md:space-y-0">
                                <div className="flex items-start space-x-4">
                                    <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-purple-500 flex-shrink-0 bg-gray-600">
                                        <Image
                                            src="https://ui-avatars.com/api/?name=Sarah+Mitchell&size=150&background=9333ea&color=fff&bold=true"
                                            alt="Dr. Sarah Mitchell"
                                            width={80}
                                            height={80}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-white mb-1">Dr. Sarah Mitchell</h3>
                                        <p className="text-gray-400 mb-2">Professor of Investment Strategy</p>
                                        <div className="flex items-center space-x-4 text-sm flex-wrap gap-y-2">
                                            <div className="flex items-center text-yellow-400">
                                                <FaStar className="mr-1" />
                                                <span className="font-semibold">4.9</span>
                                                <span className="text-gray-500 ml-1">(203 ratings)</span>
                                            </div>
                                            <div className="flex items-center text-gray-400">
                                                <FaBook className="mr-1" />
                                                <span>15 Courses</span>
                                            </div>
                                            <div className="flex items-center text-gray-400">
                                                <FaUsers className="mr-1" />
                                                <span>2,180 Students</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <Link href="/professor-profile" className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-6 py-2 rounded-lg transition-all flex items-center whitespace-nowrap">
                                    <FaUserPlus className="mr-2" />View Profile
                                </Link>
                            </div>

                            <div id="courses-list-2" className="space-y-4">
                                <div className="bg-dark-primary rounded-lg p-4 border border-dark-border hover:border-blue-500/30 transition-colors">
                                    <div className="flex flex-col sm:flex-row items-start justify-between space-y-4 sm:space-y-0">
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-3 mb-2">
                                                <h4 className="text-lg font-semibold text-white">Portfolio Optimization Strategies</h4>
                                                <span className="bg-blue-600/20 text-blue-400 text-xs px-3 py-1 rounded-full">Course</span>
                                            </div>
                                            <p className="text-gray-400 text-sm mb-3">Build and optimize investment portfolios using modern portfolio theory and quantitative methods.</p>
                                            <div className="flex items-center space-x-6 text-sm flex-wrap gap-y-2">
                                                <div className="flex items-center text-yellow-400">
                                                    <FaStar className="mr-1" />
                                                    <span className="font-semibold">5.0</span>
                                                    <span className="text-gray-500 ml-1">(124)</span>
                                                </div>
                                                <div className="flex items-center text-gray-400">
                                                    <FaClock className="mr-1" />
                                                    <span>10 weeks</span>
                                                </div>
                                                <div className="flex items-center text-gray-400">
                                                    <FaSignal className="mr-1" />
                                                    <span>Advanced</span>
                                                </div>
                                                <div className="flex items-center text-green-400">
                                                    <FaCircle className="mr-1 text-xs" />
                                                    <span>Enrolling Now</span>
                                                </div>
                                            </div>
                                        </div>
                                        <button className="sm:ml-4 bg-dark-secondary hover:bg-dark-muted border border-dark-border text-white px-4 py-2 rounded-lg transition-colors flex-shrink-0">
                                            <FaArrowRight />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Professor Card 3 */}
                    <div id="professor-card-3" className="bg-dark-secondary rounded-xl border border-dark-border hover:border-blue-500/50 transition-all duration-300">
                        <div className="p-6">
                            <div className="flex flex-col md:flex-row items-start justify-between mb-6 space-y-4 md:space-y-0">
                                <div className="flex items-start space-x-4">
                                    <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-green-500 flex-shrink-0 bg-gray-600">
                                        <Image
                                            src="https://ui-avatars.com/api/?name=James+Thompson&size=150&background=16a34a&color=fff&bold=true"
                                            alt="Dr. James Thompson"
                                            width={80}
                                            height={80}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-white mb-1">Dr. James Thompson</h3>
                                        <p className="text-gray-400 mb-2">Professor of Risk Management</p>
                                        <div className="flex items-center space-x-4 text-sm flex-wrap gap-y-2">
                                            <div className="flex items-center text-yellow-400">
                                                <FaStar className="mr-1" />
                                                <span className="font-semibold">4.7</span>
                                                <span className="text-gray-500 ml-1">(134 ratings)</span>
                                            </div>
                                            <div className="flex items-center text-gray-400">
                                                <FaBook className="mr-1" />
                                                <span>9 Courses</span>
                                            </div>
                                            <div className="flex items-center text-gray-400">
                                                <FaUsers className="mr-1" />
                                                <span>980 Students</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <Link href="/professor-profile" className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 py-2 rounded-lg transition-all flex items-center whitespace-nowrap">
                                    <FaUserPlus className="mr-2" />View Profile
                                </Link>
                            </div>

                            <div id="courses-list-3" className="space-y-4">
                                <div className="bg-dark-primary rounded-lg p-4 border border-dark-border hover:border-blue-500/30 transition-colors">
                                    <div className="flex flex-col sm:flex-row items-start justify-between space-y-4 sm:space-y-0">
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-3 mb-2">
                                                <h4 className="text-lg font-semibold text-white">Enterprise Risk Management</h4>
                                                <span className="bg-blue-600/20 text-blue-400 text-xs px-3 py-1 rounded-full">Course</span>
                                            </div>
                                            <p className="text-gray-400 text-sm mb-3">Comprehensive framework for identifying, assessing, and managing enterprise-wide risks.</p>
                                            <div className="flex items-center space-x-6 text-sm flex-wrap gap-y-2">
                                                <div className="flex items-center text-yellow-400">
                                                    <FaStar className="mr-1" />
                                                    <span className="font-semibold">4.8</span>
                                                    <span className="text-gray-500 ml-1">(76)</span>
                                                </div>
                                                <div className="flex items-center text-gray-400">
                                                    <FaClock className="mr-1" />
                                                    <span>7 weeks</span>
                                                </div>
                                                <div className="flex items-center text-gray-400">
                                                    <FaSignal className="mr-1" />
                                                    <span>Advanced</span>
                                                </div>
                                                <div className="flex items-center text-green-400">
                                                    <FaCircle className="mr-1 text-xs" />
                                                    <span>Available</span>
                                                </div>
                                            </div>
                                        </div>
                                        <button className="sm:ml-4 bg-dark-secondary hover:bg-dark-muted border border-dark-border text-white px-4 py-2 rounded-lg transition-colors flex-shrink-0">
                                            <FaArrowRight />
                                        </button>
                                    </div>
                                </div>

                                <div className="bg-dark-primary rounded-lg p-4 border border-dark-border hover:border-purple-500/30 transition-colors">
                                    <div className="flex flex-col sm:flex-row items-start justify-between space-y-4 sm:space-y-0">
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-3 mb-2">
                                                <h4 className="text-lg font-semibold text-white">Derivatives and Hedging Strategies</h4>
                                                <span className="bg-purple-600/20 text-purple-400 text-xs px-3 py-1 rounded-full">Tutorial</span>
                                            </div>
                                            <p className="text-gray-400 text-sm mb-3">Learn how to use derivatives for hedging and risk mitigation in investment portfolios.</p>
                                            <div className="flex items-center space-x-6 text-sm flex-wrap gap-y-2">
                                                <div className="flex items-center text-yellow-400">
                                                    <FaStar className="mr-1" />
                                                    <span className="font-semibold">4.6</span>
                                                    <span className="text-gray-500 ml-1">(51)</span>
                                                </div>
                                                <div className="flex items-center text-gray-400">
                                                    <FaClock className="mr-1" />
                                                    <span>3 hours</span>
                                                </div>
                                                <div className="flex items-center text-gray-400">
                                                    <FaSignal className="mr-1" />
                                                    <span>Advanced</span>
                                                </div>
                                                <div className="flex items-center text-green-400">
                                                    <FaCircle className="mr-1 text-xs" />
                                                    <span>Available</span>
                                                </div>
                                            </div>
                                        </div>
                                        <button className="sm:ml-4 bg-dark-secondary hover:bg-dark-muted border border-dark-border text-white px-4 py-2 rounded-lg transition-colors flex-shrink-0">
                                            <FaArrowRight />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
