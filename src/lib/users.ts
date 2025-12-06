// In-memory storage for registered users (for prototype purposes)
// In production, this would be replaced with a real database

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: 'student' | 'professor';
    university?: string;
    specialization?: string;
}

// In-memory storage
const users: Map<string, User> = new Map();

export function registerUser(userData: Omit<User, 'id'>): User {
    const id = Date.now().toString();
    const user: User = {
        id,
        ...userData,
    };
    users.set(user.email.toLowerCase(), user);
    return user;
}

export function getUserByEmail(email: string): User | undefined {
    return users.get(email.toLowerCase());
}

export function verifyUser(email: string, password: string): User | null {
    const user = getUserByEmail(email);
    if (user && user.password === password) {
        return user;
    }
    return null;
}

