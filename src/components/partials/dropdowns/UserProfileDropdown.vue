<script lang="ts" setup>
import { AxiosInstance } from 'axios'
import { useNotyf } from '/@src/composable/useNotyf'
import { useUserSession } from '/@src/stores/userSession'

const notif: any = useNotyf()
const router = useRouter()

const __userStore = useUserSession()
const _api: AxiosInstance = (inject('vuero') as any).api
const user = computed(() => __userStore.user)

const loading = ref<boolean>(false)

const onLogOut = async () => {
  try {
    loading.value = true
    const res = await _api.post('/auth/v1/users/logout')

    if (res.status === 200) {
      __userStore.logoutUser()
      router.push('/auth/login')
    } else {
      notif.error(
        'Unable to log out, Check your network. If it persist, contact support.'
      )
    }
  } catch (e: any) {
    const _errMsg = `Something went wrong : ${e.message} - ${e.response?.data?.message}`
    notif.error(_errMsg)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <VDropdown right spaced class="user-dropdown profile-dropdown">
    <template #button="{ toggle }">
      <a
        tabindex="0"
        class="is-trigger dropdown-trigger"
        aria-haspopup="true"
        @keydown.space.prevent="toggle"
        @click="toggle"
      >
        <VAvatar :picture="user?.profile_pic ?? `/images/avatars/svg/vuero-1.svg`" />
      </a>
    </template>

    <template #content>
      <div class="dropdown-head">
        <VAvatar size="large" picture="/images/avatars/svg/vuero-1.svg" />

        <div class="meta">
          <span>{{ user?.full_name }}</span>
          <span>{{ user?.email }}</span>
        </div>
      </div>

      <a href="#" role="menuitem" class="dropdown-item is-media">
        <div class="icon">
          <i aria-hidden="true" class="lnil lnil-user-alt"></i>
        </div>
        <div class="meta">
          <span>Profile</span>
          <span>View your profile</span>
        </div>
      </a>

      <hr class="dropdown-divider" />

      <a href="#" role="menuitem" class="dropdown-item is-media">
        <div class="icon">
          <i aria-hidden="true" class="lnil lnil-cog"></i>
        </div>
        <div class="meta">
          <span>Settings</span>
          <span>Account settings</span>
        </div>
      </a>

      <hr class="dropdown-divider" />

      <div class="dropdown-item is-button">
        <VButton
          class="logout-button"
          icon="feather:log-out"
          color="primary"
          role="menuitem"
          raised
          fullwidth
          :loading="loading"
          @click="onLogOut"
        >
          Logout
        </VButton>
      </div>
    </template>
  </VDropdown>
</template>
