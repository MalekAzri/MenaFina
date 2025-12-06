// Utility functions for managing meetings/interests

export interface Meeting {
    id: string;
    title: string;
    professor: string;
    date: string; // Format: "YYYY-MM-DD"
    time: string; // Format: "HH:MM AM/PM"
    duration: string;
    location: string;
    status: 'interested' | 'confirmed' | 'cancelled';
    color?: string; // For calendar display
}

const STORAGE_KEY = 'user_meetings';

export function getMeetings(): Meeting[] {
    if (typeof window === 'undefined') return [];
    
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (error) {
        console.error('Error reading meetings from localStorage:', error);
        return [];
    }
}

export function addMeeting(meeting: Omit<Meeting, 'id'>): Meeting {
    const meetings = getMeetings();
    const newMeeting: Meeting = {
        ...meeting,
        id: Date.now().toString(),
    };
    
    // Check if meeting already exists (same title, date, time)
    const exists = meetings.some(
        m => m.title === meeting.title && 
             m.date === meeting.date && 
             m.time === meeting.time
    );
    
    if (!exists) {
        meetings.push(newMeeting);
        saveMeetings(meetings);
    }
    
    return newMeeting;
}

export function removeMeeting(meetingId: string): void {
    const meetings = getMeetings();
    const filtered = meetings.filter(m => m.id !== meetingId);
    saveMeetings(filtered);
}

export function removeMeetingByDetails(title: string, date: string, time: string): boolean {
    const meetings = getMeetings();
    const initialLength = meetings.length;
    const filtered = meetings.filter(
        m => !(m.title === title && m.date === date && m.time === time)
    );
    
    if (filtered.length < initialLength) {
        saveMeetings(filtered);
        return true; // Meeting was removed
    }
    return false; // Meeting not found
}

export function findMeetingByDetails(title: string, date: string, time: string): Meeting | undefined {
    const meetings = getMeetings();
    return meetings.find(
        m => m.title === title && m.date === date && m.time === time
    );
}

export function saveMeetings(meetings: Meeting[]): void {
    if (typeof window === 'undefined') return;
    
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(meetings));
    } catch (error) {
        console.error('Error saving meetings to localStorage:', error);
    }
}

export function getMeetingsByDate(date: string): Meeting[] {
    const meetings = getMeetings();
    return meetings.filter(m => m.date === date);
}

export function getMeetingsForMonth(year: number, month: number): Meeting[] {
    const meetings = getMeetings();
    return meetings.filter(m => {
        const meetingDate = new Date(m.date);
        return meetingDate.getFullYear() === year && meetingDate.getMonth() === month;
    });
}
