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
  'icecream', 'salad', 'pizza', 'delivery', 'helper4',
  'coffeeMachine', 'plant', 'arcade'
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
    title: '1. PERSONEL (STAJYER)',
    desc: 'Düşük kapasite, hızlı yorulur. Ancak işe alım ücreti çok düşüktür.',
    icon: 'STAR',
    cost: 50,
    rpgStats: { speed: 0.8, capacity: 4, maxEnergy: 50, energyCost: 2 }
  },
  hireHelper2: {
    category: 'staff',
    type: 'unlock',
    unlockKey: 'helper2',
    title: '2. PERSONEL (NORMAL ÇALIŞAN)',
    desc: 'Standart kapasite ve enerji. Dengeli bir personeldir.',
    icon: 'PACKAGE',
    cost: 150,
    rpgStats: { speed: 1.0, capacity: 6, maxEnergy: 100, energyCost: 1.5 }
  },
  hireHelper3: {
    category: 'staff',
    type: 'unlock',
    unlockKey: 'helper3',
    title: '3. PERSONEL (UZMAN)',
    desc: 'Yüksek kapasite ve hız. Daha az yorulur.',
    icon: 'WHEAT',
    cost: 400,
    rpgStats: { speed: 1.3, capacity: 8, maxEnergy: 150, energyCost: 1.0 }
  },
  hireHelper4: {
    category: 'staff',
    type: 'unlock',
    unlockKey: 'helper4',
    title: '4. PERSONEL (USTA)',
    desc: 'Maksimum kapasite ve hız. Neredeyse hiç yorulmaz.',
    icon: 'FACTORY',
    cost: 1000,
    rpgStats: { speed: 1.8, capacity: 12, maxEnergy: 300, energyCost: 0.5 }
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
  },

  // --- TAB: DEKORASYON (RPG & BUFFS) ---
  decorCoffeeMachine: {
    category: 'facility', // Keeping facility category for UI tab if needed, or add new category in UI logic. Actually we can use 'facility' for decorations to appear there, or create 'decoration'. Let's use 'facility' so it appears in existing UI!
    type: 'unlock',
    unlockKey: 'coffeeMachine',
    title: 'KAHVE MAKİNESİ',
    desc: 'Çalışanların enerji yenilenme hızını %20 artırır.',
    icon: 'STAR', 
    cost: 100
  },
  decorPlant: {
    category: 'facility',
    type: 'unlock',
    unlockKey: 'plant',
    title: 'SÜS BİTKİSİ',
    desc: 'Dinlenme odasındaki atmosferi iyileştirir, enerji düşüşünü %10 yavaşlatır.',
    icon: 'WHEAT',
    cost: 150
  },
  decorArcade: {
    category: 'facility',
    type: 'unlock',
    unlockKey: 'arcade',
    title: 'ATARİ MAKİNESİ',
    desc: 'Çalışanların hızına kalıcı %15 buff sağlar.',
    icon: 'UPGRADE',
    cost: 400
  }
};

const MARKET_LAYOUT = Object.freeze({
  width: 48,
  depth: 49,
  centerX: 0,
  centerZ: 0,
  minX: -24,
  maxX: 24,
  minZ: -24.5,
  maxZ: 24.5,
  publicNorthZ: -20.5,
  groceryAisleZ: -15.0,
  freshAisleZ: -9.5,
  serviceGateZ: -1.0,
  productionNorthZ: 4.0,
  productionSouthZ: 21.5,
  checkoutConcourse: Object.freeze({
    minX: 1.5,
    maxX: 14.5,
    minZ: -21.8,
    maxZ: -16.2
  })
});

