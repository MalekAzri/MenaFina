'use client';

import { useState, useRef, useEffect } from 'react';

import {
    FaCircleUser,
    FaPlus,
    FaMagnifyingGlass,
    FaTrashCan,
    FaRobot,
    FaEllipsisVertical,
    FaPaperclip,
    FaFaceSmile,
    FaPaperPlane,
    FaCopy,
    FaThumbsUp,
    FaThumbsDown,
} from 'react-icons/fa6';
import Header from '@/components/Header';
import { QUESTIONS } from './questions';

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

type ChatStep =
    | 'NAME'
    | 'GENERAL_INFO'
    | 'BIG_FIVE'
    | 'BEHAVIOUR'
    | 'CAPITAL'
    | 'Result_Analysis'
    | 'HRP_Portfolio'
    | 'RL_Intro'
    | 'RL_Confirm'
    | 'DONE';

export default function ChatbotPage() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputText, setInputText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const hasInitialized = useRef(false);

    // State for the flow
    const [currentStep, setCurrentStep] = useState<ChatStep>('NAME');
    const [userName, setUserName] = useState('');

    // Trackers for sub-steps
    const [generalInfoIndex, setGeneralInfoIndex] = useState(0);

    const [bigFiveCategory, setBigFiveCategory] = useState<'Op' | 'Co' | 'Ex' | 'Ag' | 'Ne'>('Op');
    const [bigFiveIndex, setBigFiveIndex] = useState(0);

    const [behaviourCategory, setBehaviourCategory] = useState<'FI' | 'RI' | 'FD'>('FI');
    const [behaviourIndex, setBehaviourIndex] = useState(0);

    // Collected Data
    const [userProfile, setUserProfile] = useState<any>({});

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

    // Initial greeting - only show once when chat starts
    useEffect(() => {
        if (messages.length === 0 && currentStep === 'NAME' && !hasInitialized.current) {
            hasInitialized.current = true;
            addAiMessage("👋 To get started, what's your name?");
        }
    }, [messages.length, currentStep]);

    const addAiMessage = (content: string) => {
        setIsTyping(true);
        setTimeout(() => {
            const aiResponse: Message = {
                id: Date.now().toString(),
                sender: 'ai',
                content,
                timestamp: 'Just now'
            };
            setMessages(prev => [...prev, aiResponse]);
            setIsTyping(false);
        }, 1000);
    };

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

        // Process the input based on current step
        processInput(inputText.trim());
    };

    const processInput = (input: string) => {
        switch (currentStep) {
            case 'NAME':
                setUserName(input);
                addAiMessage(`🔷 Welcome to FINA — Investment AI Advisor\nI'm going to ask you a series of questions to determine your profile.\n\n📌 First, some general information\n\n${QUESTIONS.general[0].question}:`);
                setCurrentStep('GENERAL_INFO');
                setGeneralInfoIndex(0);
                break;

            case 'GENERAL_INFO':
                // Save current answer
                const currentKey = QUESTIONS.general[generalInfoIndex].key;
                setUserProfile((prev: any) => ({ ...prev, [currentKey]: input }));

                if (generalInfoIndex < QUESTIONS.general.length - 1) {
                    // Next general question
                    const nextIndex = generalInfoIndex + 1;
                    setGeneralInfoIndex(nextIndex);
                    addAiMessage(`${QUESTIONS.general[nextIndex].question}:`);
                } else {
                    // Done with general info, move to Big Five
                    addAiMessage(`\n🟣 Personality (Likert 1→5)\n${QUESTIONS.bigFive.Op[0]} (1-5):`);
                    setCurrentStep('BIG_FIVE');
                    setBigFiveCategory('Op');
                    setBigFiveIndex(0);
                }
                break;

            case 'BIG_FIVE':
                // Save current Big Five answer
                const cat = bigFiveCategory;
                const qKey = `${cat}${bigFiveIndex + 1}`;
                setUserProfile((prev: any) => ({ ...prev, [qKey]: input }));

                const currentQuestions = QUESTIONS.bigFive[cat];
                if (bigFiveIndex < currentQuestions.length - 1) {
                    // Next question in same category
                    const nextIdx = bigFiveIndex + 1;
                    setBigFiveIndex(nextIdx);
                    addAiMessage(`${currentQuestions[nextIdx]} (1-5):`);
                } else {
                    // Move to next category or finish Big Five
                    const categories: ('Op' | 'Co' | 'Ex' | 'Ag' | 'Ne')[] = ['Op', 'Co', 'Ex', 'Ag', 'Ne'];
                    const currentCatIdx = categories.indexOf(cat);

                    if (currentCatIdx < categories.length - 1) {
                        const nextCat = categories[currentCatIdx + 1];
                        setBigFiveCategory(nextCat);
                        setBigFiveIndex(0);
                        addAiMessage(`${QUESTIONS.bigFive[nextCat][0]} (1-5):`);
                    } else {
                        // Done with Big Five -> Behaviour
                        addAiMessage(`\n💰 Finance & Risk behavior (1-5)\n${QUESTIONS.behaviour.FI[0]} (1-5):`);
                        setCurrentStep('BEHAVIOUR');
                        setBehaviourCategory('FI');
                        setBehaviourIndex(0);
                    }
                }
                break;

            case 'BEHAVIOUR':
                const bCat = behaviourCategory;
                const bKey = `${bCat}${behaviourIndex + 1}`;
                setUserProfile((prev: any) => ({ ...prev, [bKey]: input }));

                const bQuestions = QUESTIONS.behaviour[bCat];
                if (behaviourIndex < bQuestions.length - 1) {
                    const nextBIdx = behaviourIndex + 1;
                    setBehaviourIndex(nextBIdx);
                    addAiMessage(`${bQuestions[nextBIdx]} (1-5):`);
                } else {
                    const bCategories: ('FI' | 'RI' | 'FD')[] = ['FI', 'RI', 'FD'];
                    const currentBCatIdx = bCategories.indexOf(bCat);

                    if (currentBCatIdx < bCategories.length - 1) {
                        const nextBCat = bCategories[currentBCatIdx + 1];
                        setBehaviourCategory(nextBCat);
                        setBehaviourIndex(0);
                        addAiMessage(`${QUESTIONS.behaviour[nextBCat][0]} (1-5):`);
                    } else {
                        // Done with Behaviour -> Capital
                        setCurrentStep('CAPITAL');
                        addAiMessage(`\n💵 Amount to invest (TND):`);
                    }
                }
                break;

            case 'CAPITAL':
                setUserProfile((prev: any) => ({ ...prev, Capital: input }));
                addAiMessage(`\n🎯 Profile detected, let me explain briefly…\n(Analysis in progress...)\n\nYour profile is: AGGRESSIVE\nYou have a high risk tolerance and seek high returns.`);

                setTimeout(() => {
                    addAiMessage(`\n📈 I'm now calculating a balanced portfolio for you…\n(HRP Optimization...)`);
                    setCurrentStep('HRP_Portfolio');
                    // Automatically proceed to RL prompt after a delay
                    setTimeout(() => {
                        addAiMessage(`\n🔥 If you want to go further, I can optimize your portfolio using Reinforcement Learning.\n🔥 Launch RL optimization? (y/n):`);
                        setCurrentStep('RL_Intro');
                    }, 2000);
                }, 1500);
                break;

            case 'RL_Intro':
                if (input.toLowerCase() === 'y') {
                    addAiMessage(`(Launching RL...)\n🚀 RL completed\nOptimization successful. The portfolio has been readjusted to maximize the Sharpe ratio.`);
                } else {
                    addAiMessage(`Understood. We'll stick with the classic allocation (HRP).`);
                }
                addAiMessage(`\n💾 All done, everything is saved. You can come back anytime!\n\n🔁 Do you want to analyze another profile or amount? (y/n):`);
                setCurrentStep('DONE');
                break;

            case 'DONE':
                if (input.toLowerCase() === 'y') {
                    // Reset
                    addAiMessage("Great! Let's start over.");
                    setUserName('');
                    setCurrentStep('NAME');
                    setGeneralInfoIndex(0);
                    setBigFiveCategory('Op');
                    setBigFiveIndex(0);
                    setBehaviourCategory('FI');
                    setBehaviourIndex(0);
                    setUserProfile({});
                    hasInitialized.current = false;
                    setTimeout(() => {
                        addAiMessage("👋 To get started, what's your name?");
                    }, 1000);

                } else {
                    addAiMessage("\n🌟 Thank you for chatting with me. I hope I helped you! See you soon 👋");
                }
                break;
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
        setUserName('');
        setCurrentStep('NAME');
        setGeneralInfoIndex(0);
        setBigFiveCategory('Op');
        setBigFiveIndex(0);
        setBehaviourCategory('FI');
        setBehaviourIndex(0);
        setUserProfile({});
        hasInitialized.current = false;
        // Reset everything - the useEffect will handle the initial greeting
    };

    const handleQuickPrompt = (prompt: string) => {
        setInputText(prompt);
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
                                    {/* Quick Replies / Suggestions could go here if context sensitive */}
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
