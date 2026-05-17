import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // Clear existing data
  await prisma.answer.deleteMany()
  await prisma.exam.deleteMany()
  await prisma.question.deleteMany()
  await prisma.subject.deleteMany()

  // Create Subjects
  const kj = await prisma.subject.create({
    data: { id: 1, subject_name: 'Keamanan Jaringan' },
  })

  const pj = await prisma.subject.create({
    data: { id: 2, subject_name: 'Perencanaan Jaringan' },
  })

  // 40 Questions for Keamanan Jaringan
  const questionsKJ = [
    { question: 'Apa tujuan utama dari keamanan jaringan?', option_a: 'Ketersediaan, Integritas, Kerahasiaan', option_b: 'Kecepatan, Kapasitas, Konektivitas', option_c: 'Routing, Switching, Bridging', option_d: 'Efisiensi, Efektivitas, Ekonomi', correct_answer: 'a', subject_id: kj.id },
    { question: 'Jenis serangan yang membanjiri server dengan permintaan palsu adalah...', option_a: 'Phishing', option_b: 'DDoS', option_c: 'Sniffing', option_d: 'Spoofing', correct_answer: 'b', subject_id: kj.id },
    { question: 'Protokol mana yang lebih aman untuk transfer file?', option_a: 'FTP', option_b: 'TFTP', option_c: 'SFTP', option_d: 'HTTP', correct_answer: 'c', subject_id: kj.id },
    { question: 'Apa fungsi dari Firewall?', option_a: 'Mempercepat internet', option_b: 'Menyimpan data user', option_c: 'Menyaring lalu lintas data', option_d: 'Mengatur IP Address', correct_answer: 'c', subject_id: kj.id },
    { question: 'Serangan "Man in the Middle" bekerja dengan cara...', option_a: 'Menghancurkan server', option_b: 'Menyadap komunikasi antar dua pihak', option_c: 'Mencuri password fisik', option_d: 'Mengirim email palsu', correct_answer: 'b', subject_id: kj.id },
    { question: 'Apa itu Phishing?', option_a: 'Serangan fisik ke server', option_b: 'Penipuan untuk mencuri informasi sensitif', option_c: 'Metode enkripsi data', option_d: 'Alat untuk memantau traffic', correct_answer: 'b', subject_id: kj.id },
    { question: 'Enkripsi simetris menggunakan...', option_a: 'Dua kunci berbeda', option_b: 'Satu kunci yang sama', option_c: 'Tanpa kunci', option_d: 'Kunci publik saja', correct_answer: 'b', subject_id: kj.id },
    { question: 'VPN adalah singkatan dari...', option_a: 'Virtual Public Network', option_b: 'Virtual Private Network', option_c: 'Visual Private Network', option_d: 'Visual Public Network', correct_answer: 'b', subject_id: kj.id },
    { question: 'Port default untuk HTTPS adalah...', option_a: '80', option_b: '21', option_c: '443', option_d: '22', correct_answer: 'c', subject_id: kj.id },
    { question: 'Apa itu Malware?', option_a: 'Perangkat keras rusak', option_b: 'Perangkat lunak berbahaya', option_c: 'Teknik routing baru', option_d: 'Sistem operasi server', correct_answer: 'b', subject_id: kj.id },
    { question: 'Fungsi dari IDS (Intrusion Detection System) adalah...', option_a: 'Memblokir virus', option_b: 'Mendeteksi aktivitas mencurigakan', option_c: 'Memperbaiki kabel jaringan', option_d: 'Membuat password otomatis', correct_answer: 'b', subject_id: kj.id },
    { question: 'Apa perbedaan utama antara Virus dan Worm?', option_a: 'Worm butuh inang, Virus tidak', option_b: 'Virus butuh interaksi manusia, Worm bisa mandiri', option_c: 'Worm lebih lambat', option_d: 'Tidak ada perbedaan', correct_answer: 'b', subject_id: kj.id },
    { question: 'WPA2 adalah protokol keamanan untuk...', option_a: 'Ethernet', option_b: 'Wi-Fi', option_c: 'Bluetooth', option_d: 'Fiber Optic', correct_answer: 'b', subject_id: kj.id },
    { question: 'Apa itu Brute Force Attack?', option_a: 'Menebak password secara berulang', option_b: 'Serangan fisik ke gedung', option_c: 'Mematikan listrik server', option_d: 'Mengirim virus lewat USB', correct_answer: 'a', subject_id: kj.id },
    { question: 'SSL/TLS digunakan untuk...', option_a: 'Mengamankan transmisi data di web', option_b: 'Mempercepat download', option_c: 'Mengatur bandwidth', option_d: 'Monitoring suhu server', correct_answer: 'a', subject_id: kj.id },
    { question: 'Apa itu Honeypot dalam keamanan jaringan?', option_a: 'Penyimpanan data cadangan', option_b: 'Sistem jebakan untuk penyerang', option_c: 'Antivirus terbaru', option_d: 'Alat enkripsi hardisk', correct_answer: 'b', subject_id: kj.id },
    { question: 'Digital Signature memberikan jaminan...', option_a: 'Kapasitas data', option_b: 'Otentikasi dan Integritas', option_c: 'Kecepatan akses', option_d: 'Warna tampilan', correct_answer: 'b', subject_id: kj.id },
    { question: 'Serangan SQL Injection menargetkan...', option_a: 'Monitor user', option_b: 'Database aplikasi', option_c: 'Kabel jaringan', option_d: 'Router fisik', correct_answer: 'b', subject_id: kj.id },
    { question: 'Apa itu Ransomware?', option_a: 'Malware yang meminta tebusan', option_b: 'Software gratis', option_c: 'Update otomatis windows', option_d: 'Driver printer', correct_answer: 'a', subject_id: kj.id },
    { question: 'DMZ (Demilitarized Zone) berfungsi untuk...', option_a: 'Mematikan jaringan', option_b: 'Membatasi akses ke server publik', option_c: 'Memperluas sinyal Wi-Fi', option_d: 'Menghapus log sistem', correct_answer: 'b', subject_id: kj.id },
    { question: 'Backdoor adalah...', option_a: 'Pintu belakang fisik gedung', option_b: 'Akses rahasia ke sistem', option_c: 'Tombol reset router', option_d: 'Kabel cadangan', correct_answer: 'b', subject_id: kj.id },
    { question: 'Sniffing adalah aktivitas...', option_a: 'Memperbaiki server', option_b: 'Menyadap paket data di jaringan', option_c: 'Menginstal aplikasi', option_d: 'Menghapus file sampah', correct_answer: 'b', subject_id: kj.id },
    { question: 'Social Engineering adalah serangan yang memanfaatkan...', option_a: 'Kelemahan software', option_b: 'Psikologi manusia', option_c: 'Kelemahan hardware', option_d: 'Kabel yang putus', correct_answer: 'b', subject_id: kj.id },
    { question: 'Antivirus bekerja dengan cara...', option_a: 'Mencari signature virus', option_b: 'Meningkatkan RAM', option_c: 'Menghapus semua file', option_d: 'Mematikan komputer', correct_answer: 'a', subject_id: kj.id },
    { question: 'Apa itu Rootkit?', option_a: 'Alat berkebun', option_b: 'Malware yang menyembunyikan diri di sistem', option_c: 'Software desain grafis', option_d: 'Sistem akuntansi', correct_answer: 'b', subject_id: kj.id },
    { question: 'Tipe Firewall yang bekerja di Layer Aplikasi adalah...', option_a: 'Packet Filter', option_b: 'Proxy Firewall', option_c: 'Circuit Level', option_d: 'Router', correct_answer: 'b', subject_id: kj.id },
    { question: 'Apa itu Zero-day Attack?', option_a: 'Serangan di siang hari', option_b: 'Serangan pada celah yang belum diketahui vendor', option_c: 'Serangan tanpa biaya', option_d: 'Serangan yang gagal', correct_answer: 'b', subject_id: kj.id },
    { question: 'Enkripsi Asimetris menggunakan sepasang kunci, yaitu...', option_a: 'Kunci merah dan biru', option_b: 'Kunci Publik dan Kunci Privat', option_c: 'Kunci Utama dan Cadangan', option_d: 'Kunci Masuk dan Keluar', correct_answer: 'b', subject_id: kj.id },
    { question: 'Apa kepanjangan dari AES?', option_a: 'Advanced Encryption Standard', option_b: 'Advanced Electronic System', option_c: 'Automatic Encryption Software', option_d: 'Active Encryption Security', correct_answer: 'a', subject_id: kj.id },
    { question: 'Prinsip "Least Privilege" berarti...', option_a: 'User diberi akses maksimal', option_b: 'User diberi akses minimal sesuai kebutuhan', option_c: 'Semua user adalah admin', option_d: 'Admin tidak punya akses', correct_answer: 'b', subject_id: kj.id },
    { question: 'Apa itu Botnet?', option_a: 'Jaringan robot mainan', option_b: 'Kumpulan komputer yang terinfeksi dan dikendalikan jarak jauh', option_c: 'Situs web belanja', option_d: 'Layanan email baru', correct_answer: 'b', subject_id: kj.id },
    { question: 'Steganografi adalah teknik...', option_a: 'Menghancurkan data', option_b: 'Menyembunyikan pesan di dalam media lain', option_c: 'Membuat grafik komputer', option_d: 'Mengompres file', correct_answer: 'b', subject_id: kj.id },
    { question: 'Apa itu Trojan Horse?', option_a: 'Virus yang merusak hardware', option_b: 'Software yang terlihat berguna tapi berbahaya', option_c: 'Game balap kuda', option_d: 'Antivirus buatan Yunani', correct_answer: 'b', subject_id: kj.id },
    { question: 'Hashing digunakan untuk menjamin...', option_a: 'Kerahasiaan', option_b: 'Integritas data', option_c: 'Ketersediaan', option_d: 'Kecepatan', correct_answer: 'b', subject_id: kj.id },
    { question: 'Apa fungsi dari Two-Factor Authentication (2FA)?', option_a: 'Membuat password dua kali lipat panjang', option_b: 'Menambah lapisan keamanan saat login', option_c: 'Mempercepat proses masuk', option_d: 'Mengurangi penggunaan memori', correct_answer: 'b', subject_id: kj.id },
    { question: 'Apa itu Spoofing?', option_a: 'Memperbaiki data yang rusak', option_b: 'Memalsukan identitas (IP/MAC) untuk menipu sistem', option_c: 'Menghapus log aktivitas', option_d: 'Mengatur jam server', correct_answer: 'b', subject_id: kj.id },
    { question: 'Keamanan fisik meliputi...', option_a: 'Update windows', option_b: 'Pemasangan CCTV dan gembok ruang server', option_c: 'Instalasi antivirus', option_d: 'Ganti password email', correct_answer: 'b', subject_id: kj.id },
    { question: 'Penetration Testing bertujuan untuk...', option_a: 'Merusak sistem perusahaan', option_b: 'Menemukan celah keamanan sebelum penyerang sungguhan', option_c: 'Menjual hardware baru', option_d: 'Melatih staf administrasi', correct_answer: 'b', subject_id: kj.id },
    { question: 'Apa itu IPsec?', option_a: 'Provider internet baru', option_b: 'Kumpulan protokol untuk mengamankan komunikasi IP', option_c: 'Software pembuat website', option_d: 'Alat monitoring cuaca', correct_answer: 'b', subject_id: kj.id },
    { question: 'Kebijakan keamanan (Security Policy) penting karena...', option_a: 'Membuat server lebih berat', option_b: 'Memberikan panduan aturan dalam menjaga keamanan', option_c: 'Wajib ada menurut hukum rimba', option_d: 'Bisa dijual ke kompetitor', correct_answer: 'b', subject_id: kj.id },
  ]

  // 40 Questions for Perencanaan Jaringan
  const questionsPJ = [
    { question: 'Analisis kebutuhan pengguna dalam perencanaan jaringan bertujuan untuk...', option_a: 'Membeli alat termahal', option_b: 'Menyesuaikan infrastruktur dengan kebutuhan bisnis/user', option_c: 'Menghitung biaya listrik', option_d: 'Mencari alasan untuk lembur', correct_answer: 'b', subject_id: pj.id },
    { question: 'Topologi mana yang paling tahan terhadap kegagalan satu titik kabel?', option_a: 'Bus', option_b: 'Star', option_c: 'Mesh', option_d: 'Ring', correct_answer: 'c', subject_id: pj.id },
    { question: 'Dalam perencanaan, pemilihan Media Transmisi Fiber Optic digunakan jika...', option_a: 'Jarak sangat pendek', option_b: 'Butuh bandwidth besar dan jarak jauh', option_c: 'Budget sangat minim', option_d: 'Hanya untuk jaringan telepon analog', correct_answer: 'b', subject_id: pj.id },
    { question: 'Apa itu Scalability dalam desain jaringan?', option_a: 'Kemampuan jaringan untuk dibersihkan', option_b: 'Kemampuan jaringan untuk berkembang di masa depan', option_c: 'Kecepatan maksimal jaringan', option_d: 'Harga perangkat jaringan', correct_answer: 'b', subject_id: pj.id },
    { question: 'Fungsi utama dari Router dalam desain jaringan adalah...', option_a: 'Menghubungkan komputer dalam satu lab', option_b: 'Menghubungkan dua atau lebih jaringan yang berbeda subjek/segmen', option_c: 'Menyimpan file dokumen', option_d: 'Sebagai terminal listrik', correct_answer: 'b', subject_id: pj.id },
    { question: 'Perencanaan IP Address menggunakan VLSM bertujuan untuk...', option_a: 'Membuang IP yang tidak perlu', option_b: 'Efisiensi penggunaan alamat IP', option_c: 'Mempercepat booting router', option_d: 'Menghindari penggunaan kabel cross', correct_answer: 'b', subject_id: pj.id },
    { question: 'Apa itu Redundancy dalam infrastruktur jaringan?', option_a: 'Penggunaan perangkat bekas', option_b: 'Penyediaan jalur atau perangkat cadangan', option_c: 'Pengurangan jumlah user', option_d: 'Penghapusan fitur keamanan', correct_answer: 'b', subject_id: pj.id },
    { question: 'Jenis kabel UTP yang mendukung kecepatan hingga 10 Gbps adalah...', option_a: 'Cat 3', option_b: 'Cat 5', option_c: 'Cat 6a', option_d: 'Cat 4', correct_answer: 'c', subject_id: pj.id },
    { question: 'Apa kelebihan topologi Star dibanding Bus?', option_a: 'Kabel lebih sedikit', option_b: 'Jika satu kabel client putus, jaringan lain tetap jalan', option_c: 'Tidak butuh hub/switch', option_d: 'Lebih murah harganya', correct_answer: 'b', subject_id: pj.id },
    { question: 'Dalam desain Wireless, Site Survey dilakukan untuk...', option_a: 'Menghitung jumlah meja', option_b: 'Menentukan posisi Access Point terbaik agar sinyal merata', option_c: 'Mencari toko komputer terdekat', option_d: 'Membayar pajak bangunan', correct_answer: 'b', subject_id: pj.id },
    { question: 'Apa itu Latency?', option_a: 'Kapasitas maksimal data', option_b: 'Keterlambatan waktu dalam pengiriman data', option_c: 'Lebar jalur data', option_d: 'Nama protokol baru', correct_answer: 'b', subject_id: pj.id },
    { question: 'Perangkat Layer 3 dalam model OSI adalah...', option_a: 'Switch Unmanaged', option_b: 'Hub', option_c: 'Router', option_d: 'Repeater', correct_answer: 'c', subject_id: pj.id },
    { question: 'QoS (Quality of Service) direncanakan untuk...', option_a: 'Menghapus data sampah', option_b: 'Prioritas lalu lintas data penting (misal: Voice/Video)', option_c: 'Mematikan internet di malam hari', option_d: 'Mengganti nama SSID', correct_answer: 'b', subject_id: pj.id },
    { question: 'Subnet Mask dari 192.168.1.0/24 adalah...', option_a: '255.255.255.0', option_b: '255.255.0.0', option_c: '255.0.0.0', option_d: '255.255.255.252', correct_answer: 'a', subject_id: pj.id },
    { question: 'Apa itu Bandwidth?', option_a: 'Kecepatan cahaya', option_b: 'Kapasitas maksimal jalur komunikasi data', option_c: 'Waktu tunggu pengiriman', option_d: 'Berat perangkat router', correct_answer: 'b', subject_id: pj.id },
    { question: 'Dalam perencanaan WAN, penggunaan VPN bertujuan untuk...', option_a: 'Mendapatkan internet gratis', option_b: 'Menghubungkan cabang melalui internet secara aman', option_c: 'Mengganti alamat fisik rumah', option_d: 'Membatasi jumlah karyawan', correct_answer: 'b', subject_id: pj.id },
    { question: 'Fungsi dari Rack Server (Cabinet) adalah...', option_a: 'Tempat duduk teknisi', option_b: 'Menyusun perangkat jaringan secara rapi dan aman', option_c: 'Menyimpan stok makanan', option_d: 'Alat olahraga', correct_answer: 'b', subject_id: pj.id },
    { question: 'Apa perbedaan Switch dan Hub?', option_a: 'Switch lebih lambat', option_b: 'Switch mengirim data ke port tujuan saja (cerdas)', option_c: 'Hub memiliki fitur keamanan', option_d: 'Tidak ada perbedaan sama sekali', correct_answer: 'b', subject_id: pj.id },
    { question: 'Dalam desain Data Center, Tier 4 berarti...', option_a: 'Paling tidak aman', option_b: 'Standar keandalan tertinggi (99.995%)', option_c: 'Hanya punya satu sumber listrik', option_d: 'Tidak butuh pendingin', correct_answer: 'b', subject_id: pj.id },
    { question: 'Perencanaan VLAN bertujuan untuk...', option_a: 'Memperbanyak kabel', option_b: 'Segmentasi jaringan secara logik', option_c: 'Menggabungkan semua user jadi satu', option_d: 'Mempercepat kinerja printer', correct_answer: 'b', subject_id: pj.id },
    { question: 'Konektor yang digunakan untuk kabel Fiber Optic tipe LC adalah...', option_a: 'Kecil dengan mekanisme pengunci push-pull', option_b: 'Besar seperti bayonet', option_c: 'Sama dengan kabel telepon (RJ11)', option_d: 'Sama dengan kabel LAN (RJ45)', correct_answer: 'a', subject_id: pj.id },
    { question: 'Apa itu Collision Domain?', option_a: 'Area dimana paket data tidak pernah bertabrakan', option_b: 'Area dimana tabrakan paket data bisa terjadi', option_c: 'Server khusus game', option_d: 'Layanan domain web gratis', correct_answer: 'b', subject_id: pj.id },
    { question: 'Dokumentasi jaringan (Network Topology Map) penting untuk...', option_a: 'Hiasan dinding', option_b: 'Mempermudah troubleshooting dan manajemen', option_c: 'Memenuhi syarat lomba gambar', option_d: 'Menambah berat folder', correct_answer: 'b', subject_id: pj.id },
    { question: 'Frekuensi Wi-Fi 5GHz memiliki kelebihan...', option_a: 'Jangkauan lebih luas dibanding 2.4GHz', option_b: 'Interferensi lebih rendah dan kecepatan lebih tinggi', option_c: 'Bisa menembus tembok besi', option_d: 'Harga perangkat lebih murah', correct_answer: 'b', subject_id: pj.id },
    { question: 'PoE (Power over Ethernet) memungkinkan...', option_a: 'Kabel LAN bisa menyetrum user', option_b: 'Listrik dikirim melalui kabel data LAN ke perangkat', option_c: 'Internet dikirim lewat stop kontak', option_d: 'Baterai router tahan lama', correct_answer: 'b', subject_id: pj.id },
    { question: 'Apa itu DHCP?', option_a: 'Protokol untuk chat', option_b: 'Protokol untuk pemberian IP secara otomatis', option_c: 'Layanan hosting web', option_d: 'Sistem pengamanan pintu', correct_answer: 'b', subject_id: pj.id },
    { question: 'Dalam perencanaan, penggunaan Load Balancer bertujuan untuk...', option_a: 'Menambah berat server', option_b: 'Membagi beban traffic ke beberapa server', option_c: 'Menghapus traffic yang tidak perlu', option_d: 'Mengurangi kecepatan akses', correct_answer: 'b', subject_id: pj.id },
    { question: 'Tujuan dari Network Baseline adalah...', option_a: 'Menentukan garis start lari', option_b: 'Mendapatkan data kinerja normal jaringan sebagai pembanding', option_c: 'Membuat jaringan jadi lambat', option_d: 'Menghitung jumlah kabel yang tersisa', correct_answer: 'b', subject_id: pj.id },
    { question: 'Standar Wireless 802.11ax juga dikenal sebagai...', option_a: 'Wi-Fi 4', option_b: 'Wi-Fi 5', option_c: 'Wi-Fi 6', option_d: 'Wi-Fi 7', correct_answer: 'c', subject_id: pj.id },
    { question: 'Apa itu Jitter?', option_a: 'Variasi waktu delay dalam pengiriman paket data', option_b: 'Kekuatan sinyal radio', option_c: 'Jumlah user aktif', option_d: 'Ukuran paket data', correct_answer: 'a', subject_id: pj.id },
    { question: 'Dalam perencanaan keamanan, VPN Tunneling adalah...', option_a: 'Lubang di bawah tanah untuk kabel', option_b: 'Enkapsulasi paket data untuk dikirim secara aman melalui jaringan publik', option_c: 'Pintu masuk rahasia ke ruang server', option_d: 'Pipa air untuk mendinginkan kabel', correct_answer: 'b', subject_id: pj.id },
    { question: 'Apa itu Core Layer dalam model desain Three-Tier?', option_a: 'Tempat user terhubung', option_b: 'Pusat routing tercepat dalam jaringan', option_c: 'Tempat printer diletakkan', option_d: 'Layer paling bawah', correct_answer: 'b', subject_id: pj.id },
    { question: 'Perangkat yang bekerja di Layer 2 dan bisa membagi Collision Domain adalah...', option_a: 'Hub', option_b: 'Switch', option_c: 'Repeater', option_d: 'Modem', correct_answer: 'b', subject_id: pj.id },
    { question: 'Apa itu Throughput?', option_a: 'Bandwidth teoretis', option_b: 'Bandwidth aktual yang terukur pada waktu tertentu', option_c: 'Jarak maksimal kabel', option_d: 'Nama vendor jaringan', correct_answer: 'b', subject_id: pj.id },
    { question: 'Langkah terakhir dalam implementasi jaringan adalah...', option_a: 'Membeli perangkat', option_b: 'Testing dan Verifikasi', option_c: 'Memasang kabel', option_d: 'Membuat proposal', correct_answer: 'b', subject_id: pj.id },
    { question: 'Apa itu Trunking dalam VLAN?', option_a: 'Memotong kabel', option_b: 'Membawa traffic beberapa VLAN melalui satu link fisik', option_c: 'Menghubungkan dua buah monitor', option_d: 'Memberi nama pada router', correct_answer: 'b', subject_id: pj.id },
    { question: 'Fungsi dari UPS di ruang server adalah...', option_a: 'Pendingin ruangan', option_b: 'Penyedia daya cadangan saat listrik mati sementara', option_c: 'Alat komunikasi teknisi', option_d: 'Pengukur kelembaban', correct_answer: 'b', subject_id: pj.id },
    { question: 'IPv6 memiliki panjang alamat sebesar...', option_a: '32 bit', option_b: '64 bit', option_c: '128 bit', option_d: '256 bit', correct_answer: 'c', subject_id: pj.id },
    { question: 'Apa itu Patch Panel?', option_a: 'Panel untuk menambal baju', option_b: 'Tempat terminasi kabel jaringan agar mudah dikelola', option_c: 'Layar monitor admin', option_d: 'Alat pemotong kabel', correct_answer: 'b', subject_id: pj.id },
    { question: 'Cloud Computing dalam perencanaan jaringan berarti...', option_a: 'Menggunakan kabel di atas awan', option_b: 'Penyediaan layanan komputasi melalui internet', option_c: 'Jaringan khusus untuk cuaca', option_d: 'Menghapus semua server lokal', correct_answer: 'b', subject_id: pj.id },
  ]

  for (const q of questionsKJ) {
    await prisma.question.create({ data: q })
  }

  for (const q of questionsPJ) {
    await prisma.question.create({ data: q })
  }

  console.log('Seed completed successfully with 80 questions')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
