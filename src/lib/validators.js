// Common regex patterns
export const REGEX = {
  name: /^[a-zA-Z\s.'-]{2,80}$/,               // sirf letters, spaces, ', ., -
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^\d{10,15}$/,                         // 10-15 digits
  cnic: /^\d{5}-?\d{7}-?\d{1}$/,                // 12345-1234567-1 ya bina dash
  alphaNum: /^[a-zA-Z0-9\s,.'-]{2,200}$/,       // subject/message jaisi fields
  username: /^[a-zA-Z0-9_]{3,30}$/,             // letters, numbers, underscore, 3-30 chars
};

export function isValidName(value) {
  return typeof value === "string" && REGEX.name.test(value.trim());
}
export function isValidEmail(value) {
  return typeof value === "string" && REGEX.email.test(value.trim());
}
export function isValidPhone(value) {
  return typeof value === "string" && REGEX.phone.test(value.trim());
}
export function isValidCNIC(value) {
  return typeof value === "string" && REGEX.cnic.test(value.trim());
}
export function isValidText(value, min = 2, max = 500) {
  if (typeof value !== "string") return false;
  const trimmed = value.trim();
  return trimmed.length >= min && trimmed.length <= max;
}

// ✅ Naya: Password validation (signup ke liye — kam se kam 6 characters)
export function isValidPassword(value) {
  return typeof value === "string" && value.trim().length >= 6;
}

// ✅ Naya: Username validation (signup ke liye)
export function isValidUsername(value) {
  return typeof value === "string" && REGEX.username.test(value.trim());
}

// HTML mein safely insert karne ke liye (email templates mein XSS/injection se bachne ke liye)
export function escapeHtml(value) {
  if (typeof value !== "string") return "";
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

// File validation — .txt aur koi bhi unwanted type block karega
const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB

export function validateFile(file, { allowedTypes = ALLOWED_FILE_TYPES, maxSize = MAX_FILE_SIZE_BYTES } = {}) {
  if (!file || typeof file === "string") {
    return { valid: false, error: "Invalid file" };
  }
  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: "Only JPG, PNG, WEBP or PDF files are allowed" };
  }
  if (file.size > maxSize) {
    return { valid: false, error: "File size must be under 5MB" };
  }
  return { valid: true };
}
