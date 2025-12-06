import { FaGraduationCap, FaTwitter, FaLinkedin, FaFacebook } from 'react-icons/fa6';

export default function Footer() {
    return (
        <footer id="footer" className="bg-dark-secondary border-t border-dark-border py-12">
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
                            <button className="text-gray-400 hover:text-blue-400 transition-colors cursor-pointer">
                                <FaTwitter className="text-xl" />
                            </button>
                            <button className="text-gray-400 hover:text-blue-400 transition-colors cursor-pointer">
                                <FaLinkedin className="text-xl" />
                            </button>
                            <button className="text-gray-400 hover:text-blue-400 transition-colors cursor-pointer">
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
    );
}
