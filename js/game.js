// Main Game Architecture for My Mini Mart
// ponytail: clean vanilla Three.js architecture with zero build dependencies.

// Sharp Neo-Brutalist SVG Icons (No standard emojis)
const BRUTAL_ICONS = {
  TOMATO: `<svg class="brutal-icon" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="8" width="20" height="17" fill="#FF5252" stroke="#000000" stroke-width="2.5"/><rect x="12" y="3" width="4" height="5" fill="#25D366" stroke="#000000" stroke-width="2"/><rect x="7" y="6" width="5" height="2.5" fill="#25D366" stroke="#000000" stroke-width="1.5"/><rect x="16" y="6" width="5" height="2.5" fill="#25D366" stroke="#000000" stroke-width="1.5"/></svg>`,
  CHICKEN: `<svg class="brutal-icon" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="7" width="18" height="17" fill="#FFFDF5" stroke="#000000" stroke-width="2.5"/><rect x="10" y="2" width="7" height="5" fill="#FF5252" stroke="#000000" stroke-width="2"/><rect x="18" y="12" width="7" height="5" fill="#FFE600" stroke="#000000" stroke-width="2"/><rect x="15" y="17" width="4" height="4" fill="#FF5252" stroke="#000000" stroke-width="1.5"/><rect x="12" y="11" width="3.5" height="3.5" fill="#000000"/></svg>`,
  EGG: `<svg class="brutal-icon" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="5" width="16" height="19" fill="#FFFDF5" stroke="#000000" stroke-width="2.5"/><rect x="9" y="2" width="10" height="3" fill="#FFFDF5" stroke="#000000" stroke-width="2"/><rect x="8" y="9" width="4" height="4" fill="#FFE600"/></svg>`,
  WHEAT: `<svg class="brutal-icon" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="13" y="14" width="3" height="12" fill="#D35400" stroke="#000000" stroke-width="2"/><rect x="8" y="10" width="6" height="5" fill="#FFE600" stroke="#000000" stroke-width="2"/><rect x="15" y="10" width="6" height="5" fill="#FFE600" stroke="#000000" stroke-width="2"/><rect x="7" y="5" width="6" height="5" fill="#F1C40F" stroke="#000000" stroke-width="2"/><rect x="16" y="5" width="6" height="5" fill="#F1C40F" stroke="#000000" stroke-width="2"/><rect x="11.5" y="1" width="6" height="6" fill="#FFE600" stroke="#000000" stroke-width="2"/></svg>`,
  FLOUR: `<svg class="brutal-icon" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="8" width="18" height="16" fill="#FFFDF5" stroke="#000000" stroke-width="2.5"/><rect x="9" y="3" width="10" height="5" fill="#DCDDE1" stroke="#000000" stroke-width="2"/><rect x="11" y="6" width="6" height="2.5" fill="#D35400"/><rect x="9" y="13" width="10" height="6" fill="#FFE600" stroke="#000000" stroke-width="1.5"/></svg>`,
  BREAD: `<svg class="brutal-icon" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="9" width="22" height="13" fill="#D35400" stroke="#000000" stroke-width="2.5"/><rect x="5" y="5" width="18" height="5" fill="#E67E22" stroke="#000000" stroke-width="2"/><rect x="7" y="12" width="3" height="6" fill="#FFFDF5"/><rect x="12.5" y="12" width="3" height="6" fill="#FFFDF5"/><rect x="18" y="12" width="3" height="6" fill="#FFFDF5"/></svg>`,
  COW: `<svg class="brutal-icon" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="6" width="20" height="18" fill="#FFFDF5" stroke="#000000" stroke-width="2.5"/><rect x="3" y="3" width="4" height="4" fill="#636E72" stroke="#000000" stroke-width="2"/><rect x="21" y="3" width="4" height="4" fill="#636E72" stroke="#000000" stroke-width="2"/><rect x="6" y="8" width="5" height="5" fill="#2D3436"/><rect x="16" y="13" width="6" height="5" fill="#2D3436"/><rect x="7" y="17" width="14" height="6" fill="#FF7675" stroke="#000000" stroke-width="1.5"/><rect x="9" y="19" width="2.5" height="2" fill="#000000"/><rect x="16.5" y="19" width="2.5" height="2" fill="#000000"/></svg>`,
  MILK: `<svg class="brutal-icon" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="2" width="8" height="4" fill="#FF5252" stroke="#000000" stroke-width="2"/><rect x="6" y="6" width="16" height="19" fill="#FFFDF5" stroke="#000000" stroke-width="2.5"/><rect x="8" y="12" width="12" height="7" fill="#74B9FF" stroke="#000000" stroke-width="1.5"/><rect x="12" y="14" width="4" height="3" fill="#FFFDF5"/></svg>`,
  CHEESE: `<svg class="brutal-icon" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><polygon points="3,21 25,21 21,7 5,13" fill="#FDCB6E" stroke="#000000" stroke-width="2.5" stroke-linejoin="miter"/><rect x="8" y="16" width="3" height="3" fill="#E17055"/><rect x="15" y="14" width="4" height="4" fill="#E17055"/><rect x="11" y="11" width="2" height="2" fill="#E17055"/></svg>`,
  CORN: `<svg class="brutal-icon" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="4" width="8" height="15" fill="#FFE600" stroke="#000000" stroke-width="2.5"/><rect x="7" y="11" width="4" height="11" fill="#2ECC71" stroke="#000000" stroke-width="2"/><rect x="17" y="11" width="4" height="11" fill="#2ECC71" stroke="#000000" stroke-width="2"/><rect x="12.5" y="19" width="3" height="6" fill="#D35400" stroke="#000000" stroke-width="1.5"/><rect x="12" y="7" width="4" height="3" fill="#FFFDF5"/><rect x="12" y="12" width="4" height="3" fill="#FFFDF5"/></svg>`,
  POPCORN: `<svg class="brutal-icon" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><polygon points="6,12 22,12 19,26 9,26" fill="#E74C3C" stroke="#000000" stroke-width="2.5" stroke-linejoin="miter"/><rect x="11" y="12" width="6" height="14" fill="#FFFDF5"/><rect x="7" y="5" width="6" height="7" fill="#FFEAA7" stroke="#000000" stroke-width="2"/><rect x="15" y="5" width="6" height="7" fill="#FFEAA7" stroke="#000000" stroke-width="2"/><rect x="10" y="2" width="8" height="6" fill="#FFE600" stroke="#000000" stroke-width="2"/></svg>`,
  APPLE: `<svg class="brutal-icon" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="7" width="18" height="17" fill="#E74C3C" stroke="#000000" stroke-width="2.5"/><rect x="13" y="2" width="2.5" height="5" fill="#795548" stroke="#000000" stroke-width="1.5"/><rect x="15.5" y="3" width="5" height="3.5" fill="#2ECC71" stroke="#000000" stroke-width="1.5"/><rect x="8" y="10" width="3.5" height="4" fill="#FFFDF5"/></svg>`,
  APPLE_JUICE: `<svg class="brutal-icon" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="2" width="8" height="4" fill="#E74C3C" stroke="#000000" stroke-width="2"/><rect x="7" y="6" width="14" height="19" fill="#FFFDF5" stroke="#000000" stroke-width="2.5"/><rect x="9" y="11" width="10" height="12" fill="#F39C12" stroke="#000000" stroke-width="1.5"/><rect x="11" y="13" width="3" height="4" fill="#FFEAA7"/></svg>`,
  APPLE_PIE: `<svg class="brutal-icon" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><polygon points="3,19 25,19 22,25 6,25" fill="#BDC3C7" stroke="#000000" stroke-width="2" stroke-linejoin="miter"/><rect x="4" y="11" width="20" height="8" fill="#E67E22" stroke="#000000" stroke-width="2.5"/><polygon points="4,11 14,4 24,11" fill="#F39C12" stroke="#000000" stroke-width="2" stroke-linejoin="miter"/><rect x="12" y="8" width="4" height="4" fill="#E74C3C" stroke="#000000" stroke-width="1.5"/></svg>`,
  STRAWBERRY: `<svg class="brutal-icon" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><polygon points="5,8 23,8 14,26" fill="#FF2A7A" stroke="#000000" stroke-width="2.5" stroke-linejoin="miter"/><rect x="11" y="3" width="6" height="5" fill="#2ECC71" stroke="#000000" stroke-width="1.5"/><rect x="9" y="11" width="2" height="2" fill="#FFE600"/><rect x="17" y="11" width="2" height="2" fill="#FFE600"/><rect x="13" y="16" width="2" height="2" fill="#FFE600"/></svg>`,
  CARROT: `<svg class="brutal-icon" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><polygon points="7,8 21,8 14,26" fill="#FF793F" stroke="#000000" stroke-width="2.5" stroke-linejoin="miter"/><rect x="12" y="2" width="4" height="6" fill="#25D366" stroke="#000000" stroke-width="1.5"/><rect x="9" y="12" width="10" height="2" fill="#D35400"/><rect x="11" y="18" width="6" height="2" fill="#D35400"/></svg>`,
  STRAWBERRY_JAM: `<svg class="brutal-icon" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="8" width="16" height="17" fill="#FF2A7A" stroke="#000000" stroke-width="2.5"/><rect x="9" y="3" width="10" height="5" fill="#FFE600" stroke="#000000" stroke-width="2"/><rect x="9" y="13" width="10" height="7" fill="#FFFDF5" stroke="#000000" stroke-width="1.5"/><rect x="12" y="15" width="4" height="3" fill="#FF2A7A"/></svg>`,
  JAM: `<svg class="brutal-icon" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="8" width="16" height="17" fill="#FF2A7A" stroke="#000000" stroke-width="2.5"/><rect x="9" y="3" width="10" height="5" fill="#FFE600" stroke="#000000" stroke-width="2"/><rect x="9" y="13" width="10" height="7" fill="#FFFDF5" stroke="#000000" stroke-width="1.5"/><rect x="12" y="15" width="4" height="3" fill="#FF2A7A"/></svg>`,
  PIZZA: `<svg class="brutal-icon" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><polygon points="4,24 24,24 14,4" fill="#FDCB6E" stroke="#000000" stroke-width="2.5" stroke-linejoin="miter"/><rect x="4" y="21" width="20" height="4" fill="#D35400" stroke="#000000" stroke-width="1.5"/><rect x="11" y="11" width="4" height="4" fill="#FF5252" stroke="#000000" stroke-width="1"/><rect x="8" y="17" width="3" height="3" fill="#2ECC71"/><rect x="16" y="16" width="3.5" height="3.5" fill="#FF5252"/></svg>`,
  ICE_CREAM: `<svg class="brutal-icon" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><polygon points="7,13 21,13 14,26" fill="#D35400" stroke="#000000" stroke-width="2.5" stroke-linejoin="miter"/><rect x="6" y="5" width="16" height="8" fill="#FF2A7A" stroke="#000000" stroke-width="2"/><rect x="9" y="2" width="10" height="4" fill="#00CEC9" stroke="#000000" stroke-width="1.5"/></svg>`,
  SALAD_BOWL: `<svg class="brutal-icon" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><polygon points="3,12 25,12 21,25 7,25" fill="#FFFDF5" stroke="#000000" stroke-width="2.5" stroke-linejoin="miter"/><rect x="6" y="6" width="16" height="6" fill="#2ECC71" stroke="#000000" stroke-width="2"/><rect x="9" y="4" width="4" height="3" fill="#FF5252"/><rect x="15" y="4" width="4" height="3" fill="#FF793F"/></svg>`,
  SALAD: `<svg class="brutal-icon" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><polygon points="3,12 25,12 21,25 7,25" fill="#FFFDF5" stroke="#000000" stroke-width="2.5" stroke-linejoin="miter"/><rect x="6" y="6" width="16" height="6" fill="#2ECC71" stroke="#000000" stroke-width="2"/><rect x="9" y="4" width="4" height="3" fill="#FF5252"/><rect x="15" y="4" width="4" height="3" fill="#FF793F"/></svg>`,
  DELIVERY: `<svg class="brutal-icon" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="6" width="20" height="17" fill="#E67E22" stroke="#000000" stroke-width="2.5"/><rect x="4" y="11" width="20" height="3" fill="#FFE600"/><line x1="14" y1="6" x2="14" y2="23" stroke="#000000" stroke-width="2"/></svg>`,
  VIP: `<svg class="brutal-icon" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><polygon points="4,22 24,22 22,8 17,14 14,5 11,14 6,8" fill="#FFE600" stroke="#000000" stroke-width="2.5" stroke-linejoin="miter"/><rect x="12.5" y="16" width="3" height="3" fill="#FF5252"/></svg>`,
  THIEF: `<svg class="brutal-icon" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="5" width="18" height="18" fill="#2D3436" stroke="#000000" stroke-width="2.5"/><rect x="4" y="11" width="20" height="5" fill="#111111" stroke="#000000" stroke-width="1.5"/><rect x="8" y="12.5" width="4" height="2" fill="#FFE600"/><rect x="16" y="12.5" width="4" height="2" fill="#FFE600"/></svg>`,
  UPGRADE: `<svg class="brutal-icon" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="5" width="20" height="18" fill="#00CEC9" stroke="#000000" stroke-width="2.5"/><rect x="8" y="9" width="12" height="7" fill="#2D3436" stroke="#000000" stroke-width="1.5"/><polygon points="9,18 19,18 14,12" fill="#FFE600" stroke="#000000" stroke-width="1.5"/></svg>`,
  SPEED: `<svg class="brutal-icon" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><polygon points="16,2 6,15 13,15 11,26 22,12 15,12" fill="#FFE600" stroke="#000000" stroke-width="2.5" stroke-linejoin="miter"/></svg>`,
  CAPACITY: `<svg class="brutal-icon" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="9" y="3" width="10" height="4" fill="#D35400" stroke="#000000" stroke-width="2"/><rect x="5" y="7" width="18" height="18" fill="#E67E22" stroke="#000000" stroke-width="2.5"/><rect x="5" y="13" width="18" height="4" fill="#FFE600" stroke="#000000" stroke-width="1.5"/></svg>`,
  CASH: `<svg class="brutal-icon" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="6" width="22" height="16" fill="#25D366" stroke="#000000" stroke-width="2.5"/><rect x="11" y="10" width="6" height="8" fill="#FFE600" stroke="#000000" stroke-width="2"/><rect x="6" y="9" width="2.5" height="10" fill="#FFFDF5"/><rect x="19.5" y="9" width="2.5" height="10" fill="#FFFDF5"/></svg>`,
  CASHIER: `<svg class="brutal-icon" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="8" y="3" width="12" height="10" fill="#FFEEDB" stroke="#000000" stroke-width="2"/><rect x="4" y="13" width="20" height="12" fill="#A29BFE" stroke="#000000" stroke-width="2.5"/><rect x="10" y="6" width="2.5" height="3.5" fill="#000000"/><rect x="15.5" y="6" width="2.5" height="3.5" fill="#000000"/><rect x="10" y="17" width="8" height="3" fill="#FFE600" stroke="#000000" stroke-width="1.5"/></svg>`,
  STAR: `<svg class="brutal-icon" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><polygon points="14,2 17.5,10 26,10 19,16 22,25 14,19.5 6,25 9,16 2,10 10.5,10" fill="#FFE600" stroke="#000000" stroke-width="2.5" stroke-linejoin="miter"/></svg>`,
  SOUND_ON: `<svg class="brutal-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><polygon points="3,8 8,8 14,3 14,21 8,16 3,16" fill="#FFE600" stroke="#000000" stroke-width="2.5" stroke-linejoin="miter"/><path d="M18 7C19.5 8.5 20.5 10.5 20.5 12C20.5 13.5 19.5 15.5 18 17" stroke="#000000" stroke-width="2.5" stroke-linecap="square"/></svg>`,
  SOUND_OFF: `<svg class="brutal-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><polygon points="3,8 8,8 14,3 14,21 8,16 3,16" fill="#A29BFE" stroke="#000000" stroke-width="2.5" stroke-linejoin="miter"/><line x1="17" y1="7" x2="23" y2="17" stroke="#FF5252" stroke-width="3" stroke-linecap="square"/><line x1="23" y1="7" x2="17" y2="17" stroke="#FF5252" stroke-width="3" stroke-linecap="square"/></svg>`,
  CHECK: `<svg class="brutal-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><polygon points="3,12 9,18 21,5 18,3 9,13 6,9" fill="#25D366" stroke="#000000" stroke-width="2.5"/></svg>`,
  ALERT: `<svg class="brutal-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><polygon points="12,2 23,21 1,21" fill="#FF5252" stroke="#000000" stroke-width="2.5"/><rect x="11" y="8" width="2.5" height="6" fill="#000000"/><rect x="11" y="16" width="2.5" height="2.5" fill="#000000"/></svg>`,
  PACKAGE: `<svg class="brutal-icon" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="6" width="20" height="17" fill="#E67E22" stroke="#000000" stroke-width="2.5"/><rect x="4" y="11" width="20" height="3" fill="#FFE600"/><line x1="14" y1="6" x2="14" y2="23" stroke="#000000" stroke-width="2"/></svg>`,
  FACTORY: `<svg class="brutal-icon" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><polygon points="4,24 24,24 24,10 18,15 18,10 12,15 12,10 4,16" fill="#0984E3" stroke="#000000" stroke-width="2.5"/><rect x="7" y="18" width="4" height="6" fill="#FFFDF5"/></svg>`
};

// Backend Upgrades & Economy Scaling Definitions
const FEATURE_UNLOCK_ORDER = [
  'shelf2', 'cashier', 'wheat', 'bakery', 'helper',
  'cow', 'cheese', 'helper2', 'corn', 'popcorn',
  'apple', 'pie', 'helper3', 'strawberry', 'carrot',
  'icecream', 'salad', 'pizza', 'delivery', 'helper4'
];

const UPGRADE_CONFIG = {
  // --- TAB: OYUNCU (PLAYER) ---
  playerCapacity: {
    category: 'player',
    type: 'tiered',
    title: 'ÇANTA KAPASİTESİ',
    desc: 'Oyuncunun tek seferde sırtında taşıyabileceği ürün sınırı.',
    icon: 'CAPACITY',
    levels: [
      { level: 1, value: 8, cost: 0, text: '8 Ürün' },
      { level: 2, value: 12, cost: 60, text: '12 Ürün' },
      { level: 3, value: 16, cost: 150, text: '16 Ürün' },
      { level: 4, value: 20, cost: 350, text: '20 Ürün' }
    ]
  },
  playerSpeed: {
    category: 'player',
    type: 'tiered',
    title: 'OYUNCU KOŞU HIZI',
    desc: 'Süpermarket içinde daha hızlı koşmanızı ve ürün taşımanızı sağlar.',
    icon: 'SPEED',
    levels: [
      { level: 1, value: 6.2, cost: 0, text: '6.2 Hız' },
      { level: 2, value: 7.5, cost: 50, text: '7.5 Hız (+21%)' },
      { level: 3, value: 8.8, cost: 120, text: '8.8 Hız (+42%)' },
      { level: 4, value: 10.1, cost: 280, text: '10.1 Hız (+63%)' }
    ]
  },
  unlockCashier: {
    category: 'player',
    type: 'unlock',
    unlockKey: 'cashier',
    title: 'OTOMATİK KASİYER BOTU',
    desc: 'Kasada sürekli durarak müşterileri anında geçirir ve parayı toplar.',
    icon: 'CASH',
    cost: 80
  },
  unlockShelf2: {
    category: 'player',
    type: 'unlock',
    unlockKey: 'shelf2',
    title: '2. DOMATES REYONU',
    desc: 'Giriş reyon kapasitesini 2 katına çıkarır, müşteri trafiğini hızlandırır.',
    icon: 'TOMATO',
    cost: 40
  },

  // --- TAB: PERSONEL (STAFF) ---
  helperSpeed: {
    category: 'staff',
    type: 'tiered',
    title: 'PERSONEL HIZI',
    desc: 'Tüm yardımcı işçi personellerinin reyonlar arası yürüme hızı.',
    icon: 'SPEED',
    levels: [
      { level: 1, value: 1.0, cost: 0, text: '1.0x Standart' },
      { level: 2, value: 1.35, cost: 80, text: '1.35x Seri (+35%)' },
      { level: 3, value: 1.70, cost: 200, text: '1.70x Turbo (+70%)' },
      { level: 4, value: 2.05, cost: 400, text: '2.05x Maks (+105%)' }
    ]
  },
  helperCapacity: {
    category: 'staff',
    type: 'tiered',
    title: 'PERSONEL KAPASİTESİ',
    desc: 'Yardımcı personellerin kucaklarında taşıyabileceği azami ürün adedi.',
    icon: 'CAPACITY',
    levels: [
      { level: 1, value: 6, cost: 0, text: '6 Ürün' },
      { level: 2, value: 8, cost: 70, text: '8 Ürün' },
      { level: 3, value: 10, cost: 180, text: '10 Ürün' },
      { level: 4, value: 12, cost: 360, text: '12 Ürün' }
    ]
  },
  hireHelper1: {
    category: 'staff',
    type: 'unlock',
    unlockKey: 'helper',
    title: '1. PERSONEL (REYON GÖREVLİSİ)',
    desc: 'Domates ve temel ürünleri tarladan toplayıp boş reyonlara taşır.',
    icon: 'STAR',
    cost: 250
  },
  hireHelper2: {
    category: 'staff',
    type: 'unlock',
    unlockKey: 'helper2',
    title: '2. PERSONEL (LOJİSTİK KOORDİNATÖRÜ)',
    desc: 'Un, süt, peynir ve fırın ürünlerini üretim makinelerine taşır.',
    icon: 'PACKAGE',
    cost: 300
  },
  hireHelper3: {
    category: 'staff',
    type: 'unlock',
    unlockKey: 'helper3',
    title: '3. PERSONEL (USTA ÇİFTÇİ)',
    desc: 'Güney tarlalarında domates, buğday, mısır, çilek ve havuç hasadını üstlenir.',
    icon: 'WHEAT',
    cost: 500
  },
  hireHelper4: {
    category: 'staff',
    type: 'unlock',
    unlockKey: 'helper4',
    title: '4. PERSONEL (UZMAN LOJİSTİK)',
    desc: 'Dondurma, salata, pizza ve kurye teslimat lojistiğini kusursuz yönetir.',
    icon: 'FACTORY',
    cost: 1500
  },

  // --- TAB: TESİS & TARLA (FACILITY) ---
  farmSpeed: {
    category: 'facility',
    type: 'tiered',
    title: 'TARLA BÜYÜME HIZI',
    desc: 'Domates, buğday, mısır, elma, çilek ve havuç büyüme ve hasat süresi.',
    icon: 'WHEAT',
    levels: [
      { level: 1, value: 1.0, cost: 0, text: '1.0x Normal' },
      { level: 2, value: 1.25, cost: 90, text: '1.25x Hızlı (+25%)' },
      { level: 3, value: 1.55, cost: 220, text: '1.55x Süper (+55%)' },
      { level: 4, value: 1.90, cost: 450, text: '1.90x Anlık (+90%)' }
    ]
  },
  factorySpeed: {
    category: 'facility',
    type: 'tiered',
    title: 'MAKİNE & İNEK VERİMİ',
    desc: 'Değirmen, fırın, dondurma, salata barı, kurye, meyve sıkacağı ve peynir süresini kısaltır.',
    icon: 'FACTORY',
    levels: [
      { level: 1, value: 1.0, cost: 0, text: '1.0x Standart' },
      { level: 2, value: 1.25, cost: 100, text: '1.25x Hızlı (+25%)' },
      { level: 3, value: 1.55, cost: 250, text: '1.55x Seri (+55%)' },
      { level: 4, value: 1.90, cost: 500, text: '1.90x Endüstriyel (+90%)' }
    ]
  },
  unlockWheat: {
    category: 'facility',
    type: 'unlock',
    unlockKey: 'wheat',
    title: 'BUĞDAY TARLASI & UN DEĞİRMENİ',
    desc: 'Altın buğday yetiştirip yel değirmeninde una dönüştürün.',
    icon: 'WHEAT',
    cost: 120
  },
  unlockBakery: {
    category: 'facility',
    type: 'unlock',
    unlockKey: 'bakery',
    title: 'TAŞ FIRIN & EKMEK REYONU',
    desc: 'Unu pişirip taze somun ekmek ve fırın mamulleri üretin.',
    icon: 'PACKAGE',
    cost: 180
  },
  unlockCow: {
    category: 'facility',
    type: 'unlock',
    unlockKey: 'cow',
    title: 'İNEK ÇİFTLİĞİ & TAZE SÜT',
    desc: 'İnekleri besleyin ve şişelenmiş taze günlük süt üretin.',
    icon: 'STAR',
    cost: 320
  },
  unlockCheese: {
    category: 'facility',
    type: 'unlock',
    unlockKey: 'cheese',
    title: 'PEYNİR KAZANI & ŞARKÜTERİ',
    desc: 'Taze sütü mayalayarak lezzetli kaşar tekerlekleri hazırlayın.',
    icon: 'STAR',
    cost: 450
  },
  unlockCorn: {
    category: 'facility',
    type: 'unlock',
    unlockKey: 'corn',
    title: 'MISIR TARLASI & REYONU',
    desc: 'Sarı koçanlı mısırlar yetiştirin ve doğrudan satışa sunun.',
    icon: 'WHEAT',
    cost: 380
  },
  unlockPopcorn: {
    category: 'facility',
    type: 'unlock',
    unlockKey: 'popcorn',
    title: 'PATLAMIŞ MISIR MAKİNESİ',
    desc: 'Mısırları sıcak hava makinesinde patlatıp kutu mısır satın.',
    icon: 'FACTORY',
    cost: 520
  },
  unlockApple: {
    category: 'facility',
    type: 'unlock',
    unlockKey: 'apple',
    title: 'ELMA BAHÇESİ & SIKACAK',
    desc: 'Kırmızı elmalar toplayın ve soğuk sıkım elma suyu üretin.',
    icon: 'STAR',
    cost: 600
  },
  unlockPie: {
    category: 'facility',
    type: 'unlock',
    unlockKey: 'pie',
    title: 'GURME ELMALI TURTA REYONU',
    desc: 'Fırında elma ve un ile çıtır gurme turtalar pişirin.',
    icon: 'PACKAGE',
    cost: 750
  },
  unlockStrawberry: {
    category: 'facility',
    type: 'unlock',
    unlockKey: 'strawberry',
    title: 'ÇİLEK TARLASI & REÇEL REYONU',
    desc: 'Tatlı yakut çilekler toplayıp organik reçel kavanozları hazırlayın.',
    icon: 'STAR',
    cost: 850
  },
  unlockCarrot: {
    category: 'facility',
    type: 'unlock',
    unlockKey: 'carrot',
    title: 'HAVUÇ TARLASI & REYONU',
    desc: 'Çıtır taze turuncu havuçlar yetiştirip manav reyonuna dizin.',
    icon: 'WHEAT',
    cost: 950
  },
  unlockDelivery: {
    category: 'facility',
    type: 'unlock',
    unlockKey: 'delivery',
    title: 'EXPRESS KURYE & SİPARİŞ MASASI',
    desc: 'Şehir siparişlerini paketleyip yüksek nakit ödülleri kazanın.',
    icon: 'PACKAGE',
    cost: 1100
  },
  unlockIcecream: {
    category: 'facility',
    type: 'unlock',
    unlockKey: 'icecream',
    title: 'GELATO DONDURMA MAKİNESİ',
    desc: 'Süt ve çilek karışımıyla serinletici külah dondurmalar üretin.',
    icon: 'FACTORY',
    cost: 1200
  },
  unlockSalad: {
    category: 'facility',
    type: 'unlock',
    unlockKey: 'salad',
    title: 'AKDENİZ SALATA HAZIRLIK BARI',
    desc: 'Domates ve havuç ile taze zeytinyağlı salata kaseleri hazırlayın.',
    icon: 'FACTORY',
    cost: 1400
  },
  unlockPizza: {
    category: 'facility',
    type: 'unlock',
    unlockKey: 'pizza',
    title: 'GURME PİZZA FIRIN REYONU',
    desc: 'Un, domates ve peynirle fırında İtalyan pizzası pişirin.',
    icon: 'PACKAGE',
    cost: 1650
  }
};

// --- Continuous 2D Circle-to-AABB Collision & Slide Physics Engine ---
// ponytail: lightweight zero-dependency continuous collision resolver with tangent sliding.
class CollisionSystem {
  constructor() {
    this.obstacles = [];
  }

  addBox(minX, maxX, minZ, maxZ, tag = '') {
    this.obstacles.push({ minX, maxX, minZ, maxZ, tag });
  }

  removeByTag(tag) {
    this.obstacles = this.obstacles.filter(o => o.tag !== tag);
  }

  resolveCircle(pos, radius = 0.45) {
    for (let iter = 0; iter < 2; iter++) {
      for (let i = 0; i < this.obstacles.length; i++) {
        const box = this.obstacles[i];
        const cx = Math.max(box.minX, Math.min(pos.x, box.maxX));
        const cz = Math.max(box.minZ, Math.min(pos.z, box.maxZ));

        const dx = pos.x - cx;
        const dz = pos.z - cz;
        const distSq = dx * dx + dz * dz;

        if (distSq < radius * radius) {
          const dist = Math.sqrt(distSq);
          if (dist > 0.0001) {
            const overlap = radius - dist;
            pos.x += (dx / dist) * overlap;
            pos.z += (dz / dist) * overlap;
          } else {
            const dL = Math.abs(pos.x - box.minX);
            const dR = Math.abs(box.maxX - pos.x);
            const dB = Math.abs(pos.z - box.minZ);
            const dT = Math.abs(box.maxZ - pos.z);
            const minEdge = Math.min(dL, dR, dB, dT);

            if (minEdge === dL) pos.x = box.minX - radius;
            else if (minEdge === dR) pos.x = box.maxX + radius;
            else if (minEdge === dB) pos.z = box.minZ - radius;
            else pos.z = box.maxZ + radius;
          }
        }
      }
    }
  }
}

