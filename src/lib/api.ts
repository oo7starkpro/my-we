export async function apiGet(path: string) {
  const token = localStorage.getItem("auth_token");

  const res = await fetch(`http://localhost:3000${path}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  if (!res.ok) throw new Error("Request failed");

  return res.json();
}
export async function api(path: string, options: RequestInit = {}) {
  const token = localStorage.getItem("auth_token");

  const res = await fetch(`http://localhost:3000${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
      ...(options.headers || {})
    }
  });

  if (!res.ok) {
    throw await res.json();
  }

  return res.json();
}
