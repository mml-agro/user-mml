import axios from "axios";
import { BASE_URL } from "../config";

const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
        Accept: "application/json",
        "ngrok-skip-browser-warning": "true",
    },
});

instance.interceptors.request.use(
    async (config) => {
        const isAuthEndpoint =
            config.url?.includes("auth/login") ||
            config.url?.includes("auth/register");

        if (config != null && !isAuthEndpoint) {
            if (config.data && !(config.data instanceof FormData)) {
                config.headers["Content-Type"] = "application/json";
            }
            // const schemaName = sessionStorage.getItem("schemaName");
            // console.log("Schema Name from sessionStorage:", schemaName);
            // if (schemaName && schemaName !== '') {
            //     if (!config.url?.includes("auth/")) {
            //         config.headers["X-Tenant-ID"] = schemaName;
            //     }
            // }
            const token = sessionStorage.getItem("token");
            if (token) {
                config.headers["Authorization"] = `Bearer ${token}`;
            }
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            const { status, data, config } = error.response;

            console.error("Response Error:", {
                url: config?.url,
                status,
                data,
            });

            // ✅ Return only backend error message
            return Promise.reject(data?.error || "Something went wrong");
        }

        if (error.request) {
            return Promise.reject("No response from server");
        }

        return Promise.reject(error.message);
    }
);

export async function loginAPI(reqData: any) {
    try {
        let endPoint = `auth/login`;
        let response = await instance.post(endPoint, reqData);
        return response;
    } catch (e) {
        console.log(e + " Occured! Please Try again");
        throw e; // Throw the error instead of returning it
    }
}

export async function registerAPI(reqData: any) {
    try {
        let endPoint = `auth/register`;
        let response = await instance.post(endPoint, reqData);
        return response;
    } catch (e) {
        console.log(e + " Occured! Please Try again");
        throw e; // Throw the error instead of returning it
    }
}

export async function logoutAPI() {
    try {
        let endPoint = `auth/logout`;
        let response = await instance.post(endPoint);
        return response;
    } catch (e) {
        console.log(e + " Occured! Please Try again");
        throw e; // Throw the error instead of returning it
    }
}

export async function getProductsAPI(page: number, size: number) {
    try {
        let endPoint = `products?page=${page}&size=${size}&sortBy=createdAt&direction=desc`;
        let response = await instance.get(endPoint);
        return response;
    } catch (e) {
        console.log(e + " Occured! Please Try again");
        throw e; // Throw the error instead of returning it
    }
}

export async function addCartAPI(reqData: any) {
    try {
        let endPoint = `cart`;
        let response = await instance.post(endPoint, reqData);
        return response;
    } catch (e) {
        console.log(e + " Occured! Please Try again");
        throw e; // Throw the error instead of returning it
    }
}

export async function getCartAPI() {
    try {
        let endPoint = `cart`;
        const response = await instance.get(endPoint);
        return response;
    } catch (e) {
        console.log(e + ' Occured! Please Try again');
        throw e;
    }
}

export async function clearCartAPI() {
    try {
        let endPoint = `cart`;
        const response = await instance.delete(endPoint);
        return response;
    } catch (e) {
        console.log(e + ' Occured! Please Try again');
        throw e;
    }
}

export async function removeCartAPI(cartItemId: string) {
    try {
        let endPoint = `cart/${cartItemId}`;
        const response = await instance.delete(endPoint);
        return response;
    } catch (e) {
        console.log(e + ' Occured! Please Try again');
        throw e;
    }
}

export async function updateCartAPI(cartItemId: string, quantity: any) {
    try {
        let endPoint = `cart/${cartItemId}?quantity=${quantity}`;
        const response = await instance.put(endPoint);
        return response;
    } catch (e) {
        console.log(e + ' Occured! Please Try again');
        throw e;
    }
}

export async function getAddressAPI() {
    try {
        let endPoint = `addresses`;
        const response = await instance.get(endPoint);
        return response;
    } catch (e) {
        console.log(e + ' Occured! Please Try again');
        throw e;
    }
}

export async function postAddressAPI(reqData: any) {
    try {
        let endPoint = `addresses`;
        const response = await instance.post(endPoint, reqData);
        return response;
    } catch (e) {
        console.log(e + ' Occured! Please Try again');
        throw e;
    }
}

export async function deleteAddressAPI(id: any) {
    try {
        let endPoint = `addresses/${id}`;
        const response = await instance.delete(endPoint);
        return response;
    } catch (e) {
        console.log(e + ' Occured! Please Try again');
        throw e;
    }
}

export async function editAddressAPI(id: any, reqData: any) {
    try {
        let endPoint = `addresses/${id}`;
        const response = await instance.put(endPoint, reqData);
        return response;
    } catch (e) {
        console.log(e + ' Occured! Please Try again');
        throw e;
    }
}

export async function addOrdersAPI(reqData: any) {
    try {
        let endPoint = `orders`;
        const response = await instance.post(endPoint, reqData);
        return response;
    } catch (e) {
        console.log(e + ' Occured! Please Try again');
        throw e;
    }
}

export async function getCouponsAPI() {
    try {
        let endPoint = `coupons`;
        const response = await instance.get(endPoint);
        return response;
    } catch (e) {
        console.log(e + ' Occured! Please Try again');
        throw e;
    }
}

export async function getValidateAPI(reqData: any) {
    try {
        let endPoint = `coupons/validate`;
        const response = await instance.post(endPoint, reqData);
        return response;
    } catch (e) {
        console.log(e + ' Occured! Please Try again');
        throw e;
    }
}

export async function getOrdersAPI(page: number, size: number) {
    try {
        let endPoint = `orders/my?page=${page}&size=${size}`;
        const response = await instance.get(endPoint);
        return response;
    } catch (e) {
        console.log(e + ' Occured! Please Try again');
        throw e;
    }
}

export async function postReviewsAPI(reqData: any) {
    try {
        let endPoint = `reviews`;
        const response = await instance.post(endPoint, reqData);
        return response;
    } catch (e) {
        console.log(e + ' Occured! Please Try again');
        throw e;
    }
}