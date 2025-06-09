<template>
  <div ref="pdfContent" class="p-6 bg-white text-gray-800 text-sm leading-relaxed">
    <h1 class="text-2xl font-bold mb-2">{{ businessName || 'Nama Usaha' }}</h1>
    <h2 class="text-xl font-semibold mb-4">{{ product?.title || 'Judul Produk' }}</h2>

    <p><strong>Harga Jual :</strong> Rp {{ (price || 0).toLocaleString('id-ID') }}</p>
    <p><strong>Target / Hari :</strong> {{ target || 0 }} unit</p>
    <p><strong>Modal Awal:</strong> Rp {{ (stats?.initialCapital || 0).toLocaleString('id-ID') }}</p>

    <div class="mt-4 mb-6">
      <h3 class="font-semibold mb-2">Simulasi Statistik Produksi & Keuangan</h3>
      <ul class="list-inside list-disc ml-4 space-y-1">
        <li>Modal / Hari: Rp {{ (stats?.capitalPerDay || 0).toLocaleString('id-ID') }}</li>
        <li>Modal / Bulan: Rp {{ (stats?.capitalPerMonth || 0).toLocaleString('id-ID') }}</li>
        <li>Keuntungan / Hari: Rp {{ (stats?.profitPerDay || 0).toLocaleString('id-ID') }}</li>
        <li>Keuntungan / Bulan: Rp {{ (stats?.profitPerMonth || 0).toLocaleString('id-ID') }}</li>
        <li>Batch / Hari: {{ stats?.batchesPerDay || 0 }} batch</li>
        <li>Pendapatan / Hari: Rp {{ (stats?.revenuePerDay || 0).toLocaleString('id-ID') }}</li>
        <li>Balik Modal: {{ stats?.paybackPeriod || '-' }}</li>
      </ul>
    </div>

    <section v-if="product?.steps?.length">
      <h3 class="font-semibold mb-1">Langkah Pembuatan</h3>
      <ol class="list-decimal list-inside space-y-1">
        <li v-for="s in product.steps" :key="s">{{ s }}</li>
      </ol>
    </section>

    <section v-if="product?.tips?.length" class="mt-4">
      <h3 class="font-semibold mb-1">Tips</h3>
      <ol class="list-decimal list-inside space-y-1">
        <li v-for="t in product.tips" :key="t">{{ t }}</li>
      </ol>
    </section>

    <SectionList v-if="product?.ingredients" title="Bahan" :items="product.ingredients" />
    <SectionList v-if="product?.packaging" title="Packing" :items="product.packaging" />
    <SectionList v-if="product?.tools" title="Peralatan" :items="product.tools" />
  </div>
</template>

<script setup>
import { ref, defineProps, defineExpose } from 'vue'
import html2pdf from 'html2pdf.js'
import SectionList from '@/components/products/SectionList.vue'

const props = defineProps({
  businessName: String,
  product: Object,
  stats: Object,
  price: Number,
  target: Number
})

const pdfContent = ref(null)

function downloadPdf() {
  console.log('downloadPdf invoked, content:', pdfContent.value)
  html2pdf()
    .set({
      margin: 0.5,
      filename: `estimasi-${props.businessName || 'usaha'}-produk-${props.product?.title || 'produk'}.pdf`,
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'a4' }
    })
    .from(pdfContent.value)
    .save()
}

defineExpose({ downloadPdf })
</script>

<style scoped>
/* Tambahkan style untuk cetakan agar rapi */
@media print {
  body {
    background: white;
  }

  .hidden {
    display: none !important;
  }

  div {
    font-family: Arial, sans-serif;
  }
}
</style>
