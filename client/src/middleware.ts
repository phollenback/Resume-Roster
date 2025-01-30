import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// const isProtectedRoute = createRouteMatcher(["/user-profile"]);
const isPublicRoute = createRouteMatcher(["/", "/sign-in(.*)", "/sign-up(.*)"]);

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

interface SessionClaims {
    metadata: {
      role?: string; // optional to prevent TypeScript errors if role is not defined
    };
    // include other properties as necessary
  }
  
  export default clerkMiddleware(async (auth, req) => {
    const { userId, redirectToSignIn, sessionClaims } = await auth();
    
    const claims = sessionClaims as unknown as SessionClaims;
  
    if (
      isAdminRoute(req) &&
      claims.metadata?.role !== "admin"
    ) {
      const url = new URL("/", req.url);
      return NextResponse.redirect(url);
    }
  
    if (!userId && !isPublicRoute(req)) {
      // Add custom logic to run before redirecting
  
      return redirectToSignIn();
    }
  });

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};