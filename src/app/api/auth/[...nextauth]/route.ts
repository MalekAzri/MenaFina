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
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                // Import and verify user from registered users
                const { verifyUser } = await import('@/lib/users');
                const user = verifyUser(credentials.email, credentials.password);

                if (!user) {
                    return null; // Invalid credentials
                }

                // Return user object for NextAuth
                return {
                    id: user.id,
                    name: `${user.firstName} ${user.lastName}`, // Use full name as the display name
                    email: user.email,
                    image: "/profile-picture.png", // Use local profile picture
                    role: user.role,
                };
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
                token.name = user.name || undefined;
                token.email = user.email || undefined;
                token.image = user.image || undefined;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
                session.user.role = token.role as string;
                session.user.name = token.name as string;
                session.user.email = token.email as string;
                session.user.image = token.image as string;
            }
            return session
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }
