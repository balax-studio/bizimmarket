# NPC Navigasyon, Güvenli Rota Ağı ve Harita Genişletme Kuralları

Bu kurallar, süpermarket içindeki müşterilerin (CustomerAI), yardımcı personellerin (StaffHelperAI), hırsızların (ShoplifterAI) ve diğer tüm NPC'lerin kapılarda, duvarlarda veya reyon köşelerinde takılmasını önleyen **Dinamik Rota Ağı (`SupermarketNavGraph`)** ve **4 Aşamalı Güvenli Portal Geçişi** standartlarını belirler.

---

## 1. Yeni Yapı / Reyon / Oda Ekleme Protokolü

Haritaya yeni bir reyon, bina, oda, kasa masası veya engel eklendiğinde aşağıdaki 3 adım **zorunludur**:

1. **Fiziksel Çarpışma Kutusu Kaydı (AABB Collision):**
   - Yeni nesnenin bounding box sınırları `js/game.js` veya ilgili yapıcı içinde `this.collision.addBox(minX, maxX, minZ, maxZ, tag)` ile kaydedilmelidir.
   ```javascript
   this.collision.addBox(minX, maxX, minZ, maxZ, 'shelf_unique_name');
   ```

2. **Rota Düğümleri ve Bağlantıları (`SupermarketNavGraph`):**
   - Nesnenin etrafındaki güvenli geçiş koridorları belirlenerek [entities.js](file:///c:/Users/YSR_MONSTER/.antigravity/Market/js/entities.js) içindeki `SupermarketNavGraph.buildGraph()` fonksiyonuna yeni düğümler (`addNode`) ve çift yönlü kenarlar (`addEdge`) eklenmelidir.
   - Düğümler reyonların katı hacimleri içine değil, açık koridorların merkez çizgilerine yerleştirilmelidir.
   ```javascript
   this.addNode('NEW_ZONE_NODE', targetX, targetZ);
   this.addEdge('CONCOURSE_NODE', 'NEW_ZONE_NODE');
   ```

3. **Çift Yönlü Rota Testi (Pairwise Reachability Verification):**
   - Harita topolojisi güncellendiğinde tüm düğümler arasındaki A* yol bulma erişilebilirliği test edilmeli; hiçbir ada (bağlantısız düğüm) bırakılmamalıdır.

---

## 2. 4 Aşamalı Güvenli Portal ve Kapı Geçiş Standardı

NPC'lerin kapı eşiklerinden, oda girişlerinden veya bina geçitlerinden geçerken yan cephe duvarlarına takılmasını engellemek için **4 Aşamalı Portal Kuralı** uygulanmalıdır:

1. **Aşama 1 - Dış Portal Yaklaşımı:** NPC kapıya yaklaşırken doğrudan hedefe değil, kapının dış merkez eksenine (portal dış düğümüne) yönelir.
2. **Aşama 2 - Eşik Doğrusal Geçişi:** Kapı açıklığından geçerken yanlara dönmeden, yalnızca eşik ekseni doğrultusunda dik bir hat izler.
3. **Aşama 3 - Dağıtım Holü Yatay Kayması:** İç mekana girdikten sonra hiçbir engelin bulunmadığı açık enine dağıtım koridoru üzerinde hedef reyonun dikey koridoruna yatay olarak kayar.
4. **Aşama 4 - Dikey Koridor İlerlemesi:** Hedef koridorla tam hizalandığında koridor boyunca hedef nesneye/reyona doğru ilerler.

---

## 3. Doğrudan Işın / Ham Kestirme Yasağı (No Blind Shortcuts)

1. NPC hareket fonksiyonlarında (`moveWithDoorWaypoints`), reyonların veya duvarların köşelerini kesebilecek kontrolsüz ham Öklid kestirmeleri kesinlikle kullanılmamalıdır.
2. NPC'ler daima tanımlı `SupermarketNavGraph` enine concourse ($Z = -22.8, -17.7, -12.2, -6.2$) ve dikey koridor ($X = -14.5, -8.5, 0.0, 7.0, 12.75, 17.5$) hatlarını izlemelidir.
3. Düğüm varış toleransları:
   - Ara koridor düğümleri: **$0.45\text{m}$** (akıcı köşe dönüşleri için).
   - Nihai hedef düğümü: **$0.25\text{m}$** (hassas duruş için).

---

## 4. Doğrulama ve Test Standartları

Harita veya navigasyon üzerinde yapılan her değişiklik sonrasında:
- Düğüm çiftleri arasında A* rota başarısı (%100) ve sıfır ışın-engel çarpışması olduğu teyit edilmelidir.
- Tarayıcıda canlı simülasyonda müşterilerin giriş, alışveriş, kasa ve çıkış döngülerinde 0 takılma olduğu gözlemlenmelidir.
