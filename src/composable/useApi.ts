import axios, { AxiosInstance } from 'axios'
import { useUserSession } from '/@src/stores/userSession'

let api: AxiosInstance

export function createApi() {
  // Here we set the base URL for all requests made to the api
  api = axios.create({
    baseURL: "/interceptor",
  })

  // We set an interceptor for each request to
  // include Bearer token to the request if user is logged in
  api.interceptors.request.use((config) => {
    const userSession = useUserSession()

    if (userSession.isLoggedIn) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${userSession.accessToken}`,
      }
    }

    return config
  })

  return api
}

export function useApi() {
  if (!api) {
    createApi()
  }
  return api
}
