# Neo-Brutalist Arcade Market Tycoon — proje bağlamı

Revision: 25 · Yetkili kaynak: .project/state.json

Bu görünüm türetilmiştir. Güncel kanıt kontrolü için context komutunu çalıştır.

Amaç: My Mini Mart türünde, tek megamap üzerinde Neo-Brutalist & Low-Poly estetiğinde menü tabanlı inşaat ve otomasyon mekaniklerine sahip web tabanlı 3B market tycoon oyunu tasarlamak ve geliştirmek
Hedef kitle: Web ve mobil tarayıcılarda arcade-idle ve yönetim simülasyonu seven oyuncular

## Kapsam

- Neo-Brutalist & Low-Poly 3B görsel tasarım (kontur çizgileri, ham beton, neon aksanlar)
- Kesintisiz tek harita (megamap) dinamik genişleme mimarisi
- Menü tabanlı ızgara yerleşim ve kargo/vinç indirme UX sistemi (yerdeki para çemberleri olmadan)
- Karakter taşıma mekaniği, müşteri HFSM ve NavMesh yapay zekası
- Kademe kademe genişleyen ekonomi ve otomasyon denge tablosu

## Kapsam dışı

- Bölüm/sahne geçişleri (level hopping)
- Yerde duran para çemberleri/pedleri (floor pads)
- Çok oyunculu (multiplayer) ağ desteği

## Kısıtlar

- Three.js + Vite + WebGL 60 FPS hedefi
- Tek kalıcı harita üzerinde parsel bazlı duvar yıkımı ve dinamik NavMesh güncellemesi
- Endüstriyel Neo-Brutalist tasarım dili (ham gri beton, asit yeşili, turuncu, siyah konturlar)

## Açık sorular

- Yok.

## Nesneler ve ilişkiler

- pillar-visual (design_pillar): Neo-Brutalist & Low-Poly Sanat Sütunu
- pillar-megamap (design_pillar): Tek Megamap ve Duvar Yıkım Sütunu
- pillar-menu-build (design_pillar): Menü Tabanlı İnşaat Sütunu
- econ-balance (economy_matrix): 6 Aşamalı Ekonomi ve Genişleme Matrisi
- arch-gdd (system_architecture): Neo-Brutalist Tycoon GDD Belgesi
- code-core (system_architecture): Oyun Çekirdeği ve Arayüz Kodları
- pillar-visual → Yönetir → arch-gdd
- pillar-megamap → Yönetir → arch-gdd
- pillar-menu-build → Yönetir → arch-gdd
- econ-balance → Dengeler → arch-gdd
- pillar-visual → Yönetir → code-core
- econ-balance → Dengeler → code-core

### Somut nesne değerleri

- pillar-visual: {"description": "Ham beton zeminler, asit yeşili ve neon turuncu vurgular, siyah outline çizgileri, sert blok gölgeler", "pillar_name": "Neo-Brutalist & Low-Poly Sanat Tarzı", "status": "defined"}
- pillar-megamap: {"description": "Bölüm geçişi olmaksızın başlangıç beton dükkanından dışa doğru duvarları yıkarak açılan dinamik parseller", "pillar_name": "Tek ve Büyüyen Megamap", "status": "defined"}
- pillar-menu-build: {"description": "Yerdeki halkalar yerine HUD menüsü üzerinden grid yerleşimi ve endüstriyel vinç kargo kutusu inişi", "pillar_name": "Menü Tabanlı İnşaat ve Vinç İndirme", "status": "defined"}
- econ-balance: {"tier_count": 6, "validated": true}
- arch-gdd: {"doc_path": "docs/GDD_NEO_BRUTALIST_TYCOON.md", "subsystem": "spatial_megamap"}
- code-core: {"doc_path": "src/main.js", "subsystem": "player_movement"}

Türler ve bağlantı kuralları: `ontology` komutu / `ONTOLOJİ.md`.

## Kararlar


## Görevler

