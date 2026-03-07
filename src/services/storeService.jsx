
import { BASE_URL, getHeaders, handleResponse } from "./httpClient"
export const storeService = {

    getAllStores: async () => {
        console.log("urlStores ", `${BASE_URL}/stores`);
        const response = await fetch(`${BASE_URL}/stores`, {
            headers: getHeaders(),
        });

        return handleResponse(response);

    }
}