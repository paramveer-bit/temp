"use client";

import { useEffect } from "react";
import { api } from "@/lib/axios";
import { useAuth } from "@/provider/AuthContext";
import { AuthResponse } from "@/types";

const useAxiosAuth = () => {
    const { accessToken, setAccessToken, setUser } = useAuth();

    useEffect(() => {
        // 1. Request Interceptor: Attach Token
        const requestIntercept = api.interceptors.request.use(
            (config) => {
                if (!config.headers["Authorization"] && accessToken) {
                    config.headers["Authorization"] = `Bearer ${accessToken}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        // 2. Response Interceptor: Handle 401 & Refresh
        const responseIntercept = api.interceptors.response.use(
            (response) => response,
            async (error) => {
                const prevRequest = error.config;

                // If 401 (Unauthorized) and we haven't retried yet
                if (error.response?.status === 401 && !prevRequest._retry) {
                    prevRequest._retry = true;

                    try {
                        // Call refresh endpoint (Cookie is sent automatically)
                        const response = await api.get<AuthResponse>("/auth/refresh-access-token");

                        const newAccessToken = response.data.accessToken;

                        // Update State
                        setAccessToken(newAccessToken);
                        setUser(response.data.user); // Optional: Update user info if needed

                        // Update Header and Retry Request
                        prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
                        return api(prevRequest);
                    } catch (refreshError) {
                        // Refresh failed (Session expired)
                        setAccessToken(null);
                        setUser(null);
                        // Optional: Redirect to login page
                        // window.location.href = '/login'; 
                        return Promise.reject(refreshError);
                    }
                }

                return Promise.reject(error);
            }
        );

        // Cleanup
        return () => {
            api.interceptors.request.eject(requestIntercept);
            api.interceptors.response.eject(responseIntercept);
        };
    }, [accessToken, setAccessToken, setUser]);

    return api;
};

export default useAxiosAuth;