- T-GDD-DESIGN [done] Neo-Brutalist Megamap Market Tycoon GDD ve Sistem Mimarisini hazırla (kayıt: done)
  - Ölçüt: Temel sistem mimarisi (oyuncu kontrolleri, yığılan sırt taşıma kinematiği, müşteri HFSM ve dinamik NavMesh) eksiksiz belgelenmiş.
  - Ölçüt: İnşaat menüsü, ızgara yerleşim raycast akışı ve endüstriyel kargo vinç iniş animasyonu UX detaylarıyla kurgulanmış.
  - Ölçüt: 6 kademeli tek harita genişleme ve ekonomi tablosu (parsel maliyetleri, üretim süreleri, kar marjları, personel kilidi) matematiksel tutarlılıkla hesaplanmış.
  - İlgili nesneler: pillar-visual, pillar-megamap, pillar-menu-build, arch-gdd, econ-balance
  - Girdiler: pillar-visual, pillar-megamap, pillar-menu-build, econ-balance
  - Ürettiği nesneler: arch-gdd
  - Etkin önkoşullar: yok
  - Kabul güncelliği: güncel · tamamlanma sayısı: 1
- T-CORE-IMPLEMENTATION [done] Three.js, Neo-Brutalist HUD ve İnşaat Menüsü çekirdeğini doğrula (kayıt: done)
  - Ölçüt: Vite geliştirme sunucusu hatasız çalışır ve 60 FPS Three.js sahnesi yüklenir.
  - Ölçüt: İnşaat menüsü, 0.5m grid snappi ve kargo vinç indirme animasyonu test edilir.
  - Ölçüt: Karakter kontrolleri ve domates hasat döngüsü çalışır.
  - İlgili nesneler: code-core, pillar-visual, pillar-menu-build, econ-balance
  - Girdiler: pillar-visual, pillar-menu-build, econ-balance
  - Ürettiği nesneler: code-core
  - Etkin önkoşullar: yok
  - Kabul güncelliği: güncel · tamamlanma sayısı: 3
- T-FIX-PHASE-1 [done] Faz 1 optimizasyon, çarpışma fiziği ve ses efektleri düzeltmelerini tamamla (kayıt: done)
  - Ölçüt: Her karede tekrarlanan raf geometri temizleme sızıntısı kaldırıldı.
  - Ölçüt: Oyuncu için katı duvar ve reyon AABB kayma çarpışma fiziği uygulandı.
  - Ölçüt: Harici dosya gerektirmeyen Web Audio API ses efektleri eklendi.
  - Ölçüt: Müşteri konuşma balonları kameraya bakan billboard piktogramlara dönüştürüldü.
  - İlgili nesneler: code-core, pillar-visual, pillar-menu-build
  - Girdiler: code-core
  - Ürettiği nesneler: yok
  - Etkin önkoşullar: T-CORE-IMPLEMENTATION
  - Üretici bağı: code-core ← T-CORE-IMPLEMENTATION
  - Kabul güncelliği: güncel · tamamlanma sayısı: 2
- T-FIX-PHASE-2 [done] Faz 2 oynanış döngüsü, otomasyon, müşteri yol bulma ve arayüz kısayolu düzeltmelerini tamamla (kayıt: done)
  - Ölçüt: Oyuncu başlangıç konumu koridor ortasına alındı ve kasa reyonu çarpışma kutusu ayrıştırıldı.
  - Ölçüt: İnşaat menüsü için B (aç/kapat), Escape ve R (döndür) klavye kısayolları eklendi.
  - Ölçüt: Müşteri yapay zekası yalnızca dükkanda mevcut reyon ürünlerini talep eder ve kapı geçiş noktaları üzerinden duvardan geçmeden hareket eder.
  - Ölçüt: İşe alınan stocker (reyoncu) otonom olarak tarladan domates toplayıp reyonlara ve salça kazanına taşır.
  - İlgili nesneler: code-core, pillar-visual, pillar-menu-build
  - Girdiler: code-core
  - Ürettiği nesneler: yok
  - Etkin önkoşullar: T-CORE-IMPLEMENTATION
  - Üretici bağı: code-core ← T-CORE-IMPLEMENTATION
  - Kabul güncelliği: güncel · tamamlanma sayısı: 1

## Çalışılabilir görevler

Şu anda çalışılabilir görev yok.

## Uyarılar

- Yok.

## Onarım işlemleri

Bunlar öneridir; gerekçeyi değerlendir, actor ekle ve güncel revision ile uygula.
- Yok.

Kanıt hash'i dosya sürümünü denetler; kalite veya insan kabulünü ispatlamaz.
