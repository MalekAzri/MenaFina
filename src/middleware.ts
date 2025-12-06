import { withAuth } from "next-auth/middleware"

export default withAuth(
    function middleware(req) {
        // Custom logic if needed, or empty to just enforce auth
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token
        },
    }
)

export const config = {
    // Protect all routes except home, login, register, and static assets
    matcher: [
        "/simulator/:path*",
        "/chatbot/:path*",
        "/prof-student-space/:path*",
        "/account/:path*"
    ]
}
