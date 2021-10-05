import { UserLogged } from "../models/user.models";

export const getUserFromLocalStorage = () => {
  const aux = localStorage.getItem('userLogged');
  const res: UserLogged = !!aux ? JSON.parse(aux) : null;
  return res;
};

export const setObjectToLocalStorage = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const getObjectToLocalStorage = (key: string) => {
  const objectReturned = localStorage.getItem(key);
  if (objectReturned !== null) {
    return JSON.parse(objectReturned)
  }
  else{
    return null
  }
}