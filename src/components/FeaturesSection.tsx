import Link from 'next/link';
import { FaRobot, FaChartLine, FaUsers, FaCalendarCheck } from 'react-icons/fa6';

export default function FeaturesSection() {
    return (
        <section id="features-section" className="py-20 bg-dark-secondary">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-white mb-6">Discover Our Features</h2>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        Explore the comprehensive tools and resources designed to enhance your financial education experience.
                    </p>
                </div>

                <div id="features-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <Link href="/chatbot" className="block bg-dark-primary rounded-xl p-8 border border-dark-border hover:border-blue-500/50 transition-all duration-300 group cursor-pointer hover:shadow-lg hover:shadow-blue-500/10">
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <FaRobot className="text-white text-2xl" />
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-4">AI Chatbot</h3>
                        <p className="text-gray-400 leading-relaxed">
                            Get instant answers to your financial questions with our intelligent AI assistant.
                        </p>
                    </Link>

                    <Link href="/simulator" className="block bg-dark-primary rounded-xl p-8 border border-dark-border hover:border-purple-500/50 transition-all duration-300 group cursor-pointer hover:shadow-lg hover:shadow-purple-500/10">
                        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <FaChartLine className="text-white text-2xl" />
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-4">Investment Simulator</h3>
                        <p className="text-gray-400 leading-relaxed">
                            Practice investment decisions in a risk-free simulated environment.
                        </p>
                    </Link>

                    <Link href="/prof-student-space" className="block bg-dark-primary rounded-xl p-8 border border-dark-border hover:border-green-500/50 transition-all duration-300 group cursor-pointer hover:shadow-lg hover:shadow-green-500/10">
                        <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <FaUsers className="text-white text-2xl" />
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-4">Prof-Student Space</h3>
                        <p className="text-gray-400 leading-relaxed">
                            Connect with professors and access exclusive courses and tutorials.
                        </p>
                    </Link>

                    <Link href="/account" className="block bg-dark-primary rounded-xl p-8 border border-dark-border hover:border-green-500/50 transition-all duration-300 group cursor-pointer hover:shadow-lg hover:shadow-green-500/10">
                        <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <FaCalendarCheck className="text-white text-2xl" />
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-4">Account Management</h3>
                        <p className="text-gray-400 leading-relaxed">
                            Manage your profile, schedule meetings, and track your progress.
                        </p>
                    </Link>
                </div>
            </div>
        </section>
    );
}
