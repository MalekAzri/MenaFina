'use client';

import { useState, useEffect } from 'react';
import {
    FaUserGear,
    FaCamera,
    FaCalendarDays,
    FaPenToSquare,
    FaBookOpen,
    FaPlus,
    FaUsers,
    FaClock,
    FaCircleCheck,
    FaEllipsisVertical,
    FaStar,
    FaCirclePlay,
    FaCirclePause,
    FaX,
    FaChevronLeft,
    FaChevronRight,
    FaCalendar
} from 'react-icons/fa6';
import { useSession } from 'next-auth/react';
import { 
    getProfessorMeetings, 
    addProfessorMeeting, 
    removeProfessorMeeting,
    getProfessorMeetingsForMonth,
    type ProfessorMeeting 
} from '@/lib/professorMeetings';

export default function ProfessorAccount() {
    const { data: session } = useSession();
    const [meetings, setMeetings] = useState<ProfessorMeeting[]>([]);
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        date: '',
        time: '',
        duration: '30 minutes',
        location: 'Online',
        description: '',
        color: 'blue' as 'blue' | 'green' | 'purple',
        status: 'scheduled' as 'scheduled' | 'confirmed' | 'cancelled'
    });

    useEffect(() => {
        const loadMeetings = () => {
            const allMeetings = getProfessorMeetings();
            setMeetings(allMeetings);
        };
        
        loadMeetings();
        
        // Listen for storage changes
        const handleStorageChange = () => {
            loadMeetings();
        };
        
        window.addEventListener('storage', handleStorageChange);
        
        // Check periodically for updates
        const interval = setInterval(loadMeetings, 2000);
        
        return () => {
            window.removeEventListener('storage', handleStorageChange);
            clearInterval(interval);
        };
    }, []);

    // Navigate months
    const navigateMonth = (direction: 'prev' | 'next') => {
        if (direction === 'prev') {
            if (currentMonth === 0) {
                setCurrentMonth(11);
                setCurrentYear(currentYear - 1);
            } else {
                setCurrentMonth(currentMonth - 1);
            }
        } else {
            if (currentMonth === 11) {
                setCurrentMonth(0);
                setCurrentYear(currentYear + 1);
            } else {
                setCurrentMonth(currentMonth + 1);
            }
        }
        setSelectedDate(null);
    };

    const goToToday = () => {
        const today = new Date();
        setCurrentMonth(today.getMonth());
        setCurrentYear(today.getFullYear());
        setSelectedDate(null);
    };

    const getMonthName = (month: number) => {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                       'July', 'August', 'September', 'October', 'November', 'December'];
        return months[month];
    };

    const getDaysInMonth = (year: number, month: number) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const formatDateForDisplay = (dateStr: string): string => {
        const date = new Date(dateStr + 'T00:00:00');
        return date.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric' 
        });
    };

    // Get meetings for current month
    const monthMeetings = getProfessorMeetingsForMonth(currentYear, currentMonth);

    // Generate calendar days
    const generateCalendarDays = () => {
        const days: JSX.Element[] = [];
        const firstDay = new Date(currentYear, currentMonth, 1).getDay();
        const daysInMonth = getDaysInMonth(currentYear, currentMonth);
        const today = new Date();
        const isCurrentMonth = today.getMonth() === currentMonth && today.getFullYear() === currentYear;
        
        // Empty cells for days before month starts
        for (let i = 0; i < firstDay; i++) {
            days.push(
                <div key={`empty-${i}`} className="text-center text-gray-500 py-2"></div>
            );
        }
        
        // Days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const dateKey = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const dayMeetings = meetings.filter(m => m.date === dateKey);
            const hasMeeting = dayMeetings.length > 0;
            const meetingColor = dayMeetings[0]?.color || 'blue';
            const isSelected = selectedDate === dateKey;
            const isToday = isCurrentMonth && day === today.getDate();
            
            const colorClasses = {
                blue: 'bg-blue-600',
                green: 'bg-green-600',
                purple: 'bg-purple-600'
            };
            
            days.push(
                <div 
                    key={day} 
                    onClick={() => hasMeeting ? setSelectedDate(dateKey) : setSelectedDate(null)}
                    className={`text-center py-2 rounded cursor-pointer transition-all ${
                        hasMeeting ? `${colorClasses[meetingColor]} text-white relative` : 
                        isSelected ? 'bg-dark-muted text-white' :
                        isToday ? 'border-2 border-yellow-500 text-white' :
                        'text-white hover:bg-dark-muted'
                    }`}
                >
                    {day}
                    {hasMeeting && (
                        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full"></div>
                    )}
                </div>
            );
        }
        
        return days;
    };

    const selectedDateMeetings = selectedDate 
        ? meetings.filter(m => m.date === selectedDate)
        : [];

    const handleAddMeeting = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.title || !formData.date || !formData.time) {
            alert('Please fill in all required fields');
            return;
        }

        addProfessorMeeting(formData);
        setMeetings(getProfessorMeetings());
        setShowAddForm(false);
        setFormData({
            title: '',
            date: '',
            time: '',
            duration: '30 minutes',
            location: 'Online',
            description: '',
            color: 'blue',
            status: 'scheduled'
        });
    };

    const handleDeleteMeeting = (meetingId: string) => {
        if (confirm('Are you sure you want to delete this meeting?')) {
            removeProfessorMeeting(meetingId);
            setMeetings(getProfessorMeetings());
            setSelectedDate(null);
        }
    };

    return (
        <main id="main-content" className="max-w-7xl mx-auto px-6 py-8 w-full flex-grow">
            <div id="page-header" className="mb-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">Professor Account</h1>
                        <p className="text-gray-400">Manage your profile, courses, and scheduled meetings</p>
                    </div>
                    <div className="flex items-center space-x-3">
                        <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg" alt="Professor" className="w-12 h-12 rounded-full object-cover" />
                        <div>
                            <div className="text-white font-medium">{session?.user?.name || 'Dr. Sarah Johnson'}</div>
                            <div className="text-sm text-gray-400">Financial Economics</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div id="account-config" className="lg:col-span-1">
                    <div className="bg-dark-secondary rounded-xl border border-dark-border p-6">
                        <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                            <FaUserGear className="text-blue-400 mr-3" />
                            Account Configuration
                        </h2>

                        <div className="space-y-6">
                            <div className="text-center mb-6">
                                <div className="relative inline-block">
                                    <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg" alt="Profile" className="w-24 h-24 rounded-full object-cover mx-auto" />
                                    <button className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white w-8 h-8 rounded-full flex items-center justify-center transition-colors">
                                        <FaCamera className="text-sm" />
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                                <input type="text" defaultValue={session?.user?.name || "Dr. Sarah Johnson"} className="w-full bg-dark-primary border border-dark-border rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                                <input type="email" defaultValue={session?.user?.email || "sarah.johnson@menafina.edu"} className="w-full bg-dark-primary border border-dark-border rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Department</label>
                                <input type="text" defaultValue="Financial Economics" className="w-full bg-dark-primary border border-dark-border rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Office Hours</label>
                                <input type="text" defaultValue="Mon-Wed 2:00-4:00 PM" className="w-full bg-dark-primary border border-dark-border rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
                                <textarea rows={3} defaultValue="PhD in Financial Economics with 15 years of experience in investment banking and academic research." className="w-full bg-dark-primary border border-dark-border rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none resize-none"></textarea>
                            </div>

                            <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 rounded-lg font-medium transition-all duration-300">
                                Update Profile
                            </button>
                        </div>
                    </div>
                </div>

                <div id="main-content-area" className="lg:col-span-2 space-y-8">
                    <div id="calendar-section" className="bg-dark-secondary rounded-xl border border-dark-border p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-semibold text-white flex items-center">
                                <FaCalendarDays className="text-purple-400 mr-3" />
                                My Meeting Calendar
                            </h2>
                            <button 
                                onClick={() => setShowAddForm(true)}
                                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
                            >
                                <FaPlus className="mr-2" />
                                Add Meeting
                            </button>
                        </div>

                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-2">
                                <button 
                                    onClick={() => navigateMonth('prev')}
                                    className="bg-dark-primary hover:bg-dark-muted text-gray-400 hover:text-white px-4 py-2 rounded-lg transition-all duration-300"
                                >
                                    <FaChevronLeft />
                                </button>
                                <span className="text-white font-semibold px-4 min-w-[180px] text-center">
                                    {getMonthName(currentMonth)} {currentYear}
                                </span>
                                <button 
                                    onClick={() => navigateMonth('next')}
                                    className="bg-dark-primary hover:bg-dark-muted text-gray-400 hover:text-white px-4 py-2 rounded-lg transition-all duration-300"
                                >
                                    <FaChevronRight />
                                </button>
                                <button 
                                    onClick={goToToday}
                                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ml-2"
                                >
                                    Today
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-7 gap-2 mb-4">
                            <div className="text-center text-gray-400 font-medium py-2">Sun</div>
                            <div className="text-center text-gray-400 font-medium py-2">Mon</div>
                            <div className="text-center text-gray-400 font-medium py-2">Tue</div>
                            <div className="text-center text-gray-400 font-medium py-2">Wed</div>
                            <div className="text-center text-gray-400 font-medium py-2">Thu</div>
                            <div className="text-center text-gray-400 font-medium py-2">Fri</div>
                            <div className="text-center text-gray-400 font-medium py-2">Sat</div>
                        </div>

                        <div className="grid grid-cols-7 gap-2">
                            {generateCalendarDays()}
                        </div>

                        {/* Selected Date Meetings */}
                        {selectedDate && selectedDateMeetings.length > 0 && (
                            <div className="mt-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-bold text-white">
                                        Meetings on {formatDateForDisplay(selectedDate)}
                                    </h3>
                                    <button 
                                        onClick={() => setSelectedDate(null)}
                                        className="text-gray-400 hover:text-white transition-colors"
                                    >
                                        <FaX />
                                    </button>
                                </div>
                                <div className="space-y-3">
                                    {selectedDateMeetings.map((meeting) => {
                                        const colorClasses = {
                                            blue: 'bg-blue-500',
                                            green: 'bg-green-500',
                                            purple: 'bg-purple-500'
                                        };
                                        const statusColors = {
                                            scheduled: 'bg-purple-600',
                                            confirmed: 'bg-blue-600',
                                            cancelled: 'bg-red-600'
                                        };

                                        return (
                                            <div key={meeting.id} className="flex items-center justify-between bg-dark-primary rounded-lg p-4 border border-dark-border">
                                                <div className="flex items-center space-x-3">
                                                    <div className={`w-3 h-3 ${colorClasses[meeting.color || 'blue']} rounded-full`}></div>
                                                    <div>
                                                        <div className="text-white font-medium">{meeting.title}</div>
                                                        <div className="text-sm text-gray-400">{formatDateForDisplay(meeting.date)} - {meeting.time}</div>
                                                        {meeting.description && (
                                                            <div className="text-xs text-gray-500 mt-1">{meeting.description}</div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <span className={`text-xs ${statusColors[meeting.status]} text-white px-2 py-1 rounded capitalize`}>
                                                        {meeting.status}
                                                    </span>
                                                    <button 
                                                        onClick={() => handleDeleteMeeting(meeting.id)}
                                                        className="text-red-400 hover:text-red-300"
                                                        title="Delete meeting"
                                                    >
                                                        <FaX />
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Upcoming Meetings List */}
                        <div className="mt-6 space-y-3">
                            <h3 className="text-lg font-semibold text-white mb-4">Upcoming Meetings</h3>
                            {meetings
                                .filter(m => {
                                    const meetingDate = new Date(m.date);
                                    return meetingDate >= new Date();
                                })
                                .sort((a, b) => {
                                    const dateA = new Date(a.date + ' ' + a.time);
                                    const dateB = new Date(b.date + ' ' + b.time);
                                    return dateA.getTime() - dateB.getTime();
                                })
                                .slice(0, 5)
                                .map((meeting) => {
                                    const colorClasses = {
                                        blue: 'bg-blue-500',
                                        green: 'bg-green-500',
                                        purple: 'bg-purple-500'
                                    };
                                    const statusColors = {
                                        scheduled: 'bg-purple-600',
                                        confirmed: 'bg-blue-600',
                                        cancelled: 'bg-red-600'
                                    };

                                    return (
                                        <div key={meeting.id} className="flex items-center justify-between bg-dark-primary rounded-lg p-4 border border-dark-border">
                                            <div className="flex items-center space-x-3">
                                                <div className={`w-3 h-3 ${colorClasses[meeting.color || 'blue']} rounded-full`}></div>
                                                <div>
                                                    <div className="text-white font-medium">{meeting.title}</div>
                                                    <div className="text-sm text-gray-400">{formatDateForDisplay(meeting.date)} - {meeting.time}</div>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <span className={`text-xs ${statusColors[meeting.status]} text-white px-2 py-1 rounded capitalize`}>
                                                    {meeting.status}
                                                </span>
                                                <button 
                                                    onClick={() => handleDeleteMeeting(meeting.id)}
                                                    className="text-red-400 hover:text-red-300"
                                                    title="Delete meeting"
                                                >
                                                    <FaX />
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            {meetings.filter(m => {
                                const meetingDate = new Date(m.date);
                                return meetingDate >= new Date();
                            }).length === 0 && (
                                <div className="bg-dark-primary rounded-lg p-6 border border-dark-border text-center">
                                    <p className="text-gray-400">No upcoming meetings. Click "Add Meeting" to schedule one!</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Add Meeting Modal */}
                    {showAddForm && (
                        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                            <div className="bg-dark-secondary rounded-xl border border-dark-border p-6 w-full max-w-md">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-bold text-white">Add New Meeting</h2>
                                    <button 
                                        onClick={() => setShowAddForm(false)}
                                        className="text-gray-400 hover:text-white"
                                    >
                                        <FaX />
                                    </button>
                                </div>
                                <form onSubmit={handleAddMeeting} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Title *</label>
                                        <input 
                                            type="text" 
                                            value={formData.title}
                                            onChange={(e) => setFormData({...formData, title: e.target.value})}
                                            className="w-full bg-dark-primary border border-dark-border rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none"
                                            required
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Date *</label>
                                            <input 
                                                type="date" 
                                                value={formData.date}
                                                onChange={(e) => setFormData({...formData, date: e.target.value})}
                                                className="w-full bg-dark-primary border border-dark-border rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Time *</label>
                                            <input 
                                                type="time" 
                                                value={formData.time ? (() => {
                                                    // Convert "2:00 PM" to "14:00" for time input
                                                    const match = formData.time.match(/(\d+):(\d+)\s*(AM|PM)/i);
                                                    if (match) {
                                                        let hours = parseInt(match[1]);
                                                        const minutes = match[2];
                                                        const ampm = match[3].toUpperCase();
                                                        if (ampm === 'PM' && hours !== 12) hours += 12;
                                                        if (ampm === 'AM' && hours === 12) hours = 0;
                                                        return `${String(hours).padStart(2, '0')}:${minutes}`;
                                                    }
                                                    return '';
                                                })() : ''}
                                                onChange={(e) => {
                                                    const time = e.target.value;
                                                    if (time) {
                                                        const [hours, minutes] = time.split(':');
                                                        const hour24 = parseInt(hours);
                                                        const hour12 = hour24 % 12 || 12;
                                                        const ampm = hour24 >= 12 ? 'PM' : 'AM';
                                                        setFormData({...formData, time: `${hour12}:${minutes} ${ampm}`});
                                                    }
                                                }}
                                                className="w-full bg-dark-primary border border-dark-border rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Duration</label>
                                            <select 
                                                value={formData.duration}
                                                onChange={(e) => setFormData({...formData, duration: e.target.value})}
                                                className="w-full bg-dark-primary border border-dark-border rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none"
                                            >
                                                <option>15 minutes</option>
                                                <option>30 minutes</option>
                                                <option>45 minutes</option>
                                                <option>60 minutes</option>
                                                <option>90 minutes</option>
                                                <option>120 minutes</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
                                            <input 
                                                type="text" 
                                                value={formData.location}
                                                onChange={(e) => setFormData({...formData, location: e.target.value})}
                                                className="w-full bg-dark-primary border border-dark-border rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Color</label>
                                        <select 
                                            value={formData.color}
                                            onChange={(e) => setFormData({...formData, color: e.target.value as 'blue' | 'green' | 'purple'})}
                                            className="w-full bg-dark-primary border border-dark-border rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none"
                                        >
                                            <option value="blue">Blue</option>
                                            <option value="green">Green</option>
                                            <option value="purple">Purple</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                                        <textarea 
                                            value={formData.description}
                                            onChange={(e) => setFormData({...formData, description: e.target.value})}
                                            rows={3}
                                            className="w-full bg-dark-primary border border-dark-border rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none resize-none"
                                        />
                                    </div>
                                    <div className="flex space-x-3">
                                        <button 
                                            type="submit"
                                            className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-medium transition-all duration-300"
                                        >
                                            Add Meeting
                                        </button>
                                        <button 
                                            type="button"
                                            onClick={() => setShowAddForm(false)}
                                            className="flex-1 bg-dark-primary hover:bg-dark-muted text-white py-3 rounded-lg font-medium transition-all duration-300"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                    <div id="courses-section" className="bg-dark-secondary rounded-xl border border-dark-border p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-semibold text-white flex items-center">
                                <FaBookOpen className="text-green-400 mr-3" />
                                My Courses & Tutorials
                            </h2>
                            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center">
                                <FaPlus className="mr-2" />
                                Add Course
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div className="bg-dark-primary rounded-lg border border-dark-border p-5">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-white mb-2">Advanced Portfolio Management</h3>
                                        <p className="text-gray-400 mb-3">Comprehensive course covering modern portfolio theory, risk assessment, and optimization strategies.</p>
                                        <div className="flex items-center space-x-4 text-sm">
                                            <span className="text-gray-400 flex items-center">
                                                <FaUsers className="mr-1" />
                                                45 students
                                            </span>
                                            <span className="text-gray-400 flex items-center">
                                                <FaClock className="mr-1" />
                                                12 weeks
                                            </span>
                                            <span className="text-green-400 flex items-center">
                                                <FaCircleCheck className="mr-1" />
                                                Active
                                            </span>
                                        </div>
                                    </div>
                                    <button className="text-gray-400 hover:text-white">
                                        <FaEllipsisVertical />
                                    </button>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <div className="flex items-center text-yellow-400">
                                            <FaStar className="text-sm" />
                                            <FaStar className="text-sm" />
                                            <FaStar className="text-sm" />
                                            <FaStar className="text-sm" />
                                            <FaStar className="text-sm" />
                                            <span className="text-white ml-2 text-sm">4.8</span>
                                        </div>
                                        <span className="text-gray-400 text-sm">(42 reviews)</span>
                                    </div>
                                    <div className="flex space-x-2">
                                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors">
                                            View Ratings
                                        </button>
                                        <button className="bg-dark-muted hover:bg-gray-600 text-white px-3 py-1 rounded text-sm transition-colors">
                                            Edit
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-dark-primary rounded-lg border border-dark-border p-5">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-white mb-2">Financial Risk Analysis</h3>
                                        <p className="text-gray-400 mb-3">In-depth tutorial series on identifying, measuring, and managing financial risks in various market conditions.</p>
                                        <div className="flex items-center space-x-4 text-sm">
                                            <span className="text-gray-400 flex items-center">
                                                <FaUsers className="mr-1" />
                                                28 students
                                            </span>
                                            <span className="text-gray-400 flex items-center">
                                                <FaClock className="mr-1" />
                                                8 weeks
                                            </span>
                                            <span className="text-blue-400 flex items-center">
                                                <FaCirclePlay className="mr-1" />
                                                In Progress
                                            </span>
                                        </div>
                                    </div>
                                    <button className="text-gray-400 hover:text-white">
                                        <FaEllipsisVertical />
                                    </button>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <div className="flex items-center text-yellow-400">
                                            <FaStar className="text-sm" />
                                            <FaStar className="text-sm" />
                                            <FaStar className="text-sm" />
                                            <FaStar className="text-sm" />
                                            <FaStar className="text-sm" />
                                            <span className="text-white ml-2 text-sm">4.9</span>
                                        </div>
                                        <span className="text-gray-400 text-sm">(58 reviews)</span>
                                    </div>
                                    <div className="flex space-x-2">
                                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors">
                                            View Ratings
                                        </button>
                                        <button className="bg-dark-muted hover:bg-gray-600 text-white px-3 py-1 rounded text-sm transition-colors">
                                            Edit
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-dark-primary rounded-lg border border-dark-border p-5">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-white mb-2">Cryptocurrency & Digital Assets</h3>
                                        <p className="text-gray-400 mb-3">Explore the fundamentals of cryptocurrency trading, blockchain technology, and digital asset management.</p>
                                        <div className="flex items-center space-x-4 text-sm">
                                            <span className="text-gray-400 flex items-center">
                                                <FaUsers className="mr-1" />
                                                67 students
                                            </span>
                                            <span className="text-gray-400 flex items-center">
                                                <FaClock className="mr-1" />
                                                6 weeks
                                            </span>
                                            <span className="text-orange-400 flex items-center">
                                                <FaCirclePause className="mr-1" />
                                                Draft
                                            </span>
                                        </div>
                                    </div>
                                    <button className="text-gray-400 hover:text-white">
                                        <FaEllipsisVertical />
                                    </button>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <div className="flex items-center text-yellow-400">
                                            <FaStar className="text-sm" />
                                            <FaStar className="text-sm" />
                                            <FaStar className="text-sm" />
                                            <FaStar className="text-sm" />
                                            <FaStar className="text-sm" />
                                            <span className="text-white ml-2 text-sm">4.6</span>
                                        </div>
                                        <span className="text-gray-400 text-sm">(23 reviews)</span>
                                    </div>
                                    <div className="flex space-x-2">
                                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors">
                                            View Ratings
                                        </button>
                                        <button className="bg-dark-muted hover:bg-gray-600 text-white px-3 py-1 rounded text-sm transition-colors">
                                            Edit
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
