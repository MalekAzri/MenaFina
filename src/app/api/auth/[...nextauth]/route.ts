import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                // Mock authentication - accept any login for prototype
                if (credentials?.email) {
                    // Simulate user based on email or role
                    const isProfessor = credentials.email.toLowerCase().includes('professor');

                    const user = {
                        id: isProfessor ? "2" : "1",
                        name: isProfessor ? "Dr. Sarah Johnson" : "Student User",
                        email: credentials.email,
                        image: isProfessor ? "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg" : "https://i.pravatar.cc/150?u=student",
                        role: isProfessor ? "professor" : "student"
                    }
                    return user
                }
                return null
            }
        })
    ],
    pages: {
        signIn: '/login',
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id;
                session.user.role = token.role;
            }
            return session
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }
