<template>
  <section v-if="items?.length" class="mt-4">
    <h3 class="font-semibold mb-1">{{ title }}</h3>
    <ul class="list-disc list-inside space-y-1">
      <li v-for="it in items" :key="it._id">
        {{ it.qty }}× {{ it.item.name }} (Rp {{ it.item.price.toLocaleString('id-ID') }})
      </li>
    </ul>
  </section>
</template>

<script setup>
/* eslint-disable no-unused-vars */
const props = defineProps({
  title: String,
  items: Array
})
</script>
