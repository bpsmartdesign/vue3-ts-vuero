<template>
  <div class="mobile-subsidebar">
    <div class="inner">
      <ul class="submenu" data-simplebar>
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
            Live Events
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/app/funnels" class="single-link">
            <span class="icon">
              <i
                class="lnil lnil-funnel-alt-1"
                style="transform: translateY(-1px)"
                aria-hidden="true"
              ></i>
            </span>
            Funnels
            <span class="badge">3</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/app/flows" class="single-link">
            <span class="icon">
              <i class="iconify" data-icon="feather:activity" aria-hidden="true"></i>
            </span>
            Flows
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/app/snapshots" class="single-link">
            <span class="icon">
              <i
                class="iconify"
                data-icon="feather:camera"
                style="transform: translateY(-1px)"
                aria-hidden="true"
              ></i>
            </span>
            Snapchots
          </RouterLink>
        </li>
        <li class="divider"></li>

        <VCollapseLinks v-model:open="openSideblockLinks" collapse-id="settings">
          <template #header>
            <div class="icon">
              <i aria-hidden="true" class="iconify" data-icon="feather:settings"></i>
            </div>
            Settings
            <i aria-hidden="true" class="iconify" data-icon="feather:chevron-right"></i>
          </template>
          <RouterLink to="/sidebar/layouts" class="is-submenu">
            <i class="lnil lnil-home"></i>
            <span>General</span>
          </RouterLink>
          <RouterLink to="/sidebar/dashboards/stocks" class="is-submenu">
            <i class="lnil lnil-lock-alt"></i>
            <span>Security</span>
          </RouterLink>
          <RouterLink to="/sidebar/dashboards/sales" class="is-submenu">
            <i class="lnil lnil-coin"></i>
            <span>Transactions</span>
          </RouterLink>
        </VCollapseLinks>
      </ul>
    </div>
  </div>
</template>
