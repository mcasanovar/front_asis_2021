import { GiModel } from "./gi.models";

export interface UserLogged {
  gi: GiModel,
  permisos: string[],
  rol: string,
  token: string
}