'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
    FaUserLock,
    FaChalkboardUser,
    FaUserGraduate,
    FaEnvelope,
    FaLock,
    FaEye,
    FaEyeSlash,
    FaArrowRight,
    FaGoogle,
    FaMicrosoft,
    FaShieldHalved
} from 'react-icons/fa6';

import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

export default function LoginForm() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const result = await signIn('credentials', {
                email,
                password,
                redirect: false,
            });

            if (result?.error) {
                alert('Invalid credentials');
                setLoading(false);
            } else {
                router.push('/');
                router.refresh();
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('An error occurred during login');
            setLoading(false);
        }
    };

    return (
        <div className="relative z-10 w-full max-w-md mx-auto px-6">
            <div id="login-card" className="bg-dark-secondary rounded-2xl border border-dark-border shadow-2xl p-8">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <FaUserLock className="text-white text-2xl" />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
                    <p className="text-gray-400">Sign in to access your account</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div id="email-field">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
                            <FaEnvelope className="mr-2" />
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="your.email@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 bg-dark-primary border border-dark-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                            required
                        />
                    </div>

                    <div id="password-field">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
                            <FaLock className="mr-2" />
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 bg-dark-primary border border-dark-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all pr-12"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors cursor-pointer"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>

                    <div id="remember-forgot" className="flex items-center justify-between">
                        <label className="flex items-center space-x-2 cursor-pointer group">
                            <input type="checkbox" className="w-4 h-4 rounded border-dark-border bg-dark-primary text-blue-500 focus:ring-2 focus:ring-blue-500/20" />
                            <span className="text-sm text-gray-400 group-hover:text-white transition-colors">Remember me</span>
                        </label>
                        <a href="#" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                            Forgot password?
                        </a>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 cursor-pointer"
                    >
                        <span>Sign In</span>
                        <FaArrowRight />
                    </button>
                </form>

                <div id="divider" className="relative my-8">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-dark-border"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-dark-secondary text-gray-400">Or continue with</span>
                    </div>
                </div>

                <div id="social-login" className="grid grid-cols-2 gap-4">
                    <button className="flex items-center justify-center space-x-2 py-3 px-4 bg-dark-primary border border-dark-border rounded-lg hover:border-gray-500 hover:bg-dark-muted transition-all group cursor-pointer">
                        <FaGoogle className="text-gray-400 group-hover:text-white transition-colors" />
                        <span className="text-gray-400 group-hover:text-white transition-colors font-medium">Google</span>
                    </button>
                    <button className="flex items-center justify-center space-x-2 py-3 px-4 bg-dark-primary border border-dark-border rounded-lg hover:border-gray-500 hover:bg-dark-muted transition-all group cursor-pointer">
                        <FaMicrosoft className="text-gray-400 group-hover:text-white transition-colors" />
                        <span className="text-gray-400 group-hover:text-white transition-colors font-medium">Microsoft</span>
                    </button>
                </div>

                <div className="mt-8 text-center">
                    <p className="text-gray-400">
                        Don't have an account?
                        <Link href="/register" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors ml-1">
                            Register now
                        </Link>
                    </p>
                </div>
            </div>

            <div className="mt-6 text-center">
                <div className="flex items-center justify-center space-x-2 text-gray-500 text-sm">
                    <FaShieldHalved />
                    <span>Your data is secure and encrypted</span>
                </div>
            </div>
        </div>
    );
}
