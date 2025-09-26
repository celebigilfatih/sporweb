const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env') });

// Import models
const Group = require('../src/models/Group');

// Sample youth team groups data
const youthTeamGroups = [
  {
    name: 'U19 Takımı',
    type: 'Alt Yapı',
    description: '17-19 yaş arası genç yeteneklerimizin yer aldığı takımımız. Profesyonel futbola hazırlık aşamasındaki oyuncularımız burada eğitim alır.',
    imageUrl: '/u19-team.jpg',
    ageRange: {
      min: 17,
      max: 19
    },
    capacity: 25,
    schedule: [
      {
        day: 'Pazartesi',
        startTime: '16:00',
        endTime: '18:00'
      },
      {
        day: 'Çarşamba',
        startTime: '16:00',
        endTime: '18:00'
      },
      {
        day: 'Cuma',
        startTime: '16:00',
        endTime: '18:00'
      }
    ],
    trainer: {
      name: 'Mehmet Yılmaz',
      qualification: 'UEFA A Lisans'
    },
    players: [
      {
        firstName: 'Eren',
        lastName: 'Yıldız',
        birthDate: '2005-03-15',
        position: 'Kaleci'
      },
      {
        firstName: 'Berk',
        lastName: 'Aslan',
        birthDate: '2005-07-22',
        position: 'Defans'
      },
      {
        firstName: 'Arda',
        lastName: 'Kaya',
        birthDate: '2004-11-08',
        position: 'Defans'
      },
      {
        firstName: 'Emir',
        lastName: 'Özkan',
        birthDate: '2005-01-12',
        position: 'Defans'
      },
      {
        firstName: 'Kaan',
        lastName: 'Demir',
        birthDate: '2004-09-25',
        position: 'Orta Saha'
      },
      {
        firstName: 'Yusuf',
        lastName: 'Şen',
        birthDate: '2005-05-03',
        position: 'Orta Saha'
      },
      {
        firstName: 'Barış',
        lastName: 'Aydın',
        birthDate: '2004-12-18',
        position: 'Orta Saha'
      },
      {
        firstName: 'Alperen',
        lastName: 'Polat',
        birthDate: '2005-02-14',
        position: 'Forvet'
      },
      {
        firstName: 'Kerem',
        lastName: 'Çelik',
        birthDate: '2004-10-30',
        position: 'Forvet'
      }
    ],
    isActive: true
  },
  {
    name: 'U16 Takımı',
    type: 'Alt Yapı',
    description: '14-16 yaş arası gençlerimizin temel futbol eğitimi aldığı takımımız. Teknik ve taktik gelişime odaklanılır.',
    imageUrl: '/u16-team.jpg',
    ageRange: {
      min: 14,
      max: 16
    },
    capacity: 22,
    schedule: [
      {
        day: 'Salı',
        startTime: '16:30',
        endTime: '18:00'
      },
      {
        day: 'Perşembe',
        startTime: '16:30',
        endTime: '18:00'
      },
      {
        day: 'Cumartesi',
        startTime: '10:00',
        endTime: '11:30'
      }
    ],
    trainer: {
      name: 'Ayşe Demir',
      qualification: 'UEFA B Lisans'
    },
    players: [
      {
        firstName: 'Mert',
        lastName: 'Güler',
        birthDate: '2008-04-07',
        position: 'Kaleci'
      },
      {
        firstName: 'Efe',
        lastName: 'Aktaş',
        birthDate: '2007-08-20',
        position: 'Defans'
      },
      {
        firstName: 'Ahmet',
        lastName: 'Koç',
        birthDate: '2008-01-11',
        position: 'Defans'
      },
      {
        firstName: 'Burak',
        lastName: 'Yurt',
        birthDate: '2007-06-15',
        position: 'Defans'
      },
      {
        firstName: 'Oğuz',
        lastName: 'Arslan',
        birthDate: '2008-03-28',
        position: 'Orta Saha'
      },
      {
        firstName: 'Deniz',
        lastName: 'Kara',
        birthDate: '2007-11-12',
        position: 'Orta Saha'
      },
      {
        firstName: 'Emre',
        lastName: 'Beyaz',
        birthDate: '2008-07-05',
        position: 'Orta Saha'
      },
      {
        firstName: 'Furkan',
        lastName: 'Mavi',
        birthDate: '2007-09-18',
        position: 'Forvet'
      },
      {
        firstName: 'Berkay',
        lastName: 'Yeşil',
        birthDate: '2008-02-22',
        position: 'Forvet'
      }
    ],
    isActive: true
  },
  {
    name: 'U13 Takımı',
    type: 'Alt Yapı',
    description: '11-13 yaş arası çocuklarımızın futbola başlangıç yaptığı takımımız. Oyun ve eğlence odaklı eğitim verilir.',
    imageUrl: '/u13-team.jpg',
    ageRange: {
      min: 11,
      max: 13
    },
    capacity: 20,
    schedule: [
      {
        day: 'Salı',
        startTime: '15:00',
        endTime: '16:00'
      },
      {
        day: 'Perşembe',
        startTime: '15:00',
        endTime: '16:00'
      },
      {
        day: 'Cumartesi',
        startTime: '09:00',
        endTime: '10:00'
      }
    ],
    trainer: {
      name: 'Serkan Polat',
      qualification: 'UEFA C Lisans'
    },
    players: [
      {
        firstName: 'Ali',
        lastName: 'Şahin',
        birthDate: '2011-05-10',
        position: 'Kaleci'
      },
      {
        firstName: 'Mehmet',
        lastName: 'Öz',
        birthDate: '2010-12-03',
        position: 'Defans'
      },
      {
        firstName: 'Hasan',
        lastName: 'Kurt',
        birthDate: '2011-08-17',
        position: 'Defans'
      },
      {
        firstName: 'İbrahim',
        lastName: 'Ak',
        birthDate: '2010-04-25',
        position: 'Orta Saha'
      },
      {
        firstName: 'Mustafa',
        lastName: 'Gül',
        birthDate: '2011-01-14',
        position: 'Orta Saha'
      },
      {
        firstName: 'Ömer',
        lastName: 'Tan',
        birthDate: '2010-09-08',
        position: 'Orta Saha'
      },
      {
        firstName: 'Yasin',
        lastName: 'Mor',
        birthDate: '2011-06-21',
        position: 'Forvet'
      },
      {
        firstName: 'Halil',
        lastName: 'Gri',
        birthDate: '2010-11-30',
        position: 'Forvet'
      }
    ],
    isActive: true
  }
];

