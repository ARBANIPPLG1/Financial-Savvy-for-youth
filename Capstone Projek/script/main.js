// Menambahkan event listener untuk tombol "Pemasukan"
document.getElementById('btnPemasukan').addEventListener('click', function() {
    addTransaction('pendapatan');
});

// Menambahkan event listener untuk tombol "Pengeluaran"
document.getElementById('btnPengeluaran').addEventListener('click', function() {
    addTransaction('pengeluaran');
});

// Fungsi untuk menambahkan transaksi baru
function addTransaction(type) {
    // Mendapatkan nilai input dari pengguna
    const amount = document.getElementById('bookFormAmount').value;
    const note = document.getElementById('bookFormNote').value;
    const date = document.getElementById('bookFormDate').value;

    // Membuat objek transaksi
    const transaction = {
        amount,
        note,
        date,
        type
    };

    // Menyimpan transaksi dan merender ulang tabel
    saveTransaction(transaction);
    renderTransactions();
    // Mereset form setelah transaksi ditambahkan
    document.getElementById('bookForm').reset();
}

// Fungsi untuk menyimpan transaksi ke localStorage
function saveTransaction(transaction) {
    // Mengambil transaksi yang sudah ada dari localStorage
    let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    // Menambahkan transaksi baru ke array
    transactions.push(transaction);
    // Menyimpan kembali array transaksi ke localStorage
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Fungsi untuk merender transaksi ke dalam tabel
function renderTransactions() {
    // Mengambil transaksi dari localStorage
    const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    // Mendapatkan elemen tbody dari tabel
    const tableBody = document.getElementById('transactionTableBody');
    // Menghapus semua baris yang ada di tabel
    tableBody.innerHTML = '';

     // Menambahkan setiap transaksi ke dalam tabel
    transactions.forEach((transaction, index) => {
        // Membuat sel untuk nomor, catatan, pendapatan, pengeluaran, dan tombol hapus
        const newRow = tableBody.insertRow();
        const cellNumber = newRow.insertCell(0);
        const cellNote = newRow.insertCell(1);
        const cellPendapatan = newRow.insertCell(2);
        const cellPengeluaran = newRow.insertCell(3);
        const cellDelete = newRow.insertCell(4);
        // Membuat tombol hapus
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Hapus';
        deleteButton.className = 'btn btn-danger';
        // Menambahkan event listener untuk tombol hapus
        deleteButton.addEventListener('click', function() {
            deleteTransaction(index);
        });
        cellDelete.appendChild(deleteButton);
        // Mengisi data transaksi ke dalam sel
        cellNumber.textContent = `${transaction.date}`;
        cellNote.textContent = transaction.note;
        if (transaction.type === 'pendapatan') {
            cellPendapatan.textContent = transaction.amount;
            cellPengeluaran.textContent = '';
        } else {
            cellPendapatan.textContent = '';
            cellPengeluaran.textContent = transaction.amount;
        }
    });
}

// Fungsi untuk menghapus transaksi
function deleteTransaction(index) {
    let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    transactions.splice(index, 1);
    localStorage.setItem('transactions', JSON.stringify(transactions));
    renderTransactions();
}

// Memanggil fungsi renderTransactions saat halaman dimuat
document.addEventListener('DOMContentLoaded', renderTransactions);