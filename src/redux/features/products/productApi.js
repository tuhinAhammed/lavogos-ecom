import { baseApi } from "../../api/baseApi";

const productApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getProductInfo: builder.query({
			query: (product_id) => `/product/${product_id}`,
		}),
		getProductsByCategory: builder.query({
			query: (category_name) => `/products-by-category/${category_name}`,
		}),
		getLandingPageProducts: builder.query({
			query: () => "landing-page",
		}),
		getAllProducts: builder.query({
			query: () => "product-list",
		}),
		getCategories: builder.query({
			query: () => ({
				url: "/categories",
				method: "GET",
			}),
		}),
		getAllFlashSales: builder.query({
			query: () => "flash-sales",
		}),
		transformResponse: (response) => {
			return {
				data: response.data,
				meta: response.meta,
			};
		},
	}),
});

export const {
	useGetAllProductsQuery,
	useGetCategoriesQuery,
	useGetLandingPageProductsQuery,
	useGetProductsByCategoryQuery,
	useGetProductInfoQuery,
	useGetAllFlashSalesQuery,
} = productApi;
