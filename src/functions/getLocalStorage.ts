import { UserLogged } from "../models/user.models";

export const getUserFromLocalStorage = () => {
  const aux = localStorage.getItem('userLogged');
  const res: UserLogged = !!aux ? JSON.parse(aux) : null;
  return res;
};