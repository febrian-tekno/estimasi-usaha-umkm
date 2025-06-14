<template>
  <AppBar />
  <div class="min-h-screen bg-gray-100 p-4 sm:p-6">
    <!-- HEADER -->
    <header class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-6">
      <h1 class="text-xl sm:text-2xl font-bold">JualApa Admin Dashboard</h1>
      <LogoutBtn />

    </header>

    <h1 class="text-xl sm:text-2xl  font-bold text-orange-500">{{ user?.username || 'username admin' }}</h1>
    <!-- ACTION BUTTONS -->
<div class="flex justify-between mt-6 items-start mb-6 flex-wrap gap-3">
  <a href="/products/add" class="btn btn-secondary text-sm">➕ Add New Product</a>
  
  <div class="flex gap-5 flex-wrap pr-12">
    <button class="btn btn-secondary text-sm" @click="showIngredientForm = true">➕ Add Ingredient</button>
    <button class="btn btn-secondary text-sm" @click="showPackingForm = true">➕ Add Packing</button>
    <button class="btn btn-secondary text-sm" @click="showToolsForm = true">➕ Add Tools</button> 
  </div>
</div>


    <!-- MODALS -->
    <Teleport to="body">
      <FormModal
        v-if="showIngredientForm"
        title="Add Ingredient"
        :url="`${baseUrl}/v1/ingredients`"
        @close="showIngredientForm = false"
        @success="render"
      />
      <FormModal
        v-if="showPackingForm"
        title="Add Packaging"
        :url="`${baseUrl}/v1/packages`"
        @close="showPackingForm = false"
        @success="render"
      />
      <FormModal
        v-if="showToolsForm"
        title="Add Tools"
        :url="`${baseUrl}/v1/tools`"
        @close="showToolsForm = false"
        @success="render"
      />
    </Teleport>

    <!-- TABLE PRODUK -->
    <div v-if="products" class="bg-white p-4 rounded shadow mb-6 overflow-x-auto">
      <h2 class="text-lg sm:text-xl font-semibold mb-2">📦 All Products</h2>
      <table class="table w-full min-w-[700px] text-sm">
        <thead>
          <tr>
            <th >Image</th>
            <th >Name</th>
            <th> Views 👁</th>
            <th>Verified ✅</th>
            <th>Favorite ⭐</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product._id" class="text-center">
            <td>
              <img
                :src="product.image ? baseServerUrl + product.image : ''"
                alt=""
                class="m-auto w-16 h-16 object-cover rounded"
              />
            </td>
            <td >{{ product.title }}</td>
            <td>{{ product.views }}</td>
            <td :class="product.isVerified ? 'text-green-600 font-semibold' : 'text-black'">
              {{ product.isVerified ? 'Yes' : 'No' }}
            </td>
            <td>{{ product.stars }}</td>
            <td>
              <div class="flex justify-center gap-2">
                <button class="btn btn-sm btn-ghost" @click="editProduct(product._id)">
                  <i class="fas fa-pencil-alt"></i>
                </button>
                <button class="btn btn-sm btn-ghost text-red-500" @click="deleteProduct(product._id)">
                  <i class="fas fa-trash"></i>
                </button>
                <button
                    v-if="!product.isVerified"
                    class="btn btn-sm btn-outline text-green-600 mt-1"
                    @click="verifyProduct(product._id)"
                    >Verify
                    <i class="fas fa-check mr-1"></i> 
                  </button>

                  <button
                    v-else
                    class="btn btn-sm btn-outline text-yellow-600 mt-1"
                    @click="unverifyProduct(product._id)"
                  >
                    <i class="fas fa-times mr-1"></i> Unverify
                  </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- LIST INGREDIENTS -->
    <div class="bg-white p-4 rounded shadow mb-6 overflow-x-auto">
      <ListItem
        title="All Ingredients"
        :entries="ingredients"
        :baseServerUrl="baseServerUrl"
        @edit="id => handleEdit(id)"
        @delete="id => handleDelete({ id, type: 'ingredient' })"
      />
    </div>

    <!-- LIST PACKAGING -->
    <div class="bg-white p-4 rounded shadow mb-6 overflow-x-auto">
      <ListItem
        title="All Packages"
        :entries="packages"
        :baseServerUrl="baseServerUrl"
        @edit="id => handleEdit(id)"
        @delete="id => handleDelete({ id, type: 'package' })"
      />
    </div>

    <!-- LIST TOOLS -->
    <div class="bg-white p-4 rounded shadow mb-6 overflow-x-auto">
      <ListItem
        title="All Tools"
        :entries="tools"
        :baseServerUrl="baseServerUrl"
        @edit="id => handleEdit(id)"
        @delete="id => handleDelete({ id, type: 'tool' })"
      />
    </div>

    <!-- USER TABLE -->
    <div class="bg-white p-4 rounded shadow overflow-x-auto">
      <h2 class="text-lg sm:text-xl font-semibold mb-2">👤 All Users</h2>
      <table class="table w-full min-w-[700px] text-sm">
        <thead>
          <tr>
            <th class="text-left">Name</th>
            <th class="text-left">Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user._id" class="text-center">
            <td class="text-left">{{ user.username }}</td>
            <td class="text-left">{{ user.email }}</td>
            <td>{{ user.role }}</td>
            <td>
              <div class="flex gap-2 justify-center">
                <button class="btn btn-sm btn-ghost" @click="showDetailsUser(user._id)">
                  <i class="fas fa-eye"></i>
                </button>
                <button class="btn btn-sm btn-ghost">
                  <i class="fas fa-pencil-alt"></i>
                </button>
                <button class="btn btn-sm btn-ghost text-red-500">
                  <i class="fas fa-trash"></i>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <FooterApp />
