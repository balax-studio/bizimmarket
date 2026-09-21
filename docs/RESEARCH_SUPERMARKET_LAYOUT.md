# Deep Research Dossier: Süpermarket Yerleşim & Lojistik Mimarisi

## Yönetici Özeti (Executive Summary)
Bu araştırma, **Bizim Market** simülasyonu için uluslararası perakende mimarisi (Retail Architecture), müşteri dolaşım psikolojisi (Customer Circulation Psychology) ve arka plan üretim lojistiği (Back-of-House Logistics) ilkelerini sentezler. Simülasyon oyunlarında (Supermarket Simulator, Trader Life vb.) en sık yaşanan takılma, kuyruk yığılması ve karmaşık rota sorunlarını sıfıra indiren **"Hiyerarşik Grid-Loop ve İkiz Koridor"** yerleşim modelini önerir.

---

## 1. Karşılaştırmalı Düzen Matrisi (Layout Taxonomy)

| Yerleşim Modeli | Avantajları | Dezavantajları / Riskleri | Simülasyon Uygunluğu |
| :--- | :--- | :--- | :--- |
| **Geleneksel Izgara (Grid Layout)** | Maksimum alan verimi, kestirme yollar, deterministik NavMesh | Monoton koridorlar, dar geçişlerde NPC sıkışması | Yüksek (%85) |
| **Halka / Pist (Racetrack / Loop)** | Müşteriyi tüm reyonlardan geçmeye zorlar, yüksek sepet tutarı | Geri dönüş zorluğu, lojistik personeli için uzun yollar | Orta (%65) |
| **Serbest Akış (Free-Flow)** | Butik ve estetik görünüm, esnek dekorasyon | AABB çakışma riski, A* yol bulma optimizasyon zorluğu | Düşük (%30) |
| **Hibrit Geniş Arterli Grid-Loop (ÖNERİLEN)** | Net ana koridor (Central Artery), geniş reyon geçişleri (min 2.0m), izole üretim hattı | Biraz daha geniş zemin alanı gerektirir | **Mükemmel (%100)** |

---

## 2. Müşteri Psikolojisi & Bölgeleme (Zoning Hierarchy)

### A. Giriş & Karşılama Bölgesi (Decompression Zone: Z = -24.0 ila -21.0)
- **Fonksiyon:** Müşterinin dış dünyadan mağaza moduna geçiş yaptığı psikolojik eşik.
- **Elemanlar:** Çift kapılı turnike ayrımı, el sepetleri (sol), alışveriş arabaları (sağ), mağaza yönlendirme totemi, taze çiçek standı.
- **Kural:** Bu alanda satış reyonu bulunmaz; açık alan genişliği min. 3.5 metre tutulur.

### B. Taze & İştah Açıcı Batı Kanadı (Perimeter Fresh Zone: X = -18.0 ila -3.5, Z = -15.0 ila -8.0)
- **Fonksiyon:** Manav (Domates, Havuç vb.) ve Fırın/Pastane reyonları.
- **Psikoloji:** Girişte taze renkler ve fırından gelen sıcak ekmek kokusu algısı müşteriyi rahatlatır ve satın alma iştahını artırır.
- **Elemanlar:** Ahşap kasalar, dijital terazi istasyonu, ahşap fırın gölgeliği.

### C. Soğuk Zincir & Şarküteri Doğu Kanadı (Cold Perimeter Wall: X = 3.5 ila 22.5, Z = -15.0 ila -8.0)
- **Fonksiyon:** Sütlükler, peynir, soğuk meşrubat dolapları ve dondurucular.
- **Psikoloji:** Yüksek enerji tüketen ve arka servis desteği isteyen soğuk dolaplar dış duvara yaslanır.
- **Elemanlar:** Ada dondurucu (`Island Chest Freezer`), cam kapılı içecek dolabı, açık hava perdeli sütlük.

### D. Kasa & Anlık Satın Alma Hattı (Impulse & Checkout Concourse: X = 3.5 ila 14.0, Z = -20.0 ila -18.0)
- **Fonksiyon:** Hızlı, sıralı ve engelsiz ödeme akışı.
- **Ergonomi:** 3 paralel kasa hattı, aralarında 1.4m geçiş boşluğu, kasa yanlarında sakız/çikolata/dergi standları (`Impulse Racks`), çıkış kapısına doğru doğrusal akış.

### E. Arka Üretim, Tarla ve Lojistik Ayrımı (Back-of-House / Production & Farm: Z >= 0.0)
- **Fonksiyon:** Hammadde üretimi, işleme makineleri (değirmen, peynir kazanı, fırın, sıkacak) ve lojistik depo.
- **İzolasyon Kuralı:** Müşteri NPC'leri Z >= -1.0 bölgesine geçmez. Bu bölgede yalnızca oyuncu, forkliftler ve personel botları (Helper AI) hareket eder.

---

## 3. Lojistik ve Personel Koridoru Ergonomisi

1. **Batı Lojistik Deposu (Warehouse West Wing: X: -19.2 ila -27.5):**
   - Toptan sevkiyat indirme rampası (`Wholesale Loading Bay`), palet rafları ve depo çift kanatlı kapısı doğrudan Batı reyon koridoruna (`M_Z2_X0`) bağlanır.
2. **Merkezi Servis Koridoru (Service Artery X = 0.0, Z = -2.0 ila 22.0):**
   - Tarladan toplanan domates, buğday, mısır, elma ve çileğin üretim makinelerine ve reyonlara taşınması için 2.4m genişliğinde kesintisiz dikey yol.
3. **Üretim Parselleri Çevre Koridorları (Lateral Walkways):**
   - Makineler ve tarlalar Z = 6.5, 12.5, 18.5 koordinatlarına sıralanırken, yaya koridorları Z = 3.5, 9.5, 15.5, 21.5 hatlarında tutulur. Böylece hiçbir personel makinenin içinden geçmek zorunda kalmaz.

---

## 4. Aksiyon Planı ve Mimari İlkeler (Actionable Directives)

1. **Koridor Genişliği Güvencesi:** Tüm reyonlar arasında minimum 2.0m - 2.6m serbest yürüme açıklığı bırakılacaktır.
2. **Çakışmasız AABB Koordinatları:** Her reyon ve makinenin çevresine [X-0.6, X+0.6, Z-0.6, Z+0.6] güvenlik payı verilecektir.
3. **NavMesh - Fizik Senkronizasyonu:** `SupermarketNavGraph` düğümleri reyonların tam ortasındaki koridor çizgilerine yerleştirilecektir.
