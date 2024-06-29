// src/api/authApi.ts

import {
    ChangePasswordRequest,
    ChangePasswordResponse,
    ForgotPasswordRequest,
    ForgotPasswordResponse,
    LoginRequest,
    LoginResponse,
    RefreshTokenRequest,
    RefreshTokenResponse,
    RegisterRequest,
    RegisterResponse,
    ResetPasswordRequest,
    ResetPasswordResponse,
    UpdateEmailRequest,
    UpdateEmailResponse,
    UpdateUserRequest,
    UpdateUserResponse,
    VerifyEmailRequest,
    VerifyEmailResponse,
    VerifyNewEmailRequest,
    VerifyNewEmailResponse
} from '../types/authTypes';
import axios from './axiosConfig';

const BASE_URL = `${import.meta.env.VITE_API_URL}api/auth`;

export const register = async (data: RegisterRequest): Promise<RegisterResponse> => {
    const response = await axios.post<RegisterResponse>(`${BASE_URL}/register/`, data, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.data;
};

export const verifyEmail = async (data: VerifyEmailRequest): Promise<VerifyEmailResponse> => {
    const response = await axios.post<VerifyEmailResponse>(`${BASE_URL}/verify-email/`, data, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.data;
};

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await axios.post<LoginResponse>(`${BASE_URL}/token/`, data, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.data;
};

export const refreshToken = async (data: RefreshTokenRequest): Promise<RefreshTokenResponse> => {
    const response = await axios.post<RefreshTokenResponse>(`${BASE_URL}/token/refresh/`, data, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.data;
};

export const forgotPassword = async (data: ForgotPasswordRequest): Promise<ForgotPasswordResponse> => {
    const response = await axios.post<ForgotPasswordResponse>(`${BASE_URL}/forgot-password/`, data, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.data;
};

export const resetPassword = async (data: ResetPasswordRequest): Promise<ResetPasswordResponse> => {
    const response = await axios.post<ResetPasswordResponse>(`${BASE_URL}/reset-password/`, data, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.data;
};

export const changePassword = async (data: ChangePasswordRequest, token: string): Promise<ChangePasswordResponse> => {
    const response = await axios.put<ChangePasswordResponse>(`${BASE_URL}/change-password/`, data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });
    return response.data;
};

export const updateUser = async (data: UpdateUserRequest, token: string): Promise<UpdateUserResponse> => {
    const response = await axios.put<UpdateUserResponse>(`${BASE_URL}/update-user/`, data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });
    return response.data;
};

export const updateEmail = async (data: UpdateEmailRequest, token: string): Promise<UpdateEmailResponse> => {
    const response = await axios.put<UpdateEmailResponse>(`${BASE_URL}/update-email/`, data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });
    return response.data;
};

export const verifyNewEmail = async (data: VerifyNewEmailRequest): Promise<VerifyNewEmailResponse> => {
    const response = await axios.post<VerifyNewEmailResponse>(`${BASE_URL}/verify-new-email/`, data, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.data;
};