</template>

<script setup>
import AppBar from '@/components/global/AppBar.vue'
import FooterApp from '@/components/global/FooterApp.vue'
import LogoutBtn from '@/components/dashboard/logoutBtn.vue'
import FormModal from '@/components/dashboard/FormModal.vue'
import ListItem from '@/components/dashboard/ListItem.vue'
import { onMounted, ref } from 'vue'
import axios from 'axios'
import Swal from 'sweetalert2'  

const baseUrl = import.meta.env.VITE_API_BASE_URL
const baseServerUrl = import.meta.env.VITE_SERVER_BASE_URL

const showIngredientForm = ref(false)
const showPackingForm = ref(false)
const showToolsForm = ref(false)

const products = ref([])
const users = ref([])
const ingredients = ref([])
const packages = ref([])
const tools = ref([])


async function fetchProducts() {
  try {
    const res = await axios.get(`${baseUrl}/v1/products`, { withCredentials: true })
    products.value = res.data.data.products;
    console.log(products.value)
  } catch (error) {
    console.error('Gagal mengambil data product:', error)
  }
}

async function fetchUsers() {
  try {
    const res = await axios.get(`${baseUrl}/v1/users`, { withCredentials: true })
    users.value = res.data.data
  } catch (error) {
    console.error('Gagal mengambil data users:', error)
  }
}

async function fetchIngredients() {
  try {
    const res = await axios.get(`${baseUrl}/v1/ingredients`, { withCredentials: true })
    ingredients.value = res.data.data
  } catch (error) {
    console.error('Gagal mengambil data price list:', error)
  }
}

async function fetchPackagings() {
  try {
    const res = await axios.get(`${baseUrl}/v1/packages`, { withCredentials: true })
    packages.value = res.data.data
  } catch (error) {
    console.error('Gagal mengambil data packages list:', error)
  }
}

async function fetchTools() {
  try {
    const res = await axios.get(`${baseUrl}/v1/tools`, { withCredentials: true })
    tools.value = res.data.data
  } catch (error) {
    console.error('Gagal mengambil data tools list:', error)
  }
}

async function render() {
  await fetchProducts();
  await fetchUsers();
  await fetchIngredients();
  await fetchPackagings();
  await fetchTools();
}
onMounted(() => {
  render()
})

function handleEdit(id) {
  console.log('Edit clicked for ID:', id)
  // logic handle edit
}

// Handle Delete dengan SweetAlert2 dan reload data sesuai tipe
async function handleDelete({ id, type }) {
  const result = await Swal.fire({
    title: `Are you sure to delete this ${type}?`,
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!'
  })

  if(result.isConfirmed) {
    let endpoint = ''
    if(type === 'ingredient') endpoint = `${baseUrl}/v1/ingredients/${id}`
    else if(type === 'package') endpoint = `${baseUrl}/v1/packages/${id}`
    else if(type === 'tool') endpoint = `${baseUrl}/v1/tools/${id}`

    try {
      await axios.delete(endpoint, { withCredentials: true })
      Swal.fire('Deleted!', `${type} has been deleted.`, 'success')

      // Refresh data sesuai tipe
      if(type === 'ingredient') await fetchIngredients()
      else if(type === 'package') await fetchPackagings()
      else if(type === 'tool') await fetchTools()
    } catch (error) {
      Swal.fire('Error!', 'Failed to delete item.', 'error')
      console.error(error)
    }
  }
}

</script>

<style scoped>
.table th,
.table td {
  padding: 0.75rem;
  border-bottom: 1px solid #e5e7eb;
}
</style>