window.MARKET_LAYOUT = MARKET_LAYOUT;

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

  removeBox(tag) {
    return this.removeByTag(tag);
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
    this.checkout = null;
    this.checkout1 = null;
    this.checkout2 = null;
    this.checkout3 = null;
    this.checkouts = [];
    this.cashierBot = null;
    this.cashierBot1 = null;
    this.cashierBot2 = null;
    this.cashierBot3 = null;
    this.cashierBots = [];
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
    this.spatial = (typeof window !== 'undefined' && window.GameMechanics && window.GameMechanics.SpatialOccupancyManager)
      ? new window.GameMechanics.SpatialOccupancyManager(MARKET_LAYOUT)
      : null;
    this.cameraMode = 0;
    this.cameraPresets = [
      { name: 'STANDART İZOMETRİK', targetY: 24.0, offsetX: 0.0, offsetZ: 17.0, lookX: 0.0, lookZ: -17.0, follow: 0.70, fov: 40.0 },
      { name: 'GENİŞ KUŞBAKIŞI', targetY: 36.0, offsetX: 0.0, offsetZ: 24.0, lookX: 0.0, lookZ: -24.0, follow: 0.55, fov: 48.0 },
      { name: 'YAKIN TAKİP', targetY: 15.5, offsetX: -5.5, offsetZ: 10.5, lookX: 2.0, lookZ: -10.5, follow: 0.86, fov: 43.0 },
      { name: 'YAN PLAN', targetY: 21.0, offsetX: 18.0, offsetZ: 7.5, lookX: -18.0, lookZ: -7.5, follow: 0.72, fov: 42.0 }
    ];

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

    // Store Layout & Builder Mode State
    this.isLayoutEditMode = false;
    this.selectedFixture = null;
    this.originalFixturePos = null;
    this.isPlacementValid = true;
    this.customLayout = {};
    this.layoutGrid = null;
    this.ghostMesh = null;
    this.ghostMaterial = null;
    this.editRaycaster = new THREE.Raycaster();
    this.floorPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    this.layoutPointerDownPos = new THREE.Vector2();
    this.layoutPointerMoved = false;

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
    this.residentOrders = window.GameMechanics.createResidentOrderState();
    this.brandState = window.GameMechanics.createBrandState();
    this.activeDayChoice = null;
    this.dayChoicesOffered = [];
    this.neighborhoodBuildingsState = window.GameMechanics.createNeighborhoodBuildingState();
    this.builtNeighborhoodMeshes = {};
    this.toastMachine = null;
    this.jamCauldron = null;
    this.isNeighborhoodOpen = false;
    this.activeNeighborhoodTab = 'residents';

    // Living Neighborhood: Veresiye, Wholesale, Hygiene, Security & Decoration
    this.veresiyeState = window.GameMechanics.createVeresiyeState();
    this.wholesaleState = window.GameMechanics.createWholesaleState();
    this.staffFatigue = window.GameMechanics.createStaffFatigueState();
    this.decorationState = window.GameMechanics.createDecorationState();
    this.isDecorationShopOpen = false;
    this.activeDecorationShopCategory = 'ALL';
    this.purchasedDecorations = [];
    this.hygieneScore = 100;
    this.trashPool = [];
    this.hasMopEquipped = false;
    this.trashSpawnTimer = 18.0;
    this.mopCooldown = 0;
    this.pendingVeresiyeCheckout = null;
    this.veresiyePromptCooldown = 0;
    this.activeRadioChannel = 0;
    this.isWholesaleOpen = false;

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
    this.initLayoutEditorUI();
    this.initDecorationShopUI();
    this.initBootSequence();
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
    baseTerrain.position.set(0, -0.02, 0);
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
    innerLawn.position.set(0, -0.01, 0);
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
      [-14, -0.005, 5, 8, 8, patchMat1],
      [-14, -0.005, 17, 8, 12, patchMat2],
      [14, -0.005, 5, 8, 8, patchMat1],
      [14, -0.005, 17, 8, 12, patchMat2],
      [-5.5, -0.005, 6.5, 4.5, 4.5, patchMat2],
      [5.5, -0.005, 6.5, 4.5, 4.5, patchMat1],
      [-28, -0.008, 12, 16, 24, patchMat1],
      [28, -0.008, 12, 16, 24, patchMat2]
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
    mainPath.position.set(0, 0.015, 11.5);
    mainPath.receiveShadow = true;
    this.scene.add(mainPath);

    // Lateral Connecting Walkways (Situated in Open Aisle Corridors between Production Rows)
    const latPath1 = new THREE.Mesh(new THREE.PlaneGeometry(36, 2.4).rotateX(-Math.PI / 2), pathMat);
    latPath1.position.set(0, 0.015, 3.5); // Corridor 1: Market Entrance to Row 1
    latPath1.receiveShadow = true;
    const latPath2 = new THREE.Mesh(new THREE.PlaneGeometry(36, 2.4).rotateX(-Math.PI / 2), pathMat);
    latPath2.position.set(0, 0.015, 9.5); // Corridor 2: Row 1 to Row 2
    latPath2.receiveShadow = true;
    const latPath3 = new THREE.Mesh(new THREE.PlaneGeometry(36, 2.4).rotateX(-Math.PI / 2), pathMat);
    latPath3.position.set(0, 0.015, 15.5); // Corridor 3: Row 2 to Row 3
    latPath3.receiveShadow = true;
    const latPath4 = new THREE.Mesh(new THREE.PlaneGeometry(36, 2.4).rotateX(-Math.PI / 2), pathMat);
    latPath4.position.set(0, 0.015, 21.5); // Corridor 4: Row 3 to South Boundary
    latPath4.receiveShadow = true;
    this.scene.add(latPath1, latPath2, latPath3, latPath4);

    // 3. Expanded Supermarket Floor: public sales floor plus rear production hall.
    const storeFloorGeo = new THREE.PlaneGeometry(MARKET_LAYOUT.width, MARKET_LAYOUT.depth);
    storeFloorGeo.rotateX(-Math.PI / 2);
    const storeFloorMat = new THREE.MeshStandardMaterial({
      color: 0x74b9ff,
      roughness: 0.25,
      metalness: 0.05
    });
    this.storeFloorMat = storeFloorMat;
    const storeFloor = new THREE.Mesh(storeFloorGeo, storeFloorMat);
    storeFloor.position.set(MARKET_LAYOUT.centerX, 0.00, MARKET_LAYOUT.centerZ);
    storeFloor.receiveShadow = true;
    this.scene.add(storeFloor);

    // High-Contrast Polish Checkerboard Grid Lines on Supermarket Floor
    const tileLineMat = new THREE.MeshBasicMaterial({ color: 0xa0cfff, transparent: true, opacity: 0.65 });
    for (let x = MARKET_LAYOUT.minX; x <= MARKET_LAYOUT.maxX; x += 2) {
      const line = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.015, MARKET_LAYOUT.depth), tileLineMat);
      line.position.set(x, 0.022, MARKET_LAYOUT.centerZ);
      this.scene.add(line);
    }
    for (let z = MARKET_LAYOUT.minZ + 0.5; z <= MARKET_LAYOUT.maxZ - 0.5; z += 2) {
      const line = new THREE.Mesh(new THREE.BoxGeometry(MARKET_LAYOUT.width, 0.015, 0.04), tileLineMat);
      line.position.set(MARKET_LAYOUT.centerX, 0.022, z);
      this.scene.add(line);
    }

    // Parquet Wood Floor Inlay under Checkout Counters (Covers all 3 parallel lanes)
    const parquetMat = new THREE.MeshStandardMaterial({ color: 0xd35400, roughness: 0.4 });
    const chkFloor = new THREE.Mesh(new THREE.BoxGeometry(12.0, 0.02, 5.2), parquetMat);
    chkFloor.position.set(7.5, 0.022, -19.5);
    chkFloor.receiveShadow = true;
    this.scene.add(chkFloor);

    // Entrance Yellow/Black Safety Strip
    const hazardMat = new THREE.MeshBasicMaterial({ color: 0xffe600 });
    const hazardBar = new THREE.Mesh(new THREE.BoxGeometry(7.2, 0.025, 0.6), hazardMat);
    hazardBar.position.set(0, 0.025, -1.0);
    this.scene.add(hazardBar);
    this.createDepartmentFloorZones();

    // 4. North Outdoor World: Two-Lane Road, Parking Lot & Sidewalk Plaza (Z: -24.0 to -37.0)
    // A. Two-Lane Asphault Highway (Z: -31.0 to -37.0, Width 160)
    const roadMat = new THREE.MeshStandardMaterial({ color: 0x1e272e, roughness: 0.9 });
    const roadGeo = new THREE.PlaneGeometry(160, 6.0);
    roadGeo.rotateX(-Math.PI / 2);
    const road = new THREE.Mesh(roadGeo, roadMat);
    road.position.set(0, 0.00, -34.0);
    road.receiveShadow = true;
    this.scene.add(road);

    // Yellow Dashed Center Divider Line (Extended across 160 units)
    const dashMat = new THREE.MeshBasicMaterial({ color: 0xffe600 });
    for (let dx = -76; dx <= 76; dx += 3.2) {
      const dash = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.015, 0.16), dashMat);
      dash.position.set(dx, 0.008, -34.0);
      this.scene.add(dash);
    }

    // White Outer Road Edge Lines
    const edgeMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const edgeN = new THREE.Mesh(new THREE.BoxGeometry(160, 0.015, 0.14), edgeMat);
    edgeN.position.set(0, 0.008, -36.85);
    const edgeS = new THREE.Mesh(new THREE.BoxGeometry(160, 0.015, 0.14), edgeMat);
    edgeS.position.set(0, 0.008, -31.15);
    this.scene.add(edgeN, edgeS);

    // Painted Zebra Pedestrian Crosswalk (X: -3.0 to +3.0, Z: -37.0 to -31.0)
    for (let zx = -2.6; zx <= 2.6; zx += 0.9) {
      const stripe = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.015, 5.6), edgeMat);
      stripe.position.set(zx, 0.009, -34.0);
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
    const eastWallX = MARKET_LAYOUT.maxX - 0.8;
    const eastPosterFrameX = eastWallX - 0.25;
    const eastPosterFaceX = eastWallX - 0.27;
    const eastPosterBandX = eastWallX - 0.29;
    const eastPosterReliefX = eastWallX - 0.38;

    // A. North Facade (Z = -24.0) with Grand Double Entrance Portal (X: -3.5 to +3.5)
    // Left Storefront Wall & Windows (X: -19.2 to -3.5)
    const nLeftWall = new THREE.Mesh(new THREE.BoxGeometry(15.7, 0.8, 0.45), wallMat);
    nLeftWall.position.set(-11.35, 0.4, -24.0);
    nLeftWall.castShadow = true;
    const nLeftGlass = new THREE.Mesh(new THREE.BoxGeometry(15.5, 3.0, 0.12), glassMat);
    nLeftGlass.position.set(-11.35, 2.3, -24.0);
    const nLeftTrim = new THREE.Mesh(new THREE.BoxGeometry(15.7, 0.45, 0.55), wallTrimMat);
    nLeftTrim.position.set(-11.35, 4.05, -24.0);
    this.scene.add(nLeftWall, nLeftGlass, nLeftTrim);

    // Right Storefront Wall & Windows (X: +3.5 to expanded east facade)
    const nRightFacadeWidth = MARKET_LAYOUT.maxX - 4.0;
    const nRightFacadeX = (MARKET_LAYOUT.maxX + 4.0) / 2;
    const nRightWall = new THREE.Mesh(new THREE.BoxGeometry(nRightFacadeWidth, 0.8, 0.45), wallMat);
    nRightWall.position.set(nRightFacadeX, 0.4, -24.0);
    nRightWall.castShadow = true;
    const nRightGlass = new THREE.Mesh(new THREE.BoxGeometry(nRightFacadeWidth - 0.2, 3.0, 0.12), glassMat);
    nRightGlass.position.set(nRightFacadeX, 2.3, -24.0);
    const nRightTrim = new THREE.Mesh(new THREE.BoxGeometry(nRightFacadeWidth, 0.45, 0.55), wallTrimMat);
    nRightTrim.position.set(nRightFacadeX, 4.05, -24.0);
    this.scene.add(nRightWall, nRightGlass, nRightTrim);

    // Entrance Portal Archway & Gate Posts (X: -3.5 and +3.5 at Z = -24.0)
    [-3.5, 3.5].forEach(px => {
      const p = new THREE.Mesh(new THREE.BoxGeometry(0.7, 4.4, 0.7), pillarMat);
      p.position.set(px, 2.2, -24.0);
      p.castShadow = true;
      const c = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.2, 0.85), wallTrimMat);
      c.position.set(px, 4.3, -24.0);
      const l = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.35, 0.35), lanternMat);
      l.position.set(px, 4.6, -24.0);
      this.scene.add(p, c, l);
    });

    // Top Overhead Arch Canopy over North Entrance
    const archCanopy = new THREE.Mesh(new THREE.BoxGeometry(7.6, 0.45, 0.85), wallTrimMat);
    archCanopy.position.set(0, 4.25, -24.0);
    this.scene.add(archCanopy);

    // 3D Illuminated "MINI MART" Sign on Top of Entrance (Z = -24.0, Y = 5.2)
    const signBoard = new THREE.Mesh(new THREE.BoxGeometry(8.4, 1.2, 0.3), new THREE.MeshStandardMaterial({ color: 0xffe600, roughness: 0.2 }));
    signBoard.position.set(0, 5.2, -23.95);
    signBoard.castShadow = true;
    const signTrim = new THREE.Mesh(new THREE.BoxGeometry(8.8, 1.4, 0.15), frameMat.clone());
    signTrim.position.set(0, 5.2, -24.05);
    this.scene.add(signBoard, signTrim);
    this.marketSign = signBoard;
    this.marketSignTrim = signTrim;
    this.marketLevelBlocks = [];
    for (let i = 0; i < 4; i++) {
      // Suspended decoration above the entrance: no walkable-space obstruction.
      const block = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.35 + i * 0.15, 0.4),
        new THREE.MeshStandardMaterial({ color: 0xffe600, roughness: 0.35 }));
      block.position.set(-1.2 + i * 0.8, 6.15 + i * 0.075, -23.95);
      block.visible = false;
      this.scene.add(block);
      this.marketLevelBlocks.push(block);
    }

    // B. Left Wall (X = -19.2, Z = -24 to -1) with Warehouse Double-Doorway (Z: -13.8 to -11.2)
    const leftWallN = new THREE.Mesh(new THREE.BoxGeometry(0.45, 4.2, 10.2), wallMat);
    leftWallN.position.set(-19.2, 2.1, -18.9);
    leftWallN.castShadow = true;
    const leftTrimN = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.25, 10.3), wallTrimMat);
    leftTrimN.position.set(-19.2, 4.3, -18.9);

    const leftWallS = new THREE.Mesh(new THREE.BoxGeometry(0.45, 4.2, 10.2), wallMat);
    leftWallS.position.set(-19.2, 2.1, -6.1);
    leftWallS.castShadow = true;
    const leftTrimS = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.25, 10.3), wallTrimMat);
    leftTrimS.position.set(-19.2, 4.3, -6.1);

    const leftWallLintel = new THREE.Mesh(new THREE.BoxGeometry(0.45, 1.45, 2.6), wallMat);
    leftWallLintel.position.set(-19.2, 3.475, -12.5);
    const leftTrimLintel = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.25, 2.7), wallTrimMat);
    leftTrimLintel.position.set(-19.2, 4.3, -12.5);

    this.scene.add(leftWallN, leftTrimN, leftWallS, leftTrimS, leftWallLintel, leftTrimLintel);

    // C. Right Wall (expanded east boundary, Z = -24 to -1)
    const rightWall = new THREE.Mesh(new THREE.BoxGeometry(0.45, 4.2, 23.4), wallMat);
    rightWall.position.set(eastWallX, 2.1, -12.5);
    rightWall.castShadow = true;
    const rightTrim = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.25, 23.5), wallTrimMat);
    rightTrim.position.set(eastWallX, 4.3, -12.5);
    this.scene.add(rightWall, rightTrim);

    // Structural Voxel Pillars along Side Perimeters
    const pillarPositions = [
      [-19.2, -18.0], [-19.2, -12.0], [-19.2, -6.0], [-19.2, -1.0],
      [eastWallX, -18.0], [eastWallX, -12.0], [eastWallX, -6.0], [eastWallX, -1.0]
    ];
    pillarPositions.forEach(([px, pz]) => {
      const col = new THREE.Mesh(new THREE.BoxGeometry(0.7, 4.4, 0.7), pillarMat);
      col.position.set(px, 2.2, pz);
      col.castShadow = true;
      const colCap = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.2, 0.85), wallTrimMat);
      colCap.position.set(px, 4.3, pz);
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
    const wRightFacadeWidth = MARKET_LAYOUT.maxX - 4.0;
    const wRightFacadeX = (MARKET_LAYOUT.maxX + 4.0) / 2;
    const wRightGlass = new THREE.Mesh(new THREE.BoxGeometry(wRightFacadeWidth - 0.2, 0.65, 0.10), glassMat);
    wRightGlass.position.set(wRightFacadeX, 0.55, -1.0);
    const wRightFrameB = new THREE.Mesh(new THREE.BoxGeometry(wRightFacadeWidth, 0.25, 0.35), wallMat);
    wRightFrameB.position.set(wRightFacadeX, 0.125, -1.0);
    const wRightTrim = new THREE.Mesh(new THREE.BoxGeometry(wRightFacadeWidth, 0.08, 0.15), wallTrimMat);
    wRightTrim.position.set(wRightFacadeX, 0.90, -1.0);
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

    // B. East / Right Wall Posters (expanded east boundary, facing West)
    // 3. Farm Fresh Chilled Milk & Dairy Poster (Z = -18.5)
    const p3Frame = new THREE.Mesh(new THREE.BoxGeometry(0.10, 1.40, 2.30), posterBorderMat);
    p3Frame.position.set(eastPosterFrameX, 2.05, -18.5);
    const p3Face = new THREE.Mesh(new THREE.BoxGeometry(0.12, 1.28, 2.18), new THREE.MeshStandardMaterial({ color: 0x0984e3, roughness: 0.3 }));
    p3Face.position.set(eastPosterFaceX, 2.05, -18.5);
    const p3Band = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.36, 2.18), new THREE.MeshStandardMaterial({ color: 0x74b9ff, roughness: 0.25 }));
    p3Band.position.set(eastPosterBandX, 2.45, -18.5);
    const p3Bottle = new THREE.Mesh(new THREE.BoxGeometry(0.20, 0.36, 0.26), new THREE.MeshStandardMaterial({ color: 0xffffff }));
    p3Bottle.position.set(eastPosterReliefX, 1.95, -18.5);
    const p3Cap = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.08, 0.14), new THREE.MeshStandardMaterial({ color: 0xff5252 }));
    p3Cap.position.set(eastPosterReliefX, 2.16, -18.5);
    this.scene.add(p3Frame, p3Face, p3Band, p3Bottle, p3Cap);

    // 4. Mega Sale & Super Bonus Rewards Poster (Z = -12.5)
    const p4Frame = new THREE.Mesh(new THREE.BoxGeometry(0.10, 1.40, 2.30), posterBorderMat);
    p4Frame.position.set(eastPosterFrameX, 2.05, -12.5);
    const p4Face = new THREE.Mesh(new THREE.BoxGeometry(0.12, 1.28, 2.18), new THREE.MeshStandardMaterial({ color: 0xffe600, roughness: 0.2 }));
    p4Face.position.set(eastPosterFaceX, 2.05, -12.5);
    const p4Stripe1 = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.14, 1.90), new THREE.MeshStandardMaterial({ color: 0x111111 }));
    p4Stripe1.position.set(eastPosterBandX, 2.42, -12.5);
    const p4Stripe2 = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.14, 1.90), new THREE.MeshStandardMaterial({ color: 0x111111 }));
    p4Stripe2.position.set(eastPosterBandX, 1.68, -12.5);
    const p4Star = new THREE.Mesh(new THREE.BoxGeometry(0.20, 0.36, 0.36), starRedMat);
    p4Star.position.set(eastPosterReliefX, 2.05, -12.5);
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
    const westFenceX = MARKET_LAYOUT.minX;
    const eastFenceX = MARKET_LAYOUT.maxX;
    const fenceNorthZ = MARKET_LAYOUT.serviceGateZ;
    const fenceSouthZ = MARKET_LAYOUT.maxZ + 0.5;
    const fenceRailCenterZ = (fenceNorthZ + fenceSouthZ) / 2;
    const fenceRailDepth = fenceSouthZ - fenceNorthZ;
    const railGeoV = new THREE.BoxGeometry(0.10, 0.10, fenceRailDepth);
    const railGeoH = new THREE.BoxGeometry(MARKET_LAYOUT.width, 0.10, 0.10);

    // Left Perimeter Fence along expanded west service boundary
    for (let fz = fenceNorthZ; fz <= fenceSouthZ; fz += 2.6) {
      const p = new THREE.Mesh(postGeo, fenceMat);
      p.position.set(westFenceX, 0.475, fz);
      p.castShadow = true;
      this.scene.add(p);
    }
    const leftRail = new THREE.Mesh(railGeoV, fenceMat);
    leftRail.position.set(westFenceX, 0.65, fenceRailCenterZ);
    this.scene.add(leftRail);

    // Right Perimeter Fence along expanded east boundary
    for (let fz = fenceNorthZ; fz <= fenceSouthZ; fz += 2.6) {
      const p = new THREE.Mesh(postGeo, fenceMat);
      p.position.set(eastFenceX, 0.475, fz);
      p.castShadow = true;
      this.scene.add(p);
    }
    const rightRail = new THREE.Mesh(railGeoV, fenceMat);
    rightRail.position.set(eastFenceX, 0.65, fenceRailCenterZ);
    this.scene.add(rightRail);

    // Back Southern Perimeter Fence
    for (let fx = westFenceX; fx <= eastFenceX; fx += 2.6) {
      const p = new THREE.Mesh(postGeo, fenceMat);
      p.position.set(fx, 0.475, fenceSouthZ);
      p.castShadow = true;
      this.scene.add(p);
    }
    const backRail = new THREE.Mesh(railGeoH, fenceMat);
    backRail.position.set(MARKET_LAYOUT.centerX, 0.65, fenceSouthZ);
    this.scene.add(backRail);

    // 8. Living World Particles & Clouds
    this.clouds = new VoxelCloudSystem(this.scene);
    this.butterflies = new VoxelButterflies(this.scene);

    // 9. Register Environmental Colliders
    this.collision.addBox(MARKET_LAYOUT.minX - 0.5, MARKET_LAYOUT.maxX + 0.5, MARKET_LAYOUT.maxZ - 0.5, MARKET_LAYOUT.maxZ + 0.5, 'store_south_wall');
    this.collision.addBox(MARKET_LAYOUT.minX - 0.5, MARKET_LAYOUT.minX + 0.5, MARKET_LAYOUT.serviceGateZ - 0.2, MARKET_LAYOUT.maxZ + 0.5, 'store_west_service_wall');
    this.collision.addBox(MARKET_LAYOUT.maxX - 0.5, MARKET_LAYOUT.maxX + 0.5, MARKET_LAYOUT.minZ - 0.5, MARKET_LAYOUT.maxZ + 0.5, 'store_east_wall');
    this.collision.addBox(-19.5, -3.5, -24.5, -23.6, 'north_wall_left');
    this.collision.addBox(3.5, MARKET_LAYOUT.maxX - 0.5, -24.5, -23.6, 'north_wall_right');
    this.collision.addBox(-19.8, -18.8, -24.2, -13.8, 'wall_left_north');
    this.collision.addBox(-19.8, -18.8, -11.2, -0.8, 'wall_left_south');
    this.collision.addBox(-27.8, -19.0, -24.4, -23.6, 'warehouse_north_wall');
    this.collision.addBox(-27.8, -19.0, -1.4, -0.6, 'warehouse_south_wall');
    this.collision.addBox(-28.0, -27.2, -24.2, -12.0, 'warehouse_west_wall_north');
    this.collision.addBox(-28.0, -27.2, -8.0, -0.8, 'warehouse_west_wall_south');
    this.collision.addBox(-19.5, -3.5, -1.4, -0.6, 'front_wall_left');
    this.collision.addBox(3.5, MARKET_LAYOUT.maxX - 0.5, -1.4, -0.6, 'front_wall_right');
    this.collision.addBox(MARKET_LAYOUT.minX - 0.5, MARKET_LAYOUT.minX + 0.5, MARKET_LAYOUT.serviceGateZ - 0.2, MARKET_LAYOUT.maxZ + 0.9, 'fence_left');
    this.collision.addBox(MARKET_LAYOUT.maxX - 0.5, MARKET_LAYOUT.maxX + 0.5, MARKET_LAYOUT.serviceGateZ - 0.2, MARKET_LAYOUT.maxZ + 0.9, 'fence_right');
    this.collision.addBox(MARKET_LAYOUT.minX - 0.5, MARKET_LAYOUT.maxX + 0.5, MARKET_LAYOUT.maxZ + 0.1, MARKET_LAYOUT.maxZ + 0.9, 'fence_back');
  }

  createDepartmentZone({ x, z, width, depth, color, label }) {
    if (label === 'GURME & DELİ' && this.spatial) {
      const concourseMaxX = this.spatial.layout.checkoutConcourse.maxX || 14.5;
      x = (concourseMaxX + 0.5 + MARKET_LAYOUT.maxX - 1.0) / 2;
      width = (MARKET_LAYOUT.maxX - 1.0) - (concourseMaxX + 0.5);
    }
    const zoneMat = new THREE.MeshStandardMaterial({
      color,
      roughness: 0.42,
      transparent: true,
      opacity: 0.72
    });
    const zone = new THREE.Mesh(new THREE.PlaneGeometry(width, depth).rotateX(-Math.PI / 2), zoneMat);
    zone.position.set(x, 0.020, z);
    zone.receiveShadow = true;
    zone.userData.departmentLabel = label;
    this.scene.add(zone);

    const borderMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.55 });
    const top = new THREE.Mesh(new THREE.BoxGeometry(width, 0.025, 0.08), borderMat);
    const bottom = new THREE.Mesh(new THREE.BoxGeometry(width, 0.025, 0.08), borderMat);
    const left = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.025, depth), borderMat);
    const right = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.025, depth), borderMat);
    top.position.set(x, 0.030, z - depth / 2);
    bottom.position.set(x, 0.030, z + depth / 2);
    left.position.set(x - width / 2, 0.030, z);
    right.position.set(x + width / 2, 0.030, z);
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

    this.createDepartmentDecor(label, x, z, width, depth, color);
  }

  createDepartmentDecor(label, x, z, width, depth, color) {
    const group = new THREE.Group();
    group.position.set(x, 0.035, z);
    group.userData.departmentDecor = label;

    const blackMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.65 });
    const whiteMat = new THREE.MeshStandardMaterial({ color: 0xfffdf5, roughness: 0.5 });
    const accentMat = new THREE.MeshStandardMaterial({ color, roughness: 0.35, emissive: color, emissiveIntensity: 0.06 });
    const steelMat = new THREE.MeshStandardMaterial({ color: 0xb2bec3, roughness: 0.32, metalness: 0.25 });
    const woodMat = new THREE.MeshStandardMaterial({ color: 0xcd853f, roughness: 0.72 });
    const goldMat = new THREE.MeshStandardMaterial({ color: 0xf1c40f, roughness: 0.25, metalness: 0.55 });

    const addBox = (name, sx, sy, sz, px, py, pz, mat = accentMat) => {
      const mesh = new THREE.Mesh(new THREE.BoxGeometry(sx, sy, sz), mat);
      mesh.position.set(px, py + sy / 2, pz);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      mesh.userData.departmentDecorPart = name;
      group.add(mesh);
      return mesh;
    };

    switch (label) {
      case 'MANAV':
        [-1.8, 0, 1.8].forEach((dx, i) => {
          addBox('produce-crate', 1.35, 0.28, 0.85, dx, 0, -0.35, woodMat);
          addBox('produce-color-block', 1.0, 0.18, 0.52, dx, 0.28, -0.35, i === 0 ? accentMat : (i === 1 ? new THREE.MeshStandardMaterial({ color: 0xff4757, roughness: 0.45 }) : new THREE.MeshStandardMaterial({ color: 0xffa502, roughness: 0.45 })));
        });
        addBox('leafy-arch-left', 0.14, 1.15, 0.14, -width / 2 + 0.6, 0, 0, accentMat);
        addBox('leafy-arch-right', 0.14, 1.15, 0.14, width / 2 - 0.6, 0, 0, accentMat);
        break;
      case 'ŞARKÜTERİ':
        addBox('deli-glass-counter', Math.min(width - 1.8, 5.2), 0.78, 0.74, 0, 0, -0.2, steelMat);
        addBox('deli-cold-glass', Math.min(width - 2.2, 4.8), 0.42, 0.08, 0, 0.78, -0.62, whiteMat);
        [-1.4, 0, 1.4].forEach(dx => addBox('cheese-display-block', 0.52, 0.18, 0.38, dx, 0.86, -0.2, goldMat));
        break;
      case 'FIRIN':
        addBox('bakery-brick-oven', 2.2, 1.15, 0.9, -1.7, 0, -0.1, new THREE.MeshStandardMaterial({ color: 0x8b3a18, roughness: 0.72 }));
        addBox('bakery-oven-mouth', 1.35, 0.45, 0.08, -1.7, 0.33, -0.58, blackMat);
        [0.3, 1.2, 2.1].forEach(dx => addBox('bread-basket', 0.72, 0.26, 0.52, dx, 0, -0.18, woodMat));
        break;
      case 'BÜFE & PİZZA':
        addBox('pizza-hot-bar', Math.min(width - 2.0, 6.0), 0.82, 0.72, 0.4, 0, -0.15, new THREE.MeshStandardMaterial({ color: 0xe17055, roughness: 0.45 }));
        addBox('pizza-oven-red', 1.2, 0.95, 0.95, -2.6, 0, -0.08, new THREE.MeshStandardMaterial({ color: 0xff4757, roughness: 0.42 }));
        [1.2, 2.05, 2.9].forEach(dx => addBox('pizza-tray', 0.62, 0.08, 0.62, dx, 0.82, -0.15, goldMat));
        break;
      case 'ORGANİK':
        [-2.1, -0.7, 0.7, 2.1].forEach(dx => {
          addBox('organic-basket', 0.88, 0.32, 0.72, dx, 0, -0.2, woodMat);
          addBox('organic-green-fill', 0.62, 0.16, 0.46, dx, 0.32, -0.2, accentMat);
        });
        break;
      case 'GURME & DELİ': {
        const islandW = Math.min(width - 2.4, 5.8);
        const islandD = 0.86;
        let decorX = 0;
        let decorZ = -0.12;
        if (this.spatial && this.spatial.findClearPlacement) {
          const resolved = this.spatial.findClearPlacement(islandW, islandD, x, z + decorZ, 'DECOR', ['EAST', 'WEST']);
          decorX = resolved.x - x;
          decorZ = resolved.z - z;
          this.spatial.reserve('dept_gurme_deli', 'DECOR', resolved.x - islandW / 2, resolved.x + islandW / 2, resolved.z - islandD / 2, resolved.z + islandD / 2);
        }
        addBox('gourmet-island-black', islandW, 0.72, islandD, decorX, 0, decorZ, blackMat);
        addBox('gourmet-gold-rail', Math.min(width - 2.2, 6.0), 0.08, 0.94, decorX, 0.72, decorZ, goldMat);
        [-1.7, 0, 1.7].forEach(dx => addBox('gourmet-sample-plinth', 0.45, 0.32, 0.45, decorX + dx, 0.80, decorZ, whiteMat));
        break;
      }
      default:
        const laneCount = label === 'ARKA DEPO' ? 5 : 3;
        for (let i = 0; i < laneCount; i++) {
          const dx = (i - (laneCount - 1) / 2) * Math.min(2.2, width / laneCount);
          addBox('production-workbench', 1.25, 0.58, 0.72, dx, 0, -0.16, steelMat);
          addBox('production-bin', 0.58, 0.34, 0.48, dx, 0.58, -0.16, accentMat);
        }
        break;
    }

    this.scene.add(group);
  }

  createDepartmentFloorZones() {
    [
      // Row 1 (Z = -9.5): West Manav & East Şarküteri
      { x: -8.5, z: -9.5, width: 10.4, depth: 2.7, color: 0x10ac84, label: 'MANAV' },
      { x: 7.0, z: -9.5, width: 8.8, depth: 2.7, color: 0x0984e3, label: 'ŞARKÜTERİ' },
      // Row 2 (Z = -15.0): West Fırın & East Büfe & Pizza
      { x: -8.5, z: -15.0, width: 10.4, depth: 2.7, color: 0xd35400, label: 'FIRIN' },
      { x: 9.75, z: -15.0, width: 14.5, depth: 2.7, color: 0xf39c12, label: 'BÜFE & PİZZA' },
      // Row 3 (Z = -20.5): West Organik & East Gurme & Şarküteri
      { x: -8.5, z: -20.5, width: 10.4, depth: 2.7, color: 0x27ae60, label: 'ORGANİK' },
      { x: 9.75, z: -20.5, width: 14.5, depth: 2.7, color: 0x8e44ad, label: 'GURME & DELİ' },
      // Rear-of-house production hall inside the expanded market footprint.
      { x: -11.5, z: 6.5, width: 12.8, depth: 3.4, color: 0x10ac84, label: 'TAZE ÜRETİM' },
      { x: 11.5, z: 6.5, width: 12.8, depth: 3.4, color: 0x0984e3, label: 'SOĞUK HAZIRLIK' },
      { x: -11.5, z: 12.5, width: 12.8, depth: 3.4, color: 0xf1c40f, label: 'HAMMADDE' },
      { x: 11.5, z: 12.5, width: 12.8, depth: 3.4, color: 0xd35400, label: 'MUTFAK' },
      { x: 0.0, z: 18.5, width: 34.0, depth: 3.4, color: 0x636e72, label: 'ARKA DEPO' }
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

    // Dedicated FMCG Specialty Fixtures (Faz 4)
    this.beverageChiller = new BeverageChillerShelf(this.scene, 22.2, -16.0, -Math.PI / 2, 'SODA_CAN');
    this.collision.addBox(21.4, 23.0, -17.3, -14.7, 'shelf_beverage_chiller');

    this.cleaningShelf = new CleaningShelfUnit(this.scene, 15.5, -9.5, 0, 'LIQUID_DETERGENT');
    this.collision.addBox(14.2, 16.8, -10.3, -8.7, 'shelf_cleaning');

    this.shelves.push(this.tomatoShelf, this.eggShelf, this.beverageChiller, this.cleaningShelf);

    // Front Modern Supermarket Triple-Checkout Concourse (Z = -19.5)
    this.checkout1 = new CheckoutCounter(this.scene, 3.5, -19.5, 1);
    this.checkout2 = new CheckoutCounter(this.scene, 7.5, -19.5, 2);
    this.checkout3 = new CheckoutCounter(this.scene, 11.5, -19.5, 3);
    this.checkouts = [this.checkout1, this.checkout2, this.checkout3];
    this.checkout = this.checkout1; // Backward compatibility

    // Checkouts AABB Colliders (2.6m wide, 0.88m deep with 1.4m open corridors between them)
    this.collision.addBox(2.2, 4.8, -20.1, -18.9, 'checkout_1');
    this.collision.addBox(6.2, 8.8, -20.1, -18.9, 'checkout_2');
    this.collision.addBox(10.2, 12.8, -20.1, -18.9, 'checkout_3');
    this.collision.addBox(2.2, 4.8, -20.1, -18.9, 'checkout'); // Backward compatibility

    // Blue-aproned mustache/capped Cashier Staff Bots
    this.cashierBot1 = this.createCashierStaff(this.scene, 3.5, -19.5, 1);
    this.cashierBot2 = this.createCashierStaff(this.scene, 7.5, -19.5, 2);
    this.cashierBot3 = this.createCashierStaff(this.scene, 11.5, -19.5, 3);
    this.cashierBots = [this.cashierBot1, this.cashierBot2, this.cashierBot3];
    this.cashierBot = this.cashierBot2; // Backward compatibility

    if (this.spatial) {
      if (this.spatial.placePlanogramFixture) {
        this.spatial.placePlanogramFixture('checkout_1');
        this.spatial.placePlanogramFixture('checkout_2');
        this.spatial.placePlanogramFixture('checkout_3');
        this.spatial.placePlanogramFixture('cashier_1');
        this.spatial.placePlanogramFixture('cashier_2');
        this.spatial.placePlanogramFixture('cashier_3');
      } else {
        this.spatial.reserve('checkout_1', 'CHECKOUT', 2.2, 4.8, -20.1, -18.9);
        this.spatial.reserve('checkout_2', 'CHECKOUT', 6.2, 8.8, -20.1, -18.9);
        this.spatial.reserve('checkout_3', 'CHECKOUT', 10.2, 12.8, -20.1, -18.9);
        this.spatial.reserve('cashier_1', 'CASHIER', 3.2, 3.8, -20.45, -19.85);
        this.spatial.reserve('cashier_2', 'CASHIER', 7.2, 7.8, -20.45, -19.85);
        this.spatial.reserve('cashier_3', 'CASHIER', 11.2, 11.8, -20.45, -19.85);
      }
    }

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

    this.jamCauldron = new JamCauldron(this.scene, -15.5, -17.8);
    this.collision.addBox(-16.8, -14.2, -18.6, -17.0, 'jam_cauldron');

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

  createCashierStaff(scene, x, z, laneNum) {
    // Blue uniformed cashier standing behind checkout counter at (x, 0, z - 0.65)
    const cashier = new Character3D(scene, 0x0984e3, false);
    cashier.group.position.set(x, 0, z - 0.65);
    cashier.group.rotation.y = 0; // Facing south towards register desk and customers

    // Blue Service Visor/Cap
    const capMat = new THREE.MeshStandardMaterial({ color: 0x0984e3, roughness: 0.35 });
    const cap = new THREE.Mesh(new THREE.BoxGeometry(0.54, 0.16, 0.54), capMat);
    cap.position.y = 1.72;
    const visor = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.04, 0.28), capMat);
    visor.position.set(0, 1.64, 0.38);
    cashier.model.add(cap, visor);

    // Chunky Neo-Brutalist Mustache (bıyık)
    const stacheMat = new THREE.MeshStandardMaterial({ color: 0x2d3436, roughness: 0.8 });
    const mustache = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.06, 0.05), stacheMat);
    mustache.position.set(0, 1.34, 0.28);
    cashier.model.add(mustache);

    // Kasa Personel Rozeti
    const badgeMat = new THREE.MeshBasicMaterial({ color: 0xffe600 });
    const badge = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.10, 0.04), badgeMat);
    badge.position.set(0.16, 1.05, 0.21);
    cashier.model.add(badge);

    return cashier;
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

    // Pad 2: Senior Cashier Staff Training & Speed Boost ($80)
    let pad2X = 7.5;
    let pad2Z = -15.5;
    if (this.spatial && this.spatial.placePlanogramFixture) {
      const placed = this.spatial.placePlanogramFixture('pad_2_cashier_speed', ['SOUTH', 'WEST', 'EAST', 'NORTH']);
      if (placed) { pad2X = placed.x; pad2Z = placed.z; }
    } else if (this.spatial && this.spatial.findClearPlacement) {
      const resolved = this.spatial.findClearPlacement(2.6, 2.6, pad2X, pad2Z, 'UNLOCK_PAD', ['SOUTH', 'WEST', 'EAST', 'NORTH']);
      pad2X = resolved.x;
      pad2Z = resolved.z;
      this.spatial.reserve('pad_cashier_speed', 'UNLOCK_PAD', pad2X - 1.3, pad2X + 1.3, pad2Z - 1.3, pad2Z + 1.3);
    }
    const pad2 = new UnlockPad(this.scene, pad2X, pad2Z, 80, 'KASİYER HIZI', () => {
      this.unlockedFeatures.cashier = true;
      this.cashierSpeedBoost = 1.35;
      this.checkouts.forEach(chk => { if (chk) chk.hasCashier = true; });

      this.showFloatingText('KASİYERLER HIZLANDIRILDI! (+35% HIZ)', this.checkout2.group.position, '#0984e3');
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
    let pad12X = 17.0;
    let pad12Z = -18.0;
    if (this.spatial && this.spatial.placePlanogramFixture) {
      const placed = this.spatial.placePlanogramFixture('pad_12_pie', ['EAST', 'WEST', 'SOUTH', 'NORTH']);
      if (placed) { pad12X = placed.x; pad12Z = placed.z; }
    } else if (this.spatial && this.spatial.findClearPlacement) {
      const resolved = this.spatial.findClearPlacement(2.6, 2.6, pad12X, pad12Z, 'UNLOCK_PAD', ['EAST', 'WEST', 'SOUTH', 'NORTH']);
      pad12X = resolved.x;
      pad12Z = resolved.z;
      this.spatial.reserve('pad_12_pie', 'UNLOCK_PAD', pad12X - 1.3, pad12X + 1.3, pad12Z - 1.3, pad12Z + 1.3);
    }
    const pad12 = new UnlockPad(this.scene, pad12X, pad12Z, 750, 'GURME TURTA REYONU', () => {
      this.unlockedFeatures.pie = true;

      let pieShelfX = 17.0;
      let pieShelfZ = -20.5;
      if (this.spatial && this.spatial.findClearPlacement) {
        const resolved = this.spatial.findClearPlacement(2.6, 1.6, pieShelfX, pieShelfZ, 'SHELF', ['EAST', 'WEST', 'SOUTH', 'NORTH']);
        pieShelfX = resolved.x;
        pieShelfZ = resolved.z;
        this.spatial.reserve('shelf_pie', 'SHELF', pieShelfX - 1.3, pieShelfX + 1.3, pieShelfZ - 0.8, pieShelfZ + 0.8);
      }
      this.pieShelf = new ShelfUnit(this.scene, pieShelfX, pieShelfZ, 0, 'APPLE_PIE');
      this.shelves.push(this.pieShelf);
      this.collision.addBox(pieShelfX - 1.3, pieShelfX + 1.3, pieShelfZ - 0.8, pieShelfZ + 0.8, 'shelf_pie');

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
    let pad16X = 19.5;
    let pad16Z = -18.0;
    if (this.spatial && this.spatial.placePlanogramFixture) {
      const placed = this.spatial.placePlanogramFixture('pad_16_icecream', ['EAST', 'WEST', 'SOUTH', 'NORTH']);
      if (placed) { pad16X = placed.x; pad16Z = placed.z; }
    } else if (this.spatial && this.spatial.findClearPlacement) {
      const resolved = this.spatial.findClearPlacement(2.6, 2.6, pad16X, pad16Z, 'UNLOCK_PAD', ['EAST', 'WEST', 'SOUTH', 'NORTH']);
      pad16X = resolved.x;
      pad16Z = resolved.z;
      this.spatial.reserve('pad_16_icecream', 'UNLOCK_PAD', pad16X - 1.3, pad16X + 1.3, pad16Z - 1.3, pad16Z + 1.3);
    }
    const pad16 = new UnlockPad(this.scene, pad16X, pad16Z, 1200, 'DONDURMA MAKİNESİ', () => {
      this.unlockedFeatures.icecream = true;

      this.iceCreamMachine = new IceCreamMachine(this.scene, 17.0, 12.5);
      this.collision.addBox(15.6, 18.4, 11.0, 14.0, 'ice_cream_machine');

      let iceCreamShelfX = 19.5;
      let iceCreamShelfZ = -20.5;
      if (this.spatial && this.spatial.findClearPlacement) {
        const resolved = this.spatial.findClearPlacement(2.6, 1.6, iceCreamShelfX, iceCreamShelfZ, 'SHELF', ['EAST', 'WEST', 'SOUTH', 'NORTH']);
        iceCreamShelfX = resolved.x;
        iceCreamShelfZ = resolved.z;
        this.spatial.reserve('shelf_icecream', 'SHELF', iceCreamShelfX - 1.3, iceCreamShelfX + 1.3, iceCreamShelfZ - 0.8, iceCreamShelfZ + 0.8);
      }
      this.iceCreamShelf = new ShelfUnit(this.scene, iceCreamShelfX, iceCreamShelfZ, 0, 'ICE_CREAM');
      this.shelves.push(this.iceCreamShelf);
      this.collision.addBox(iceCreamShelfX - 1.3, iceCreamShelfX + 1.3, iceCreamShelfZ - 0.8, iceCreamShelfZ + 0.8, 'shelf_icecream');

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

    // Living Neighborhood 3D Entities
    this.mopStation = new MopStation(this.scene, -4.5, -23.5);
    this.collision.addBox(-5.3, -3.7, -24.5, -22.5, 'mop_station');

    this.securityGate = new SecurityGate(this.scene, 0, -22.8);
    this.karabashDog = new KarabashDog(this.scene, 4.5, -23.5);
    this.collision.addBox(3.4, 5.6, -24.5, -22.5, 'karabash_kennel');

    this.wholesaleBay = new WholesaleBay(this.scene, -24.0, -10.0);
    this.teaStation = new TeaStation(this.scene, -16.0, -6.8);
    this.collision.addBox(-17.0, -15.0, -7.4, -6.2, 'tea_station');

    this.voxelRadio = new VoxelRadio(this.scene, 1.8, -18.2);
    this.neonSign = new VoxelNeonSign(this.scene, 0, 4.2, -23.8, 'BİZİM MARKET', 0xffe600);

    // Architectural Supermarket Visual Rigging & Logistics Warehouse Zone
    this.supermarketVisuals = new SupermarketVisualSystem(this.scene, this.collision);
    this.warehouseZone = new WarehouseZone(this.scene);

    // Rest Room & Staff Lounge
    this.restRoom = new RestRoom(this.scene, 12.0, -32.0);
    this.restRoom.updateDecorations(this.unlockedFeatures);

    this.initBox3DebugInspector();
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
        if (this.isDecorationShopOpen) {
          this.closeDecorationShopModal();
          return;
        }
        if (this.isLayoutEditMode) {
          if (this.selectedFixture) {
            this.cancelSelectedDrag();
          } else {
            this.exitLayoutEditMode(true);
          }
          return;
        }
        if (this.isProcurementOpen) {
          this.closeProcurementTerminal();
          return;
        }
        if (this.isNeighborhoodOpen) this.closeNeighborhoodModal();
        if (this.isWikiOpen) this.closeWikiModal();
        if (this.isManagementOpen) this.closeManagementModal();
        if (this.isDayChoiceOpen && this.closeDayChoiceModal) this.closeDayChoiceModal();
      } else if (e.code === 'KeyN') {
        e.preventDefault();
        this.toggleDecorationShopModal();
      } else if (e.code === 'KeyB' || e.code === 'KeyT') {
        e.preventDefault();
        this.toggleLayoutEditMode();
      } else if (e.code === 'KeyR') {
        if (this.isLayoutEditMode) {
          e.preventDefault();
          this.rotateSelectedFixture();
        }
      } else if (e.code === 'Enter' || e.code === 'Space') {
        if (this.isLayoutEditMode && this.selectedFixture) {
          e.preventDefault();
          this.confirmSelectedPlacement();
        }
      } else if (e.code === 'KeyE' || e.key === 'e' || e.key === 'E') {
        if (this.isNearOfficeDesk) {
          if (this.isProcurementOpen) {
            this.closeProcurementTerminal();
          } else {
            this.openProcurementTerminal();
          }
          return;
        } else if (this.pendingVeresiyeCheckout) {
          this.confirmVeresiyeCheckout();
        }
      } else if (e.code === 'KeyC' || e.key === 'c' || e.key === 'C') {
        this.toggleCameraAngle();
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

    // Touch & Mouse Virtual Joystick
    const joystickContainer = document.getElementById('joystick-container');
    const joystickStick = document.getElementById('joystick-stick');
    let activePointerId = null;
    let basePos = { x: 0, y: 0 };
    const maxRadius = 45;

    const handleStart = (clientX, clientY) => {
      basePos = { x: clientX, y: clientY };
      joystickContainer.style.display = 'block';
      joystickContainer.style.left = `${clientX}px`;
      joystickContainer.style.top = `${clientY}px`;
      joystickStick.style.transform = `translate(-50%, -50%)`;
      this.joystickInput.set(0, 0);
    };

    const handleMove = (clientX, clientY) => {
      if (joystickContainer.style.display !== 'block') return;
      const dx = clientX - basePos.x;
      const dy = clientY - basePos.y;
      const dist = Math.hypot(dx, dy);
      const angle = Math.atan2(dy, dx);
      const clampedDist = Math.min(dist, maxRadius);
      const stickX = Math.cos(angle) * clampedDist;
      const stickY = Math.sin(angle) * clampedDist;
      joystickStick.style.transform = `translate(calc(-50% + ${stickX}px), calc(-50% + ${stickY}px))`;
      this.joystickInput.set(stickX / maxRadius, stickY / maxRadius);
    };

    const handleEnd = () => {
      joystickContainer.style.display = 'none';
      joystickStick.style.transform = `translate(-50%, -50%)`;
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
      if (this.isLayoutEditMode) {
        this.onLayoutPointerDown(e);
        return;
      }
      handleStart(e.clientX, e.clientY);
    });

    window.addEventListener('mousemove', (e) => {
      if (this.isLayoutEditMode) {
        this.onLayoutPointerMove(e);
        return;
      }
      handleMove(e.clientX, e.clientY);
    });

    window.addEventListener('mouseup', (e) => {
      if (this.isLayoutEditMode) {
        this.onLayoutPointerUp(e);
        return;
      }
      handleEnd();
    });

    this.canvas.addEventListener('touchstart', (e) => {
      if (this.isLayoutEditMode && e.touches.length > 0) {
        this.onLayoutPointerDown(e.touches[0]);
      }
    }, { passive: true });

    this.canvas.addEventListener('touchmove', (e) => {
      if (this.isLayoutEditMode && e.touches.length > 0) {
        this.onLayoutPointerMove(e.touches[0]);
      }
    }, { passive: true });

    this.canvas.addEventListener('touchend', (e) => {
      if (this.isLayoutEditMode) {
        this.onLayoutPointerUp(e);
      }
    }, { passive: true });
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

    this.hygieneDisplay = document.getElementById('hygiene-display');
    this.prestigeDisplay = document.getElementById('prestige-display');
    this.initWholesaleUI();
    this.initProcurementUI();

    const cameraBtn = document.getElementById('camera-btn');
    cameraBtn?.addEventListener('click', () => this.toggleCameraAngle());

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

    if (event && event.type === 'sale' && event.residentId && window.GameMechanics?.getResidentProfile) {
      const availableItems = this.getAvailableDemandItems ? this.getAvailableDemandItems() : [];
      const profile = window.GameMechanics.getResidentProfile(this.neighborhoodState, event.residentId, { availableItems });
      if (profile && profile.specialOrder) {
        const beforeRewardCount = this.residentOrders && this.residentOrders.rewards ? this.residentOrders.rewards.length : 0;
        this.residentOrders = window.GameMechanics.updateResidentOrderState(this.residentOrders, profile.specialOrder, event);
        const newOrderRewards = this.residentOrders.rewards.slice(beforeRewardCount);
        newOrderRewards.forEach(reward => {
          this.money += reward.amount;
          this.updateMoneyUI();
          const resident = (window.GameMechanics.NEIGHBORHOOD_RESIDENTS || []).find(r => r.id === reward.residentId);
          this.showFloatingText(`ÖZEL SİPARİŞ TAMAM +$${reward.amount}${resident ? ` / ${resident.name}` : ''}`, this.player.group.position, '#00D2D3');
          window.Sound.playUnlock();
        });
      }
    }

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

      // Simulate branches daily revenue
      let branchSim = null;
      if (window.GameMechanics?.simulateBranchDailyOperations) {
        this.branchState = window.GameMechanics.createBranchState(this.branchState || this.branches);
        const neighborhoodEffects = window.GameMechanics.getActiveNeighborhoodEffects
          ? window.GameMechanics.getActiveNeighborhoodEffects(this.neighborhoodBuildingsState)
          : {};
        branchSim = window.GameMechanics.simulateBranchDailyOperations(this.branchState, neighborhoodEffects, this.dailyDemand);
        this.branchState = branchSim.state;
        this.branches = this.branchState.branches;
      }

      // Generate rich prestige summary
      const richSummary = window.GameMechanics?.summarizeDayWithPrestige
        ? window.GameMechanics.summarizeDayWithPrestige(this.dayState, {
            decorationState: this.decorationState,
            hygieneScore: this.hygieneScore,
            brandState: this.brandState,
            neighborhoodState: this.neighborhoodState,
            previousPrestigeScore: this.previousDayPrestigeScore || 0
          })
        : summary;

      if (branchSim) {
        richSummary.branchSummaries = branchSim.branchSummaries;
        richSummary.branchTotalRevenue = branchSim.totalSimulatedRevenue;
      }
      if (richSummary.prestigeReport) {
        this.previousDayPrestigeScore = richSummary.prestigeReport.score;
      }

      this.showDaySummary(richSummary);
      this.dailyDemand = null;
      this.ensureDailyDemand();
      this.presentDayChoices();
      this.processVeresiyeMorningCollection();
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

    let branchHtml = '';
    if (summary.branchSummaries && Object.keys(summary.branchSummaries).length > 0) {
      const branchItems = Object.values(summary.branchSummaries).map(b => `
        <div class="day-summary-branch-row">
          <span>${b.name}:</span>
          <span>+$${b.revenue} (${b.itemsSold} satış) · Kasa: $${b.uncollectedRevenue}</span>
        </div>
      `).join('');
      branchHtml = `
        <div class="day-summary-branch-box">
          <div class="day-summary-section-title">UYDU ŞUBE GELİRLERİ (+$${summary.branchTotalRevenue || 0})</div>
          ${branchItems}
        </div>
      `;
    }

    let prestigeHtml = '';
    if (summary.prestigeReport) {
      const rep = summary.prestigeReport;
      const driversHtml = rep.drivers.map(d => `<span class="prestige-driver-pill">${d}</span>`).join('');
      const deltaLabel = rep.delta !== 0 ? `(${rep.delta > 0 ? '+' : ''}${rep.delta} Puan)` : '';
      prestigeHtml = `
        <div class="day-summary-prestige-box">
          <div class="day-summary-section-title">PRESTİJ RAPORU: [P${rep.stars}] ${rep.score}/100 ${deltaLabel}</div>
          <div class="day-summary-drivers">${driversHtml}</div>
          <div class="day-summary-advice">${rep.advice}</div>
        </div>
      `;
    }

    this.daySummaryBody.innerHTML = `
      <div class="day-summary-grid">
        <div><span>GÜN:</span> <strong>${summary.day}</strong></div>
        <div><span>GELİR:</span> <strong>$${summary.salesRevenue}</strong></div>
        <div><span>SATIŞ:</span> <strong>${summary.customersServed} adet</strong></div>
        <div><span>EN ÇOK SATAN:</span> <strong>${summary.topItem}</strong></div>
      </div>
      ${branchHtml}
      ${prestigeHtml}
      <button id="day-summary-close-btn" class="day-summary-close-btn" type="button">DEVAM ET</button>
    `;

    const closeBtn = document.getElementById('day-summary-close-btn');
    if (closeBtn) {
      closeBtn.onclick = () => {
        if (this.daySummaryCard) this.daySummaryCard.classList.add('hidden');
      };
    }

    this.daySummaryCard.classList.remove('hidden');
    window.Sound.playCoin();

    if (this.daySummaryTimeout) clearTimeout(this.daySummaryTimeout);
    this.daySummaryTimeout = window.setTimeout(() => {
      if (this.daySummaryCard) this.daySummaryCard.classList.add('hidden');
    }, 10000);
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

  closeTransientMobileOverlays() {
    const topActions = document.getElementById('top-actions');
    const hudMenuToggle = document.getElementById('hud-menu-toggle');
    topActions?.classList.remove('open');
    hudMenuToggle?.setAttribute('aria-expanded', 'false');

    const managementPanel = document.getElementById('specialization-panel');
    const managementToggle = document.getElementById('management-toggle');
    managementPanel?.classList.remove('open');
    managementToggle?.setAttribute('aria-expanded', 'false');
    const toggleGlyph = managementToggle?.querySelector('span');
    if (toggleGlyph) toggleGlyph.textContent = '+';
  }

  prepareModalSurface(activeModalId) {
    this.closeTransientMobileOverlays();
    const modalStates = [
      ['debug-modal', null],
      ['wiki-modal', 'isWikiOpen'],
      ['upgrade-modal', 'isUpgradeModalOpen'],
      ['neighborhood-modal', 'isNeighborhoodOpen'],
      ['day-choice-modal', 'isDayChoiceOpen'],
      ['wholesale-modal', 'isWholesaleOpen'],
      ['procurement-modal', 'isProcurementOpen']
    ];

    modalStates.forEach(([id, stateKey]) => {
      if (id === activeModalId) return;
      const modal = document.getElementById(id);
      modal?.classList.remove('open');
      modal?.classList.add('hidden');
      if (stateKey) this[stateKey] = false;
    });
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
    this.prepareModalSurface('debug-modal');
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

  // --- Temporary Box3 Collision & Placement Debug Inspector ---
  initBox3DebugInspector() {
    this.debugBoxGroup = new THREE.Group();
    this.debugBoxGroup.name = 'DebugBox3HelperGroup';
    this.scene.add(this.debugBoxGroup);

    // Initial audit after scene setup
    setTimeout(() => {
      this.runBox3CollisionAudit();
    }, 100);

    // Key shortcut: F2 toggles Box3 helper bounding boxes in 3D world
    window.addEventListener('keydown', (e) => {
      const isTyping = e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA');
      if (isTyping) return;
      if (e.code === 'F2') {
        const vis = !this.debugBoxGroup.visible;
        this.debugBoxGroup.visible = vis;
        const msg = vis ? '[BOX3 REHBERLERI ACILDI]' : '[BOX3 REHBERLERI KAPANDI]';
        if (this.showFloatingText && this.player) {
          this.showFloatingText(msg, this.player.group.position, vis ? '#2ecc71' : '#ff4757');
        }
        console.log(`%c[Box3 Debug] Bounding box helper görünürlüğü: ${vis ? 'AÇIK' : 'KAPALI'}`, 'font-weight:bold; color:#0984e3;');
      }
    });

    // Expose global audit functions for console and tests
    window.runCollisionAudit = () => this.runBox3CollisionAudit();
    window.box3Game = this;
  }

  runBox3CollisionAudit() {
    if (!this.debugBoxGroup) return [];

    // Clear previous helper meshes
    while (this.debugBoxGroup.children.length > 0) {
      const child = this.debugBoxGroup.children.pop();
      if (child.geometry) child.geometry.dispose();
      if (child.material) {
        if (Array.isArray(child.material)) child.material.forEach(m => m.dispose());
        else child.material.dispose();
      }
    }

    const trackedEntities = [];

    // 1. Checkouts
    if (Array.isArray(this.checkouts)) {
      this.checkouts.forEach((chk, idx) => {
        if (chk && chk.group) {
          trackedEntities.push({
            id: `Kasa_${chk.laneNumber || idx + 1}`,
            category: 'CHECKOUT',
            group: chk.group,
            meta: { x: chk.x, z: chk.z, lane: chk.laneNumber || idx + 1 }
          });
        }
      });
    }

    // 2. Cashier Staff Bots
    if (Array.isArray(this.cashierBots)) {
      this.cashierBots.forEach((bot, idx) => {
        if (bot && bot.group) {
          trackedEntities.push({
            id: `Kasiyer_${idx + 1}`,
            category: 'CASHIER',
            group: bot.group,
            meta: { pos: bot.group.position }
          });
        }
      });
    }

    // 3. Department Decor Furniture (GURME & DELİ, MANAV, etc.)
    if (this.scene && Array.isArray(this.scene.children)) {
      this.scene.children.forEach(child => {
        if (child.userData && child.userData.departmentDecor) {
          trackedEntities.push({
            id: `ReyonDekor_${child.userData.departmentDecor}`,
            category: 'DEPT_DECOR',
            group: child,
            meta: { label: child.userData.departmentDecor }
          });
        }
        if (child.userData && child.userData.departmentLabel) {
          trackedEntities.push({
            id: `ReyonTabela_${child.userData.departmentLabel}`,
            category: 'DEPT_SIGN',
            group: child,
            meta: { label: child.userData.departmentLabel }
          });
        }
      });
    }

    // 4. Supermarket Visual System (Freezer, Impulse Racks, etc.)
    if (this.supermarketVisuals && this.supermarketVisuals.group) {
      this.supermarketVisuals.group.children.forEach((child, cIdx) => {
        const decorName = child.name || `VisualDecor_${cIdx + 1}`;
        trackedEntities.push({
          id: `MimariGorsel_${decorName}`,
          category: 'VISUAL_DECOR',
          group: child,
          meta: { index: cIdx }
        });
      });
    }

    // 5. Unlock Pads
    if (Array.isArray(this.unlockPads)) {
      this.unlockPads.forEach((pad, pIdx) => {
        if (pad && pad.group) {
          trackedEntities.push({
            id: `KilitPedi_${pIdx + 1}_${pad.title || ''}`,
            category: 'UNLOCK_PAD',
            group: pad.group,
            meta: { cost: pad.remainingCost, x: pad.x, z: pad.z }
          });
        }
      });
    }

    // 6. Shelves
    if (Array.isArray(this.shelves)) {
      this.shelves.forEach((shelf, sIdx) => {
        if (shelf && shelf.group) {
          trackedEntities.push({
            id: `Raf_${shelf.type || sIdx + 1}`,
            category: 'SHELF',
            group: shelf.group,
            meta: { type: shelf.type }
          });
        }
      });
    }

    // 7. Voxel Radio
    if (this.voxelRadio && this.voxelRadio.group) {
      trackedEntities.push({
        id: 'VoxelRadyo',
        category: 'ENTITY',
        group: this.voxelRadio.group,
        meta: {}
      });
    }

    // Update matrices and compute Box3 for all
    const entityBoxes = trackedEntities.map(item => {
      item.group.updateMatrixWorld(true);
      const box = new THREE.Box3().setFromObject(item.group);
      return {
        ...item,
        box,
        min: box.min.clone(),
        max: box.max.clone(),
        size: box.getSize(new THREE.Vector3()),
        collidesWithCheckoutOrCashier: false
      };
    });

    const detectedCollisions = [];

    for (let i = 0; i < entityBoxes.length; i++) {
      for (let j = i + 1; j < entityBoxes.length; j++) {
        const a = entityBoxes[i];
        const b = entityBoxes[j];

        // Filter out parent-child or same group
        if (a.group === b.group || a.group.parent === b.group || b.group.parent === a.group) continue;

        // Cashiers and their checkout desks are an intended co-located work pair
        if ((a.category === 'CASHIER' && b.category === 'CHECKOUT') ||
            (a.category === 'CHECKOUT' && b.category === 'CASHIER')) {
          continue;
        }

        const xOverlap = Math.max(0, Math.min(a.max.x, b.max.x) - Math.max(a.min.x, b.min.x));
        const zOverlap = Math.max(0, Math.min(a.max.z, b.max.z) - Math.max(a.min.z, b.min.z));
        const yOverlap = Math.max(0, Math.min(a.max.y, b.max.y) - Math.max(a.min.y, b.min.y));

        const is3D = a.box.intersectsBox(b.box);
        const is2DFootprint = xOverlap > 0.05 && zOverlap > 0.05;

        if (is3D || is2DFootprint) {
          const involvesPrimary = (
            a.category === 'CHECKOUT' || a.category === 'CASHIER' ||
            b.category === 'CHECKOUT' || b.category === 'CASHIER'
          );

          if (involvesPrimary) {
            a.collidesWithCheckoutOrCashier = true;
            b.collidesWithCheckoutOrCashier = true;
          }

          detectedCollisions.push({
            objectA: a.id,
            categoryA: a.category,
            boxA: { minX: a.min.x, maxX: a.max.x, minZ: a.min.z, maxZ: a.max.z, minY: a.min.y, maxY: a.max.y },
            objectB: b.id,
            categoryB: b.category,
            boxB: { minX: b.min.x, maxX: b.max.x, minZ: b.min.z, maxZ: b.max.z, minY: b.min.y, maxY: b.max.y },
            xOverlap: Number(xOverlap.toFixed(3)),
            zOverlap: Number(zOverlap.toFixed(3)),
            yOverlap: Number(yOverlap.toFixed(3)),
            isFull3D: is3D,
            isFloorFootprint: is2DFootprint,
            involvesCheckoutOrCashier: involvesPrimary
          });
        }
      }
    }

    // Render Box3Helpers with color coding
    entityBoxes.forEach(item => {
      let helperColor = 0x0984e3; // Blue for neutral
      if (item.collidesWithCheckoutOrCashier) {
        helperColor = 0xff0033; // Red for collision with checkout / cashier
      } else if (item.category === 'CHECKOUT' || item.category === 'CASHIER') {
        helperColor = 0x2ecc71; // Green for clear checkout / cashier
      } else if (item.category === 'UNLOCK_PAD') {
        helperColor = 0xffe600; // Yellow for unlock pads
      }

      const helper = new THREE.Box3Helper(item.box, helperColor);
      this.debugBoxGroup.add(helper);
    });

    // Console Logging & Report
    const checkoutCollisions = detectedCollisions.filter(c => c.involvesCheckoutOrCashier);
    console.group('%c[BİZİM MARKET - BOX3 ÇAKIŞMA TESPİT RAPORU]', 'background:#000; color:#FFE600; font-size:14px; font-weight:bold; padding:4px 8px; border:2px solid #000;');
    console.warn(`Toplam Denetlenen Obje: ${entityBoxes.length}`);
    console.warn(`Toplam Alan Çakışması: ${detectedCollisions.length}`);
    console.error(`KASA / KASİYER İLE ÇAKIŞAN OBJE SAYISI: ${checkoutCollisions.length}`);

    if (checkoutCollisions.length > 0) {
      console.log('%c--- KASA VE KASİYER ÇAKIŞMALARI LİSTESİ ---', 'font-weight:bold; color:#ff4757;');
      checkoutCollisions.forEach((col, idx) => {
        console.warn(
          `${idx + 1}. [${col.categoryA}] ${col.objectA} <---> [${col.categoryB}] ${col.objectB}\n` +
          `   Çakışma Miktarı: X ekseni = ${(col.xOverlap * 100).toFixed(1)} cm, Z ekseni = ${(col.zOverlap * 100).toFixed(1)} cm\n` +
          `   3D Kesişim: ${col.isFull3D ? 'TAM HACİM KESİŞİMİ' : 'ZEMİN ALAN İHLALİ'}`
        );
      });
    }
    console.groupEnd();

    window.box3AuditResults = {
      timestamp: Date.now(),
      totalEntities: entityBoxes.length,
      totalCollisions: detectedCollisions.length,
      checkoutCollisionsCount: checkoutCollisions.length,
      checkoutCollisions,
      allCollisions: detectedCollisions
    };

    return detectedCollisions;
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
    this.prepareModalSurface('wiki-modal');
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
    this.prepareModalSurface('upgrade-modal');
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
    if (currentTab === 'decoration') {
      this.renderDecorationStudio();
      return;
    }
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
    if (this.restRoom) {
      this.restRoom.updateDecorations(this.unlockedFeatures);
    }
    
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

    // Pulse animation on active dragging fixture
    if (this.isLayoutEditMode && this.selectedFixture && this.selectedFixture.group) {
      const pulse = Math.sin(Date.now() * 0.008) * 0.04;
      this.selectedFixture.group.position.y = 0.15 + pulse;
    }
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
    this.updateHygieneAndMop(delta);
    this.updateSecurityAndDog(delta);
    this.updateWholesaleAndTruck(delta);
    this.updateStaffFatigue(delta);
    this.updatePrestigeAndVIP(delta);
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
    if (this.isBooting) return;
    if (this.isLayoutEditMode) {
      this.player.velocity.set(0, 0, 0);
      this.player.update(delta);
      return;
    }

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

      this.player.group.position.x = THREE.MathUtils.clamp(this.player.group.position.x, -27.5, MARKET_LAYOUT.maxX - 0.6);
      this.player.group.position.z = THREE.MathUtils.clamp(this.player.group.position.z, -31.0, MARKET_LAYOUT.maxZ - 0.6);
    } else {
      this.player.velocity.set(0, 0, 0);
      this.collision.resolveCircle(this.player.group.position, 0.45);
    }

    if (this.upgradeDesk) {
      if (this.upgradePadCooldown > 0) this.upgradePadCooldown -= delta;
      const deskPos = new THREE.Vector3(-15.8, 0, -4.8);
      const distToDesk = this.player.group.position.distanceTo(deskPos);
      this.isNearOfficeDesk = distToDesk < 2.4;

      const padPos = this.upgradeDesk.triggerPadPos || new THREE.Vector3(-15.8, 0, -3.8);
      const distToPad = this.player.group.position.distanceTo(padPos);

      const promptEl = document.getElementById('office-terminal-prompt');
      if (promptEl) {
        if (this.isNearOfficeDesk && !this.isProcurementOpen && !this.isUpgradeModalOpen) {
          promptEl.classList.remove('hidden');
        } else {
          promptEl.classList.add('hidden');
        }
      }

      if (distToPad < 0.8 && distToDesk > 1.25 && !this.isUpgradeModalOpen && !this.isProcurementOpen && this.upgradePadCooldown <= 0) {
        this.openUpgradeModal();
      }
    }

    this.player.update(delta);
  }

  // Camera Angle Preset Toggle: isometric, strategic overhead, close follow and side plan.
  toggleCameraAngle() {
    this.cameraMode = ((this.cameraMode || 0) + 1) % this.cameraPresets.length;
    const name = this.cameraPresets[this.cameraMode].name;
    this.showFloatingText(`KAMERA AÇISI: [${name}]`, this.player.group.position, '#00D2D3');
    window.Sound?.playPop?.();
  }

  // Smooth camera follow & dynamic sprint speed FOV warp & CRT Terminal zoom
  updateCamera() {
    if (this.isProcurementOpen) {
      // Focus directly on CRT screen at executive office desk (-15.8, -4.8)
      this.camera.position.x = THREE.MathUtils.lerp(this.camera.position.x, -15.8, 0.12);
      this.camera.position.y = THREE.MathUtils.lerp(this.camera.position.y, 1.45, 0.12);
      this.camera.position.z = THREE.MathUtils.lerp(this.camera.position.z, -3.9, 0.12);
      this.camera.lookAt(-15.8, 1.25, -5.05);
      if (Math.abs(this.camera.fov - 32.0) > 0.05) {
        this.camera.fov = THREE.MathUtils.lerp(this.camera.fov, 32.0, 0.12);
        this.camera.updateProjectionMatrix();
      }
      return;
    }

    if (this.isLayoutEditMode) {
      // Elevated bird's-eye isometric view over the market center
      this.camera.position.x = THREE.MathUtils.lerp(this.camera.position.x, 0.0, 0.08);
      this.camera.position.y = THREE.MathUtils.lerp(this.camera.position.y, 32.0, 0.08);
      this.camera.position.z = THREE.MathUtils.lerp(this.camera.position.z, 22.0, 0.08);
      this.camera.lookAt(0.0, 0, -12.0);
      if (Math.abs(this.camera.fov - 48.0) > 0.05) {
        this.camera.fov = THREE.MathUtils.lerp(this.camera.fov, 48.0, 0.08);
        this.camera.updateProjectionMatrix();
      }
      return;
    }

    const pPos = this.player.group.position;
    let targetY = 24.0;
    let offsetX = 0.0;
    let offsetZ = 17.0;
    let lookX = 0.0;
    let lookZ = -17.0;
    let follow = 0.70;
    let baseFov = 40.0;
    const preset = this.cameraPresets[this.cameraMode] || this.cameraPresets[0];
    targetY = preset.targetY;
    offsetX = preset.offsetX;
    offsetZ = preset.offsetZ;
    lookX = preset.lookX;
    lookZ = preset.lookZ;
    follow = preset.follow;
    baseFov = preset.fov;

    this.camera.position.x = THREE.MathUtils.lerp(this.camera.position.x, pPos.x * follow + offsetX, 0.08);
    this.camera.position.y = THREE.MathUtils.lerp(this.camera.position.y, targetY, 0.08);
    this.camera.position.z = THREE.MathUtils.lerp(this.camera.position.z, pPos.z * follow + offsetZ, 0.08);
    this.camera.lookAt(pPos.x * follow + lookX, 0, pPos.z * follow + lookZ);

    // Dynamic FOV speed-warp during sprint dashes
    const targetFov = this.isSprinting && (this.player.velocity.lengthSq() > 0.1) ? baseFov + 5.0 : baseFov;
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

  // Checkout counters: multi-lane customer processing, scanning animations & money collection
  updateCheckout(delta) {
    const playerPos = this.player.group.position;
    const checkouts = (this.checkouts && this.checkouts.length > 0) ? this.checkouts : [this.checkout];

    checkouts.forEach((chk, idx) => {
      if (!chk) return;
      const cashierSpot = new THREE.Vector3(chk.x, 0, chk.z - 0.65);
      const isPlayerAtRegister = playerPos.distanceTo(cashierSpot) < 1.4;

      const cashierActive = chk.hasCashier || isPlayerAtRegister;
      const isFastBonus = chk.hasCashier && isPlayerAtRegister;

      // Find the active processing customer or the next waiting customer in this specific lane
      const activeCustomer = this.customers.find(c => c.checkout === chk && c.state === 'PROCESSING_PAYMENT');
      const waitingCustomer = this.customers.find(c => c.checkout === chk && c.state === 'IN_CHECKOUT_LINE');
      const cashierBot = this.cashierBots ? this.cashierBots[idx] : (idx === 1 ? this.cashierBot : null);

      if (activeCustomer) {
        if (cashierActive) {
          activeCustomer.isCashierWaiting = false;
          activeCustomer.isFastCheckout = isFastBonus;
        } else {
          activeCustomer.isCashierWaiting = true;
        }

        // Active barcode scanning animation for cashier bot
        if (cashierBot) {
          cashierBot.rightArm.rotation.x = -0.6 + Math.sin(Date.now() * 0.008) * 0.25;
          cashierBot.leftArm.rotation.x = -0.4 + Math.cos(Date.now() * 0.008) * 0.15;
          cashierBot.head.rotation.y = Math.sin(Date.now() * 0.006) * 0.12;
        }
      } else if (waitingCustomer) {
        // Customer reaches head of queue at (chk.x - 0.70, 0, chk.z + 0.65)
        const frontPos = new THREE.Vector3(chk.x - 0.70, 0, chk.z + 0.65);
        if (waitingCustomer.char.group.position.distanceTo(frontPos) < 1.3) {
          if (cashierActive) {
            waitingCustomer.startCheckoutProcess(isFastBonus);
            if (waitingCustomer.residentData && isPlayerAtRegister && !this.pendingVeresiyeCheckout) {
              const rId = waitingCustomer.residentData.id;
              const curDebt = (this.veresiyeState && this.veresiyeState.ledger && this.veresiyeState.ledger[rId]) || 0;
              if (curDebt === 0 && !this.veresiyePromptCooldown) {
                this.showVeresiyePrompt(waitingCustomer, waitingCustomer.residentData);
                this.veresiyePromptCooldown = 15.0;
              }
            }
          } else {
            waitingCustomer.isCashierWaiting = true;
          }
        }

        if (cashierBot) {
          cashierBot.rightArm.rotation.x = -0.2;
          cashierBot.leftArm.rotation.x = 0;
          cashierBot.head.rotation.y = 0;
        }
      } else {
        if (chk && chk.hideProgress) {
          chk.hideProgress();
        }
        if (cashierBot) {
          cashierBot.rightArm.rotation.x = 0;
          cashierBot.leftArm.rotation.x = 0;
          cashierBot.head.rotation.y = 0;
        }
      }

      if (cashierBot) {
        cashierBot.update(delta);
      }

      // Money pickup on tray
      const cashPickupPos = new THREE.Vector3(chk.x + 0.88, 0, chk.z + 0.22);
      if (playerPos.distanceTo(cashPickupPos) < 1.6 && chk.cashOnCounter > 0) {
        let earned = chk.collectCash();
        this.playTransferEffect(cashPickupPos, playerPos, null, true);
        this.money += earned;
        this.updateMoneyUI();
        window.Sound.playCoin();
        this.showFloatingText(`+$${earned}`, chk.group.position, '#2ecc71');
        this.recordProgressEvent({ type: 'collectCash', amount: 1 });
        this.saveState();
      }
    });

    if (this.veresiyePromptCooldown > 0) this.veresiyePromptCooldown -= delta;
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
    const dayChoiceEffects = window.GameMechanics?.getDayChoiceEffects
      ? window.GameMechanics.getDayChoiceEffects(this.activeDayChoice)
      : { customerSpawnRateBoost: 0, residentAffinityBonus: false, specialCustomer: null, boostedItems: [] };

    const baseSpawnRate = this.isRushHour ? 1.4 : 4.0;
    const totalSpawnBoost = (buildingEffects.customerSpawnRateBoost || 0) + (dayChoiceEffects.customerSpawnRateBoost || 0);
    const spawnRate = Math.max(0.8, baseSpawnRate * (1 - totalSpawnBoost));
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
      let residentCandidate = (this.neighborhoodState && window.GameMechanics?.getResidentSpawnCandidate)
        ? window.GameMechanics.getResidentSpawnCandidate(this.neighborhoodState, dayTime)
        : null;
      if (dayChoiceEffects.specialCustomer && window.GameMechanics?.NEIGHBORHOOD_RESIDENTS && Math.random() < 0.45) {
        const specialResident = window.GameMechanics.NEIGHBORHOOD_RESIDENTS.find(r => r.id === dayChoiceEffects.specialCustomer);
        if (specialResident) residentCandidate = specialResident;
      }

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

    // VIP Customer Spawn (Requires prestige isVIPEligible e.g. [P3] 3+ Stars)
    this.vipSpawnTimer -= delta;
    const storePrestige = window.GameMechanics?.calculateStorePrestige
      ? window.GameMechanics.calculateStorePrestige(this.decorationState, this.hygieneScore, this.brandState, this.neighborhoodState)
      : { isVIPEligible: true, perks: { vipSpawnRateMultiplier: 1.0 } };

    if (this.vipSpawnTimer <= 0 && this.shelves.length >= 3 && storePrestige.isVIPEligible) {
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
      const rateMult = (storePrestige.perks && storePrestige.perks.vipSpawnRateMultiplier) ? storePrestige.perks.vipSpawnRateMultiplier : 1.0;
      this.vipSpawnTimer = (45.0 + Math.random() * 20.0) / rateMult;
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
    else if (this.checkouts && this.checkouts.some(c => c && c.cashOnCounter > 0)) {
      const chk = this.checkouts.find(c => c && c.cashOnCounter > 0) || this.checkout;
      target = new THREE.Vector3(chk.x + 0.88, 0, chk.z + 0.22);
      iconKey = 'CASH';
      text = `PARALARI TOPLA (+$${chk.cashOnCounter})`;
    }
    // 3. Customers waiting in checkout line (if no auto cashier and player not cashier)
    else if (this.customers.some(c => c.state === 'IN_CHECKOUT_LINE') && this.checkouts && this.checkouts.some(c => c && !c.hasCashier)) {
      const chk = this.checkouts.find(c => c && !c.hasCashier) || this.checkout;
      target = new THREE.Vector3(chk.x, 0, chk.z - 0.65);
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
          residentOrders: this.residentOrders || window.GameMechanics.createResidentOrderState(),
          brands: this.brandState || window.GameMechanics.createBrandState(),
          dayChoice: this.activeDayChoice || null,
          neighborhoodBuildings: this.neighborhoodBuildingsState || window.GameMechanics.createNeighborhoodBuildingState(),
          veresiye: this.veresiyeState || window.GameMechanics.createVeresiyeState(),
          wholesale: this.wholesaleState || window.GameMechanics.createWholesaleState(),
          staffFatigue: this.staffFatigue || window.GameMechanics.createStaffFatigueState(),
          decoration: this.decorationState || window.GameMechanics.createDecorationState(),
          customLayout: this.customLayout || {},
          retailPrices: this.retailPrices || {},
          warehouseInventory: this.warehouseInventory || {},
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

        this.retailPrices = data.retailPrices || {};
        this.warehouseInventory = data.warehouseInventory || {};
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
        this.residentOrders = window.GameMechanics.createResidentOrderState(data.residentOrders || {});
        this.brandState = window.GameMechanics.createBrandState(data.brands || {});
        this.activeDayChoice = data.dayChoice || null;
        this.neighborhoodBuildingsState = window.GameMechanics.createNeighborhoodBuildingState(data.neighborhoodBuildings || {});
        if (this.neighborhoodBuildingsState.built && Array.isArray(this.neighborhoodBuildingsState.built)) {
          this.neighborhoodBuildingsState.built.forEach(bId => this.spawnNeighborhoodBuildingMesh(bId));
        }
        this.veresiyeState = window.GameMechanics.createVeresiyeState(data.veresiye || {});
        this.wholesaleState = window.GameMechanics.createWholesaleState(data.wholesale || {});
        this.staffFatigue = window.GameMechanics.createStaffFatigueState(data.staffFatigue || {});
        this.decorationState = window.GameMechanics.createDecorationState(data.decoration || {});
        this.spawnPurchasedDecorations();
        this.applyDecorationEffects();
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

        if (data.customLayout && typeof data.customLayout === 'object') {
          this.customLayout = data.customLayout;
          this.applyCustomLayout();
        }

        this.saveState();
      }
    } catch (e) {
      this.isLoadingSave = false;
      console.warn('Save load failed, using fresh runtime state.', e);
    }
  }

  // Pricing & brand calculation for item checkouts
  getSalePrice(type, basePrice = null, soldItem = null) {
    const item = ITEM_TYPES[type] || ITEM_TYPES.TOMATO;
    let base;
    if (this.retailPrices && typeof this.retailPrices[type] === 'number') {
      base = this.retailPrices[type];
    } else {
      base = typeof basePrice === 'number' ? basePrice : item.price;
    }
    let price = base;

    if (soldItem && window.GameMechanics?.getFreshItemPricedAmount) {
      price = window.GameMechanics.getFreshItemPricedAmount(price, soldItem, this.dayState?.elapsedSeconds || 0);
    }

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
    const previousBrandState = this.brandState;
    this.brandState = window.GameMechanics.recordBrandSale(this.brandState, type, qty);
    const levelInfo = window.GameMechanics.getBrandLevelUpInfo
      ? window.GameMechanics.getBrandLevelUpInfo(previousBrandState, this.brandState, type)
      : { didLevelUp: false };
    if (levelInfo.didLevelUp) {
      this.showFloatingText(`MARKA SEVİYE ATLADI! ${levelInfo.brandName} [LV${levelInfo.nextReputation}]`, this.player.group.position, '#00D2D3');
      if (this.particleFX && this.particleFX.spawnGoldenSparkles) {
        this.particleFX.spawnGoldenSparkles(this.player.group.position, 10);
      }
      window.Sound.playUnlock();
    }
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
    const dayChoiceEffects = window.GameMechanics?.getDayChoiceEffects
      ? window.GameMechanics.getDayChoiceEffects(this.activeDayChoice)
      : null;
    if (dayChoiceEffects?.residentAffinityBonus && (!dayChoiceEffects.specialCustomer || dayChoiceEffects.specialCustomer === residentId)) {
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
    this.prepareModalSurface('neighborhood-modal');
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
    } else if (tab === 'veresiye') {
      this.renderVeresiyeTab(container);
    } else if (tab === 'branches') {
      this.renderBranchesTab(container);
    }
  }

  renderResidentsTab(container) {
    const grid = document.createElement('div');
    grid.className = 'resident-grid';

    const dayTime = this.dayState ? window.GameMechanics.getResidentDayTime(this.dayState.elapsedSeconds || this.dayState.clock || 0) : null;
    const availableItems = this.getAvailableDemandItems ? this.getAvailableDemandItems() : [];
    const profiles = window.GameMechanics.getResidentProfiles
      ? window.GameMechanics.getResidentProfiles(this.neighborhoodState, { veresiyeState: this.veresiyeState, dayTime, availableItems })
      : (window.GameMechanics.NEIGHBORHOOD_RESIDENTS || []);
    profiles.forEach(res => {
      const card = document.createElement('div');
      card.className = 'resident-card';

      const aff = typeof res.affinity === 'number' ? res.affinity : window.GameMechanics.getResidentAffinity(this.neighborhoodState, res.id);
      const stories = window.GameMechanics.getUnlockedStories(this.neighborhoodState, res.id);
      const visits = res.visits || 0;
      const routineLabel = res.routine === 'morning' ? 'SABAH' : (res.routine === 'afternoon' ? 'ÖĞLE' : 'AKŞAM');
      const preferredNames = (res.preferredItems || []).map(type => (ITEM_TYPES[type] || { name: type }).name).join(', ');
      const nextText = res.nextAffinityVisitTarget
        ? `${res.visitsUntilNextAffinity} ziyaret sonra LV${Math.min(5, aff + 1)}`
        : 'MAKS SADAKAT';
      const debtText = res.hasDebt ? `VERESİYE: $${res.debt}` : 'BORÇ YOK';
      const basketText = res.basketMultiplier > 1 ? '2x sepet' : 'normal sepet';
      const tipText = res.tipMultiplier > 1 ? `+%${Math.round((res.tipMultiplier - 1) * 100)} ödeme bonusu` : 'standart ödeme';
      const specialOrderText = res.specialOrder
        ? `ÖZEL SİPARİŞ: ${res.specialOrder.targetQty}x ${(ITEM_TYPES[res.specialOrder.itemType] || { name: res.specialOrder.itemType }).name} · ÖDÜL $${res.specialOrder.rewardMoney}`
        : 'ÖZEL SİPARİŞ: LV2 sadakat ve uygun ürün bekliyor';

      card.innerHTML = `
        <div class="resident-head">
          <div class="resident-name">${res.name}</div>
          <div class="resident-affinity-badge">[LV${aff}] ${res.loyaltyLabel || 'KOMŞU'}</div>
        </div>
        <div class="resident-desc">${res.backstory}</div>
        <div class="resident-routine">ZİYARET VAKTİ: ${routineLabel}${res.isRoutineNow ? ' · BUGÜN AKTİF' : ''}</div>
        <div class="resident-routine">TERCİH: ${preferredNames}</div>
        <div class="resident-perk">${specialOrderText}</div>
        <div class="resident-perk">${debtText} · ${basketText} · ${tipText}</div>
        <div class="resident-perk">ZİYARET: ${visits} · SONRAKİ SADAKAT: ${nextText}</div>
        <div class="resident-stories-box">
          <div class="resident-stories-title">AÇILAN HİKAYELER (${stories.length}/5)</div>
          ${stories.length > 0 ? stories.map(s => `<div class="resident-story-item">"${s.text}"</div>`).join('') : '<div class="resident-story-item">Sadakat arttıkça özel hikayeler açılır.</div>'}
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
      const brandSummary = window.GameMechanics.getBrandPrestigeSummary
        ? window.GameMechanics.getBrandPrestigeSummary(this.brandState)
        : { prestigeBonus: 0, averageReputation: 1, premiumBrands: 0 };
      const pal = ['#ff5252', '#ff793f', '#ffe600', '#2ecc71', '#00d2d3', '#0984e3', '#6c5ce7', '#ff2a7a'];

      card.innerHTML = `
        <div class="brand-title">${itemName} - MARKA YÖNETİMİ (+%${Math.round((bonusMult - 1) * 100)} KAZANÇ)</div>
        <div class="brand-row">
          <span class="brand-label">PRESTİJ ETKİSİ:</span>
          <span class="brand-prestige-badge">+${brandSummary.prestigeBonus} PUAN · ORT. İTİBAR ${brandSummary.averageReputation} · PREMİUM ${brandSummary.premiumBrands}</span>
        </div>
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
          const check = window.GameMechanics.canUpgradeBrandTier(bInfo.quality, selectedTier, bInfo.salesCount || 0, this.money || 0);
          if (!check.canUpgrade) {
            window.Sound.playBuzz();
            this.showFloatingText(check.reason || 'KİLİTLİ!', this.player.group.position, '#FF4757');
            return;
          }
          if (check.cost > 0) {
            this.money -= check.cost;
            this.updateMoneyUI();
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
    const progress = window.GameMechanics.getNeighborhoodBuildingProgress
      ? window.GameMechanics.getNeighborhoodBuildingProgress(this.neighborhoodBuildingsState, this.money, this.progression.marketLevel)
      : null;
    if (progress) {
      const panel = document.createElement('div');
      panel.className = 'building-progress-panel';
      const nextText = progress.nextAvailable
        ? `SIRADAKİ: ${progress.nextAvailable.name} ($${progress.nextAvailable.cost})`
        : 'MAHALLE YATIRIMLARI TAMAM';
      const activeText = progress.activeEffectLabels.length > 0
        ? progress.activeEffectLabels.join(' · ')
        : 'Henüz aktif yatırım etkisi yok';
      panel.innerHTML = `
        <div class="building-progress-head">
          <div class="building-progress-title">MAHALLE GELİŞİMİ</div>
          <div class="building-progress-count">${progress.builtCount}/${progress.totalCount}</div>
        </div>
        <div class="building-progress-bar" aria-label="Mahalle yatırım ilerlemesi">
          <div class="building-progress-fill" style="width: ${progress.completionPercent}%"></div>
        </div>
        <div class="building-progress-meta">
          <span>${progress.completionPercent}% TAMAMLANDI</span>
          <span>${nextText}</span>
          <span>KİLİTLİ: ${progress.lockedCount}</span>
        </div>
        <div class="building-progress-effects">${activeText}</div>
      `;
      container.appendChild(panel);
    }

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
      meshInstance = new VoxelBusStop(this.scene, -24.0, -28.5);
    } else if (buildingId === 'park') {
      meshInstance = new VoxelPark(this.scene, -24.0, -39.5);
    } else if (buildingId === 'cafe') {
      meshInstance = new VoxelCafe(this.scene, 24.0, -28.5);
    } else if (buildingId === 'school') {
      meshInstance = new VoxelSchool(this.scene, 24.0, -39.5);
    } else if (buildingId === 'gym') {
      meshInstance = new VoxelGym(this.scene, 0.0, -39.5);
    }

    if (meshInstance) {
      this.builtNeighborhoodMeshes[buildingId] = meshInstance;
    }
  }

  renderVeresiyeTab(container) {
    this.veresiyeState = window.GameMechanics.createVeresiyeState(this.veresiyeState);
    const box = document.createElement('div');
    box.className = 'veresiye-box-content';
    box.style.display = 'flex';
    box.style.flexDirection = 'column';
    box.style.gap = '14px';

    const totalDebt = window.GameMechanics.getVeresiyeTotal(this.veresiyeState);

    const summaryCard = document.createElement('div');
    summaryCard.className = 'veresiye-summary-card';
    summaryCard.style.background = '#FFE600';
    summaryCard.style.border = '3px solid #000';
    summaryCard.style.padding = '12px';
    summaryCard.style.boxShadow = '4px 4px 0 #000';
    summaryCard.innerHTML = `
      <div style="font-weight: 900; font-size: 15px;">ESNAF VERESİYE DEFTERİ</div>
      <div style="font-size: 12px; margin-top: 4px;">Toplam Alacak: <strong>$${totalDebt}</strong> · Esnaf İtimadı: <strong>%${this.veresiyeState.trustScore || 100}</strong></div>
      <div style="font-size: 11px; color: #333; margin-top: 2px;">Komşular her sabah dükkana gelip borçlarını nakit olarak kapatır.</div>
    `;
    box.appendChild(summaryCard);

    const grid = document.createElement('div');
    grid.className = 'resident-grid';

    const residents = window.GameMechanics.NEIGHBORHOOD_RESIDENTS || [];
    residents.forEach(r => {
      const debt = this.veresiyeState.debts[r.id] || 0;
      const card = document.createElement('div');
      card.className = 'resident-card';
      card.innerHTML = `
        <div class="resident-head">
          <div class="resident-name">${r.name}</div>
          <div class="resident-affinity-badge">${debt > 0 ? `BORÇ: $${debt}` : '[BORÇ YOK]'}</div>
        </div>
        <div class="resident-desc">${r.backstory || r.description || ''}</div>
        <div class="resident-routine" style="margin-top: 6px;">Durum: ${debt > 0 ? 'Ödeme sabah bekleniyor.' : 'Hesap temiz.'}</div>
        ${debt > 0 ? `<button type="button" class="branch-action-btn collect active" data-collect-debt="${r.id}" style="margin-top: 8px;">TAHSİLAT İSTE (+$${debt})</button>` : ''}
      `;

      const collectBtn = card.querySelector(`[data-collect-debt="${r.id}"]`);
      if (collectBtn) {
        collectBtn.addEventListener('click', () => {
          const res = window.GameMechanics.collectVeresiye(this.veresiyeState, r.id, debt);
          this.veresiyeState = res.state;
          this.money += res.collected;
          this.updateMoneyUI();
          window.Sound.playCoin();
          this.showFloatingText(`+$${res.collected} VERESİYE TAHSİL EDİLDİ!`, this.player.group.position, '#2ECC71');
          this.saveState();
          this.renderVeresiyeTab(container);
        });
      }

      grid.appendChild(card);
    });

    box.appendChild(grid);
    container.replaceChildren(box);
  }

  renderBranchesTab(container) {
    this.branchState = window.GameMechanics.createBranchState(this.branchState || this.branches);
    const box = document.createElement('div');
    box.className = 'branch-box-container';
    box.style.display = 'flex';
    box.style.flexDirection = 'column';
    box.style.gap = '14px';

    const prestige = window.GameMechanics?.calculateStorePrestige
      ? window.GameMechanics.calculateStorePrestige(this.decorationState, this.hygieneScore, this.brandState, this.neighborhoodState)
      : { stars: 1, score: 25 };

    const grid = document.createElement('div');
    grid.className = 'branch-grid';

    const configs = window.GameMechanics.BRANCH_CONFIGS || {};

    Object.entries(this.branchState.branches).forEach(([branchId, branch]) => {
      const cfg = configs[branchId] || { name: branch.name, unlockCost: 0, unlockPrestige: 1, unlockLevel: 1, district: 'Mahalle', description: '' };
      const card = document.createElement('div');
      card.className = 'branch-card';

      if (branchId === 'branch_1') {
        card.innerHTML = `
          <div class="branch-head">
            <div class="branch-name">${branch.name}</div>
            <div class="branch-badge">[ANA İŞLETME]</div>
          </div>
          <div class="branch-district">${cfg.district} · 3D Canlı Süpermarket</div>
          <div class="branch-desc">${cfg.description}</div>
          <div class="branch-stats-box">
            <div class="branch-stat-row">
              <span>İŞLETME KAPASİTESİ:</span>
              <strong>${this.shelves.length} Raf (${this.shelves.length * 8} Ürün)</strong>
            </div>
            <div class="branch-stat-row">
              <span>PRESTİJ DERECESİ:</span>
              <strong>[P${prestige.stars}] (${prestige.score}/100 Puan)</strong>
            </div>
            <div class="branch-stat-row">
              <span>DÜKKAN HİJYENİ:</span>
              <strong>%${Math.round(this.hygieneScore)}</strong>
            </div>
          </div>
        `;
      } else if (!branch.unlocked) {
        const check = window.GameMechanics.canUnlockBranch(this.branchState, branchId, this.money, prestige.stars, this.progression.marketLevel);
        card.innerHTML = `
          <div class="branch-head">
            <div class="branch-name">${cfg.name}</div>
            <div class="branch-badge locked">[KİLİTLİ]</div>
          </div>
          <div class="branch-district">${cfg.district} · Uydu Şube</div>
          <div class="branch-desc">${cfg.description}</div>
          <div class="branch-requirements">
            <div class="req-item ${prestige.stars >= cfg.unlockPrestige ? 'met' : 'unmet'}">
              Gereken Prestij: [P${cfg.unlockPrestige}] (${cfg.unlockPrestige} Yıldız)
            </div>
            <div class="req-item ${this.progression.marketLevel >= cfg.unlockLevel ? 'met' : 'unmet'}">
              Gereken Market Seviyesi: LV${cfg.unlockLevel}
            </div>
            <div class="req-item ${this.money >= cfg.unlockCost ? 'met' : 'unmet'}">
              Açılış Maliyeti: $${cfg.unlockCost}
            </div>
          </div>
          <button type="button" class="branch-unlock-btn ${check.allowed ? 'active' : 'disabled'}" data-branch-unlock="${branchId}">
            ${check.allowed ? `ŞUBEYİ AÇ ($${cfg.unlockCost})` : (check.reason || 'KİLİTLİ')}
          </button>
        `;

        const unlockBtn = card.querySelector(`[data-branch-unlock="${branchId}"]`);
        if (unlockBtn && check.allowed) {
          unlockBtn.addEventListener('click', () => {
            this.money -= cfg.unlockCost;
            this.updateMoneyUI();
            this.branchState = window.GameMechanics.unlockBranch(this.branchState, branchId, this.money);
            this.branches = this.branchState.branches;
            window.Sound.playUnlock();
            this.showFloatingText(`${cfg.name} AÇILDI!`, this.player.group.position, '#2ECC71');
            this.saveState();
            this.renderBranchesTab(container);
          });
        }
      } else {
        const currentStockCount = Object.values(branch.stock).reduce((a, b) => a + (Number(b) || 0), 0);
        const upgradeCost = branch.level * 1500;
        const canUpgrade = this.money >= upgradeCost;

        const stockEntries = Object.entries(branch.stock).filter(([_, qty]) => qty > 0);
        const stockPillsHtml = stockEntries.length > 0
          ? stockEntries.map(([type, qty]) => {
              const name = (ITEM_TYPES[type] || { name: type }).name;
              return `<div class="branch-stock-pill">${name}: ${qty}</div>`;
            }).join('')
          : '<div class="branch-stock-empty">Stok boş! Sevkiyat yapın.</div>';

        card.innerHTML = `
          <div class="branch-head">
            <div class="branch-name">${branch.name}</div>
            <div class="branch-badge active">[LV${branch.level} AKTİF]</div>
          </div>
          <div class="branch-district">${cfg.district} · Otomatik Ciro</div>
          <div class="branch-stats-box">
            <div class="branch-stat-row">
              <span>KAPASİTE:</span>
              <strong>${currentStockCount} / ${branch.capacity} Kasa</strong>
            </div>
            <div class="branch-stat-row">
              <span>BİRİKEN KASA HASILATI:</span>
              <strong class="branch-revenue-text">$${branch.uncollectedRevenue}</strong>
            </div>
            <div class="branch-stat-row">
              <span>DÜN SATILAN ÜRÜN:</span>
              <strong>${branch.lastDaySales} adet (Günlük Ciro: $${branch.dailyRevenue})</strong>
            </div>
            <div class="branch-stat-row">
              <span>ŞUBE MÜDÜRÜ:</span>
              <strong>${branch.staff.manager ? 'ATANDI (+%30 Gelir)' : 'YOK'}</strong>
            </div>
          </div>

          <div class="branch-section-title">ŞUBE STOK DURUMU</div>
          <div class="branch-stock-grid">${stockPillsHtml}</div>

          <div class="branch-actions-grid">
            <button type="button" class="branch-action-btn collect ${branch.uncollectedRevenue > 0 ? 'active' : 'disabled'}" data-branch-collect="${branchId}">
              HASILATI TAHSİL ET (+$${branch.uncollectedRevenue})
            </button>
            <button type="button" class="branch-action-btn ship" data-branch-ship="${branchId}">
              SEVKİYAT YAP (+16 Ürün, $120)
            </button>
            <button type="button" class="branch-action-btn upgrade ${canUpgrade ? 'active' : 'disabled'}" data-branch-upgrade="${branchId}">
              KAPASİTE YÜKSELT (+$30 Kapasite, $${upgradeCost})
            </button>
            <button type="button" class="branch-action-btn manager ${!branch.staff.manager && this.money >= 1000 ? 'active' : 'disabled'}" data-branch-manager="${branchId}">
              ${branch.staff.manager ? 'MÜDÜR GÖREVDE' : 'MÜDÜR İŞE AL ($1,000)'}
            </button>
          </div>
        `;

        const collectBtn = card.querySelector(`[data-branch-collect="${branchId}"]`);
        if (collectBtn && branch.uncollectedRevenue > 0) {
          collectBtn.addEventListener('click', () => {
            const res = window.GameMechanics.collectBranchRevenue(this.branchState, branchId);
            this.branchState = res.state;
            this.branches = this.branchState.branches;
            this.money += res.collectedAmount;
            this.updateMoneyUI();
            window.Sound.playCoin();
            this.showFloatingText(`+$${res.collectedAmount} TAHSİL EDİLDİ!`, this.player.group.position, '#FFE600');
            this.saveState();
            this.renderBranchesTab(container);
          });
        }

        const shipBtn = card.querySelector(`[data-branch-ship="${branchId}"]`);
        if (shipBtn) {
          shipBtn.addEventListener('click', () => {
            const shipCost = 120;
            if (this.money < shipCost) {
              window.Sound.playBuzz();
              this.showFloatingText('YETERSİZ BAKİYE!', this.player.group.position, '#FF5252');
              return;
            }
            if (currentStockCount >= branch.capacity) {
              window.Sound.playBuzz();
              this.showFloatingText('ŞUBE DEPOSU DOLU!', this.player.group.position, '#FF5252');
              return;
            }
            this.money -= shipCost;
            this.updateMoneyUI();
            const items = ['TOMATO', 'BREAD', 'CHEESE', 'APPLE_JUICE'];
            items.forEach(t => {
              this.branchState = window.GameMechanics.transferStockToBranch(this.branchState, branchId, t, 4);
            });
            this.branches = this.branchState.branches;
            window.Sound.playPop();
            this.showFloatingText('SEVKİYAT ŞUBEYE ULAŞTI!', this.player.group.position, '#00D2D3');
            this.saveState();
            this.renderBranchesTab(container);
          });
        }

        const upgradeBtn = card.querySelector(`[data-branch-upgrade="${branchId}"]`);
        if (upgradeBtn && canUpgrade) {
          upgradeBtn.addEventListener('click', () => {
            const res = window.GameMechanics.upgradeBranchCapacity(this.branchState, branchId, this.money);
            if (res.upgraded) {
              this.money -= res.cost;
              this.updateMoneyUI();
              this.branchState = res.state;
              this.branches = this.branchState.branches;
              window.Sound.playUnlock();
              this.showFloatingText(`${branch.name} SEVİYE ${res.newLevel} OLDU!`, this.player.group.position, '#FFE600');
              this.saveState();
              this.renderBranchesTab(container);
            }
          });
        }

        const managerBtn = card.querySelector(`[data-branch-manager="${branchId}"]`);
        if (managerBtn && !branch.staff.manager && this.money >= 1000) {
          managerBtn.addEventListener('click', () => {
            this.money -= 1000;
            this.updateMoneyUI();
            this.branchState = window.GameMechanics.assignBranchStaff(this.branchState, branchId, 'manager', true);
            this.branches = this.branchState.branches;
            window.Sound.playUnlock();
            this.showFloatingText('ŞUBE MÜDÜRÜ ATANDI (+%30 GELİR)!', this.player.group.position, '#2ECC71');
            this.saveState();
            this.renderBranchesTab(container);
          });
        }
      }

      grid.appendChild(card);
    });

    box.appendChild(grid);
    container.replaceChildren(box);
  }

  // --- Day Start Choice Neo-Brutalist System ---
  initDayChoiceUI() {
    // Day choice cards ready for dynamic presentation
  }

  presentDayChoices() {
    const modal = document.getElementById('day-choice-modal');
    const container = document.getElementById('day-choice-cards');
    if (!modal || !container) return;
    this.prepareModalSurface('day-choice-modal');
    this.isDayChoiceOpen = true;

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
    const effects = window.GameMechanics.getDayChoiceEffects(this.activeDayChoice);
    this.isDayChoiceOpen = false;
    const modal = document.getElementById('day-choice-modal');
    if (modal) {
      modal.classList.remove('open');
      modal.classList.add('hidden');
    }
    window.Sound.playCoin();
    const boostedLabel = effects.boostedItems.length > 0
      ? ` ${effects.boostedItems.map(type => ITEM_TYPES[type]?.name || type).join(' + ')}`
      : '';
    this.showFloatingText(`${choice.name} AKTİF!${boostedLabel}`, this.player.group.position, '#FFE600');
    this.saveState();
  }

  // --- Living Neighborhood Phase 1, 2, 3 Implementation Methods ---

  initBootSequence() {
    // Expose global custom toast/confirm functions
    window.showNeoToast = (message, type = 'info') => {
      const container = document.getElementById('neo-toast-container');
      if (!container) return;

      const toast = document.createElement('div');
      toast.className = `neo-toast ${type}`;
      toast.innerText = message;
      
      container.appendChild(toast);

      setTimeout(() => {
        toast.classList.add('toast-leave');
        toast.addEventListener('animationend', () => {
          if (toast.parentNode === container) {
            container.removeChild(toast);
          }
        });
      }, 4000);
    };

    window.showNeoConfirm = (message, onConfirm) => {
      const modal = document.getElementById('neo-confirm-modal');
      const msgEl = document.getElementById('neo-confirm-message');
      const btnYes = document.getElementById('btn-confirm-yes');
      const btnNo = document.getElementById('btn-confirm-no');
      const btnClose = document.getElementById('btn-close-confirm');

      if (!modal || !msgEl || !btnYes || !btnNo) return;

      msgEl.innerText = message;
      modal.classList.remove('hidden');

      const cleanup = () => {
        modal.classList.add('hidden');
        btnYes.removeEventListener('click', yesHandler);
        btnNo.removeEventListener('click', noHandler);
        btnClose?.removeEventListener('click', noHandler);
      };

      const yesHandler = () => {
        cleanup();
        if (onConfirm) onConfirm();
      };
      
      const noHandler = () => {
        cleanup();
      };

      btnYes.addEventListener('click', yesHandler);
      btnNo.addEventListener('click', noHandler);
      btnClose?.addEventListener('click', noHandler);
    };

    this.isBooting = true;
    const bootScreen = document.getElementById('boot-loading-screen');
    const menuScreen = document.getElementById('main-menu-screen');
    const loadingBar = document.getElementById('neo-loading-bar');
    const loadingText = document.getElementById('neo-loading-text');

    let progress = 0;
    const bootInterval = setInterval(() => {
      progress += Math.random() * 20;
      if (progress > 100) progress = 100;
      if (loadingBar) loadingBar.style.width = `${progress}%`;
      
      if (progress >= 100) {
        clearInterval(bootInterval);
        setTimeout(() => {
          if (bootScreen) bootScreen.classList.add('hidden');
          if (menuScreen) menuScreen.classList.remove('hidden');
        }, 400);
      }
    }, 200);

    const btnPlay = document.getElementById('btn-play-game');
    if (btnPlay) {
      btnPlay.addEventListener('click', () => {
        if (menuScreen) menuScreen.classList.add('hidden');
        this.isBooting = false;
      });
    }

    const optionsModal = document.getElementById('neo-options-modal');
    const btnOptions = document.getElementById('btn-options-menu');
    if (btnOptions && optionsModal) {
      btnOptions.addEventListener('click', () => {
        optionsModal.classList.remove('hidden');
      });
    }

    const btnCloseOptions = document.getElementById('btn-close-options');
    if (btnCloseOptions && optionsModal) {
      btnCloseOptions.addEventListener('click', () => {
        optionsModal.classList.add('hidden');
      });
    }

    const btnToggleSound = document.getElementById('neo-btn-toggle-sound');
    if (btnToggleSound) {
      btnToggleSound.addEventListener('click', () => {
        if (window.AudioSystem) {
          window.AudioSystem.toggleMute();
          btnToggleSound.textContent = window.AudioSystem.isMuted ? 'KAPALI' : 'AÇIK';
        }
      });
    }

    const btnToggleNotifications = document.getElementById('neo-btn-toggle-notifications');
    if (btnToggleNotifications) {
      btnToggleNotifications.addEventListener('click', () => {
        const isOff = btnToggleNotifications.textContent === 'KAPALI';
        btnToggleNotifications.textContent = isOff ? 'AÇIK' : 'KAPALI';
      });
    }

    const btnPrivacyPolicy = document.getElementById('neo-btn-privacy-policy');
    if (btnPrivacyPolicy) {
      btnPrivacyPolicy.addEventListener('click', () => {
        window.showNeoToast('GİZLİLİK POLİTİKASI:\nKullanıcı verileri cihazınızda yerel olarak saklanmaktadır. Üçüncü partilerle paylaşım yapılmamaktadır.', 'info');
      });
    }

    const btnRestorePurchases = document.getElementById('neo-btn-restore-purchases');
    if (btnRestorePurchases) {
      btnRestorePurchases.addEventListener('click', () => {
        window.showNeoToast('SATIN ALIMLAR KONTROL EDİLİYOR...\n\nGeri yüklenecek bir satın alım bulunamadı.', 'warning');
      });
    }

    const btnDeleteAccount = document.getElementById('neo-btn-delete-account');
    if (btnDeleteAccount) {
      btnDeleteAccount.addEventListener('click', () => {
        window.showNeoConfirm('DİKKAT: HESABI SİLMEK İSTEDİĞİNİZE EMİN MİSİNİZ?\n\nBu işlem geri alınamaz ve tüm kayıt dosyalarınız kalıcı olarak silinecektir.', () => {
          window.showNeoToast('Hesap verileriniz başarıyla silindi.', 'success');
          // Simulated data wipe
          localStorage.removeItem('marketSave');
          setTimeout(() => location.reload(), 1500);
        });
      });
    }
  }

  initWholesaleUI() {
    this.wholesaleBtn = document.getElementById('wholesale-btn');
    this.wholesaleModal = document.getElementById('wholesale-modal');
    this.wholesaleCloseBtn = document.getElementById('wholesale-close-btn');
    this.wholesaleContent = document.getElementById('wholesale-content');

    if (this.wholesaleBtn) {
      this.wholesaleBtn.addEventListener('click', () => this.openWholesaleModal());
    }
    if (this.wholesaleCloseBtn) {
      this.wholesaleCloseBtn.addEventListener('click', () => this.closeWholesaleModal());
    }
    if (this.wholesaleModal) {
      this.wholesaleModal.addEventListener('click', (e) => {
        if (e.target === this.wholesaleModal) this.closeWholesaleModal();
      });
    }

    this.veresiyePrompt = document.getElementById('veresiye-prompt');
    this.veresiyeResidentName = document.getElementById('veresiye-resident-name');
    this.veresiyeResidentMsg = document.getElementById('veresiye-resident-msg');
    this.veresiyeAcceptBtn = document.getElementById('veresiye-accept-btn');
    this.veresiyeDeclineBtn = document.getElementById('veresiye-decline-btn');

    if (this.veresiyeAcceptBtn) {
      this.veresiyeAcceptBtn.addEventListener('click', () => this.confirmVeresiyeCheckout());
    }
    if (this.veresiyeDeclineBtn) {
      this.veresiyeDeclineBtn.addEventListener('click', () => this.declineVeresiyeCheckout());
    }
  }

  openWholesaleModal() {
    this.prepareModalSurface('wholesale-modal');
    this.isWholesaleOpen = true;
    if (this.wholesaleModal) {
      this.wholesaleModal.classList.add('open');
      this.wholesaleModal.classList.remove('hidden');
    }
    this.renderWholesaleCatalog();
    window.Sound.playUnlock();
  }

  closeWholesaleModal() {
    this.isWholesaleOpen = false;
    if (this.wholesaleModal) {
      this.wholesaleModal.classList.remove('open');
      this.wholesaleModal.classList.add('hidden');
    }
  }

  renderWholesaleCatalog() {
    if (!this.wholesaleContent) return;
    this.wholesaleContent.replaceChildren();

    const grid = document.createElement('div');
    grid.className = 'wholesale-grid';

    const catalog = window.GameMechanics.WHOLESALE_CATALOG || {};
    Object.entries(catalog).forEach(([itemKey, itemInfo]) => {
      const card = document.createElement('div');
      card.className = 'wholesale-card';

      const retailComp = itemInfo.retailRef * itemInfo.count;
      const discount = Math.round((1 - itemInfo.cost / retailComp) * 100);
      const canAfford = this.money >= itemInfo.cost;
      const isTruckBusy = !!(this.wholesaleBay && this.wholesaleBay.activeTruck);

      card.innerHTML = `
        <div class="wholesale-card-header">
          <div class="wholesale-item-name">${itemInfo.name} (${itemInfo.count} Adet)</div>
          <span class="wholesale-badge">-%${discount} İNDİRİM</span>
        </div>
        <div class="wholesale-pricing">
          <span class="wholesale-price">$${itemInfo.cost}</span>
          <span class="wholesale-retail-comp">Piyasa: $${retailComp}</span>
        </div>
        <button class="wholesale-order-btn" ${!canAfford || isTruckBusy ? 'disabled' : ''}>
          ${isTruckBusy ? 'KAMYON YOLDA' : (canAfford ? 'KOLİ SİPARİŞ ET' : 'YETERSİZ BAKİYE')}
        </button>
      `;

      const btn = card.querySelector('.wholesale-order-btn');
      btn.addEventListener('click', () => {
        if (!canAfford || isTruckBusy) return;
        this.money -= itemInfo.cost;
        this.updateMoneyUI();
        this.wholesaleState = window.GameMechanics.orderWholesaleCrate(this.wholesaleState, itemKey, itemInfo.cost);
        this.spawnWholesaleTruck(itemKey, itemInfo.count);
        this.showFloatingText(`TOPTANCI SİPARİŞİ: ${itemInfo.name}`, this.player.group.position, '#2ECC71');
        window.Sound.playCoin();
        this.renderWholesaleCatalog();
        this.saveState();
      });

      grid.appendChild(card);
    });

    this.wholesaleContent.appendChild(grid);
  }

  spawnWholesaleTruck(itemType, count = 6) {
    if (!this.wholesaleBay || this.wholesaleBay.activeTruck) return;
    this.wholesaleBay.activeTruck = new WholesaleTruck(
      this.scene,
      -36.0,
      -24.0,
      -10.0,
      () => {
        this.wholesaleBay.spawnCrate(itemType, count);
        window.Sound.playStock();
        this.showFloatingText('KOLİ PALETE İNDİRİLDİ!', new THREE.Vector3(-24.0, 1.2, -10.0), '#FFE600');
        this.renderWholesaleCatalog();
      },
      () => {
        this.wholesaleBay.activeTruck = null;
        this.renderWholesaleCatalog();
      }
    );
  }

  // --- Retro CRT B2B Procurement Terminal & Dynamic Pricing (Faz 1, 2, 3, 4) ---

  initProcurementUI() {
    this.procurementModal = document.getElementById('procurement-modal');
    this.procurementCloseBtn = document.getElementById('procurement-close-btn');
    this.procurementContent = document.getElementById('procurement-content');
    this.crtMoneyDisplay = document.getElementById('crt-money-display');
    this.crtDockStatus = document.getElementById('crt-dock-status');
    this.crtTabs = Array.from(document.querySelectorAll('.crt-tab'));

    this.activeProcurementTab = 'orders';
    this.procurementOrderQuantities = {};
    this.retailPrices = this.retailPrices || {};
    this.warehouseInventory = this.warehouseInventory || {};

    if (this.procurementCloseBtn) {
      this.procurementCloseBtn.addEventListener('click', () => this.closeProcurementTerminal());
    }
    if (this.procurementModal) {
      this.procurementModal.addEventListener('click', (e) => {
        if (e.target === this.procurementModal) this.closeProcurementTerminal();
      });
    }

    const promptEl = document.getElementById('office-terminal-prompt');
    if (promptEl) {
      promptEl.style.cursor = 'pointer';
      promptEl.addEventListener('click', () => {
        if (this.isProcurementOpen) this.closeProcurementTerminal();
        else this.openProcurementTerminal();
      });
    }

    this.crtTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const tabKey = tab.getAttribute('data-proc-tab');
        this.setProcurementTab(tabKey);
      });
    });
  }

  setProcurementTab(tabKey) {
    this.activeProcurementTab = tabKey || 'orders';
    this.crtTabs.forEach(tab => {
      const match = tab.getAttribute('data-proc-tab') === this.activeProcurementTab;
      tab.classList.toggle('active', match);
      tab.setAttribute('aria-selected', match ? 'true' : 'false');
    });
    this.renderProcurementTerminal();
    window.Sound?.playPop?.();
  }

  openProcurementTerminal() {
    this.prepareModalSurface('procurement-modal');
    this.isProcurementOpen = true;
    if (this.procurementModal) {
      this.procurementModal.classList.remove('hidden');
      this.procurementModal.classList.add('open');
    }
    const promptEl = document.getElementById('office-terminal-prompt');
    if (promptEl) promptEl.classList.add('hidden');

    this.setProcurementTab(this.activeProcurementTab || 'orders');
    window.Sound?.playUnlock?.();
  }

  closeProcurementTerminal() {
    this.isProcurementOpen = false;
    if (this.procurementModal) {
      this.procurementModal.classList.remove('open');
      this.procurementModal.classList.add('hidden');
    }
  }

  renderProcurementTerminal() {
    if (!this.procurementContent) return;

    if (this.crtMoneyDisplay) {
      this.crtMoneyDisplay.textContent = Math.floor(this.money);
    }

    if (this.crtDockStatus) {
      if (this.wholesaleBay && this.wholesaleBay.activeTruck) {
        const truck = this.wholesaleBay.activeTruck;
        this.crtDockStatus.textContent = truck.state === 'UNLOADING'
          ? 'İSKELE: [MAL İNDİRİLİYOR]'
          : 'İSKELE: [SEVKİYAT YOLDA]';
      } else {
        this.crtDockStatus.textContent = 'İSKELE: [W_DOCK BOŞTA]';
      }
    }

    switch (this.activeProcurementTab) {
      case 'pricing':
        this.renderProcurementPricingTab();
        break;
      case 'trends':
        this.renderProcurementTrendsTab();
        break;
      case 'inventory':
        this.renderProcurementInventoryTab();
        break;
      case 'orders':
      default:
        this.renderProcurementOrdersTab();
        break;
    }
  }

  renderProcurementOrdersTab() {
    this.procurementContent.replaceChildren();

    const catalog = window.GameMechanics.WHOLESALE_CATALOG || {};
    const categories = [
      { key: 'BEVERAGES', label: '[İÇECEK REYONU & SOĞUTUCU VİTRİN]' },
      { key: 'CLEANING', label: '[TEMİZLİK & KİMYASAL BAKIM]' },
      { key: 'PERSONAL_CARE', label: '[KİŞİSEL BAKIM & HİJYEN]' },
      { key: 'FOOD_STAPLES', label: '[TEMEL GIDA & FIRIN STOKLARI]' }
    ];

    const isTruckBusy = !!(this.wholesaleBay && this.wholesaleBay.activeTruck);

    categories.forEach(cat => {
      const items = Object.entries(catalog).filter(([_, item]) => item.category === cat.key);
      if (items.length === 0) return;

      const header = document.createElement('div');
      header.style.cssText = 'color: #2ED573; font-weight: 900; font-size: 13px; margin: 10px 0 6px 0; border-bottom: 1px solid #2ED573; padding-bottom: 2px;';
      header.textContent = `>>> ${cat.label}`;
      this.procurementContent.appendChild(header);

      const table = document.createElement('table');
      table.className = 'crt-table';
      table.innerHTML = `
        <thead>
          <tr>
            <th>ÜRÜN &amp; MARKA</th>
            <th>KOLİ ADEDİ</th>
            <th>KOLİ FİYATI</th>
            <th>SİPARİŞ (KOLİ)</th>
            <th>İSKONTO</th>
            <th>TUTAR</th>
            <th>İŞLEM</th>
          </tr>
        </thead>
        <tbody></tbody>
      `;

      const tbody = table.querySelector('tbody');

      items.forEach(([itemKey, item]) => {
        const row = document.createElement('tr');
        if (!this.procurementOrderQuantities[itemKey]) {
          this.procurementOrderQuantities[itemKey] = 1;
        }
        let qty = this.procurementOrderQuantities[itemKey];

        const updateRowView = () => {
          const discountRate = window.GameMechanics.calculateBulkDiscount(qty);
          const totalCost = Math.round(item.cost * qty * (1 - discountRate));
          const canAfford = this.money >= totalCost;
          const discountLabel = discountRate >= 0.20 ? '-%20 (10+)' : (discountRate >= 0.10 ? '-%10 (5+)' : '%0 (5+ %10)');

          row.innerHTML = `
            <td>
              <strong style="color:#FFFDF5;">${item.name}</strong>
              <div style="font-size:11px; color:#2ED573; opacity:0.8;">Marka: ${item.brand || 'Yerel'}</div>
            </td>
            <td>${item.count} Adet</td>
            <td>$${item.cost}</td>
            <td>
              <div class="crt-qty-controls">
                <button type="button" class="crt-qty-btn btn-dec">[-]</button>
                <span class="crt-qty-val">${qty}</span>
                <button type="button" class="crt-qty-btn btn-inc">[+]</button>
              </div>
            </td>
            <td><span class="crt-discount-tag">${discountLabel}</span></td>
            <td><strong class="crt-total-text">$${totalCost}</strong></td>
            <td>
              <button type="button" class="crt-btn crt-btn-amber btn-order" ${!canAfford || isTruckBusy ? 'disabled' : ''}>
                ${isTruckBusy ? '[KAMYON YOLDA]' : (canAfford ? `[SİPARİŞ: $${totalCost}]` : '[BAKİYE YETERSİZ]')}
              </button>
            </td>
          `;

          row.querySelector('.btn-dec').addEventListener('click', () => {
            if (qty > 1) {
              qty--;
              this.procurementOrderQuantities[itemKey] = qty;
              updateRowView();
            }
          });

          row.querySelector('.btn-inc').addEventListener('click', () => {
            if (qty < 50) {
              qty++;
              this.procurementOrderQuantities[itemKey] = qty;
              updateRowView();
            }
          });

          row.querySelector('.btn-order').addEventListener('click', () => {
            if (!canAfford || isTruckBusy) return;
            this.submitWholesaleOrder(itemKey, qty);
          });
        };

        updateRowView();
        tbody.appendChild(row);
      });

      this.procurementContent.appendChild(table);
    });
  }

  submitWholesaleOrder(itemKey, qty = 1) {
    const catalog = window.GameMechanics.WHOLESALE_CATALOG || {};
    const item = catalog[itemKey];
    if (!item) return;

    if (this.wholesaleBay && this.wholesaleBay.activeTruck) {
      this.showFloatingText('KAMYON İSKELEDE BEKLENİYOR!', this.player.group.position, '#FFAA00');
      return;
    }

    const discountRate = window.GameMechanics.calculateBulkDiscount(qty);
    const totalCost = Math.round(item.cost * qty * (1 - discountRate));

    if (this.money < totalCost) {
      this.showFloatingText('YETERSİZ KASA BAKİYESİ!', this.player.group.position, '#FF5252');
      return;
    }

    this.money -= totalCost;
    this.updateMoneyUI();
    this.wholesaleState = window.GameMechanics.orderWholesaleCrate(this.wholesaleState, itemKey, totalCost);
    this.spawnWholesaleDeliveryTruck(itemKey, qty, item.count * qty);
    this.showFloatingText(`TOPTAN SEVKİYAT: ${item.name} (${qty} Koli)`, this.player.group.position, '#2ECC71');
    window.Sound?.playCashRegister?.();
    this.renderProcurementTerminal();
    this.saveState();
  }

  spawnWholesaleDeliveryTruck(itemType, cartonCount = 1, totalUnits = 6) {
    if (!this.wholesaleBay || this.wholesaleBay.activeTruck) return;

    this.wholesaleBay.activeTruck = new WholesaleTruck(
      this.scene,
      -36.0,
      -24.0,
      -10.0,
      () => {
        // Truck docked: unload crates onto pallet dock
        this.wholesaleBay.spawnCrate(itemType, totalUnits);
        this.warehouseInventory[itemType] = (this.warehouseInventory[itemType] || 0) + cartonCount;
        window.Sound?.playStock?.();
        this.showFloatingText(`[SEVKİYAT İNDİRİLDİ: ${cartonCount} KOLİ]`, new THREE.Vector3(-24.0, 1.2, -10.0), '#FFE600');
        if (this.isProcurementOpen) this.renderProcurementTerminal();
        this.saveState();
      },
      () => {
        // Truck departed
        this.wholesaleBay.activeTruck = null;
        this.wholesaleDeliveryTruck = null;
        if (this.isProcurementOpen) this.renderProcurementTerminal();
        this.saveState();
      }
    );

    this.wholesaleDeliveryTruck = this.wholesaleBay.activeTruck;
  }

  renderProcurementPricingTab() {
    this.procurementContent.replaceChildren();

    const catalog = window.GameMechanics.WHOLESALE_CATALOG || {};

    const infoBox = document.createElement('div');
    infoBox.style.cssText = 'background: #08170c; border: 1px solid #2ED573; padding: 8px 12px; margin-bottom: 12px; font-size: 12px; color: #FFFDF5;';
    infoBox.innerHTML = `
      <strong style="color: #2ED573;">[FİYAT ESNEKLİĞİ VE KÂR MARJI REHBERİ]</strong><br>
      Etiket fiyatını değiştirerek anlık kâr marjını (% MARJ) ve müşteri satın alma tepkisini optimize edin.<br>
      - MSRP +%20 üzeri: Müşteriler duraklar, başını sallar, [PAHALI!] balonu çıkar ve %35 vazgeçer.<br>
      - MSRP +%40 üzeri: [FAHİŞ!] şikayeti, hırsızlık riski artar.<br>
      - MSRP -%10 altı: [FIRSAT ÜRÜNÜ] rozetiyle yüksek sürüm ve mağaza prestiji kazandırır.
    `;
    this.procurementContent.appendChild(infoBox);

    const table = document.createElement('table');
    table.className = 'crt-table';
    table.innerHTML = `
      <thead>
        <tr>
          <th>ÜRÜN &amp; MARKA</th>
          <th>BİRİM MALİYET</th>
          <th>TÜFE (MSRP)</th>
          <th>ETİKET SATIŞ FİYATI</th>
          <th>KÂR MARJI</th>
          <th>MÜŞTERİ TEPKİSİ</th>
        </tr>
      </thead>
      <tbody></tbody>
    `;

    const tbody = table.querySelector('tbody');

    Object.entries(catalog).forEach(([itemKey, item]) => {
      const row = document.createElement('tr');
      const unitCost = Math.round((item.cost / item.count) * 100) / 100;
      let price = Number(this.retailPrices[itemKey] !== undefined ? this.retailPrices[itemKey] : item.retailRef);

      const updatePricingRow = () => {
        const margin = window.GameMechanics.calculateMargin(unitCost, price);
        const elasticity = window.GameMechanics.applyPriceElasticity(itemKey, price, item.retailRef);

        let badgeHtml = '';
        if (elasticity.appeal === 'BARGAIN') {
          badgeHtml = '<span class="crt-badge-bargain">[FIRSAT ÜRÜNÜ] (Sürüm + Prestij)</span>';
        } else if (elasticity.appeal === 'FAIR') {
          badgeHtml = '<span class="crt-badge-fair">[DENGELİ] (Standart Akış)</span>';
        } else if (elasticity.appeal === 'EXPENSIVE') {
          badgeHtml = '<span class="crt-badge-expensive">[PAHALI!] (%35 İade / Tereddüt)</span>';
        } else {
          badgeHtml = '<span class="crt-badge-gouge">[FAHİŞ!] (%70 İade / Şikayet)</span>';
        }

        row.innerHTML = `
          <td>
            <strong>${item.name}</strong>
            <div style="font-size:11px; color:#2ED573; opacity:0.8;">Marka: ${item.brand || 'Standart'}</div>
          </td>
          <td>$${unitCost.toFixed(2)}</td>
          <td>$${item.retailRef.toFixed(2)}</td>
          <td>
            <div class="crt-qty-controls">
              <button type="button" class="crt-qty-btn btn-p-dec">[-]</button>
              <span class="crt-qty-val" style="min-width:44px;">$${price.toFixed(2)}</span>
              <button type="button" class="crt-qty-btn btn-p-inc">[+]</button>
            </div>
          </td>
          <td>
            <strong style="color: ${margin >= 40 ? '#2ED573' : (margin >= 15 ? '#FFAA00' : '#FF5252')};">
              %${margin.toFixed(1)}
            </strong>
          </td>
          <td>${badgeHtml}</td>
        `;

        row.querySelector('.btn-p-dec').addEventListener('click', () => {
          if (price > 0.50) {
            price = Math.max(0.50, Math.round((price - 0.50) * 100) / 100);
            this.retailPrices[itemKey] = price;
            updatePricingRow();
            window.Sound?.playPop?.();
            this.saveState();
          }
        });

        row.querySelector('.btn-p-inc').addEventListener('click', () => {
          if (price < 500) {
            price = Math.round((price + 0.50) * 100) / 100;
            this.retailPrices[itemKey] = price;
            updatePricingRow();
            window.Sound?.playPop?.();
            this.saveState();
          }
        });
      };

      updatePricingRow();
      tbody.appendChild(row);
    });

    this.procurementContent.appendChild(table);
  }

  renderProcurementTrendsTab() {
    this.procurementContent.replaceChildren();

    const currentDay = this.dayState ? this.dayState.day : 1;
    const trend = window.GameMechanics.getDailyMarketTrend(currentDay);
    const nextTrend = window.GameMechanics.getDailyMarketTrend(currentDay + 1);

    const trendBox = document.createElement('div');
    trendBox.className = 'crt-trend-box';
    trendBox.innerHTML = `
      <div class="crt-trend-title">
        <span>&gt;&gt;&gt;</span>
        <span>GÜNLÜK PİYASA BÜLTENİ: ${trend.title}</span>
      </div>
      <div class="crt-trend-desc">
        ${trend.description}
      </div>
    `;
    this.procurementContent.appendChild(trendBox);

    const forecastBox = document.createElement('div');
    forecastBox.style.cssText = 'border: 2px dashed #2ED573; background: #08170c; padding: 12px; margin-bottom: 12px; color: #FFFDF5; font-size: 13px;';
    forecastBox.innerHTML = `
      <strong style="color: #2ED573;">[YARINKİ PİYASA TAHMİNİ &amp; ERKEN İSTİHBARAT]</strong>
      <div style="margin-top: 6px; color: #FFAA00;">${nextTrend.title}</div>
      <div style="margin-top: 4px; font-size: 12px; color: #DFE6E9;">${nextTrend.description}</div>
    `;
    this.procurementContent.appendChild(forecastBox);

    const tipsBox = document.createElement('div');
    tipsBox.style.cssText = 'border: 1px solid rgba(46, 213, 115, 0.4); padding: 10px; font-size: 12px; color: #2ED573; line-height: 1.6;';
    tipsBox.innerHTML = `
      <strong>[STRATEJİK TOPTANCI TAVSİYELERİ]</strong><br>
      - Sıcak hava dalgasında soğutucu dolaptaki meşrubat ve sular iki kat hızlı tükenir. Reyon boş kalmasın!<br>
      - Kimya grevinde deterjan toptan alış fiyatı %30 yükselir; önceden stok yaparak kâr marjınızı koruyun.<br>
      - Hafta başı kampanyasında kişisel bakım toptan alımı %15 daha ucuzdur.
    `;
    this.procurementContent.appendChild(tipsBox);
  }

  renderProcurementInventoryTab() {
    this.procurementContent.replaceChildren();

    const catalog = window.GameMechanics.WHOLESALE_CATALOG || {};

    const summaryBox = document.createElement('div');
    summaryBox.style.cssText = 'background: #08170c; border: 1px solid #2ED573; padding: 10px; margin-bottom: 12px; font-size: 12px; color: #FFFDF5;';
    summaryBox.innerHTML = `
      <strong style="color: #2ED573;">[YÜKSEK PALET RAFLARI &amp; DEPO ENVANTERİ (HIGH-BAY STORAGE)]</strong><br>
      Kamyonla indirilen toptan koliler burada depolanır. Reyon görevlisi personelleriniz (STOCKER) veya siz depodan doğrudan reyonlara aktarım yapabilirsiniz.
    `;
    this.procurementContent.appendChild(summaryBox);

    const table = document.createElement('table');
    table.className = 'crt-table';
    table.innerHTML = `
      <thead>
        <tr>
          <th>ÜRÜN</th>
          <th>DEPO STOKU (KOLİ)</th>
          <th>KOLİ BAŞINA ADET</th>
          <th>HEDEF REYON</th>
          <th>REYON DOLULUĞU</th>
          <th>İŞLEM</th>
        </tr>
      </thead>
      <tbody></tbody>
    `;

    const tbody = table.querySelector('tbody');

    Object.entries(catalog).forEach(([itemKey, item]) => {
      const cartons = this.warehouseInventory[itemKey] || 0;
      const targetShelf = this.shelves.find(s => s && s.itemType === itemKey);
      const shelfStock = targetShelf ? `${targetShelf.currentStock}/${targetShelf.maxStock}` : 'Reyon Yok';
      const canRestock = cartons > 0 && targetShelf && targetShelf.currentStock < targetShelf.maxStock;

      const row = document.createElement('tr');
      row.innerHTML = `
        <td><strong>${item.name}</strong></td>
        <td><strong style="color: ${cartons > 0 ? '#2ED573' : '#FFAA00'};">${cartons} Koli</strong></td>
        <td>${item.count} Adet</td>
        <td>${targetShelf ? getItemDisplayName(targetShelf.itemType) : 'Genel Raf'}</td>
        <td>${shelfStock}</td>
        <td>
          <button type="button" class="crt-btn crt-btn-amber btn-transfer" ${!canRestock ? 'disabled' : ''}>
            ${cartons === 0 ? '[STOK YOK]' : (!targetShelf ? '[REYON YOK]' : (targetShelf.currentStock >= targetShelf.maxStock ? '[REYON DOLU]' : '[REYONA AKTAR]'))}
          </button>
        </td>
      `;

      if (canRestock) {
        row.querySelector('.btn-transfer').addEventListener('click', () => {
          if (!canRestock) return;
          const transferUnits = Math.min(item.count, targetShelf.maxStock - targetShelf.currentStock);
          targetShelf.addStock(transferUnits);
          this.warehouseInventory[itemKey] = Math.max(0, cartons - 1);
          window.Sound?.playStock?.();
          this.showFloatingText(`[DEPODAN REYONA AKTARILDI: +${transferUnits} ADET]`, targetShelf.group.position, '#2ECC71');
          this.renderProcurementInventoryTab();
          this.saveState();
        });
      }

      tbody.appendChild(row);
    });

    this.procurementContent.appendChild(table);
  }

  showVeresiyePrompt(customer, resident) {
    this.pendingVeresiyeCheckout = { customer, resident };
    if (this.veresiyePrompt) {
      this.veresiyePrompt.classList.remove('hidden');
    }
    if (this.veresiyeResidentName) {
      this.veresiyeResidentName.textContent = resident.name;
    }
  }

  confirmVeresiyeCheckout() {
    if (!this.pendingVeresiyeCheckout) return;
    const { customer, resident } = this.pendingVeresiyeCheckout;
    const amount = 35;
    this.veresiyeState = window.GameMechanics.issueVeresiye(this.veresiyeState, resident.id, amount);
    this.neighborhoodState = window.GameMechanics.recordResidentVisit(this.neighborhoodState, resident.id);
    customer.processPayment();
    window.Sound.playCashRegister();
    this.showFloatingText(`[VERESİYE YAZILDI] ${resident.name}: $${amount} (+1 SADAKAT)`, this.checkout.group.position, '#FFE600');
    if (this.veresiyePrompt) this.veresiyePrompt.classList.add('hidden');
    this.pendingVeresiyeCheckout = null;
    this.saveState();
  }

  declineVeresiyeCheckout() {
    if (this.veresiyePrompt) this.veresiyePrompt.classList.add('hidden');
    this.pendingVeresiyeCheckout = null;
  }

  processVeresiyeMorningCollection() {
    if (!this.veresiyeState || !this.veresiyeState.ledger) return;
    const residentIds = Object.keys(this.veresiyeState.ledger);
    let totalCollected = 0;
    residentIds.forEach(id => {
      const debt = this.veresiyeState.ledger[id];
      if (debt > 0) {
        const res = window.GameMechanics.collectVeresiye(this.veresiyeState, id);
        if (res && res.paid > 0) {
          totalCollected += res.paid;
          this.money += res.paid;
          const residentObj = (window.GameMechanics.NEIGHBORHOOD_RESIDENTS || []).find(r => r.id === id);
          const rName = residentObj ? residentObj.name : id;
          this.showFloatingText(`[BORÇ ÖDENDİ] ${rName}: +$${res.paid} ve ${res.giftName}!`, this.checkout.group.position, '#2ECC71');
        }
      }
    });
    if (totalCollected > 0) {
      this.updateMoneyUI();
      window.Sound.playCoin();
      this.saveState();
    }
  }

  renderVeresiyeTab(container) {
    const totalDebt = window.GameMechanics.getVeresiyeTotal(this.veresiyeState);
    const totalColl = (this.veresiyeState && this.veresiyeState.totalCollected) || 0;

    const summaryBox = document.createElement('div');
    summaryBox.className = 'veresiye-card';
    summaryBox.style.background = '#FFE600';
    summaryBox.innerHTML = `
      <div style="font-size: 16px; font-weight: 900;">MAHALLE VERESİYE DEFTERİ</div>
      <div style="display: flex; gap: 20px; font-weight: 800; font-size: 14px;">
        <div>AÇIK BORÇ: <span style="color: #e74c3c; font-weight: 900;">$${totalDebt}</span></div>
        <div>TOPLAM TAHSİLAT: <span style="color: #27ae60; font-weight: 900;">$${totalColl}</span></div>
      </div>
      <div style="font-size: 12px; color: #333;">Fidye/veresiye yazılan mahalle sakinleri ertesi sabah markete gelip borçlarını öder ve sadakat hediyesi (satış bonusu / tohum) getirir.</div>
    `;
    container.appendChild(summaryBox);

    const grid = document.createElement('div');
    grid.className = 'resident-grid';
    grid.style.marginTop = '12px';

    const residents = window.GameMechanics.NEIGHBORHOOD_RESIDENTS || [];
    residents.forEach(res => {
      const debt = (this.veresiyeState && this.veresiyeState.ledger && this.veresiyeState.ledger[res.id]) || 0;
      const aff = window.GameMechanics.getResidentAffinity(this.neighborhoodState, res.id);
      const card = document.createElement('div');
      card.className = 'veresiye-card';
      card.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <strong style="font-size: 15px;">${res.name}</strong>
          <span style="font-size: 11px; background: #000; color: #ffe600; padding: 2px 5px;">[LV${aff}]</span>
        </div>
        <div>${debt > 0 ? `<span class="veresiye-debt-badge">BORÇ: $${debt}</span>` : '<span class="veresiye-clear-badge">BORCU YOK</span>'}</div>
        <div style="font-size: 12px; color: #555;">Sadakat Ödülü: <strong>${aff >= 3 ? 'Nadir Tohum + İkram' : 'Ev Yapımı İkram'}</strong></div>
      `;
      grid.appendChild(card);
    });

    container.appendChild(grid);
  }

  renderDecorationStudio() {
    if (!this.upgradeContent) return;
    this.upgradeContent.replaceChildren();

    const decBox = document.createElement('div');
    decBox.style.display = 'flex';
    decBox.style.flexDirection = 'column';
    decBox.style.gap = '14px';

    const prestige = window.GameMechanics.calculateStorePrestige(this.decorationState, this.hygieneScore, this.brandState);
    const prestigeCard = document.createElement('div');
    prestigeCard.className = 'decoration-card';
    prestigeCard.style.background = '#FFE600';
    prestigeCard.innerHTML = `
      <div style="font-size: 16px; font-weight: 900;">ESNAF PRESTİJİ: [P${prestige.stars}] (${prestige.stars}/5 YILDIZ)</div>
      <div style="font-size: 13px; font-weight: 800;">Zemin: ${prestige.floorName} · Hijyen Skoru: %${prestige.hygieneScore}</div>
      <div style="font-size: 12px; color: #333;">Yüksek prestij VIP zengin müşterilerin gelmesini ve sepetlerini 3 katı fiyata doldurmasını sağlar.</div>
    `;
    decBox.appendChild(prestigeCard);

    const floorTitle = document.createElement('div');
    floorTitle.style.fontWeight = '900';
    floorTitle.style.fontSize = '14px';
    floorTitle.textContent = 'ZEMİN KAPLAMASI';
    decBox.appendChild(floorTitle);

    const floorGrid = document.createElement('div');
    floorGrid.className = 'decoration-grid';

    Object.entries(window.GameMechanics.DECORATION_TIERS).forEach(([fKey, fData]) => {
      const isSelected = this.decorationState.activeFloor === fKey;
      const isOwned = this.decorationState.unlockedFloors && this.decorationState.unlockedFloors.includes(fKey);
      const canAfford = this.money >= fData.cost;

      const fCard = document.createElement('div');
      fCard.className = 'decoration-card';
      fCard.innerHTML = `
        <div class="decoration-preview" style="background: ${fData.colorHex}; color: #000;">
          ${fData.name}
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <strong style="font-size: 13px;">${fData.name}</strong>
          <span style="font-size: 11px; font-weight: 900; color: #27ae60;">${isOwned ? 'SAHİP' : `$${fData.cost}`}</span>
        </div>
        <button class="upgrade-buy-btn ${isSelected ? 'maxed' : ''}" type="button">
          ${isSelected ? 'SEÇİLİ' : (isOwned ? 'KULLAN' : (canAfford ? `$${fData.cost} SATIN AL` : 'YETERSİZ BAKİYE'))}
        </button>
      `;
      const btn = fCard.querySelector('button');
      btn.addEventListener('click', () => {
        if (isSelected) return;
        if (isOwned) {
          this.decorationState.activeFloor = fKey;
          this.applyDecorationEffects();
          this.renderDecorationStudio();
          this.saveState();
        } else if (canAfford) {
          this.money -= fData.cost;
          this.updateMoneyUI();
          this.decorationState.unlockedFloors.push(fKey);
          this.decorationState.activeFloor = fKey;
          this.applyDecorationEffects();
          this.renderDecorationStudio();
          this.saveState();
          window.Sound.playUnlock();
        }
      });
      floorGrid.appendChild(fCard);
    });
    decBox.appendChild(floorGrid);

    const radioTitle = document.createElement('div');
    radioTitle.style.fontWeight = '900';
    radioTitle.style.fontSize = '14px';
    radioTitle.style.marginTop = '10px';
    radioTitle.textContent = 'ESNAF RADYOSU KANALLARI';
    decBox.appendChild(radioTitle);

    const radioChannels = [
      { id: 0, name: 'KAPALI' },
      { id: 1, name: 'RETRO CHIPTUNE 8-BIT' },
      { id: 2, name: 'LO-FI ESNAF' },
      { id: 3, name: 'ANADOLU SYNTH' }
    ];
    const radioRow = document.createElement('div');
    radioRow.style.display = 'flex';
    radioRow.style.gap = '8px';
    radioRow.style.flexWrap = 'wrap';

    radioChannels.forEach(ch => {
      const active = this.activeRadioChannel === ch.id;
      const rBtn = document.createElement('button');
      rBtn.className = `upgrade-buy-btn ${active ? 'maxed' : ''}`;
      rBtn.style.padding = '8px 12px';
      rBtn.textContent = ch.name;
      rBtn.addEventListener('click', () => {
        this.activeRadioChannel = ch.id;
        this.decorationState.radioChannel = ch.id;
        if (window.Sound && window.Sound.setRadioChannel) {
          window.Sound.setRadioChannel(ch.id);
        }
        this.renderDecorationStudio();
        this.saveState();
      });
      radioRow.appendChild(rBtn);
    });
    decBox.appendChild(radioRow);

    this.upgradeContent.appendChild(decBox);
  }

  applyDecorationEffects() {
    if (!this.decorationState) return;
    const tier = window.GameMechanics.DECORATION_TIERS[this.decorationState.activeFloor] || window.GameMechanics.DECORATION_TIERS.classic;
    if (this.storeFloorMat && tier) {
      this.storeFloorMat.color.setHex(parseInt(tier.colorHex.replace('#', '0x')));
    }
    if (this.neonSign && this.decorationState.neonColor) {
      const colorMap = {
        yellow: 0xffe600,
        mint: 0x25d366,
        coral: 0xff5252,
        violet: 0x9b59b6
      };
      this.neonSign.setColor(colorMap[this.decorationState.neonColor] || 0xffe600);
    }
    if (this.decorationState.radioChannel !== undefined) {
      this.activeRadioChannel = this.decorationState.radioChannel;
      if (window.Sound && window.Sound.setRadioChannel) {
        window.Sound.setRadioChannel(this.activeRadioChannel);
      }
    }
  }

  updateHygieneAndMop(delta) {
    this.trashSpawnTimer -= delta;
    if (this.trashSpawnTimer <= 0) {
      this.trashSpawnTimer = 20.0 + Math.random() * 15.0;
      if (this.trashPool.length < 6) {
        const tx = (Math.random() - 0.5) * 22.0;
        const tz = -6.0 - Math.random() * 14.0;
        const type = Math.random() > 0.4 ? 'trash' : 'puddle';
        const trash = new TrashItem(this.scene, tx, tz, type);
        this.trashPool.push(trash);
      }
    }

    this.hygieneScore = window.GameMechanics.calculateHygieneScore(this.trashPool.length);
    if (this.hygieneDisplay) {
      this.hygieneDisplay.textContent = `${this.hygieneScore}%`;
    }

    const pPos = this.player.group.position;
    const mopDist = pPos.distanceTo(new THREE.Vector3(-2.0, 0, -22.5));
    if (mopDist < 1.4) {
      if (!this.mopCooldown || this.mopCooldown <= 0) {
        this.hasMopEquipped = !this.hasMopEquipped;
        this.mopCooldown = 1.5;
        window.Sound.playPop();
        this.showFloatingText(this.hasMopEquipped ? 'PASPAS ALINDI (TEMİZLİK ZAMANI)' : 'PASPAS BIRAKILDI', pPos, '#00D2D3');
      }
    }
    if (this.mopCooldown > 0) this.mopCooldown -= delta;

    if (this.hasMopEquipped) {
      for (let i = this.trashPool.length - 1; i >= 0; i--) {
        const item = this.trashPool[i];
        if (pPos.distanceTo(new THREE.Vector3(item.x, 0, item.z)) < 1.4) {
          item.destroy();
          this.trashPool.splice(i, 1);
          window.Sound.playPop();
          this.showFloatingText('TEMİZLENDİ!', pPos, '#2ECC71');
          this.hygieneScore = window.GameMechanics.calculateHygieneScore(this.trashPool.length);
          if (this.hygieneDisplay) this.hygieneDisplay.textContent = `${this.hygieneScore}%`;
        }
      }
    }
  }

  updateSecurityAndDog(delta) {
    if (this.securityGate) this.securityGate.update(delta);
    if (this.karabashDog) this.karabashDog.update(delta);

    const thief = this.customers.find(c => c instanceof ShoplifterAI && !c.isCaught && !c.isFinished);
    if (thief && this.securityGate && this.karabashDog) {
      const thiefZ = thief.char.group.position.z;
      if ((thief.state === 'FLEEING_PANIC' || thiefZ <= -20.0) && !this.securityGate.isAlarming && this.karabashDog.state === 'GUARDING') {
        this.securityGate.triggerAlarm();
        window.Sound.playAlarmSiren();
        this.showFloatingText('GÜVENLİK ALARMI! KARABAŞ HAREKETE GEÇTİ!', thief.char.group.position, '#FF5252');
        this.karabashDog.chaseThief(thief, (caughtThief) => {
          const bounty = caughtThief.onHitByPlayer ? caughtThief.onHitByPlayer(this.karabashDog) : caughtThief.catchThief();
          if (bounty > 0) {
            this.money += bounty;
            this.updateMoneyUI();
            window.Sound.playCoin();
            this.showFloatingText(`KARABAŞ HIRSIZI ETKİSİZ HALE GETİRDİ! +$${bounty}`, caughtThief.char.group.position, '#2ECC71');
          }
        });
      }
    }
  }

  updateWholesaleAndTruck(delta) {
    if (this.wholesaleBay && this.wholesaleBay.activeTruck) {
      this.wholesaleBay.activeTruck.update(delta);
    }
    if (!this.wholesaleBay || !this.wholesaleBay.crates || this.wholesaleBay.crates.length === 0) return;

    const pPos = this.player.group.position;
    for (let i = this.wholesaleBay.crates.length - 1; i >= 0; i--) {
      const crate = this.wholesaleBay.crates[i];
      if (pPos.distanceTo(new THREE.Vector3(crate.x, 0, crate.z)) < 1.4) {
        const shelf = this.shelves.find(s => s && s.itemType === crate.itemType);
        if (shelf) {
          if (shelf.currentStock < shelf.maxStock) {
            shelf.addStock(crate.count);
            this.wholesaleBay.removeCrate(crate);
            window.Sound.playStock();
            this.showFloatingText(`KOLİ RAFA DİZİLDİ! (+${crate.count} ${getItemDisplayName(crate.itemType)})`, shelf.group.position, '#2ECC71');
            this.saveState();
            break;
          }
        } else {
          let added = 0;
          for (let k = 0; k < crate.count; k++) {
            if (this.player.stack.length < this.player.maxStack) {
              this.player.addItem(crate.itemType);
              added++;
            }
          }
          if (added > 0) {
            this.wholesaleBay.removeCrate(crate);
            window.Sound.playPop();
            this.showFloatingText(`KOLİDEN +${added} ${getItemDisplayName(crate.itemType)} ALINDI`, pPos, '#FFE600');
            this.saveState();
            break;
          }
        }
      }
    }
  }

  updateStaffFatigue(delta) {
    if (!this.helpers || this.helpers.length === 0) return;
    this.helpers.forEach(helper => {
      const hId = helper.id;
      const isResting = helper.currentTask === 'TEA_REST';
      if (isResting) {
        this.staffFatigue = window.GameMechanics.refillStaffStamina(this.staffFatigue, hId, delta * 3.0);
        const fatigue = (this.staffFatigue && this.staffFatigue[hId]) || { stamina: 100 };
        if (fatigue.stamina >= 100) {
          helper.currentTask = 'IDLE';
          helper.currentTaskLabel = 'HAZIRDA';
          helper.speedMultiplier = 1.0;
          this.showFloatingText('PERSONEL ÇAY MOLASINDAN DÖNDÜ!', helper.char.group.position, '#2ECC71');
        }
      } else {
        const isWorking = helper.currentTask !== 'IDLE';
        if (isWorking) {
          this.staffFatigue = window.GameMechanics.drainStaffStamina(this.staffFatigue, hId, delta);
        }
        const fatigue = (this.staffFatigue && this.staffFatigue[hId]) || { stamina: 100 };
        if (fatigue.isExhausted) {
          helper.currentTask = 'TEA_REST';
          helper.currentTaskLabel = 'ÇAY MOLASI';
          helper.speedMultiplier = 0.5;
          if (this.teaStation) {
            helper.moveTo(this.teaStation.restSpot, 3.0, delta);
          }
        } else if (fatigue.isTired) {
          helper.speedMultiplier = 0.7;
        } else {
          helper.speedMultiplier = 1.0;
        }
      }
    });
  }

  updatePrestigeAndVIP(delta) {
    const prestige = window.GameMechanics.calculateStorePrestige(this.decorationState, this.hygieneScore, this.brandState);
    if (this.prestigeDisplay) {
      this.prestigeDisplay.textContent = `[P${prestige.stars}]`;
    }
    if (prestige.isVIPEligible && this.vipSpawnTimer > 15.0) {
      this.vipSpawnTimer -= delta * 0.5;
    }
  }

  // --- Store Layout & Builder Mode Implementation ---
  initLayoutEditorUI() {
    const editBtn = document.getElementById('layout-edit-btn');
    if (editBtn) {
      editBtn.addEventListener('click', () => {
        this.toggleLayoutEditMode();
      });
    }

    const rotateBtn = document.getElementById('layout-rotate-btn');
    if (rotateBtn) {
      rotateBtn.addEventListener('click', () => {
        this.rotateSelectedFixture();
      });
    }

    const cancelBtn = document.getElementById('layout-cancel-btn');
    if (cancelBtn) {
      cancelBtn.addEventListener('click', () => {
        this.cancelSelectedDrag();
      });
    }

    const saveBtn = document.getElementById('layout-save-btn');
    if (saveBtn) {
      saveBtn.addEventListener('click', () => {
        this.exitLayoutEditMode(true);
      });
    }
  }

  getEditableFixtures() {
    const list = [];

    // 1. Shelves
    if (this.shelves && Array.isArray(this.shelves)) {
      this.shelves.forEach(shelf => {
        if (!shelf || !shelf.group) return;
        let id = 'shelf_' + (shelf.itemType ? String(shelf.itemType).toLowerCase() : 'generic');
        let tag = id;
        if (shelf === this.tomatoShelf) { id = 'shelf_tomato'; tag = 'shelf_tomato'; }
        else if (shelf === this.eggShelf) { id = 'shelf_egg'; tag = 'shelf_egg'; }
        else if (shelf === this.beverageChiller) { id = 'shelf_beverage_chiller'; tag = 'shelf_beverage_chiller'; }
        else if (shelf === this.cleaningShelf) { id = 'shelf_cleaning'; tag = 'shelf_cleaning'; }
        else if (shelf === this.shelf2) { id = 'shelf2'; tag = 'shelf2'; }
        else if (shelf === this.breadShelf) { id = 'shelf_bread'; tag = 'shelf_bread'; }
        else if (shelf === this.cheeseShelf) { id = 'shelf_cheese'; tag = 'shelf_cheese'; }
        else if (shelf === this.cornShelf) { id = 'shelf_corn'; tag = 'shelf_corn'; }
        else if (shelf === this.popcornShelf) { id = 'shelf_popcorn'; tag = 'shelf_popcorn'; }
        else if (shelf === this.juiceShelf) { id = 'shelf_juice'; tag = 'shelf_juice'; }
        else if (shelf === this.pieShelf) { id = 'shelf_pie'; tag = 'shelf_pie'; }
        else if (shelf === this.strawberryShelf) { id = 'shelf_strawberry'; tag = 'shelf_strawberry'; }
        else if (shelf === this.carrotShelf) { id = 'shelf_carrot'; tag = 'shelf_carrot'; }
        else if (shelf === this.iceCreamShelf) { id = 'shelf_icecream'; tag = 'shelf_icecream'; }
        else if (shelf === this.saladShelf) { id = 'shelf_salad'; tag = 'shelf_salad'; }
        else if (shelf === this.pizzaShelf) { id = 'shelf_pizza'; tag = 'shelf_pizza'; }

        const w = (shelf === this.beverageChiller) ? 1.6 : 2.6;
        const d = (shelf === this.beverageChiller) ? 2.6 : 1.6;
        list.push({
          id,
          collisionTag: tag,
          category: 'SHELF',
          size: { w, d, h: 1.8 },
          group: shelf.group,
          entity: shelf
        });
      });
    }

    // 2. Checkout Counters & Cashiers
    if (this.checkouts && Array.isArray(this.checkouts)) {
      this.checkouts.forEach((co, idx) => {
        if (!co || !co.group) return;
        const num = idx + 1;
        const cashierBot = this.cashierBots ? this.cashierBots[idx] : null;
        list.push({
          id: `checkout_${num}`,
          collisionTag: `checkout_${num}`,
          category: 'CHECKOUT',
          size: { w: 2.6, d: 0.88, h: 0.94 },
          group: co.group,
          entity: co,
          cashierBot
        });
      });
    }

    // 3. Machines & Farm Plots
    const machines = [
      { entity: this.flourMill, id: 'flour_mill', tag: 'flour_mill', category: 'MACHINE', size: { w: 3.4, d: 3.0, h: 2.5 } },
      { entity: this.bakeryOven, id: 'bakery_oven', tag: 'bakery_oven', category: 'MACHINE', size: { w: 3.4, d: 3.0, h: 2.5 } },
      { entity: this.chickenCoop, id: 'chicken_coop', tag: 'chicken_coop', category: 'MACHINE', size: { w: 3.4, d: 3.0, h: 2.0 } },
      { entity: this.cowPen, id: 'cow_pen', tag: 'cow_pen', category: 'MACHINE', size: { w: 4.0, d: 3.4, h: 2.0 } },
      { entity: this.cheeseProcessor, id: 'cheese_processor', tag: 'cheese_processor', category: 'MACHINE', size: { w: 3.4, d: 3.0, h: 2.5 } },
      { entity: this.popcornMaker, id: 'popcorn_maker', tag: 'popcorn_maker', category: 'MACHINE', size: { w: 2.8, d: 2.6, h: 2.2 } },
      { entity: this.juicer, id: 'juicer', tag: 'juicer', category: 'MACHINE', size: { w: 3.0, d: 3.0, h: 2.4 } },
      { entity: this.iceCreamMachine, id: 'ice_cream_machine', tag: 'ice_cream_machine', category: 'MACHINE', size: { w: 3.0, d: 3.0, h: 2.4 } },
      { entity: this.saladPrepBar, id: 'salad_prep_bar', tag: 'salad_prep_bar', category: 'MACHINE', size: { w: 2.8, d: 3.0, h: 2.2 } },
      { entity: this.toastMachine, id: 'toast_machine', tag: 'toast_machine', category: 'MACHINE', size: { w: 2.6, d: 1.6, h: 1.8 } },
      { entity: this.jamCauldron, id: 'jam_cauldron', tag: 'jam_cauldron', category: 'MACHINE', size: { w: 2.6, d: 1.6, h: 1.8 } },
      { entity: this.deliveryDesk, id: 'delivery_desk', tag: 'delivery_desk', category: 'MACHINE', size: { w: 2.8, d: 1.8, h: 1.6 } },
      { entity: this.tomatoPlot, id: 'tomato_plot', tag: 'tomato_plot', category: 'FARM_PLOT', size: { w: 3.4, d: 3.0, h: 0.4 } },
      { entity: this.wheatPlot, id: 'wheat_plot', tag: 'wheat_plot', category: 'FARM_PLOT', size: { w: 3.4, d: 3.0, h: 0.4 } },
      { entity: this.cornPlot, id: 'corn_plot', tag: 'corn_plot', category: 'FARM_PLOT', size: { w: 3.4, d: 3.0, h: 0.4 } },
      { entity: this.appleTree, id: 'apple_tree', tag: 'apple_tree', category: 'FARM_PLOT', size: { w: 3.4, d: 3.4, h: 3.0 } },
      { entity: this.strawberryPlot, id: 'strawberry_plot', tag: 'strawberry_plot', category: 'FARM_PLOT', size: { w: 3.4, d: 3.0, h: 0.4 } },
      { entity: this.carrotPlot, id: 'carrot_plot', tag: 'carrot_plot', category: 'FARM_PLOT', size: { w: 3.4, d: 3.0, h: 0.4 } },
      { entity: this.mopStation, id: 'mop_station', tag: 'mop_station', category: 'DECOR', size: { w: 1.6, d: 2.0, h: 1.8 } },
      { entity: this.teaStation, id: 'tea_station', tag: 'tea_station', category: 'DECOR', size: { w: 2.0, d: 1.2, h: 1.6 } }
    ];

    machines.forEach(m => {
      if (m.entity && m.entity.group) {
        list.push({
          id: m.id,
          collisionTag: m.tag,
          category: m.category,
          size: m.size,
          group: m.entity.group,
          entity: m.entity
        });
      }
    });

    // 4. Purchased Store Decorations
    if (this.purchasedDecorations && Array.isArray(this.purchasedDecorations)) {
      this.purchasedDecorations.forEach(dec => {
        if (!dec || !dec.group) return;
        list.push({
          id: dec.id,
          collisionTag: dec.collisionTag || dec.id,
          category: 'DECOR',
          size: dec.size || { w: 1.0, d: 1.0, h: 1.0 },
          group: dec.group,
          entity: dec
        });
      });
    }

    return list;
  }

  enterLayoutEditMode() {
    if (this.isLayoutEditMode) return;
    this.isLayoutEditMode = true;

    if (this.player && this.player.velocity) {
      this.player.velocity.set(0, 0, 0);
    }

    if (!this.layoutGrid) {
      this.layoutGrid = new THREE.GridHelper(50, 100, 0x444444, 0xaaaaaa);
      this.layoutGrid.position.set(0, 0.02, 0);
    }
    this.scene.add(this.layoutGrid);

    if (!this.ghostMesh) {
      const geo = new THREE.BoxGeometry(1, 0.12, 1);
      this.ghostMaterial = new THREE.MeshBasicMaterial({
        color: 0x2ecc71,
        transparent: true,
        opacity: 0.45,
        depthWrite: false
      });
      this.ghostMesh = new THREE.Mesh(geo, this.ghostMaterial);
      this.ghostMesh.visible = false;
      this.scene.add(this.ghostMesh);
    }

    const hud = document.getElementById('layout-edit-hud');
    if (hud) hud.classList.remove('hidden');

    const btn = document.getElementById('layout-edit-btn');
    if (btn) btn.classList.add('active');

    this.showFloatingText('DUZENLEME MODU ACILDI', this.player.group.position, '#00E5FF');
    window.Sound?.playPop?.(220);
  }

  exitLayoutEditMode(shouldSave = true) {
    if (!this.isLayoutEditMode) return;

    if (this.selectedFixture) {
      if (this.isPlacementValid && shouldSave) {
        this.confirmSelectedPlacement();
      } else {
        this.cancelSelectedDrag();
      }
    }

    this.isLayoutEditMode = false;

    if (this.layoutGrid) {
      this.scene.remove(this.layoutGrid);
    }
    if (this.ghostMesh) {
      this.ghostMesh.visible = false;
    }

    const hud = document.getElementById('layout-edit-hud');
    if (hud) hud.classList.add('hidden');

    const btn = document.getElementById('layout-edit-btn');
    if (btn) btn.classList.remove('active');

    if (shouldSave) {
      this.saveState();
      this.showFloatingText('DUZEN KAYDEDILDI', this.player.group.position, '#2ECC71');
    }

    window.Sound?.playPop?.(160);
  }

  toggleLayoutEditMode() {
    if (this.isLayoutEditMode) {
      this.exitLayoutEditMode(true);
    } else {
      this.enterLayoutEditMode();
    }
  }

  selectFixtureForDrag(fixture) {
    this.selectedFixture = fixture;
    this.originalFixturePos = {
      x: fixture.group.position.x,
      z: fixture.group.position.z,
      rotY: fixture.group.rotation.y
    };

    fixture.group.position.y = 0.15;
    if (this.ghostMesh) this.ghostMesh.visible = true;
    this.updateGhostVisual(fixture.group.position.x, fixture.group.position.z, fixture);
    window.Sound?.playPop?.(240);
  }

  onLayoutPointerDown(e) {
    const rect = this.canvas.getBoundingClientRect();
    const mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const mouseY = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    this.editRaycaster.setFromCamera(new THREE.Vector2(mouseX, mouseY), this.camera);
    this.layoutPointerDownPos.set(e.clientX, e.clientY);
    this.layoutPointerMoved = false;

    if (this.selectedFixture) {
      if (this.isPlacementValid) {
        this.confirmSelectedPlacement();
      } else {
        window.Sound?.playPop?.(80);
      }
      return;
    }

    const fixtures = this.getEditableFixtures();
    let clickedFixture = null;
    let closestDist = Infinity;

    for (let i = 0; i < fixtures.length; i++) {
      const f = fixtures[i];
      if (!f.group) continue;
      const intersects = this.editRaycaster.intersectObject(f.group, true);
      if (intersects.length > 0 && intersects[0].distance < closestDist) {
        closestDist = intersects[0].distance;
        clickedFixture = f;
      }
    }

    if (clickedFixture) {
      this.selectFixtureForDrag(clickedFixture);
    }
  }

  onLayoutPointerMove(e) {
    const dx = e.clientX - this.layoutPointerDownPos.x;
    const dy = e.clientY - this.layoutPointerDownPos.y;
    if (dx * dx + dy * dy > 16) {
      this.layoutPointerMoved = true;
    }

    if (!this.selectedFixture) return;

    const rect = this.canvas.getBoundingClientRect();
    const mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const mouseY = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    this.editRaycaster.setFromCamera(new THREE.Vector2(mouseX, mouseY), this.camera);

    const hitPoint = new THREE.Vector3();
    if (this.editRaycaster.ray.intersectPlane(this.floorPlane, hitPoint)) {
      const snappedX = Math.round(hitPoint.x / 0.5) * 0.5;
      const snappedZ = Math.round(hitPoint.z / 0.5) * 0.5;

      this.selectedFixture.group.position.x = snappedX;
      this.selectedFixture.group.position.z = snappedZ;

      if (this.selectedFixture.cashierBot && this.selectedFixture.cashierBot.group) {
        this.selectedFixture.cashierBot.group.position.x = snappedX;
        this.selectedFixture.cashierBot.group.position.z = snappedZ - 0.65;
      }

      this.updateGhostVisual(snappedX, snappedZ, this.selectedFixture);
    }
  }

  onLayoutPointerUp(e) {
    // Keep selected with active live footprint so the player can rotate with R or confirm placement
  }

  updateGhostVisual(x, z, fixture) {
    if (!this.ghostMesh) return;
    const isRot = Math.round(Math.abs(fixture.group.rotation.y) / (Math.PI / 2)) % 2 === 1;
    const w = isRot ? fixture.size.d : fixture.size.w;
    const d = isRot ? fixture.size.w : fixture.size.d;
    const halfW = w / 2;
    const halfD = d / 2;

    const minX = x - halfW;
    const maxX = x + halfW;
    const minZ = z - halfD;
    const maxZ = z + halfD;

    const inBounds = (
      minX >= MARKET_LAYOUT.minX + 0.8 &&
      maxX <= MARKET_LAYOUT.maxX - 0.8 &&
      minZ >= MARKET_LAYOUT.minZ + 0.8 &&
      maxZ <= MARKET_LAYOUT.maxZ - 0.8
    );

    let allowed = inBounds;
    if (allowed && this.spatial) {
      const testResult = this.spatial.testAABB(minX, maxX, minZ, maxZ, fixture.category, fixture.id);
      allowed = testResult.allowed;
    }

    this.isPlacementValid = allowed;

    this.ghostMesh.scale.set(w, 1, d);
    this.ghostMesh.position.set(x, 0.06, z);
    this.ghostMaterial.color.setHex(allowed ? 0x2ecc71 : 0xff0033);
  }

  rotateSelectedFixture() {
    if (!this.selectedFixture) return;
    this.selectedFixture.group.rotation.y += Math.PI / 2;
    if (this.selectedFixture.group.rotation.y >= Math.PI * 2) {
      this.selectedFixture.group.rotation.y -= Math.PI * 2;
    }
    if (this.selectedFixture.entity && this.selectedFixture.entity.group) {
      this.selectedFixture.entity.group.rotation.y = this.selectedFixture.group.rotation.y;
    }
    this.updateGhostVisual(
      this.selectedFixture.group.position.x,
      this.selectedFixture.group.position.z,
      this.selectedFixture
    );
    window.Sound?.playPop?.(260);
  }

  cancelSelectedDrag() {
    if (!this.selectedFixture) return;
    this.selectedFixture.group.position.set(
      this.originalFixturePos.x,
      0,
      this.originalFixturePos.z
    );
    this.selectedFixture.group.rotation.y = this.originalFixturePos.rotY;

    if (this.selectedFixture.entity) {
      this.selectedFixture.entity.x = this.originalFixturePos.x;
      this.selectedFixture.entity.z = this.originalFixturePos.z;
      if (this.selectedFixture.entity.group) {
        this.selectedFixture.entity.group.position.set(this.originalFixturePos.x, 0, this.originalFixturePos.z);
        this.selectedFixture.entity.group.rotation.y = this.originalFixturePos.rotY;
      }
    }

    if (this.selectedFixture.cashierBot && this.selectedFixture.cashierBot.group) {
      this.selectedFixture.cashierBot.x = this.originalFixturePos.x;
      this.selectedFixture.cashierBot.z = this.originalFixturePos.z - 0.65;
      this.selectedFixture.cashierBot.group.position.set(
        this.originalFixturePos.x,
        0,
        this.originalFixturePos.z - 0.65
      );
    }

    this.selectedFixture = null;
    this.originalFixturePos = null;
    if (this.ghostMesh) this.ghostMesh.visible = false;
    window.Sound?.playPop?.(120);
  }

  confirmSelectedPlacement() {
    if (!this.selectedFixture) return;
    if (!this.isPlacementValid) {
      window.Sound?.playPop?.(80);
      return;
    }

    const fixture = this.selectedFixture;
    const newX = fixture.group.position.x;
    const newZ = fixture.group.position.z;
    const newRotY = fixture.group.rotation.y;

    this.applyFixtureMove(fixture, newX, newZ, newRotY);

    this.customLayout[fixture.id] = { x: newX, z: newZ, rotY: newRotY };
    this.saveState();

    fixture.group.position.y = 0;
    this.selectedFixture = null;
    this.originalFixturePos = null;
    if (this.ghostMesh) this.ghostMesh.visible = false;

    window.Sound?.playUpgrade?.();
  }

  applyFixtureMove(fixture, newX, newZ, newRotY) {
    fixture.group.position.set(newX, 0, newZ);
    fixture.group.rotation.y = newRotY;

    if (fixture.entity) {
      fixture.entity.x = newX;
      fixture.entity.z = newZ;
      if (fixture.entity.group) {
        fixture.entity.group.position.set(newX, 0, newZ);
        fixture.entity.group.rotation.y = newRotY;
      }
      if (fixture.entity.inputPadPos) fixture.entity.inputPadPos.set(newX - 1.5, 0, newZ);
      if (fixture.entity.outputPadPos) fixture.entity.outputPadPos.set(newX + 1.5, 0, newZ);
    }

    if (fixture.cashierBot && fixture.cashierBot.group) {
      fixture.cashierBot.x = newX;
      fixture.cashierBot.z = newZ - 0.65;
      fixture.cashierBot.group.position.set(newX, 0, newZ - 0.65);
    }

    const isRot = Math.round(Math.abs(newRotY) / (Math.PI / 2)) % 2 === 1;
    const w = isRot ? fixture.size.d : fixture.size.w;
    const d = isRot ? fixture.size.w : fixture.size.d;
    const halfW = w / 2;
    const halfD = d / 2;

    if (fixture.collisionTag && this.collision) {
      this.collision.removeBox(fixture.collisionTag);
      this.collision.addBox(newX - halfW, newX + halfW, newZ - halfD, newZ + halfD, fixture.collisionTag);
    }

    if (this.spatial) {
      this.spatial.updateReservation(
        fixture.id,
        fixture.category,
        newX - halfW,
        newX + halfW,
        newZ - halfD,
        newZ + halfD,
        { zone: 'CUSTOM_LAYOUT' }
      );
    }
  }

  applyCustomLayout() {
    if (!this.customLayout || typeof this.customLayout !== 'object') return;
    const fixtures = this.getEditableFixtures();
    const fixtureMap = new Map(fixtures.map(f => [f.id, f]));

    for (const [id, savedPos] of Object.entries(this.customLayout)) {
      const fixture = fixtureMap.get(id);
      if (fixture && typeof savedPos.x === 'number' && typeof savedPos.z === 'number') {
        const rotY = typeof savedPos.rotY === 'number' ? savedPos.rotY : 0;
        this.applyFixtureMove(fixture, savedPos.x, savedPos.z, rotY);
      }
    }
  }

  // --- Decoration Shop & Catalog Implementation ---
  initDecorationShopUI() {
    const shopBtn = document.getElementById('decor-shop-btn');
    if (shopBtn) {
      shopBtn.addEventListener('click', () => {
        this.toggleDecorationShopModal();
      });
    }

    const closeBtn = document.getElementById('decor-shop-close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        this.closeDecorationShopModal();
      });
    }

    const tabs = document.querySelectorAll('.decor-tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        this.activeDecorationShopCategory = tab.dataset.category || 'ALL';
        this.renderDecorationCatalog();
      });
    });
  }

  openDecorationShopModal() {
    if (this.isLayoutEditMode) {
      this.exitLayoutEditMode(true);
    }
    this.isDecorationShopOpen = true;
    const modal = document.getElementById('decor-shop-modal');
    if (modal) modal.classList.remove('hidden');

    const prestige = window.GameMechanics.calculateStorePrestige(this.decorationState, this.hygieneScore, this.brandState);
    const prestigeBadge = document.getElementById('decor-shop-prestige-info');
    if (prestigeBadge) {
      prestigeBadge.textContent = `PRESTİJ: [P${prestige.stars}] (${prestige.score} Puan)`;
    }

    this.renderDecorationCatalog();
    window.Sound?.playPop?.(220);
  }

  closeDecorationShopModal() {
    this.isDecorationShopOpen = false;
    const modal = document.getElementById('decor-shop-modal');
    if (modal) modal.classList.add('hidden');
    window.Sound?.playPop?.(160);
  }

  toggleDecorationShopModal() {
    if (this.isDecorationShopOpen) {
      this.closeDecorationShopModal();
    } else {
      this.openDecorationShopModal();
    }
  }

  renderDecorationCatalog() {
    const grid = document.getElementById('decor-catalog-grid');
    if (!grid) return;
    grid.innerHTML = '';

    const catalog = window.GameMechanics.DECORATION_CATALOG || [];
    const category = this.activeDecorationShopCategory || 'ALL';
    const filtered = category === 'ALL'
      ? catalog
      : catalog.filter(item => item.category === category);

    const categoryNames = {
      PLANTS: 'BİTKİ',
      FURNITURE: 'MOBİLYA',
      COOLING: 'SOĞUTMA',
      LIGHTING: 'IŞIKLANDIRMA',
      ACCESSORIES: 'AKSESUAR'
    };

    filtered.forEach(item => {
      const card = document.createElement('div');
      card.className = 'decor-card';

      const canAfford = typeof this.money === 'number' && this.money >= item.price;
      const catLabel = categoryNames[item.category] || item.category;

      card.innerHTML = `
        <div class="decor-card-header">
          <div class="decor-card-name">${item.name}</div>
          <div class="decor-card-category-badge">[${catLabel}]</div>
        </div>
        <div class="decor-card-details">
          <div class="decor-card-bonus">[PRESTİJ: +${item.prestigeBonus} PUAN]</div>
          <div class="decor-card-size">Boyut: ${item.size.w}m x ${item.size.d}m x ${item.size.h}m</div>
        </div>
        <div class="decor-card-footer">
          <div class="decor-card-price">$${item.price}</div>
          <button class="decor-buy-btn" type="button" ${canAfford ? '' : 'disabled'}>
            ${canAfford ? '[SATIN AL]' : '[YETERSİZ BAKİYE]'}
          </button>
        </div>
      `;

      const buyBtn = card.querySelector('.decor-buy-btn');
      if (buyBtn && canAfford) {
        buyBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          this.handleBuyDecoration(item.id);
        });
      }

      grid.appendChild(card);
    });
  }

  handleBuyDecoration(decorId) {
    if (!window.GameMechanics || typeof window.GameMechanics.buyDecoration !== 'function') {
      return;
    }

    const result = window.GameMechanics.buyDecoration(this, decorId);
    if (!result.success) {
      this.showFloatingText(result.reason, this.player.group.position, '#FF4757');
      window.Sound?.playPop?.(80);
      return;
    }

    this.updateMoneyUI();
    window.Sound?.playCash?.();

    // Create 3D Voxel Mesh
    const createMeshFn = typeof createVoxelDecorationMesh === 'function'
      ? createVoxelDecorationMesh
      : (window.createVoxelDecorationMesh || null);

    const mesh = createMeshFn ? createMeshFn(result.item) : null;
    if (!mesh) {
      console.warn('Decoration mesh creation failed for:', result.item);
      return;
    }

    // Spawn 1.5m in front of player
    const spawnX = Math.round(this.player.group.position.x / 0.5) * 0.5;
    const spawnZ = Math.round((this.player.group.position.z - 1.5) / 0.5) * 0.5;
    mesh.position.set(spawnX, 0, spawnZ);
    this.scene.add(mesh);

    const decorEntry = {
      id: result.item.instanceId,
      decorId: result.item.catalogId,
      name: result.item.name,
      collisionTag: result.item.instanceId,
      category: 'DECOR',
      size: result.item.size,
      group: mesh,
      entity: { group: mesh, x: spawnX, z: spawnZ }
    };

    if (!Array.isArray(this.purchasedDecorations)) {
      this.purchasedDecorations = [];
    }
    this.purchasedDecorations.push(decorEntry);

    // Register initial AABB and spatial reservation
    const halfW = result.item.size.w / 2;
    const halfD = result.item.size.d / 2;
    if (this.collision) {
      this.collision.addBox(spawnX - halfW, spawnX + halfW, spawnZ - halfD, spawnZ + halfD, result.item.instanceId);
    }
    if (this.spatial) {
      this.spatial.updateReservation(
        result.item.instanceId,
        'DECOR',
        spawnX - halfW,
        spawnX + halfW,
        spawnZ - halfD,
        spawnZ + halfD,
        { zone: 'CUSTOM_LAYOUT' }
      );
    }

    // Close shop modal and switch immediately to Store Layout Edit Mode with the new item selected
    this.closeDecorationShopModal();
    this.enterLayoutEditMode();
    this.selectFixtureForDrag(decorEntry);

    this.showFloatingText(`[SATIN ALINDI] ${result.item.name}`, this.player.group.position, '#2ECC71');
    this.saveState();
  }

  spawnPurchasedDecorations() {
    if (!this.decorationState || !Array.isArray(this.decorationState.purchasedItems)) return;

    if (this.purchasedDecorations && Array.isArray(this.purchasedDecorations)) {
      this.purchasedDecorations.forEach(dec => {
        if (dec && dec.group) {
          this.scene.remove(dec.group);
          dec.group.traverse(child => {
            if (child.geometry) child.geometry.dispose();
            if (child.material) {
              if (Array.isArray(child.material)) child.material.forEach(m => m.dispose());
              else child.material.dispose();
            }
          });
        }
        if (dec && dec.collisionTag && this.collision) {
          this.collision.removeBox(dec.collisionTag);
        }
      });
    }
    this.purchasedDecorations = [];

    const createMeshFn = typeof createVoxelDecorationMesh === 'function'
      ? createVoxelDecorationMesh
      : (window.createVoxelDecorationMesh || null);

    if (!createMeshFn) return;

    this.decorationState.purchasedItems.forEach((item, index) => {
      const mesh = createMeshFn(item);
      if (!mesh) return;

      const savedPos = (this.customLayout && this.customLayout[item.instanceId]) || null;
      const x = savedPos && typeof savedPos.x === 'number' ? savedPos.x : (10.0 + (index % 4) * 2.0);
      const z = savedPos && typeof savedPos.z === 'number' ? savedPos.z : (-22.0 - Math.floor(index / 4) * 2.0);
      const rotY = savedPos && typeof savedPos.rotY === 'number' ? savedPos.rotY : 0;

      mesh.position.set(x, 0, z);
      mesh.rotation.y = rotY;
      this.scene.add(mesh);

      const isRot = Math.round(Math.abs(rotY) / (Math.PI / 2)) % 2 === 1;
      const w = isRot ? item.size.d : item.size.w;
      const d = isRot ? item.size.w : item.size.d;
      const halfW = w / 2;
      const halfD = d / 2;

      if (this.collision) {
        this.collision.addBox(x - halfW, x + halfW, z - halfD, z + halfD, item.instanceId);
      }

      if (this.spatial) {
        this.spatial.updateReservation(
          item.instanceId,
          'DECOR',
          x - halfW,
          x + halfW,
          z - halfD,
          z + halfD,
          { zone: 'CUSTOM_LAYOUT' }
        );
      }

      const decorEntry = {
        id: item.instanceId,
        decorId: item.catalogId,
        name: item.name,
        collisionTag: item.instanceId,
        category: 'DECOR',
        size: item.size,
        group: mesh,
        entity: { group: mesh, x, z }
      };

      this.purchasedDecorations.push(decorEntry);
    });
  }
}

// Start game when page loads
window.addEventListener('DOMContentLoaded', () => {
  window.Game = new MiniMartGame();
});