async function addYouthTeamGroups() {
  try {
    // Connect to MongoDB
    console.log('MongoDB\'ye bağlanılıyor...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB bağlantısı başarılı');

    // Check if groups already exist
    const existingCount = await Group.countDocuments();
    console.log(`Mevcut grup sayısı: ${existingCount}`);

    if (existingCount > 0) {
      console.log('Zaten gruplar mevcut. Yeni gruplar ekleniyor...');
    }

    // Add youth team groups
    console.log('Alt yapı takım grupları ekleniyor...');
    const createdGroups = await Group.insertMany(youthTeamGroups);
    
    console.log(`${createdGroups.length} alt yapı grubu başarıyla eklendi:`);
    
    createdGroups.forEach((group, index) => {
      console.log(`\n${index + 1}. ${group.name}`);
      console.log(`   Yaş Aralığı: ${group.ageRange.min}-${group.ageRange.max}`);
      console.log(`   Kapasite: ${group.capacity}`);
      console.log(`   Antrenör: ${group.trainer.name} (${group.trainer.qualification})`);
      console.log(`   Oyuncu Sayısı: ${group.players.length}`);
      console.log(`   Antrenman Günleri: ${group.schedule.map(s => s.day).join(', ')}`);
    });

    // Show total player count
    const totalPlayers = createdGroups.reduce((sum, group) => sum + group.players.length, 0);
    console.log(`\nToplam alt yapı oyuncusu: ${totalPlayers}`);

  } catch (error) {
    console.error('Hata oluştu:', error);
  } finally {
    // Close connection
    await mongoose.connection.close();
    console.log('\nMongoDB bağlantısı kapatıldı');
  }
}

// Run the script
addYouthTeamGroups();