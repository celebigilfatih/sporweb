const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env') });

// Import models
const News = require('../src/models/News');

// Sample news data
const sampleNews = [
  {
    title: 'Futbol Okulumuz Bölge Şampiyonu Oldu',
    content: 'Geçtiğimiz hafta sonu düzenlenen Bölgesel Gençlik Futbol Turnuvası\'nda A Takımımız büyük bir başarıya imza attı. Final maçında rakibini 3-1 yenerek şampiyonluğa ulaşan takımımız, tüm sezon boyunca gösterdiği kararlı performansın meyvelerini topladı. Teknik direktörümüz ve oyuncularımızı tebrik ederiz.',
    image: '',
    category: 'Başarı',
    author: 'Futbol Okulu Yönetimi',
    isPublished: true,
    publishDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 gün önce
    tags: ['şampiyonluk', 'turnuva', 'başarı', 'A takım']
  },
  {
    title: 'Yeni Antrenör Kadromuz Belirlendi',
    content: 'Yeni sezon hazırlıkları kapsamında teknik kadromuz güçlendirildi. UEFA A Lisanslı antrenör Mehmet Yılmaz A Takım sorumlusu, UEFA B Lisanslı Ayşe Demir ise Alt Yapı koordinatörü olarak görevine başladı. Deneyimli kadromuzla daha başarılı bir sezon hedefliyoruz.',
    image: '',
    category: 'Genel',
    author: 'Spor Muhabiri',
    isPublished: true,
    publishDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 gün önce
    tags: ['antrenör', 'kadro', 'yeni sezon', 'teknik direktör']
  },
  {
    title: 'Kış Kampı Programı Açıklandı',
    content: 'Ocak ayında düzenlenecek kış kampımızın programı belli oldu. 15-22 Ocak tarihleri arasında Antalya\'da gerçekleşecek kampta, kondisyon çalışmaları, taktik antrenmanlar ve hazırlık maçları yapılacak. Kamp süresince sporcularımızın gelişimi yakından takip edilecek.',
    image: '',
    category: 'Eğitim',
    author: 'Kamp Koordinatörü',
    isPublished: true,
    publishDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 gün önce
    tags: ['kış kampı', 'antalya', 'hazırlık', 'kondisyon']
  }
];

async function addSampleNews() {
  try {
    // Connect to MongoDB
    console.log('MongoDB\'ye bağlanılıyor...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB bağlantısı başarılı');

    // Check if news already exist
    const existingCount = await News.countDocuments();
    console.log(`Mevcut haber sayısı: ${existingCount}`);

    if (existingCount > 0) {
      console.log('Zaten haberler mevcut. Yeni haberler ekleniyor...');
    }

    // Add sample news
    console.log('Örnek haberler ekleniyor...');
    const createdNews = await News.insertMany(sampleNews);
    
    console.log(`${createdNews.length} haber başarıyla eklendi:`);
    createdNews.forEach((news, index) => {
      console.log(`${index + 1}. ${news.title} - Kategori: ${news.category}`);
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
addSampleNews();