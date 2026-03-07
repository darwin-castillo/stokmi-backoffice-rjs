import { BASE_URL, handleResponse } from "./httpClient";
export const authService = {

    login: async (credentials) => {
        const response = await fetch(`${BASE_URL}/users/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
        });
        return handleResponse(response);
    },
} 