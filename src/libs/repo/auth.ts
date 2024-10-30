export type Token = "user" | "member" | "anonymous" | string;

export function SetUserToken(token: string) {
  if (isCheckUndefined()) {
    localStorage.setItem("user-token", token);
  }
}

export function ClearUserToken() {
  if (isCheckUndefined()) {
    localStorage.removeItem("user-token");
  }
}
export function GetUserToken() {
  if (isCheckUndefined()) {
    return localStorage.getItem("user-token") || "";
  }
}

export function SetUserInfo(data: any) {
  if (isCheckUndefined()) {
    localStorage.setItem("user", JSON.stringify(data));
  }
}
export function GetUserInfo() {
  if (isCheckUndefined()) {
    return localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user") || "")
      : undefined;
  }
}

export function ClearUserInfo() {
  if (isCheckUndefined()) {
    localStorage.removeItem("user");
  }
}
export function SetCoinDeposit(value: string) {
  if (isCheckUndefined()) {
    localStorage.setItem("COIN_DEPOSIT", value);
  }
}

export function getCurrentToken() {
  let token = GetUserToken();

  return token;
}

// check window browser
function isCheckUndefined() {
  if (typeof window !== "undefined") {
    return true;
  }
}
