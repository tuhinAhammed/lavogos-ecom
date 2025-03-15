import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation({
			query: (user) => ({
				url: "login",
				method: "POST",
				body: user,
			}),
		}),
		register: builder.mutation({
			query: (user) => ({
				url: "registration",
				method: "POST",
				body: user,
			}),
		}),
		subscription: builder.mutation({
			query: (email) => ({
				url: "subscribe",
				method: "POST",
				body: { email },
			}),
		}),
	}),
});

export const {
	useLoginMutation,
	useRegisterMutation,
	useSubscriptionMutation,
} = authApi;
