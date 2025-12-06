import { NextRequest, NextResponse } from 'next/server';
import { registerUser } from '@/lib/users';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { firstName, lastName, email, password, role, university, specialization } = body;

        // Validate required fields
        if (!firstName || !lastName || !email || !password || !role) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Check if user already exists
        const { getUserByEmail } = await import('@/lib/users');
        if (getUserByEmail(email)) {
            return NextResponse.json(
                { error: 'User with this email already exists' },
                { status: 409 }
            );
        }

        // Register the user
        const user = registerUser({
            firstName,
            lastName,
            email,
            password,
            role,
            university,
            specialization,
        });

        return NextResponse.json(
            { 
                message: 'User registered successfully',
                user: {
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    role: user.role,
                }
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('Registration error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

