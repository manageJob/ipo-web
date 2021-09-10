export interface User {
    name: string
    lastname: string
    username: string
    password?: string
    telephoneNumber: string
    bankName: string
    bankNumber: string
    role: string;
  }

  export interface Criteria {
    name?: string
    lastname?: string
  }
