PRD (Product Requirements Document)
Website Ujian Sekolah Online
1. Informasi Produk
Nama Produk
Sistem Ujian Sekolah Berbasis Web
Tujuan Produk
Membangun platform ujian online sederhana namun scalable yang memungkinkan siswa:
Memasukkan identitas
Memilih mata pelajaran
Mengikuti ujian online
Mendapatkan hasil otomatis setelah submit
Mengirim hasil ujian langsung ke email admin
Target Pengguna
Siswa sekolah
Guru/admin sekolah
2. Masalah yang Diselesaikan
Masalah utama:
Pemeriksaan ujian manual memakan waktu
Rekap nilai tidak terpusat
Risiko kehilangan data ujian
Sulit melakukan ujian online sederhana tanpa LMS kompleks
Solusi:
Sistem auto-correction
Nilai langsung muncul
Hasil otomatis dikirim ke email admin
Data tersimpan di database
3. Objective Produk
Objective Utama
Menyediakan sistem ujian online ringan, cepat, dan mudah digunakan.
KPI
95% siswa berhasil submit ujian tanpa error
Waktu koreksi ujian < 2 detik
Email hasil terkirim < 1 menit
Website mampu menangani minimal 300 siswa bersamaan
4. Fitur Utama
4.1 Halaman Login Siswa (Tanpa Password)
Siswa hanya:
Menginput nama lengkap
Memilih mata pelajaran
Field:
Nama Lengkap
Kelas (opsional)
Pilihan Mata Pelajaran
Validasi:
Nama tidak boleh kosong
Mapel wajib dipilih
4.2 Halaman Ujian
Komponen:
Timer ujian
Soal pilihan ganda
Navigasi soal
Progress pengerjaan
Tombol submit
Fitur:
Auto save jawaban
Randomisasi soal
Anti refresh warning
Timer otomatis submit saat habis
4.3 Sistem Penilaian Otomatis
Mekanisme:
Jawaban dibandingkan dengan answer key
Nilai dihitung otomatis
Formula:
Nilai= 
Jumlah Soal
Jawaban Benar
​	
 ×100
4.4 Halaman Hasil Ujian
Menampilkan:
Nama siswa
Mata pelajaran
Jumlah benar
Jumlah salah
Nilai akhir
Status lulus/tidak
Kriteria:
≥ 75 = Lulus
< 75 = Tidak Lulus
4.5 Email Notification
Setelah submit:
Sistem mengirim hasil ujian ke:
muhadam122608@gmail.com
Isi email:
Nama siswa
Mata pelajaran
Nilai
Jumlah benar/salah
Waktu pengerjaan
Tanggal ujian
5. Role User
5.1 Siswa
Hak akses:
Mengikuti ujian
Melihat hasil
Tidak bisa:
Mengakses admin panel
Mengedit soal
5.2 Admin
Hak akses:
CRUD soal
CRUD mapel
Melihat hasil ujian
Export PDF/Excel
Monitoring peserta
6. Workflow Sistem
Workflow Utama
Siswa membuka website
        ↓
Input nama lengkap
        ↓
Pilih mata pelajaran
        ↓
Klik mulai ujian
        ↓
Timer berjalan
        ↓
Siswa mengerjakan soal
        ↓
Submit ujian
        ↓
Sistem menghitung nilai otomatis
        ↓
Hasil tampil ke siswa
        ↓
Hasil dikirim ke email admin
        ↓
Data tersimpan ke database
7. Workflow Detail Backend
7.1 Saat Siswa Submit
Frontend kirim jawaban
        ↓
API menerima jawaban
        ↓
Backend validasi data
        ↓
Ambil kunci jawaban
        ↓
Hitung skor
        ↓
Simpan hasil ke database
        ↓
Generate hasil ujian
        ↓
Kirim email ke admin
        ↓
Return response ke frontend
8. Struktur Database
Table: students
Field	Type
id	bigint
full_name	varchar
class_name	varchar
created_at	timestamp
Table: subjects
Field	Type
id	bigint
subject_name	varchar
Table: questions
Field	Type
id	bigint
subject_id	bigint
question	text
option_a	text
option_b	text
option_c	text
option_d	text
correct_answer	varchar
Table: exams
Field	Type
id	bigint
student_id	bigint
subject_id	bigint
score	integer
total_correct	integer
total_wrong	integer
duration	integer
created_at	timestamp
Table: answers
Field	Type
id	bigint
exam_id	bigint
question_id	bigint
student_answer	varchar
9. Tech Stack Recommendation
Frontend
Next.js
TailwindCSS
Shadcn UI
Backend
Express.js
Node.js
Database
MySQL
Authentication
Session sederhana / JWT
Email Service
Pilihan terbaik:
Nodemailer + Gmail SMTP
atau
Resend API
10. API Endpoint
Authentication
POST /start-exam
Questions
GET /questions/:subjectId
Submit Exam
POST /submit-exam
Admin
POST /admin/questions
PUT /admin/questions/:id
DELETE /admin/questions/:id
11. UI Pages
Siswa
Landing Page
Form Identitas
Halaman Ujian
Halaman Hasil
Admin
Dashboard
Manajemen Soal
Manajemen Mapel
Monitoring Hasil
Export Data
12. Validasi & Security
Security Minimal Wajib
Rate limiting
Input sanitization
Helmet middleware
CORS protection
Server-side validation
Anti-Cheat
Disable copy paste
Warning saat pindah tab
Random urutan soal
Timer server-side
13. Arsitektur Sistem
Frontend (Next.js)
        ↓
REST API (Express.js)
        ↓
MySQL Database
        ↓
Email Service (SMTP)
14. Workflow Pengiriman Email
Siswa submit ujian
        ↓
Backend generate hasil
        ↓
Backend membuat template email
        ↓
SMTP login
        ↓
Email terkirim ke admin
        ↓
Status email disimpan
15. Struktur Email Hasil Ujian
Subject Email
Hasil Ujian Siswa - [Nama Siswa]
Body Email
Nama: Ahmad
Mapel: Matematika
Nilai: 85
Benar: 17
Salah: 3
Durasi: 25 menit
Tanggal: 17 Mei 2026
16. Roadmap Pengembangan
Phase 1
Setup backend
Setup database
CRUD soal
Form siswa
Phase 2
Sistem ujian
Timer
Penilaian otomatis
Phase 3
Email notification
Dashboard admin
Export data
Phase 4
Anti cheat
Analytics
Mobile responsive optimization
17. Risiko Teknis
Risiko
Spam submit
Email gagal terkirim
Server overload saat ujian massal
Siswa refresh browser
Solusi
Redis queue
Auto save
Session persistence
Load balancing jika skala besar
18. Rekomendasi Arsitektur Nyata
Kalau ini hanya dipakai sekolah kecil-menengah:
VPS 2 Core
RAM 4GB
MySQL single instance
Express + PM2
Nginx reverse proxy
Kalau dipakai serius skala besar:
Dockerized services
Redis queue
CDN
PostgreSQL replication
Separate mail service
19. Kesalahan yang Harus Dihindari
Banyak sistem ujian sekolah gagal bukan karena coding, tapi karena desain bodoh:
Tidak ada auto save
Timer hanya frontend
Semua soal dikirim sekaligus
Tidak ada backup submit
Tidak ada queue email
Tidak ada logging
Kalau kamu bangun ini asal jalan tanpa arsitektur yang benar, website akan hancur saat dipakai ramai-ramai ujian. Sistem ujian itu bukan sekadar CRUD biasa. Beban concurrent access tinggi dan sensitif terhadap kehilangan data.