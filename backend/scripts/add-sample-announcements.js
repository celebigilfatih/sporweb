const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env') });

// Import models
const Announcement = require('../src/models/Announcement');

// Sample announcements data
const sampleAnnouncements = [
  {
    title: 'Yeni Sezon Kayıtları Başladı',
    content: 'Sevgili veliler ve sporcular, 2024-2025 sezonuna yönelik kayıtlarımız başlamıştır. A Takım ve Alt Yapı gruplarımız için kayıt yaptırabilirsiniz. Detaylı bilgi için iletişime geçiniz.',
    priority: 'Yüksek',
    startDate: new Date(),
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 gün sonra
    isActive: true,
    targetGroups: []
  },
  {
    title: 'Antrenman Saatleri Güncellendi',
    content: 'Kış sezonuna uygun olarak antrenman saatlerimiz güncellenmiştir. A Takım: Pazartesi, Çarşamba, Cuma 17:00-19:00. Alt Yapı grupları: Salı, Perşembe 16:00-17:30. Cumartesi maç günü olarak planlanmıştır.',
    priority: 'Normal',
    startDate: new Date(),
    endDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 60 gün sonra
    isActive: true,
    targetGroups: []
  },
  {
    title: 'Turnuva Katılımı Hakkında',
    content: 'Okulumuz bu ay düzenlenecek olan Bölgesel Gençlik Turnuvası\'na katılacaktır. Turnuva 15-17 Aralık tarihleri arasında gerçekleşecektir. Katılacak sporcularımızın listesi yakında açıklanacaktır.',
    priority: 'Acil',
    startDate: new Date(),
    endDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 gün sonra
    isActive: true,
    targetGroups: []
  }
];

async function addSampleAnnouncements() {
  try {
    // Connect to MongoDB
    console.log('MongoDB\'ye bağlanılıyor...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB bağlantısı başarılı');

    // Check if announcements already exist
    const existingCount = await Announcement.countDocuments();
    console.log(`Mevcut duyuru sayısı: ${existingCount}`);

    if (existingCount > 0) {
      console.log('Zaten duyurular mevcut. Yeni duyurular ekleniyor...');
    }

    // Add sample announcements
    console.log('Örnek duyurular ekleniyor...');
    const createdAnnouncements = await Announcement.insertMany(sampleAnnouncements);
    
    console.log(`${createdAnnouncements.length} duyuru başarıyla eklendi:`);
    createdAnnouncements.forEach((announcement, index) => {
      console.log(`${index + 1}. ${announcement.title} - Öncelik: ${announcement.priority}`);
    });

  } catch (error) {
    console.error('Hata oluştu:', error);
  } finally {
    // Close connection
    await mongoose.connection.close();
    console.log('MongoDB bağlantısı kapatıldı');
  }
}

// Run the script
addSampleAnnouncements();