# Bizim Market - Orijinal Koordinat ve AABB Çarpışma Yedekleme Dokümanı

Bu doküman, süpermarket ve üretim alanı mimari modernizasyonundan önceki orijinal 3D koordinatları, boyutları ve AABB (Axis-Aligned Bounding Box) çarpışma sınırlarını eksiksiz olarak kayıt altına almaktadır.

**Yedekleme Tarihi:** 2026-09-20  
**Kaynak Dosyalar:** `js/game.js`, `js/entities.js`

---

## 1. Genel Market Planı ve Sınır Sabitleri (MARKET_LAYOUT)

| Parametre | Değer | Açıklama |
| :--- | :--- | :--- |
| `width` | 48.0 | Toplam bina genişliği (X: -24.0 ile +24.0) |
| `depth` | 49.0 | Toplam bina derinliği (Z: -24.5 ile +24.5) |
| `centerX` | 0.0 | Zemin merkez X |
| `centerZ` | 0.0 | Zemin merkez Z |
| `minX` | -24.0 | Batı sınırı |
| `maxX` | 24.0 | Doğu sınırı |
| `minZ` | -24.5 | Kuzey cephe sınırı |
| `maxZ` | 24.5 | Güney çevre çiti sınırı |
| `publicNorthZ` | -20.5 | Kasa & giriş karşılama hattı |
| `groceryAisleZ` | -15.0 | 2. Reyon hattı |
| `freshAisleZ` | -9.5 | 1. Reyon hattı (Taze / Manav) |
| `serviceGateZ` | -1.0 | Market içi ile arka üretim alanı ayrımı |
| `productionNorthZ`| 4.0 | Üretim holü kuzey hattı |
| `productionSouthZ`| 21.5 | Üretim holü güney hattı |

---

## 2. Çevre Duvarları ve Sınır AABB Kutuları

| Duvar / Sınır Adı | X Min | X Max | Z Min | Z Max | Etiket (Collider Tag) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Kuzey Sol Duvar | -19.5 | -3.5 | -24.5 | -23.6 | `north_wall_left` |
| Kuzey Sağ Duvar | 3.5 | 23.5 | -24.5 | -23.6 | `north_wall_right` |
| Batı Duvarı (Kuzey Bölüm) | -19.8 | -18.8 | -24.2 | -13.8 | `wall_left_north` |
| Batı Duvarı (Güney Bölüm) | -19.8 | -18.8 | -11.2 | -0.8 | `wall_left_south` |
| Güney Duvarı / Çit Sınırı | -24.5 | 24.5 | 24.0 | 25.0 | `store_south_wall` |
| Doğu Dış Duvarı | 23.5 | 24.5 | -25.0 | 25.0 | `store_east_wall` |
| Batı Servis Çiti | -24.5 | -23.5 | -1.2 | 25.0 | `store_west_service_wall` |
| Depo Kuzey Duvarı | -27.8 | -19.0 | -24.4 | -23.6 | `warehouse_north_wall` |
| Depo Güney Duvarı | -27.8 | -19.0 | -1.4 | -0.6 | `warehouse_south_wall` |
| Depo Batı Duvarı (Kuzey) | -28.0 | -27.2 | -24.2 | -12.0 | `warehouse_west_wall_north` |
| Depo Batı Duvarı (Güney) | -28.0 | -27.2 | -8.0 | -0.8 | `warehouse_west_wall_south` |
| İç Ön Sol Bölme | -19.5 | -3.5 | -1.4 | -0.6 | `front_wall_left` |
| İç Ön Sağ Bölme | 3.5 | 23.5 | -1.4 | -0.6 | `front_wall_right` |
| Sol Çit | -24.5 | -23.5 | -1.2 | 25.4 | `fence_left` |
| Sağ Çit | 23.5 | 24.5 | -1.2 | 25.4 | `fence_right` |
| Arka Çit | -24.5 | 24.5 | 24.6 | 25.4 | `fence_back` |

---

## 3. Başlangıç Satış Reyonları ve Kasalar

