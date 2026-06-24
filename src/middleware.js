import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function middleware(req) {
  console.log("Middleware triggered for:", req.nextUrl.pathname);
  console.log("Request method:", req.method);
  if (req.method !== "GET") {
    return NextResponse.next(); // skip for POST, PUT, etc.
  }
  // Get token from cookies
  const token = req.cookies.get("token")?.value;
  // console.log("inside middleware " , token)
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Verify token using jsonwebtoken
    // const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    // // Attach user info to request headers
    const requestHeaders = new Headers(req.headers);
    // requestHeaders.set("x-user-id", decoded.sub || decoded.id || "");
    // requestHeaders.set("x-user-email", decoded.email || "");
    // requestHeaders.set("x-user-role", decoded.role || "user");
    
    requestHeaders.set("x-user-token", token)
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
    // return NextResponse.next();
  } catch (err) {
    console.error("JWT verification failed:", err.message);
    return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
  }
}

// Apply only to protected API routes
export const config = {
    // i have to add more route to this
  matcher: [
    "/api/apply",
    "/api/booking",
    "/api/users",
  ], 
};
