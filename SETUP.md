# Setup Instructions - Ujian Sekolah Online

Website ini dibangun menggunakan Fullstack Next.js, MySQL, Prisma, dan Resend.

## Langkah Instalasi

1.  **Clone repository** dan masuk ke direktori project.
2.  **Instalasi dependensi**:
    ```bash
    npm install
    ```
3.  **Konfigurasi Environment Variables**:
    Buat file `.env` di root direktori dan isi dengan:
    ```env
    DATABASE_URL="mysql://username:password@localhost:3306/nama_db"
    RESEND_API_KEY="re_your_api_key"
    ```
4.  **Migrasi Database**:
    ```bash
    npx prisma migrate dev --name init
    ```
5.  **Seed Data (Opsi)**:
    Untuk memasukkan soal sampel ke database:
    ```bash
    npx prisma db seed
    ```
6.  **Jalankan Aplikasi**:
    ```bash
    npm run dev
    ```

## Fitur Ungkulan
- **Anti-Cheat**: Deteksi perpindahan tab dan larangan copy-paste.
- **Timer Otomatis**: Ujian akan dikumpulkan otomatis jika waktu habis.
- **Penilaian Real-time**: Nilai langsung muncul setelah selesai.
- **Notifikasi Email**: Hasil ujian langsung dikirim ke email admin via Resend.
- **Dashboard Admin**: Monitoring seluruh hasil ujian siswa.
