/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseQueryApi, BaseQueryFn, createApi, DefinitionType, FetchArgs, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../features/store";
import { logout, setUser } from "../features/auth/authSlice";
import { toast } from "sonner";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3300/api/v1",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("authorization", ` ${token}`);
    }
    return headers;

  }
})
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
  let result = await baseQuery(args, api, extraOptions);
  if (result?.error?.status === 403) {
    toast.error("User not found")
  }
  if (result?.error?.status === 401) {
    console.log('401 Unauthorized - Attempting to refresh token');

    const res = await fetch('http://localhost:3300/api/v1/auth/refresh-token', {
      method: 'POST',
      credentials: 'include',
    });

    const data = await res.json();
    console.log('Refresh token response:', data); // Debugging

    if (data?.data?.accessToken) {
      const user = (api.getState() as RootState).auth.user;

      api.dispatch(
        setUser({
          user,
          token: data.accessToken,
        })
      );

      result = await baseQuery(args, api, extraOptions);
    } else {
      console.error('Refresh token failed, logging out user');
      api.dispatch(logout());
    }
  } else if (result?.error) {
    console.error('Base query error:', result.error); // General error logging
  }

  return result;
};






export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: ['Semester', 'courses'],
  endpoints: () => ({

  })
})