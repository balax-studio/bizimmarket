# Neo-Brutalist Arcade Market Tycoon — proje bağlamı

Revision: 3 · Yetkili kaynak: .project/state.json

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
- pillar-visual → Yönetir → arch-gdd
- pillar-megamap → Yönetir → arch-gdd
- pillar-menu-build → Yönetir → arch-gdd
- econ-balance → Dengeler → arch-gdd

### Somut nesne değerleri

- pillar-visual: {"description": "Ham beton zeminler, asit yeşili ve neon turuncu vurgular, siyah outline çizgileri, sert blok gölgeler", "pillar_name": "Neo-Brutalist & Low-Poly Sanat Tarzı", "status": "defined"}
- pillar-megamap: {"description": "Bölüm geçişi olmaksızın başlangıç beton dükkanından dışa doğru duvarları yıkarak açılan dinamik parseller", "pillar_name": "Tek ve Büyüyen Megamap", "status": "defined"}
- pillar-menu-build: {"description": "Yerdeki halkalar yerine HUD menüsü üzerinden grid yerleşimi ve endüstriyel vinç kargo kutusu inişi", "pillar_name": "Menü Tabanlı İnşaat ve Vinç İndirme", "status": "defined"}
- econ-balance: {"tier_count": 6, "validated": true}
- arch-gdd: {"doc_path": "docs/GDD_NEO_BRUTALIST_TYCOON.md", "subsystem": "spatial_megamap"}

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

## Çalışılabilir görevler

Şu anda çalışılabilir görev yok.

## Uyarılar

- Yok.

## Onarım işlemleri

Bunlar öneridir; gerekçeyi değerlendir, actor ekle ve güncel revision ile uygula.
- Yok.

Kanıt hash'i dosya sürümünü denetler; kalite veya insan kabulünü ispatlamaz.
