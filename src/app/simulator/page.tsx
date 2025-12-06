'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    FaChartLine,
    FaBuilding,
    FaMagnifyingGlass,
    FaCheck,
    FaXmark,
    FaArrowRotateRight,
    FaFloppyDisk,
    FaClockRotateLeft,
    FaArrowLeft,
    FaCircleUser,
    FaGraduationCap,
    FaRobot,
    FaUsers,
    FaBell,
    FaGear
} from 'react-icons/fa6';
import Header from '@/components/Header';

interface AnalysisResult {
    invest: boolean;
    analysis: string;
    confidence: number;
    growth: string;
    risk: string;
}

interface RecentAnalysis {
    id: string;
    company: string;
    invest: boolean;
    time: string;
    timestamp: number;
    confidence?: number;
    growth?: string;
    risk?: string;
}

function getTimeAgo(timestamp: number): string {
    const now = Date.now();
    const diff = now - timestamp;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) return 'Just now';
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (days < 7) return `${days} day${days > 1 ? 's' : ''} ago`;
    return new Date(timestamp).toLocaleDateString();
}

export default function SimulatorPage() {
    const [companyName, setCompanyName] = useState('');
    const [result, setResult] = useState<AnalysisResult | null>(null);
    const [recentAnalyses, setRecentAnalyses] = useState<RecentAnalysis[]>([]);
    const [savedMessage, setSavedMessage] = useState<string | null>(null);

    // Load saved analyses from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem('menafina_saved_analyses');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                // Update time strings for loaded analyses
                const updated = parsed.map((analysis: RecentAnalysis) => ({
                    ...analysis,
                    time: getTimeAgo(analysis.timestamp),
                }));
                setRecentAnalyses(updated);
            } catch (e) {
                console.error('Error loading saved analyses:', e);
            }
        } else {
            // Default mock data if no saved analyses
            const defaultAnalyses: RecentAnalysis[] = [
                { id: '1', company: 'Apple Inc.', invest: true, time: '2 hours ago', timestamp: Date.now() - 7200000 },
                { id: '2', company: 'GameStop Corp.', invest: false, time: '1 day ago', timestamp: Date.now() - 86400000 },
                { id: '3', company: 'Microsoft Corp.', invest: true, time: '3 days ago', timestamp: Date.now() - 259200000 },
            ];
            setRecentAnalyses(defaultAnalyses);
        }
    }, []);

    // Update time strings periodically
    useEffect(() => {
        const interval = setInterval(() => {
            setRecentAnalyses(prev => prev.map(analysis => ({
                ...analysis,
                time: getTimeAgo(analysis.timestamp),
            })));
        }, 60000); // Update every minute

        return () => clearInterval(interval);
    }, []);

    const analyzeCompany = () => {
        if (!companyName.trim()) {
            alert('Please enter a company name');
            return;
        }

        const companies: Record<string, AnalysisResult> = {
            'apple': { invest: true, analysis: 'Apple shows exceptional financial health with strong revenue growth, innovative product pipeline, and dominant market position in premium consumer electronics.', confidence: 85, growth: 'High', risk: 'Low' },
            'microsoft': { invest: true, analysis: 'Microsoft demonstrates robust cloud growth, diversified revenue streams, and strong enterprise market presence with Azure and Office 365.', confidence: 88, growth: 'High', risk: 'Low' },
            'tesla': { invest: true, analysis: 'Tesla leads electric vehicle innovation with expanding global production capacity and growing energy storage business.', confidence: 75, growth: 'Very High', risk: 'High' },
            'gamestop': { invest: false, analysis: 'GameStop faces declining retail gaming market, high debt levels, and uncertain transformation strategy.', confidence: 35, growth: 'Low', risk: 'High' },
            'blockbuster': { invest: false, analysis: 'Blockbuster represents outdated business model with no viable path to profitability in current market conditions.', confidence: 99, growth: 'None', risk: 'Extreme' },
            'netflix': { invest: true, analysis: 'Netflix maintains streaming leadership with global content strategy and strong subscriber base growth.', confidence: 80, growth: 'Medium', risk: 'Medium' }
        };

        const randomResult: AnalysisResult = Math.random() > 0.6
            ? { invest: true, analysis: `${companyName} shows promising fundamentals based on recent market performance and growth indicators.`, confidence: Math.floor(Math.random() * 20) + 70, growth: 'High', risk: 'Medium' }
            : { invest: false, analysis: `${companyName} presents several risk factors that suggest caution in current market conditions.`, confidence: Math.floor(Math.random() * 30) + 40, growth: 'Low', risk: 'High' };

        const analysis = companies[companyName.toLowerCase()] || randomResult;

        setResult(analysis);

        // Scroll to result
        setTimeout(() => {
            document.getElementById('analysis-result')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };

    const resetAnalysis = () => {
        setCompanyName('');
        setResult(null);
        document.getElementById('companyName')?.focus();
    };

    const saveAnalysis = () => {
        if (!result || !companyName.trim()) {
            return;
        }

        const timestamp = Date.now();
        const newAnalysis: RecentAnalysis = {
            id: `analysis_${timestamp}`,
            company: companyName.trim(),
            invest: result.invest,
            time: 'Just now',
            timestamp: timestamp,
            confidence: result.confidence,
            growth: result.growth,
            risk: result.risk,
        };

        // Add to recent analyses at the top
        setRecentAnalyses(prev => {
            // Check if this company was already analyzed recently
            const filtered = prev.filter(item => item.company.toLowerCase() !== companyName.toLowerCase());
            const updated = [newAnalysis, ...filtered].slice(0, 10); // Keep max 10 analyses
            
            // Save to localStorage
            localStorage.setItem('menafina_saved_analyses', JSON.stringify(updated));
            
            return updated;
        });

        // Show success message
        setSavedMessage('Analysis saved successfully!');
        setTimeout(() => {
            setSavedMessage(null);
        }, 3000);

        // Scroll to recent analyses section
        setTimeout(() => {
            document.getElementById('recent-analyses')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            analyzeCompany();
        }
    };

    return (
        <div className="min-h-screen bg-dark-primary text-white font-inter">
            {/* Header specifically for Simulator */}
            <Header />

            <main className="relative min-h-[calc(100vh-73px)] overflow-hidden">
                {/* Background Effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-dark-primary via-dark-secondary to-dark-primary -z-10"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-600/10 -z-10"></div>
                <div className="absolute top-20 left-20 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl -z-10"></div>
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl -z-10"></div>

                <div className="relative z-10 max-w-4xl mx-auto px-6 py-12">
                    <section className="text-center mb-12">
                        <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                            <FaChartLine className="text-white text-3xl" />
                        </div>
                        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
                            Investment Simulator
                        </h1>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                            Enter a company name to get AI-powered investment advice based on market analysis and financial data.
                        </p>
                    </section>

                    <section className="bg-dark-secondary rounded-2xl border border-dark-border p-8 mb-8">
                        <div className="max-w-2xl mx-auto">
                            <div className="mb-8">
                                <label htmlFor="companyName" className="block text-lg font-semibold text-white mb-3">
                                    Company Name
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        id="companyName"
                                        value={companyName}
                                        onChange={(e) => setCompanyName(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                        placeholder="Enter company name (e.g., Apple, Microsoft, Tesla...)"
                                        className="w-full px-6 py-4 bg-dark-primary border border-dark-border rounded-xl text-white placeholder-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all text-lg"
                                    />
                                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                                        <FaBuilding className="text-gray-500" />
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={analyzeCompany}
                                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center cursor-pointer"
                            >
                                <FaMagnifyingGlass className="mr-3" />
                                Analyze Investment
                            </button>
                        </div>
                    </section>

                    {result && (
                        <section id="analysis-result">
                            <div className={`bg-gradient-to-r ${result.invest ? 'from-green-500/20 to-emerald-600/20 border-green-500/30' : 'from-red-500/20 to-orange-600/20 border-red-500/30'} border rounded-2xl p-8 mb-6`}>
                                <div className="flex items-center justify-center mb-6">
                                    <div className={`w-16 h-16 bg-gradient-to-r ${result.invest ? 'from-green-500 to-emerald-600' : 'from-red-500 to-orange-600'} rounded-full flex items-center justify-center`}>
                                        {result.invest ? <FaCheck className="text-white text-2xl" /> : <FaXmark className="text-white text-2xl" />}
                                    </div>
                                </div>
                                <h3 className={`text-3xl font-bold text-center ${result.invest ? 'text-green-400' : 'text-red-400'} mb-4`}>
                                    {result.invest ? '✅ INVEST' : '❌ DON\'T INVEST'}
                                </h3>
                                <p className="text-lg text-gray-300 text-center mb-6">
                                    {result.analysis}
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="bg-dark-primary rounded-lg p-4 text-center">
                                        <div className={`text-2xl font-bold ${result.invest ? 'text-green-400' : 'text-red-400'}`}>{result.confidence}%</div>
                                        <div className="text-sm text-gray-400">Confidence Score</div>
                                    </div>
                                    <div className="bg-dark-primary rounded-lg p-4 text-center">
                                        <div className={`text-2xl font-bold ${result.invest ? 'text-blue-400' : 'text-orange-400'}`}>{result.growth}</div>
                                        <div className="text-sm text-gray-400">Growth Potential</div>
                                    </div>
                                    <div className="bg-dark-primary rounded-lg p-4 text-center">
                                        <div className={`text-2xl font-bold ${result.invest ? 'text-purple-400' : 'text-red-400'}`}>{result.risk}</div>
                                        <div className="text-sm text-gray-400">Risk Level</div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-center space-x-4 mb-8">
                                <button
                                    onClick={resetAnalysis}
                                    className="bg-dark-secondary hover:bg-dark-muted border border-dark-border hover:border-gray-500 text-white px-6 py-3 rounded-xl font-semibold transition-all flex items-center cursor-pointer"
                                >
                                    <FaArrowRotateRight className="mr-2" />
                                    Analyze Another
                                </button>
                                <button
                                    onClick={saveAnalysis}
                                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all flex items-center cursor-pointer"
                                >
                                    <FaFloppyDisk className="mr-2" />
                                    Save Analysis
                                </button>
                            </div>
                        </section>
                    )}

                    <section id="recent-analyses" className="bg-dark-secondary rounded-2xl border border-dark-border p-8">
                        <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                            <FaClockRotateLeft className="mr-3 text-blue-400" />
                            Recent Analyses
                        </h3>
                        
                        {savedMessage && (
                            <div className="mb-4 bg-green-500/10 border border-green-500/50 rounded-lg p-3 flex items-center space-x-2">
                                <FaCheck className="text-green-400" />
                                <span className="text-green-400 text-sm">{savedMessage}</span>
                            </div>
                        )}

                        <div className="space-y-4">
                            {recentAnalyses.length === 0 ? (
                                <div className="text-center py-8 text-gray-400">
                                    <p>No saved analyses yet. Analyze a company and save it to see it here!</p>
                                </div>
                            ) : (
                                recentAnalyses.map((item) => (
                                    <div key={item.id} className="flex items-center justify-between bg-dark-primary rounded-lg p-4 hover:bg-dark-muted transition-colors">
                                        <div className="flex items-center space-x-4">
                                            <div className={`w-3 h-3 ${item.invest ? 'bg-green-500' : 'bg-red-500'} rounded-full`}></div>
                                            <span className="font-semibold">{item.company}</span>
                                            <span className={`${item.invest ? 'text-green-400' : 'text-red-400'} text-sm`}>
                                                {item.invest ? '✅ INVEST' : '❌ DON\'T INVEST'}
                                            </span>
                                            {item.confidence && (
                                                <span className="text-gray-500 text-xs">
                                                    {item.confidence}% confidence
                                                </span>
                                            )}
                                        </div>
                                        <span className="text-gray-400 text-sm">{item.time}</span>
                                    </div>
                                ))
                            )}
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}
