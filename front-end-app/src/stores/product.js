import { defineStore } from 'pinia';
import { ref, reactive, computed } from 'vue';
import axios from 'axios';

export const useProductStore = defineStore('product', () => {
  // 1) State
  const form = reactive({
    title: '',
    dailySalesTarget: 1,
    estimatedSellingPrice: 0,
    productionYield: 1,
    rawCategory: 'food', // default: "food" atau "drink"
    tags: [], // nanti di‐set dari komponen sebagai array
    steps: [''],
    ingredients: [],
    packaging: [],
    tools: [],
  });

  const selectedFile = ref(null);
  const previewImage = ref(null);
  const errorMessage = ref('');
  const isSubmitting = ref(false);

  // Opsi dropdown (akan di‐isi lewat API)
  const ingredientsOptions = ref([]);
  const packagingOptions = ref([]);
  const toolsOptions = ref([]);

  // 2) Getters / Computed
  const itemGroups = computed(() => [
    { key: 'ingredients', label: 'Ingredients', options: ingredientsOptions.value },
    { key: 'packaging', label: 'Packaging', options: packagingOptions.value },
    { key: 'tools', label: 'Tools', options: toolsOptions.value },
  ]);

  function getTotalPrice(groupKey) {
    return form[groupKey].reduce((acc, cur) => acc + (cur.price || 0), 0);
  }

  const productionModalTotal = computed(() => {
    return getTotalPrice('ingredients') + getTotalPrice('packaging');
  });

  const initialModalTotal = computed(() => {
    return getTotalPrice('ingredients') + getTotalPrice('packaging') + getTotalPrice('tools');
  });

  const revenuePerDay = computed(() => {
    return form.dailySalesTarget * form.estimatedSellingPrice;
  });
  const costPerDay = computed(() => productionModalTotal.value);
  const marginPerDay = computed(() => revenuePerDay.value - costPerDay.value);
  const marginPerMonth = computed(() => marginPerDay.value * 30);

  const capital = computed(() => productionModalTotal.value);
  const profitPerDay = computed(() => marginPerDay.value);

  // 3) Actions / Methods

  function onFileChange(event) {
    const file = event.target.files[0];
    if (!file) {
      selectedFile.value = null;
      previewImage.value = null;
      return;
    }
    selectedFile.value = file;
    const reader = new FileReader();
    reader.onload = (e) => {
      previewImage.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  function addStep() {
    form.steps.push('');
  }
  function removeStep(idx) {
    if (form.steps.length > 1) form.steps.splice(idx, 1);
  }

  function addItem(groupKey) {
    form[groupKey].push({ selected: null, qty: 0, price: 0 });
  }
  function removeItem(groupKey, idx) {
    form[groupKey].splice(idx, 0);
  }

  async function fetchOptions(groupKey) {
    let url = '';
    switch (groupKey) {
      case 'ingredients':
        url = 'http://localhost:3000/api/v1/ingredients';
        break;
      case 'packaging':
        url = 'http://localhost:3000/api/v1/packages';
        break;
      case 'tools':
        url = 'http://localhost:3000/api/v1/tools';
        break;
    }
    if (!url) return;

    try {
      const response = await axios.get(url);
      const list = Array.isArray(response.data.data) ? response.data.data : [];
      const mapped = list.map((item) => ({
        ...item,
        displayName: `${item.name} / ${item.amount}`,
      }));

      if (groupKey === 'ingredients') ingredientsOptions.value = mapped;
      else if (groupKey === 'packaging') packagingOptions.value = mapped;
      else if (groupKey === 'tools') toolsOptions.value = mapped;
    } catch (e) {
      console.error('Fetch options error:', e);
    }
  }

  async function onSearch(search, loading, groupKey) {
    if (!search || search.length < 2) {
      return;
    }
    loading(true);
    try {
      const urlMap = {
        ingredients: 'http://localhost:3000/api/v1/ingredients?q=',
        packaging: 'http://localhost:3000/api/v1/packages?q=',
        tools: 'http://localhost:3000/api/v1/tools?q=',
      };
      const res = await axios.get(urlMap[groupKey] + encodeURIComponent(search));
      const list = Array.isArray(res.data.data) ? res.data.data : [];
      if (groupKey === 'ingredients') ingredientsOptions.value = list;
      else if (groupKey === 'packaging') packagingOptions.value = list;
      else if (groupKey === 'tools') toolsOptions.value = list;
    } catch (e) {
      console.error('Search error:', e);
    } finally {
      loading(false);
    }
  }

  function updateItemPrice(groupKey, index) {
    const item = form[groupKey][index];
    if (!item.selected) {
      item.price = 0;
      return;
    }
    let options = [];
    if (groupKey === 'ingredients') options = ingredientsOptions.value;
    else if (groupKey === 'packaging') options = packagingOptions.value;
    else if (groupKey === 'tools') options = toolsOptions.value;

    const selectedObj = options.find((o) => o._id === item.selected);
    if (selectedObj) {
      const pricePerUnit = selectedObj.price || 0;
      item.price = pricePerUnit * (item.qty || 1);
    } else {
      item.price = 0;
    }
  }

  function validateForm(tagsInput) {
    // Validasi judul
    if (!form.title.trim() || form.title.trim().length < 3) {
      errorMessage.value = 'Title minimal 3 karakter';
      return false;
    }
    // Validasi dailySalesTarget
    if (!form.dailySalesTarget || form.dailySalesTarget < 1) {
      errorMessage.value = 'Daily Sales Target minimal 1';
      return false;
    }
    // Validasi harga estimasi
    if (form.estimatedSellingPrice < 0) {
      errorMessage.value = 'Estimated Selling Price tidak boleh negatif';
      return false;
    }
    // Validasi productionYield
    if (!form.productionYield || form.productionYield < 1) {
      errorMessage.value = 'Production Yield minimal 1';
      return false;
    }
    // Validasi file gambar
    if (!selectedFile.value) {
      errorMessage.value = 'Gambar produk wajib diupload';
      return false;
    }
    // Validasi minimal 1 ingredients dan paket
    if (form.ingredients.length === 0) {
      errorMessage.value = 'Minimal 1 bahan (ingredients)';
      return false;
    }
    if (form.packaging.length === 0) {
      errorMessage.value = 'Minimal 1 packaging';
      return false;
    }
    // Validasi isi tiap grup (ingredients, packaging)
    const isValidGroup = (group) => form[group].every((item) => item.selected && item.qty && Number(item.qty) > 0);
    if (!isValidGroup('ingredients')) {
      errorMessage.value = 'Semua ingredients harus dipilih dan qty ≥ 1';
      return false;
    }
    if (!isValidGroup('packaging')) {
      errorMessage.value = 'Semua packaging harus dipilih dan qty ≥ 1';
      return false;
    }
    // Tools boleh kosong, tapi jika diisi harus valid
    if (form.tools.length > 0 && !form.tools.every((item) => item.selected && item.qty && Number(item.qty) > 0)) {
      errorMessage.value = 'Semua tools harus dipilih dan qty ≥ 1 jika diisi';
      return false;
    }

    // Convert tagsInput (string) menjadi array
    if (tagsInput.trim()) {
      form.tags = tagsInput
        .split(',')
        .map((t) => t.trim())
        .filter((t) => t.length > 0);
    } else {
      form.tags = [];
    }

    // Jika semua valid, kosongkan errorMessage
    errorMessage.value = '';
    return true;
  }

  async function submitProduct(router, tagsInput) {
    if (!validateForm(tagsInput)) return;

    isSubmitting.value = true;
    try {
      const formData = new FormData();
      formData.append('image', selectedFile.value);

      formData.append('title', form.title.trim());
      formData.append('dailySalesTarget', form.dailySalesTarget);
      formData.append('estimatedSellingPrice', form.estimatedSellingPrice);
      formData.append('productionYield', form.productionYield);
      formData.append('capital', capital.value);
      formData.append('profit', profitPerDay.value);

      // Kirim rawCategory
      formData.append('category', form.rawCategory);

      // Kirim tags sebagai JSON array
      formData.append('tags', JSON.stringify(form.tags));

      // Steps
      formData.append('steps', JSON.stringify(form.steps.filter((s) => s.trim() !== '')));

      // Tips tetap kosong
      formData.append('tips', JSON.stringify([]));

      // Map tiap grup item menjadi { item: ObjectId, qty: Number }
      const mapGroup = (groupKey) =>
        form[groupKey].map((item) => ({
          item: item.selected,
          qty: item.qty,
        }));

      formData.append('ingredients', JSON.stringify(mapGroup('ingredients')));
      formData.append('packaging', JSON.stringify(mapGroup('packaging')));
      formData.append('tools', JSON.stringify(mapGroup('tools')));

      await axios.post('http://localhost:3000/api/v1/products', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });

      alert('Product created successfully!');

      // Reset state
      form.title = '';
      form.dailySalesTarget = 1;
      form.estimatedSellingPrice = 0;
      form.productionYield = 1;
      form.rawCategory = 'food';
      form.tags = [];
      form.steps = [''];
      form.ingredients = [];
      form.packaging = [];
      form.tools = [];
      selectedFile.value = null;
      previewImage.value = null;

      // Kembali ke halaman sebelumnya
      router.back();
    } catch (err) {
      console.error('Error creating product:', err);
      errorMessage.value = err.response?.data?.message || 'Failed to create product';
    } finally {
      isSubmitting.value = false;
    }
  }

  return {
    // State
    form,
    selectedFile,
    previewImage,
    errorMessage,
    isSubmitting,
    ingredientsOptions,
    packagingOptions,
    toolsOptions,
    // Getters
    itemGroups,
    productionModalTotal,
    initialModalTotal,
    marginPerDay,
    marginPerMonth,
    capital,
    profitPerDay,
    getTotalPrice,
    // Actions
    onFileChange,
    addStep,
    removeStep,
    addItem,
    removeItem,
    fetchOptions,
    onSearch,
    updateItemPrice,
    submitProduct,
  };
});
