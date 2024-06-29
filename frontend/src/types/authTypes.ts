export interface RegisterRequest {
    username: string;
    email: string;
    password: string;
}

export interface RegisterResponse {
    id: string;
    username: string;
    email: string;
}

export interface VerifyEmailRequest {
    token: string;
}

export interface VerifyEmailResponse {
    detail: string;
}

export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    refresh: string;
    access: string;
}

export interface RefreshTokenRequest {
    refresh: string;
}

export interface RefreshTokenResponse {
    access: string;
}

export interface ForgotPasswordRequest {
    email: string;
}

export interface ForgotPasswordResponse {
    detail: string;
}

export interface ResetPasswordRequest {
    token: string;
    new_password: string;
}

export interface ResetPasswordResponse {
    detail: string;
}

export interface ChangePasswordRequest {
    old_password: string;
    new_password: string;
}

export interface ChangePasswordResponse {
    detail: string;
}

export interface UpdateUserRequest {
    username: string;
}

export interface UpdateUserResponse {
    username: string;
}

export interface UpdateEmailRequest {
    new_email: string;
}

export interface UpdateEmailResponse {
    detail: string;
}

export interface VerifyNewEmailRequest {
    token: string;
}

export interface VerifyNewEmailResponse {
    detail: string;
}