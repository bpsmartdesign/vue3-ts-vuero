<script setup lang="ts">
const router = useRouter()

onMounted(() => {
  router.push({
    name: '/app/dashboards',
  })
})
</script>
