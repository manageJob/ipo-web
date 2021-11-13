export interface Setting {
    id?: string
    name: string
    lastname: string
    username: string
    password?: string
    telephoneNumber: string
    bankName: string
    bankAccountName: string
    bankNumber: string
    newPassword?: string
    confirmPassword?: string
  }

  export interface NewPasswordSet {
    newPassword: string
  }