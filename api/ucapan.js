import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'data', 'ucapanList.json');

export default function handler(req, res) {
  // Cek metode HTTP
  if (req.method === 'GET') {
    // Membaca data dari file JSON
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        return res.status(500).json({ message: 'Gagal membaca file' });
      }
      res.status(200).json(JSON.parse(data || '[]'));
    });
  } else if (req.method === 'POST') {
    // Menambahkan data baru ke file JSON
    const { nama, isi } = req.body;

    if (!nama || !isi) {
      return res.status(400).json({ message: 'Nama dan ucapan diperlukan' });
    }

    // Membaca data lama
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        return res.status(500).json({ message: 'Gagal membaca file' });
      }

      const ucapanList = JSON.parse(data || '[]');
      ucapanList.push({ nama, isi });

      // Menulis data baru ke file
      fs.writeFile(filePath, JSON.stringify(ucapanList, null, 2), (err) => {
        if (err) {
          return res.status(500).json({ message: 'Gagal menyimpan data' });
        }
        res.status(201).json({ message: 'Ucapan berhasil ditambahkan' });
      });
    });
  } else {
    // Metode tidak diizinkan
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Metode ${req.method} tidak diizinkan`);
  }
}
