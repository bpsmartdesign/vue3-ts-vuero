<template>
  <div class="section has-bg-dots">
    <div class="container">
      <!--Title-->
      <div class="section-title has-text-centered">
        <h2 class="title is-2">Contact Us</h2>
        <h4>Sesame snaps sugar plum chocolate bar dragée powder danish macaroon.</h4>
      </div>

      <!--Wrapper-->
      <div class="columns is-multiline mb-6">
        <div class="column is-4">
          <VCard radius="smooth" elevated>
            <div
              class="card-head is-flex is-align-items-center is-justify-content-center"
            >
              <span
                class="is-flex is-justify-content-center is-align-items-center is-icon-container warn"
              >
                <i
                  class="is-size-2 iconify"
                  data-icon="feather:smartphone"
                  aria-hidden="true"
                ></i>
              </span>
            </div>
            <div class="card-inner">
              <p
                class="is-flex is-flex-direction-column is-justify-content-center is-align-items-center"
              >
                <span class="has-text-weight-bold">+1 (234) 567-8910</span>
                <span>+1 (456) 789-1011</span>
              </p>
            </div>
          </VCard>
        </div>
        <div class="column is-4">
          <VCard radius="smooth" elevated>
            <div
              class="card-head is-flex is-align-items-center is-justify-content-center"
            >
              <span
                class="is-flex is-justify-content-center is-align-items-center is-icon-container primary"
              >
                <i
                  class="is-size-2 iconify"
                  data-icon="feather:mail"
                  aria-hidden="true"
                ></i>
              </span>
            </div>
            <div class="card-inner">
              <p
                class="is-flex is-flex-direction-column is-justify-content-center is-align-items-center"
              >
                <span class="has-text-weight-bold">demoname@name.com</span>
                <span>anothername@name.com</span>
              </p>
            </div>
          </VCard>
        </div>
        <div class="column is-4">
          <VCard radius="smooth" elevated>
            <div
              class="card-head is-flex is-align-items-center is-justify-content-center"
            >
              <span
                class="is-flex is-justify-content-center is-align-items-center is-icon-container succ"
              >
                <i
                  class="is-size-2 iconify"
                  data-icon="feather:map"
                  aria-hidden="true"
                ></i>
              </span>
            </div>
            <div class="card-inner">
              <p
                class="is-flex is-flex-direction-column is-justify-content-center is-align-items-center"
              >
                <span class="has-text-weight-bold">140 Berkley Street</span>
                <span>Philadelphia, Pennsylvania</span>
              </p>
            </div>
          </VCard>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.is-icon-container {
  width: 45px;
  height: 45px;
  padding: 15px;
  display: inline-block;
  box-sizing: content-box;
  border-radius: 50%;

  &.warn {
    border: solid 2px var(--warning);
    svg {
      color: var(--warning);
    }
  }

  &.primary {
    border: solid 2px var(--primary);
    svg {
      color: var(--primary);
    }
  }

  &.succ {
    border: solid 2px var(--success);
    svg {
      color: var(--success);
    }
  }
}
</style>
