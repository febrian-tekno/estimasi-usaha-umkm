<template>
  <div class="min-h-screen bg-gray-100 p-6">
    <!-- Header -->
    <header class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">JualApa Admin Dashboard</h1>
      <button class="btn btn-primary">Logout</button>
    </header>

    <!-- Dashboard Quick Actions -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <button class="btn btn-secondary" @click="addProduct">➕ Add New Product</button>
      <button class="btn btn-secondary" @click="addPrice">➕ Add Ingredient Price</button>
      <button class="btn btn-secondary" @click="verifyProduct">✅ Verify Product Eligibility</button>
    </div>

    <!-- Product List -->
    <div class="bg-white p-4 rounded shadow mb-6">
      <h2 class="text-xl font-semibold mb-2">📦 All Products</h2>
      <table class="table w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Popularity 👁️</th>
            <th>Verified ✅</th>
            <th>Favorite ⭐</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id">
            <td>{{ product.name }}</td>
            <td>{{ product.category }}</td>
            <td>{{ product.popularity }}</td>
            <td>{{ product.verified ? 'Yes' : 'No' }}</td>
            <td>{{ product.favorite ? 'Yes' : 'No' }}</td>
            <td>
              <button class="btn btn-sm btn-ghost"><i class="fas fa-pencil-alt"></i></button>
              <button class="btn btn-sm btn-ghost text-red-500"><i class="fas fa-trash"></i></button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Ingredient Price List -->
    <div class="bg-white p-4 rounded shadow mb-6">
      <h2 class="text-xl font-semibold mb-2">🛒 Ingredient Prices</h2>
      <table class="table w-full">
        <thead>
          <tr>
            <th>Ingredient</th>
            <th>Unit</th>
            <th>Price</th>
            <th>Source</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="entry in priceList" :key="entry.id">
            <td>{{ entry.ingredient }}</td>
            <td>{{ entry.unit }}</td>
            <td>{{ entry.price }}</td>
            <td>{{ entry.source }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Users Table -->
    <div class="bg-white p-4 rounded shadow">
      <h2 class="text-xl font-semibold mb-2">👤 All Users</h2>
      <table class="table w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.role }}</td>
            <td>
              <button class="btn btn-sm btn-ghost"><i class="fas fa-eye"></i></button>
              <button class="btn btn-sm btn-ghost"><i class="fas fa-pencil-alt"></i></button>
              <button class="btn btn-sm btn-ghost text-red-500"><i class="fas fa-trash"></i></button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const products = ref([
  { id: 1, name: 'Es Coklat Lumer', category: 'Minuman', popularity: 345, verified: true, favorite: true },
  { id: 2, name: 'Dimsum Ayam', category: 'Makanan', popularity: 210, verified: false, favorite: false },
])

const priceList = ref([
  { id: 1, ingredient: 'Coklat Bubuk', unit: '100g', price: 'Rp 8.000', source: 'Tokopedia' },
  { id: 2, ingredient: 'Kulit Dimsum', unit: '10 pcs', price: 'Rp 5.000', source: 'Shopee' },
])

const users = ref([
  { id: 1, name: 'Budi Santoso', email: 'budi@mail.com', role: 'admin' },
  { id: 2, name: 'Sari Dewi', email: 'sari@mail.com', role: 'user' },
])

const addProduct = () => alert('Add product clicked')
const addPrice = () => alert('Add price clicked')
const verifyProduct = () => alert('Verify clicked')
</script>

<style scoped>
.table th,
.table td {
  padding: 0.75rem;
  border-bottom: 1px solid #e5e7eb;
}
</style>

<!-- Required dependencies:
 - TailwindCSS
 - Font Awesome (for icons)
 - DaisyUI (btn, table classes) -->
