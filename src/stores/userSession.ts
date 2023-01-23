import { acceptHMRUpdate, defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useStorage } from '@vueuse/core'
import { UserData } from './../../types/app.d'

export const useUserSession = defineStore('userSession', () => {
  // token will be synced with local storage
  // @see https://vueuse.org/core/usestorage/
  const accessToken = useStorage('qly-access_token', '')
  const aioToken = useStorage('qly-aio_token', '')

  const user = ref<Partial<UserData>>()
  const loading = ref(true)
  const isLoggedIn = computed(
    () => accessToken.value !== undefined && accessToken.value !== ''
  )

  function setUser(newUser: Partial<UserData>) {
    user.value = newUser
  }

  function setAccessToken(newToken: string) {
    accessToken.value = newToken
  }

  function setAioToken(newToken: string) {
    aioToken.value = newToken
  }

  function setLoading(newLoading: boolean) {
    loading.value = newLoading
  }

  async function logoutUser() {
    accessToken.value = undefined
    aioToken.value = undefined
    user.value = undefined
  }

  return {
    user,
    accessToken,
    isLoggedIn,
    loading,
    logoutUser,
    setUser,
    setAccessToken,
    setAioToken,
    setLoading,
  } as const
})

/**
 * Pinia supports Hot Module replacement so you can edit your stores and
 * interact with them directly in your app without reloading the page.
 *
 * @see https://pinia.esm.dev/cookbook/hot-module-replacement.html
 * @see https://vitejs.dev/guide/api-hmr.html
 */
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserSession, import.meta.hot))
}