class MiniMartGame {
  constructor() {
    this.canvas = document.getElementById('game-canvas');
    this.clock = new THREE.Clock();

    // Game Economy & State
    this.money = 0;
    this.unlockedFeatures = {
      shelf2: false,
      cashier: false,
      wheat: false,
      bakery: false,
      helper: false,
      cow: false,
      cheese: false,
      helper2: false,
      corn: false,
      popcorn: false,
      apple: false,
      pie: false,
      helper3: false,
      strawberry: false,
      carrot: false,
      icecream: false,
      salad: false,
      pizza: false,
      delivery: false,
      helper4: false
    };

    // Arrays & references of game entities
    this.plots = [];
    this.shelves = [];
    this.unlockPads = [];
    this.customers = [];
    this.helpers = [];
    this.cashierBot = null;
    this.flourMill = null;
    this.bakeryOven = null;
    this.wheatPlot = null;
    this.breadShelf = null;
    this.cowPen = null;
    this.cheeseProcessor = null;
    this.cheeseShelf = null;
    this.cornPlot = null;
    this.cornShelf = null;
    this.popcornMaker = null;
    this.popcornShelf = null;
    this.appleTree = null;
    this.juicer = null;
    this.juiceShelf = null;
    this.pieShelf = null;
    this.helper3 = null;
    this.strawberryPlot = null;
    this.strawberryShelf = null;
    this.carrotPlot = null;
    this.carrotShelf = null;
    this.iceCreamMachine = null;
    this.iceCreamShelf = null;
    this.saladPrepBar = null;
    this.saladShelf = null;
    this.pizzaShelf = null;
    this.deliveryDesk = null;
    this.activeCourier = null;
    this.helper4 = null;
    this.upgradeDesk = null;
    this.collision = new CollisionSystem();

    // Global reference for entity sound & particle triggers
    window.gameInstance = this;

    // Generative Art VFX & Particle Engine
    this.particleFX = null;

    // Floor Spills Mini-Mechanic
    this.spills = [];
    this.spillSpawnTimer = 30.0;

    // Rapid Checkout Hyper Combo Multiplier System
    this.checkoutComboCount = 0;
    this.comboTimer = 0;
    this.comboMultiplier = 1.0;

    // Sprint Dash State
    this.isSprinting = false;
    this.touchSprintActive = false;

    // Events, VIPs, Shoplifters & Rush Hour
    this.isRushHour = false;
    this.rushHourTimer = 0;
    this.rushHourCooldown = 80.0;
    this.vipSpawnTimer = 45.0;
    this.shoplifterSpawnTimer = 65.0;

    // Backend Upgrades & Economy Multipliers
    this.upgrades = {
      playerCapacity: 1,
      playerSpeed: 1,
      helperSpeed: 1,
      helperCapacity: 1,
      farmSpeed: 1,
      factorySpeed: 1
    };
    this.playerSpeed = 6.2;
    this.isUpgradeModalOpen = false;
    this.upgradePadCooldown = 0;
    this.activeUpgradeTab = 'player';
    this.isLoadingSave = false;
    this.isDevMode = new URLSearchParams(window.location.search).has('dev') || localStorage.getItem('mini_mart_dev') === '1';

    // Versioned persistence buckets used by progression, retention and future branch systems.
    this.saveMeta = {};
    this.stats = {};
    this.progression = window.GameMechanics.createProgressionState();
    this.dayState = window.GameMechanics.createDayState();
    this.dailyDemand = null;
    this.specialization = window.GameMechanics.createSpecializationState();
    this.pricing = window.GameMechanics.createPricingState();
    this.retention = window.GameMechanics.createRetentionState();
    this.autosaveElapsed = 0;
    this.lastShownDaySummary = null;
    this.cosmetics = {};
    this.branches = {};
    this.storage = {};
    this.staffSettings = {};

    // Neighborhood Residents, Brands, Day Choice, and Exterior Investments
    this.neighborhoodState = window.GameMechanics.createNeighborhoodState();
    this.brandState = window.GameMechanics.createBrandState();
    this.activeDayChoice = null;
    this.dayChoicesOffered = [];
    this.neighborhoodBuildingsState = window.GameMechanics.createNeighborhoodBuildingState();
    this.builtNeighborhoodMeshes = {};
    this.toastMachine = null;
    this.jamCauldron = null;
    this.isNeighborhoodOpen = false;
    this.activeNeighborhoodTab = 'residents';

    // Wiki & Guide State
    this.isWikiOpen = false;
    this.activeWikiTab = 'recipes';

    // Interaction timers
    this.harvestCooldown = 0;
    this.stockCooldown = 0;
    this.customerSpawnCooldown = 2.0;

    // Inputs
    this.keys = {};
    this.joystickInput = new THREE.Vector2();

    this.initThree();
    this.initEnvironment();
    this.initEntities();
    this.initInputs();
    this.initUI();
    this.initWikiUI();
    this.loadState();
    window.addEventListener('pagehide', () => this.saveState());
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) this.saveState();
    });

    // Start loop
    this.animate = this.animate.bind(this);
    requestAnimationFrame(this.animate);
  }

  // --- Three.js Scene, Camera, Lighting ---
  initThree() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xa0e2ff);
    this.scene.fog = new THREE.Fog(0xa0e2ff, 55, 125);

    // Generative Art Voxel Particle Engine
    this.particleFX = new VoxelParticleFX(this.scene);

    const aspect = window.innerWidth / window.innerHeight;
    this.camera = new THREE.PerspectiveCamera(40, aspect, 0.1, 1000);
    this.camera.position.set(0, 24, 20);
    this.camera.lookAt(0, 0, 0);

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    this.scene.add(ambientLight);

    const sun = new THREE.DirectionalLight(0xfffaed, 0.95);
    sun.position.set(24, 36, 20);
    sun.castShadow = true;
    sun.shadow.mapSize.width = 2048;
    sun.shadow.mapSize.height = 2048;
    sun.shadow.camera.near = 0.5;
    sun.shadow.camera.far = 95;
    const d = 34;
    sun.shadow.camera.left = -d;
    sun.shadow.camera.right = d;
    sun.shadow.camera.top = d;
    sun.shadow.camera.bottom = -d;
    sun.shadow.bias = -0.0004;
    this.scene.add(sun);

    window.addEventListener('resize', () => this.onWindowResize());
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  // --- Environment: Expanded Store, Rich Architectural Walls, Garden & Pathways ---
  initEnvironment() {
    // 1. Massive Base Terrain (Width 160, Depth 160) - Eliminates all camera edge voids
    const baseTerrainGeo = new THREE.PlaneGeometry(160, 160);
    baseTerrainGeo.rotateX(-Math.PI / 2);
    const baseTerrainMat = new THREE.MeshStandardMaterial({
      color: 0x27ae60, // Deep forest undergrowth emerald
      roughness: 0.9
    });
    const baseTerrain = new THREE.Mesh(baseTerrainGeo, baseTerrainMat);
    baseTerrain.position.set(0, -0.06, 0);
    baseTerrain.receiveShadow = true;
    this.scene.add(baseTerrain);

    // Inner Meadow Lawn (Width 90, Depth 70) for Central Store & Farm Quadrants
    const innerLawnGeo = new THREE.PlaneGeometry(90, 70);
    innerLawnGeo.rotateX(-Math.PI / 2);
    const innerLawnMat = new THREE.MeshStandardMaterial({
      color: 0x2ecc71, // Bright fresh meadow green
      roughness: 0.85
    });
    const innerLawn = new THREE.Mesh(innerLawnGeo, innerLawnMat);
    innerLawn.position.set(0, -0.03, 0);
    innerLawn.receiveShadow = true;
    this.scene.add(innerLawn);

    // Voxel Earthen Terraforming Foundation Slab (Thickness 2.5m under base terrain)
    const earthBaseMat = new THREE.MeshStandardMaterial({ color: 0x8b5a2b, roughness: 0.95 });
    const earthBase = new THREE.Mesh(new THREE.BoxGeometry(160, 2.5, 160), earthBaseMat);
    earthBase.position.set(0, -1.30, 0);
    this.scene.add(earthBase);

    // Decorative Meadow Grass Patches (Multi-tone Voxel Lawns)
    const patchMat1 = new THREE.MeshStandardMaterial({ color: 0x2ed573, roughness: 0.9 });
    const patchMat2 = new THREE.MeshStandardMaterial({ color: 0x7bed9f, roughness: 0.9 });
    const patchPositions = [
      [-14, 0.005, 5, 8, 8, patchMat1],
      [-14, 0.006, 17, 8, 12, patchMat2],
      [14, 0.005, 5, 8, 8, patchMat1],
      [14, 0.006, 17, 8, 12, patchMat2],
      [-5.5, 0.005, 6.5, 4.5, 4.5, patchMat2],
      [5.5, 0.005, 6.5, 4.5, 4.5, patchMat1],
      [-28, -0.01, 12, 16, 24, patchMat1],
      [28, -0.01, 12, 16, 24, patchMat2]
    ];
    patchPositions.forEach(([px, py, pz, pw, pd, pmat]) => {
      const pGeo = new THREE.PlaneGeometry(pw, pd);
      pGeo.rotateX(-Math.PI / 2);
      const pMesh = new THREE.Mesh(pGeo, pmat);
      pMesh.position.set(px, py, pz);
      pMesh.receiveShadow = true;
      this.scene.add(pMesh);
    });

    // 2. Central Sandstone Cobblestone Promenade (Connecting Garden to Supermarket)
    const pathMat = new THREE.MeshStandardMaterial({ color: 0xf5cd79, roughness: 0.6 });
    const mainPath = new THREE.Mesh(new THREE.PlaneGeometry(4.8, 28).rotateX(-Math.PI / 2), pathMat);
    mainPath.position.set(0, 0.01, 11.5);
    mainPath.receiveShadow = true;
    this.scene.add(mainPath);

    // Lateral Connecting Walkways
    const latPath1 = new THREE.Mesh(new THREE.PlaneGeometry(36, 2.8).rotateX(-Math.PI / 2), pathMat);
    latPath1.position.set(0, 0.012, 6.5);
    latPath1.receiveShadow = true;
    const latPath2 = new THREE.Mesh(new THREE.PlaneGeometry(36, 2.8).rotateX(-Math.PI / 2), pathMat);
    latPath2.position.set(0, 0.012, 12.5);
    latPath2.receiveShadow = true;
    const latPath3 = new THREE.Mesh(new THREE.PlaneGeometry(36, 2.8).rotateX(-Math.PI / 2), pathMat);
    latPath3.position.set(0, 0.012, 18.5);
    latPath3.receiveShadow = true;
    this.scene.add(latPath1, latPath2, latPath3);

    // 3. Supermarket Floor (Width 38: X: -19 to +19, Depth 23: Z: -24 to -1)
    const storeFloorGeo = new THREE.PlaneGeometry(38, 23);
    storeFloorGeo.rotateX(-Math.PI / 2);
    const storeFloorMat = new THREE.MeshStandardMaterial({
      color: 0x74b9ff,
      roughness: 0.25,
      metalness: 0.05
    });
    const storeFloor = new THREE.Mesh(storeFloorGeo, storeFloorMat);
    storeFloor.position.set(0, 0.01, -12.5);
    storeFloor.receiveShadow = true;
    this.scene.add(storeFloor);

    // High-Contrast Polish Checkerboard Grid Lines on Supermarket Floor
    const tileLineMat = new THREE.MeshBasicMaterial({ color: 0xa0cfff, transparent: true, opacity: 0.65 });
    for (let x = -19; x <= 19; x += 2) {
      const line = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.02, 23), tileLineMat);
      line.position.set(x, 0.02, -12.5);
      this.scene.add(line);
    }
    for (let z = -24; z <= -1; z += 2) {
      const line = new THREE.Mesh(new THREE.BoxGeometry(38, 0.02, 0.04), tileLineMat);
      line.position.set(0, 0.02, z);
      this.scene.add(line);
    }

    // Parquet Wood Floor Inlay under Checkout Counter
    const parquetMat = new THREE.MeshStandardMaterial({ color: 0xd35400, roughness: 0.4 });
    const chkFloor = new THREE.Mesh(new THREE.BoxGeometry(7.0, 0.025, 6.0), parquetMat);
    chkFloor.position.set(8.5, 0.02, -4.5);
    chkFloor.receiveShadow = true;
    this.scene.add(chkFloor);

    // Entrance Yellow/Black Safety Strip
    const hazardMat = new THREE.MeshBasicMaterial({ color: 0xffe600 });
    const hazardBar = new THREE.Mesh(new THREE.BoxGeometry(7.2, 0.03, 0.6), hazardMat);
    hazardBar.position.set(0, 0.02, -1.0);
    this.scene.add(hazardBar);
    this.createDepartmentFloorZones();

    // 4. North Outdoor World: Two-Lane Road, Parking Lot & Sidewalk Plaza (Z: -24.0 to -37.0)
    // A. Two-Lane Asphault Highway (Z: -31.0 to -37.0, Width 160)
    const roadMat = new THREE.MeshStandardMaterial({ color: 0x1e272e, roughness: 0.9 });
    const roadGeo = new THREE.PlaneGeometry(160, 6.0);
    roadGeo.rotateX(-Math.PI / 2);
    const road = new THREE.Mesh(roadGeo, roadMat);
    road.position.set(0, -0.01, -34.0);
    road.receiveShadow = true;
    this.scene.add(road);

    // Yellow Dashed Center Divider Line (Extended across 160 units)
    const dashMat = new THREE.MeshBasicMaterial({ color: 0xffe600 });
    for (let dx = -76; dx <= 76; dx += 3.2) {
      const dash = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.02, 0.16), dashMat);
      dash.position.set(dx, 0.005, -34.0);
      this.scene.add(dash);
    }

    // White Outer Road Edge Lines
    const edgeMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const edgeN = new THREE.Mesh(new THREE.BoxGeometry(160, 0.02, 0.14), edgeMat);
    edgeN.position.set(0, 0.005, -36.85);
    const edgeS = new THREE.Mesh(new THREE.BoxGeometry(160, 0.02, 0.14), edgeMat);
    edgeS.position.set(0, 0.005, -31.15);
    this.scene.add(edgeN, edgeS);

    // Painted Zebra Pedestrian Crosswalk (X: -3.0 to +3.0, Z: -37.0 to -31.0)
    for (let zx = -2.6; zx <= 2.6; zx += 0.9) {
      const stripe = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.02, 5.6), edgeMat);
      stripe.position.set(zx, 0.006, -34.0);
      this.scene.add(stripe);
    }

    // B. Concrete Parking Lot (Z: -25.5 to -31.0, Width 44)
    const parkingMat = new THREE.MeshStandardMaterial({ color: 0x57606f, roughness: 0.85 });
    const parkingGeo = new THREE.PlaneGeometry(44, 5.5);
    parkingGeo.rotateX(-Math.PI / 2);
    const parking = new THREE.Mesh(parkingGeo, parkingMat);
    parking.position.set(0, 0.002, -28.25);
    parking.receiveShadow = true;
    this.scene.add(parking);

    // 6 Car Parking Stalls with White Demarcation Lines & Wheel Stop Curbs
    const carX = [-12.5, -7.5, -2.5, 2.5, 7.5, 12.5];
    const stallLineMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const curbMat = new THREE.MeshStandardMaterial({ color: 0xdcdde1, roughness: 0.5 });
    const curbStripeMat = new THREE.MeshBasicMaterial({ color: 0xffe600 });

    // Lateral Stall Lines
    [-15.0, -10.0, -5.0, 0.0, 5.0, 10.0, 15.0].forEach(lx => {
      const pLine = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.02, 4.8), stallLineMat);
      pLine.position.set(lx, 0.01, -28.25);
      this.scene.add(pLine);
    });

    // Wheel Stop Curbs at Head of Each Stall
    carX.forEach(cx => {
      const curb = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.16, 0.35), curbMat);
      curb.position.set(cx, 0.08, -26.0);
      curb.castShadow = true;
      const cStripe = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.17, 0.12), curbStripeMat);
      cStripe.position.set(cx, 0.085, -26.0);
      this.scene.add(curb, cStripe);
    });

    // 2 Scooter / Vespa Parking Bays on Left
    const scooterMat = new THREE.MeshBasicMaterial({ color: 0x2ed573 });
    [-19.5, -17.25, -15.0].forEach(sx => {
      const sLine = new THREE.Mesh(new THREE.BoxGeometry(0.10, 0.02, 4.8), scooterMat);
      sLine.position.set(sx, 0.01, -28.25);
      this.scene.add(sLine);
    });

    // 2 Bicycle Parking Racks on Right
    const rackMat = new THREE.MeshStandardMaterial({ color: 0xa4b0be, roughness: 0.2, metalness: 0.8 });
    [16.5, 18.2].forEach(rx => {
      const rackBase = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.75, 2.2), rackMat);
      rackBase.position.set(rx, 0.375, -28.0);
      rackBase.castShadow = true;
      this.scene.add(rackBase);
    });

    // C. North Sidewalk Plaza Promenade (Z: -23.8 to -25.5, Width 44)
    const walkMat = new THREE.MeshStandardMaterial({ color: 0xced6e0, roughness: 0.7 });
    const sidewalk = new THREE.Mesh(new THREE.PlaneGeometry(44, 1.8).rotateX(-Math.PI / 2), walkMat);
    sidewalk.position.set(0, 0.015, -24.7);
    sidewalk.receiveShadow = true;
    this.scene.add(sidewalk);

    // 5. Living World Ambience & Street Furniture Props (North Plaza)
    const lampPostMat = new THREE.MeshStandardMaterial({ color: 0x1e272e, roughness: 0.3 });
    const lanternMat = new THREE.MeshStandardMaterial({ color: 0xffe600, roughness: 0.1, emissive: 0xffe600, emissiveIntensity: 0.6 });

    // 4 Modern Voxel Streetlights along North Sidewalk
    [-18.0, -6.0, 6.0, 18.0].forEach(lx => {
      const pole = new THREE.Mesh(new THREE.BoxGeometry(0.22, 3.8, 0.22), lampPostMat);
      pole.position.set(lx, 1.9, -25.5);
      pole.castShadow = true;
      const arm = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.14, 0.14), lampPostMat);
      arm.position.set(lx + 0.3, 3.7, -25.5);
      const head = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.28, 0.38), lanternMat);
      head.position.set(lx + 0.6, 3.55, -25.5);
      this.scene.add(pole, arm, head);
    });

    // Vending Machine (Drink Automat) on North Sidewalk
    const vendBodyMat = new THREE.MeshStandardMaterial({ color: 0x0984e3, roughness: 0.3 });
    const vendFrontMat = new THREE.MeshStandardMaterial({ color: 0x74b9ff, roughness: 0.1, emissive: 0x74b9ff, emissiveIntensity: 0.3 });
    const vendBody = new THREE.Mesh(new THREE.BoxGeometry(0.9, 1.7, 0.65), vendBodyMat);
    vendBody.position.set(-15.2, 0.85, -24.8);
    vendBody.castShadow = true;
    const vendGlass = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.9, 0.1), vendFrontMat);
    vendGlass.position.set(-15.2, 1.1, -24.45);
    const vendDisp = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.25, 0.1), lampPostMat);
    vendDisp.position.set(-15.2, 0.25, -24.45);
    this.scene.add(vendBody, vendGlass, vendDisp);

    // 2 Wooden Park Benches
    const benchWoodMat = new THREE.MeshStandardMaterial({ color: 0x8b5a2b, roughness: 0.6 });
    const benchLegMat = new THREE.MeshStandardMaterial({ color: 0x2f3640, roughness: 0.4 });
    [-9.0, 9.0].forEach(bx => {
      const seat = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.08, 0.5), benchWoodMat);
      seat.position.set(bx, 0.45, -24.8);
      const back = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.45, 0.08), benchWoodMat);
      back.position.set(bx, 0.70, -25.0);
      const legL = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.45, 0.5), benchLegMat);
      legL.position.set(bx - 0.7, 0.225, -24.8);
      const legR = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.45, 0.5), benchLegMat);
      legR.position.set(bx + 0.7, 0.225, -24.8);
      this.scene.add(seat, back, legL, legR);
    });

    // 2 Voxel Trash & Recycling Bins
    const binMat1 = new THREE.MeshStandardMaterial({ color: 0x2ecc71, roughness: 0.4 }); // Organic
    const binMat2 = new THREE.MeshStandardMaterial({ color: 0x3498db, roughness: 0.4 }); // Paper/Plastic
    const bin1 = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.75, 0.45), binMat1);
    bin1.position.set(-4.5, 0.375, -24.8);
    bin1.castShadow = true;
    const bin2 = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.75, 0.45), binMat2);
    bin2.position.set(4.5, 0.375, -24.8);
    bin2.castShadow = true;
    this.scene.add(bin1, bin2);

    // Roadside Totem Signpost ("MINI MART 24/7")
    const signPole = new THREE.Mesh(new THREE.BoxGeometry(0.3, 4.8, 0.3), lampPostMat);
    signPole.position.set(-19.5, 2.4, -32.5);
    signPole.castShadow = true;
    const totemSign = new THREE.Mesh(new THREE.BoxGeometry(2.4, 1.3, 0.4), new THREE.MeshStandardMaterial({ color: 0xffe600, roughness: 0.2 }));
    totemSign.position.set(-19.5, 4.4, -32.5);
    totemSign.castShadow = true;
    const totemTrim = new THREE.Mesh(new THREE.BoxGeometry(2.6, 1.5, 0.2), new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.5 }));
    totemTrim.position.set(-19.5, 4.4, -32.5);
    this.scene.add(signPole, totemSign, totemTrim);

    // 6. Supermarket Architectural 3D Walls & North Facade
    const wallMat = new THREE.MeshStandardMaterial({ color: 0x2f3640, roughness: 0.4 });
    const wallTrimMat = new THREE.MeshStandardMaterial({ color: 0x0984e3, roughness: 0.3 });
    const pillarMat = new THREE.MeshStandardMaterial({ color: 0x1e272e, roughness: 0.35 });
    const glassMat = new THREE.MeshStandardMaterial({ color: 0x81ecec, transparent: true, opacity: 0.45, roughness: 0.1 });
    const frameMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.5 });

    // A. North Facade (Z = -24.0) with Grand Double Entrance Portal (X: -3.5 to +3.5)
    // Left Storefront Wall & Windows (X: -19.2 to -3.5)
    const nLeftWall = new THREE.Mesh(new THREE.BoxGeometry(15.7, 0.8, 0.45), wallMat);
    nLeftWall.position.set(-11.35, 0.4, -24.0);
    nLeftWall.castShadow = true;
    const nLeftGlass = new THREE.Mesh(new THREE.BoxGeometry(15.5, 2.0, 0.12), glassMat);
    nLeftGlass.position.set(-11.35, 1.8, -24.0);
    const nLeftTrim = new THREE.Mesh(new THREE.BoxGeometry(15.7, 0.45, 0.55), wallTrimMat);
    nLeftTrim.position.set(-11.35, 3.05, -24.0);
    this.scene.add(nLeftWall, nLeftGlass, nLeftTrim);

    // Right Storefront Wall & Windows (X: +3.5 to +19.2)
    const nRightWall = new THREE.Mesh(new THREE.BoxGeometry(15.7, 0.8, 0.45), wallMat);
    nRightWall.position.set(11.35, 0.4, -24.0);
    nRightWall.castShadow = true;
    const nRightGlass = new THREE.Mesh(new THREE.BoxGeometry(15.5, 2.0, 0.12), glassMat);
    nRightGlass.position.set(11.35, 1.8, -24.0);
    const nRightTrim = new THREE.Mesh(new THREE.BoxGeometry(15.7, 0.45, 0.55), wallTrimMat);
    nRightTrim.position.set(11.35, 3.05, -24.0);
    this.scene.add(nRightWall, nRightGlass, nRightTrim);

    // Entrance Portal Archway & Gate Posts (X: -3.5 and +3.5 at Z = -24.0)
    [-3.5, 3.5].forEach(px => {
      const p = new THREE.Mesh(new THREE.BoxGeometry(0.7, 3.4, 0.7), pillarMat);
      p.position.set(px, 1.7, -24.0);
      p.castShadow = true;
      const c = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.2, 0.85), wallTrimMat);
      c.position.set(px, 3.3, -24.0);
      const l = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.35, 0.35), lanternMat);
      l.position.set(px, 3.6, -24.0);
      this.scene.add(p, c, l);
    });

    // Top Overhead Arch Canopy over North Entrance
    const archCanopy = new THREE.Mesh(new THREE.BoxGeometry(7.6, 0.45, 0.85), wallTrimMat);
    archCanopy.position.set(0, 3.25, -24.0);
    this.scene.add(archCanopy);

    // 3D Illuminated "MINI MART" Sign on Top of Entrance (Z = -24.0, Y = 4.2)
    const signBoard = new THREE.Mesh(new THREE.BoxGeometry(8.4, 1.2, 0.3), new THREE.MeshStandardMaterial({ color: 0xffe600, roughness: 0.2 }));
    signBoard.position.set(0, 4.2, -23.95);
    signBoard.castShadow = true;
    const signTrim = new THREE.Mesh(new THREE.BoxGeometry(8.8, 1.4, 0.15), frameMat.clone());
    signTrim.position.set(0, 4.2, -24.05);
    this.scene.add(signBoard, signTrim);
    this.marketSign = signBoard;
    this.marketSignTrim = signTrim;
    this.marketLevelBlocks = [];
    for (let i = 0; i < 4; i++) {
      // Suspended decoration above the entrance: no walkable-space obstruction.
      const block = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.35 + i * 0.15, 0.4),
        new THREE.MeshStandardMaterial({ color: 0xffe600, roughness: 0.35 }));
      block.position.set(-1.2 + i * 0.8, 5.15 + i * 0.075, -23.95);
      block.visible = false;
      this.scene.add(block);
      this.marketLevelBlocks.push(block);
    }

    // B. Left Wall (X = -19.0, Z = -24 to -1)
    const leftWall = new THREE.Mesh(new THREE.BoxGeometry(0.45, 3.2, 23.4), wallMat);
    leftWall.position.set(-19.2, 1.6, -12.5);
    leftWall.castShadow = true;
    const leftTrim = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.25, 23.5), wallTrimMat);
    leftTrim.position.set(-19.2, 3.3, -12.5);
    this.scene.add(leftWall, leftTrim);

    // C. Right Wall (X = +19.0, Z = -24 to -1)
    const rightWall = new THREE.Mesh(new THREE.BoxGeometry(0.45, 3.2, 23.4), wallMat);
    rightWall.position.set(19.2, 1.6, -12.5);
    rightWall.castShadow = true;
    const rightTrim = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.25, 23.5), wallTrimMat);
    rightTrim.position.set(19.2, 3.3, -12.5);
    this.scene.add(rightWall, rightTrim);

    // Structural Voxel Pillars along Side Perimeters
    const pillarPositions = [
      [-19.2, -18.0], [-19.2, -12.0], [-19.2, -6.0], [-19.2, -1.0],
      [19.2, -18.0], [19.2, -12.0], [19.2, -6.0], [19.2, -1.0]
    ];
    pillarPositions.forEach(([px, pz]) => {
      const col = new THREE.Mesh(new THREE.BoxGeometry(0.7, 3.4, 0.7), pillarMat);
      col.position.set(px, 1.7, pz);
      col.castShadow = true;
      const colCap = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.2, 0.85), wallTrimMat);
      colCap.position.set(px, 3.3, pz);
      this.scene.add(col, colCap);
    });

    // D. South Facade Staff Door & Planter Partition (Z = -1.0, Opening X: -3.5 to +3.5)
    // Left Storefront Curb & Glass
    const wLeftGlass = new THREE.Mesh(new THREE.BoxGeometry(15.2, 0.65, 0.10), glassMat);
    wLeftGlass.position.set(-11.3, 0.55, -1.0);
    const wLeftFrameB = new THREE.Mesh(new THREE.BoxGeometry(15.4, 0.25, 0.35), wallMat);
    wLeftFrameB.position.set(-11.3, 0.125, -1.0);
    const wLeftTrim = new THREE.Mesh(new THREE.BoxGeometry(15.4, 0.08, 0.15), wallTrimMat);
    wLeftTrim.position.set(-11.3, 0.90, -1.0);
    this.scene.add(wLeftGlass, wLeftFrameB, wLeftTrim);

    // Right Storefront Curb & Glass
    const wRightGlass = new THREE.Mesh(new THREE.BoxGeometry(15.2, 0.65, 0.10), glassMat);
    wRightGlass.position.set(11.3, 0.55, -1.0);
    const wRightFrameB = new THREE.Mesh(new THREE.BoxGeometry(15.4, 0.25, 0.35), wallMat);
    wRightFrameB.position.set(11.3, 0.125, -1.0);
    const wRightTrim = new THREE.Mesh(new THREE.BoxGeometry(15.4, 0.08, 0.15), wallTrimMat);
    wRightTrim.position.set(11.3, 0.90, -1.0);
    this.scene.add(wRightGlass, wRightFrameB, wRightTrim);

    // Gate Posts on South Staff Door (X: -3.5 & +3.5, Z = -1.0)
    [-3.5, 3.5].forEach(px => {
      const p = new THREE.Mesh(new THREE.BoxGeometry(0.6, 1.4, 0.6), pillarMat);
      p.position.set(px, 0.7, -1.0);
      p.castShadow = true;
      const c = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.15, 0.75), wallTrimMat);
      c.position.set(px, 1.45, -1.0);
      this.scene.add(p, c);
    });

    // 6.5 Supermarket Interior 3D Neo-Brutalist Wall Posters & Billboards
    const posterBorderMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.7 });
    const badgeStemMat = new THREE.MeshBasicMaterial({ color: 0x25d366 });
    const starRedMat = new THREE.MeshStandardMaterial({ color: 0xff4757, roughness: 0.2 });

    // A. West / Left Wall Posters (X = -18.95, facing East - strictly north of Executive Office Z > -8.2)
    // 1. Fresh Farm Tomato & Produce Poster (Z = -18.5)
    const p1Frame = new THREE.Mesh(new THREE.BoxGeometry(0.10, 1.40, 2.30), posterBorderMat);
    p1Frame.position.set(-18.95, 2.05, -18.5);
    const p1Face = new THREE.Mesh(new THREE.BoxGeometry(0.12, 1.28, 2.18), new THREE.MeshStandardMaterial({ color: 0xff4757, roughness: 0.3 }));
    p1Face.position.set(-18.93, 2.05, -18.5);
    const p1Band = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.36, 2.18), new THREE.MeshStandardMaterial({ color: 0xffe600, roughness: 0.25 }));
    p1Band.position.set(-18.91, 2.45, -18.5);
    const p1Badge = new THREE.Mesh(new THREE.BoxGeometry(0.20, 0.32, 0.32), new THREE.MeshStandardMaterial({ color: 0xff3838 }));
    p1Badge.position.set(-18.82, 1.95, -18.5);
    const p1Stem = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.08, 0.08), badgeStemMat);
    p1Stem.position.set(-18.82, 2.14, -18.5);
    this.scene.add(p1Frame, p1Face, p1Band, p1Badge, p1Stem);

    // 2. Daily Artisan Bakery Poster (Z = -12.5)
    const p2Frame = new THREE.Mesh(new THREE.BoxGeometry(0.10, 1.40, 2.30), posterBorderMat);
    p2Frame.position.set(-18.95, 2.05, -12.5);
    const p2Face = new THREE.Mesh(new THREE.BoxGeometry(0.12, 1.28, 2.18), new THREE.MeshStandardMaterial({ color: 0xe67e22, roughness: 0.4 }));
    p2Face.position.set(-18.93, 2.05, -12.5);
    const p2Center = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.50, 1.90), new THREE.MeshStandardMaterial({ color: 0xfffdf5, roughness: 0.3 }));
    p2Center.position.set(-18.91, 2.05, -12.5);
    const p2Loaf = new THREE.Mesh(new THREE.BoxGeometry(0.20, 0.22, 0.52), new THREE.MeshStandardMaterial({ color: 0xd35400, roughness: 0.4 }));
    p2Loaf.position.set(-18.82, 2.05, -12.5);
    this.scene.add(p2Frame, p2Face, p2Center, p2Loaf);

    // B. East / Right Wall Posters (X = +18.95, facing West)
    // 3. Farm Fresh Chilled Milk & Dairy Poster (Z = -18.5)
    const p3Frame = new THREE.Mesh(new THREE.BoxGeometry(0.10, 1.40, 2.30), posterBorderMat);
    p3Frame.position.set(18.95, 2.05, -18.5);
    const p3Face = new THREE.Mesh(new THREE.BoxGeometry(0.12, 1.28, 2.18), new THREE.MeshStandardMaterial({ color: 0x0984e3, roughness: 0.3 }));
    p3Face.position.set(18.93, 2.05, -18.5);
    const p3Band = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.36, 2.18), new THREE.MeshStandardMaterial({ color: 0x74b9ff, roughness: 0.25 }));
    p3Band.position.set(18.91, 2.45, -18.5);
    const p3Bottle = new THREE.Mesh(new THREE.BoxGeometry(0.20, 0.36, 0.26), new THREE.MeshStandardMaterial({ color: 0xffffff }));
    p3Bottle.position.set(18.82, 1.95, -18.5);
    const p3Cap = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.08, 0.14), new THREE.MeshStandardMaterial({ color: 0xff5252 }));
    p3Cap.position.set(18.82, 2.16, -18.5);
    this.scene.add(p3Frame, p3Face, p3Band, p3Bottle, p3Cap);

    // 4. Mega Sale & Super Bonus Rewards Poster (Z = -12.5)
    const p4Frame = new THREE.Mesh(new THREE.BoxGeometry(0.10, 1.40, 2.30), posterBorderMat);
    p4Frame.position.set(18.95, 2.05, -12.5);
    const p4Face = new THREE.Mesh(new THREE.BoxGeometry(0.12, 1.28, 2.18), new THREE.MeshStandardMaterial({ color: 0xffe600, roughness: 0.2 }));
    p4Face.position.set(18.93, 2.05, -12.5);
    const p4Stripe1 = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.14, 1.90), new THREE.MeshStandardMaterial({ color: 0x111111 }));
    p4Stripe1.position.set(18.91, 2.42, -12.5);
    const p4Stripe2 = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.14, 1.90), new THREE.MeshStandardMaterial({ color: 0x111111 }));
    p4Stripe2.position.set(18.91, 1.68, -12.5);
    const p4Star = new THREE.Mesh(new THREE.BoxGeometry(0.20, 0.36, 0.36), starRedMat);
    p4Star.position.set(18.82, 2.05, -12.5);
    this.scene.add(p4Frame, p4Face, p4Stripe1, p4Stripe2, p4Star);

    // C. North / Front Storefront Interior Wall Posters (Z = -23.75, facing South)
    // 5. 100% Organic Farm Harvest Poster (X = -11.5)
    const p5Frame = new THREE.Mesh(new THREE.BoxGeometry(2.30, 1.40, 0.10), posterBorderMat);
    p5Frame.position.set(-11.5, 2.05, -23.75);
    const p5Face = new THREE.Mesh(new THREE.BoxGeometry(2.18, 1.28, 0.12), new THREE.MeshStandardMaterial({ color: 0x2ecc71, roughness: 0.3 }));
    p5Face.position.set(-11.5, 2.05, -23.73);
    const p5Band = new THREE.Mesh(new THREE.BoxGeometry(2.18, 0.36, 0.14), new THREE.MeshStandardMaterial({ color: 0x1dd1a1, roughness: 0.25 }));
    p5Band.position.set(-11.5, 2.45, -23.71);
    const p5Apple = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.32, 0.20), new THREE.MeshStandardMaterial({ color: 0xd63031 }));
    p5Apple.position.set(-11.5, 1.95, -23.62);
    const p5Leaf = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.08, 0.22), badgeStemMat);
    p5Leaf.position.set(-11.5, 2.14, -23.62);
    this.scene.add(p5Frame, p5Face, p5Band, p5Apple, p5Leaf);

    // 6. Gourmet Sweets & Specialty Delicatessen Poster (X = 11.5)
    const p6Frame = new THREE.Mesh(new THREE.BoxGeometry(2.30, 1.40, 0.10), posterBorderMat);
    p6Frame.position.set(11.5, 2.05, -23.75);
    const p6Face = new THREE.Mesh(new THREE.BoxGeometry(2.18, 1.28, 0.12), new THREE.MeshStandardMaterial({ color: 0x8e44ad, roughness: 0.3 }));
    p6Face.position.set(11.5, 2.05, -23.73);
    const p6Band = new THREE.Mesh(new THREE.BoxGeometry(2.18, 0.36, 0.14), new THREE.MeshStandardMaterial({ color: 0xf1c40f, roughness: 0.25 }));
    p6Band.position.set(11.5, 2.45, -23.71);
    const p6Jar = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.32, 0.20), new THREE.MeshStandardMaterial({ color: 0xff2a55 }));
    p6Jar.position.set(11.5, 1.95, -23.62);
    const p6Lid = new THREE.Mesh(new THREE.BoxGeometry(0.30, 0.08, 0.22), new THREE.MeshStandardMaterial({ color: 0xffe600 }));
    p6Lid.position.set(11.5, 2.14, -23.62);
    this.scene.add(p6Frame, p6Face, p6Band, p6Jar, p6Lid);

    // C. Checkout Queue Stanchions & Velvet Rope Barricades (Near Cashier Desk, X: 4.8 to 11.5, Z = -3.2)
    const stanchionMat = new THREE.MeshStandardMaterial({ color: 0xdcdde1, roughness: 0.2, metalness: 0.85 });
    const ropeMat = new THREE.MeshStandardMaterial({ color: 0xd63031, roughness: 0.5 }); // Velvet Red

    const stanchionX = [5.5, 7.5, 9.5, 11.5];
    stanchionX.forEach((sx, idx) => {
      const pole = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.85, 0.12), stanchionMat);
      pole.position.set(sx, 0.425, -2.8);
      pole.castShadow = true;

      const baseRing = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.06, 0.35), stanchionMat);
      baseRing.position.set(sx, 0.03, -2.8);

      const topBall = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.18, 0.18), stanchionMat);
      topBall.position.set(sx, 0.90, -2.8);

      this.scene.add(pole, baseRing, topBall);

      // Connecting velvet rope bar
      if (idx < stanchionX.length - 1) {
        const rope = new THREE.Mesh(new THREE.BoxGeometry(1.88, 0.08, 0.08), ropeMat);
        rope.position.set(sx + 1.0, 0.65, -2.8);
        rope.castShadow = true;
        this.scene.add(rope);
      }
    });

    // 7. Outdoor Farm Perimeter Wooden Fence (Z: -1.0 to +25.0)
    const fenceMat = new THREE.MeshStandardMaterial({ color: 0xcd853f, roughness: 0.7 });
    const postGeo = new THREE.BoxGeometry(0.20, 0.95, 0.20);
    const railGeoV = new THREE.BoxGeometry(0.10, 0.10, 26.0);
    const railGeoHL = new THREE.BoxGeometry(15.5, 0.10, 0.10);
    const railGeoHR = new THREE.BoxGeometry(15.5, 0.10, 0.10);

    // Left Perimeter Fence (X = -19.5, Z: -1.0 to 25.0)
    for (let fz = -1.0; fz <= 25.0; fz += 2.6) {
      const p = new THREE.Mesh(postGeo, fenceMat);
      p.position.set(-19.5, 0.475, fz);
      p.castShadow = true;
      this.scene.add(p);
    }
    const leftRail = new THREE.Mesh(railGeoV, fenceMat);
    leftRail.position.set(-19.5, 0.65, 12.0);
    this.scene.add(leftRail);

    // Right Perimeter Fence (X = +19.5, Z: -1.0 to 25.0)
    for (let fz = -1.0; fz <= 25.0; fz += 2.6) {
      const p = new THREE.Mesh(postGeo, fenceMat);
      p.position.set(19.5, 0.475, fz);
      p.castShadow = true;
      this.scene.add(p);
    }
    const rightRail = new THREE.Mesh(railGeoV, fenceMat);
    rightRail.position.set(19.5, 0.65, 12.0);
    this.scene.add(rightRail);

    // Back Southern Perimeter Fence
    for (let fx = -19.5; fx <= 19.5; fx += 2.6) {
      const p = new THREE.Mesh(postGeo, fenceMat);
      p.position.set(fx, 0.475, 25.0);
      p.castShadow = true;
      this.scene.add(p);
    }
    const backRailL = new THREE.Mesh(railGeoHL, fenceMat);
    backRailL.position.set(-11.6, 0.65, 25.0);
    const backRailR = new THREE.Mesh(railGeoHR, fenceMat);
    backRailR.position.set(11.6, 0.65, 25.0);
    this.scene.add(backRailL, backRailR);

    // 8. Living World Particles & Clouds
    this.clouds = new VoxelCloudSystem(this.scene);
    this.butterflies = new VoxelButterflies(this.scene);

    // 9. Register Environmental Colliders
    this.collision.addBox(-19.5, -3.5, -24.5, -23.6, 'north_wall_left');
    this.collision.addBox(3.5, 19.5, -24.5, -23.6, 'north_wall_right');
    this.collision.addBox(-19.8, -18.8, -24.2, -0.8, 'wall_left');
    this.collision.addBox(18.8, 19.8, -24.2, -0.8, 'wall_right');
    this.collision.addBox(-19.5, -3.5, -1.4, -0.6, 'front_wall_left');
    this.collision.addBox(3.5, 19.5, -1.4, -0.6, 'front_wall_right');
    this.collision.addBox(-20.0, -19.0, -0.8, 25.5, 'fence_left');
    this.collision.addBox(19.0, 20.0, -0.8, 25.5, 'fence_right');
    this.collision.addBox(-20.0, 20.0, 24.6, 25.4, 'fence_back');
  }

  createDepartmentZone({ x, z, width, depth, color, label }) {
    const zoneMat = new THREE.MeshStandardMaterial({
      color,
      roughness: 0.42,
      transparent: true,
      opacity: 0.72
    });
    const zone = new THREE.Mesh(new THREE.PlaneGeometry(width, depth).rotateX(-Math.PI / 2), zoneMat);
    zone.position.set(x, 0.028, z);
    zone.receiveShadow = true;
    zone.userData.departmentLabel = label;
    this.scene.add(zone);

    const borderMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.55 });
    const top = new THREE.Mesh(new THREE.BoxGeometry(width, 0.035, 0.08), borderMat);
    const bottom = new THREE.Mesh(new THREE.BoxGeometry(width, 0.035, 0.08), borderMat);
    const left = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.035, depth), borderMat);
    const right = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.035, depth), borderMat);
    top.position.set(x, 0.045, z - depth / 2);
    bottom.position.set(x, 0.045, z + depth / 2);
    left.position.set(x - width / 2, 0.045, z);
    right.position.set(x + width / 2, 0.045, z);
    this.scene.add(top, bottom, left, right);

    const signGroup = new THREE.Group();
    signGroup.position.set(x - width / 2 + 1.15, 0.16, z - depth / 2 + 0.5);
    signGroup.userData.departmentLabel = label;
    const signBack = new THREE.Mesh(new THREE.BoxGeometry(2.15, 0.08, 0.54), borderMat);
    const signFace = new THREE.Mesh(
      new THREE.BoxGeometry(1.95, 0.09, 0.36),
      new THREE.MeshStandardMaterial({ color, roughness: 0.35, emissive: color, emissiveIntensity: 0.08 })
    );
    signFace.position.y = 0.015;
    signGroup.add(signBack, signFace);
    this.scene.add(signGroup);
  }

  createDepartmentFloorZones() {
    [
      { x: -8.5, z: -9.5, width: 10.4, depth: 2.7, color: 0x10ac84, label: 'MANAV' },
      { x: -3.8, z: -15.0, width: 16.2, depth: 2.7, color: 0xd35400, label: 'FIRIN' },
      { x: 7.0, z: -9.5, width: 8.8, depth: 2.7, color: 0x0984e3, label: 'SOĞUK' },
      { x: 5.0, z: -20.5, width: 22.4, depth: 2.7, color: 0x8e44ad, label: 'GURME' }
    ].forEach(zone => this.createDepartmentZone(zone));
  }

  // --- Initial Game Entities & Objects ---
  initEntities() {
    this.particleFX = new VoxelParticleFX(this.scene);
    this.parkingLot = new ParkingLotManager(this.scene);
    this.transitTraffic = new TransitTrafficSystem(this.scene);

    this.player = new Character3D(this.scene, 0x2ecc71, true);
    this.player.group.position.set(0, 0, 4.0);
    this.player.maxStack = 8;
    this.createPlayerGroundRing();

    this.guidanceArrow = new GuidanceArrow(this.scene);

    // Initial Chicken Coop in Farm Quadrant
    this.chickenCoop = new ChickenCoop(this.scene, -12.5, 6.5);
    this.collision.addBox(-14.2, -10.8, 5.0, 8.0, 'chicken_coop');

    // Initial Tomato Garden Plot
    this.tomatoPlot = new GardenPlot(this.scene, -5.5, 6.5, 'TOMATO');
    this.plots.push(this.tomatoPlot);
    this.collision.addBox(-7.2, -3.8, 5.0, 8.0, 'tomato_plot');

    // Initial Produce Shelves in Supermarket Aisle 1 & 2
    this.tomatoShelf = new ShelfUnit(this.scene, -5.5, -9.5, 0, 'TOMATO');
    this.collision.addBox(-6.8, -4.2, -10.3, -8.7, 'shelf_tomato');

    this.eggShelf = new ShelfUnit(this.scene, 4.0, -9.5, 0, 'EGG');
    this.collision.addBox(2.7, 5.3, -10.3, -8.7, 'shelf_egg');

    this.shelves.push(this.tomatoShelf, this.eggShelf);

    // Front Supermarket Service Stations
    this.checkout = new CheckoutCounter(this.scene, 8.0, -4.5);
    this.collision.addBox(6.8, 9.2, -5.3, -3.7, 'checkout');

    this.executiveOffice = new ExecutiveOffice(this.scene, -15.8, -4.8);
    this.upgradeDesk = this.executiveOffice;
    // Office boundary colliders (North, South, West, East with 1.6m doorway)
    this.collision.addBox(-19.2, -12.3, -8.1, -7.5, 'office_north_wall');
    this.collision.addBox(-19.2, -12.3, -1.5, -0.9, 'office_south_wall');
    this.collision.addBox(-19.2, -18.6, -8.0, -1.0, 'office_west_wall');
    this.collision.addBox(-12.7, -12.3, -8.0, -5.0, 'office_east_wall_north');
    this.collision.addBox(-12.7, -12.3, -3.4, -1.0, 'office_east_wall_south');
    this.collision.addBox(-16.8, -14.8, -5.4, -4.2, 'office_desk');

    // Faz 2: Tazelik & Dönüştürme İstasyonları (Toast Machine & Jam Cauldron)
    this.toastMachine = new ToastMachine(this.scene, -15.5, -15.0);
    this.collision.addBox(-16.8, -14.2, -15.8, -14.2, 'toast_machine');

    this.jamCauldron = new JamCauldron(this.scene, -15.5, -20.5);
    this.collision.addBox(-16.8, -14.2, -21.3, -19.7, 'jam_cauldron');

    this.agriculturalDecorations = new AgriculturalDecorations(this.scene);

    // Centralized Task Dispatcher & Multi-Agent Coordinator
    this.taskDispatcher = new AITaskDispatcher(this);

    this.createProgressionPads();
    this.unlockPads.forEach((pad, index) => {
      pad.requiredLevel = window.GameMechanics.getRequiredMarketLevel(index);
      pad.currentMarketLevel = this.progression.marketLevel;
      pad.updateLabel();
    });
  }

  createProgressionPads() {
    // Pad 1: 2nd Tomato Stand ($40)
    const pad1 = new UnlockPad(this.scene, -11.5, -7.0, 40, '2. DOMATES RAFI', () => {
      this.unlockedFeatures.shelf2 = true;
      this.shelf2 = new ShelfUnit(this.scene, -11.5, -9.5, 0, 'TOMATO');
      this.shelves.push(this.shelf2);
      this.collision.addBox(-12.8, -10.2, -10.3, -8.7, 'shelf2');
      this.showFloatingText('+$ YENİ RAF AÇILDI!', this.shelf2.group.position, '#2ecc71');
      window.Sound.playUnlock();
      this.saveState();
    });
    this.unlockPads.push(pad1);

    // Pad 2: Auto Cashier Staff Bot ($80)
    const pad2 = new UnlockPad(this.scene, 8.0, -2.5, 80, 'KASİYER', () => {
      this.unlockedFeatures.cashier = true;
      this.checkout.hasCashier = true;

      this.cashierBot = new Character3D(this.scene, 0x9b59b6, false);
      this.cashierBot.group.position.set(8.0, 0, -3.7);
      this.cashierBot.group.rotation.y = 0;

      this.showFloatingText('KASİYER İŞE ALINDI!', this.cashierBot.group.position, '#9b59b6');
      window.Sound.playUnlock();
      this.recordProgressEvent({ type: 'hireStaff', key: 'cashier' });
      this.saveState();
    });
    this.unlockPads.push(pad2);

    // Pad 3: Wheat Field & Flour Windmill ($120)
    const pad3 = new UnlockPad(this.scene, -5.5, 10.0, 120, 'BUĞDAY & DEĞİRMEN', () => {
      this.unlockedFeatures.wheat = true;

      this.wheatPlot = new GardenPlot(this.scene, -5.5, 12.5, 'WHEAT');
      this.plots.push(this.wheatPlot);
      this.collision.addBox(-7.2, -3.8, 11.0, 14.0, 'wheat_plot');

      this.flourMill = new FlourMill(this.scene, -12.5, 12.5);
      this.collision.addBox(-14.2, -10.8, 11.0, 14.0, 'flour_mill');

      this.showFloatingText('BUĞDAY VE DEĞİRMEN AÇILDI!', this.flourMill.group.position, '#f1c40f');
      window.Sound.playUnlock();
      this.applyUpgradeEffects();
      this.saveState();
    });
    this.unlockPads.push(pad3);

    // Pad 4: Bakery Oven & Bread Shelf ($180)
    const pad4 = new UnlockPad(this.scene, -11.5, -12.5, 180, 'FIRIN & EKMEK REYONU', () => {
      this.unlockedFeatures.bakery = true;

      this.bakeryOven = new BakeryOven(this.scene, -12.5, 18.5);
      this.collision.addBox(-14.2, -10.8, 17.0, 20.0, 'bakery_oven');

      this.breadShelf = new ShelfUnit(this.scene, -11.5, -15.0, 0, 'BREAD');
      this.shelves.push(this.breadShelf);
      this.collision.addBox(-12.8, -10.2, -15.8, -14.2, 'shelf_bread');

      this.showFloatingText('FIRIN & EKMEK REYONU AÇILDI!', this.bakeryOven.group.position, '#d35400');
      window.Sound.playUnlock();
      this.applyUpgradeEffects();
      this.saveState();
    });
    this.unlockPads.push(pad4);

    // Pad 5: Helper Staff Bot 1 - Market Stocker ($250)
    const pad5 = new UnlockPad(this.scene, -2.5, -1.0, 250, '1. PERSONEL (REYON)', () => {
      this.unlockedFeatures.helper = true;
      const helper = new StaffHelperAI(this.scene, this, 'STOCKER');
      this.helpers.push(helper);

      this.showFloatingText('1. YARDIMCI PERSONEL AKTİF!', helper.char.group.position, '#e67e22');
      window.Sound.playUnlock();
      this.applyUpgradeEffects();
      this.recordProgressEvent({ type: 'hireStaff', key: 'helper' });
      this.saveState();
    });
    this.unlockPads.push(pad5);

    // Pad 6: Cow Pen & Milk Station ($320)
    const pad6 = new UnlockPad(this.scene, 12.5, 4.0, 320, 'İNEK ÇİFTLİĞİ & SÜT', () => {
      this.unlockedFeatures.cow = true;
      this.cowPen = new CowPen(this.scene, 12.5, 6.5);
      this.collision.addBox(10.5, 14.5, 4.8, 8.2, 'cow_pen');

      this.showFloatingText('İNEK ÇİFTLİĞİ & TAZE SÜT AÇILDI!', this.cowPen.group.position, '#00cec9');
      window.Sound.playUnlock();
      this.applyUpgradeEffects();
      this.saveState();
    });
    this.unlockPads.push(pad6);

    // Pad 7: Cheese Processing Vat & Deli Cheese Shelf ($450)
    const pad7 = new UnlockPad(this.scene, 10.0, -7.0, 450, 'PEYNİR KAZANI & ŞARKÜTERİ', () => {
      this.unlockedFeatures.cheese = true;

      this.cheeseProcessor = new CheeseProcessor(this.scene, 12.5, 12.5);
      this.collision.addBox(11.0, 14.0, 11.0, 14.0, 'cheese_vat');

      this.cheeseShelf = new ShelfUnit(this.scene, 10.0, -9.5, 0, 'CHEESE');
      this.shelves.push(this.cheeseShelf);
      this.collision.addBox(8.7, 11.3, -10.3, -8.7, 'shelf_cheese');

      this.showFloatingText('PEYNİR KAZANI & ŞARKÜTERİ AÇILDI!', this.cheeseProcessor.group.position, '#fdcb6e');
      window.Sound.playUnlock();
      this.applyUpgradeEffects();
      this.saveState();
    });
    this.unlockPads.push(pad7);

    // Pad 8: Helper Staff Bot 2 - Logistics ($300)
    const pad8 = new UnlockPad(this.scene, 2.5, -1.0, 300, '2. PERSONEL (LOJİSTİK)', () => {
      this.unlockedFeatures.helper2 = true;
      const helper2 = new StaffHelperAI(this.scene, this, 'LOGISTICS');
      this.helpers.push(helper2);

      this.showFloatingText('2. YARDIMCI PERSONEL (LOJİSTİK) KATILDI!', helper2.char.group.position, '#0984e3');
      window.Sound.playUnlock();
      this.applyUpgradeEffects();
      this.saveState();
    });
    this.unlockPads.push(pad8);

    // Pad 9: Corn Garden Plot & Corn Stand ($380)
    const pad9 = new UnlockPad(this.scene, 5.5, 4.0, 380, 'MISIR & REYONU', () => {
      this.unlockedFeatures.corn = true;

      this.cornPlot = new GardenPlot(this.scene, 5.5, 6.5, 'CORN');
      this.plots.push(this.cornPlot);
      this.collision.addBox(3.8, 7.2, 5.0, 8.0, 'corn_plot');

      this.cornShelf = new ShelfUnit(this.scene, -5.5, -15.0, 0, 'CORN');
      this.shelves.push(this.cornShelf);
      this.collision.addBox(-6.8, -4.2, -15.8, -14.2, 'shelf_corn');

      this.showFloatingText('MISIR TARLASI & REYONU AÇILDI!', this.cornPlot.group.position, '#f1c40f');
      window.Sound.playUnlock();
      this.applyUpgradeEffects();
      this.saveState();
    });
    this.unlockPads.push(pad9);

    // Pad 10: Popcorn Machine & Warm Popcorn Shelf ($520)
    const pad10 = new UnlockPad(this.scene, 4.0, -12.5, 520, 'PATLAMIŞ MISIR', () => {
      this.unlockedFeatures.popcorn = true;

      this.popcornMaker = new PopcornMaker(this.scene, 17.0, 6.5);
      this.collision.addBox(15.6, 18.4, 5.2, 7.8, 'popcorn_maker');

      this.popcornShelf = new ShelfUnit(this.scene, 4.0, -15.0, 0, 'POPCORN');
      this.shelves.push(this.popcornShelf);
      this.collision.addBox(2.7, 5.3, -15.8, -14.2, 'shelf_popcorn');

      this.showFloatingText('PATLAMIŞ MISIR MAKİNESİ AÇILDI!', this.popcornMaker.group.position, '#e74c3c');
      window.Sound.playUnlock();
      this.applyUpgradeEffects();
      this.saveState();
    });
    this.unlockPads.push(pad10);

    // Pad 11: Apple Orchard & Cold-Press Juicer ($600)
    const pad11 = new UnlockPad(this.scene, 10.0, -12.5, 600, 'ELMA & MEYVE SUYU', () => {
      this.unlockedFeatures.apple = true;

      this.appleTree = new VoxelAppleTree(this.scene, 5.5, 18.5);
      this.collision.addBox(3.8, 7.2, 17.0, 20.0, 'apple_orchard');

      this.juicer = new Juicer(this.scene, 12.5, 18.5);
      this.collision.addBox(11.0, 14.0, 17.0, 20.0, 'juicer');

      this.juiceShelf = new ShelfUnit(this.scene, 10.0, -15.0, 0, 'APPLE_JUICE');
      this.shelves.push(this.juiceShelf);
      this.collision.addBox(8.7, 11.3, -15.8, -14.2, 'shelf_juice');

      this.showFloatingText('ELMA BAHÇESİ & SIKACAK AÇILDI!', this.appleTree.group.position, '#e74c3c');
      window.Sound.playUnlock();
      this.applyUpgradeEffects();
      this.saveState();
    });
    this.unlockPads.push(pad11);

    // Pad 12: Gourmet Apple Pie & Deli Stand ($750)
    const pad12 = new UnlockPad(this.scene, 4.0, -18.0, 750, 'GURME TURTA REYONU', () => {
      this.unlockedFeatures.pie = true;

      this.pieShelf = new ShelfUnit(this.scene, 4.0, -20.5, 0, 'APPLE_PIE');
      this.shelves.push(this.pieShelf);
      this.collision.addBox(2.7, 5.3, -21.3, -19.7, 'shelf_pie');

      this.showFloatingText('GURME ELMALI TURTA REYONU AÇILDI!', this.pieShelf.group.position, '#e67e22');
      window.Sound.playUnlock();
      this.applyUpgradeEffects();
      this.saveState();
    });
    this.unlockPads.push(pad12);

    // Pad 13: Helper Staff Bot 3 - Master Farmer ($500)
    const pad13 = new UnlockPad(this.scene, -2.5, 3.5, 500, '3. PERSONEL (USTA ÇİFTÇİ)', () => {
      this.unlockedFeatures.helper3 = true;
      this.helper3 = new StaffHelperAI(this.scene, this, 'FARMER');
      this.helpers.push(this.helper3);

      this.showFloatingText('3. PERSONEL (USTA ÇİFTÇİ) KATILDI!', this.helper3.char.group.position, '#27ae60');
      window.Sound.playUnlock();
      this.applyUpgradeEffects();
      this.saveState();
    });
    this.unlockPads.push(pad13);

    // Pad 14: Strawberry Farm & Sweet Strawberry Jam Shelf ($850)
    const pad14 = new UnlockPad(this.scene, -5.5, -18.0, 850, 'ÇİLEK & REÇEL REYONU', () => {
      this.unlockedFeatures.strawberry = true;

      this.strawberryPlot = new GardenPlot(this.scene, -5.5, 18.5, 'STRAWBERRY');
      this.plots.push(this.strawberryPlot);
      this.collision.addBox(-7.2, -3.8, 17.0, 20.0, 'strawberry_plot');

      this.strawberryShelf = new ShelfUnit(this.scene, -5.5, -20.5, 0, 'STRAWBERRY_JAM');
      this.shelves.push(this.strawberryShelf);
      this.collision.addBox(-6.8, -4.2, -21.3, -19.7, 'shelf_strawberry');

      this.showFloatingText('ÇİLEK TARLASI & REÇEL REYONU AÇILDI!', this.strawberryPlot.group.position, '#FF2A7A');
      window.Sound.playUnlock();
      this.applyUpgradeEffects();
      this.saveState();
    });
    this.unlockPads.push(pad14);

    // Pad 15: Crunchy Carrot Patch & Carrot Stand ($950)
    const pad15 = new UnlockPad(this.scene, -11.5, -18.0, 950, 'HAVUÇ & REYONU', () => {
      this.unlockedFeatures.carrot = true;

      this.carrotPlot = new GardenPlot(this.scene, 5.5, 12.5, 'CARROT');
      this.plots.push(this.carrotPlot);
      this.collision.addBox(3.8, 7.2, 11.0, 14.0, 'carrot_plot');

      this.carrotShelf = new ShelfUnit(this.scene, -11.5, -20.5, 0, 'CARROT');
      this.shelves.push(this.carrotShelf);
      this.collision.addBox(-12.8, -10.2, -21.3, -19.7, 'shelf_carrot');

      this.showFloatingText('HAVUÇ TARLASI & REYONU AÇILDI!', this.carrotPlot.group.position, '#FF793F');
      window.Sound.playUnlock();
      this.applyUpgradeEffects();
      this.saveState();
    });
    this.unlockPads.push(pad15);

    // Pad 16: Gelato Ice Cream Machine & Ice Cream Shelf ($1200)
    const pad16 = new UnlockPad(this.scene, 10.0, -18.0, 1200, 'DONDURMA MAKİNESİ', () => {
      this.unlockedFeatures.icecream = true;

      this.iceCreamMachine = new IceCreamMachine(this.scene, 17.0, 12.5);
      this.collision.addBox(15.6, 18.4, 11.0, 14.0, 'ice_cream_machine');

      this.iceCreamShelf = new ShelfUnit(this.scene, 10.0, -20.5, 0, 'ICE_CREAM');
      this.shelves.push(this.iceCreamShelf);
      this.collision.addBox(8.7, 11.3, -21.3, -19.7, 'shelf_icecream');

      this.showFloatingText('KREMALI DONDURMA MAKİNESİ AÇILDI!', this.iceCreamMachine.group.position, '#00CEC9');
      window.Sound.playUnlock();
      this.applyUpgradeEffects();
      this.saveState();
    });
    this.unlockPads.push(pad16);

    // Pad 17: Mediterranean Salad Prep Bar & Salad Bowl Stand ($1400)
    const pad17 = new UnlockPad(this.scene, 15.5, -18.0, 1400, 'SALATA BARI & AKDENİZ SALATASI', () => {
      this.unlockedFeatures.salad = true;

      this.saladPrepBar = new SaladPrepBar(this.scene, 17.0, 18.5);
      this.collision.addBox(15.6, 18.4, 17.0, 20.0, 'salad_prep_bar');

      this.saladShelf = new ShelfUnit(this.scene, 15.5, -20.5, 0, 'SALAD_BOWL');
      this.shelves.push(this.saladShelf);
      this.collision.addBox(14.2, 16.8, -21.3, -19.7, 'shelf_salad');

      this.showFloatingText('AKDENİZ SALATA BARI AÇILDI!', this.saladPrepBar.group.position, '#2ECC71');
      window.Sound.playUnlock();
      this.applyUpgradeEffects();
      this.saveState();
    });
    this.unlockPads.push(pad17);

    // Pad 18: Gourmet Pizza Stand & Crafting Line ($1650)
    const pad18 = new UnlockPad(this.scene, 15.5, -12.5, 1650, 'GURME PİZZA REYONU', () => {
      this.unlockedFeatures.pizza = true;

      this.pizzaShelf = new ShelfUnit(this.scene, 15.5, -15.0, 0, 'PIZZA');
      this.shelves.push(this.pizzaShelf);
      this.collision.addBox(14.2, 16.8, -15.8, -14.2, 'shelf_pizza');

      this.showFloatingText('GURME PİZZA REYONU AÇILDI! FIRINDA PİZZA PİŞİRİN!', this.pizzaShelf.group.position, '#FDCB6E');
      window.Sound.playUnlock();
      this.applyUpgradeEffects();
      this.saveState();
    });
    this.unlockPads.push(pad18);

    // Pad 19: Express Delivery Courier Desk & Dispatch Station ($1100)
    const pad19 = new UnlockPad(this.scene, 14.0, -3.0, 1100, 'EXPRESS KURYE & TESLİMAT', () => {
      this.unlockedFeatures.delivery = true;

      this.deliveryDesk = new DeliveryDesk(this.scene, 14.0, -5.0);
      this.collision.addBox(12.8, 15.2, -5.8, -4.2, 'delivery_desk');

      this.showFloatingText('EXPRESS KURYE TESLİMAT MASASI AÇILDI!', this.deliveryDesk.group.position, '#FFE600');
      window.Sound.playUnlock();
      this.applyUpgradeEffects();
      this.saveState();
    });
    this.unlockPads.push(pad19);

    // Pad 20: Helper Staff Bot 4 - Master Logistics Coordinator ($1500)
    const pad20 = new UnlockPad(this.scene, 2.5, 3.5, 1500, '4. PERSONEL (UZMAN LOJİSTİK)', () => {
      this.unlockedFeatures.helper4 = true;
      this.helper4 = new StaffHelperAI(this.scene, this, 'LOGISTICS');
      this.helpers.push(this.helper4);

      this.showFloatingText('4. PERSONEL (UZMAN LOJİSTİK) KATILDI!', this.helper4.char.group.position, '#FF2A7A');
      window.Sound.playUnlock();
      this.applyUpgradeEffects();
      this.saveState();
    });
    this.unlockPads.push(pad20);
  }

  // --- Controls & Inputs (Keyboard, Mouse Drag, Touch) ---
  initInputs() {
    window.addEventListener('keydown', (e) => {
      const isTyping = e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA');
      if (isTyping) {
        if (e.code === 'Escape') {
          e.target.blur();
        }
        return;
      }
      this.keys[e.code] = true;
      window.Sound.ensureContext();
      if (e.code === 'Escape') {
        if (this.isNeighborhoodOpen) this.closeNeighborhoodModal();
        if (this.isWikiOpen) this.closeWikiModal();
        if (this.isManagementOpen) this.closeManagementModal();
        if (this.isDayChoiceOpen && this.closeDayChoiceModal) this.closeDayChoiceModal();
      } else if (e.code === 'KeyH' || e.code === 'Tab') {
        e.preventDefault();
        this.toggleWikiModal();
      } else if (e.code === 'KeyM') {
        e.preventDefault();
        this.toggleNeighborhoodModal();
      } else if (this.isDevMode && (e.code === 'F1' || e.code === 'Backquote')) {
        e.preventDefault();
        this.toggleDebugModal();
      }
    });
    window.addEventListener('keyup', (e) => {
      this.keys[e.code] = false;
    });
    window.addEventListener('blur', () => { this.keys = {}; });

    const joystickContainer = document.getElementById('joystick-container');
    const joystickStick = document.getElementById('joystick-stick');
    let isDragging = false;
    let activePointerId = null;
    let startX = 0;
    let startY = 0;

    const handleStart = (clientX, clientY) => {
      isDragging = true;
      startX = clientX;
      startY = clientY;
      window.Sound.ensureContext();
    };

    const handleMove = (clientX, clientY) => {
      if (!isDragging) return;
      const maxRadius = Math.max(1, (joystickContainer.clientWidth - joystickStick.clientWidth) / 2);
      const dx = clientX - startX;
      const dy = clientY - startY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > 0) {
        const clampedDist = Math.min(dist, maxRadius);
        const angle = Math.atan2(dy, dx);
        const stickX = Math.cos(angle) * clampedDist;
        const stickY = Math.sin(angle) * clampedDist;

        joystickStick.style.transform = `translate(${stickX}px, ${stickY}px)`;
        this.joystickInput.set(stickX / maxRadius, stickY / maxRadius);
      }
    };

    const handleEnd = () => {
      isDragging = false;
      joystickStick.style.transform = 'translate(0px, 0px)';
      this.joystickInput.set(0, 0);
    };

    joystickContainer.addEventListener('pointerdown', (e) => {
      if (activePointerId !== null) return;
      e.preventDefault();
      activePointerId = e.pointerId;
      joystickContainer.setPointerCapture(e.pointerId);
      handleStart(e.clientX, e.clientY);
    });
    joystickContainer.addEventListener('pointermove', (e) => {
      if (e.pointerId !== activePointerId) return;
      e.preventDefault();
      handleMove(e.clientX, e.clientY);
    });
    const endJoystickPointer = (e) => {
      if (e.pointerId !== activePointerId) return;
      activePointerId = null;
      handleEnd();
    };
    joystickContainer.addEventListener('pointerup', endJoystickPointer);
    joystickContainer.addEventListener('pointercancel', endJoystickPointer);
    window.addEventListener('blur', () => { activePointerId = null; handleEnd(); });

    this.canvas.addEventListener('mousedown', (e) => {
      handleStart(e.clientX, e.clientY);
    });

    window.addEventListener('mousemove', (e) => {
      handleMove(e.clientX, e.clientY);
    });

    window.addEventListener('mouseup', () => handleEnd());
  }

  // --- UI & HUD Setup ---
  initUI() {
    this.moneyDisplay = document.getElementById('money-display');
    this.capacityBubble = document.getElementById('capacity-indicator');
    this.capacityText = document.getElementById('capacity-text');
    this.objectiveText = document.getElementById('objective-text');
    this.floatingContainer = document.getElementById('floating-texts');
    this.bottomObjectiveTitle = document.getElementById('objective-title');
    this.bottomObjectiveIcon = document.getElementById('objective-icon');
    this.questProgressEl = document.getElementById('quest-progress');
    this.questRewardEl = document.getElementById('quest-reward');
    this.marketLevelEl = document.getElementById('market-level');
    this.marketXpEl = document.getElementById('market-xp');
    this.marketDayEl = document.getElementById('market-day');
    this.dayClockEl = document.getElementById('day-clock');
    this.demandBadge = document.getElementById('demand-badge');
    this.demandTitleEl = document.getElementById('demand-title');
    this.demandProgressEl = document.getElementById('demand-progress');
    this.daySummaryCard = document.getElementById('day-summary-card');
    this.daySummaryBody = document.getElementById('day-summary-body');
    this.specializationTitleEl = document.getElementById('specialization-title');
    this.specializationEffectEl = document.getElementById('specialization-effect');
    this.specializationButtons = Array.from(document.querySelectorAll('.specialization-btn'));
    this.nextUnlockEl = document.getElementById('next-unlock');
    this.sideQuestListEl = document.getElementById('side-quest-list');
    this.pricingProductsEl = document.getElementById('pricing-products');
    this.staffPrioritiesEl = document.getElementById('staff-priorities');
    this.stockTargetsEl = document.getElementById('stock-targets');
    this.dailyQuestStatusEl = document.getElementById('daily-quest-status');
    this.weeklyGoalStatusEl = document.getElementById('weekly-goal-status');
    this.levelBadgeEl = document.getElementById('level-badge');
    this.offlineNoticeEl = document.getElementById('offline-notice');
    this.offlineNoticeTextEl = document.getElementById('offline-notice-text');
    document.getElementById('offline-notice-close')?.addEventListener('click', () => this.offlineNoticeEl?.classList.add('hidden'));
    const managementToggle = document.getElementById('management-toggle');
    managementToggle?.addEventListener('click', () => {
      const panel = document.getElementById('specialization-panel');
      const isOpen = panel.classList.toggle('open');
      managementToggle.setAttribute('aria-expanded', String(isOpen));
      managementToggle.querySelector('span').textContent = isOpen ? '−' : '+';
    });
    const hudMenuToggle = document.getElementById('hud-menu-toggle');
    const topActions = document.getElementById('top-actions');
    hudMenuToggle?.addEventListener('click', (event) => {
      event.stopPropagation();
      const isOpen = topActions.classList.toggle('open');
      hudMenuToggle.setAttribute('aria-expanded', String(isOpen));
    });
    document.addEventListener('click', (event) => {
      if (!topActions?.classList.contains('open')) return;
      if (event.target.closest('.top-menu')) return;
      topActions.classList.remove('open');
      hudMenuToggle?.setAttribute('aria-expanded', 'false');
    });

    // Sprint Dash Button (Touch & Mouse)
    const sprintBtn = document.getElementById('sprint-btn');
    if (sprintBtn) {
      const startSprint = () => {
        this.touchSprintActive = true;
        sprintBtn.classList.add('active');
        window.Sound.ensureContext();
      };
      const stopSprint = () => {
        this.touchSprintActive = false;
        sprintBtn.classList.remove('active');
      };
      sprintBtn.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        sprintBtn.setPointerCapture(e.pointerId);
        startSprint();
      });
      sprintBtn.addEventListener('pointerup', stopSprint);
      sprintBtn.addEventListener('pointercancel', stopSprint);
      sprintBtn.addEventListener('lostpointercapture', stopSprint);
      sprintBtn.addEventListener('keydown', (e) => { if (e.code === 'Space' || e.code === 'Enter') startSprint(); });
      sprintBtn.addEventListener('keyup', stopSprint);
      window.addEventListener('blur', stopSprint);
    }

    // Sound toggle
    const soundBtn = document.getElementById('sound-btn');
    const soundIcon = document.getElementById('sound-icon');
    if (soundBtn) {
      soundBtn.addEventListener('click', () => {
        const isMuted = window.Sound.toggleMute();
        soundIcon.innerHTML = isMuted ? BRUTAL_ICONS.SOUND_OFF : BRUTAL_ICONS.SOUND_ON;
      });
    }

    // Reset button
    const resetBtn = document.getElementById('reset-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (confirm('Tüm oyunu sıfırlayıp baştan başlamak istiyor musunuz?')) {
          localStorage.removeItem('mini_mart_save');
          window.location.reload();
        }
      });
    }

    this.initUpgradeUI();
    this.initWikiUI();
    this.initDebugUI();
    this.initManagementTabs();
    this.updateMoneyUI();
    this.updateComboUI();
    this.renderProgressionHud();
    this.renderDayHud();
    this.ensureDailyDemand();
    this.initSpecializationUI();
    this.initPricingUI();
    this.initOperationsUI();
    this.renderPricingUI();
    this.renderOperationsUI();
    this.renderRetentionHud();
    this.initAppearanceUI();
    this.renderSideQuestUI();
    this.initNeighborhoodUI();
    this.initDayChoiceUI();
  }

  renderSideQuestUI() {
    if (!this.sideQuestListEl) return;
    const cards = window.GameMechanics.getSideQuestCards(this.progression);
    this.sideQuestListEl.replaceChildren();
    cards.forEach(card => {
      const row = document.createElement('div');
      row.className = `side-quest-card${card.claimed ? ' complete' : ''}`;
      const title = document.createElement('strong');
      title.textContent = card.title;
      const status = document.createElement('span');
      const cosmeticName = { coral: 'MERCAN TABELA', violet: 'MOR TABELA', sparkleSign: 'ALTIN TABELA ÇERÇEVESİ' }[card.cosmetic];
      status.textContent = `${card.progress}/${card.target} · ${card.claimed ? 'TAMAM' : `${card.rewardText} · ${cosmeticName}`}`;
      const meter = document.createElement('progress');
      meter.max = card.target;
      meter.value = card.progress;
      meter.setAttribute('aria-label', `${card.title} ilerleme`);
      row.append(title, status, meter);
      this.sideQuestListEl.appendChild(row);
    });
    if (this.marketThemeEl) {
      const unlockedThemes = this.cosmetics.unlockedThemes || [];
      ['coral', 'violet'].forEach(theme => {
        const option = this.marketThemeEl.querySelector(`option[value="${theme}"]`);
        if (!option) return;
        const unlocked = unlockedThemes.includes(theme) || this.progression.quests.side[theme === 'coral' ? 'harvest_20' : 'stock_25'].claimed;
        option.disabled = !unlocked;
        option.textContent = `${theme === 'coral' ? 'MERCAN' : 'MOR'}${unlocked ? '' : ' · GÖREV KİLİDİ'}`;
      });
    }
  }

  initAppearanceUI() {
    this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.appearanceKey = null;
    this.marketThemeEl = document.getElementById('market-theme');
    this.transferEffectsEl = document.getElementById('transfer-effects');
    this.visualLevelStatusEl = document.getElementById('visual-level-status');
    this.marketThemeEl?.addEventListener('change', () => {
      this.cosmetics.theme = this.marketThemeEl.value;
      this.updateMarketAppearance();
      this.saveState();
    });
    this.transferEffectsEl?.addEventListener('change', () => {
      this.cosmetics.transferEffects = this.transferEffectsEl.checked;
      this.updateMarketAppearance();
      this.saveState();
    });
    this.updateMarketAppearance();
    this.renderSideQuestUI();
  }

  effectsEnabled() {
    return this.cosmetics.transferEffects ?? !this.prefersReducedMotion;
  }

  playTransferEffect(from, to, itemType, cash = false) {
    if (!this.effectsEnabled()) return;
    this.particleFX?.spawnTransfer(from, to, cash ? 0x25d366 : (ITEM_TYPES[itemType]?.color || 0xffe600), cash);
  }

  updateMarketAppearance() {
    if (!this.marketSign) return;
    const palette = { yellow: 0xffe600, mint: 0x25d366, coral: 0xff5252, violet: 0xa29bfe };
    const theme = Object.hasOwn(palette, this.cosmetics.theme) ? this.cosmetics.theme : 'yellow';
    const level = Math.min(4, Math.max(1, this.progression.marketLevel));
    const key = `${theme}:${level}:${this.effectsEnabled()}:${!!this.cosmetics.sparkleSign}`;
    if (key === this.appearanceKey) return;
    if (key !== this.appearanceKey) {
      const previousLevel = this.appearanceLevel;
      this.marketSign.material.color.setHex(palette[theme]);
      this.marketSign.material.emissive.setHex(palette[theme]);
      this.marketSign.material.emissiveIntensity = (level - 1) * 0.12;
      this.marketSignTrim.material.color.setHex(this.cosmetics.sparkleSign ? 0xffe600 : 0x000000);
      this.marketLevelBlocks.forEach((block, index) => {
        block.visible = index < level;
        block.material.color.setHex(palette[theme]);
      });
      if (previousLevel && level > previousLevel && !this.isLoadingSave && this.effectsEnabled()) {
        this.particleFX?.spawnGoldenSparkles(this.player.group.position, 12);
      }
      this.appearanceKey = key;
      this.appearanceLevel = level;
    }
    if (this.marketThemeEl) this.marketThemeEl.value = theme;
    if (this.transferEffectsEl) this.transferEffectsEl.checked = this.effectsEnabled();
    if (this.visualLevelStatusEl) this.visualLevelStatusEl.textContent = `Tabela: ${level}/4 blok · Market seviyesiyle gelişir`;
  }

  updateMoneyUI() {
    if (this.moneyDisplay) {
      this.moneyDisplay.textContent = this.money;
    }
  }

  updateComboUI() {
    const badge = document.getElementById('combo-badge');
    const multiplierEl = document.getElementById('combo-multiplier');
    if (!badge || !multiplierEl) return;

    if (this.comboMultiplier > 1.0) {
      badge.classList.remove('hidden');
      badge.classList.add('active');
      multiplierEl.textContent = `x${this.comboMultiplier.toFixed(1)}`;
    } else {
      badge.classList.remove('active');
      badge.classList.add('hidden');
    }
  }

  recordProgressEvent(event) {
    if (this.isLoadingSave) return;
    const previousRewardsCount = this.progression && this.progression.rewards ? this.progression.rewards.length : 0;
    this.progression = window.GameMechanics.recordProgressEvent(this.progression, event);
    const newRewards = this.progression.rewards.slice(previousRewardsCount);

    newRewards.forEach(reward => {
      if (reward.money) {
        this.money += reward.money;
        this.updateMoneyUI();
      }
      if (reward.cosmetic === 'coral' || reward.cosmetic === 'violet') {
        const unlockedThemes = new Set(this.cosmetics.unlockedThemes || []);
        unlockedThemes.add(reward.cosmetic);
        this.cosmetics.unlockedThemes = [...unlockedThemes];
      }
      if (reward.cosmetic === 'sparkleSign') this.cosmetics.sparkleSign = true;
      const cosmeticLabel = { coral: 'MERCAN TABELA', violet: 'MOR TABELA', sparkleSign: 'ALTIN ÇERÇEVE' }[reward.cosmetic];
      this.showFloatingText(`GÖREV TAMAM +$${reward.money} / +${reward.xp} XP${cosmeticLabel ? ` / ${cosmeticLabel}` : ''}`, this.player.group.position, '#FFE600');
      this.dayState = window.GameMechanics.recordDayEvent(this.dayState, { type: 'questCompleted' });
      window.Sound.playUnlock();
    });

    const retentionResult = window.GameMechanics.recordRetentionEvent(this.retention, event);
    this.retention = retentionResult.state;
    retentionResult.rewards.forEach(reward => {
      this.money += reward.money;
      this.progression = window.GameMechanics.grantProgressionXp(this.progression, reward.xp);
      if (reward.cosmetic === 'goldBadge') this.cosmetics.goldBadge = true;
      this.dayState = window.GameMechanics.recordDayEvent(this.dayState, { type: 'questCompleted' });
      this.updateMoneyUI();
      this.showFloatingText(`${reward.type === 'daily' ? 'GÜNLÜK' : 'HAFTALIK'} HEDEF +$${reward.money} / +${reward.xp} XP`, this.player.group.position, '#FFE600');
      window.Sound.playUnlock();
    });

    this.renderProgressionHud();
    this.renderSideQuestUI();
    this.updateMarketAppearance();
    if (this.isUpgradeModalOpen && newRewards.length > 0) this.renderUpgrades();
    this.renderRetentionHud();
    this.saveState();
  }

  renderRetentionHud() {
    if (!this.retention) return;
    const daily = window.GameMechanics.getDailyQuestInfo(this.retention);
    const dailyState = this.retention.daily;
    const weeklyState = this.retention.weekly;
    if (this.dailyQuestStatusEl) {
      this.dailyQuestStatusEl.textContent = `GÜNLÜK: ${daily.title} ${dailyState.progress}/${daily.target} · ${dailyState.claimed ? 'TAMAM' : '+$100 / +20 XP'}`;
      this.dailyQuestStatusEl.classList.toggle('complete', dailyState.claimed);
    }
    if (this.weeklyGoalStatusEl) {
      this.weeklyGoalStatusEl.textContent = `HAFTALIK: 40 Ürün Sat ${weeklyState.progress}/40 · ${weeklyState.claimed ? 'TAMAM' : 'ALTIN SEVİYE ÇERÇEVESİ +$250 / +50 XP'}`;
      this.weeklyGoalStatusEl.classList.toggle('complete', weeklyState.claimed);
    }
    if (this.levelBadgeEl) this.levelBadgeEl.classList.toggle('gold-badge', !!this.cosmetics.goldBadge);
  }

  recordDayEvent(event) {
    if (this.isLoadingSave) return;
    this.dayState = window.GameMechanics.recordDayEvent(this.dayState, event);
    if (event && event.type === 'sale') {
      const nextDemand = window.GameMechanics.recordDemandSale(this.dailyDemand, event);
      if (nextDemand && nextDemand.rewardReady) {
        this.money += nextDemand.rewardReady;
        this.updateMoneyUI();
        this.showFloatingText(`TOPLU SİPARİŞ +$${nextDemand.rewardReady}`, this.player.group.position, '#FFE600');
        window.Sound.playUnlock();
      }
      this.dailyDemand = nextDemand;
    }
    this.renderDayHud();
  }

  updateDayCycle(delta) {
    if (this.isLoadingSave) return;
    const currentDayKey = window.GameMechanics.getCalendarKeys().day;
    if (this.retention.daily.key !== currentDayKey) {
      this.retention = window.GameMechanics.createRetentionState(this.retention);
      this.renderRetentionHud();
      this.saveState();
    }
    const previousSummaryKey = this.dayState && this.dayState.lastSummary ? `${this.dayState.lastSummary.day}` : null;
    this.dayState = window.GameMechanics.advanceDayClock(this.dayState, delta);
    const summary = this.dayState.lastSummary;
    const summaryKey = summary ? `${summary.day}` : null;
    if (summary && summaryKey !== previousSummaryKey && summaryKey !== this.lastShownDaySummary) {
      this.lastShownDaySummary = summaryKey;
      this.showDaySummary(summary);
      this.dailyDemand = null;
      this.ensureDailyDemand();
      this.presentDayChoices();
      this.saveState();
    }
    this.renderDayHud();
  }

  renderDayHud() {
    if (!this.dayState) return;
    const remaining = Math.max(0, Math.ceil(this.dayState.dayLengthSeconds - this.dayState.elapsedSeconds));
    const minutes = Math.floor(remaining / 60).toString().padStart(2, '0');
    const seconds = Math.floor(remaining % 60).toString().padStart(2, '0');
    if (this.marketDayEl) this.marketDayEl.textContent = `GÜN ${this.dayState.day}`;
    if (this.dayClockEl) this.dayClockEl.textContent = `${minutes}:${seconds}`;
    this.renderDemandHud();
  }

  getAvailableDemandItems() {
    const shelfTypes = [...new Set((this.shelves || []).filter(shelf => shelf && shelf.itemType).map(shelf => shelf.itemType))];
    return shelfTypes.length > 0 ? shelfTypes : ['TOMATO'];
  }

  ensureDailyDemand() {
    if (!this.dayState) return;
    if (!this.dailyDemand || this.dailyDemand.day !== this.dayState.day) {
      this.dailyDemand = window.GameMechanics.createDailyDemandEvent(this.dayState.day, this.getAvailableDemandItems());
    }
    this.renderDemandHud();
  }

  renderDemandHud() {
    if (!this.demandBadge || !this.dailyDemand || !this.dailyDemand.bulkOrder) return;
    const order = this.dailyDemand.bulkOrder;
    this.demandBadge.classList.remove('hidden');
    if (this.demandTitleEl) this.demandTitleEl.textContent = this.dailyDemand.label;
    if (this.demandProgressEl) {
      const status = order.claimed ? 'TAMAM' : `${order.progress} / ${order.target}`;
      this.demandProgressEl.textContent = `${status} +$${order.reward}`;
    }
  }

  showDaySummary(summary) {
    if (!this.daySummaryCard || !this.daySummaryBody) return;
    this.daySummaryBody.innerHTML = `
      <div>Gün: ${summary.day}</div>
      <div>Gelir: $${summary.salesRevenue}</div>
      <div>Satılan ürün: ${summary.customersServed}</div>
      <div>En çok satan: ${summary.topItem}</div>
      <div>Tamamlanan görev: ${summary.completedQuests}</div>
    `;
    this.daySummaryCard.classList.remove('hidden');
    window.setTimeout(() => {
      if (this.daySummaryCard) this.daySummaryCard.classList.add('hidden');
    }, 6500);
  }

  initSpecializationUI() {
    this.specializationButtons.forEach(button => {
      button.addEventListener('click', () => {
        this.specialization = window.GameMechanics.setSpecialization(this.specialization, button.dataset.specialization);
        this.renderSpecializationUI();
        this.saveState();
        window.Sound.playCoin();
      });
    });
    this.renderSpecializationUI();
  }

  renderSpecializationUI() {
    const info = window.GameMechanics.getSpecializationInfo(this.specialization);
    if (this.specializationTitleEl) this.specializationTitleEl.textContent = info.label.toUpperCase();
    if (this.specializationEffectEl) {
      this.specializationEffectEl.textContent = info.boostedItems.length
        ? `Bu ürün ailesinde +%15 satış geliri`
        : 'Dengeli satış fiyatı';
    }
    this.specializationButtons.forEach(button => {
      button.classList.toggle('active', button.dataset.specialization === this.specialization.active);
    });
  }

  initManagementTabs() {
    this.managementTabs = Array.from(document.querySelectorAll('[data-management-tab]'));
    this.managementPanels = Array.from(document.querySelectorAll('[data-management-panel]'));
    this.managementTabs.forEach(button => {
      button.addEventListener('click', () => this.setManagementTab(button.dataset.managementTab));
    });
    this.setManagementTab(this.managementTabs.find(tab => tab.classList.contains('active'))?.dataset.managementTab || 'overview');
  }

  setManagementTab(tabName) {
    this.managementTabs?.forEach(button => {
      const isActive = button.dataset.managementTab === tabName;
      button.classList.toggle('active', isActive);
      button.setAttribute('aria-selected', String(isActive));
    });
    this.managementPanels?.forEach(panel => {
      const isActive = panel.dataset.managementPanel === tabName;
      panel.classList.toggle('active', isActive);
      panel.hidden = !isActive;
    });
  }

  getSalePrice(itemType, basePrice) {
    const specializedPrice = window.GameMechanics.getSpecializedPrice(basePrice, itemType, this.specialization);
    return window.GameMechanics.getPricedAmount(specializedPrice, itemType, this.pricing);
  }

  initPricingUI() {
    if (!this.pricingProductsEl) return;
    this.pricingProductsEl.addEventListener('change', event => {
      const selector = event.target;
      if (!selector.matches('select[data-item-type]')) return;
      this.pricing = window.GameMechanics.setProductPricingMode(this.pricing, selector.dataset.itemType, selector.value);
      this.saveState();
      window.Sound.playCoin();
    });
  }

  renderPricingUI() {
    if (!this.pricingProductsEl) return;
    this.pricingProductsEl.replaceChildren();
    const itemTypes = this.getAvailableDemandItems();
    itemTypes.forEach(itemType => {
      const row = document.createElement('label');
      row.className = 'pricing-row';
      const name = document.createElement('span');
      name.textContent = (ITEM_TYPES[itemType] || { name: itemType }).name;
      const selector = document.createElement('select');
      selector.dataset.itemType = itemType;
      selector.setAttribute('aria-label', `${name.textContent} fiyat modu`);
      [['economy', 'EKONOMİK'], ['standard', 'STANDART'], ['premium', 'PREMIUM']].forEach(([value, label]) => {
        const option = document.createElement('option');
        option.value = value;
        option.textContent = label;
        selector.appendChild(option);
      });
      selector.value = window.GameMechanics.getProductPricingMode(this.pricing, itemType);
      row.append(name, selector);
      this.pricingProductsEl.appendChild(row);
    });
  }

  initOperationsUI() {
    if (!this.staffPrioritiesEl || !this.stockTargetsEl) return;
    this.staffPrioritiesEl.addEventListener('change', event => {
      const selector = event.target;
      if (!selector.matches('select[data-helper-id]')) return;
      this.staffSettings = window.GameMechanics.setStaffPriority(this.staffSettings, Number(selector.dataset.helperId), selector.value);
      this.saveState();
      window.Sound.playCoin();
    });
    this.stockTargetsEl.addEventListener('change', event => {
      const selector = event.target;
      if (!selector.matches('select[data-stock-item]')) return;
      this.storage = window.GameMechanics.setStockTarget(this.storage, selector.dataset.stockItem, Number(selector.value));
      this.saveState();
      window.Sound.playCoin();
    });
  }

  renderOperationsUI() {
    if (!this.staffPrioritiesEl || !this.stockTargetsEl) return;
    this.staffPrioritiesEl.replaceChildren();
    this.stockTargetsEl.replaceChildren();
    (this.helpers || []).forEach(helper => {
      const row = document.createElement('label');
      row.className = 'pricing-row';
      const name = document.createElement('span');
      name.textContent = `PERSONEL ${helper.id}`;
      const selector = document.createElement('select');
      selector.dataset.helperId = helper.id;
      selector.setAttribute('aria-label', `${name.textContent} önceliği`);
      [['balanced', 'DENGELİ'], ['stocking', 'RAF'], ['production', 'ÜRETİM'], ['service', 'HİZMET'], ['security', 'GÜVENLİK']].forEach(([value, label]) => {
        const option = document.createElement('option');
        option.value = value;
        option.textContent = label;
        selector.appendChild(option);
      });
      selector.value = window.GameMechanics.getStaffPriority(this.staffSettings, helper.id);
      row.append(name, selector);
      this.staffPrioritiesEl.appendChild(row);
    });
    if (!this.helpers || this.helpers.length === 0) {
      this.staffPrioritiesEl.textContent = 'Henüz personel işe alınmadı.';
    }
    this.getAvailableDemandItems().forEach(itemType => {
      const row = document.createElement('label');
      row.className = 'pricing-row';
      const name = document.createElement('span');
      name.textContent = (ITEM_TYPES[itemType] || { name: itemType }).name;
      const selector = document.createElement('select');
      selector.dataset.stockItem = itemType;
      selector.setAttribute('aria-label', `${name.textContent} raf stok hedefi`);
      [[4, '4 / 16'], [8, '8 / 16'], [16, '16 / 16']].forEach(([value, label]) => {
        const option = document.createElement('option');
        option.value = value;
        option.textContent = label;
        selector.appendChild(option);
      });
      selector.value = String(window.GameMechanics.getStockTarget(this.storage, itemType, 16));
      row.append(name, selector);
      this.stockTargetsEl.appendChild(row);
    });
  }

  renderProgressionHud() {
    if (!this.progression) return;
    this.updateMarketAppearance();
    const card = window.GameMechanics.getActiveProgressionCard(this.progression);
    const svgIcon = BRUTAL_ICONS[card.iconKey] || BRUTAL_ICONS.STAR || BRUTAL_ICONS.TOMATO;
    const text = `${card.title} ${card.progress}/${card.target}`;

    if (this.marketLevelEl) this.marketLevelEl.textContent = this.progression.marketLevel;
    if (this.marketXpEl) this.marketXpEl.textContent = `${this.progression.xp} XP`;
    const nextLockedPad = this.unlockPads.find(pad => !pad.isUnlocked && pad.requiredLevel > this.progression.marketLevel);
    const hint = nextLockedPad ? `SONRAKİ AÇILIŞ: ${nextLockedPad.title} · SEVİYE ${nextLockedPad.requiredLevel}` : 'TÜM SEVİYE AÇILIŞLARI ERİŞİLEBİLİR';
    if (this.nextUnlockEl && this.nextUnlockEl.textContent !== hint) this.nextUnlockEl.textContent = hint;
    const hudKey = `${card.kind}|${card.title}|${card.progress}|${card.target}|${card.rewardText}|${this.progression.marketLevel}|${this.progression.xp}`;
    if (hudKey === this.lastProgressionHudKey) return;
    this.lastProgressionHudKey = hudKey;
    if (this.questProgressEl) this.questProgressEl.textContent = `${card.progress} / ${card.target}`;
    if (this.questRewardEl) this.questRewardEl.textContent = card.rewardText;
    if (this.bottomObjectiveTitle && this.bottomObjectiveIcon) {
      this.bottomObjectiveTitle.textContent = card.title;
      this.bottomObjectiveIcon.innerHTML = svgIcon;
    }
    if (this.objectiveText) {
      this.objectiveText.innerHTML = `${svgIcon} <span style="margin-left:6px;">${text}</span>`;
    }
  }

  registerCheckoutCombo() {
    this.checkoutComboCount++;
    this.comboTimer = 7.0; // 7-second window to chain consecutive customer checkouts
    if (this.checkoutComboCount >= 8) {
      this.comboMultiplier = 3.0;
    } else if (this.checkoutComboCount >= 5) {
      this.comboMultiplier = 2.0;
    } else if (this.checkoutComboCount >= 3) {
      this.comboMultiplier = 1.5;
    } else if (this.checkoutComboCount >= 2) {
      this.comboMultiplier = 1.2;
    } else {
      this.comboMultiplier = 1.0;
    }
    this.updateComboUI();
    if (this.comboMultiplier > 1.0) {
      this.showFloatingText(`COMBO x${this.comboMultiplier.toFixed(1)}!`, this.player.group.position, '#FFE600');
    }
  }

  updateCombo(delta) {
    if (this.comboTimer > 0) {
      this.comboTimer -= delta;
      if (this.comboTimer <= 0) {
        this.checkoutComboCount = 0;
        this.comboMultiplier = 1.0;
        this.updateComboUI();
      }
    }
  }

  updateSpills(delta) {
    // Floor spill spawn timer
    this.spillSpawnTimer -= delta;
    if (this.spillSpawnTimer <= 0 && this.spills.length < 3 && this.shelves.length >= 3) {
      // Spawn random soda spill inside store retail area
      const sx = (Math.random() - 0.5) * 14.0;
      const sz = -2.0 - Math.random() * 6.0;
      const spill = new SodaSpill(this.scene, sx, sz);
      this.spills.push(spill);
      this.spillSpawnTimer = 35.0 + Math.random() * 25.0;
      this.showFloatingText('UYARI: YERDE İÇECEK DÖKÜNTÜSÜ!', new THREE.Vector3(sx, 0, sz), '#FF7675');
    }

    const pPos = this.player.group.position;
    for (let i = this.spills.length - 1; i >= 0; i--) {
      const spill = this.spills[i];
      if (spill && typeof spill.update === 'function') {
        spill.update(delta);
      }

      // Player clean interaction
      const dist = pPos.distanceTo(spill.group.position);
      if (dist < 1.4 && !spill.isCleaned) {
        spill.clean();
        this.money += 50;
        this.updateMoneyUI();
        window.Sound.playPop();
        this.showFloatingText('TEMİZLİK BONUSU +$50!', spill.group.position, '#00CEC9');
      }

      // Customer slowdown / slip effect
      if (!spill.isCleaned) {
        this.customers.forEach(c => {
          if (c.char && c.char.group.position.distanceTo(spill.group.position) < 1.2) {
            c.char.velocity.multiplyScalar(0.4);
          }
        });
      }

      if (spill.isCleaned) {
        this.spills.splice(i, 1);
      }
    }
  }

  // --- Developer & Debug Modal System ---
  initDebugUI() {
    const debugBtn = document.getElementById('debug-btn');
    const debugModal = document.getElementById('debug-modal');
    const debugCloseBtn = document.getElementById('debug-close-btn');
    const controlsGuide = document.querySelector('.controls-guide span');

    if (!this.isDevMode) {
      if (debugBtn) debugBtn.classList.add('hidden');
      if (debugModal) debugModal.classList.add('hidden');
      if (controlsGuide) {
        controlsGuide.innerHTML = 'Hareket: <b>W, A, S, D</b> / <b>Yön Tuşları</b> • Depar: <b>[SHIFT]</b> / <b>[SPACE]</b> • Rehber: <b>[TAB]</b> / <b>[H]</b>';
      }
      return;
    }

    if (debugBtn) {
      debugBtn.addEventListener('click', () => {
        this.openDebugModal();
      });
    }

    if (debugCloseBtn) {
      debugCloseBtn.addEventListener('click', () => {
        this.closeDebugModal();
      });
    }

    if (debugModal) {
      debugModal.addEventListener('click', (e) => {
        if (e.target === debugModal) {
          this.closeDebugModal();
        }
      });
    }

    // Money Buttons
    const bindBtn = (id, fn) => {
      const b = document.getElementById(id);
      if (b) b.addEventListener('click', () => { fn(); window.Sound.playCoin(); });
    };

    bindBtn('dbg-cash-100', () => { this.money += 100; this.updateMoneyUI(); });
    bindBtn('dbg-cash-1k', () => { this.money += 1000; this.updateMoneyUI(); });
    bindBtn('dbg-cash-10k', () => { this.money += 10000; this.updateMoneyUI(); });
    bindBtn('dbg-cash-100k', () => { this.money += 100000; this.updateMoneyUI(); });

    // Unlock All 20 progression pads
    bindBtn('dbg-unlock-all', () => {
      this.unlockPads.forEach(pad => {
        if (!pad.isUnlocked) {
          pad.pay(pad.remainingCost);
        }
      });
      this.showFloatingText('TÜMÜ AÇILDI!', this.player.group.position, '#FFE600');
    });

    // Max All Upgrades
    bindBtn('dbg-max-upgrades', () => {
      Object.keys(UPGRADE_CONFIG).forEach(k => {
        this.upgrades[k] = UPGRADE_CONFIG[k].levels.length;
      });
      this.applyUpgradeEffects();
      this.renderUpgrades();
      this.showFloatingText('YÜKSELTMELER FULL!', this.player.group.position, '#00CEC9');
    });

    // Spawn VIP Customer
    bindBtn('dbg-spawn-vip', () => {
      let vipSpot = this.parkingLot ? this.parkingLot.reserveSpot('CAR') : null;
      let vipVehicle = null;
      let spawnPos;
      if (vipSpot) {
        vipVehicle = new VoxelVehicle(this.scene, 'VIP');
        vipVehicle.group.position.set(vipSpot.x, 0, vipSpot.z);
        vipVehicle.group.rotation.y = 0;
        vipSpot.vehicle = vipVehicle;
        spawnPos = new THREE.Vector3(vipSpot.x + 0.9, 0, vipSpot.z + 0.3);
      } else {
        spawnPos = new THREE.Vector3(0, 0, -25.5);
      }
      const vip = new VIPCustomerAI(this.scene, spawnPos, this.shelves, this.checkout, 'VIP', vipSpot, vipVehicle);
      this.customers.push(vip);
      this.showFloatingText('VIP GELDİ!', vip.char.group.position, '#FFE600');
    });

    // Spawn Thief
    bindBtn('dbg-spawn-thief', () => {
      const spawnPos = new THREE.Vector3((Math.random() - 0.5) * 4.0, 0, -25.5);
      const thief = new ShoplifterAI(this.scene, spawnPos, this.shelves, () => {});
      this.customers.push(thief);
      this.showFloatingText('HIRSIZ GELDİ!', thief.char.group.position, '#FF5252');
    });

    // Trigger Rush Hour
    bindBtn('dbg-rush-hour', () => {
      this.isRushHour = true;
      this.rushHourTimer = 30.0;
      const banner = document.getElementById('rush-hour-banner');
      if (banner) banner.classList.remove('hidden');
      this.showFloatingText('RUSH HOUR AKTİF!', this.player.group.position, '#FFE600');
    });

    // Restock all shelves to max
    bindBtn('dbg-restock-all', () => {
      this.shelves.forEach(shelf => {
        while (!shelf.isFull()) {
          shelf.stockItem({ itemType: shelf.itemType });
        }
      });
      this.showFloatingText('RAFLAR FULL!', this.player.group.position, '#2ECC71');
    });

    // Give items to player
    const giveItems = (type, count = 10) => {
      this.player.maxStack = Math.max(this.player.maxStack, this.player.stack.length + count);
      for (let i = 0; i < count; i++) {
        this.player.addItem(type);
      }
      this.showFloatingText(`+${count}x ${getItemDisplayName(type)}!`, this.player.group.position, '#FFE600');
    };

    bindBtn('dbg-give-pizza', () => giveItems('PIZZA'));
    bindBtn('dbg-give-icecream', () => giveItems('ICE_CREAM'));
    bindBtn('dbg-give-salad', () => giveItems('SALAD_BOWL'));
    bindBtn('dbg-give-jam', () => giveItems('STRAWBERRY_JAM'));
    bindBtn('dbg-give-pie', () => giveItems('APPLE_PIE'));
    bindBtn('dbg-give-cheese', () => giveItems('CHEESE'));
    bindBtn('dbg-give-popcorn', () => giveItems('POPCORN'));

    bindBtn('dbg-clear-bag', () => {
      while (this.player.stack.length > 0) {
        this.player.removeItem();
      }
      this.showFloatingText('ÇANTA BOŞALTILDI!', this.player.group.position, '#FF5252');
    });

    // Game Speed toggles
    bindBtn('dbg-spd-1', () => { this.gameSpeed = 1.0; this.showFloatingText('HIZ: 1x', this.player.group.position, '#fff'); });
    bindBtn('dbg-spd-2', () => { this.gameSpeed = 2.0; this.showFloatingText('HIZ: 2x TURBO', this.player.group.position, '#FFE600'); });
    bindBtn('dbg-spd-3', () => { this.gameSpeed = 4.0; this.showFloatingText('HIZ: 4x HIZLI', this.player.group.position, '#FF5252'); });
  }

  toggleDebugModal() {
    const modal = document.getElementById('debug-modal');
    if (modal && modal.classList.contains('open')) {
      this.closeDebugModal();
    } else {
      this.openDebugModal();
    }
  }

  openDebugModal() {
    if (!this.isDevMode) return;
    const modal = document.getElementById('debug-modal');
    if (modal) {
      modal.classList.add('open');
      modal.classList.remove('hidden');
    }
    window.Sound.playUnlock();
  }

  closeDebugModal() {
    const modal = document.getElementById('debug-modal');
    if (modal) {
      modal.classList.remove('open');
      modal.classList.add('hidden');
    }
  }

  // --- In-Game Market Wiki & Strategy Guide UI Engine ---
  initWikiUI() {
    const wikiBtn = document.getElementById('wiki-btn');
    const wikiModal = document.getElementById('wiki-modal');
    const wikiCloseBtn = document.getElementById('wiki-close-btn');
    const wikiTabs = document.querySelectorAll('.wiki-tab');

    if (wikiBtn) {
      wikiBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.openWikiModal();
      });
    }

    if (wikiCloseBtn) {
      wikiCloseBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.closeWikiModal();
      });
    }

    if (wikiModal) {
      wikiModal.addEventListener('click', (e) => {
        if (e.target === wikiModal) {
          this.closeWikiModal();
        }
      });
    }

    wikiTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        wikiTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        this.activeWikiTab = tab.getAttribute('data-tab') || 'recipes';
        this.renderWikiContent();
        window.Sound.playPop();
      });
    });
  }

  toggleWikiModal() {
    if (this.isWikiOpen) this.closeWikiModal();
    else this.openWikiModal();
  }

  openWikiModal() {
    this.isWikiOpen = true;
    const modal = document.getElementById('wiki-modal');
    if (modal) {
      modal.classList.add('open');
      modal.classList.remove('hidden');
    }
    this.renderWikiContent();
    window.Sound.playUnlock();
  }

  closeWikiModal() {
    this.isWikiOpen = false;
    const modal = document.getElementById('wiki-modal');
    if (modal) {
      modal.classList.remove('open');
      modal.classList.add('hidden');
    }
  }

  renderWikiContent() {
    const container = document.getElementById('wiki-content');
    if (!container) return;
    container.innerHTML = '';

    const tab = this.activeWikiTab || 'recipes';

    if (tab === 'recipes') {
      const recipes = [
        {
          title: 'EKMEK ÜRETİM ZİNCİRİ',
          badge: 'TEMEL FIRIN',
          inputs: [{ icon: BRUTAL_ICONS.WHEAT, name: 'Buğday' }],
          station: 'Değirmen ➔ Fırın',
          output: { icon: BRUTAL_ICONS.BREAD, name: 'Taze Ekmek ($35)' },
          desc: 'Tarladan toplanan buğday değirmende una dönüştürülür, fırına atılarak ekmek pişirilir.'
        },
        {
          title: 'GURME ELMALI TURTA',
          badge: 'ÇAPRAZ REÇETE',
          inputs: [{ icon: BRUTAL_ICONS.FLOUR, name: 'Öğütülmüş Un' }, { icon: BRUTAL_ICONS.APPLE, name: 'Kırmızı Elma' }],
          station: 'Taş Fırın',
          output: { icon: BRUTAL_ICONS.APPLE_PIE, name: 'Elmalı Turta ($95)' },
          desc: 'Fırına hem Un hem Elma koyduğunuzda altın kabuklu gurme elmalı turta pişer.'
        },
        {
          title: 'GURME PİZZA (EN YÜKSEK GELİR)',
          badge: '3 KATMANLI SİNERJİ',
          inputs: [{ icon: BRUTAL_ICONS.FLOUR, name: 'Un' }, { icon: BRUTAL_ICONS.TOMATO, name: 'Domates' }, { icon: BRUTAL_ICONS.CHEESE, name: 'Peynir' }],
          station: 'Taş Fırın',
          output: { icon: BRUTAL_ICONS.PIZZA, name: 'Gourmet Pizza ($180)' },
          desc: 'Fırına Un, Domates ve Peynir eklendiğinde İtalyan taş fırın pizzası hazırlanır.'
        },
        {
          title: 'KREMALI ÇİLEKLİ DONDURMA',
          badge: 'SOĞUK GELATO',
          inputs: [{ icon: BRUTAL_ICONS.MILK, name: 'Taze Süt' }, { icon: BRUTAL_ICONS.STRAWBERRY, name: 'Tatlı Çilek' }],
          station: 'Dondurma Makinesi',
          output: { icon: BRUTAL_ICONS.ICE_CREAM, name: 'Kremalı Dondurma ($130)' },
          desc: 'İnek sütü ve taze çilekler dondurma makinesinde çalkalanarak dondurma külahı üretilir.'
        },
        {
          title: 'AKDENİZ SALATA KASESİ',
          badge: 'FIT & SAĞLIKLI',
          inputs: [{ icon: BRUTAL_ICONS.TOMATO, name: 'Domates' }, { icon: BRUTAL_ICONS.CORN, name: 'Mısır' }, { icon: BRUTAL_ICONS.CHEESE, name: 'Peynir' }],
          station: 'Salata Barı',
          output: { icon: BRUTAL_ICONS.SALAD_BOWL, name: 'Akdeniz Salatası ($145)' },
          desc: 'Salata barında domates, altın mısır ve şarküteri peyniri harmanlanarak gurme kase yapılır.'
        },
        {
          title: 'GELENEKSEL ÇİLEK REÇELİ',
          badge: 'ŞEKERLİ KAVANOZ',
          inputs: [{ icon: BRUTAL_ICONS.STRAWBERRY, name: '2x Çilek' }],
          station: 'Otomatik Reçel Tezgahı',
          output: { icon: BRUTAL_ICONS.STRAWBERRY_JAM, name: 'Çilek Reçeli ($75)' },
          desc: 'Çilek tarlasından toplanan çilekler rafa dizilerek tatlı çilek reçeli olarak satılır.'
        },
        {
          title: 'FERMENTE ŞARKÜTERİ PEYNİRİ',
          badge: 'SÜT ÜRÜNÜ',
          inputs: [{ icon: BRUTAL_ICONS.MILK, name: 'Taze Süt' }],
          station: 'Peynir Kazanı',
          output: { icon: BRUTAL_ICONS.CHEESE, name: 'Tekerlek Peynir ($60)' },
          desc: 'İnekten sağılan taze süt peynir kazanına dökülerek altın sarısı peynir elde edilir.'
        },
        {
          title: 'TEREYAĞLI SICAK MISIR',
          badge: 'ATIŞTIRMALIK',
          inputs: [{ icon: BRUTAL_ICONS.CORN, name: 'Altın Mısır' }],
          station: 'Patlamış Mısır Makinesi',
          output: { icon: BRUTAL_ICONS.POPCORN, name: 'Patlamış Mısır ($70)' },
          desc: 'Mısır tarlasından hasat edilen taneler sıcak hava makinesinde patlatılır.'
        }
      ];

      const list = document.createElement('div');
      list.className = 'wiki-recipe-list';

      recipes.forEach(r => {
        const card = document.createElement('div');
        card.className = 'wiki-recipe-card';

        let inputHtml = r.inputs.map(i => `
          <div class="recipe-node">
            <div class="recipe-node-icon">${i.icon}</div>
            <div class="recipe-node-name">${i.name}</div>
          </div>
        `).join('<div class="recipe-plus">+</div>');

        card.innerHTML = `
          <div class="recipe-header">
            <div class="recipe-title">${r.title}</div>
            <span class="recipe-badge">${r.badge}</span>
          </div>
          <div class="recipe-flow">
            <div class="recipe-inputs">${inputHtml}</div>
            <div class="recipe-arrow">➔</div>
            <div class="recipe-station">
              <span class="station-tag">${r.station}</span>
            </div>
            <div class="recipe-arrow">➔</div>
            <div class="recipe-output">
              <div class="recipe-node output-node">
                <div class="recipe-node-icon">${r.output.icon}</div>
                <div class="recipe-node-name">${r.output.name}</div>
              </div>
            </div>
          </div>
          <div class="recipe-desc">${r.desc}</div>
        `;
        list.appendChild(card);
      });

      container.appendChild(list);
    } else if (tab === 'catalog') {
      const items = [
        { key: 'TOMATO', name: 'Domates', price: '$12', tier: 'Tier 1 - Temel', icon: BRUTAL_ICONS.TOMATO, desc: 'Doğrudan tarlada yetişen kırmızı sebze. Tavuk beslemek için de kullanılır.' },
        { key: 'EGG', name: 'Taze Yumurta', price: '$22', tier: 'Tier 1 - Hayvansal', icon: BRUTAL_ICONS.EGG, desc: 'Domatesle beslenen tavukların yumurtladığı protein kaynağı.' },
        { key: 'BREAD', name: 'Taş Ekmek', price: '$35', tier: 'Tier 2 - İşlenmiş', icon: BRUTAL_ICONS.BREAD, desc: 'Buğdayın una, unun fırında ekmeğe dönüştüğü temel gıda.' },
        { key: 'CHEESE', name: 'Şarküteri Peyniri', price: '$60', tier: 'Tier 2 - Fermente', icon: BRUTAL_ICONS.CHEESE, desc: 'İnek sütünün kazanda bekletilmesiyle üretilen sarı peynir.' },
        { key: 'CORN', name: 'Altın Mısır', price: '$30', tier: 'Tier 1 - Süper Yem', icon: BRUTAL_ICONS.CORN, desc: 'Hayvanlara verildiğinde anında 2 kat ürün sağlayan süper tarım bitkisi.' },
        { key: 'POPCORN', name: 'Patlamış Mısır', price: '$70', tier: 'Tier 2 - Atıştırmalık', icon: BRUTAL_ICONS.POPCORN, desc: 'Mısırın yüksek ısıda patlatılmasıyla yapılan lezzetli kutu.' },
        { key: 'APPLE_JUICE', name: 'Taze Elma Suyu', price: '$55', tier: 'Tier 2 - İçecek', icon: BRUTAL_ICONS.APPLE_JUICE, desc: 'Ağaçtan toplanan sulu elmaların soğuk sıkım makinesinde sıkılmasıyla elde edilir.' },
        { key: 'APPLE_PIE', name: 'Elmalı Turta', price: '$95', tier: 'Tier 3 - Gurme', icon: BRUTAL_ICONS.APPLE_PIE, desc: 'Un ve elmanın fırında pişirilmesiyle yapılan prestijli tatlı.' },
        { key: 'CARROT', name: 'Taze Havuç', price: '$38', tier: 'Tier 1 - Sebze', icon: BRUTAL_ICONS.CARROT, desc: 'Toprakta yetişen çıtır çıtır sağlıklı turuncu havuç.' },
        { key: 'STRAWBERRY_JAM', name: 'Çilek Reçeli', price: '$75', tier: 'Tier 2 - Tatlı', icon: BRUTAL_ICONS.STRAWBERRY_JAM, desc: 'Bahçe çileklerinden üretilen kıvamlı kavanoz reçeli.' },
        { key: 'ICE_CREAM', name: 'Kremalı Dondurma', price: '$130', tier: 'Tier 3 - Gelato', icon: BRUTAL_ICONS.ICE_CREAM, desc: 'Taze süt ve çileğin dondurma makinesinde işlenmesiyle hazırlanır.' },
        { key: 'SALAD_BOWL', name: 'Akdeniz Salatası', price: '$145', tier: 'Tier 3 - Gurme Kase', icon: BRUTAL_ICONS.SALAD_BOWL, desc: 'Domates, havuç ve peynirin salata barında harmanlanması.' },
        { key: 'PIZZA', name: 'Gourmet Pizza', price: '$180', tier: 'Tier 4 - Efsanevi', icon: BRUTAL_ICONS.PIZZA, desc: 'Un + Domates + Peynir üçlüsünün fırınlanmasıyla yapılan oyunun en değerli ürünü.' }
      ];

      const grid = document.createElement('div');
      grid.className = 'wiki-catalog-grid';

      items.forEach(it => {
        const card = document.createElement('div');
        card.className = 'wiki-catalog-card';
        card.innerHTML = `
          <div class="catalog-icon-box">${it.icon}</div>
          <div class="catalog-info">
            <div class="catalog-name">${it.name}</div>
            <div class="catalog-meta">
              <span class="catalog-price">${it.price}</span>
              <span class="catalog-tier">${it.tier}</span>
            </div>
            <div class="catalog-desc">${it.desc}</div>
          </div>
        `;
        grid.appendChild(card);
      });

      container.appendChild(grid);
    } else if (tab === 'stations') {
      const stations = [
        { name: 'KÜMES & TAVUKLAR', pos: 'Bahçe Sol', input: 'Domates / Mısır', output: 'Yumurta', desc: 'Tavuklar domatesle beslendikçe yumurtlar. Mısır verirseniz süper beslenip anında 2 yumurta üretir.' },
        { name: 'UN DEĞİRMENİ', pos: 'Bahçe Sol İç', input: 'Buğday', output: 'Öğütülmüş Un Torbası', desc: 'Rüzgar gücüyle dönen değirmen buğdayları öğüterek fırın ununa dönüştürür.' },
        { name: 'TAŞ FIRIN', pos: 'Market Arka Sol', input: 'Un + Elma / Domates / Peynir', output: 'Ekmek, Turta, Pizza', desc: 'Farklı malzeme kombinasyonlarına göre otomatik olarak ekmek, turta veya pizza pişirir.' },
        { name: 'İNEK ÇİFTLİĞİ', pos: 'Bahçe Sol Köşe', input: 'Buğday / Mısır', output: 'Taze Şişe Süt', desc: 'İnek buğday veya mısır yedikçe süt verir. Peynir ve dondurmanın ana kaynağıdır.' },
        { name: 'PEYNİR KAZANI', pos: 'Market Ön Sol', input: 'Süt', output: 'Tekerlek Şarküteri Peyniri', desc: 'Sütü kaynatarak ve bekleterek yüksek karlı peynir üretir.' },
        { name: 'DONDURMA MAKİNESİ', pos: 'Bahçe Sol Ön', input: 'Süt + Çilek', output: 'Kremalı Dondurma Külahı', desc: 'Süt ve çileği soğuk gelato dondurmasına dönüştürür.' },
        { name: 'SALATA BARI', pos: 'Bahçe En Sol', input: 'Domates + Havuç + Peynir', output: 'Akdeniz Salata Kasesi', desc: 'Sebzeleri ve peyniri doğrayıp gurme salata kasesine çevirir.' },
        { name: 'KURYE & TESLİMAT MASASI', pos: 'Market Ön Giriş', input: 'Sipariş Paketi', output: 'Ekstra Nakit + Yıldız', desc: 'Süreli sipariş paketlerini tamamlayarak büyük toplu nakit ödülleri kazanın.' }
      ];

      const list = document.createElement('div');
      list.className = 'wiki-stations-list';

      stations.forEach(s => {
        const card = document.createElement('div');
        card.className = 'wiki-station-card';
        card.innerHTML = `
          <div class="station-header">
            <div class="station-title">${s.name}</div>
            <span class="station-loc">${s.pos}</span>
          </div>
          <div class="station-details">
            <div><strong>Girdi:</strong> ${s.input}</div>
            <div><strong>Çıktı:</strong> ${s.output}</div>
          </div>
          <div class="station-desc">${s.desc}</div>
        `;
        list.appendChild(card);
      });

      container.appendChild(list);
    } else if (tab === 'npcs') {
      const npcs = [
        { name: 'REYON PERSONELİ (STOCKER)', role: 'Otomatik Raf Doldurucu', color: '#e67e22', desc: 'Kasanızda para biriktikçe üretim yerlerinden biten ürünleri alıp ilgili reyon raflarına taşır.' },
        { name: 'LOJİSTİK PERSONELİ', role: 'Makine & Hayvan Besleme', color: '#0984e3', desc: 'Tarladan buğday ve domatesleri alıp değirmene, kümes ve ineklere besleme yapar.' },
        { name: 'USTA ÇİFTÇİ', role: 'Otomatik Tarla Hasadı', color: '#27ae60', desc: 'Tüm tarla ve bahçelerdeki olgunlaşmış domates, buğday, mısır, elma ve çilekleri toplar.' },
        { name: 'OTOMATİK KASİYER', role: 'Kasa Yönetimi', color: '#9b59b6', desc: 'Kasadaki müşterilerin ödemesini anında alır. Oyuncunun kasada beklemesine gerek kalmaz.' },
        { name: 'VIP GURME MÜŞTERİ', role: 'Özel Müşteri (+2.5x Kazanç)', color: '#ffe600', desc: 'Altın taç ve ışıltılı peleriniyle belirli aralıklarla gelir. Yüksek değerli ürünler satın alır ve 2.5 kat ödeme + yüklü bahşiş bırakır.' },
        { name: 'HIRSIZ & CASUS', role: 'Dükkan Tehdidi', color: '#ff5252', desc: 'Gizlice markete girip raflardan ürün çalar. Oyuncu üzerine yürüyerek hırsızı yakalarsa polis ödülü ($200+) kazanır.' }
      ];

      const list = document.createElement('div');
      list.className = 'wiki-npcs-list';

      npcs.forEach(n => {
        const card = document.createElement('div');
        card.className = 'wiki-npc-card';
        card.style.borderLeft = `6px solid ${n.color}`;
        card.innerHTML = `
          <div class="npc-header">
            <div class="npc-name">${n.name}</div>
            <span class="npc-role" style="background:${n.color}; color:#000;">${n.role}</span>
          </div>
          <div class="npc-desc">${n.desc}</div>
        `;
        list.appendChild(card);
      });

      container.appendChild(list);
    } else if (tab === 'tips') {
      const tips = [
        { title: 'RUSH HOUR (YOĞUN SAAT) TAKTİĞİ', desc: 'Ekranın üstünde Rush Hour uyarısı çıktığında müşteri akını 3 katına çıkar ve ödemeler %50 artar. Bu esnada rafları ağzına kadar doldurun!' },
        { title: 'SÜPER BESLEME İLE ANINDA ÜRETİM', desc: 'Tavuk ve inekleri domates/buğday yerine Mısır ile beslerseniz bekleme süresi olmadan anında +2 Yumurta ve +2 Süt elde edersiniz.' },
        { title: 'MAKSİMUM KAZANÇ: PİZZA & SALATA', desc: 'Tekil ham ürün satmak yerine fırında Pizza ($180) ve Salata Barında Akdeniz Salatası ($145) üreterek kasanızı çok daha hızlı katlayabilirsiniz.' },
        { title: '🏃 YÜKSELTME MASASINI KULLANIN', desc: 'Kasanın yanındaki Yükseltme Terminali (Upgrade Desk) üzerinden çanta kapasitenizi 20 ürüne ve personellerinizin hızını 2 katına çıkarabilirsiniz.' },
        { title: '👮 HIRSIZI ASLA KAÇIRMAYIN', desc: 'Hırsız uyarısı gördüğünüzde hemen peşinden koşun. Yakaladığınızda hem çalınan ürünleri geri alırsınız hem de anında nakit ödül kazanırsınız.' }
      ];

      const list = document.createElement('div');
      list.className = 'wiki-tips-list';

      tips.forEach(t => {
        const card = document.createElement('div');
        card.className = 'wiki-tip-card';
        card.innerHTML = `
          <div class="tip-title">${t.title}</div>
          <div class="tip-desc">${t.desc}</div>
        `;
        list.appendChild(card);
      });

      container.appendChild(list);
    }
  }

  // --- Backend Upgrade Registry & UI Modal System ---
  initUpgradeUI() {
    this.upgradeModal = document.getElementById('upgrade-modal');
    this.upgradeCloseBtn = document.getElementById('upgrade-close-btn');
    this.upgradeContent = document.getElementById('upgrade-content');
    this.upgradeTabs = document.querySelectorAll('.upgrade-tab');

    if (this.upgradeCloseBtn) {
      this.upgradeCloseBtn.addEventListener('click', () => {
        this.closeUpgradeModal();
      });
    }

    if (this.upgradeModal) {
      this.upgradeModal.addEventListener('click', (e) => {
        if (e.target === this.upgradeModal) {
          this.closeUpgradeModal();
        }
      });
    }

    this.upgradeTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        this.upgradeTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        this.activeUpgradeTab = tab.getAttribute('data-tab') || 'player';
        this.renderUpgrades();
        window.Sound.playPop();
      });
    });
  }

  openUpgradeModal() {
    if (this.isUpgradeModalOpen) return;
    this.isUpgradeModalOpen = true;
    if (this.upgradeModal) {
      this.upgradeModal.classList.add('open');
      this.upgradeModal.classList.remove('hidden');
    }
    this.renderUpgrades();
    window.Sound.playUnlock();
  }

  closeUpgradeModal() {
    this.isUpgradeModalOpen = false;
    if (this.upgradeModal) {
      this.upgradeModal.classList.remove('open');
      this.upgradeModal.classList.add('hidden');
    }
    this.upgradePadCooldown = 1.5;
  }

  renderUpgrades() {
    if (!this.upgradeContent) return;
    this.upgradeContent.innerHTML = '';

    const currentTab = this.activeUpgradeTab || 'player';
    const keys = Object.keys(UPGRADE_CONFIG).filter(k => UPGRADE_CONFIG[k].category === currentTab);

    keys.forEach(key => {
      const cfg = UPGRADE_CONFIG[key];
      const card = document.createElement('div');
      card.className = 'upgrade-card';

      const iconSvg = BRUTAL_ICONS[cfg.icon] || BRUTAL_ICONS.STAR;

      if (cfg.type === 'unlock') {
        const isUnlocked = !!this.unlockedFeatures[cfg.unlockKey];
        const padIndex = FEATURE_UNLOCK_ORDER.indexOf(cfg.unlockKey);
        const requiredLevel = window.GameMechanics.getRequiredMarketLevel(padIndex);
        const levelUnlocked = window.GameMechanics.canPayUnlockPad(padIndex, this.progression.marketLevel);
        const costDue = this.unlockPads[padIndex]?.remainingCost ?? cfg.cost;
        const canAfford = !isUnlocked && levelUnlocked && this.money >= costDue;

        card.innerHTML = `
          <div class="upgrade-info">
            <div class="upgrade-icon-box">${iconSvg}</div>
            <div class="upgrade-text-box">
              <div class="upgrade-text-title">${cfg.title}</div>
              <div class="upgrade-text-desc">${cfg.desc}</div>
              <div class="upgrade-text-level">Durum: <strong style="color:${isUnlocked ? '#25d366' : '#e74c3c'}">${isUnlocked ? 'AKTİF / İŞ BAŞINDA' : (levelUnlocked ? 'SATIN ALINABİLİR' : `SEVİYE ${requiredLevel} GEREKLİ`)}</strong></div>
            </div>
          </div>
          <button class="upgrade-buy-btn ${isUnlocked ? 'maxed' : (canAfford ? '' : 'disabled')}" data-key="${key}" ${isUnlocked || !canAfford ? 'disabled' : ''}>
            ${isUnlocked ? 'AKTİF' : (levelUnlocked ? `${BRUTAL_ICONS.CASH} $${costDue} AÇ` : `SEVİYE ${requiredLevel}`)}
          </button>
        `;

        const btn = card.querySelector('.upgrade-buy-btn');
        if (btn && !isUnlocked) {
          btn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.buyUpgrade(key);
          });
        }
      } else {
        const curLevel = this.upgrades[key] || 1;
        const isMax = curLevel >= cfg.levels.length;
        const nextTier = isMax ? null : cfg.levels[curLevel];
        const currentTier = cfg.levels[curLevel - 1];
        const canAfford = nextTier ? (this.money >= nextTier.cost) : false;

        card.innerHTML = `
          <div class="upgrade-info">
            <div class="upgrade-icon-box">${iconSvg}</div>
            <div class="upgrade-text-box">
              <div class="upgrade-text-title">${cfg.title}</div>
              <div class="upgrade-text-desc">${cfg.desc}</div>
              <div class="upgrade-text-level">Mevcut: <strong>${currentTier.text}</strong> ${isMax ? '(MAKSİMUM SEVİYE)' : `➔ Sonraki: <strong>${nextTier.text}</strong>`}</div>
            </div>
          </div>
          <button class="upgrade-buy-btn ${isMax ? 'maxed' : (canAfford ? '' : 'disabled')}" data-key="${key}" ${isMax || !canAfford ? 'disabled' : ''}>
            ${isMax ? 'MAKS DÜZEY' : `${BRUTAL_ICONS.CASH} $${nextTier.cost} YÜKSELT`}
          </button>
        `;

        const btn = card.querySelector('.upgrade-buy-btn');
        if (btn && !isMax) {
          btn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.buyUpgrade(key);
          });
        }
      }

      this.upgradeContent.appendChild(card);
    });
  }

  buyUpgrade(key) {
    const cfg = UPGRADE_CONFIG[key];
    if (!cfg) return;

    if (cfg.type === 'unlock') {
      if (this.unlockedFeatures[cfg.unlockKey]) return;

      const padIndexMap = {
        shelf2: 0, cashier: 1, wheat: 2, bakery: 3, helper: 4,
        cow: 5, cheese: 6, helper2: 7, corn: 8, popcorn: 9,
        apple: 10, pie: 11, helper3: 12, strawberry: 13, carrot: 14,
        icecream: 15, salad: 16, pizza: 17, delivery: 18, helper4: 19
      };
      const pIdx = padIndexMap[cfg.unlockKey];
      if (pIdx !== undefined && !window.GameMechanics.canPayUnlockPad(pIdx, this.progression.marketLevel)) {
        window.Sound.playPop();
        return;
      }
      const pad = pIdx !== undefined ? this.unlockPads[pIdx] : null;
      const costDue = pad && !pad.isUnlocked ? pad.remainingCost : cfg.cost;
      if (this.money < costDue) {
        window.Sound.playPop();
        return;
      }

      this.money -= costDue;
      this.updateMoneyUI();

      if (pad && !pad.isUnlocked) {
        pad.pay(costDue);
      } else {
        this.unlockedFeatures[cfg.unlockKey] = true;
      }

      window.Sound.playCoin();
      this.showFloatingText(`${cfg.title} AÇILDI!`, this.player.group.position, '#00cec9');
      this.applyUpgradeEffects();
      this.recordProgressEvent({ type: 'upgrade', key });
      if (cfg.unlockKey && cfg.unlockKey.startsWith('helper')) {
        this.recordProgressEvent({ type: 'hireStaff', key: cfg.unlockKey });
      }
      this.saveState();
      this.renderUpgrades();
      return;
    }

    const curLevel = this.upgrades[key] || 1;
    if (curLevel >= cfg.levels.length) return;
    const nextTier = cfg.levels[curLevel];
    if (this.money < nextTier.cost) {
      window.Sound.playPop();
      return;
    }

    this.money -= nextTier.cost;
    this.upgrades[key] = curLevel + 1;
    this.updateMoneyUI();
    window.Sound.playCoin();
    this.showFloatingText('SEVİYE YÜKSELTİLDİ!', this.player.group.position, '#00cec9');

    this.applyUpgradeEffects();
    this.recordProgressEvent({ type: 'upgrade', key });
    this.saveState();
    this.renderUpgrades();
  }

  applyUpgradeEffects() {
    // 1. Player Capacity
    const capLevel = this.upgrades.playerCapacity || 1;
    const capVal = UPGRADE_CONFIG.playerCapacity.levels[capLevel - 1]?.value || 8;
    this.player.maxStack = capVal;

    // 2. Player Speed
    const spdLevel = this.upgrades.playerSpeed || 1;
    const spdVal = UPGRADE_CONFIG.playerSpeed.levels[spdLevel - 1]?.value || 6.2;
    this.playerSpeed = spdVal;

    // 3. Helpers Speed & Capacity
    const hSpdLevel = this.upgrades.helperSpeed || 1;
    const hSpdMult = UPGRADE_CONFIG.helperSpeed.levels[hSpdLevel - 1]?.value || 1.0;
    const hCapLevel = this.upgrades.helperCapacity || 1;
    const hCapVal = UPGRADE_CONFIG.helperCapacity.levels[hCapLevel - 1]?.value || 6;

    this.helpers.forEach(helper => {
      helper.setSpeedMultiplier(hSpdMult);
      helper.setMaxStack(hCapVal);
    });

    // 4. Farm Speed Multiplier
    const farmLevel = this.upgrades.farmSpeed || 1;
    const farmMult = UPGRADE_CONFIG.farmSpeed.levels[farmLevel - 1]?.value || 1.0;
    this.plots.forEach(plot => {
      plot.growthMultiplier = farmMult;
    });

    // 5. Machine, Cow & Processing Multipliers
    const facLevel = this.upgrades.factorySpeed || 1;
    const facMult = UPGRADE_CONFIG.factorySpeed.levels[facLevel - 1]?.value || 1.0;

    if (this.flourMill) this.flourMill.speedMultiplier = facMult;
    if (this.bakeryOven) this.bakeryOven.speedMultiplier = facMult;
    if (this.cowPen) this.cowPen.speedMultiplier = facMult;
    if (this.cheeseProcessor) this.cheeseProcessor.speedMultiplier = facMult;
    if (this.popcornMaker) this.popcornMaker.speedMultiplier = facMult;
    if (this.juicer) this.juicer.speedMultiplier = facMult;
    if (this.appleTree) this.appleTree.growthMultiplier = farmMult;
    if (this.iceCreamMachine) this.iceCreamMachine.speedMultiplier = facMult;
    if (this.saladPrepBar) this.saladPrepBar.speedMultiplier = facMult;
  }

  createPlayerGroundRing() {
    this.playerGroundRing = new THREE.Group();
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0xffe600,
      emissive: 0xffe600,
      emissiveIntensity: 0.45,
      roughness: 0.35,
      transparent: true,
      opacity: 0.88
    });
    const shadowMat = new THREE.MeshStandardMaterial({
      color: 0x111111,
      roughness: 0.5,
      transparent: true,
      opacity: 0.65
    });
    const base = new THREE.Mesh(new THREE.BoxGeometry(1.15, 0.035, 1.15), shadowMat);
    base.position.y = 0.012;
    const north = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.045, 0.10), ringMat);
    const south = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.045, 0.10), ringMat);
    const west = new THREE.Mesh(new THREE.BoxGeometry(0.10, 0.045, 0.95), ringMat);
    const east = new THREE.Mesh(new THREE.BoxGeometry(0.10, 0.045, 0.95), ringMat);
    north.position.set(0, 0.03, -0.53);
    south.position.set(0, 0.03, 0.53);
    west.position.set(-0.53, 0.03, 0);
    east.position.set(0.53, 0.03, 0);
    this.playerGroundRing.add(base, north, south, west, east);
    this.playerGroundRing.visible = false;
    this.scene.add(this.playerGroundRing);
  }

  updatePlayerGroundRing(time) {
    if (!this.playerGroundRing || !this.player) return;
    this.playerGroundRing.visible = true;
    this.playerGroundRing.position.set(this.player.group.position.x, 0.045, this.player.group.position.z);
    const pulse = 1.0 + Math.sin(time * 5.5) * 0.06;
    this.playerGroundRing.scale.set(pulse, 1, pulse);
    this.playerGroundRing.rotation.y = time * 0.9;
  }

  showFloatingText(text, pos3D, color = '#2ecc71') {
    const screenPos = pos3D.clone().project(this.camera);
    const x = (screenPos.x * 0.5 + 0.5) * window.innerWidth;
    const y = (-(screenPos.y * 0.5) + 0.5) * window.innerHeight;

    const el = document.createElement('div');
    el.className = 'floating-popup';
    el.textContent = text;
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    el.style.color = color;

    this.floatingContainer.appendChild(el);
    setTimeout(() => {
      if (el.parentNode) el.parentNode.removeChild(el);
    }, 850);
  }

  // --- Main Game Update Loop ---
  animate() {
    requestAnimationFrame(this.animate);

    const rawDelta = Math.min(this.clock.getDelta(), 0.1);
    const delta = rawDelta * (this.gameSpeed || 1.0);
    const elapsedTime = this.clock.getElapsedTime();
    this.autosaveElapsed += rawDelta;
    if (this.autosaveElapsed >= 30) {
      this.autosaveElapsed = 0;
      this.saveState();
    }

    this.updatePlayerMovement(delta);
    this.updateCamera();
    this.updateCombo(delta);
    this.updateDayCycle(delta);
    this.updateSpills(delta);
    this.updateFarming(delta, elapsedTime);
    this.updateShelves(delta, elapsedTime);
    this.updateCheckout(delta);
    this.updateUnlockPads(elapsedTime);
    this.updateRushHour(delta);
    this.updateCustomers(delta);
    this.updateHelpers(delta);
    this.updateDeliveryDesk(delta);
    this.updateShoplifterCatch(delta);
    this.updateCapacityIndicator();
    this.updatePlayerGroundRing(elapsedTime);
    this.updateGuidanceAndObjective(elapsedTime);
    this.renderProgressionHud();

    // Living World Updates
    if (this.parkingLot) this.parkingLot.update(delta);
    if (this.transitTraffic) this.transitTraffic.update(delta);
    if (this.particleFX) this.particleFX.update(delta);
    if (this.clouds) this.clouds.update(delta);
    if (this.butterflies) this.butterflies.update(delta, elapsedTime);
    if (this.flourMill) this.flourMill.update(delta, elapsedTime);
    if (this.bakeryOven) this.bakeryOven.update(delta, elapsedTime);
    if (this.cowPen) this.cowPen.update(delta, elapsedTime);
    if (this.cheeseProcessor) this.cheeseProcessor.update(delta, elapsedTime);
    if (this.appleTree) this.appleTree.update(delta, elapsedTime);
    if (this.popcornMaker) this.popcornMaker.update(delta, elapsedTime);
    if (this.juicer) this.juicer.update(delta, elapsedTime);
    if (this.iceCreamMachine) this.iceCreamMachine.update(delta, elapsedTime);
    if (this.saladPrepBar) this.saladPrepBar.update(delta, elapsedTime);
    if (this.toastMachine) this.toastMachine.update(delta);
    if (this.jamCauldron) this.jamCauldron.update(delta);
    if (this.deliveryDesk) this.deliveryDesk.update(delta, elapsedTime);
    if (this.activeCourier) {
      const courier = this.activeCourier;
      courier.update(delta, elapsedTime);
      if (this.activeCourier === courier && !courier.isFinished) {
        this.updateCustomerBubble(courier);
      }
    }
    if (this.upgradeDesk) this.upgradeDesk.update(elapsedTime);
    if (this.agriculturalDecorations) this.agriculturalDecorations.update(delta, elapsedTime);
    if (this.taskDispatcher) this.taskDispatcher.update(delta);

    this.renderer.render(this.scene, this.camera);
  }

  // Spawn Express Courier NPC who walks in, takes parcels, and drives away on scooter
  spawnExpressCourier(reward) {
    if (this.activeCourier) {
      if (this.activeCourier.bubbleEl && this.activeCourier.bubbleEl.parentNode) {
        this.activeCourier.bubbleEl.parentNode.removeChild(this.activeCourier.bubbleEl);
        this.activeCourier.bubbleEl = null;
      }
      this.activeCourier.destroy();
    }
    this.activeCourier = new ExpressCourierAI(this.scene, reward, () => {
      if (this.activeCourier && this.activeCourier.bubbleEl && this.activeCourier.bubbleEl.parentNode) {
        this.activeCourier.bubbleEl.parentNode.removeChild(this.activeCourier.bubbleEl);
        this.activeCourier.bubbleEl = null;
      }
      this.activeCourier = null;
      if (this.deliveryDesk) {
        this.deliveryDesk.onCourierFinished();
      }
    });
  }

  // Rush Hour Event Engine (Periodic high-intensity boost)
  updateRushHour(delta) {
    const banner = document.getElementById('rush-hour-banner');
    const timerText = document.getElementById('rush-hour-timer');

    if (this.isRushHour) {
      this.rushHourTimer -= delta;
      if (timerText) timerText.textContent = `${Math.ceil(this.rushHourTimer)}s`;

      if (this.rushHourTimer <= 0) {
        this.isRushHour = false;
        this.rushHourCooldown = 75.0 + Math.random() * 30.0;
        if (banner) banner.classList.add('hidden');
        this.showFloatingText('RUSH HOUR BİTTİ!', this.player.group.position, '#00CEC9');
      }
    } else {
      this.rushHourCooldown -= delta;
      if (this.rushHourCooldown <= 0 && this.shelves.length >= 3) {
        this.isRushHour = true;
        this.rushHourTimer = 30.0;
        if (banner) banner.classList.remove('hidden');
        if (timerText) timerText.textContent = '30s';
        this.showFloatingText('RUSH HOUR BAŞLADI! %50 EKSTRA GELİR!', this.player.group.position, '#FFE600');
        window.Sound.playUnlock();
      }
    }
  }

  // Delivery & Dispatch Desk HUD Widget
  updateDeliveryDesk(delta) {
    const widget = document.getElementById('delivery-widget');
    const itemEl = document.getElementById('delivery-item-name');
    const rewardEl = document.getElementById('delivery-reward');
    const progressEl = document.getElementById('delivery-progress');

    if (this.deliveryDesk) {
      const order = this.deliveryDesk.activeOrder;
      if (order) {
        if (widget) widget.classList.remove('hidden');

        if (order.isAwaitingCourier) {
        if (itemEl) itemEl.innerHTML = `<span class="delivery-cooldown-text">Kurye Geliyor... <b>Paketi Alıyor</b></span>`;
          if (rewardEl) rewardEl.textContent = `+$${order.reward}`;
          if (progressEl) progressEl.style.width = '100%';
        } else {
          let reqBadges = [];
          let totalReq = 0;
          let totalCur = 0;

          for (const [type, reqQty] of Object.entries(order.reqs)) {
            const cur = order.progress[type] || 0;
            totalReq += reqQty;
            totalCur += Math.min(cur, reqQty);
            const itemDef = ITEM_TYPES[type] || { name: type };
            const isDone = cur >= reqQty;
            reqBadges.push(`<span class="delivery-item-badge ${isDone ? 'badge-done' : ''}">${itemDef.name}: <b>${cur}/${reqQty}</b></span>`);
          }

          if (itemEl) itemEl.innerHTML = reqBadges.join(' ');
          if (rewardEl) rewardEl.textContent = `+$${order.reward}`;
          if (progressEl) {
            const pct = Math.min(100, Math.floor((totalCur / Math.max(1, totalReq)) * 100));
            progressEl.style.width = `${pct}%`;
          }
        }
      } else if (this.deliveryDesk.cooldown > 0) {
        if (widget) widget.classList.remove('hidden');
        if (itemEl) itemEl.innerHTML = `<span class="delivery-cooldown-text">Kurye Yolda... <b>${Math.ceil(this.deliveryDesk.cooldown)}s</b></span>`;
        if (rewardEl) rewardEl.textContent = `BEKLENİYOR`;
        if (progressEl) {
          const cdPct = Math.min(100, Math.floor(((8.0 - this.deliveryDesk.cooldown) / 8.0) * 100));
          progressEl.style.width = `${cdPct}%`;
        }
      } else {
        if (widget) widget.classList.add('hidden');
      }
    } else {
      if (widget) widget.classList.add('hidden');
    }
  }

  // Catch sneaky shoplifters by approaching and swatting them with the wooden bat
  updateShoplifterCatch(delta) {
    const pPos = this.player.group.position;
    for (let i = this.customers.length - 1; i >= 0; i--) {
      const c = this.customers[i];
      if (c instanceof ShoplifterAI && !c.isStunned && !c.isFinished && c.state !== 'FLEEING_PANIC') {
        const dist = pPos.distanceTo(c.char.group.position);
        if (dist < 2.0) {
          // Trigger player swat attack animation with bat
          if (this.player.triggerSwatAttack) {
            this.player.triggerSwatAttack();
          }
          const bounty = c.onHitByPlayer ? c.onHitByPlayer(this.player) : c.catchThief();
          if (bounty > 0) {
            this.money += bounty;
            this.updateMoneyUI();
            window.Sound.playCoin();
            this.showFloatingText(`HIRSIZ YAKALANDI! +$${bounty} ÖDÜL!`, c.char.group.position, '#2ECC71');
          }
        }
      }
    }
  }

  // Player input calculation, movement & collision physics
  updatePlayerMovement(delta) {
    const moveDir = new THREE.Vector3();

    if (this.keys['KeyW'] || this.keys['ArrowUp']) moveDir.z -= 1;
    if (this.keys['KeyS'] || this.keys['ArrowDown']) moveDir.z += 1;
    if (this.keys['KeyA'] || this.keys['ArrowLeft']) moveDir.x -= 1;
    if (this.keys['KeyD'] || this.keys['ArrowRight']) moveDir.x += 1;

    if (this.joystickInput.lengthSq() > 0.04) {
      moveDir.x += this.joystickInput.x;
      moveDir.z += this.joystickInput.y;
    }

    // Sprint / Dash Calculation (Holding Shift, Space, KeyE or tapping UI Sprint button)
    const isSprinting = Boolean(
      this.keys['ShiftLeft'] ||
      this.keys['ShiftRight'] ||
      this.keys['Space'] ||
      this.keys['KeyE'] ||
      this.touchSprintActive
    );
    this.isSprinting = isSprinting;

    const baseSpeed = this.playerSpeed || 6.2;
    const speed = baseSpeed * (isSprinting ? 1.62 : 1.0);

    if (moveDir.lengthSq() > 0.01) {
      moveDir.normalize();
      this.player.velocity.copy(moveDir.multiplyScalar(speed));
      this.player.group.position.addScaledVector(this.player.velocity, delta);

      this.collision.resolveCircle(this.player.group.position, 0.45);

      this.player.group.position.x = THREE.MathUtils.clamp(this.player.group.position.x, -19.5, 19.5);
      this.player.group.position.z = THREE.MathUtils.clamp(this.player.group.position.z, -31.0, 24.2);
    } else {
      this.player.velocity.set(0, 0, 0);
      this.collision.resolveCircle(this.player.group.position, 0.45);
    }

    if (this.upgradeDesk) {
      if (this.upgradePadCooldown > 0) this.upgradePadCooldown -= delta;
      const distToDesk = this.player.group.position.distanceTo(this.upgradeDesk.triggerPadPos);
      if (distToDesk < 1.4 && !this.isUpgradeModalOpen && this.upgradePadCooldown <= 0) {
        this.openUpgradeModal();
      }
    }

    this.player.update(delta);
  }

  // Smooth camera follow & dynamic sprint speed FOV warp
  updateCamera() {
    const pPos = this.player.group.position;
    this.camera.position.x = THREE.MathUtils.lerp(this.camera.position.x, pPos.x * 0.70, 0.08);
    this.camera.position.z = THREE.MathUtils.lerp(this.camera.position.z, pPos.z * 0.70 + 17, 0.08);
    this.camera.lookAt(this.camera.position.x, 0, this.camera.position.z - 17);

    // Dynamic FOV speed-warp during sprint dashes
    const targetFov = this.isSprinting && (this.player.velocity.lengthSq() > 0.1) ? 45.0 : 40.0;
    if (Math.abs(this.camera.fov - targetFov) > 0.05) {
      this.camera.fov = THREE.MathUtils.lerp(this.camera.fov, targetFov, 0.1);
      this.camera.updateProjectionMatrix();
    }
  }

  // Farming harvest & processing interaction
  updateFarming(delta, time) {
    this.plots.forEach(plot => plot.update(delta));
    if (this.chickenCoop) {
      this.chickenCoop.update(delta, time);
    }

    const pPos = this.player.group.position;
    this.harvestCooldown -= delta;

    if (this.harvestCooldown <= 0) {
      // 1. Garden Plots (Tomato, Wheat, Corn, Strawberry, Carrot) Harvest
      this.plots.forEach(plot => {
        const dist = pPos.distanceTo(new THREE.Vector3(plot.x, 0, plot.z));
        if (dist < 2.5 && this.player.stack.length < this.player.maxStack) {
          const harvested = plot.harvestAvailable();
          harvested.forEach(item => {
            if (this.player.addItem(item)) {
              window.Sound.playPop();
              this.recordProgressEvent({ type: 'harvest', itemType: item, amount: 1 });
              this.harvestCooldown = 0.18;
            }
          });
        }
      });

      // 1b. Apple Orchard Harvest
      if (this.appleTree) {
        const distApple = pPos.distanceTo(new THREE.Vector3(this.appleTree.x, 0, this.appleTree.z));
        if (distApple < 2.5 && this.player.stack.length < this.player.maxStack) {
          const harvested = this.appleTree.harvestAvailable();
          harvested.forEach(item => {
            if (this.player.addItem(item)) {
              window.Sound.playPop();
              this.recordProgressEvent({ type: 'harvest', itemType: item, amount: 1 });
              this.harvestCooldown = 0.18;
            }
          });
        }
      }

      // 2. Chicken Coop: Feed Tomatoes or Super-Feed with Corn
      if (this.chickenCoop) {
        const distFeed = pPos.distanceTo(this.chickenCoop.feedPadPos);
        if (distFeed < 1.6) {
          const cornIdx = this.player.stack.findIndex(i => i.type === 'CORN');
          if (cornIdx !== -1 && this.chickenCoop.eggs.length < this.chickenCoop.eggCapacity) {
            const item = this.player.removeItem(cornIdx);
            if (item) {
              this.chickenCoop.feedCorn();
              window.Sound.playPop();
              this.showFloatingText('SÜPER BESLEME! +2 YUMURTA!', this.chickenCoop.hen.position.clone().add(this.chickenCoop.group.position), '#FFE600');
              this.harvestCooldown = 0.25;
            }
          } else if (this.chickenCoop.currentFeed < this.chickenCoop.feedCapacity) {
            const tomatoIdx = this.player.stack.findIndex(i => i.type === 'TOMATO');
            if (tomatoIdx !== -1) {
              const item = this.player.removeItem(tomatoIdx);
              if (item) {
                this.chickenCoop.feedTomato();
                window.Sound.playPop();
                this.showFloatingText('TAVUK BESLENDİ!', this.chickenCoop.hen.position.clone().add(this.chickenCoop.group.position), '#f1c40f');
                this.harvestCooldown = 0.25;
              }
            }
          }
        }

        // Collect Eggs
        const distEgg = pPos.distanceTo(this.chickenCoop.eggPadPos);
        if (distEgg < 1.6 && this.chickenCoop.eggs.length > 0 && this.player.stack.length < this.player.maxStack) {
          if (this.chickenCoop.collectOneEgg()) {
            this.player.addItem('EGG');
            window.Sound.playPop();
            this.harvestCooldown = 0.18;
          }
        }
      }

      // 3. Flour Mill
      if (this.flourMill) {
        const distMillInput = pPos.distanceTo(this.flourMill.inputPadPos);
        if (distMillInput < 1.6 && this.flourMill.currentWheat < this.flourMill.wheatCapacity) {
          const wheatIdx = this.player.stack.findIndex(i => i.type === 'WHEAT');
          if (wheatIdx !== -1) {
            const item = this.player.removeItem(wheatIdx);
            if (item) {
              this.flourMill.depositWheat();
              window.Sound.playPop();
              this.showFloatingText('BUĞDAY DEĞİRMENDE!', this.flourMill.group.position, '#f1c40f');
              this.harvestCooldown = 0.22;
            }
          }
        }

        const distMillOutput = pPos.distanceTo(this.flourMill.outputPadPos);
        if (distMillOutput < 1.6 && this.flourMill.flourSacks.length > 0 && this.player.stack.length < this.player.maxStack) {
          if (this.flourMill.collectOneFlour()) {
            this.player.addItem('FLOUR');
            window.Sound.playPop();
            this.harvestCooldown = 0.18;
          }
        }
      }

      // 4. Bakery Stone Oven (Bakes Bread, Apple Pie, and Gourmet Pizza)
      if (this.bakeryOven) {
        const distOvenInput = pPos.distanceTo(this.bakeryOven.inputPadPos);
        if (distOvenInput < 1.6) {
          // Deposit Flour
          if (this.bakeryOven.currentFlour < this.bakeryOven.flourCapacity) {
            const flourIdx = this.player.stack.findIndex(i => i.type === 'FLOUR');
            if (flourIdx !== -1) {
            const item = this.player.removeItem(flourIdx);
              if (item) {
                this.bakeryOven.depositFlour();
                window.Sound.playPop();
                this.showFloatingText('UN FIRINDA PİŞİYOR!', this.bakeryOven.group.position, '#e67e22');
                this.harvestCooldown = 0.22;
              }
            }
          }
          // Deposit Apples (for Apple Pie)
          if (this.harvestCooldown <= 0 && this.bakeryOven.currentApples < this.bakeryOven.flourCapacity) {
            const appleIdx = this.player.stack.findIndex(i => i.type === 'APPLE');
            if (appleIdx !== -1) {
            const item = this.player.removeItem(appleIdx);
              if (item) {
                this.bakeryOven.depositApple();
                window.Sound.playPop();
                this.showFloatingText('TURTA MALZEMESİ EKLENDİ!', this.bakeryOven.group.position, '#e74c3c');
                this.harvestCooldown = 0.22;
              }
            }
          }
          // Deposit Tomatoes (for Pizza)
          if (this.harvestCooldown <= 0 && this.bakeryOven.currentTomatoes < this.bakeryOven.flourCapacity) {
            const tomatoIdx = this.player.stack.findIndex(i => i.type === 'TOMATO');
            if (tomatoIdx !== -1) {
            const item = this.player.removeItem(tomatoIdx);
              if (item) {
                this.bakeryOven.depositTomato();
                window.Sound.playPop();
                this.showFloatingText('DOMATES SOSU EKLENDİ!', this.bakeryOven.group.position, '#FF5252');
                this.harvestCooldown = 0.22;
              }
            }
          }
          // Deposit Cheese (for Pizza)
          if (this.harvestCooldown <= 0 && this.bakeryOven.currentCheese < this.bakeryOven.flourCapacity) {
            const cheeseIdx = this.player.stack.findIndex(i => i.type === 'CHEESE');
            if (cheeseIdx !== -1) {
              const item = this.player.removeItem(cheeseIdx);
              if (item) {
                this.bakeryOven.depositCheese();
                window.Sound.playPop();
                this.showFloatingText('PİZZA PEYNİRİ EKLENDİ!', this.bakeryOven.group.position, '#FDCB6E');
                this.harvestCooldown = 0.22;
              }
            }
          }
        }

        // Collect Baked Products
        const distOvenOutput = pPos.distanceTo(this.bakeryOven.outputPadPos);
        if (distOvenOutput < 1.6 && this.bakeryOven.breadLoaves.length > 0 && this.player.stack.length < this.player.maxStack) {
          const baked = this.bakeryOven.collectOneBread();
          if (baked) {
            this.player.addItem(baked);
            window.Sound.playPop();
            this.harvestCooldown = 0.18;
          }
        }
      }

      // 5. Cow Pen: Milk & Super-Feed
      if (this.cowPen) {
        const distFeed = pPos.distanceTo(this.cowPen.feedPadPos);
        if (distFeed < 1.6) {
          const cornIdx = this.player.stack.findIndex(i => i.type === 'CORN');
          if (cornIdx !== -1 && this.cowPen.milkBottles.length < this.cowPen.milkCapacity) {
            const item = this.player.removeItem(cornIdx);
            if (item) {
              this.cowPen.feedCorn();
              window.Sound.playPop();
              this.showFloatingText('SÜPER BESLEME! +2 TAZE SÜT!', this.cowPen.cowGroup.position.clone().add(this.cowPen.group.position), '#FFE600');
              this.harvestCooldown = 0.25;
            }
          } else if (this.cowPen.currentWheat < this.cowPen.wheatCapacity) {
            const wheatIdx = this.player.stack.findIndex(i => i.type === 'WHEAT');
            if (wheatIdx !== -1) {
              const item = this.player.removeItem(wheatIdx);
              if (item) {
                this.cowPen.feedWheat();
                window.Sound.playPop();
                this.showFloatingText('İNEK BESLENDİ!', this.cowPen.cowGroup.position.clone().add(this.cowPen.group.position), '#00cec9');
                this.harvestCooldown = 0.25;
              }
            }
          }
        }

        const distMilk = pPos.distanceTo(this.cowPen.milkPadPos);
        if (distMilk < 1.6 && this.cowPen.milkBottles.length > 0 && this.player.stack.length < this.player.maxStack) {
          if (this.cowPen.collectOneMilk()) {
            this.player.addItem('MILK');
            window.Sound.playPop();
            this.harvestCooldown = 0.18;
          }
        }
      }

      // 6. Cheese Processor
      if (this.cheeseProcessor) {
        const distCheeseInput = pPos.distanceTo(this.cheeseProcessor.inputPadPos);
        if (distCheeseInput < 1.6 && this.cheeseProcessor.currentMilk < this.cheeseProcessor.milkCapacity) {
          const milkIdx = this.player.stack.findIndex(i => i.type === 'MILK');
          if (milkIdx !== -1) {
            const item = this.player.removeItem(milkIdx);
            if (item) {
              this.cheeseProcessor.depositMilk();
              window.Sound.playPop();
              this.showFloatingText('SÜT KAZANDA FERMENTEDE!', this.cheeseProcessor.group.position, '#fdcb6e');
              this.harvestCooldown = 0.22;
            }
          }
        }

        const distCheeseOutput = pPos.distanceTo(this.cheeseProcessor.outputPadPos);
        if (distCheeseOutput < 1.6 && this.cheeseProcessor.cheeseWheels.length > 0 && this.player.stack.length < this.player.maxStack) {
          if (this.cheeseProcessor.collectOneCheese()) {
            this.player.addItem('CHEESE');
            window.Sound.playPop();
            this.harvestCooldown = 0.18;
          }
        }
      }

      // 7. Popcorn Machine
      if (this.popcornMaker) {
        const distPopcornInput = pPos.distanceTo(this.popcornMaker.inputPadPos);
        if (distPopcornInput < 1.6 && this.popcornMaker.currentCorn < this.popcornMaker.cornCapacity) {
          const cornIdx = this.player.stack.findIndex(i => i.type === 'CORN');
          if (cornIdx !== -1) {
            const item = this.player.removeItem(cornIdx);
            if (item) {
              this.popcornMaker.depositCorn();
              window.Sound.playPop();
              this.showFloatingText('MISIR PATLATILIYOR!', this.popcornMaker.group.position, '#FFE600');
              this.harvestCooldown = 0.22;
            }
          }
        }

        const distPopcornOutput = pPos.distanceTo(this.popcornMaker.outputPadPos);
        if (distPopcornOutput < 1.6 && this.popcornMaker.popcornBoxes.length > 0 && this.player.stack.length < this.player.maxStack) {
          if (this.popcornMaker.collectOnePopcorn()) {
            this.player.addItem('POPCORN');
            window.Sound.playPop();
            this.harvestCooldown = 0.18;
          }
        }
      }

      // 8. Cold-Press Juicer
      if (this.juicer) {
        const distJuicerInput = pPos.distanceTo(this.juicer.inputPadPos);
        if (distJuicerInput < 1.6 && this.juicer.currentApples < this.juicer.appleCapacity) {
          const appleIdx = this.player.stack.findIndex(i => i.type === 'APPLE');
          if (appleIdx !== -1) {
            const item = this.player.removeItem(appleIdx);
            if (item) {
              this.juicer.depositApple();
              window.Sound.playPop();
              this.showFloatingText('TAZE ELMALAR SIKILIYOR!', this.juicer.group.position, '#E74C3C');
              this.harvestCooldown = 0.22;
            }
          }
        }

        const distJuicerOutput = pPos.distanceTo(this.juicer.outputPadPos);
        if (distJuicerOutput < 1.6 && this.juicer.juiceBottles.length > 0 && this.player.stack.length < this.player.maxStack) {
          if (this.juicer.collectOneJuice()) {
            this.player.addItem('APPLE_JUICE');
            window.Sound.playPop();
            this.harvestCooldown = 0.18;
          }
        }
      }

      // 9. Gelato Ice Cream Machine
      if (this.iceCreamMachine) {
        const distIcInput = pPos.distanceTo(this.iceCreamMachine.inputPadPos);
        if (distIcInput < 1.6) {
          // Deposit Milk
          if (this.iceCreamMachine.currentMilk < this.iceCreamMachine.capacity) {
            const milkIdx = this.player.stack.findIndex(i => i.type === 'MILK');
            if (milkIdx !== -1) {
              const item = this.player.removeItem(milkIdx);
              if (item) {
                this.iceCreamMachine.depositMilk();
                window.Sound.playPop();
                this.showFloatingText('SÜT DONDURMAYA EKLENDİ!', this.iceCreamMachine.group.position, '#00CEC9');
                this.harvestCooldown = 0.22;
              }
            }
          }
          // Deposit Strawberry
          if (this.harvestCooldown <= 0 && this.iceCreamMachine.currentStrawberry < this.iceCreamMachine.capacity) {
            const sbIdx = this.player.stack.findIndex(i => i.type === 'STRAWBERRY');
            if (sbIdx !== -1) {
              const item = this.player.removeItem(sbIdx);
              if (item) {
                this.iceCreamMachine.depositStrawberry();
                window.Sound.playPop();
                this.showFloatingText('ÇİLEK DONDURMAYA EKLENDİ!', this.iceCreamMachine.group.position, '#FF2A7A');
                this.harvestCooldown = 0.22;
              }
            }
          }
        }

        const distIcOutput = pPos.distanceTo(this.iceCreamMachine.outputPadPos);
        if (distIcOutput < 1.6 && this.iceCreamMachine.iceCreams.length > 0 && this.player.stack.length < this.player.maxStack) {
          if (this.iceCreamMachine.collectOneIceCream()) {
            this.player.addItem('ICE_CREAM');
            window.Sound.playPop();
            this.harvestCooldown = 0.18;
          }
        }
      }

      // 10. Mediterranean Salad Prep Bar
      if (this.saladPrepBar) {
        const distSaladInput = pPos.distanceTo(this.saladPrepBar.inputPadPos);
        if (distSaladInput < 1.6) {
          // Deposit Tomato
          if (this.saladPrepBar.currentTomato < this.saladPrepBar.capacity) {
            const tIdx = this.player.stack.findIndex(i => i.type === 'TOMATO');
            if (tIdx !== -1) {
              const item = this.player.removeItem(tIdx);
              if (item) {
                this.saladPrepBar.depositTomato();
                window.Sound.playPop();
                this.showFloatingText('DOMATES SALATAYA EKLENDİ!', this.saladPrepBar.group.position, '#FF5252');
                this.harvestCooldown = 0.22;
              }
            }
          }
          // Deposit Corn
          if (this.harvestCooldown <= 0 && this.saladPrepBar.currentCorn < this.saladPrepBar.capacity) {
            const cIdx = this.player.stack.findIndex(i => i.type === 'CORN');
            if (cIdx !== -1) {
              const item = this.player.removeItem(cIdx);
              if (item) {
                this.saladPrepBar.depositCorn();
                window.Sound.playPop();
                this.showFloatingText('MISIR SALATAYA EKLENDİ!', this.saladPrepBar.group.position, '#FFE600');
                this.harvestCooldown = 0.22;
              }
            }
          }
          // Deposit Cheese
          if (this.harvestCooldown <= 0 && this.saladPrepBar.currentCheese < this.saladPrepBar.capacity) {
            const chIdx = this.player.stack.findIndex(i => i.type === 'CHEESE');
            if (chIdx !== -1) {
              const item = this.player.removeItem(chIdx);
              if (item) {
                this.saladPrepBar.depositCheese();
                window.Sound.playPop();
                this.showFloatingText('PEYNİR SALATAYA EKLENDİ!', this.saladPrepBar.group.position, '#FDCB6E');
                this.harvestCooldown = 0.22;
              }
            }
          }
        }

        const distSaladOutput = pPos.distanceTo(this.saladPrepBar.outputPadPos);
        if (distSaladOutput < 1.6 && this.saladPrepBar.saladBowls.length > 0 && this.player.stack.length < this.player.maxStack) {
          if (this.saladPrepBar.collectOneSalad()) {
            this.player.addItem('SALAD_BOWL');
            window.Sound.playPop();
            this.harvestCooldown = 0.18;
          }
        }
      }

      // 11. Delivery Desk Deposit
      if (this.deliveryDesk && this.deliveryDesk.hasActiveOrder && this.harvestCooldown <= 0) {
        const distDesk = pPos.distanceTo(this.deliveryDesk.triggerPadPos);
        if (distDesk < 1.8) {
          const matchIdx = this.player.stack.findIndex(i => this.deliveryDesk.needsItem(i.type));
          if (matchIdx !== -1) {
            const itemType = this.player.removeItem(matchIdx);
            if (itemType) {
              this.deliveryDesk.depositItem(itemType);
              window.Sound.playPop();
              if (this.particleFX) {
                this.particleFX.emitBurst(this.deliveryDesk.triggerPadPos, 0xffe600, 8);
              }
              this.showFloatingText('PAKETE EKLENDİ!', this.deliveryDesk.group.position, '#2ECC71');
              this.harvestCooldown = 0.22;
            }
          }
        }
      }

      // 12. Toast Machine (Faz 2: Tost Makinesi)
      if (this.toastMachine && this.harvestCooldown <= 0) {
        const distToastIn = pPos.distanceTo(this.toastMachine.inputPadPos);
        if (distToastIn < 1.6 && this.toastMachine.currentBread < this.toastMachine.breadCapacity) {
          const breadIdx = this.player.stack.findIndex(i => i.type === 'BREAD');
          if (breadIdx !== -1) {
            const item = this.player.removeItem(breadIdx);
            if (item) {
              this.toastMachine.depositBread();
              window.Sound.playPop();
              this.showFloatingText('EKMEK KIZARTMAYA ATILDI!', this.toastMachine.group.position, '#D35400');
              this.harvestCooldown = 0.22;
            }
          }
        }
        const distToastOut = pPos.distanceTo(this.toastMachine.outputPadPos);
        if (distToastOut < 1.6 && this.toastMachine.toasts.length > 0 && this.player.stack.length < this.player.maxStack) {
          const toast = this.toastMachine.collectOneToast();
          if (toast) {
            this.player.addItem(toast);
            window.Sound.playPop();
            this.showFloatingText('ÇITIR TOST ALINDI!', this.toastMachine.group.position, '#E67E22');
            this.harvestCooldown = 0.18;
          }
        }
      }

      // 13. Jam Cauldron (Faz 2: Reçel Kazanı)
      if (this.jamCauldron && this.harvestCooldown <= 0) {
        const distJamIn = pPos.distanceTo(this.jamCauldron.inputPadPos);
        if (distJamIn < 1.6 && this.jamCauldron.currentStrawberry < this.jamCauldron.strawberryCapacity) {
          const berryIdx = this.player.stack.findIndex(i => i.type === 'STRAWBERRY');
          if (berryIdx !== -1) {
            const item = this.player.removeItem(berryIdx);
            if (item) {
              this.jamCauldron.depositStrawberry();
              window.Sound.playPop();
              this.showFloatingText('ÇİLEK KAZANA DÖKÜLDÜ!', this.jamCauldron.group.position, '#FF2A7A');
              this.harvestCooldown = 0.22;
            }
          }
        }
        const distJamOut = pPos.distanceTo(this.jamCauldron.outputPadPos);
        if (distJamOut < 1.6 && this.jamCauldron.jams.length > 0 && this.player.stack.length < this.player.maxStack) {
          const jam = this.jamCauldron.collectOneJam();
          if (jam) {
            this.player.addItem(jam);
            window.Sound.playPop();
            this.showFloatingText('KAVANOZ REÇEL ALINDI!', this.jamCauldron.group.position, '#D63031');
            this.harvestCooldown = 0.18;
          }
        }
      }
    }
  }

  // Shelves stocking interaction & dynamic 3D signage/alert animation
  updateShelves(delta, elapsedTime = 0) {
    if (this.shelves) {
      this.shelves.forEach(shelf => {
        if (shelf.update) shelf.update(delta, elapsedTime, this.camera);
      });
    }

    this.stockCooldown -= delta;
    if (this.stockCooldown <= 0 && this.player.stack.length > 0) {
      this.shelves.forEach(shelf => {
        const dist = this.player.group.position.distanceTo(new THREE.Vector3(shelf.x, 0, shelf.z));
        if (dist < 2.3 && !shelf.isFull()) {
          const topItemType = this.player.stack[this.player.stack.length - 1].type;
          // Direct match or Strawberry -> Strawberry Jam conversion on shelf
          if (topItemType === shelf.itemType || (topItemType === 'STRAWBERRY' && shelf.itemType === 'STRAWBERRY_JAM')) {
            const item = this.player.removeItem();
            shelf.stockItem(item);
            this.playTransferEffect(this.player.group.position, shelf.group.position, topItemType);
            window.Sound.playStock();
            this.recordProgressEvent({ type: 'stock', itemType: topItemType, amount: 1 });
            this.stockCooldown = 0.12;
          }
        }
      });
    }
  }

  // Checkout counter: customer processing & money collection
  updateCheckout(delta) {
    const playerPos = this.player.group.position;
    const cashierSpot = new THREE.Vector3(this.checkout.x, 0, this.checkout.z + 0.5);
    const isPlayerAtRegister = playerPos.distanceTo(cashierSpot) < 1.4;

    const cashierActive = this.checkout.hasCashier || isPlayerAtRegister;
    const isFastBonus = this.checkout.hasCashier && isPlayerAtRegister;

    // Find the active processing customer or the next waiting customer in line
    const activeCustomer = this.customers.find(c => c.state === 'PROCESSING_PAYMENT');
    const waitingCustomer = this.customers.find(c => c.state === 'IN_CHECKOUT_LINE');

    if (activeCustomer) {
      if (cashierActive) {
        activeCustomer.isCashierWaiting = false;
        activeCustomer.isFastCheckout = isFastBonus;
      } else {
        activeCustomer.isCashierWaiting = true;
      }
    } else if (waitingCustomer) {
      const frontPos = new THREE.Vector3(this.checkout.x - 1.2, 0, this.checkout.z - 0.9);
      if (waitingCustomer.char.group.position.distanceTo(frontPos) < 1.1) {
        if (cashierActive) {
          waitingCustomer.startCheckoutProcess(isFastBonus);
        } else {
          waitingCustomer.isCashierWaiting = true;
        }
      }
    } else {
      if (this.checkout && this.checkout.hideProgress) {
        this.checkout.hideProgress();
      }
    }

    // Money pickup on tray
    const cashPickupPos = new THREE.Vector3(this.checkout.x + 0.92, 0, this.checkout.z - 0.15);
    if (playerPos.distanceTo(cashPickupPos) < 1.6 && this.checkout.cashOnCounter > 0) {
      let earned = this.checkout.collectCash();
      this.playTransferEffect(cashPickupPos, playerPos, null, true);
      this.money += earned;
      this.updateMoneyUI();
      window.Sound.playCoin();
      this.showFloatingText(`+$${earned}`, this.checkout.group.position, '#2ecc71');
      this.recordProgressEvent({ type: 'collectCash', amount: 1 });
      this.saveState();
    }
  }

  // Ground Unlock Pads (Purchase & Expansion)
  updateUnlockPads(time) {
    const playerPos = this.player.group.position;

    this.unlockPads.forEach((pad, index) => {
      pad.update(time);

      if (!pad.isUnlocked) {
        if (pad.currentMarketLevel !== this.progression.marketLevel) {
          pad.currentMarketLevel = this.progression.marketLevel;
          pad.updateLabel();
        }
        if (!window.GameMechanics.canPayUnlockPad(index, this.progression.marketLevel)) return;
        const dist = playerPos.distanceTo(new THREE.Vector3(pad.x, 0, pad.z));
        if (dist < 1.5 && this.money > 0) {
          const payment = window.GameMechanics.applyUnlockPayment({
            money: this.money,
            remainingCost: pad.remainingCost,
            maxChunk: Math.max(2, Math.floor(pad.remainingCost / 25))
          });
          this.money = payment.money;
          const paid = pad.pay(payment.paid);
          this.updateMoneyUI();
          window.Sound.playCoin();
          if (paid > 0) this.saveState();
        }
      }
    });
  }

  // Customer AI spawning, movement collision & Neo-Brutalist speech bubbles
  updateCustomers(delta) {
    // Active neighborhood building effects
    const buildingEffects = (this.neighborhoodBuildingsState && window.GameMechanics?.getActiveNeighborhoodEffects)
      ? window.GameMechanics.getActiveNeighborhoodEffects(this.neighborhoodBuildingsState)
      : { extraCustomerCapacity: 0, customerSpawnRateBoost: 0, morningRushHour: false, residentAffinityGainBoost: 0 };

    const baseSpawnRate = this.isRushHour ? 1.4 : 4.0;
    const spawnRate = Math.max(0.8, baseSpawnRate * (1 - (buildingEffects.customerSpawnRateBoost || 0)));
    const maxCapacity = (this.isRushHour ? 9 : 5) + (buildingEffects.extraCustomerCapacity || 0);

    const dayTime = this.dayState ? window.GameMechanics.getResidentDayTime(this.dayState.clock) : 'morning';
    if (buildingEffects.morningRushHour && dayTime === 'morning' && !this.isRushHour && this.rushHourCooldown <= 10.0) {
      this.isRushHour = true;
      this.rushHourTimer = 25.0;
      const banner = document.getElementById('rush-hour-banner');
      if (banner) banner.classList.remove('hidden');
      this.showFloatingText('OKUL ÇIKIŞI SABAH AKINI BAŞLADI!', this.player.group.position, '#FFE600');
    }

    this.customerSpawnCooldown -= delta;
    if (this.customerSpawnCooldown <= 0 && this.customers.length < maxCapacity) {
      const modes = ['CAR', 'CAR', 'SCOOTER', 'BICYCLE', 'WALK', 'WALK'];
      const mode = modes[Math.floor(Math.random() * modes.length)];
      let spot = null;
      let vehicle = null;
      let spawnPos;

      if (this.parkingLot && (mode === 'CAR' || mode === 'SCOOTER' || mode === 'BICYCLE')) {
        spot = this.parkingLot.reserveSpot(mode);
        if (spot) {
          vehicle = new VoxelVehicle(this.scene, mode);
          vehicle.group.position.set(spot.x, 0, spot.z);
          vehicle.group.rotation.y = 0;
          spot.vehicle = vehicle;
          spawnPos = new THREE.Vector3(spot.x + (mode === 'CAR' ? 0.9 : 0.45), 0, spot.z + 0.3);
        }
      }

      if (!vehicle) {
        const walkSide = Math.random() > 0.5 ? -24.0 : 24.0;
        spawnPos = new THREE.Vector3(walkSide, 0, -25.5);
      }

      // Sample resident candidate
      const residentCandidate = (this.neighborhoodState && window.GameMechanics?.getResidentSpawnCandidate)
        ? window.GameMechanics.getResidentSpawnCandidate(this.neighborhoodState, dayTime)
        : null;

      const customer = new CustomerAI(
        this.scene,
        spawnPos,
        this.shelves,
        this.checkout,
        residentCandidate ? residentCandidate.archetype : null,
        mode,
        spot,
        vehicle,
        residentCandidate
      );
      this.customers.push(customer);
      this.customerSpawnCooldown = spawnRate;
    }

    // VIP Customer Spawn (Arrives in luxury gold/purple car or limousine)
    this.vipSpawnTimer -= delta;
    if (this.vipSpawnTimer <= 0 && this.shelves.length >= 4) {
      let vipSpot = this.parkingLot ? this.parkingLot.reserveSpot('CAR') : null;
      let vipVehicle = null;
      let spawnPos;

      if (vipSpot) {
        vipVehicle = new VoxelVehicle(this.scene, 'VIP');
        vipVehicle.group.position.set(vipSpot.x, 0, vipSpot.z);
        vipVehicle.group.rotation.y = 0;
        vipSpot.vehicle = vipVehicle;
        spawnPos = new THREE.Vector3(vipSpot.x + 0.9, 0, vipSpot.z + 0.3);
      } else {
        spawnPos = new THREE.Vector3(0, 0, -25.5);
      }

      const vip = new VIPCustomerAI(this.scene, spawnPos, this.shelves, this.checkout, 'VIP', vipSpot, vipVehicle);
      this.customers.push(vip);
      this.vipSpawnTimer = 50.0 + Math.random() * 25.0;
      this.showFloatingText('VIP GURME MÜŞTERİ GELDİ! (2.5x KAZANÇ)', vip.char.group.position, '#FFE600');
      window.Sound.playUnlock();
    }

    // Shoplifter Spawn (Sneaks in through the north glass entrance)
    this.shoplifterSpawnTimer -= delta;
    if (this.shoplifterSpawnTimer <= 0 && this.shelves.length >= 3) {
      const spawnPos = new THREE.Vector3((Math.random() - 0.5) * 4.0, 0, -25.5);
      const thief = new ShoplifterAI(this.scene, spawnPos, this.shelves, () => {});
      this.customers.push(thief);
      this.shoplifterSpawnTimer = 65.0 + Math.random() * 30.0;
      this.showFloatingText('DİKKAT: HIRSIZ MAĞAZADA! YAKALAYIN!', thief.char.group.position, '#FF5252');
      window.Sound.playUnlock();
    }

    for (let i = this.customers.length - 1; i >= 0; i--) {
      const c = this.customers[i];
      c.update(delta, this.customers);

      this.collision.resolveCircle(c.char.group.position, 0.40);
      this.updateCustomerBubble(c);

      if (c.isFinished) {
        if (c.bubbleEl && c.bubbleEl.parentNode) {
          c.bubbleEl.parentNode.removeChild(c.bubbleEl);
          c.bubbleEl = null;
        }
        if (c.destroy) {
          c.destroy();
        } else if (c.char && c.char.destroy) {
          c.char.destroy();
        }
        this.customers.splice(i, 1);
      }
    }
  }

  updateCustomerBubble(c) {
    if (!c) return;
    if (!c.bubbleEl) {
      c.bubbleEl = document.createElement('div');
      c.bubbleEl.className = 'customer-bubble';
      document.getElementById('ui-overlay').appendChild(c.bubbleEl);
    }

    const info = c.getSpeechInfo();
    const maxBubbleDistance = info.isVIP || info.desiredType === 'THIEF' || info.desiredType === 'COURIER' ? 24 : 15;
    const distanceToPlayer = c.char.group.position.distanceTo(this.player.group.position);
    let iconSvg = '';
    let label = '';
    let bubbleClass = 'customer-bubble';
    if (distanceToPlayer > maxBubbleDistance * 0.72) bubbleClass += ' far';

    if (info.isVIP) bubbleClass += ' vip';

    if (c.isCashierWaiting) {
      bubbleClass += ' warning';
      iconSvg = BRUTAL_ICONS.ALERT || BRUTAL_ICONS.CASHIER;
      label = 'KASA BEKLİYOR';
    } else if (info.desiredType === 'COURIER') {
      if (info.state === 'WALKING_INTO_STORE') {
        iconSvg = BRUTAL_ICONS.DELIVERY || BRUTAL_ICONS.PACKAGE;
        label = 'SİPARİŞE GELDİM';
      } else if (info.state === 'WAITING_FOR_PARCEL') {
        bubbleClass += ' warning';
        iconSvg = BRUTAL_ICONS.PACKAGE || BRUTAL_ICONS.DELIVERY;
        label = `SİPARİŞ BEKLENİYOR [${info.itemsBought}/${info.totalReq}]`;
      } else if (info.state === 'PICKING_UP' || info.state === 'WALKING_OUT_STORE') {
        bubbleClass += ' paid';
        iconSvg = BRUTAL_ICONS.CHECK;
        label = 'PAKET ALINDI, YOLDAYIM!';
      } else if (info.state === 'DRIVING_AWAY') {
        bubbleClass += ' paid';
        iconSvg = BRUTAL_ICONS.SPEED || BRUTAL_ICONS.CHECK;
        label = 'TESLİMATTA!';
      }
    } else if (info.state === 'PROCESSING_PAYMENT') {
      bubbleClass += ' happy';
      iconSvg = BRUTAL_ICONS.CASH;
      const pct = Math.min(99, Math.floor((c.checkoutProgress || 0) * 100));
      const fastTag = c.isFastCheckout ? 'HIZLI ' : '';
      label = `${fastTag}ÖDEME %${pct}`;
    } else if (info.isStartled) {
      bubbleClass += ' warning';
      iconSvg = BRUTAL_ICONS.ALERT;
      label = '!';
    } else if (info.isDisappointed || (info.state === 'LEAVING' && info.itemsBought === 0)) {
      bubbleClass += ' warning';
      iconSvg = BRUTAL_ICONS.ALERT;
      label = 'STOK YOK!';
    } else if (info.state === 'WALKING_TO_SHELF') {
      const wantedSvg = BRUTAL_ICONS[info.desiredType] || BRUTAL_ICONS.TOMATO;
      const qtyStr = info.activeQty ? ` x${info.activeQty}` : '';
      if (!info.hasStock) {
        bubbleClass += ' warning';
        iconSvg = BRUTAL_ICONS.ALERT + wantedSvg;
        label = `BEKLİYOR${qtyStr}`;
      } else {
        iconSvg = wantedSvg;
        label = `${this.getCompactItemLabel(info.desiredType)}${qtyStr}`;
      }
    } else if (info.state === 'WALKING_TO_CHECKOUT' || info.state === 'IN_CHECKOUT_LINE') {
      bubbleClass += ' happy';
      iconSvg = BRUTAL_ICONS.CASH;
      label = info.isVIP ? `VIP KASA (${info.itemsBought})` : `KASA (${info.itemsBought})`;
    } else if (info.state === 'LEAVING') {
      bubbleClass += ' paid';
      iconSvg = BRUTAL_ICONS.CHECK;
      label = info.isVIP ? 'VIP ÖDENDİ' : 'ÖDENDİ';
    } else if (info.state === 'SNEAKING_TO_SHELF') {
      bubbleClass += ' warning';
      iconSvg = BRUTAL_ICONS.THIEF;
      label = 'HIRSIZ!';
    } else if (info.state === 'STUNNED') {
      bubbleClass += ' warning';
      iconSvg = BRUTAL_ICONS.ALERT;
      label = 'SERSEMLEDİ!';
    } else if (info.state === 'FLEEING_PANIC' || info.state === 'FLEEING') {
      bubbleClass += ' warning';
      iconSvg = BRUTAL_ICONS.ALERT;
      label = 'PANİK KAÇIŞ!';
    } else if (info.state === 'CAUGHT') {
      bubbleClass += ' paid';
      iconSvg = BRUTAL_ICONS.CHECK;
      label = 'YAKALANDI';
    }

    c.bubbleEl.className = bubbleClass;
    c.bubbleEl.innerHTML = `${iconSvg}<span>${label}</span>`;

    const headPos = c.char.group.position.clone();
    headPos.y += 2.0;
    headPos.project(this.camera);

    if (headPos.z < 1 && distanceToPlayer <= maxBubbleDistance) {
      const x = (headPos.x * 0.5 + 0.5) * window.innerWidth;
      const y = (-(headPos.y * 0.5) + 0.5) * window.innerHeight;
      c.bubbleEl.style.left = `${x}px`;
      c.bubbleEl.style.top = `${y}px`;
      c.bubbleEl.style.display = 'flex';
    } else {
      c.bubbleEl.style.display = 'none';
    }
  }

  getCompactItemLabel(itemType) {
    const compactNames = {
      TOMATO: 'Domates',
      EGG: 'Yumurta',
      WHEAT: 'Buğday',
      FLOUR: 'Un',
      BREAD: 'Ekmek',
      MILK: 'Süt',
      CHEESE: 'Peynir',
      CORN: 'Mısır',
      POPCORN: 'Mısır',
      APPLE: 'Elma',
      APPLE_JUICE: 'Elma Suyu',
      APPLE_PIE: 'Turta',
      STRAWBERRY: 'Çilek',
      CARROT: 'Havuç',
      STRAWBERRY_JAM: 'Reçel',
      PIZZA: 'Pizza',
      ICE_CREAM: 'Dondurma',
      SALAD_BOWL: 'Salata'
    };
    return compactNames[itemType] || getItemDisplayName(itemType);
  }

  // Helper Staff AI & Dynamic Status Indicators
  updateHelpers(delta) {
    for (let i = 0; i < this.helpers.length; i++) {
      const helper = this.helpers[i];
      helper.update(delta);
      this.updateHelperBadge(helper);
    }
  }

  updateHelperBadge(helper) {
    if (!helper.badgeEl) {
      helper.badgeEl = document.createElement('div');
      helper.badgeEl.className = 'staff-badge';
      document.getElementById('ui-overlay').appendChild(helper.badgeEl);
    }

    const info = helper.getStatusInfo ? helper.getStatusInfo() : { task: helper.currentTask, label: helper.currentTaskLabel, role: helper.role, stackCount: helper.char.stack.length };
    let iconSvg = BRUTAL_ICONS.SPEED || '';
    if (info.task === 'CASHIER') iconSvg = BRUTAL_ICONS.CASHIER || BRUTAL_ICONS.CASH;
    else if (info.task === 'CLEAN_SPILL') iconSvg = BRUTAL_ICONS.STAR || BRUTAL_ICONS.CHECK;
    else if (info.task === 'RESTOCK') iconSvg = BRUTAL_ICONS.PACKAGE || BRUTAL_ICONS.DELIVERY;
    else if (info.task === 'SUPPLY_FACTORY') iconSvg = BRUTAL_ICONS.FACTORY || BRUTAL_ICONS.DELIVERY;
    else if (info.task === 'HARVEST') iconSvg = BRUTAL_ICONS.TOMATO;

    const roleClass = (info.role || 'farmer').toLowerCase();
    helper.badgeEl.className = `staff-badge role-${roleClass}`;
    const stackBadge = info.stackCount > 0 ? `<b class="staff-stack">${info.stackCount}</b>` : '';
    helper.badgeEl.innerHTML = `${iconSvg}<span>${info.label || 'ÇALIŞIYOR'}</span>${stackBadge}`;

    const headPos = helper.char.group.position.clone();
    headPos.y += 2.0;
    headPos.project(this.camera);

    if (headPos.z < 1) {
      const x = (headPos.x * 0.5 + 0.5) * window.innerWidth;
      const y = (-(headPos.y * 0.5) + 0.5) * window.innerHeight;
      helper.badgeEl.style.left = `${x}px`;
      helper.badgeEl.style.top = `${y}px`;
      helper.badgeEl.style.display = 'flex';
    } else {
      helper.badgeEl.style.display = 'none';
    }
  }

  // Dynamic 3D Guidance Arrow & Bottom Objective HUD Machine
  updateGuidanceAndObjective(time) {
    const pPos = this.player.group.position;
    let target = null;
    let iconKey = 'TOMATO';
    let text = 'DOMATES TOPLA';

    // 1. Shoplifter on loose -> highest priority
    const thief = this.customers.find(c => c instanceof ShoplifterAI && !c.isCaught && !c.isFinished);
    if (thief) {
      target = thief.char.group.position;
      iconKey = 'THIEF';
      text = 'HIRSIZI KOVALA VE YAKALA!';
    }
    // 2. Cash on counter has high priority
    else if (this.checkout && this.checkout.cashOnCounter > 0) {
      target = new THREE.Vector3(this.checkout.x + 0.92, 0, this.checkout.z - 0.15);
      iconKey = 'CASH';
      text = `PARALARI TOPLA (+$${this.checkout.cashOnCounter})`;
    }
    // 3. Customers waiting in checkout line (if no auto cashier and player not cashier)
    else if (this.customers.some(c => c.state === 'IN_CHECKOUT_LINE') && !this.checkout.hasCashier) {
      target = new THREE.Vector3(this.checkout.x, 0, this.checkout.z + 0.5);
      iconKey = 'CASHIER';
      text = 'KASADA ÖDEME AL';
    }
    // 4. Carrying Pizza -> Pizza Shelf
    else if (this.player.stack.some(i => i.type === 'PIZZA') && this.pizzaShelf && !this.pizzaShelf.isFull()) {
      target = new THREE.Vector3(this.pizzaShelf.x, 0, this.pizzaShelf.z + 1.2);
      iconKey = 'PIZZA';
      text = 'GURME PİZZALARI RAFA YERLEŞTİR';
    }
    // 5. Carrying Salad Bowl -> Salad Shelf
    else if (this.player.stack.some(i => i.type === 'SALAD_BOWL') && this.saladShelf && !this.saladShelf.isFull()) {
      target = new THREE.Vector3(this.saladShelf.x, 0, this.saladShelf.z + 1.2);
      iconKey = 'SALAD_BOWL';
      text = 'AKDENİZ SALATALARINI RAFA YERLEŞTİR';
    }
    // 6. Carrying Ice Cream -> Ice Cream Shelf
    else if (this.player.stack.some(i => i.type === 'ICE_CREAM') && this.iceCreamShelf && !this.iceCreamShelf.isFull()) {
      target = new THREE.Vector3(this.iceCreamShelf.x, 0, this.iceCreamShelf.z + 1.2);
      iconKey = 'ICE_CREAM';
      text = 'DONDURMALARI RAFA YERLEŞTİR';
    }
    // 7. Carrying Strawberry -> Ice Cream Machine, Strawberry Jam Shelf
    else if (this.player.stack.some(i => i.type === 'STRAWBERRY')) {
      if (this.iceCreamMachine && this.iceCreamMachine.currentStrawberry < this.iceCreamMachine.capacity) {
        target = this.iceCreamMachine.inputPadPos;
        iconKey = 'ICE_CREAM';
        text = 'ÇİLEKLERİ DONDURMA MAKİNESİNE AT';
      } else if (this.strawberryShelf && !this.strawberryShelf.isFull()) {
        target = new THREE.Vector3(this.strawberryShelf.x, 0, this.strawberryShelf.z + 1.2);
        iconKey = 'STRAWBERRY_JAM';
        text = 'ÇİLEK REÇELLERİNİ RAFA YERLEŞTİR';
      }
    }
    // 8. Carrying Carrot -> Carrot Shelf
    else if (this.player.stack.some(i => i.type === 'CARROT')) {
      if (this.carrotShelf && !this.carrotShelf.isFull()) {
        target = new THREE.Vector3(this.carrotShelf.x, 0, this.carrotShelf.z + 1.2);
        iconKey = 'CARROT';
        text = 'HAVUÇLARI RAFA YERLEŞTİR';
      }
    }
    // 9. Carrying Apple Pie -> Pie Shelf
    else if (this.player.stack.some(i => i.type === 'APPLE_PIE') && this.pieShelf && !this.pieShelf.isFull()) {
      target = new THREE.Vector3(this.pieShelf.x, 0, this.pieShelf.z + 1.2);
      iconKey = 'APPLE_PIE';
      text = 'GURME TURTALARI RAFA YERLEŞTİR';
    }
    // 10. Carrying Apple Juice -> Juice Shelf
    else if (this.player.stack.some(i => i.type === 'APPLE_JUICE') && this.juiceShelf && !this.juiceShelf.isFull()) {
      target = new THREE.Vector3(this.juiceShelf.x, 0, this.juiceShelf.z + 1.2);
      iconKey = 'APPLE_JUICE';
      text = 'MEYVE SULARINI RAFA YERLEŞTİR';
    }
    // 11. Carrying Popcorn -> Popcorn Shelf
    else if (this.player.stack.some(i => i.type === 'POPCORN') && this.popcornShelf && !this.popcornShelf.isFull()) {
      target = new THREE.Vector3(this.popcornShelf.x, 0, this.popcornShelf.z + 1.2);
      iconKey = 'POPCORN';
      text = 'PATLAMIŞ MISIRLARI RAFA YERLEŞTİR';
    }
    // 12. Carrying Corn -> Animals Super Feed, Popcorn Machine, or Corn Shelf
    else if (this.player.stack.some(i => i.type === 'CORN')) {
      if (this.chickenCoop && this.chickenCoop.eggs.length < this.chickenCoop.eggCapacity) {
        target = this.chickenCoop.feedPadPos;
        iconKey = 'CORN';
        text = 'MISIRLA TAVUĞU SÜPER BESLE (+2 YUMURTA)';
      } else if (this.cowPen && this.cowPen.milkBottles.length < this.cowPen.milkCapacity) {
        target = this.cowPen.feedPadPos;
        iconKey = 'CORN';
        text = 'MISIRLA İNEĞİ SÜPER BESLE (+2 SÜT)';
      } else if (this.popcornMaker && this.popcornMaker.currentCorn < this.popcornMaker.cornCapacity) {
        target = this.popcornMaker.inputPadPos;
        iconKey = 'POPCORN';
        text = 'MISIRLARI MAKİNEYE BOŞALT';
      } else if (this.saladPrepBar && this.saladPrepBar.currentCorn < this.saladPrepBar.capacity) {
        target = this.saladPrepBar.inputPadPos;
        iconKey = 'SALAD_BOWL';
        text = 'MISIRLARI SALATA BARINA AT';
      } else if (this.cornShelf && !this.cornShelf.isFull()) {
        target = new THREE.Vector3(this.cornShelf.x, 0, this.cornShelf.z + 1.2);
        iconKey = 'CORN';
        text = 'TAZE MISIRLARI RAFA YERLEŞTİR';
      }
    }
    // 13. Carrying Apples -> Bakery Oven or Juicer
    else if (this.player.stack.some(i => i.type === 'APPLE')) {
      if (this.bakeryOven && this.bakeryOven.currentFlour > 0 && this.bakeryOven.currentApples < this.bakeryOven.flourCapacity) {
        target = this.bakeryOven.inputPadPos;
        iconKey = 'APPLE_PIE';
        text = 'ELMALARI TURTA İÇİN FIRINA AT';
      } else if (this.juicer && this.juicer.currentApples < this.juicer.appleCapacity) {
        target = this.juicer.inputPadPos;
        iconKey = 'APPLE_JUICE';
        text = 'ELMALARI MEYVE SIKACAĞINA AT';
      }
    }
    // 14. Carrying Cheese -> Salad Prep Bar, Bakery Oven (Pizza) or Cheese Shelf
    else if (this.player.stack.some(i => i.type === 'CHEESE')) {
      if (this.bakeryOven && this.bakeryOven.currentFlour > 0 && this.bakeryOven.currentTomatoes > 0 && this.bakeryOven.currentCheese < this.bakeryOven.flourCapacity) {
        target = this.bakeryOven.inputPadPos;
        iconKey = 'PIZZA';
        text = 'PEYNİRİ PİZZA İÇİN FIRINA AT';
      } else if (this.saladPrepBar && this.saladPrepBar.currentCheese < this.saladPrepBar.capacity) {
        target = this.saladPrepBar.inputPadPos;
        iconKey = 'SALAD_BOWL';
        text = 'PEYNİRİ SALATA BARINA AT';
      } else if (this.cheeseShelf && !this.cheeseShelf.isFull()) {
        target = new THREE.Vector3(this.cheeseShelf.x, 0, this.cheeseShelf.z + 1.2);
        iconKey = 'CHEESE';
        text = 'PEYNİRLERİ RAFA YERLEŞTİR';
      }
    }
    // 15. Carrying Milk -> Ice Cream Machine, Cheese Processor
    else if (this.player.stack.some(i => i.type === 'MILK')) {
      if (this.iceCreamMachine && this.iceCreamMachine.currentMilk < this.iceCreamMachine.capacity) {
        target = this.iceCreamMachine.inputPadPos;
        iconKey = 'ICE_CREAM';
        text = 'SÜTÜ DONDURMA MAKİNESİNE DÖK';
      } else if (this.cheeseProcessor && this.cheeseProcessor.currentMilk < this.cheeseProcessor.milkCapacity) {
        target = this.cheeseProcessor.inputPadPos;
        iconKey = 'MILK';
        text = 'SÜTLERİ PEYNİR KAZANINA BOŞALT';
      }
    }
    // 16. Carrying Bread -> Bread Shelf
    else if (this.player.stack.some(i => i.type === 'BREAD') && this.breadShelf && !this.breadShelf.isFull()) {
      target = new THREE.Vector3(this.breadShelf.x, 0, this.breadShelf.z + 1.2);
      iconKey = 'BREAD';
      text = 'EKMEKLERİ RAFA YERLEŞTİR';
    }
    // 17. Carrying Flour -> Bakery Oven
    else if (this.player.stack.some(i => i.type === 'FLOUR') && this.bakeryOven && this.bakeryOven.currentFlour < this.bakeryOven.flourCapacity) {
      target = this.bakeryOven.inputPadPos;
      iconKey = 'FLOUR';
      text = 'UNLARI FIRINA AT';
    }
    // 18. Carrying Wheat -> Flour Mill or Cow Pen
    else if (this.player.stack.some(i => i.type === 'WHEAT')) {
      if (this.cowPen && this.cowPen.currentWheat < 3) {
        target = this.cowPen.feedPadPos;
        iconKey = 'COW';
        text = 'BUĞDAYLA İNEĞİ BESLE';
      } else if (this.flourMill && this.flourMill.currentWheat < this.flourMill.wheatCapacity) {
        target = this.flourMill.inputPadPos;
        iconKey = 'WHEAT';
        text = 'BUĞDAYI DEĞİRMENE BOŞALT';
      }
    }
    // 19. Carrying Eggs -> Egg Shelf
    else if (this.player.stack.some(i => i.type === 'EGG') && this.eggShelf && !this.eggShelf.isFull()) {
      target = new THREE.Vector3(this.eggShelf.x, 0, this.eggShelf.z + 1.2);
      iconKey = 'EGG';
      text = 'YUMURTALARI RAFA YERLEŞTİR';
    }
    // 20. Carrying Tomatoes -> Salad Bar, Pizza Oven, Chicken, or Shelf
    else if (this.player.stack.some(i => i.type === 'TOMATO')) {
      if (this.bakeryOven && this.bakeryOven.currentFlour > 0 && this.bakeryOven.currentTomatoes < this.bakeryOven.flourCapacity) {
        target = this.bakeryOven.inputPadPos;
        iconKey = 'PIZZA';
        text = 'DOMATESİ PİZZA İÇİN FIRINA AT';
      } else if (this.saladPrepBar && this.saladPrepBar.currentTomato < this.saladPrepBar.capacity) {
        target = this.saladPrepBar.inputPadPos;
        iconKey = 'SALAD_BOWL';
        text = 'DOMATESİ SALATA BARINA AT';
      } else if (this.chickenCoop && this.chickenCoop.currentFeed < 3) {
        target = this.chickenCoop.feedPadPos;
        iconKey = 'CHICKEN';
        text = 'DOMATESLERLE TAVUĞU BESLE';
      } else if (this.tomatoShelf && !this.tomatoShelf.isFull()) {
        target = new THREE.Vector3(this.tomatoShelf.x, 0, this.tomatoShelf.z + 1.2);
        iconKey = 'TOMATO';
        text = 'DOMATESLERİ RAFA YERLEŞTİR';
      }
    }
    // 21. Fresh Ice Cream Ready at Machine
    else if (this.iceCreamMachine && this.iceCreamMachine.iceCreams.length > 0 && this.player.stack.length < this.player.maxStack) {
      target = this.iceCreamMachine.outputPadPos;
      iconKey = 'ICE_CREAM';
      text = 'DONDURMALARI TOPLA';
    }
    // 22. Fresh Salads Ready at Prep Bar
    else if (this.saladPrepBar && this.saladPrepBar.saladBowls.length > 0 && this.player.stack.length < this.player.maxStack) {
      target = this.saladPrepBar.outputPadPos;
      iconKey = 'SALAD_BOWL';
      text = 'AKDENİZ SALATALARINI TOPLA';
    }
    // 23. Fresh Popcorn Ready at Machine
    else if (this.popcornMaker && this.popcornMaker.popcornBoxes.length > 0 && this.player.stack.length < this.player.maxStack) {
      target = this.popcornMaker.outputPadPos;
      iconKey = 'POPCORN';
      text = 'SICAK MISIRLARI TOPLA';
    }
    // 24. Fresh Apple Juice Ready at Juicer
    else if (this.juicer && this.juicer.juiceBottles.length > 0 && this.player.stack.length < this.player.maxStack) {
      target = this.juicer.outputPadPos;
      iconKey = 'APPLE_JUICE';
      text = 'TAZE MEYVE SULARINI TOPLA';
    }
    // 25. Fresh Cheese Ready at Processor
    else if (this.cheeseProcessor && this.cheeseProcessor.cheeseWheels.length > 0 && this.player.stack.length < this.player.maxStack) {
      target = this.cheeseProcessor.outputPadPos;
      iconKey = 'CHEESE';
      text = 'TAZE PEYNİRLERİ TOPLA';
    }
    // 26. Fresh Milk Ready at Cow Pen
    else if (this.cowPen && this.cowPen.milkBottles.length > 0 && this.player.stack.length < this.player.maxStack) {
      target = this.cowPen.milkPadPos;
      iconKey = 'MILK';
      text = 'SAĞILAN SÜTLERİ TOPLA';
    }
    // 27. Fresh Baked Bread / Apple Pie / Pizza Ready at Oven
    else if (this.bakeryOven && this.bakeryOven.breadLoaves.length > 0 && this.player.stack.length < this.player.maxStack) {
      target = this.bakeryOven.outputPadPos;
      const topType = this.bakeryOven.breadLoaves[this.bakeryOven.breadLoaves.length - 1].itemType;
      iconKey = topType === 'PIZZA' ? 'PIZZA' : (topType === 'APPLE_PIE' ? 'APPLE_PIE' : 'BREAD');
      text = 'PİŞEN FIRIN ÜRÜNLERİNİ TOPLA';
    }
    // 28. Fresh Ground Flour Ready at Mill
    else if (this.flourMill && this.flourMill.flourSacks.length > 0 && this.player.stack.length < this.player.maxStack) {
      target = this.flourMill.outputPadPos;
      iconKey = 'FLOUR';
      text = 'ÖĞÜTÜLEN UNLARI TOPLA';
    }
    // 29. Fresh Eggs Ready at Coop
    else if (this.chickenCoop && this.chickenCoop.eggs.length > 0 && this.player.stack.length < this.player.maxStack) {
      target = this.chickenCoop.eggPadPos;
      iconKey = 'EGG';
      text = 'TAZE YUMURTALARI TOPLA';
    }
    // 30. Ripe Strawberries in Plot
    else if (this.strawberryPlot && this.strawberryPlot.plantSlots.some(s => s.isRipe) && this.player.stack.length < this.player.maxStack) {
      target = new THREE.Vector3(this.strawberryPlot.x, 0, this.strawberryPlot.z);
      iconKey = 'STRAWBERRY';
      text = 'TATLI ÇİLEKLERİ TOPLA';
    }
    // 31. Ripe Carrots in Plot
    else if (this.carrotPlot && this.carrotPlot.plantSlots.some(s => s.isRipe) && this.player.stack.length < this.player.maxStack) {
      target = new THREE.Vector3(this.carrotPlot.x, 0, this.carrotPlot.z);
      iconKey = 'CARROT';
      text = 'ÇITIR HAVUÇLARI TOPLA';
    }
    // 32. Unlock Pad ready to purchase
    else {
      const buyablePad = this.unlockPads.find(p => !p.isUnlocked && this.money >= Math.min(20, p.remainingCost));
      if (buyablePad) {
        target = new THREE.Vector3(buyablePad.x, 0, buyablePad.z);
        iconKey = 'STAR';
        text = `${buyablePad.title} AÇ ($${buyablePad.remainingCost})`;
      } else if (this.wheatPlot && (!this.breadShelf || !this.breadShelf.hasItems()) && this.player.stack.length < this.player.maxStack) {
        target = new THREE.Vector3(this.wheatPlot.x, 0, this.wheatPlot.z);
        iconKey = 'WHEAT';
        text = 'BUĞDAY TOPLA';
      } else if (this.player.stack.length < this.player.maxStack) {
        target = new THREE.Vector3(this.tomatoPlot.x, 0, this.tomatoPlot.z);
        iconKey = 'TOMATO';
        text = 'DOMATES TOPLA';
      } else {
        target = new THREE.Vector3(this.tomatoShelf.x, 0, this.tomatoShelf.z + 1.2);
        iconKey = 'TOMATO';
        text = 'RAFLARI DOLDUR';
      }
    }

    if (this.guidanceArrow) {
      this.guidanceArrow.update(time, pPos, target);
    }

    this.currentGuidanceHint = { iconKey, text };
  }

  // Floating Capacity Bubble above Player
  updateCapacityIndicator() {
    const stackCount = this.player.stack.length;
    const maxStack = this.player.maxStack;

    if (stackCount > 0) {
      this.capacityBubble.style.opacity = '1';
      this.capacityText.textContent = `${stackCount} / ${maxStack}`;

      if (stackCount >= maxStack) {
        this.capacityBubble.classList.add('full');
      } else {
        this.capacityBubble.classList.remove('full');
      }

      const headPos = this.player.group.position.clone();
      headPos.y += 2.2;
      headPos.project(this.camera);

      const x = (headPos.x * 0.5 + 0.5) * window.innerWidth;
      const y = (-(headPos.y * 0.5) + 0.5) * window.innerHeight;

      this.capacityBubble.style.left = `${x}px`;
      this.capacityBubble.style.top = `${y}px`;
    } else {
      this.capacityBubble.style.opacity = '0';
    }
  }

  // Save / Load via LocalStorage
  saveState() {
    try {
      if (this.isLoadingSave) return;
      const data = {
        version: 2,
        state: {
          money: this.money,
          unlockedFeatures: this.unlockedFeatures,
          upgrades: this.upgrades,
          unlockPadCosts: this.unlockPads.map(pad => pad.remainingCost),
          meta: this.saveMeta || {},
          stats: this.stats || {},
          quests: this.progression || window.GameMechanics.createProgressionState(),
          dayState: this.dayState || window.GameMechanics.createDayState(),
          dailyDemand: this.dailyDemand || null,
          specialization: this.specialization || window.GameMechanics.createSpecializationState(),
          pricing: this.pricing || window.GameMechanics.createPricingState(),
          retention: this.retention || window.GameMechanics.createRetentionState(),
          cosmetics: this.cosmetics || {},
          branches: this.branches || {},
          storage: this.storage || {},
          staffSettings: this.staffSettings || {},
          neighborhood: this.neighborhoodState || window.GameMechanics.createNeighborhoodState(),
          brands: this.brandState || window.GameMechanics.createBrandState(),
          dayChoice: this.activeDayChoice || null,
          neighborhoodBuildings: this.neighborhoodBuildingsState || window.GameMechanics.createNeighborhoodBuildingState(),
          lastSavedAt: Date.now()
        }
      };
      localStorage.setItem('mini_mart_save', JSON.stringify(data));
    } catch (e) {}
  }

  loadState() {
    try {
      const saved = localStorage.getItem('mini_mart_save');
      if (saved) {
        const normalized = window.GameMechanics.normalizeSaveData(JSON.parse(saved));
        const data = normalized.state;
        this.isLoadingSave = true;
        if (typeof data.money === 'number') this.money = data.money;
        this.updateMoneyUI();

        this.saveMeta = data.meta || {};
        this.stats = data.stats || {};
        this.progression = window.GameMechanics.createProgressionState(data.quests || {});
        this.dayState = window.GameMechanics.createDayState(data.dayState || {});
        this.dailyDemand = data.dailyDemand || null;
        this.specialization = window.GameMechanics.createSpecializationState(data.specialization || {});
        this.pricing = window.GameMechanics.createPricingState(data.pricing || {});
        this.retention = window.GameMechanics.createRetentionState(data.retention || {});
        this.renderPricingUI();
        this.cosmetics = data.cosmetics || {};
        if (['coral', 'violet'].includes(this.cosmetics.theme)) {
          this.cosmetics.unlockedThemes = [...new Set([...(this.cosmetics.unlockedThemes || []), this.cosmetics.theme])];
        }
        this.renderSideQuestUI();
        this.branches = data.branches || {};
        this.storage = window.GameMechanics.createStockTargets(data.storage || {});
        this.staffSettings = window.GameMechanics.createStaffSettings(data.staffSettings || {});
        this.neighborhoodState = window.GameMechanics.createNeighborhoodState(data.neighborhood || {});
        this.brandState = window.GameMechanics.createBrandState(data.brands || {});
        this.activeDayChoice = data.dayChoice || null;
        this.neighborhoodBuildingsState = window.GameMechanics.createNeighborhoodBuildingState(data.neighborhoodBuildings || {});
        if (this.neighborhoodBuildingsState.built && Array.isArray(this.neighborhoodBuildingsState.built)) {
          this.neighborhoodBuildingsState.built.forEach(bId => this.spawnNeighborhoodBuildingMesh(bId));
        }
        if (this.brandState && this.brandState.brands) {
          Object.entries(this.brandState.brands).forEach(([cat, bInfo]) => {
            if (bInfo && bInfo.color) {
              this.shelves.forEach(shelf => {
                if (shelf && (shelf.itemType === cat || (cat === 'STRAWBERRY_JAM' && shelf.itemType === 'STRAWBERRY'))) {
                  shelf.setBrandPackagingColor(bInfo.color);
                }
              });
            }
          });
        }
        this.renderOperationsUI();
        this.renderRetentionHud();
        this.updateMarketAppearance();

        if (data.upgrades) {
          this.upgrades = Object.assign(this.upgrades, data.upgrades);
          this.applyUpgradeEffects();
        }

        if (Array.isArray(data.unlockPadCosts)) {
          data.unlockPadCosts.forEach((cost, idx) => {
            const pad = this.unlockPads[idx];
            if (pad && typeof cost === 'number' && !pad.isUnlocked) {
              pad.remainingCost = Math.max(0, cost);
              pad.updateLabel();
            }
          });
        }

        if (data.unlockedFeatures) {
          const keys = [
            'shelf2', 'cashier', 'wheat', 'bakery', 'helper',
            'cow', 'cheese', 'helper2', 'corn', 'popcorn',
            'apple', 'pie', 'helper3', 'strawberry', 'carrot',
            'icecream', 'salad', 'pizza', 'delivery', 'helper4'
          ];
          keys.forEach((k, idx) => {
            if (data.unlockedFeatures[k] && this.unlockPads[idx] && !this.unlockPads[idx].isUnlocked) {
              this.unlockPads[idx].pay(this.unlockPads[idx].remainingCost);
            }
          });
        }
        this.isLoadingSave = false;
        const offline = window.GameMechanics.calculateOfflineIncome(data.lastSavedAt, Date.now(), this.helpers.length);
        if (offline.amount > 0) {
          this.money += offline.amount;
          this.updateMoneyUI();
          if (this.offlineNoticeTextEl) this.offlineNoticeTextEl.textContent = `ÇEVRİMDIŞI KAZANÇ: ${offline.minutes} dk · +$${offline.amount}`;
          this.offlineNoticeEl?.classList.remove('hidden');
        }
        this.saveState();
      }
    } catch (e) {
      this.isLoadingSave = false;
      console.warn('Save load failed, using fresh runtime state.', e);
    }
  }

  // Pricing & brand calculation for item checkouts
  getSalePrice(type, basePrice = null) {
    const item = ITEM_TYPES[type] || ITEM_TYPES.TOMATO;
    const base = typeof basePrice === 'number' ? basePrice : item.price;
    let price = base;

    // Pricing mode multiplier (economy / standard / premium)
    if (this.pricing && window.GameMechanics?.getProductPricingMultiplier) {
      price = Math.round(price * window.GameMechanics.getProductPricingMultiplier(this.pricing, type));
    }

    // Player Brand Bonus
    if (this.brandState && window.GameMechanics?.getBrandPriceBonus) {
      price = Math.round(price * window.GameMechanics.getBrandPriceBonus(this.brandState, type));
    }

    // Active Day Choice multiplier (e.g. bakery festival, farmers market)
    if (this.activeDayChoice && this.activeDayChoice.priceMultipliers) {
      const mult = this.activeDayChoice.priceMultipliers[type];
      if (typeof mult === 'number') {
        price = Math.round(price * mult);
      }
    }

    return price;
  }

  recordBrandSale(type, qty = 1) {
    if (!this.brandState || !window.GameMechanics?.recordBrandSale) return;
    this.brandState = window.GameMechanics.recordBrandSale(this.brandState, type, qty);
  }

  recordResidentVisit(residentId) {
    if (!this.neighborhoodState || !window.GameMechanics?.recordResidentVisit) return;
    this.neighborhoodState = window.GameMechanics.recordResidentVisit(this.neighborhoodState, residentId);
    // If cafe building is active, give bonus affinity boost
    const effects = (this.neighborhoodBuildingsState && window.GameMechanics?.getActiveNeighborhoodEffects)
      ? window.GameMechanics.getActiveNeighborhoodEffects(this.neighborhoodBuildingsState)
      : null;
    if (effects && effects.residentAffinityGainBoost > 0) {
      this.neighborhoodState = window.GameMechanics.recordResidentVisit(this.neighborhoodState, residentId);
    }
    this.saveState();
  }

  // --- Neighborhood & Community Neo-Brutalist UI ---
  initNeighborhoodUI() {
    const btn = document.getElementById('neighborhood-btn');
    const modal = document.getElementById('neighborhood-modal');
    const closeBtn = document.getElementById('neighborhood-close-btn');
    const tabs = document.querySelectorAll('.neighborhood-tab');

    if (btn) {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.openNeighborhoodModal();
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.closeNeighborhoodModal();
      });
    }

    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) this.closeNeighborhoodModal();
      });
    }

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');
        this.activeNeighborhoodTab = tab.getAttribute('data-neighborhood-tab') || 'residents';
        this.renderNeighborhoodContent();
        window.Sound.playPop();
      });
    });
  }

  toggleNeighborhoodModal() {
    if (this.isNeighborhoodOpen) this.closeNeighborhoodModal();
    else this.openNeighborhoodModal();
  }

  openNeighborhoodModal() {
    this.isNeighborhoodOpen = true;
    const modal = document.getElementById('neighborhood-modal');
    if (modal) {
      modal.classList.add('open');
      modal.classList.remove('hidden');
    }
    this.renderNeighborhoodContent();
    window.Sound.playUnlock();
  }

  closeNeighborhoodModal() {
    this.isNeighborhoodOpen = false;
    const modal = document.getElementById('neighborhood-modal');
    if (modal) {
      modal.classList.remove('open');
      modal.classList.add('hidden');
    }
  }

  renderNeighborhoodContent() {
    const container = document.getElementById('neighborhood-content');
    if (!container) return;
    container.replaceChildren();

    const tab = this.activeNeighborhoodTab || 'residents';
    if (tab === 'residents') {
      this.renderResidentsTab(container);
    } else if (tab === 'brands') {
      this.renderBrandsTab(container);
    } else if (tab === 'buildings') {
      this.renderBuildingsTab(container);
    }
  }

  renderResidentsTab(container) {
    const grid = document.createElement('div');
    grid.className = 'resident-grid';

    const residents = window.GameMechanics.NEIGHBORHOOD_RESIDENTS || [];
    residents.forEach(res => {
      const card = document.createElement('div');
      card.className = 'resident-card';

      const aff = window.GameMechanics.getResidentAffinity(this.neighborhoodState, res.id);
      const stories = window.GameMechanics.getUnlockedStories(this.neighborhoodState, res.id);
      const visits = (this.neighborhoodState && this.neighborhoodState.visits && this.neighborhoodState.visits[res.id]) || 0;
      const levelName = aff >= 5 ? 'KADİM DOST' : (aff >= 3 ? 'MÜDAVİM' : (aff >= 1 ? 'KOMŞU' : 'TANIŞ'));

      card.innerHTML = `
        <div class="resident-head">
          <div class="resident-name">${res.name}</div>
          <div class="resident-affinity-badge">[LV${aff}] ${levelName}</div>
        </div>
        <div class="resident-desc">${res.description}</div>
        <div class="resident-routine">ZİYARET VAKTİ: ${res.visitTime === 'morning' ? 'SABAH' : (res.visitTime === 'afternoon' ? 'ÖĞLE' : 'AKŞAM')} · TERCİH: ${(ITEM_TYPES[res.preferredItem] || { name: res.preferredItem }).name}</div>
        <div class="resident-perk">AVANTAJ: ${res.perkDesc} (Ziyaret: ${visits})</div>
        <div class="resident-stories-box">
          <div class="resident-stories-title">AÇILAN HİKAYELER (${stories.length}/${res.dialogues.length})</div>
          ${stories.map(s => `<div class="resident-story-item">"${s.text}"</div>`).join('')}
        </div>
      `;
      grid.appendChild(card);
    });

    container.appendChild(grid);
  }

  renderBrandsTab(container) {
    const wrap = document.createElement('div');
    wrap.className = 'brand-container';

    const categories = window.GameMechanics.BRAND_CATEGORIES || [];
    categories.forEach(cat => {
      const bInfo = (this.brandState && this.brandState.brands && this.brandState.brands[cat]) || {
        name: `${(ITEM_TYPES[cat] || { name: cat }).name} Serisi`,
        colorHex: '#d35400',
        color: '#d35400',
        quality: 'economy',
        salesCount: 0,
        reputation: 1
      };

      const activeColor = bInfo.colorHex || bInfo.color || '#d35400';
      const card = document.createElement('div');
      card.className = 'brand-card';

      const itemName = (ITEM_TYPES[cat] || { name: cat }).name;
      const bonusMult = window.GameMechanics.getBrandPriceBonus(this.brandState, cat);
      const pal = ['#ff5252', '#ff793f', '#ffe600', '#2ecc71', '#00d2d3', '#0984e3', '#6c5ce7', '#ff2a7a'];

      card.innerHTML = `
        <div class="brand-title">${itemName} - MARKA YÖNETİMİ (+%${Math.round((bonusMult - 1) * 100)} KAZANÇ)</div>
        <div class="brand-row">
          <span class="brand-label">MARKA ADI:</span>
          <input type="text" class="brand-input" data-brand-cat="${cat}" value="${bInfo.name}" maxlength="24">
        </div>
        <div class="brand-row">
          <span class="brand-label">AMBALAJ RENGİ:</span>
          <div class="brand-color-chips" data-brand-cat="${cat}">
            ${pal.map(c => `<div class="brand-color-chip ${activeColor === c ? 'active' : ''}" data-color="${c}" style="background: ${c};"></div>`).join('')}
          </div>
        </div>
        <div class="brand-row">
          <span class="brand-label">KALİTE SINIFI:</span>
          <div class="brand-tier-group" data-brand-cat="${cat}">
            <button type="button" class="brand-tier-btn ${bInfo.quality === 'economy' ? 'active' : ''}" data-tier="economy">EKONOMİ (0.9x)</button>
            <button type="button" class="brand-tier-btn ${bInfo.quality === 'artisan' ? 'active' : ''}" data-tier="artisan">ZANAAT (1.15x / 150C)</button>
            <button type="button" class="brand-tier-btn ${bInfo.quality === 'premium' ? 'active' : ''}" data-tier="premium">PREMİUM (1.35x / 500C)</button>
          </div>
        </div>
        <div class="brand-row" style="justify-content: space-between; align-items: center;">
          <div class="brand-stats">
            <span>SATIŞ ADEDİ: <b>${bInfo.salesCount || 0}</b></span>
            <span>İTİBAR: <b>[LV${bInfo.reputation || 0}]</b></span>
          </div>
          <button type="button" class="brand-save-btn" data-save-cat="${cat}">KAYDET & UYGULA</button>
        </div>
      `;

      const colorChips = card.querySelectorAll('.brand-color-chip');
      let selectedColor = activeColor;
      colorChips.forEach(chip => {
        chip.addEventListener('click', () => {
          colorChips.forEach(c => c.classList.remove('active'));
          chip.classList.add('active');
          selectedColor = chip.getAttribute('data-color');
        });
      });

      const tierBtns = card.querySelectorAll('.brand-tier-btn');
      let selectedTier = bInfo.quality;
      tierBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          tierBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          selectedTier = btn.getAttribute('data-tier');
        });
      });

      const saveBtn = card.querySelector('.brand-save-btn');
      saveBtn.addEventListener('click', () => {
        const input = card.querySelector('.brand-input');
        const nameVal = (input.value || '').trim() || `${itemName} Markası`;

        if (selectedTier !== bInfo.quality && window.GameMechanics?.canUpgradeBrandTier) {
          const check = window.GameMechanics.canUpgradeBrandTier(bInfo.quality, selectedTier, bInfo.salesCount || 0, this.cash || 0);
          if (!check.canUpgrade) {
            window.Sound.playBuzz();
            this.showFloatingText(check.reason || 'KİLİTLİ!', this.player.group.position, '#FF4757');
            return;
          }
          if (check.cost > 0) {
            this.cash -= check.cost;
            this.updateCashUI();
          }
        }

        this.brandState = window.GameMechanics.createOrUpdateBrand(this.brandState, cat, {
          name: nameVal,
          colorHex: selectedColor,
          color: selectedColor,
          quality: selectedTier
        });
        // Update shelf packaging visual tint
        this.shelves.forEach(shelf => {
          if (shelf && (shelf.itemType === cat || (cat === 'STRAWBERRY_JAM' && shelf.itemType === 'STRAWBERRY'))) {
            shelf.setBrandPackagingColor(selectedColor);
          }
        });
        window.Sound.playCoin();
        this.showFloatingText(`${nameVal} GÜNCELLENDİ!`, this.player.group.position, '#FFE600');
        this.saveState();
        this.renderBrandsTab(container);
      });

      wrap.appendChild(card);
    });

    container.appendChild(wrap);
  }

  renderBuildingsTab(container) {
    const grid = document.createElement('div');
    grid.className = 'building-grid';

    const buildings = window.GameMechanics.NEIGHBORHOOD_BUILDINGS || [];
    buildings.forEach(b => {
      const card = document.createElement('div');
      card.className = 'building-card';

      const isBuilt = this.neighborhoodBuildingsState && this.neighborhoodBuildingsState.built && this.neighborhoodBuildingsState.built.includes(b.id);
      const canBuild = !isBuilt && window.GameMechanics.canBuildNeighborhood(this.neighborhoodBuildingsState, b.id, this.money, this.progression.marketLevel);

      let actionHtml = '';
      if (isBuilt) {
        actionHtml = `<div class="building-status built">[✓ İNŞA EDİLDİ]</div>`;
      } else {
        const levelMet = this.progression.marketLevel >= b.requiredLevel;
        const moneyMet = this.money >= b.cost;
        let btnText = `İNŞA ET ($${b.cost})`;
        if (!levelMet) btnText = `SEVİYE ${b.requiredLevel} GEREKLİ`;
        else if (!moneyMet) btnText = `YETERSİZ BAKİYE ($${b.cost})`;

        actionHtml = `<button type="button" class="building-buy-btn" data-building-id="${b.id}" ${canBuild ? '' : 'disabled'}>${btnText}</button>`;
      }

      card.innerHTML = `
        <div class="building-header">
          <div class="building-name">${b.name}</div>
          <div class="building-cost-badge">$${b.cost}</div>
        </div>
        <div class="building-desc">${b.description}</div>
        <div class="building-effect">ETKİ: ${b.effectDesc} · GEREKLİ: SEVİYE ${b.requiredLevel}</div>
        ${actionHtml}
      `;

      const buyBtn = card.querySelector('.building-buy-btn');
      if (buyBtn && canBuild) {
        buyBtn.addEventListener('click', () => {
          this.purchaseNeighborhoodBuilding(b);
        });
      }

      grid.appendChild(card);
    });

    container.appendChild(grid);
  }

  purchaseNeighborhoodBuilding(buildingDef) {
    if (!window.GameMechanics.canBuildNeighborhood(this.neighborhoodBuildingsState, buildingDef.id, this.money, this.progression.marketLevel)) {
      return;
    }

    this.money -= buildingDef.cost;
    this.updateMoneyUI();
    this.neighborhoodBuildingsState = window.GameMechanics.purchaseNeighborhoodBuilding(this.neighborhoodBuildingsState, buildingDef.id);

    this.spawnNeighborhoodBuildingMesh(buildingDef.id);
    window.Sound.playUnlock();
    this.showFloatingText(`${buildingDef.name} MAHALLEYE İNŞA EDİLDİ!`, this.player.group.position, '#00D2D3');
    this.saveState();
    this.renderNeighborhoodContent();
  }

  spawnNeighborhoodBuildingMesh(buildingId) {
    if (this.builtNeighborhoodMeshes[buildingId]) return;

    let meshInstance = null;
    if (buildingId === 'bus_stop') {
      meshInstance = new VoxelBusStop(this.scene, -24.0, -31.0);
    } else if (buildingId === 'park') {
      meshInstance = new VoxelPark(this.scene, -24.0, -37.0);
    } else if (buildingId === 'cafe') {
      meshInstance = new VoxelCafe(this.scene, 24.0, -31.0);
    } else if (buildingId === 'school') {
      meshInstance = new VoxelSchool(this.scene, 24.0, -37.0);
    } else if (buildingId === 'gym') {
      meshInstance = new VoxelGym(this.scene, 0.0, -37.0);
    }

    if (meshInstance) {
      this.builtNeighborhoodMeshes[buildingId] = meshInstance;
    }
  }

  // --- Day Start Choice Neo-Brutalist System ---
  initDayChoiceUI() {
    // Day choice cards ready for dynamic presentation
  }

  presentDayChoices() {
    const modal = document.getElementById('day-choice-modal');
    const container = document.getElementById('day-choice-cards');
    if (!modal || !container) return;

    const choices = window.GameMechanics.generateDayChoices(this.dayState.day, 3);
    this.dayChoicesOffered = choices;
    container.replaceChildren();

    choices.forEach(c => {
      const card = document.createElement('div');
      card.className = 'day-choice-card';

      let bonusHtml = '';
      if (c.priceMultipliers) {
        const bonusList = Object.entries(c.priceMultipliers)
          .map(([type, mult]) => {
            const name = (ITEM_TYPES[type] || { name: type }).name;
            const pct = Math.round((mult - 1) * 100);
            return `<div class="day-choice-bonus-item">+%${pct} ${name} Geliri</div>`;
          }).join('');
        bonusHtml += `<div class="day-choice-bonuses">${bonusList}</div>`;
      }
      if (c.residentAffinityBonus) {
        bonusHtml += `<div class="day-choice-bonuses"><div class="day-choice-bonus-item">+Komşu Yakınlık Artışı</div></div>`;
      }

      card.innerHTML = `
        <div class="day-choice-badge">${c.theme} FESTİVALİ</div>
        <div class="day-choice-name">${c.name}</div>
        <div class="day-choice-desc">${c.description}</div>
        ${bonusHtml}
        <div class="day-choice-select-btn">GÜNÜN TERCİHİ OLARAK SEÇ</div>
      `;

      card.addEventListener('click', () => {
        this.selectDayChoice(c);
      });

      container.appendChild(card);
    });

    modal.classList.add('open');
    modal.classList.remove('hidden');
    window.Sound.playUnlock();
  }

  selectDayChoice(choice) {
    this.activeDayChoice = window.GameMechanics.applyDayChoice(choice);
    const modal = document.getElementById('day-choice-modal');
    if (modal) {
      modal.classList.remove('open');
      modal.classList.add('hidden');
    }
    window.Sound.playCoin();
    this.showFloatingText(`${choice.name} AKTİF!`, this.player.group.position, '#FFE600');
    this.saveState();
  }
}

// Start game when page loads
window.addEventListener('DOMContentLoaded', () => {
  window.Game = new MiniMartGame();
});
