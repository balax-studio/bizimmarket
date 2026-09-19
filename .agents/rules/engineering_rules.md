# Mühendislik, Performans ve Kod Kalitesi Kuralları (Engineering Rules)

Bu kurallar, projedeki JavaScript, Three.js ve DOM etkileşimlerinde bellek sızıntılarını, ekonomik açıkları, klavye çakışmalarını ve mantık hatalarını önlemek için **tüm AI ajanları ve geliştiriciler tarafından zorunlu olarak** uygulanmalıdır.

---

## 1. Three.js VRAM ve Bellek İmha Standardı (MANDATORY)

Three.js uygulamalarında sahneden bir nesneyi scene.remove(group) ile kaldırmak ekran kartı belleğindeki (VRAM) geometrileri ve WebGL materyallerini serbest bırakmaz. Uzun süren oturumlarda bellek sızıntısını (out-of-memory sekme çökmesi) önlemek için şu kurallar bağlayıcıdır:

1. **Recursive Dispose Zorunluluğu**:
   - Yok edilen her karakter (Character3D, CustomerAI, StaffHelperAI), araç, bina veya toplanan/satılan ürün küpü için group.traverse() ile tüm çocuk nesnelerin geometry.dispose() ve material.dispose() çağrıları yapılmalıdır:
   `javascript
   destroy() {
     if (this.group) {
       this.group.traverse(obj => {
         if (obj.geometry) obj.geometry.dispose();
         if (obj.material) {
           if (Array.isArray(obj.material)) obj.material.forEach(m => m && m.dispose && m.dispose());
           else if (obj.material.dispose) obj.material.dispose();
         }
       });
       if (this.scene) this.scene.remove(this.group);
     }
   }
   `
2. **Karakter Ayrılışında Eksiksiz Temizlik**:
   - CustomerAI veya diğer NPC'ler mağazadan ayrıldığında (c.isFinished), kafa üzeri HTML konuşma balonu (c.bubbleEl), 3D rozeti ve karakter modeli sahneden ve DOM'dan tamamen sökülmelidir.
3. **Animasyon ve Interval Ebeveyn Kontrolü**:
   - ddItem() veya benzeri görsel animasyonlarda kullanılan setInterval veya zamanlayıcılar, ebeveyn nesne koptuğunda (if (!mesh.parent) { clearInterval(id); return; }) anında kendini sonlandırmalıdır. Yetim interval bırakılamaz.

---

## 2. Input Focus ve Klavye Olayı Yalıtımı (UX CRITICAL)

1. **Girdi Alanı Koruması (Input Isolation)**:
   - Oyuncu bir metin kutusuna (<input>, <textarea>) yazı yazarken oyunun küresel kısayol tuşları (KeyM, KeyH, Tab vb.) **ASLA tetiklenmemelidir**:
   `javascript
   window.addEventListener('keydown', (e) => {
     const isTyping = e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA');
     if (isTyping) {
       if (e.code === 'Escape') e.target.blur();
       return; // Oyun kısayollarını ve e.preventDefault'u çalıştırma!
     }
     // ... Normal oyun kontrolleri ...
   });
   `
2. **Escape ile Kapatma Standardı**:
   - Oyundaki tüm modallar (#neighborhood-modal, #wiki-modal, #management-modal, #day-choice-modal), klavyedeki Escape tuşuna basıldığında kapanmalıdır.

---

## 3. Ekonomik Denge ve Exploit Koruma Standardı

1. **Bedelsiz Kademe/Bonus Yasağı**:
   - Marka kademesi (Brand Quality Tier) veya üretim çarpanı yükseltmeleri oyuncuya asla sıfır maliyetle verilemez.
   - Her yükseltme Coin maliyeti (canUpgradeBrandTier) ve satış adedi/itibar şartı taşımak zorundadır (ör. Ekonomi: 0 Coin, Zanaat: 150 Coin / 5 satış, Premium: 500 Coin / 15 satış / Lv 3 itibar).
2. **Makine Kapasite ve Taşma Koruması**:
   - Dönüştürme makinelerinde (ToastMachine, JamCauldron) hammadde girişleri kapasite sınırına (current < capacity) ve oyuncunun envanterindeki pozitif mevcuda göre denetlenmelidir. Negatif girdi ve çift tıklama istismarlarına karşı soğuma süresi (harvestCooldown) uygulanmalıdır.
3. **Veri Anahtarı Uyumluluğu (Property Normalization)**:
   - Konfigürasyon nesnelerinde colorHex ve color gibi alternatif isimlendirmeler randConfig.colorHex || brandConfig.color || '#FFE600' şeklinde savunmacı yaklaşımla karşılanmalıdır.

---

## 4. Test Bütünlüğü ve Regresyon Sıfır Toleransı

1. **17 Test Takımının Korunması**:
   - 
ode tests/*.test.js altında çalışan tüm test takımları her değişiklikten sonra %100 geçmelidir.
2. **Her Yeni Özellik İçin Birim Testi**:
   - Eklenen her yeni mekanik (atölye, dönüştürme, itibar vb.) için 	ests/ altına en az bir doğrulama testi yazılmalı ve CI/test döngüsüne katılmalıdır.
