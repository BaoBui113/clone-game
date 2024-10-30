import { GetUserToken } from "@/libs/repo/auth";

export const getTokenHost = () => {
  const token = GetUserToken();
  const host = "plus.plusgalaxy.com";
  return { token, host };
};
