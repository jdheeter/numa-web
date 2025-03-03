<template lang="pug">
div.flex.items-center.space-x-3
  span.text-muted Light Mode
  UToggle(v-model="isDarkMode")
  span.text-muted Dark Mode
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from "vue"
import { useColorMode } from "#imports"

const colorMode = useColorMode()
const isDarkMode = ref(false)

// Initialize properly after mount to avoid hydration mismatch
onMounted(() => {
  isDarkMode.value = colorMode.value === "dark"
})

watch(isDarkMode, (newVal) => {
  colorMode.preference = newVal ? "dark" : "light"
})
</script>
