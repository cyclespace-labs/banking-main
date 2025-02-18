import type { Models } from "appwrite"

export interface AppwriteUser extends Models.User<Models.Preferences> {
  // You can extend this interface if you need additional user properties
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegistrationCredentials extends LoginCredentials {
  name: string
}

export interface AuthError {
  message: string
  code?: number
}

