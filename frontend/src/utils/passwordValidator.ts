import { RegisterRequest } from '../types/authTypes';

export interface PasswordValidationResult {
    isValid: boolean;
    errors: string[];
}

const commonPasswords = [
    // Add a subset of common passwords for demonstration
    'password', '123456', '123456789', '12345678', '12345', '1234567', '1234567890'
];

export const validatePassword = (password: string, user: Pick<RegisterRequest, 'username' | 'email'>): PasswordValidationResult => {
    const errors: string[] = [];
    const minLength = 8;

    if (password.length < minLength) {
        errors.push(`Password must be at least ${minLength} characters long.`);
    }

    if (commonPasswords.includes(password)) {
        errors.push('Password is too common.');
    }

    if (/^\d+$/.test(password)) {
        errors.push('Password cannot be entirely numeric.');
    }

    if (password.includes(user.username)) {
        errors.push('Password cannot contain your username.');
    }

    const emailParts = user.email.split('@');
    if (emailParts.length > 0 && password.includes(emailParts[0])) {
        errors.push('Password cannot contain part of your email.');
    }

    return {
        isValid: errors.length === 0,
        errors,
    };
};
