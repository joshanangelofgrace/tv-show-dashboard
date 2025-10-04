<template>
  <div class="flex gap-2">
    <div class="font-bold">{{ label }}:</div>
    <a v-if="link && linkText" :href="link" target="_blank" class="text-blue-600 cursor-pointer">{{ linkText}}</a>
    <div v-if="item">{{ item }}</div>
  </div>
</template>
<script lang="ts" setup>
defineProps<{
	label: string,
  item?: string,
  link?: string,
  linkText?: string
}>()
</script>
