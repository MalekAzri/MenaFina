// Utility functions for managing professor's scheduled meetings

import { Meeting } from './meetings';

const STORAGE_KEY = 'professor_meetings';

export interface ProfessorMeeting {
    id: string;
    title: string;
    date: string; // Format: "YYYY-MM-DD"
    time: string; // Format: "HH:MM AM/PM"
    duration: string;
    location: string;
    status: 'scheduled' | 'confirmed' | 'cancelled';
    color?: string; // For calendar display
    description?: string;
}

export function getProfessorMeetings(): ProfessorMeeting[] {
    if (typeof window === 'undefined') return [];
    
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (error) {
        console.error('Error reading professor meetings from localStorage:', error);
        return [];
    }
}

export function addProfessorMeeting(meeting: Omit<ProfessorMeeting, 'id'>): ProfessorMeeting {
    const meetings = getProfessorMeetings();
    const newMeeting: ProfessorMeeting = {
        ...meeting,
        id: Date.now().toString(),
    };
    
    meetings.push(newMeeting);
    saveProfessorMeetings(meetings);
    
    return newMeeting;
}

export function removeProfessorMeeting(meetingId: string): void {
    const meetings = getProfessorMeetings();
    const filtered = meetings.filter(m => m.id !== meetingId);
    saveProfessorMeetings(filtered);
}

export function updateProfessorMeeting(meetingId: string, updates: Partial<ProfessorMeeting>): void {
    const meetings = getProfessorMeetings();
    const index = meetings.findIndex(m => m.id === meetingId);
    
    if (index !== -1) {
        meetings[index] = { ...meetings[index], ...updates };
        saveProfessorMeetings(meetings);
    }
}

export function saveProfessorMeetings(meetings: ProfessorMeeting[]): void {
    if (typeof window === 'undefined') return;
    
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(meetings));
    } catch (error) {
        console.error('Error saving professor meetings to localStorage:', error);
    }
}

export function getProfessorMeetingsByDate(date: string): ProfessorMeeting[] {
    const meetings = getProfessorMeetings();
    return meetings.filter(m => m.date === date);
}

export function getProfessorMeetingsForMonth(year: number, month: number): ProfessorMeeting[] {
    const meetings = getProfessorMeetings();
    return meetings.filter(m => {
        const meetingDate = new Date(m.date);
        return meetingDate.getFullYear() === year && meetingDate.getMonth() === month;
    });
}
