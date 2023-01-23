import { acceptHMRUpdate, defineStore } from 'pinia'
import type { Chart, ChartOptions } from 'billboard.js'
import { ref } from 'vue'

export const useChart = defineStore('chart', () => {

  const loading = ref<boolean>(true)
  const options = ref<ChartOptions>()
  const billboard = ref<Chart>()

  const isLoading = computed(() => loading.value)
  const chartOption = computed<ChartOptions | undefined>(() => options.value)
  const columns = computed(() => options.value?.data?.columns)

  const insertColumn = (val: any[]) => {
    if (options.value?.data?.columns) {
      options.value?.data?.columns.push(val)
    }
  }
  const setLoading = (val: boolean) => loading.value = val
  const setBilboard = (val: Chart) => billboard.value = val
  const setOptions = (val: ChartOptions) => options.value = val

  const onReady = (billboard: Chart) => {
    if (options.value?.data?.columns) {
      options.value?.data?.columns.forEach(col => {
        setTimeout(() => {
          billboard.load({
            columns: [col]
          })
        }, 2000)
      })
    }

  }

  return {
    isLoading,
    chartOption,
    columns,
    insertColumn,
    setLoading,
    setBilboard,
    setOptions,
    onReady,
  } as const
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useChart, import.meta.hot))
}
