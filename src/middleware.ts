import { withAuth } from 'next-auth/middleware'

export default withAuth(
  function middleware(req) {
    // Add any additional middleware logic here
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // DEVELOPMENT MODE: Bypass authentication for admin routes
        if (req.nextUrl.pathname.startsWith('/admin')) {
          return true
        }
        return true
      }
    },
    pages: {
      signIn: '/admin/login'
    }
  }
)

export const config = {
  matcher: ['/admin/:path*']
}