<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { useI18n } from 'vue-i18n'
import { useDarkmode } from '/@src/stores/darkmode'

const darkmode = useDarkmode()
const router = useRouter()

const { t } = useI18n()

const onGoBack = () => {
  router.go(-1)
}

useHead({
  title: `${t('page-title')} - App Name`,
  meta: [
    {
      name: 'robots',
      content: 'noindex',
    },
  ],
})
</script>

<i18n lang="yaml">
de:
  page-title: 'Seite nicht gefunden'
  page-heading: 'Wir konnten diese Seite nicht finden'
  page-body: 'Die Seite konnte nicht gefunden werden. Bitte versuchen Sie es erneut oder wenden Sie sich an einen Administrator, wenn das Problem weiterhin besteht.'
  back-button: 'Bringen Sie mich zurück'
en:
  page-title: 'Page not found'
  page-heading: "We couldn't find that page"
  page-body: "Looks like we couldn't find that page. Please try again or contact an administrator if the problem persists."
  back-button: 'Take me Back'
es-MX:
  page-title: 'Página no encontrada'
  page-heading: 'No hemos podido encontrar esa página'
  page-body: 'Parece que no hemos podido encontrar esa página. Por favor, inténtalo de nuevo o contacta con un administrador si el problema persiste.'
  back-button: 'Llévame de vuelta'
es:
  page-title: 'Página no encontrada'
  page-heading: 'No hemos podido encontrar esa página'
  page-body: 'Parece que no hemos podido encontrar esa página. Por favor, inténtalo de nuevo o contacta con un administrador si el problema persiste.'
  back-button: 'Llévame de vuelta'
fr:
  page-title: 'Page introuvable'
  page-heading: "Cette page n'a pas été trouvée"
  page-body: "Il semble que nous n'ayons pas trouvé cette page. Veuillez réessayer ou contacter un administrateur si le problème persiste."
  back-button: 'Ramenez-moi en arrière'
zh-CN:
  page-title: '未找到页面'
  page-heading: '我们找不到这个页面'
  page-body: '看起来我们找不到这个页面。如果问题仍然存在，请再试一次或联系管理员。'
  back-button: '带我回去'
</i18n>

<template>
  <MinimalLayout>
    <div class="is-flex is-justify-content-center is-align-items-center error-container">
      <div class="error-wrapper">
        <div
          class="is-flex is-flex-direction-column is-align-items-center error-inner has-text-centered"
        >
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
          <div class="bg-number">404</div>
          <SVGErrorPlaceholder />

          <h3>{{ t('page-heading') }}</h3>
          <p>
            {{ t('page-body') }}
          </p>
          <div class="button-wrap">
            <VButton color="primary" elevated @click="onGoBack">
              {{ t('back-button') }}
            </VButton>
          </div>
        </div>
      </div>
    </div>
  </MinimalLayout>
</template>

<style lang="scss">
.error-container {
  width: 100vw;
  min-height: 100vh;

  &::-webkit-scrollbar {
    width: 5px;
    border-radius: 0.5rem;
    background-color: transparent;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
    opacity: 0;
    border-radius: 0;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--primary);
    border-radius: 5px;
  }

  .error-nav {
    .dark-mode {
      position: absolute;
      right: 0;
      top: 0;
      display: inline-block;
      transform: scale(0.5);
    }
  }

  .error-wrapper {
    max-width: 840px;
    margin: 0 auto;
    padding-top: 40px;

    .error-inner {
      position: relative;
      max-width: 540px;
      margin: 0 auto;
      gap: 10px;

      .bg-number {
        font-family: var(--font);
        position: absolute;
        top: -58px;
        left: -50px;
        right: 0;
        margin: 0 auto;
        font-size: 28rem;
        font-weight: 600;
        opacity: 0.15;
        z-index: 0;
      }

      img,
      svg,
      h3,
      p,
      .button-wrap {
        position: relative;
        z-index: 1;
      }

      img,
      svg {
        display: block;
        max-width: 100%;
        margin: 0 auto;
      }

      h3 {
        font-size: 1.5rem;
        font-family: var(--font-alt);
        color: var(--dark-text);
        font-weight: 600;
        margin-top: 10px;
      }

      p {
        font-family: var(--font);
        font-size: 1.1rem;
        margin-bottom: 16px;
      }

      .button-wrap {
        .button {
          min-width: 220px;
          min-height: 50px;
        }
      }
    }
  }
}

.is-dark {
  .error-container {
    .error-wrapper {
      .error-inner {
        .bg-number {
          opacity: 0.09;
        }
      }
    }
  }
}

.switch-wrapper {
  position: relative;
  width: 130px;
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

@media only screen and (max-width: 767px) {
  .error-container {
    .error-wrapper {
      padding-top: 60px;

      .error-inner {
        padding: 10px;

        .bg-number {
          top: -35px;
          left: -18px;
          right: 0;
          font-size: 13rem;
        }

        img,
        svg {
          max-width: 345px;
        }
      }
    }
  }
}
</style>