| Nesne Adı | Model X | Model Y | Model Z | AABB [Xmin, Xmax, Zmin, Zmax] | Collider Tag |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `tomatoShelf` | -5.5 | 0.0 | -9.5 | `[-6.8, -4.2, -10.3, -8.7]` | `shelf_tomato` |
| `eggShelf` | 4.0 | 0.0 | -9.5 | `[2.7, 5.3, -10.3, -8.7]` | `shelf_egg` |
| `beverageChiller` | 22.2 | 0.0 | -16.0 | `[21.4, 23.0, -17.3, -14.7]` | `shelf_beverage_chiller` |
| `cleaningShelf` | 15.5 | 0.0 | -9.5 | `[14.2, 16.8, -10.3, -8.7]` | `shelf_cleaning` |
| `checkout1` | 3.5 | 0.0 | -19.5 | `[2.2, 4.8, -20.1, -18.9]` | `checkout_1` |
| `checkout2` | 7.5 | 0.0 | -19.5 | `[6.2, 8.8, -20.1, -18.9]` | `checkout_2` |
| `checkout3` | 11.5 | 0.0 | -19.5 | `[10.2, 12.8, -20.1, -18.9]` | `checkout_3` |
| `cashierBot1` | 3.5 | 0.0 | -20.15 | *(Personel NPC Modeli)* | - |
| `cashierBot2` | 7.5 | 0.0 | -20.15 | *(Personel NPC Modeli)* | - |
| `cashierBot3` | 11.5 | 0.0 | -20.15 | *(Personel NPC Modeli)* | - |

---

## 4. İdare Ofisi ve Dönüştürme Tezgahları

| Nesne Adı | Model X | Model Y | Model Z | AABB [Xmin, Xmax, Zmin, Zmax] | Collider Tag |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `executiveOffice` (Desk) | -15.8 | 0.0 | -4.8 | `[-16.8, -14.8, -5.4, -4.2]` | `office_desk` |
| Ofis Kuzey Duvarı | - | - | - | `[-19.2, -12.3, -8.1, -7.5]` | `office_north_wall` |
| Ofis Güney Duvarı | - | - | - | `[-19.2, -12.3, -1.5, -0.9]` | `office_south_wall` |
| Ofis Batı Duvarı | - | - | - | `[-19.2, -18.6, -8.0, -1.0]` | `office_west_wall` |
| Ofis Doğu Duvarı (Kuzey) | - | - | - | `[-12.7, -12.3, -8.0, -5.0]` | `office_east_wall_north` |
| Ofis Doğu Duvarı (Güney) | - | - | - | `[-12.7, -12.3, -3.4, -1.0]` | `office_east_wall_south` |
| `toastMachine` | -15.5 | 0.0 | -15.0 | `[-16.8, -14.2, -15.8, -14.2]` | `toast_machine` |
| `jamCauldron` | -15.5 | 0.0 | -17.8 | `[-16.8, -14.2, -18.6, -17.0]` | `jam_cauldron` |
| `teaStation` | -16.0 | 0.0 | -6.8 | `[-17.0, -15.0, -7.4, -6.2]` | `tea_station` |

---

## 5. İlerleme Kilitleri (Progression Unlock Pads) ve Açılan Tesisler

