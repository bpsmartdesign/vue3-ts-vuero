<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { useDarkmode } from '/@src/stores/darkmode'
import { useUserSession } from '/@src/stores/userSession'
import { useNotyf } from '/@src/composable/useNotyf'
import { AxiosInstance } from 'axios'
import { UserAuthLogin } from 'types/app'
import { _emptyUserAuth } from '/@src/data'

const _baseUrl: string = import.meta.env.VITE_API_BASE_URL
const _api: AxiosInstance = (inject('vuero') as any).api

const darkmode = useDarkmode()
const router = useRouter()
const route = useRoute()
const notif: any = useNotyf()
const userSession = useUserSession()
const redirect = route.query.redirect as string

const isLoading = ref(false)
const user = ref<UserAuthLogin>(_emptyUserAuth)

const handleLogin = async () => {
  if (!isLoading.value) {
    isLoading.value = true

    try {
      const res = await _api.post(`/auth/v1/users/login`, user.value)

      if (res && res.status === 200) {
        try {
          const headers = {
            Accept: 'application/json',
            Authorization: `Bearer ${res.data.response?.access_token}`,
            'Content-Type': 'application/json',
          }
          const res2 = await _api.post('/auth/v1/aiorefresh', {}, { headers })

          if (res2 && res2.status === 200) {
            userSession.setAccessToken(res.data.response?.access_token ?? undefined)
            userSession.setAioToken(res2.data?.response?.aioToken ?? undefined)
            notif.success('Welcome back')

            if (redirect) {
              router.push(redirect)
            } else {
              router.push({
                name: '/app/dashboards',
              })
            }
          }
        } catch (e: any) {
          notif.error(`Something went wrong : ${e.message}`)
        } finally {
          window.location.reload()
        }
      } else {
        notif.dismissAll()
        notif.error('Something went wrong 😕, If it persist, contact support.')
      }
    } catch (e: any) {
      const _errMsg = `Something went wrong : ${e.message} - ${e.response?.data?.message}`
      notif.error(_errMsg)
    } finally {
      isLoading.value = false
    }
  }
}

useHead({
  title: 'Auth Login - App Name',
})
</script>

