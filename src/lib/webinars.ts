// Webinars library - centralized source for all webinars
// Dates are stored in YYYY-MM-DD format for consistency with calendar

export interface Webinar {
    id: string;
    title: string;
    professor: string;
    date: string; // Format: "YYYY-MM-DD" for storage
    time: string; // Format: "HH:MM AM/PM"
    duration: string;
    location: string;
    status: 'available' | 'full';
    color: 'blue' | 'green' | 'purple';
}

// Helper function to format date for display
export function formatDateForDisplay(dateStr: string): string {
    const date = new Date(dateStr + 'T00:00:00'); // Add time to avoid timezone issues
    return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
    });
}

// Helper function to get current year
function getCurrentYear(): number {
    return new Date().getFullYear();
}

// Helper function to get a date X days from today
function getDateDaysFromToday(days: number): string {
    const date = new Date();
    date.setDate(date.getDate() + days);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// Get webinars for a specific professor
export function getWebinarsByProfessor(professorName: string): Webinar[] {
    return getAllWebinars().filter(w => w.professor === professorName);
}

// Get all available webinars
export function getAllWebinars(): Webinar[] {
    const currentYear = getCurrentYear();
    
    // Generate dates that are in the future (7, 10, and 14 days from today)
    const date1 = getDateDaysFromToday(7);
    const date2 = getDateDaysFromToday(10);
    const date3 = getDateDaysFromToday(14);
    
    return [
        {
            id: 'webinar-1',
            title: 'Portfolio Review Session',
            professor: 'Dr. Michael Chen',
            date: date1, // 7 days from today
            time: '2:00 PM',
            duration: '45 minutes',
            location: 'Online',
            status: 'available',
            color: 'blue',
        },
        {
            id: 'webinar-2',
            title: 'Financial Modeling Q&A',
            professor: 'Dr. Michael Chen',
            date: date2, // 10 days from today
            time: '4:00 PM',
            duration: '30 minutes',
            location: 'Online',
            status: 'available',
            color: 'green',
        },
        {
            id: 'webinar-3',
            title: 'Investment Strategy Workshop',
            professor: 'Dr. Michael Chen',
            date: date3, // 14 days from today
            time: '1:00 PM',
            duration: '60 minutes',
            location: 'Online',
            status: 'full',
            color: 'purple',
        },
    ];
}

// Get a specific webinar by ID
export function getWebinarById(id: string): Webinar | undefined {
    return getAllWebinars().find(w => w.id === id);
}
