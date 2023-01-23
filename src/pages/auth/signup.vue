<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { useHead } from '@vueuse/head'
import { toFormValidator } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { z as zod } from 'zod'

import { useDarkmode } from '/@src/stores/darkmode'
import { useNotyf } from '/@src/composable/useNotyf'
import { _emptyUserRegister } from '/@src/data'
import { AxiosInstance } from 'axios'

const darkmode = useDarkmode()
const router = useRouter()
const notif: any = useNotyf()
const { t } = useI18n()

const _baseUrl: string = import.meta.env.VITE_API_BASE_URL
const _api: AxiosInstance = (inject('vuero') as any).api

const isLoading = ref(false)

// Define a validation schema
const validationSchema = toFormValidator(
  zod
    .object({
      fullName: zod
        .string({
          required_error: t('auth.errors.name.required'),
        })
        .min(1, t('auth.errors.name.required')),
      email: zod
        .string({
          required_error: t('auth.errors.email.required'),
        })
        .email(t('auth.errors.email.format')),
      password: zod
        .string({
          required_error: t('auth.errors.password.required'),
        })
        .min(8, t('auth.errors.password.length')),
      passwordCheck: zod.string({
        required_error: t('auth.errors.passwordCheck.required'),
      }),
    })
    .refine((data) => data.password === data.passwordCheck, {
      message: t('auth.errors.passwordCheck.match'),
      path: ['passwordCheck'],
    })
)

const { handleSubmit } = useForm({
  validationSchema,
  initialValues: _emptyUserRegister,
})

const onSignup = handleSubmit(async (user) => {
  if (!isLoading.value) {
    isLoading.value = true

    delete (user as any).passwordCheck
    const uri = `/auth/v1/users/new`
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }

    try {
      const res = await _api.post(uri, user, { headers })

      if (res.status === 200) {
        notif.success(res.data.message)
        router.push('/auth/confirm')
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
})

useHead({
  title: 'Auth Signup - App Name',
})
</script>

<template>
  <div class="auth-wrapper-inner columns is-gapless">
    <!-- Form section -->
    <div class="column is-5">
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
              <div class="column is-12">
                <div class="auth-content">
                  <RouterLink to="/" class="header-item">
                    <AnimatedLogo width="60px" height="60px" />
                  </RouterLink>
                  <h2 class="mt-4">{{ t('auth.title') }}</h2>
                  <p>{{ t('auth.subtitle') }}</p>
                  <RouterLink to="/auth/login">
                    {{ t('auth.action.login') }}
                  </RouterLink>
                </div>
                <div class="auth-form-wrapper">
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
                  <!-- Login Form -->
                  <form @submit="onSignup">
                    <div id="signin-form" class="login-form">
                      <!-- Input -->
                      <VField id="fullName" v-slot="{ field }">
                        <VControl icon="feather:user">
                          <VInput
                            type="text"
                            :placeholder="t('auth.placeholder.name')"
                            autocomplete="name"
                          />
                          <p v-if="field?.errorMessage" class="help is-danger">
                            {{ field.errorMessage }}
                          </p>
                        </VControl>
                      </VField>

                      <!-- Input -->
                      <VField id="email" v-slot="{ field }">
                        <VControl icon="feather:mail">
                          <VInput
                            type="text"
                            :placeholder="t('auth.placeholder.email')"
                            autocomplete="email"
                          />
                          <p v-if="field?.errorMessage" class="help is-danger">
                            {{ field.errorMessage }}
                          </p>
                        </VControl>
                      </VField>

                      <!-- Input -->
                      <VField id="password" v-slot="{ field }">
                        <VControl icon="feather:lock">
                          <VInput
                            type="password"
                            :placeholder="t('auth.placeholder.password')"
                            autocomplete="new-password"
                          />
                          <p v-if="field?.errorMessage" class="help is-danger">
                            {{ field.errorMessage }}
                          </p>
                        </VControl>
                      </VField>

                      <!-- Input -->
                      <VField id="passwordCheck" v-slot="{ field }">
                        <VControl icon="feather:lock">
                          <VInput
                            type="password"
                            :placeholder="t('auth.placeholder.passwordCheck')"
                          />
                          <p v-if="field?.errorMessage" class="help is-danger">
                            {{ field.errorMessage }}
                          </p>
                        </VControl>
                      </VField>

                      <p class="is-size-7 my-4">
                        By continuing you agree to our
                        <RouterLink to="/terms" class="has-text-warning is-underlined">
                          Terms and Conditions
                        </RouterLink>
                      </p>

                      <!-- Submit -->
                      <div class="login">
                        <VButton
                          :loading="isLoading"
                          type="submit"
                          color="primary"
                          bold
                          fullwidth
                          raised
                        >
                          {{ t('auth.action.signup') }}
                        </VButton>
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

    <!-- Image section (hidden on mobile) -->
    <div class="column login-column is-7 h-hidden-mobile h-hidden-tablet-p hero-banner">
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
