import { useQuery } from "@apollo/client";
import { signal } from "@preact/signals-react";
import { GET_ME_QUERY } from "./schema/query/getMe";
import { UserModel } from "./types";

export function setAccessToken(token: string) {
    localStorage.setItem('access_token', token);
}

export function removeAccessToken() {
    localStorage.removeItem('access_token');
}

export function getAccessToken() {
    return localStorage.getItem('access_token');
}

export const user = signal<UserModel | undefined>(undefined);

export let userLoading = signal(true);

export const useAuth = () => {
  const { data, error, loading } = useQuery(GET_ME_QUERY);

  return { user: data?.getMe, error, loading };
};