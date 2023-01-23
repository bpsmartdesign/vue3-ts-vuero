//#region Global types
export interface Pagination {
  currentPage: number
  perPage: number
  total: number
  perPageOptions: number[]
}
//#endregion

//#region Auth type
export interface UserAuthLogin {
  email: string
  password: string
}
export interface UserAuthRegister extends UserAuthLogin {
  fullName: string
}

export interface UserData {
  created_at: string
  email: string
  email_verified: boolean
  full_name: string
  is_active: booelan
  profile_pic: string
  updated_at: string
  user_origin: string
  user_role: string
}
//#endregion
