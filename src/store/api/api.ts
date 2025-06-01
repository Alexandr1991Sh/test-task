import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import {PaginatedResponse, Product} from "../../common/types/types"

export const mockApi = createApi({
    reducerPath: 'mockApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3001/'}),
    tagTypes: ['Products'],
    endpoints: (build) => ({
        getCategory: build.query<PaginatedResponse, { page: number, category?: string, limit: number }>({
            async queryFn(args, api, extraOptions, baseQuery) {
                // Получаем данные для текущей страницы
                const paginatedResult = await baseQuery({
                    url: `${args.category}`,
                    params: {
                        _start: (args.page - 1) * args.limit,
                        _limit: args.limit,
                    }
                })

                // Получаем общее количество элементов
                const totalResult = await baseQuery({
                    url: `${args.category}`,
                })

                if (paginatedResult.error) return {error: paginatedResult.error}
                if (totalResult.error) return {error: totalResult.error}
                const items = paginatedResult.data as Product[]
                const total = Array.isArray(totalResult.data) ? totalResult.data.length : 0

                return {
                    data: {
                        items,
                        totalCount: total
                    }
                }
            },
            providesTags: (result) =>
                result
                    ? [
                        ...result.items.map(({id}) => ({type: 'Products' as const, id})),
                        {type: 'Products', id: 'LIST'},
                    ]
                    : [{type: 'Products', id: 'LIST'}],
        }),
    }),
})

export const {useGetCategoryQuery} = mockApi