<template>
  <div class="auth-wrapper-inner columns is-gapless">
    <!-- Image section (hidden on mobile) -->
    <div class="column login-column is-8 h-hidden-mobile h-hidden-tablet-p hero-banner">
      <div class="hero login-hero is-fullheight is-app-grey">
        <div class="hero-body is-align-items-center is-justify-content-center">
          <div class="columns">
            <div class="column is-10 is-offset-1">
              <img
                class="hero-image"
                src="/@src/assets/illustrations/login/station.svg"
                alt=""
                style="height: 80vh"
              />
            </div>
          </div>
        </div>
        <div class="hero-footer">
          <p class="has-text-centered"></p>
        </div>
      </div>
    </div>

    <!-- Form section -->
    <div class="column is-4">
      <div class="hero is-fullheight is-white">
        <div class="hero-heading">
          <div class="switch-wrapper">
            <div class="night-toggle night-toggle--daynight">
              <input
                id="night-toggle--daynight"
                data-cy="dark-mode-toggle"
                type="checkbox"
                class="night-toggle--checkbox"
                :checked="!darkmode.isDark"
                aria-label="Toggle dark mode"
                @change="darkmode.onChange"
              />
              <label
                class="night-toggle--btn"
                for="night-toggle--daynight"
                tabindex="0"
                @keydown.space.prevent="(e) => (e.target as HTMLLabelElement).click()"
              >
                <span class="night-toggle--feature"></span>
              </label>
            </div>
          </div>
        </div>
        <div class="hero-body">
          <div class="container">
            <div class="columns">
              <div class="column is-12 is-center">
                <div
                  class="is-flex is-flex-direction-column is-justify-content-center is-align-items-center auth-content"
                >
                  <RouterLink to="/" class="header-item">
                    <AnimatedLogo width="60px" height="60px" />
                  </RouterLink>
                  <h2 class="mt-4">Welcome Back.</h2>
                  <p>Please sign in to your account</p>
                  <RouterLink to="/auth/signup">
                    I do not have an account yet
                  </RouterLink>
                </div>
                <div
                  class="is-flex is-flex-direction-column is-justify-content-center is-align-items-center auth-form-wrapper"
                >
                  <VButtons>
                    <VButton
                      color="dark"
                      :href="`${_baseUrl}/auth/v1/oauth2/custom/github`"
                      icon="feather:github"
                      raised
                      rounded
                    >
                      Github
                    </VButton>
                    <VButton
                      color="danger"
                      :href="`${_baseUrl}/auth/v1/oauth2/custom/google`"
                      raised
                      rounded
                    >
                      <span class="is-flex is-align-items-center">
                        <img
                          src="/images/svg/google.svg"
                          alt="Google Logo"
                          width="14"
                          class="mr-2"
                        />
                        Google
                      </span>
                    </VButton>
                  </VButtons>
                  <div class="divider"></div>
                  <!-- Login Form -->
                  <form style="width: 90%" @submit.prevent="handleLogin">
                    <div class="login-form">
                      <!-- Username -->
                      <VField>
                        <VControl icon="feather:user">
                          <VInput
                            v-model="user.email"
                            type="text"
                            placeholder="Username"
                            autocomplete="username"
                          />
                        </VControl>
                      </VField>

                      <!-- Password -->
                      <VField>
                        <VControl icon="feather:lock">
                          <VInput
                            v-model="user.password"
                            type="password"
                            placeholder="Password"
                            autocomplete="current-password"
                          />
                        </VControl>
                      </VField>

                      <!-- Switch -->
                      <VField>
                        <VControl class="is-flex is-align-items-center">
                          <VLabel raw class="remember-toggle">
                            <VInput raw type="checkbox" />

                            <span class="toggler">
                              <span class="active">
                                <i
                                  aria-hidden="true"
                                  class="iconify"
                                  data-icon="feather:check"
                                ></i>
                              </span>
                              <span class="inactive">
                                <i
                                  aria-hidden="true"
                                  class="iconify"
                                  data-icon="feather:circle"
                                ></i>
                              </span>
                            </span>
                          </VLabel>
                          <VLabel raw class="remember-me">Remember Me</VLabel>
                        </VControl>
                      </VField>

                      <!-- Submit -->
                      <div class="login">
                        <VButton
                          :loading="isLoading"
                          color="primary"
                          type="submit"
                          bold
                          fullwidth
                          raised
                        >
                          Sign In
                        </VButton>
                      </div>

                      <div class="forgot-link has-text-centered">
                        <RouterLink to="/auth/forgot">Forgot Password?</RouterLink>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.switch-wrapper {
  position: relative;
  z-index: 2;

  .night-toggle {
    display: block;
    text-align: center;
    user-select: none;
    transform: scale(0.6);
  }

  .night-toggle--checkbox {
    display: none;
  }

  .night-toggle--btn {
    display: block;
    margin: 0 auto;
    font-size: 1.4em;
    transition: all 350ms ease-in;

    &:hover,
    &:focus {
      cursor: pointer;
    }
  }

  .night-toggle--btn,
  .night-toggle--checkbox,
  .night-toggle--feature {
    &,
    &::before,
    &::after {
      transition: all 250ms ease-in;
    }

    &::before,
    &::after {
      content: '';
      display: block;
    }
  }

  $toggleHeight: 70px;
  $toggleWidth: 125px;
  $borderWidth: 5px;
  $toggleBtnRadius: $toggleHeight - 14px;
  $bgColor--night: #3c4145;
  $borderColor--night: #1c1c1c;
  $toggleBtn-bgColor--night: var(--white);
  $toggleBtn-borderColor--night: #e3e3c7;
  $bgColor--day: #cdcdfa; // lighten(#797bf2, 18%);
  $borderColor--day: #babbf8; // lighten(#797bf2, 14%);
  $toggleBtn-bgColor--day: #ffdf6d;
  $toggleBtn-borderColor--day: #e1c348;
  $cloud-borderColor: #d3d3d3;
  $cloud-bgColor: var(--white);

  .night-toggle--daynight,
  .night-toggle--like {
    .night-toggle--btn {
      position: relative;
      height: $toggleHeight;
      width: $toggleWidth;
      border-radius: $toggleHeight;

      // toggle button
      &::before {
        position: absolute;
        top: 2px;
        left: 4px;
        width: $toggleBtnRadius;
        height: $toggleBtnRadius;
        border-radius: var(--radius-rounded);
      }
    }
  }

  .night-toggle--daynight {
    .night-toggle--btn {
      border: $borderWidth solid $borderColor--night;
      background-color: $bgColor--night;

      // toggle button
      &::before {
        background-color: $toggleBtn-bgColor--night;
        border: $borderWidth solid $toggleBtn-borderColor--night;
      }

      &::after {
        position: absolute;
        top: 62%;
        left: $toggleWidth - $toggleBtnRadius - $borderWidth * 2 - 20px;
        z-index: 10;
        width: $toggleBtnRadius * 0.2;
        height: $toggleBtnRadius * 0.2;
        opacity: 0;
        background-color: $cloud-bgColor;
        border-radius: var(--radius-rounded);

        // crazy ass box-shadow to make the cloud
        box-shadow: $cloud-bgColor 0 0, $cloud-bgColor 3px 0, $cloud-bgColor 6px 0,
          $cloud-bgColor 9px 0, $cloud-bgColor 11px 0, $cloud-bgColor 14px 0,
          $cloud-bgColor 16px 0, $cloud-bgColor 21px -1px 0 1px,
          $cloud-bgColor 16px -7px 0 -2px, $cloud-bgColor 7px -7px 0 1px,
          $cloud-borderColor 0 0 0 4px, $cloud-borderColor 6px 0 0 4px,
          $cloud-borderColor 11px 0 0 4px, $cloud-borderColor 16px 0 0 4px,
          $cloud-borderColor 21px -1px 0 5px, $cloud-borderColor 16px -7px 0 1px,
          $cloud-borderColor 7px -7px 0 5px;
        transition: opacity 100ms ease-in;
      }
    }

    @keyframes starry_star {
      50% {
        background-color: rgb(255 255 255 / 10%);
        box-shadow: var(--white) 30px -3px 0 0, var(--white) 12px 10px 0 -1px,
          rgb(255 255 255 / 10%) 38px 18px 0 1px, var(--white) 32px 34px 0 0,
          rgb(255 255 255 / 10%) 20px 24px 0 -1.5px, var(--white) 5px 38px 0 1px;
      }
    }

    @keyframes bounceIn {
      0% {
        opacity: 0;
        transform: scale(0.3);
      }

      50% {
        opacity: 100;
        transform: scale(1.1);
      }

      55% {
        transform: scale(1.1);
      }

      75% {
        transform: scale(0.9);
      }

      100% {
        opacity: 100;
        transform: scale(1);
      }
    }

    // stars
    .night-toggle--feature {
      display: block;
      position: absolute;
      top: 9px;
      left: 52.5%;
      z-index: 20;
      width: 4px;
      height: 4px;
      border-radius: var(--radius-rounded);
      background-color: var(--white);
      box-shadow: rgb(255 255 255 / 10%) 30px -3px 0 0,
        rgb(255 255 255 / 10%) 12px 10px 0 -1px, var(--white) 38px 18px 0 1px,
        rgb(255 255 255 / 10%) 32px 34px 0 0, var(--white) 20px 24px 0 -1.5px,
        rgb(255 255 255 / 10%) 5px 38px 0 1px;
      animation: starry_star 5s ease-in-out infinite;

      &::before {
        position: absolute;
        top: -2px;
        left: -25px;
        width: 18px;
        height: 18px;
        background-color: $toggleBtn-bgColor--night;
        border-radius: var(--radius-rounded);
        border: 5px solid $toggleBtn-borderColor--night;
        box-shadow: $toggleBtn-borderColor--night -28px 0 0 -3px,
          $toggleBtn-borderColor--night -8px 24px 0 -2px;
        transform-origin: -6px 130%;
      }
    }

    // what happens once checkbox is checked
    .night-toggle--checkbox:checked {
      & + .night-toggle--btn {
        background-color: $bgColor--day;
        border: $borderWidth solid $borderColor--day;

        &::before {
          left: $toggleWidth - $toggleBtnRadius - $borderWidth * 2 - 4px;
          background-color: $toggleBtn-bgColor--day;
          border: $borderWidth solid $toggleBtn-borderColor--day;
        }

        &::after {
          opacity: 100;
          animation-name: bounceIn;
          animation-duration: 0.6s;
          animation-delay: 0.1s;
          animation-fill-mode: backwards;
          animation-timing-function: ease-in-out;
        }

        > .night-toggle--feature {
          opacity: 0;
          box-shadow: rgb(255 255 255 / 10%) 30px -3px 0 -4px,
            rgb(255 255 255 / 10%) 12px 10px 0 -5px, var(--white) 38px 18px 0 -3px,
            rgb(255 255 255 / 10%) 32px 34px 0 -4px, var(--white) 20px 24px 0 -5.5px,
            rgb(255 255 255 / 10%) 5px 38px 0 -3px;
          animation: none;

          &::before {
            left: 25px;
            transform: rotate(70deg);
          }
        }
      }
    }
  }
}

