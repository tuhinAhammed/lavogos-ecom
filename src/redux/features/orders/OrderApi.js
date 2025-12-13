import { baseApi } from "../../api/baseApi";

const orderApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        placeOrder: builder.mutation({
            query: (orderInfo) => ({
                url: "/order",
                method: "POST",
                body: orderInfo,
            }),
        }),
    }),
});

export const { usePlaceOrderMutation } = orderApi;
