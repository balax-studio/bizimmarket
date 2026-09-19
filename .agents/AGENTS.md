# Bizim Market - Workspace Rules & Agent Instructions

Bu proje, Three.js tabanlı bloklu (low-poly voxel) 3D dünya ve renkli Neo-Brutalist 2D arayüz standartlarına dayanan bir süpermarket ve üretim simülasyonudur. Projede görev alan tüm AI ajanları (Antigravity/Claude Code) aşağıdaki katı kurallara istisnasız uymak zorundadır:

---

## 1. Altı Temel Mühendislik ve Tasarım Standardı

1. **Low Poly Cubic / Voxel 3D Dünya**:
   - Tüm modeller, karakterler, araçlar ve ürünler BoxGeometry ile bloklu inşa edilir. Pürüzsüz küre veya silindir kullanılmaz.
2. **Renkli Neo-Brutalist UI**:
   - Menüler, pencereler, butonlar ve rozetler kesinlikle sıfır yuvarlatma (order-radius: 0px !important), kalın siyah çerçeve (3px-4px solid #000), sert gölge (4px 4px 0 #000) ve mekanik basma hissi taşır.
3. **Standart Platform Emojileri Kesinlikle Yasaktır**:
   - Unicode/işletim sistemi emojileri (🍅, ⭐, ✕, ★ vb.) kod, HTML, CSS ve 3D dünya metinlerinde YASAKTIR (	ests/world-labels.test.js regex kuralı). Yalnızca ASCII etiketler ([LV1], [DOST], X) veya kalın siyah çizgili Neo-Brutalist inline SVG ikonlar kullanılabilir.
4. **Three.js VRAM Bellek İmha Standardı (Memory Leak Free)**:
   - Sahneden silinen veya ayrılan her karakter, araç ve ürün küpü için group.traverse() ile geometry.dispose() ve material.dispose() çağrılmak zorundadır. Yetim setInterval bırakılamaz.
5. **Input Focus & Klavye Olayı Yalıtımı**:
   - Oyuncu metin kutusuna (<input>, <textarea>) yazarken oyun kısayolları (KeyM, KeyH, Tab) asla tetiklenemez. Tüm modallar Escape tuşu ile kapanabilmelidir.
6. **Deterministik A* Rota Ağı ve Safe-Zone Harita Protokolü**:
   - Tüm NPC'ler SupermarketNavGraph üzerinden hareket eder. Yeni makineler ve binalar NPC koridorlarını kesmeyecek safe-zone bölgelerine (ör. Z <= -31.0) kurulmalı ve AABB kutuları sisteme kaydedilmelidir.

---

## Detaylı Kılavuzlar ve Dosya Bağlantıları

- **Görsel & Arayüz Sistemi (UI/UX)**: [.agents/rules/aesthetic_rules.md](rules/aesthetic_rules.md)
- **Mühendislik, Bellek ve Ekonomi Standartları**: [.agents/rules/engineering_rules.md](rules/engineering_rules.md)
- **NPC Navigasyon ve Harita Genişletme Protokolü**: [.agents/rules/navigation_rules.md](rules/navigation_rules.md)

---

## Test Zorunluluğu
Yapılan her değişiklik sonrasında 
ode tests/*.test.js komutuyla 17 test takımının tamamının %100 geçtiği doğrulanmalı ve yeni özellikler için ilgili testler eklenmelidir.
