import { localStorageKeys } from "../../core/storage/localStorage";

export function saveAccessToken(token: string) {
  localStorage.setItem(localStorageKeys.accessToken, token);
}

export function clearAccessToken() {
  localStorage.removeItem(localStorageKeys.accessToken);
}
