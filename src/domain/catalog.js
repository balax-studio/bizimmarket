export const ITEMS = {
  tomato: { id: 'tomato', name: 'Domates', color: 0xff3b30, icon: '🍅', sellPrice: 6 },
  paste: { id: 'paste', name: 'Salça', color: 0xd32f2f, icon: '🥫', sellPrice: 28 },
  corn: { id: 'corn', name: 'Mısır', color: 0xffcc00, icon: '🌽', sellPrice: 12 },
  popcorn: { id: 'popcorn', name: 'Popcorn', color: 0xfff8e1, icon: '🍿', sellPrice: 24 },
  wheat: { id: 'wheat', name: 'Buğday', color: 0xd7ccc8, icon: '🌾', sellPrice: 10 },
  flour: { id: 'flour', name: 'Un Torbası', color: 0xffffff, icon: '🥡', sellPrice: 26 },
  bread: { id: 'bread', name: 'Ekmek', color: 0x8d6e63, icon: '🍞', sellPrice: 55 }
};

export const BUILD_ITEMS = [
  // Reyonlar
  {
    id: 'shelf_tomato',
    name: 'Domates Reyonu',
    category: 'shelves',
    price: 80,
    itemType: 'tomato',
    maxCapacity: 24,
    icon: '🍅',
    desc: 'Tarladan toplanan taze domatesleri sergiler.',
    size: [2.2, 1.4, 1.2],
    color: 0x3a3d44
  },
  {
    id: 'shelf_paste',
    name: 'Salça Reyonu',
    category: 'shelves',
    price: 180,
    itemType: 'paste',
    maxCapacity: 18,
    icon: '🥫',
    desc: 'Konserve salçaları müşterilere sunar.',
    size: [2.2, 1.4, 1.2],
    color: 0x3a3d44
  },
  {
    id: 'shelf_popcorn',
    name: 'Popcorn Standı',
    category: 'shelves',
    price: 280,
    itemType: 'popcorn',
    maxCapacity: 16,
    icon: '🍿',
    desc: 'Sıcak patlamış mısır paketleri reyonu.',
    size: [1.8, 1.5, 1.2],
    color: 0x3a3d44
  },
  {
    id: 'shelf_bread',
    name: 'Fırın Ekmek Tezgahı',
    category: 'shelves',
    price: 420,
    itemType: 'bread',
    maxCapacity: 16,
    icon: '🍞',
    desc: 'Taze pişmiş somun ekmekleri sergiler.',
    size: [2.2, 1.4, 1.2],
    color: 0x3a3d44
  },

  // Üretim Makineleri
  {
    id: 'machine_paste',
    name: 'Salça Buhar Kazanı',
    category: 'machines',
    price: 250,
    input: 'tomato',
    inputCount: 2,
    output: 'paste',
    duration: 3.5,
    icon: '⚙️',
    desc: '2 Domates → 1 Konserve Salça üretir.',
    size: [2.2, 1.8, 2.2],
    color: 0xff5500
  },
  {
    id: 'machine_popcorn',
    name: 'Popcorn Makinesi',
    category: 'machines',
    price: 400,
    input: 'corn',
    inputCount: 1,
    output: 'popcorn',
    duration: 2.5,
    icon: '🍿',
    desc: '1 Mısır → 1 Sıcak Popcorn üretir.',
    size: [1.8, 1.6, 1.8],
    color: 0xffaa00
  },
  {
    id: 'machine_mill',
    name: 'Un Değirmeni',
    category: 'machines',
    price: 650,
    input: 'wheat',
    inputCount: 2,
    output: 'flour',
    duration: 4.0,
    icon: '🌾',
    desc: '2 Buğday → 1 Un Torbası öğütür.',
    size: [2.2, 2.0, 2.2],
    color: 0x8892a0
  },
  {
    id: 'machine_oven',
    name: 'Taş Fırın Ünitesi',
    category: 'machines',
    price: 900,
    input: 'flour',
    inputCount: 1,
    output: 'bread',
    duration: 4.5,
    icon: '🔥',
    desc: '1 Un → 1 Somun Ekmek pişirir.',
    size: [2.4, 2.2, 2.4],
    color: 0xd84315
  },

  // Kasa & Lojistik
  {
    id: 'checkout_counter',
    name: 'Otomatik Kasa Masası',
    category: 'logistics',
    price: 220,
    icon: '💳',
    desc: 'Müşterilerin ödeme yapıp nakit bıraktığı tezgâh.',
    size: [2.6, 1.1, 1.4],
    color: 0x00d4ff
  },

  // Personel
  {
    id: 'staff_cashier',
    name: 'Kasiyer Personeli',
    category: 'staff',
    price: 350,
    role: 'cashier',
    speed: 1.0,
    icon: '👷',
    desc: 'Kasada durup ödemeleri otomatik tahsil eder.',
    size: [1, 1, 1]
  },
  {
    id: 'staff_stocker',
    name: 'Reyon İkmal Görevlisi',
    category: 'staff',
    price: 500,
    role: 'stocker',
    speed: 1.2,
    icon: '🏃',
    desc: 'Tarladan ve tezgâhlardan reyonlara mal taşır.',
    size: [1, 1, 1]
  },

  // Arsa Parselleri
  {
    id: 'parcel_a1',
    name: 'Doğu Kanadı Parseli',
    category: 'parcels',
    price: 350,
    icon: '🏗️',
    desc: 'Doğu duvarını yıkar, marketi genişletir.',
    targetParcel: 'A1'
  },
  {
    id: 'parcel_b1',
    name: 'Kuzey Tarım Serası',
    category: 'parcels',
    price: 1200,
    icon: '🌱',
    desc: 'Kuzey duvarını yıkar, mısır ve buğday arazisini bağlar.',
    targetParcel: 'B1'
  }
];
