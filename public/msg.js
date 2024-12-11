// Fungsi untuk render daftar ucapan
function renderUcapan() {
  fetch('/api/ucapan')
    .then((res) => res.json())
    .then((data) => {
      const daftarUcapan = document.getElementById('daftarUcapan');
      daftarUcapan.innerHTML = '';
      data.forEach((ucapan) => {
        const div = document.createElement('div');
        div.classList.add('col-12', 'col-md-6', 'g-5');
        div.innerHTML = `<div class="card bg-white card-left">
            <div class="card-body">
              <h1 class="card-title">${ucapan.nama}</h1>
              <h4 class="card-text">${ucapan.isi}</h4>
 
            </div>
          </div>`;
        daftarUcapan.appendChild(div);
      });
    })
    .catch((err) => console.error('Gagal memuat data:', err));
}

// Event listener untuk form submit
document.getElementById('ucapanForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const nama = document.getElementById('nama').value.trim();
  const isi = document.getElementById('ucapan').value.trim();

  if (nama && isi) {
    fetch('/api/ucapan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nama, isi }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.message);
        renderUcapan();
        e.target.reset();
      })
      .catch((err) => console.error('Gagal mengirim data:', err));
  }
});

// Render ucapan saat halaman dimuat
document.addEventListener('DOMContentLoaded', renderUcapan);
