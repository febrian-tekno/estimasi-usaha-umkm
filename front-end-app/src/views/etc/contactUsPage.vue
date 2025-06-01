<template>
  <AppBar />
<section class="bg-blue-200 py-6 px-4 text-center">
  <div class="max-w-2xl mt-8 mx-auto">
    <h1 class="text-5xl font-bold text-gray-800 mb-4">Hubungi Kami</h1>
    <p class="text-gray-600 mb-6">
      Kami siap membantu Anda. Kirim pertanyaan, masukan, atau permintaan melalui saluran di bawah ini.
    </p>
    <button
      @click="chatWhatsApp"
      class="bg-green-500 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-green-700 transition"
    >
      Hubungi Kami Sekarang
    </button>
  </div>
</section>

<div class="w-full overflow-hidden -mt-1">
  <svg
    class="w-full h-16 md:h-24 text-blue-200"
    preserveAspectRatio="none"
    viewBox="0 0 1440 320"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    style="transform: rotate(180deg);"
  >
    <path
      d="M0,224L48,197.3C96,171,192,117,288,112C384,107,480,149,576,160C672,171,768,149,864,144C960,139,1056,149,1152,144C1248,139,1344,117,1392,106.7L1440,96L1440,320L0,320Z"
    />
  </svg>
</div>


  <!-- Kontak Section -->
  <section class="py-16 px-4 bg-blue max-w-4xl mx-auto rounded-lg ">
    <h2 class="text-3xl font-bold text-gray-800 mb-10 text-center">Kontak Kami</h2>
    <div class="grid md:grid-cols-2 gap-8">
      <ContactItem icon="MailIcon" title="Email" text="support@jualapa.app" href="mailto:support@jualapa.app" />
      <ContactItem icon="PhoneIcon" title="Telepon" text="+62 812-3456-7890" />
      <ContactItem icon="PhoneCallIcon" title="WhatsApp" text="+62 812-3456-7890" href="https://wa.me/6281234567890" />
      <ContactItem icon="PrinterIcon" title="Fax" text="(021) 123-4567" />
      <ContactItem icon="InstagramIcon" title="Instagram" text="@jualapa" href="https://instagram.com/jualapa" />
      <ContactItem icon="FacebookIcon" title="Facebook" text="@jualapa" href="https://facebook.com/jualapa" />
    </div>
  </section>

  <FooterApp />
</template>

<script setup>
import AppBar from '@/components/global/AppBar.vue'
import FooterApp from '@/components/global/FooterApp.vue'
import { defineComponent, h } from 'vue'
import {
  MailIcon,
  PhoneIcon,
  InstagramIcon,
  FacebookIcon,
  PrinterIcon,
  PhoneCallIcon
} from 'lucide-vue-next'

// Komponen kontak satuan
const ContactItem = defineComponent({
  props: ['icon', 'title', 'text', 'href'],
  setup(props) {
    return () =>
      h('div', { class: 'flex items-start gap-4' }, [
        h('div', { class: 'bg-blue-100 text-blue-600 p-3 rounded-full shrink-0' }, [
          h(eval(props.icon), { class: 'w-6 h-6' })
        ]),
        h('div', {}, [
          h('h2', { class: 'text-xl font-semibold' }, props.title),
          props.href
            ? h('a', { href: props.href, class: 'text-blue-600 hover:underline', target: '_blank' }, props.text)
            : h('p', {}, props.text)
        ])
      ])
  }
})

function chatWhatsApp() {
  const phoneNumber = '6281234567890'; 
  const message = encodeURIComponent('Halo, saya ingin mengetahui lebih lanjut mengenai jualApa, mohon informasinya.');
  const url = `https://wa.me/${phoneNumber}?text=${message}`;
  window.open(url, '_blank');
}
</script>
