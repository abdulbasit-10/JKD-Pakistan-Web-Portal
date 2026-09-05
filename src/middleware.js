import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

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

// ✅ Ye exact paths kisi bhi logged-in user (student ya admin) ko allow hain
const AUTHENTICATED_ONLY_EXACT = ["/api/apply/my", "/api/me"];

// ✅ Challan ko ID se fetch karna (jaise /api/challan/68abc123...) — authenticated user ke liye allow,
// ownership check khud route ke andar hoga
function isChallanIdRoute(pathname) {
  return /^\/api\/challan\/[a-f\d]{24}$/i.test(pathname);
}

const ADMIN_ONLY_PREFIXES = ["/api/apply", "/api/booking", "/api/users", "/api/challan"];

const secret = new TextEncoder().encode(process.env.TOKEN_SECRET);

export async function middleware(req) {
  const { pathname } = req.nextUrl;
  const method = req.method;

  if (isPublicSubmission(pathname, method)) {
    return NextResponse.next();
  }

  const token = req.cookies.get("token")?.value;

  if (!token) {
    return handleUnauthenticated(req, pathname);
  }

  try {
    const { payload: decoded } = await jwtVerify(token, secret);

    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-user-id", decoded.sub || "");
    requestHeaders.set("x-user-email", decoded.email || "");
    requestHeaders.set("x-user-role", decoded.role || "user");
    requestHeaders.set("x-user-token", token);

    const isAdminPage = pathname.startsWith("/admin");

    const isExemptFromAdminCheck =
      AUTHENTICATED_ONLY_EXACT.includes(pathname) || isChallanIdRoute(pathname);

    const isAdminApi =
      ADMIN_ONLY_PREFIXES.some((prefix) => pathname.startsWith(prefix)) &&
      !isExemptFromAdminCheck;

    if ((isAdminPage || isAdminApi) && decoded.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    return NextResponse.next({ request: { headers: requestHeaders } });
  } catch (err) {
    console.error("🔴 Middleware JWT verify failed:", err.message);
    return handleUnauthenticated(req, pathname, true);
  }
}

function handleUnauthenticated(req, pathname, clearCookie = false) {
  const isPageRoute = pathname.startsWith("/admin") || pathname.startsWith("/student");

  let response;
  if (isPageRoute) {
    response = NextResponse.redirect(new URL("/login", req.url));
  } else {
    response = NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (clearCookie) {
    response.cookies.delete("token");
  }

  return response;
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/student/:path*",
    "/api/apply/:path*",
    "/api/booking/:path*",
    "/api/users/:path*",
    "/api/challan/:path*",
    "/api/me",
  ],
};

