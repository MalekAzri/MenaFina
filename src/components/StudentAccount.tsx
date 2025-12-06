'use client';

import React, { useState, useEffect } from 'react';
import {
    FaPenToSquare,
    FaCircle,
    FaEnvelope,
    FaPhone,
    FaLocationDot,
    FaCalendar,
    FaCalendarCheck,
    FaBook,
    FaStar,
    FaRightFromBracket,
    FaChevronLeft,
    FaChevronRight,
    FaClock
} from 'react-icons/fa6';
import { signOut } from 'next-auth/react';
import { getMeetings, getMeetingsForMonth, type Meeting } from '@/lib/meetings';

export default function StudentAccount() {
    const [meetings, setMeetings] = useState<Meeting[]>([]);
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [selectedDate, setSelectedDate] = useState<string | null>(null);

    useEffect(() => {
        // Load meetings from localStorage
        const loadMeetings = () => {
            const allMeetings = getMeetings();
            setMeetings(allMeetings);
        };

        loadMeetings();

        // Set up listener for storage changes (in case meetings are added from another tab)
        const handleStorageChange = () => {
            loadMeetings();
        };

        // Listen for custom event when meeting is added
        const handleMeetingAdded = () => {
            loadMeetings();
        };

        // Listen for custom event when meeting is removed
        const handleMeetingRemoved = () => {
            loadMeetings();
            setSelectedDate(null); // Clear selected date if the meeting was removed
        };

        window.addEventListener('storage', handleStorageChange);
        window.addEventListener('meetingAdded', handleMeetingAdded);
        window.addEventListener('meetingRemoved', handleMeetingRemoved);

        // Refresh when page becomes visible (user navigates back)
        const handleVisibilityChange = () => {
            if (!document.hidden) {
                loadMeetings();
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        // Also check periodically (for same-tab updates)
        const interval = setInterval(() => {
            loadMeetings();
        }, 2000);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('meetingAdded', handleMeetingAdded);
            window.removeEventListener('meetingRemoved', handleMeetingRemoved);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            clearInterval(interval);
        };
    }, []);

    // Get meetings for current month
    const monthMeetings = getMeetingsForMonth(currentYear, currentMonth);

    // Get upcoming meetings (sorted by date)
    const upcomingMeetings = meetings
        .filter(m => {
            const meetingDate = new Date(m.date);
            return meetingDate >= new Date();
        })
        .sort((a, b) => {
            const dateA = new Date(a.date + ' ' + a.time);
            const dateB = new Date(b.date + ' ' + b.time);
            return dateA.getTime() - dateB.getTime();
        })
        .slice(0, 5); // Show top 5 upcoming

    // Helper function to get color class based on meeting color
    const getColorClass = (color?: string) => {
        switch (color) {
            case 'green': return 'border-green-500';
            case 'purple': return 'border-purple-500';
            case 'blue':
            default: return 'border-blue-500';
        }
    };

    const getColorDot = (color?: string) => {
        switch (color) {
            case 'green': return 'bg-green-500';
            case 'purple': return 'bg-purple-500';
            case 'blue':
            default: return 'bg-blue-500';
        }
    };

    const getColorBorder = (color?: string) => {
        switch (color) {
            case 'green': return 'border-green-500';
            case 'purple': return 'border-purple-500';
            case 'blue':
            default: return 'border-blue-500';
        }
    };

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
        setSelectedDate(null); // Clear selection when changing months
    };

    // Jump to today
    const goToToday = () => {
        const today = new Date();
        setCurrentMonth(today.getMonth());
        setCurrentYear(today.getFullYear());
        setSelectedDate(null);
    };

    // Get month name
    const getMonthName = (month: number) => {
        const months = ['January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'];
        return months[month];
    };

    // Get days in month
    const getDaysInMonth = (year: number, month: number) => {
        return new Date(year, month + 1, 0).getDate();
    };

    // Generate calendar days for current month/year
    const generateCalendarDays = () => {
        const days: React.ReactNode[] = [];
        const firstDay = new Date(currentYear, currentMonth, 1).getDay();
        const daysInMonth = getDaysInMonth(currentYear, currentMonth);

        // Empty cells for days before month starts
        for (let i = 0; i < firstDay; i++) {
            days.push(
                <div key={`empty-${i}`} className="bg-dark-primary rounded-lg p-3 text-center text-gray-600 h-24"></div>
            );
        }

        // Days of the month
        const today = new Date();
        const isCurrentMonth = today.getMonth() === currentMonth && today.getFullYear() === currentYear;

        for (let day = 1; day <= daysInMonth; day++) {
            const dateKey = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const dayMeetings = meetings.filter(m => m.date === dateKey);
            const hasMeeting = dayMeetings.length > 0;
            const meetingColor = dayMeetings[0]?.color || 'blue';
            const isSelected = selectedDate === dateKey;
            const isToday = isCurrentMonth && day === today.getDate();

            days.push(
                <div
                    key={day}
                    onClick={() => hasMeeting ? setSelectedDate(dateKey) : setSelectedDate(null)}
                    className={`bg-dark-primary rounded-lg p-3 text-center h-24 transition-all ${hasMeeting ? 'cursor-pointer hover:scale-105' : 'cursor-default'
                        } ${hasMeeting ? `${getColorClass(meetingColor)} border-2 hover:border-opacity-70` :
                            isSelected ? 'border-2 border-gray-500' :
                                isToday ? 'border-2 border-yellow-500' : ''
                        }`}
                >
                    <div className={`font-semibold mb-1 ${isToday ? 'text-yellow-400' : 'text-white'}`}>
                        {day}
                    </div>
                    {hasMeeting && (
                        <div className="flex flex-col items-center gap-1">
                            <div className={`w-2 h-2 ${getColorDot(meetingColor)} rounded-full`}></div>
                            {dayMeetings.length > 1 && (
                                <span className="text-xs text-gray-400">+{dayMeetings.length - 1}</span>
                            )}
                        </div>
                    )}
                </div>
            );
        }

        return days;
    };

    // Get meetings for selected date
    const selectedDateMeetings = selectedDate
        ? meetings.filter(m => m.date === selectedDate)
        : [];
    return (
        <main id="main-content" className="max-w-7xl mx-auto px-6 py-8 w-full flex-grow">
            <div id="page-header" className="mb-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">My Account</h1>
                        <p className="text-gray-400">Manage your profile and view your upcoming meetings</p>
                    </div>
                    <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center">
                        <FaPenToSquare className="mr-2" />Edit Profile
                    </button>
                </div>
            </div>

            <div id="account-layout" className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div id="account-config-section" className="lg:col-span-1">
                    <div className="bg-dark-secondary rounded-xl border border-dark-border p-6">
                        <div className="flex flex-col items-center mb-6">
                            <div className="w-32 h-32 rounded-full border-4 border-dark-border mb-4 overflow-hidden bg-gray-700">
                                {/* Placeholder for avatar */}
                                <div className="w-full h-full flex items-center justify-center text-4xl">👩‍🎓</div>
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-1">Sarah Johnson</h2>
                            <p className="text-gray-400 text-sm mb-3">Student</p>
                            <span className="bg-green-500/20 text-green-400 px-4 py-1 rounded-full text-sm font-medium flex items-center">
                                <FaCircle className="text-xs mr-2" />Active
                            </span>
                        </div>

                        <div id="account-info" className="space-y-4 mb-6">
                            <div className="bg-dark-primary rounded-lg p-4 border border-dark-border">
                                <div className="flex items-center text-gray-400 text-sm mb-1">
                                    <FaEnvelope className="w-5" />
                                    <span className="ml-2">Email</span>
                                </div>
                                <p className="text-white font-medium ml-7">sarah.johnson@email.com</p>
                            </div>

                            <div className="bg-dark-primary rounded-lg p-4 border border-dark-border">
                                <div className="flex items-center text-gray-400 text-sm mb-1">
                                    <FaPhone className="w-5" />
                                    <span className="ml-2">Phone</span>
                                </div>
                                <p className="text-white font-medium ml-7">+1 (555) 123-4567</p>
                            </div>

                            <div className="bg-dark-primary rounded-lg p-4 border border-dark-border">
                                <div className="flex items-center text-gray-400 text-sm mb-1">
                                    <FaLocationDot className="w-5" />
                                    <span className="ml-2">Location</span>
                                </div>
                                <p className="text-white font-medium ml-7">New York, USA</p>
                            </div>

                            <div className="bg-dark-primary rounded-lg p-4 border border-dark-border">
                                <div className="flex items-center text-gray-400 text-sm mb-1">
                                    <FaCalendar className="w-5" />
                                    <span className="ml-2">Member Since</span>
                                </div>
                                <p className="text-white font-medium ml-7">January 2024</p>
                            </div>
                        </div>

                        <div id="account-stats" className="space-y-3 mb-6">
                            <h3 className="text-white font-semibold mb-4">Statistics</h3>
                            <div className="flex items-center justify-between bg-dark-primary rounded-lg p-3 border border-dark-border">
                                <div className="flex items-center">
                                    <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center mr-3">
                                        <FaCalendarCheck className="text-blue-400" />
                                    </div>
                                    <span className="text-gray-300 text-sm">Interesting Meets</span>
                                </div>
                                <span className="text-white font-bold text-lg">{meetings.length}</span>
                            </div>

                            <div className="flex items-center justify-between bg-dark-primary rounded-lg p-3 border border-dark-border">
                                <div className="flex items-center">
                                    <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center mr-3">
                                        <FaBook className="text-purple-400" />
                                    </div>
                                    <span className="text-gray-300 text-sm">Enrolled Courses</span>
                                </div>
                                <span className="text-white font-bold text-lg">12</span>
                            </div>

                            <div className="flex items-center justify-between bg-dark-primary rounded-lg p-3 border border-dark-border">
                                <div className="flex items-center">
                                    <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center mr-3">
                                        <FaStar className="text-green-400" />
                                    </div>
                                    <span className="text-gray-300 text-sm">Ratings Given</span>
                                </div>
                                <span className="text-white font-bold text-lg">24</span>
                            </div>
                        </div>

                        <button
                            onClick={() => signOut({ callbackUrl: '/' })}
                            className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 px-4 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center"
                        >
                            <FaRightFromBracket className="mr-2" />Logout
                        </button>
                    </div>
                </div>

                <div id="calendar-section" className="lg:col-span-2">
                    <div className="bg-dark-secondary rounded-xl border border-dark-border p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-white">My Calendar - Interesting Meets</h2>
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => navigateMonth('prev')}
                                    className="bg-dark-primary hover:bg-dark-muted text-gray-400 hover:text-white px-4 py-2 rounded-lg transition-all duration-300"
                                    title="Previous month"
                                >
                                    <FaChevronLeft />
                                </button>
                                <span className="text-white font-semibold px-4 min-w-[180px] text-center">
                                    {getMonthName(currentMonth)} {currentYear}
                                </span>
                                <button
                                    onClick={() => navigateMonth('next')}
                                    className="bg-dark-primary hover:bg-dark-muted text-gray-400 hover:text-white px-4 py-2 rounded-lg transition-all duration-300"
                                    title="Next month"
                                >
                                    <FaChevronRight />
                                </button>
                                <button
                                    onClick={goToToday}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ml-2"
                                >
                                    Today
                                </button>
                            </div>
                        </div>

                        <div id="calendar-grid" className="mb-6">
                            <div className="grid grid-cols-7 gap-2 mb-3">
                                <div className="text-center text-gray-400 text-sm font-semibold py-2">Sun</div>
                                <div className="text-center text-gray-400 text-sm font-semibold py-2">Mon</div>
                                <div className="text-center text-gray-400 text-sm font-semibold py-2">Tue</div>
                                <div className="text-center text-gray-400 text-sm font-semibold py-2">Wed</div>
                                <div className="text-center text-gray-400 text-sm font-semibold py-2">Thu</div>
                                <div className="text-center text-gray-400 text-sm font-semibold py-2">Fri</div>
                                <div className="text-center text-gray-400 text-sm font-semibold py-2">Sat</div>
                            </div>

                            <div className="grid grid-cols-7 gap-2">
                                {generateCalendarDays()}
                            </div>
                        </div>

                        {/* Selected Date Meetings Cards */}
                        {selectedDate && selectedDateMeetings.length > 0 && (
                            <div id="selected-date-meetings" className="mb-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-xl font-bold text-white">
                                        Meetings on {new Date(selectedDate).toLocaleDateString('en-US', {
                                            month: 'long',
                                            day: 'numeric',
                                            year: 'numeric'
                                        })}
                                    </h3>
                                    <button
                                        onClick={() => setSelectedDate(null)}
                                        className="text-gray-400 hover:text-white transition-colors text-sm"
                                    >
                                        Close
                                    </button>
                                </div>
                                <div className="space-y-3">
                                    {selectedDateMeetings.map((meeting) => {
                                        const colorClass = getColorBorder(meeting.color);
                                        const iconColor = meeting.color === 'green' ? 'text-green-400' :
                                            meeting.color === 'purple' ? 'text-purple-400' :
                                                'text-blue-400';
                                        const bgColor = meeting.color === 'green' ? 'bg-green-500/10' :
                                            meeting.color === 'purple' ? 'bg-purple-500/10' :
                                                'bg-blue-500/10';

                                        return (
                                            <div
                                                key={meeting.id}
                                                className={`bg-dark-primary rounded-lg p-4 border-l-4 ${colorClass} ${bgColor}`}
                                            >
                                                <div className="flex items-start justify-between">
                                                    <div className="flex-1">
                                                        <div className="flex items-center mb-2">
                                                            <FaCalendar className={`${iconColor} mr-2`} />
                                                            <span className="text-white font-semibold">{meeting.title}</span>
                                                        </div>
                                                        <p className="text-gray-400 text-sm mb-2">{meeting.professor}</p>
                                                        <div className="flex items-center text-gray-400 text-sm gap-4">
                                                            <div className="flex items-center">
                                                                <FaClock className="mr-2" />
                                                                <span>{meeting.time}</span>
                                                            </div>
                                                            <span>•</span>
                                                            <span>{meeting.duration}</span>
                                                            <span>•</span>
                                                            <span>{meeting.location}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        <div id="upcoming-meets" className="space-y-4">
                            <h3 className="text-xl font-bold text-white mb-4">Upcoming Interesting Meets</h3>

                            {upcomingMeetings.length === 0 ? (
                                <div className="bg-dark-primary rounded-lg p-6 border border-dark-border text-center">
                                    <p className="text-gray-400">No upcoming meetings. Mark interest in meetings from professor profiles to see them here!</p>
                                </div>
                            ) : (
                                upcomingMeetings.map((meeting) => {
                                    const date = new Date(meeting.date);
                                    const formattedDate = date.toLocaleDateString('en-US', {
                                        month: 'short',
                                        day: 'numeric',
                                        year: 'numeric'
                                    });
                                    const colorClass = getColorBorder(meeting.color);
                                    const iconColor = meeting.color === 'green' ? 'text-green-400' :
                                        meeting.color === 'purple' ? 'text-purple-400' :
                                            'text-blue-400';
                                    const buttonColor = meeting.color === 'green' ? 'bg-green-500/20 hover:bg-green-500/30 text-green-400' :
                                        meeting.color === 'purple' ? 'bg-purple-500/20 hover:bg-purple-500/30 text-purple-400' :
                                            'bg-blue-500/20 hover:bg-blue-500/30 text-blue-400';

                                    return (
                                        <div key={meeting.id} className={`bg-dark-primary rounded-lg p-4 border-l-4 ${colorClass}`}>
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <div className="flex items-center mb-2">
                                                        <FaCalendar className={`${iconColor} mr-2`} />
                                                        <span className="text-white font-semibold">{meeting.title}</span>
                                                    </div>
                                                    <p className="text-gray-400 text-sm mb-2">{meeting.professor}</p>
                                                    <div className="flex items-center text-gray-400 text-sm">
                                                        <FaClock className="mr-2" />
                                                        <span>{formattedDate} - {meeting.time}</span>
                                                    </div>
                                                </div>
                                                <button className={`${buttonColor} px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300`}>
                                                    View Details
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
