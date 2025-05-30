<template>
  <div class="flex items-center gap-4 border rounded p-3 mb-2">
    <div class="w-6 text-center text-gray-500 select-none">{{ index + 1 }}</div>

    <select v-model="modelValue.ingredientId" @change="onChange" class="flex-1 border rounded px-2 py-1">
      <option value="">-- Select Ingredient --</option>
      <option v-for="item in ingredientDB" :key="item.id" :value="item.id">
        {{ item.name }}
      </option>
      <option value="__add_new">+ Add New Ingredient</option>
    </select>

    <div v-if="selectedIngredient" class="flex items-center gap-2 min-w-[120px]">
      <img :src="selectedIngredient.image" alt="img" class="w-10 h-10 object-cover rounded" />
      <div class="text-sm text-gray-600">
        Rp {{ formatPrice(selectedIngredient.price) }} / {{ selectedIngredient.unit }}
      </div>
    </div>

    <input
      v-if="modelValue.ingredientId !== '__add_new'"
      type="number"
      min="0"
      v-model.number="modelValue.qty"
      placeholder="Qty"
      class="w-20 border rounded px-2 py-1"
    />

    <input
      v-if="modelValue.ingredientId === '__add_new'"
      v-model="modelValue.newIngredientName"
      placeholder="New ingredient name"
      class="flex-1 border rounded px-2 py-1"
    />

    <input
      type="text"
      v-model="modelValue.unit"
      placeholder="Unit"
      class="w-24 border rounded px-2 py-1"
      :disabled="modelValue.ingredientId !== '__add_new'"
    />

    <div class="w-24 text-right font-semibold">
      Rp
      {{
        formatPrice(
          (modelValue.qty || 0) *
            (modelValue.ingredientId === '__add_new' ? 0 : selectedIngredient?.price || 0)
        )
      }}
    </div>

    <button
      @click="$emit('remove')"
      class="text-red-500 hover:text-red-700 font-bold px-2"
      title="Remove Ingredient"
    >
      ×
    </button>
  </div>
</template>

<script setup>
import { computed, watch, toRefs } from 'vue'

const props = defineProps({
  modelValue: Object,
  index: Number,
  ingredientDB: Array,
})
const emit = defineEmits(['update:modelValue', 'remove'])

const { modelValue } = toRefs(props)

const selectedIngredient = computed(() => {
  return props.ingredientDB.find(i => i.id === modelValue.value.ingredientId)
})

function onChange(e) {
  const val = e.target.value
  if (val === '__add_new') {
    modelValue.value.newIngredientName = ''
    modelValue.value.qty = 0
    modelValue.value.unit = ''
  } else {
    const found = props.ingredientDB.find(i => i.id === val)
    if (found) {
      modelValue.value.unit = found.unit || modelValue.value.unit || 'pcs'
      if (!modelValue.value.qty) modelValue.value.qty = 0
    }
  }
  emit('update:modelValue', modelValue.value)
}

function formatPrice(val) {
  if (!val) return '0'
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}
</script>

<style scoped>
input,
select {
  outline-offset: 2px;
  outline-color: transparent;
  outline-style: solid;
  outline-width: 2px;
  transition: outline-color 0.2s ease;
}
input:focus,
select:focus {
  outline-color: #3b82f6; /* Tailwind blue-500 */
}
</style>
