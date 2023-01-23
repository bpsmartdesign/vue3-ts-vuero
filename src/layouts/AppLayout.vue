<script setup lang="ts">
import type { SideblockTheme } from '/@src/components/navigation/desktop/Sideblock.vue'
import { useViewWrapper } from '/@src/stores/viewWrapper'

const props = withDefaults(
  defineProps<{
    theme?: SideblockTheme
    defaultSideblock?: string
    closeOnChange?: boolean
    openOnMounted?: boolean
    nowrap?: boolean
  }>(),
  {
    defaultSideblock: 'dashboard',
    theme: 'default',
  }
)

const viewWrapper = useViewWrapper()
const router = useRouter()
const route = useRoute()

const isMobileSideblockOpen = ref(false)
const isDesktopSideblockOpen = ref(true)
const activeMobileSubsidebar = ref(props.defaultSideblock)

/**
 * watchPostEffect callback will be executed each time dependent reactive values has changed
 */
watchPostEffect(() => {
  viewWrapper.setPushedBlock(isDesktopSideblockOpen.value ?? false)
})
onMounted(() => {
  if (
    (router.options.history.state as any).back &&
    ((router.options.history.state as any).back as string).startsWith('/verify')
  ) {
    // Get AIO Token and save in localStorage
  }
  viewWrapper.setPushed(false)
})
watch(
  () => route.fullPath,
  () => {
    isMobileSideblockOpen.value = false

    if (props.closeOnChange && isDesktopSideblockOpen.value) {
      isDesktopSideblockOpen.value = false
    }
  }
)
</script>

<template>
  <div class="sidebar-layout">
    <div class="app-overlay"></div>

    <!-- Mobile navigation -->
    <MobileNavbar
      :is-open="isMobileSideblockOpen"
      @toggle="isMobileSideblockOpen = !isMobileSideblockOpen"
    >
      <template #brand>
        <RouterLink to="/" class="navbar-item is-brand">
          <AnimatedLogo width="38px" height="38px" />
        </RouterLink>

        <div class="brand-end">
          <Toolbar class="desktop-toolbar mr-2"></Toolbar>
          <UserProfileDropdown />
        </div>
      </template>
    </MobileNavbar>

    <!-- Mobile sidebar links -->
    <MobileSidebar
      :is-open="isMobileSideblockOpen"
      @toggle="isMobileSideblockOpen = !isMobileSideblockOpen"
    ></MobileSidebar>

    <!-- Mobile subsidebar links -->
    <Transition name="slide-x">
      <LayoutsMobileSubsidebar
        v-if="isMobileSideblockOpen && activeMobileSubsidebar === 'layout'"
      />
      <DashboardsMobileSubsidebar
        v-else-if="isMobileSideblockOpen && activeMobileSubsidebar === 'dashboard'"
      />
      <ComponentsMobileSubsidebar
        v-else-if="isMobileSideblockOpen && activeMobileSubsidebar === 'components'"
      />
      <ElementsMobileSubsidebar
        v-else-if="isMobileSideblockOpen && activeMobileSubsidebar === 'elements'"
      />
    </Transition>

    <Transition name="slide-x">
      <Sideblock v-if="isDesktopSideblockOpen" :theme="props.theme">
        <template #header>
          <RouterLink to="/" class="sidebar-block-logo">
            <AnimatedLogo width="36px" />
          </RouterLink>
          <h3>App Name</h3>
        </template>
        <template #links>
          <li>
            <RouterLink to="/app/dashboards" class="single-link">
              <span class="icon">
                <i
                  class="iconify"
                  style="transform: translateY(-1px)"
                  data-icon="feather:grid"
                ></i>
              </span>
              Dashboard
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/app/events" class="single-link">
              <span class="icon">
                <i class="iconify" data-icon="feather:tag" aria-hidden="true"></i>
              </span>
              Another link example
              <span class="badge">4</span>
            </RouterLink>
          </li>
        </template>

        <template #bottom-links>
          <UserProfileDropdown up />
        </template>
      </Sideblock>
    </Transition>

    <LanguagesPanel />

    <VViewWrapper full>
      <VPageContentWrapper>
        <template v-if="props.nowrap">
          <slot></slot>
        </template>
        <VPageContent v-else class="is-relative">
          <div class="page-title has-text-centered">
            <!-- Sidebar Trigger -->
            <div
              class="vuero-hamburger nav-trigger push-resize"
              tabindex="0"
              @keydown.space.prevent="isDesktopSideblockOpen = !isDesktopSideblockOpen"
              @click="isDesktopSideblockOpen = !isDesktopSideblockOpen"
            >
              <span class="menu-toggle has-chevron">
                <span
                  :class="[isDesktopSideblockOpen && 'active']"
                  class="icon-box-toggle"
                >
                  <span class="rotate">
                    <i aria-hidden="true" class="icon-line-top"></i>
                    <i aria-hidden="true" class="icon-line-center"></i>
                    <i aria-hidden="true" class="icon-line-bottom"></i>
                  </span>
                </span>
              </span>
            </div>

            <div class="title-wrap">
              <h1 class="title is-4">{{ viewWrapper.pageTitle }}</h1>
            </div>

            <Toolbar class="desktop-toolbar is-hidden-mobile"> </Toolbar>
          </div>

          <slot></slot>
        </VPageContent>
      </VPageContentWrapper>
    </VViewWrapper>
  </div>
</template>