| No | Kilit Adı | Pad (X, Z) | Açılan Nesne Adı | Nesne (X, Z) | AABB Sınırları |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | 2. Domates Rafı | (-11.5, -7.0) | `shelf2` | (-11.5, -9.5) | `[-12.8, -10.2, -10.3, -8.7]` |
| 2 | Kasiyer Hızı | (7.5, -15.5) | *Kasiyer Hızlandırma* | - | - |
| 3 | Buğday & Değirmen | (-5.5, 10.0) | `wheatPlot`<br>`flourMill` | (-5.5, 12.5)<br>(-12.5, 12.5) | `[-7.2, -3.8, 11.0, 14.0]`<br>`[-14.2, -10.8, 11.0, 14.0]` |
| 4 | Fırın & Ekmek Reyonu | (-11.5, -12.5)| `bakeryOven`<br>`breadShelf` | (-12.5, 18.5)<br>(-11.5, -15.0) | `[-14.2, -10.8, 17.0, 20.0]`<br>`[-12.8, -10.2, -15.8, -14.2]` |
| 5 | 1. Personel (Reyon) | (-2.5, -1.0) | `helper` (Stocker) | (-2.5, 0.0, -1.0) | *(NPC)* |
| 6 | İnek Çiftliği & Süt | (12.5, 4.0) | `cowPen` | (12.5, 6.5) | `[10.5, 14.5, 4.8, 8.2]` |
| 7 | Peynir Kazanı & Şarküteri | (10.0, -7.0) | `cheeseProcessor`<br>`cheeseShelf` | (12.5, 12.5)<br>(10.0, -9.5) | `[11.0, 14.0, 11.0, 14.0]`<br>`[8.7, 11.3, -10.3, -8.7]` |
| 8 | 2. Personel (Lojistik) | (2.5, -1.0) | `helper2` (Logistics) | (2.5, 0.0, -1.0) | *(NPC)* |
| 9 | Mısır & Reyonu | (5.5, 4.0) | `cornPlot`<br>`cornShelf` | (5.5, 6.5)<br>(-5.5, -15.0) | `[3.8, 7.2, 5.0, 8.0]`<br>`[-6.8, -4.2, -15.8, -14.2]` |
| 10 | Patlamış Mısır | (4.0, -12.5) | `popcornMaker`<br>`popcornShelf` | (17.0, 6.5)<br>(4.0, -15.0) | `[15.6, 18.4, 5.2, 7.8]`<br>`[2.7, 5.3, -15.8, -14.2]` |
| 11 | Elma & Meyve Suyu | (10.0, -12.5) | `appleTree`<br>`juicer`<br>`juiceShelf` | (5.5, 18.5)<br>(12.5, 18.5)<br>(10.0, -15.0) | `[3.8, 7.2, 17.0, 20.0]`<br>`[11.0, 14.0, 17.0, 20.0]`<br>`[8.7, 11.3, -15.8, -14.2]` |
| 12 | Gurme Turta Reyonu | (4.0, -18.0) | `pieShelf` | (4.0, -20.5) | `[2.7, 5.3, -21.3, -19.7]` |
| 13 | 3. Personel (Çiftçi) | (-2.5, 3.5) | `helper3` (Farmer) | (-2.5, 0.0, 3.5) | *(NPC)* |
| 14 | Çilek & Reçel Reyonu | (-5.5, -18.0) | `strawberryPlot`<br>`strawberryShelf` | (-5.5, 18.5)<br>(-5.5, -20.5) | `[-7.2, -3.8, 17.0, 20.0]`<br>`[-6.8, -4.2, -21.3, -19.7]` |
| 15 | Havuç & Reyonu | (-11.5, -18.0)| `carrotPlot`<br>`carrotShelf` | (5.5, 12.5)<br>(-11.5, -20.5) | `[3.8, 7.2, 11.0, 14.0]`<br>`[-12.8, -10.2, -21.3, -19.7]` |
| 16 | Dondurma Makinesi | (10.0, -18.0) | `iceCreamMachine`<br>`iceCreamShelf` | (17.0, 12.5)<br>(10.0, -20.5) | `[15.6, 18.4, 11.0, 14.0]`<br>`[8.7, 11.3, -21.3, -19.7]` |
| 17 | Salata Barı | (15.5, -18.0) | `saladPrepBar`<br>`saladShelf` | (17.0, 18.5)<br>(15.5, -20.5) | `[15.6, 18.4, 17.0, 20.0]`<br>`[14.2, 16.8, -21.3, -19.7]` |
| 18 | Gurme Pizza Reyonu | (15.5, -12.5) | `pizzaShelf` | (15.5, -15.0) | `[14.2, 16.8, -15.8, -14.2]` |
| 19 | Express Kurye Masası | (14.0, -3.0) | `deliveryDesk` | (14.0, -5.0) | `[12.8, 15.2, -5.8, -4.2]` |
| 20 | 4. Personel (Lojistik) | (2.5, 3.5) | `helper4` (Logistics) | (2.5, 0.0, 3.5) | *(NPC)* |

---

## 6. Başlangıç Tarla & Çiftlik Yapıları

| Nesne Adı | Model X | Model Y | Model Z | AABB Sınırları | Collider Tag |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `chickenCoop` (Tavuk Kümesi) | -12.5 | 0.0 | 6.5 | `[-14.2, -10.8, 5.0, 8.0]` | `chicken_coop` |
| `tomatoPlot` (Domates Tarlası)| -5.5 | 0.0 | 6.5 | `[-7.2, -3.8, 5.0, 8.0]` | `tomato_plot` |

---

## 7. Giriş, Lobi ve Mimari Görsel Donatılar (SupermarketVisualSystem)

