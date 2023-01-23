<script setup lang="ts">
const router = useRouter()
const route = useRoute()

onMounted(() => {
  const _token = route.query.walToken ?? route.query.code
  if (_token) {
    // Get AIO Token and save in localStorage
    router.push({
      name: '/app/dashboards',
    })
  }
})
</script>
