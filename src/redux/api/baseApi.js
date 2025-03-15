import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiUrl } from "../../config";

export const baseApi = createApi({
	reducerPath: "ecommorceApi",
	tagTypes: ["user", "auth"],
	baseQuery: fetchBaseQuery({
		baseUrl: `${apiUrl}/api/`,
		prepareHeaders: (headers) => {
			const token = localStorage.getItem("user_token");

			if (token) {
				headers.set("authorization", `Bearer ${token}`);
			}
			headers.set("Content-Type", "application/json");

			return headers;
		},
	}),
	endpoints: () => ({}),
});