| Donatı Adı | Model X | Model Y | Model Z | AABB Sınırları | Collider Tag |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `mopStation` | -4.5 | 0.0 | -23.5 | `[-5.3, -3.7, -24.5, -22.5]` | `mop_station` |
| `karabashDog` (Kulübe) | 4.5 | 0.0 | -23.5 | `[3.4, 5.6, -24.5, -22.5]` | `karabash_kennel` |
| `handBaskets` (Sepetler) | 2.6 | 0.0 | -22.5 | `[2.0, 3.2, -23.0, -22.0]` | `decor_hand_baskets` |
| `trolleyCorral` (Arabalar) | -2.4 | 0.0 | -22.5 | `[-3.1, -1.7, -23.8, -21.2]` | `decor_trolley_corral` |
| `lockers` (Emanet Dolabı) | -6.5 | 0.0 | -23.2 | `[-7.5, -5.5, -23.6, -22.8]` | `decor_lockers` |
| `sanitizer` (Dezenfektan) | -6.5 | 0.0 | -31.5 | `[-6.85, -6.15, -31.85, -31.15]` | `decor_sanitizer` |
| `turnstile` (Turnike) | -8.5 | 0.0 | -31.5 | `[-8.7, -8.3, -31.7, -31.3]` | `decor_turnstile` |
| `freezer` (Ada Dondurucu) | 7.0 | 0.0 | -17.7 | `[6.1, 7.9, -19.1, -16.3]` | `decor_island_freezer` |
| `impulseRack` (Kasa Yanı Raf) | 13.8 | 0.0 | -19.5 | `[13.4, 14.2, -20.3, -18.7]` | `decor_impulse_rack` |
| `newsStand` (Gazetelik) | 14.8 | 0.0 | -19.5 | `[14.35, 15.25, -20.05, -18.95]` | `decor_news_stand` |
| `scaleStation` (Terazi) | -8.5 | 0.0 | -11.2 | `[-9.05, -7.95, -11.75, -10.65]` | `decor_produce_scale` |
| `priceChecker` (Fiyat Gör) | -12.5 | 1.6 | -12.0 | `[-12.9, -12.1, -12.4, -11.6]` | `decor_price_checker` |
| `bakeryCrates` (Ekmek Sandığı) | -8.5 | 0.0 | -13.5 | `[-9.0, -8.0, -13.9, -13.1]` | `decor_bakery_crates` |
| `wetFloorCone` (Kaygan Zemin) | -4.5 | 0.0 | -17.5 | `[-4.9, -4.1, -17.9, -17.1]` | `decor_wet_floor_cone` |
| `recyclingStation` (Geri Dönüşüm)| -3.5 | 0.0 | -21.5 | `[-4.3, -2.7, -21.9, -21.1]` | `decor_recycling_station` |
| `promoDumpBin` (Fırsat Havuzu) | 17.8 | 0.0 | -13.5 | `[17.2, 18.4, -14.1, -12.9]` | `decor_promo_dump_bin` |
| `bulkStation` (Dökme Tahıl) | -17.0 | 0.0 | -20.5 | `[-17.95, -16.05, -20.9, -20.1]` | `decor_bulk_grain` |
| `directoryTotem` (Mağaza Planı) | -1.8 | 0.0 | -21.2 | `[-2.3, -1.3, -21.55, -20.85]` | `decor_store_directory` |
| `floralStand` (Çiçek Standı) | 1.8 | 0.0 | -21.2 | `[1.25, 2.35, -21.7, -20.7]` | `decor_floral_stand` |
| `serviceDecor` (İade / Servis) | 21.5 | 0.0 | 18.5 | `[19.75, 23.25, 17.95, 19.05]` | `decor_service_counter` |
| `chiller` (Sütlük Duvar Dolabı) | 22.6 | 0.0 | -21.0 | *(Duvar boyu dekoratif)* | - |
| `cooler` (İçecek Camlı Dolap) | 22.6 | 0.0 | -12.2 | *(Duvar boyu dekoratif)* | - |

---

## 8. Navigasyon Düğümleri (SupermarketNavGraph Waypoints)

```javascript
// Dış Portal & Kapı Düğümleri
N_ROAD_W: (-25.0, -25.5), N_ROAD_E: (25.0, -25.5)
N_SIDEWALK_W: (-12.0, -25.5), N_SIDEWALK_E: (12.0, -25.5)
N_PARK_W: (-12.0, -30.0), N_PARK_E: (12.0, -30.0)
N_OUT_ENTRY: (-1.2, -25.5), N_OUT_EXIT: (1.2, -25.5)
N_IN_ENTRY: (-1.2, -22.5), N_IN_EXIT: (1.2, -22.5)

// İç Koridor Hatları
Z0 = -22.5: X in [-14.5, -8.5, 0.0, 7.0, 12.75, 17.5]
Z1 = -17.7: X in [-14.5, -8.5, 0.0, 7.0, 12.75, 17.5]
Z2 = -12.2: X in [-14.5, -8.5, 0.0, 7.0, 12.75, 17.5]
Z3 = -6.2:  X in [-8.5, 0.0, 7.0, 12.75, 17.5]

// Çiftlik & Üretim Izgarası
farmZ = [1.8, 3.5, 9.5, 15.5, 21.5]
farmX = [-15.5, -9.0, 0.0, 9.0, 15.5]

// Depo
W_IN_DOOR: (-19.2, -12.2), W_CENTER: (-22.5, -12.2), W_DOCK: (-24.0, -10.0), W_RACKS_N: (-22.5, -18.0), W_RACKS_S: (-22.5, -6.0)
```
