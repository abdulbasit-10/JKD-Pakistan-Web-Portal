import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// Ye routes pe POST (naya apply/booking submit karna) public hai — login zaroori nahi
const PUBLIC_SUBMISSION_ROUTES = [
  "/api/apply",
  "/api/apply/job",
  "/api/apply/tourism",
  "/api/booking",
  "/api/challan/upload",
  "/api/contact",
  "/api/users/signup",
];

function isPublicSubmission(pathname, method) {
  if (method !== "POST") return false;
  return PUBLIC_SUBMISSION_ROUTES.includes(pathname);
}

// Inhi prefixes pe GET listing / PUT / DELETE sirf admin kar sake
const ADMIN_ONLY_PREFIXES = ["/api/apply", "/api/booking", "/api/users", "/api/challan"];

export async function middleware(req) {
  const { pathname } = req.nextUrl;
  const method = req.method;

  // ✅ Public forms ko token check se guzarna nahi
  if (isPublicSubmission(pathname, method)) {
    return NextResponse.next();
  }

  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-user-id", decoded.sub || decoded.id || "");
    requestHeaders.set("x-user-email", decoded.email || "");
    requestHeaders.set("x-user-role", decoded.role || "user");

    const isAdminPage = pathname.startsWith("/admin");
    const isAdminApi = ADMIN_ONLY_PREFIXES.some((prefix) => pathname.startsWith(prefix));

    // ✅ Ab GET listing bhi admin-only hai, sirf mutations nahi
    if ((isAdminPage || isAdminApi) && decoded.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    return NextResponse.next({ request: { headers: requestHeaders } });
  } catch (err) {
    return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
  }
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/apply/:path*",
    "/api/booking/:path*",
    "/api/users/:path*",
    "/api/challan/:path*",
    "/api/me",
  ],
};

