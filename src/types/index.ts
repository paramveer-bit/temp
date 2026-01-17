export interface User {
    id: string;
    name: string;
    email: string;
    number: string;
    isApproved: boolean;
    accountVerified: boolean;
}

export interface AuthResponse {
    accessToken: string;
    user: User;
}