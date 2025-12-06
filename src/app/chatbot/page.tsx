'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
    FaGraduationCap,
    FaTableCellsLarge,
    FaCircleUser,
    FaRightFromBracket,
    FaPlus,
    FaMagnifyingGlass,
    FaTrashCan,
    FaRobot,
    FaEllipsisVertical,
    FaLightbulb,
    FaChartLine,
    FaShieldHalved,
    FaBook,
    FaPaperclip,
    FaFaceSmile,
    FaPaperPlane,
    FaCheck,
    FaCopy,
    FaThumbsUp,
    FaThumbsDown,
    FaUsers,
    FaBell,
    FaGear
} from 'react-icons/fa6';
import Header from '@/components/Header';

interface Message {
    id: string;
    sender: 'user' | 'ai';
    content: string;
    timestamp: string;
    isTyping?: boolean;
}

interface ChatHistory {
    id: string;
    title: string;
    preview: string;
    time: string;
}

export default function ChatbotPage() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputText, setInputText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    const [chatHistory, setChatHistory] = useState<ChatHistory[]>([
        { id: '1', title: 'Investment Strategies', preview: 'What are the best investment strategies for beginners?', time: '2m ago' },
        { id: '2', title: 'Portfolio Diversification', preview: 'How should I diversify my investment portfolio?', time: '1h ago' },
        { id: '3', title: 'Risk Management', preview: 'Explain risk management in financial markets', time: '3h ago' },
        { id: '4', title: 'Stock Market Basics', preview: 'Can you explain how the stock market works?', time: 'Yesterday' },
        { id: '5', title: 'Cryptocurrency Guide', preview: 'What should I know about cryptocurrency investing?', time: '2 days ago' },
    ]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSendMessage = async () => {
        if (!inputText.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            sender: 'user',
            content: inputText,
            timestamp: 'Just now'
        };

        setMessages(prev => [...prev, userMessage]);
        setInputText('');
        setIsTyping(true);

        // Simulate AI delay and response
        setTimeout(() => {
            const aiResponse: Message = {
                id: (Date.now() + 1).toString(),
                sender: 'ai',
                content: generateAIResponse(userMessage.content),
                timestamp: 'Just now'
            };
            setMessages(prev => [...prev, aiResponse]);
            setIsTyping(false);
        }, 2000);
    };

    const generateAIResponse = (input: string): string => {
        const lowerInput = input.toLowerCase();
        if (lowerInput.includes('invest') || lowerInput.includes('strategy')) {
            return `Great question! Here are some fundamental investment strategies for beginners:
            • **Diversification:** Spread your investments across different asset classes to reduce risk.
            • **Dollar-Cost Averaging:** Invest a fixed amount regularly regardless of market conditions.
            • **Long-Term Focus:** Invest with a long-term perspective to ride out market volatility.
            • **Index Funds:** Consider low-cost index funds for broad market exposure.`;
        } else if (lowerInput.includes('risk')) {
            return `Risk management is crucial in investing. It involves identifying potential risks and taking steps to mitigate them. Key concepts include diversification, asset allocation, and understanding your own risk tolerance. never invest money you cannot afford to lose.`;
        } else if (lowerInput.includes('market')) {
            return `The market is driven by supply and demand. When more people want to buy a stock (demand), the price goes up. When more people want to sell (supply), the price goes down. Many factors influence this, including company performance, economic indicators, and investor sentiment.`;
        } else {
            return `I understand you're asking about "${input}". As an AI financial assistant, can you provide more specific details so I can give you the best advice? I can help with investment strategies, market analysis, risk assessment, and financial basics.`;
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const startNewChat = () => {
        setMessages([]);
        setInputText('');
        setIsTyping(false);
    };

    const handleQuickPrompt = (prompt: string) => {
        setInputText(prompt);
        // Optional: auto-send
        // handleSendMessage(); 
    };

    return (
        <div className="bg-dark-primary text-white font-inter min-h-screen flex flex-col">
            <Header />

            <main className="flex-grow pt-[73px] flex h-screen overflow-hidden">
                {/* Sidebar */}
                <aside id="sidebar" className="w-80 bg-dark-secondary border-r border-dark-border flex flex-col hidden md:flex">
                    <div className="p-6 border-b border-dark-border">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-white">Chat History</h2>
                            <button
                                onClick={startNewChat}
                                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white p-2 rounded-lg transition-all duration-300"
                            >
                                <FaPlus />
                            </button>
                        </div>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search conversations..."
                                className="w-full bg-dark-primary border border-dark-border rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                            />
                            <FaMagnifyingGlass className="absolute right-3 top-3 text-gray-500" />
                        </div>
                    </div>

                    <div id="chat-list" className="flex-1 overflow-y-auto p-4 space-y-2">
                        {chatHistory.map((chat) => (
                            <div key={chat.id} className="bg-dark-primary border border-dark-border rounded-lg p-4 cursor-pointer hover:bg-dark-muted transition-colors">
                                <div className="flex items-start justify-between mb-2">
                                    <h3 className="text-white font-semibold text-sm">{chat.title}</h3>
                                    <span className="text-xs text-gray-500">{chat.time}</span>
                                </div>
                                <p className="text-gray-400 text-xs line-clamp-2">{chat.preview}</p>
                            </div>
                        ))}
                    </div>

                    <div id="sidebar-footer" className="p-4 border-t border-dark-border">
                        <button className="w-full bg-dark-primary border border-dark-border hover:border-gray-500 text-white py-3 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2">
                            <FaTrashCan />
                            <span>Clear All Chats</span>
                        </button>
                    </div>
                </aside>

                {/* Chat Container */}
                <div id="chat-container" className="flex-1 flex flex-col bg-dark-primary relative">
                    <div id="chat-header" className="bg-dark-secondary border-b border-dark-border p-6 flex items-center justify-between z-10">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                <FaRobot className="text-white text-xl" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-white">MenaFina AI Assistant</h2>
                                <p className="text-sm text-gray-400">Always here to help with your financial questions</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button className="text-gray-400 hover:text-white transition-colors p-2">
                                <FaEllipsisVertical />
                            </button>
                        </div>
                    </div>

                    <div id="messages-container" className="flex-1 overflow-y-auto p-6 space-y-6">
                        {/* Welcome Screen if no messages */}
                        {messages.length === 0 && (
                            <div className="flex justify-center h-full items-center">
                                <div className="max-w-2xl text-center">
                                    <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <FaRobot className="text-white text-3xl" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-4">Welcome to MenaFina AI</h3>
                                    <p className="text-gray-400 mb-8">I'm your intelligent financial assistant. Ask me anything about investments, markets, risk management, or financial strategies.</p>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <button onClick={() => handleQuickPrompt("What are the best investment strategies for beginners?")} className="bg-dark-secondary border border-dark-border hover:border-blue-500 rounded-lg p-4 text-left transition-all duration-300 group">
                                            <FaLightbulb className="text-blue-400 mb-2 text-xl" />
                                            <p className="text-white font-medium mb-1">Investment Tips</p>
                                            <p className="text-gray-500 text-sm">Get personalized advice</p>
                                        </button>
                                        <button onClick={() => handleQuickPrompt("Analyze current market trends")} className="bg-dark-secondary border border-dark-border hover:border-purple-500 rounded-lg p-4 text-left transition-all duration-300 group">
                                            <FaChartLine className="text-purple-400 mb-2 text-xl" />
                                            <p className="text-white font-medium mb-1">Market Analysis</p>
                                            <p className="text-gray-500 text-sm">Understand trends</p>
                                        </button>
                                        <button onClick={() => handleQuickPrompt("How do I assess investment risks?")} className="bg-dark-secondary border border-dark-border hover:border-green-500 rounded-lg p-4 text-left transition-all duration-300 group">
                                            <FaShieldHalved className="text-green-400 mb-2 text-xl" />
                                            <p className="text-white font-medium mb-1">Risk Assessment</p>
                                            <p className="text-gray-500 text-sm">Evaluate your portfolio</p>
                                        </button>
                                        <button onClick={() => handleQuickPrompt("Explain financial basics")} className="bg-dark-secondary border border-dark-border hover:border-orange-500 rounded-lg p-4 text-left transition-all duration-300 group">
                                            <FaBook className="text-orange-400 mb-2 text-xl" />
                                            <p className="text-white font-medium mb-1">Learn Basics</p>
                                            <p className="text-gray-500 text-sm">Financial education</p>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Messages */}
                        {messages.map((msg) => (
                            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className="max-w-2xl w-full">
                                    <div className={`flex items-start space-x-3 ${msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${msg.sender === 'ai' ? 'bg-gradient-to-r from-blue-500 to-purple-600' : 'bg-gray-600'}`}>
                                            {msg.sender === 'ai' ? <FaRobot className="text-white" /> : <FaCircleUser className="text-white" />}
                                        </div>
                                        <div className={`flex-1 rounded-2xl p-4 ${msg.sender === 'user' ? 'bg-blue-600 rounded-tr-sm' : 'bg-dark-secondary border border-dark-border rounded-tl-sm'}`}>
                                            <p className="text-white whitespace-pre-line">{msg.content}</p>
                                            {msg.sender === 'ai' && (
                                                <div className="flex items-center space-x-2 mt-4 pt-4 border-t border-dark-border">
                                                    <span className="text-xs text-gray-500">{msg.timestamp}</span>
                                                    <div className="flex-grow"></div>
                                                    <button className="text-gray-500 hover:text-blue-400 transition-colors">
                                                        <FaCopy className="text-xs" />
                                                    </button>
                                                    <button className="text-gray-500 hover:text-green-400 transition-colors">
                                                        <FaThumbsUp className="text-xs" />
                                                    </button>
                                                    <button className="text-gray-500 hover:text-red-400 transition-colors">
                                                        <FaThumbsDown className="text-xs" />
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    {msg.sender === 'user' && (
                                        <span className="text-xs text-gray-500 mt-1 block text-right">{msg.timestamp}</span>
                                    )}
                                </div>
                            </div>
                        ))}

                        {/* Typing Indicator */}
                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="flex items-start space-x-3">
                                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                        <FaRobot className="text-white" />
                                    </div>
                                    <div className="bg-dark-secondary border border-dark-border rounded-2xl rounded-tl-sm p-4">
                                        <div className="flex space-x-2">
                                            <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                                            <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100"></div>
                                            <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <div id="input-container" className="border-t border-dark-border bg-dark-secondary p-6">
                        <div className="max-w-4xl mx-auto">
                            <div className="flex items-end space-x-4">
                                <button className="text-gray-400 hover:text-white transition-colors p-3 rounded-lg hover:bg-dark-muted hidden sm:block">
                                    <FaPaperclip className="text-xl" />
                                </button>
                                <div className="flex-1 relative">
                                    <textarea
                                        ref={inputRef}
                                        value={inputText}
                                        onChange={(e) => setInputText(e.target.value)}
                                        onKeyDown={handleKeyPress}
                                        rows={1}
                                        placeholder="Type your message here..."
                                        className="w-full bg-dark-primary border border-dark-border rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 resize-none max-h-32"
                                        style={{ height: 'auto', minHeight: '44px' }}
                                    ></textarea>
                                    <button className="absolute right-3 bottom-3 text-gray-500 hover:text-white transition-colors">
                                        <FaFaceSmile />
                                    </button>
                                </div>
                                <button
                                    onClick={handleSendMessage}
                                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white p-3 rounded-xl transition-all duration-300 transform hover:scale-105"
                                >
                                    <FaPaperPlane className="text-xl" />
                                </button>
                            </div>
                            <p className="text-xs text-gray-500 mt-2 text-center">MenaFina AI can make mistakes. Please verify important information.</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
