// Fake "who am I" for development (VITE_USE_MOCK=true).
// You are the administrator "Oplites Deep". To see the app as an operator,
// run this in the browser console and reload:
//   localStorage.setItem("mock-role", "operator")
// and to go back:
//   localStorage.removeItem("mock-role")
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export function getMockCurrentUser() {
  let operator = false;
  try {
    operator = localStorage.getItem("mock-role") === "operator";
  } catch {
    // storage not available: stay admin
  }

  return operator
    ? { id: 2, name: "Αξιωματικός Πύλης", email: "gate.guard@sse.com", role: "operator" }
    : { id: 1, name: "Oplites Deep", email: "oplites.deep@sse.com", role: "admin" };
}

export async function mockAuthRequest(path = "") {
  await delay(300);
  if (path === "/me") return getMockCurrentUser();
  throw new Error(`Mock: unknown route ${path}`);
}
