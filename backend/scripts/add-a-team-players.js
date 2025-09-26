const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env') });

// Import models
const Player = require('../src/models/Player');

// Sample A Team players data
const aTeamPlayers = [
  // Kaleciler
  {
    name: 'Ahmet Yılmaz',
    position: 'Kaleci',
    number: 1,
    birthDate: new Date('1995-03-15'),
    nationality: 'TR',
    height: 188,
    weight: 82,
    image: '/player-placeholder.jpg',
    stats: {
      matches: 25,
      goals: 0,
      assists: 2,
      yellowCards: 3,
      redCards: 0
    },
    isActive: true,
    joinDate: new Date('2022-07-01')
  },
  {
    name: 'Emre Kaya',
    position: 'Kaleci',
    number: 12,
    birthDate: new Date('1997-08-22'),
    nationality: 'TR',
    height: 185,
    weight: 79,
    image: '/player-placeholder.jpg',
    stats: {
      matches: 8,
      goals: 0,
      assists: 0,
      yellowCards: 1,
      redCards: 0
    },
    isActive: true,
    joinDate: new Date('2023-01-15')
  },
  
  // Defans Oyuncuları
  {
    name: 'Mehmet Özkan',
    position: 'Defans',
    number: 2,
    birthDate: new Date('1994-11-08'),
    nationality: 'TR',
    height: 183,
    weight: 78,
    image: '/player-placeholder.jpg',
    stats: {
      matches: 28,
      goals: 3,
      assists: 5,
      yellowCards: 8,
      redCards: 1
    },
    isActive: true,
    joinDate: new Date('2021-08-01')
  },
  {
    name: 'Ali Demir',
    position: 'Defans',
    number: 3,
    birthDate: new Date('1996-05-12'),
    nationality: 'TR',
    height: 180,
    weight: 75,
    image: '/player-placeholder.jpg',
    stats: {
      matches: 22,
      goals: 1,
      assists: 3,
      yellowCards: 5,
      redCards: 0
    },
    isActive: true,
    joinDate: new Date('2022-01-10')
  },
  {
    name: 'Burak Şen',
    position: 'Defans',
    number: 4,
    birthDate: new Date('1993-09-25'),
    nationality: 'TR',
    height: 185,
    weight: 80,
    image: '/player-placeholder.jpg',
    stats: {
      matches: 30,
      goals: 2,
      assists: 4,
      yellowCards: 6,
      redCards: 0
    },
    isActive: true,
    joinDate: new Date('2020-07-15')
  },
  {
    name: 'Oğuz Arslan',
    position: 'Defans',
    number: 5,
    birthDate: new Date('1995-12-03'),
    nationality: 'TR',
    height: 182,
    weight: 77,
    image: '/player-placeholder.jpg',
    stats: {
      matches: 26,
      goals: 4,
      assists: 2,
      yellowCards: 7,
      redCards: 1
    },
    isActive: true,
    joinDate: new Date('2021-12-01')
  },

  // Orta Saha Oyuncuları
  {
    name: 'Kemal Aydın',
    position: 'Orta Saha',
    number: 6,
    birthDate: new Date('1994-07-18'),
    nationality: 'TR',
    height: 178,
    weight: 73,
    image: '/player-placeholder.jpg',
    stats: {
      matches: 29,
      goals: 8,
      assists: 12,
      yellowCards: 4,
      redCards: 0
    },
    isActive: true,
    joinDate: new Date('2021-06-01')
  },
  {
    name: 'Serkan Polat',
    position: 'Orta Saha',
    number: 8,
    birthDate: new Date('1996-02-14'),
    nationality: 'TR',
    height: 175,
    weight: 71,
    image: '/player-placeholder.jpg',
    stats: {
      matches: 27,
      goals: 6,
      assists: 15,
      yellowCards: 3,
      redCards: 0
    },
    isActive: true,
    joinDate: new Date('2022-03-01')
  },
  {
    name: 'Murat Çelik',
    position: 'Orta Saha',
    number: 10,
    birthDate: new Date('1995-10-30'),
    nationality: 'TR',
    height: 177,
    weight: 72,
    image: '/player-placeholder.jpg',
    stats: {
      matches: 31,
      goals: 12,
      assists: 18,
      yellowCards: 2,
      redCards: 0
    },
    isActive: true,
    joinDate: new Date('2020-08-15')
  },
  {
    name: 'Hakan Yurt',
    position: 'Orta Saha',
    number: 14,
    birthDate: new Date('1997-04-07'),
    nationality: 'TR',
    height: 179,
    weight: 74,
    image: '/player-placeholder.jpg',
    stats: {
      matches: 18,
      goals: 4,
      assists: 7,
      yellowCards: 2,
      redCards: 0
    },
    isActive: true,
    joinDate: new Date('2023-02-01')
  },

  // Forvet Oyuncuları
  {
    name: 'Cem Aktaş',
    position: 'Forvet',
    number: 9,
    birthDate: new Date('1994-01-20'),
    nationality: 'TR',
    height: 181,
    weight: 76,
    image: '/player-placeholder.jpg',
    stats: {
      matches: 28,
      goals: 22,
      assists: 8,
      yellowCards: 4,
      redCards: 0
    },
    isActive: true,
    joinDate: new Date('2021-07-01')
  },
  {
    name: 'Deniz Koç',
    position: 'Forvet',
    number: 11,
    birthDate: new Date('1996-06-11'),
    nationality: 'TR',
    height: 179,
    weight: 74,
    image: '/player-placeholder.jpg',
    stats: {
      matches: 25,
      goals: 15,
      assists: 11,
      yellowCards: 3,
      redCards: 0
    },
    isActive: true,
    joinDate: new Date('2022-01-15')
  },
  {
    name: 'Fatih Güler',
    position: 'Forvet',
    number: 7,
    birthDate: new Date('1995-09-05'),
    nationality: 'TR',
    height: 176,
    weight: 72,
    image: '/player-placeholder.jpg',
    stats: {
      matches: 24,
      goals: 11,
      assists: 9,
      yellowCards: 2,
      redCards: 0
    },
    isActive: true,
    joinDate: new Date('2022-08-01')
  }
];

async function addATeamPlayers() {
  try {
    // Connect to MongoDB
    console.log('MongoDB\'ye bağlanılıyor...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB bağlantısı başarılı');

    // Check if players already exist
    const existingCount = await Player.countDocuments();
    console.log(`Mevcut oyuncu sayısı: ${existingCount}`);

    if (existingCount > 0) {
      console.log('Zaten oyuncular mevcut. Yeni oyuncular ekleniyor...');
    }

    // Add A Team players
    console.log('A Takım oyuncuları ekleniyor...');
    const createdPlayers = await Player.insertMany(aTeamPlayers);
    
    console.log(`${createdPlayers.length} A Takım oyuncusu başarıyla eklendi:`);
    
    // Group by position for better display
    const positions = ['Kaleci', 'Defans', 'Orta Saha', 'Forvet'];
    positions.forEach(position => {
      const positionPlayers = createdPlayers.filter(p => p.position === position);
      console.log(`\n${position} (${positionPlayers.length} oyuncu):`);
      positionPlayers.forEach(player => {
        console.log(`  ${player.number}. ${player.name} - ${player.stats.goals} gol, ${player.stats.assists} asist`);
      });
    });

  } catch (error) {
    console.error('Hata oluştu:', error);
  } finally {
    // Close connection
    await mongoose.connection.close();
    console.log('\nMongoDB bağlantısı kapatıldı');
  }
}

// Run the script
addATeamPlayers();