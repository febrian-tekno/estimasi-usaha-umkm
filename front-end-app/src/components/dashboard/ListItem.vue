<template>
  <div class="bg-white p-4 rounded shadow mb-6">
    <h2 class="text-xl font-semibold mb-2">🛒 {{ title }}</h2>
    <table class="table w-full">
      <thead>
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Amount</th>
          <th>Price</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="entry in entries"
          :key="entry._id"
          class="text-center"
        >
          <td>
            <img
              :src="entry.image ? baseServerUrl + entry.image : ''"
              alt=""
              class="m-auto w-16 h-16 object-cover rounded"
            />
          </td>
          <td class="text-left">{{ entry.name }}</td>
          <td>{{ entry.amount }}</td>
          <td>Rp. {{ entry.price?.toLocaleString('id-ID') }}</td>
          <td>
            <div class="flex justify-center gap-2">
              <button
                class="btn btn-sm btn-ghost"
                @click="$emit('edit', entry._id)"
              >
                <i class="fas fa-pencil-alt"></i>
              </button>
              <button
                class="btn btn-sm btn-ghost text-red-500"
                @click="$emit('delete', entry._id)"
              >
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "IngredientList",
  props: {
    title: {
      type: String,
      required: true,
    },
    entries: {
      type: Array,
      required: true,
    },
    baseServerUrl: {
      type: String,
      default: import.meta.env.VITE_SERVER_BASE_URL,
    },
  },
};
</script>


