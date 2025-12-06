'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    FaGraduationCap,
    FaHouse,
    FaCircleQuestion,
    FaUserPlus,
    FaUserGraduate,
    FaChalkboardUser,
    FaEnvelope,
    FaLock,
    FaEye,
    FaEyeSlash,
    FaBuildingColumns,
    FaCircleExclamation
} from 'react-icons/fa6';
import Header from '@/components/Header';

export default function RegisterPage() {
    const router = useRouter();
    const [role, setRole] = useState<'student' | 'professor'>('student');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        university: '',
        specialization: '',
        terms: false
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;

        setError(null); // Clear error when user starts typing
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleRoleChange = (selectedRole: 'student' | 'professor') => {
        setRole(selectedRole);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match!');
            setLoading(false);
            return;
        }

        if (formData.password.length < 8) {
            setError('Password must be at least 8 characters long!');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    password: formData.password,
                    role: role,
                    university: formData.university,
                    specialization: formData.specialization,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error || 'Registration failed');
                setLoading(false);
                return;
            }

            // Redirect to login page after successful registration
            router.push('/login');
        } catch (error) {
            console.error('Registration error:', error);
            setError('An error occurred during registration');
            setLoading(false);
        }
    };

    return (
        <div className="bg-dark-primary text-white font-inter min-h-screen flex flex-col">
            <Header />

            <main id="main-content" className="flex-grow min-h-[800px] flex items-center justify-center bg-gradient-to-br from-dark-primary via-dark-secondary to-dark-primary relative overflow-hidden py-12">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-600/5 pointer-events-none"></div>
                <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>

                <div id="registration-container" className="relative z-10 w-full max-w-md mx-auto px-6">
                    <div className="bg-dark-secondary rounded-2xl border border-dark-border p-8 shadow-2xl">
                        <div id="form-header" className="text-center mb-8">
                            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <FaUserPlus className="text-white text-2xl" />
                            </div>
                            <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
                            <p className="text-gray-400">Join MenaFina and start your learning journey</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Error Message Display */}
                            {error && (
                                <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 flex items-start space-x-3">
                                    <FaCircleExclamation className="text-red-500 text-xl flex-shrink-0 mt-0.5" />
                                    <p className="text-red-400 text-sm flex-1">{error}</p>
                                </div>
                            )}

                            <div id="role-selection" className="mb-6">
                                <label className="block text-sm font-medium text-gray-300 mb-3">I am a:</label>
                                <div className="grid grid-cols-2 gap-3">
                                    <label className="relative cursor-pointer" onClick={() => handleRoleChange('student')}>
                                        <input
                                            type="radio"
                                            name="role"
                                            value="student"
                                            className="sr-only peer"
                                            checked={role === 'student'}
                                            onChange={() => handleRoleChange('student')}
                                        />
                                        <div className={`bg-dark-primary border-2 ${role === 'student' ? 'border-purple-500 bg-purple-500/10' : 'border-dark-border'} rounded-lg p-4 text-center transition-all duration-200 hover:border-purple-400`}>
                                            <FaUserGraduate className={`text-xl mb-2 block mx-auto ${role === 'student' ? 'text-purple-400' : 'text-gray-500'}`} />
                                            <span className="text-sm font-medium text-white">Student</span>
                                        </div>
                                    </label>
                                    <label className="relative cursor-pointer" onClick={() => handleRoleChange('professor')}>
                                        <input
                                            type="radio"
                                            name="role"
                                            value="professor"
                                            className="sr-only peer"
                                            checked={role === 'professor'}
                                            onChange={() => handleRoleChange('professor')}
                                        />
                                        <div className={`bg-dark-primary border-2 ${role === 'professor' ? 'border-blue-500 bg-blue-500/10' : 'border-dark-border'} rounded-lg p-4 text-center transition-all duration-200 hover:border-blue-400`}>
                                            <FaChalkboardUser className={`text-xl mb-2 block mx-auto ${role === 'professor' ? 'text-blue-400' : 'text-gray-500'}`} />
                                            <span className="text-sm font-medium text-white">Professor</span>
                                        </div>
                                    </label>
                                </div>
                            </div>

                            <div id="personal-info" className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-2">First Name</label>
                                        <input
                                            type="text"
                                            id="firstName"
                                            name="firstName"
                                            required
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            className="w-full bg-dark-primary border border-dark-border rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-2">Last Name</label>
                                        <input
                                            type="text"
                                            id="lastName"
                                            name="lastName"
                                            required
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            className="w-full bg-dark-primary border border-dark-border rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none transition-colors"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FaEnvelope className="text-gray-500" />
                                        </div>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            className={`w-full bg-dark-primary border rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none transition-colors ${
                                                error ? 'border-red-500/50 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' : 'border-dark-border focus:border-blue-500'
                                            }`}
                                            placeholder="your.email@example.com"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FaLock className="text-gray-500" />
                                        </div>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            id="password"
                                            name="password"
                                            required
                                            value={formData.password}
                                            onChange={handleChange}
                                            className={`w-full bg-dark-primary border rounded-lg pl-10 pr-12 py-3 text-white placeholder-gray-500 focus:outline-none transition-colors ${
                                                error ? 'border-red-500/50 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' : 'border-dark-border focus:border-blue-500'
                                            }`}
                                            placeholder="Create a strong password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-300"
                                        >
                                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">Confirm Password</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FaLock className="text-gray-500" />
                                        </div>
                                        <input
                                            type={showConfirmPassword ? "text" : "password"}
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            required
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            className={`w-full bg-dark-primary border rounded-lg pl-10 pr-12 py-3 text-white placeholder-gray-500 focus:outline-none transition-colors ${
                                                error ? 'border-red-500/50 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' : 'border-dark-border focus:border-blue-500'
                                            }`}
                                            placeholder="Confirm your password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-300"
                                        >
                                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                        </button>
                                    </div>
                                </div>

                                <div id="university-field">
                                    <label htmlFor="university" className="block text-sm font-medium text-gray-300 mb-2">University/Institution</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FaBuildingColumns className="text-gray-500" />
                                        </div>
                                        <input
                                            type="text"
                                            id="university"
                                            name="university"
                                            value={formData.university}
                                            onChange={handleChange}
                                            className="w-full bg-dark-primary border border-dark-border rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none transition-colors"
                                            placeholder="Your university or institution"
                                        />
                                    </div>
                                </div>

                                {role === 'professor' && (
                                    <div id="specialization-field" className="animate-fade-in">
                                        <label htmlFor="specialization" className="block text-sm font-medium text-gray-300 mb-2">Specialization</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <FaGraduationCap className="text-gray-500" />
                                            </div>
                                            <select
                                                id="specialization"
                                                name="specialization"
                                                required
                                                value={formData.specialization}
                                                onChange={handleChange}
                                                className="w-full bg-dark-primary border border-dark-border rounded-lg pl-10 pr-4 py-3 text-white focus:border-blue-500 focus:outline-none transition-colors appearance-none"
                                            >
                                                <option value="">Select your specialization</option>
                                                <option value="finance">Finance</option>
                                                <option value="economics">Economics</option>
                                                <option value="accounting">Accounting</option>
                                                <option value="business">Business Administration</option>
                                                <option value="investment">Investment Management</option>
                                                <option value="other">Other</option>
                                            </select>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div id="terms-section" className="flex items-start space-x-3">
                                <input
                                    type="checkbox"
                                    id="terms"
                                    name="terms"
                                    required
                                    checked={formData.terms}
                                    onChange={handleChange}
                                    className="mt-1 w-4 h-4 bg-dark-primary border border-dark-border rounded focus:ring-blue-500 focus:ring-2"
                                />
                                <label htmlFor="terms" className="text-sm text-gray-300">
                                    I agree to the <a href="#" className="text-blue-400 hover:text-blue-300 underline">Terms of Service</a> and <a href="#" className="text-blue-400 hover:text-blue-300 underline">Privacy Policy</a>
                                </label>
                            </div>

                            <button 
                                type="submit" 
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                            >
                                <FaUserPlus className="mr-2" />
                                {loading ? 'Creating Account...' : 'Create Account'}
                            </button>
                        </form>

                        <div id="login-link" className="mt-6 text-center">
                            <p className="text-gray-400">
                                Already have an account?{' '}
                                <Link href="/login" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
                                    Sign in here
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            <footer id="footer" className="bg-dark-secondary border-t border-dark-border py-8">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div className="flex items-center space-x-2 mb-4 md:mb-0">
                            <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded flex items-center justify-center">
                                <FaGraduationCap className="text-white text-sm" />
                            </div>
                            <span className="text-white font-semibold">MenaFina</span>
                        </div>
                        <p className="text-gray-400 text-sm">© 2024 MenaFina. All rights reserved.</p>
                        <div className="flex space-x-4 mt-4 md:mt-0">
                            <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Privacy</a>
                            <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Terms</a>
                            <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Support</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
