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
    rawCategory: 'food',
    tags: [],
    steps: [''],
    tips: [''],
    ingredients: [], // array of { selected, qty, price }
    packaging: [],
    tools: [],
  });

  const apiUrl = import.meta.env.VITE_SERVER_BASE_URL;
  const selectedFile = ref(null);
  const previewImage = ref(null);
  const errorMessage = ref('');
  const isSubmitting = ref(false);

  const ingredientsOptions = ref([]);
  const packagingOptions = ref([]);
  const toolsOptions = ref([]);

  // 2) Computed / Getters
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

  const requiredProductionPerDay = computed(() => {
    return Math.ceil(form.dailySalesTarget / form.productionYield);
  });

  const costPerDay = computed(() => {
    return requiredProductionPerDay.value * productionModalTotal.value;
  });

  const profitPerDay = computed(() => {
    return revenuePerDay.value - costPerDay.value;
  });

  const marginPerMonth = computed(() => {
    return profitPerDay.value * 30;
  });

  const capital = computed(() => productionModalTotal.value);

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

  function addTip() {
    form.tips.push('');
  }
  function removeTip(idx) {
    if (form.tips.length > 1) form.tips.splice(idx, 1);
  }

  function addItem(groupKey) {
    form[groupKey].push({ selected: null, qty: 0, price: 0 });
  }
  function removeItem(groupKey, idx) {
    form[groupKey].splice(idx, 1);
  }

  async function fetchOptions(groupKey) {
    let url = '';
    switch (groupKey) {
      case 'ingredients':
        url = `${apiUrl}/api/v1/ingredients`;
        break;
      case 'packaging':
        url = `${apiUrl}/api/v1/packages`;
        break;
      case 'tools':
        url = `${apiUrl}/api/v1/tools`;
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
        ingredients: `${apiUrl}/api/v1/ingredients?q=`,
        packaging: `${apiUrl}/api/v1/packages?q=`,
        tools: `${apiUrl}/api/v1/tools?q=`,
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

    // Kalau selected adalah object, gunakan langsung .price
    let selectedObj;
    if (typeof item.selected === 'object' && item.selected !== null) {
      selectedObj = item.selected;
    } else {
      // Kalau selected adalah string ID
      let options = [];
      if (groupKey === 'ingredients') options = ingredientsOptions.value;
      else if (groupKey === 'packaging') options = packagingOptions.value;
      else if (groupKey === 'tools') options = toolsOptions.value;

      selectedObj = options.find((o) => o._id === item.selected);
    }

    if (selectedObj) {
      const pricePerUnit = selectedObj.price || 0;
      item.price = pricePerUnit * (item.qty || 0);
    } else {
      item.price = 0;
    }
    // Begitu item.price berubah, semua computed (capital / profitPerDay) otomatis ter‐recompute
  }

  function validateForm(tagsInput) {
    // validasi seperti biasa...

    if (tagsInput.trim()) {
      form.tags = tagsInput
        .split(',')
        .map((t) => t.trim())
        .filter((t) => t.length > 0);
    } else {
      form.tags = [];
    }

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
      formData.append('category', form.rawCategory);
      formData.append('tags', JSON.stringify(form.tags));
      formData.append('steps', JSON.stringify(form.steps.filter((s) => s.trim() !== '')));
      formData.append('tips', JSON.stringify(form.tips.filter((t) => t.trim() !== '')));

      const mapGroup = (groupKey) =>
        form[groupKey].map((item) => ({
          item: typeof item.selected === 'object' ? item.selected._id : item.selected,
          qty: item.qty,
        }));

      formData.append('ingredients', JSON.stringify(mapGroup('ingredients')));
      formData.append('packaging', JSON.stringify(mapGroup('packaging')));
      formData.append('tools', JSON.stringify(mapGroup('tools')));

      await axios.post(`${apiUrl}/api/v1/products`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });

      alert('Product created successfully!');

      form.title = '';
      form.dailySalesTarget = 1;
      form.estimatedSellingPrice = 0;
      form.productionYield = 1;
      form.rawCategory = 'food';
      form.tags = [];
      form.steps = [''];
      form.tips = [''];
      form.ingredients = [];
      form.packaging = [];
      form.tools = [];
      selectedFile.value = null;
      previewImage.value = null;

      router.back();
    } catch (err) {
      console.error('Error creating product:', err);
      errorMessage.value = err.response?.data?.message || 'Failed to create product';
    } finally {
      isSubmitting.value = false;
    }
  }

  return {
    form,
    selectedFile,
    previewImage,
    errorMessage,
    isSubmitting,
    ingredientsOptions,
    packagingOptions,
    toolsOptions,
    itemGroups,
    productionModalTotal,
    initialModalTotal,
    revenuePerDay,
    requiredProductionPerDay,
    costPerDay,
    profitPerDay,
    marginPerMonth,
    capital,
    getTotalPrice,
    onFileChange,
    addStep,
    removeStep,
    addTip,
    removeTip,
    addItem,
    removeItem,
    fetchOptions,
    onSearch,
    updateItemPrice,
    submitProduct,
  };
});
