// Who is signed in. If your login already stores the user somewhere, you can
// feed useCurrentUser from there instead and delete this file.
const BASE = "/api/auth";
const USE_MOCK = true;
// import.meta.env.DEV && import.meta.env.VITE_USE_MOCK === "true";

async function request(path) {
  if (USE_MOCK) {
    const { mockAuthRequest } = await import("./mockAuth");
    return mockAuthRequest(path);
  }

  const res = await fetch(`${BASE}${path}`, { credentials: "include" });
  if (!res.ok) {
    const error = new Error(`Request failed: ${res.status}`);
    error.status = res.status;
    throw error;
  }
  return res.json();
}

export const authApi = {
  // GET /api/auth/me -> { id, name, email, role: "admin" | "operator" }
  // 401 when nobody is signed in
  async getMe() {
    const data = await request("/me");
    return {
      id: data.id,
      name: data.name ?? data.full_name ?? "",
      email: data.email ?? "",
      role: data.role,
    };
  },
};
