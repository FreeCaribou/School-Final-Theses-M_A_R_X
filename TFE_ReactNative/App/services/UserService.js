import { getRoute } from "./AuthService";

export const getAllUser = () => {
  return getRoute("users");
};
