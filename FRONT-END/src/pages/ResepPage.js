export default async function ResepPage() {
  const resepId = getResepIdFromPath();
  if (!resepId) return showError('Resep tidak ditemukan!');

  try {
    console.log(resepId);
    return renderResepPage(resepId);
  } catch (error) {
    console.error(error);
    return showError('Gagal memuat data resep.');
  }
}

// Ambil resep ID dari path (contoh: resep/resep1, resep/resep2)
function getResepIdFromPath() {
  const path = window.location.hash.slice(1); 
  console.log(path)
  const pathParts = path.split('/'); 
  console.log(pathParts)
  return pathParts[2];
}


// Render halaman resep dengan data dari backend dan data dummy untuk tambahan
async function renderResepPage(resepId) {
  try {
    // Ambil data resep dari backend
    const res = await fetch(`http://localhost:3000/api/v1/resep/${resepId}`);
    const json = await res.json();
    
    if (json.status !== 'success') throw new Error('Gagal mengambil data resep');
    
    const resep = json.data;

    // Menggunakan data dummy untuk beberapa field tambahan
    const estimatedPrice = "15.000";  // Estimasi harga produksi
    const servings = 4;  // Porsi yang didapat
    const sellPrice = "25.000";  // Harga jual per porsi
    const profitPerProduction = "10.000";  // Keuntungan per porsi

    const ingredientsHtml = createListHtml(resep.ingredients, formatIngredient);
    const stepsHtml = createListHtml(resep.steps, formatStep);

    return `
      <div class="container mt-5">
        <!-- Judul dan Gambar Resep -->
        <div class="row">
          <div class="col-12 text-center">
            <h1 class="display-4 mb-3">${resep.title}</h1>
            <img src="${resep.imageUrl}" class="img-fluid rounded shadow-lg mb-4" alt="Gambar Resep" />
          </div>
        </div>

        <!-- Bahan-bahan -->
        <div class="row mb-4">
          <div class="col-12">
            <h4 class="text-primary">Bahan-bahan</h4>
            <ul class="list-group">
              ${ingredientsHtml}
            </ul>
          </div>
        </div>

        <!-- Langkah-langkah -->
        <div class="row mb-4">
          <div class="col-12">
            <h4 class="text-success">Langkah-langkah</h4>
            <ol class="list-group list-group-numbered">
              ${stepsHtml}
            </ol>
          </div>
        </div>

        <!-- Tips -->
        <div class="row mb-4">
          <div class="col-12">
            <h5 class="mt-4 text-info">Tips</h5>
            <p class="fst-italic">${resep.tips}</p>
          </div>
        </div>

        <!-- Sumber -->
        <div class="row mb-4">
          <div class="col-12">
            <p>Sumber: <a href="${resep.sourceUrl}" target="_blank" class="text-decoration-none">${resep.sourceUrl}</a></p>
          </div>
        </div>

        <hr class="my-5">

        <!-- Data Tambahan -->
        <div class="row mb-4">
          <div class="col-md-6">
            <h5 class="text-muted">Estimasi Harga Produksi</h5>
            <p>Rp <strong>${estimatedPrice}</strong></p>
          </div>
          <div class="col-md-6">
            <h5 class="text-muted">Porsi yang Diperoleh</h5>
            <p><strong>${servings}</strong> porsi</p>
          </div>
          <div class="col-md-6">
            <h5 class="text-muted">Harga Jual</h5>
            <p>Rp <strong>${sellPrice}</strong></p>
          </div>
          <div class="col-md-6">
            <h5 class="text-muted">Keuntungan per Produksi</h5>
            <p>Rp <strong>${profitPerProduction}</strong></p>
          </div>
        </div>

        <hr class="my-5">

        <!-- Rekomendasi Produk -->
        <div class="row">
          <div class="col-12">
            <h2 class="mb-3">Rekomendasi Produk</h2>
            <div class="d-flex justify-content-start gap-4">
              <resep-card 
                title="Produk Rekomendasi"
                image="assets/img/resep-rekomendasi.jpg"
                modal="20.000"
                jual="30.000"
                profit="10.000"
              ></resep-card>
            </div>
          </div>
        </div>
      </div>
    `;
  } catch (err) {
    console.error(err);
    return `<div class="alert alert-danger mt-4">Gagal memuat data resep.</div>`;
  }
}

// Helper function to create HTML for a list (ingredients, steps)
function createListHtml(items, formatItem) {
  return items.map(formatItem).join('');
}

// Helper function to format ingredient HTML
function formatIngredient(item) {
  return `<li class="list-group-item">${item.amount} - ${item.name}</li>`;
}

// Helper function to format step HTML
function formatStep(step) {
  return `<li class="list-group-item">${step.description}</li>`;
}

// Helper function to show error message
function showError(message) {
  return `<div class="alert alert-danger mt-4">${message}</div>`;
}