.remember-toggle {
  width: 65px;
  display: block;
  position: relative;
  cursor: pointer;
  font-size: 22px;
  user-select: none;
  transform: scale(0.9);

  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;

    &:checked ~ .toggler {
      border-color: var(--primary);

      .active,
      .inactive {
        transform: translateX(100%) rotate(360deg);
      }

      .active {
        opacity: 1;
      }

      .inactive {
        opacity: 0;
      }
    }
  }

  .toggler {
    position: relative;
    display: block;
    height: 34px;
    width: 61px;
    border: 2px solid var(--placeholder);
    border-radius: 100px;
    transition: all 0.3s; // transition-all test

    .active,
    .inactive {
      position: absolute;
      top: 2px;
      left: 2px;
      height: 26px;
      width: 26px;
      border-radius: var(--radius-rounded);
      background: black;
      display: flex;
      justify-content: center;
      align-items: center;
      transform: translateX(0) rotate(0);
      transition: all 0.3s ease;

      svg {
        color: var(--white);
        height: 14px;
        width: 14px;
        stroke-width: 3px;
      }
    }

    .inactive {
      background: var(--placeholder);
      border-color: var(--placeholder);
      opacity: 1;
      z-index: 1;
    }

    .active {
      background: var(--primary);
      border-color: var(--primary);
      opacity: 0;
      z-index: 0;
    }
  }
}

.remember-me {
  font-size: 0.9rem;
  color: var(--muted-grey);
  font-weight: 500;
}

.is-dark {
  .remember-toggle {
    input {
      &:checked + .toggler {
        border-color: var(--primary);

        > span {
          background: var(--primary);
        }
      }
    }

    .toggler {
      border-color: var(--dark-sidebar-light-12);

      > span {
        background: var(--dark-sidebar-light-12);
      }
    }
  }
}
</style>
