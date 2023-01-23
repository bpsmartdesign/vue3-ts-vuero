import {
  UserAuthLogin,
  UserAuthRegister,
} from './../types/app.d'

//#region Empty User Auth
export const _emptyUserAuth: UserAuthLogin = {
  email: '',
  password: '',
}
export const _emptyUserRegister: UserAuthRegister = {
  ..._emptyUserAuth,
  fullName: '',
}
//#endregion
