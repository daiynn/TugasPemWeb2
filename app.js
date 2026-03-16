const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

// mahasiswa
let mahasiswa = [
    { id: 1, nama: "Derian", jurusan: "Informatika" },
    { id: 2, nama: "yanto", jurusan: "Sistem Informasi" },
    { id: 3, nama: "nani", jurusan: "Teknik Komputer" }
];

// get
app.get("/mahasiswa", (req, res) => {
    res.json(mahasiswa);
});

// GET ID
app.get("/mahasiswa/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const data = mahasiswa.find(m => m.id === id);

    if (!data) {
        return res.status(404).json({ message: "Data gada" });
    }

    res.json(data);
});

// POST mahasiswa
app.post("/mahasiswa", (req, res) => {
    const { nama, jurusan } = req.body;

    const dataBaru = {
        id: mahasiswa.length + 1,
        nama,
        jurusan
    };

    mahasiswa.push(dataBaru);

    res.json({
        message: "Data ditambahkan!",
        data: dataBaru
    });
});

// update mahasiswa
app.put("/mahasiswa/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { nama, jurusan } = req.body;

    const data = mahasiswa.find(m => m.id === id);

    if (!data) {
        return res.status(404).json({ message: "Data tidak ditemukan" });
    }

    data.nama = nama;
    data.jurusan = jurusan;

    res.json({
        message: "Data terupdate!",
        data
    });
});

// DELETE mahasiswa
app.delete("/mahasiswa/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const index = mahasiswa.findIndex(m => m.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Data gak ada" });
    }

    mahasiswa.splice(index, 1);

    res.json({
        message: "Data dihapus!"
    });
});

app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});