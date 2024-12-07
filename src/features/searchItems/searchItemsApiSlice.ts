import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const SEARCHITEMS_SERVICE_URL = import.meta.env
    .VITE_SEARCHITEMS_SERVICE_URL as string;
const API_KEY = import.meta.env.VITE_API_KEY as string;

const prepareHeaders = (headers: Headers) => {
    headers.set('x-api-key', API_KEY);
    return headers;
};

interface SearchItem {
    id: string;
    content: string;
}

interface SearchItemsApiResponse {
    data: SearchItem[] | null;
    errorMessage: string | null;
}

export const SearchItemsApiSlice = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: SEARCHITEMS_SERVICE_URL,
        prepareHeaders,
    }),

    reducerPath: 'searchItemsApi',
    tagTypes: ['searchItemsApi'],
    endpoints: (build) => ({
        searchItems: build.query<SearchItemsApiResponse, void>({
            query: (searchText) => ({
                url: `?q=${searchText}`,
            }),
            providesTags: ['searchItemsApi'],
        }),
    }),
});

export const { useSearchItemsQuery } = SearchItemsApiSlice;
