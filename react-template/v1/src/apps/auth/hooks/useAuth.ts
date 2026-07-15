export function useAuth() {
  return {
    isAuthenticated: Boolean(localStorage.getItem("access_token")),
  };
}
