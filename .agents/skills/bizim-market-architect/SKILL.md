---
name: bizim-market-architect
description: Bizim Market projesi için özel orkestrasyon yeteneği. Kısa komutları devasa bir mimari iş akışına çevirir, bağlam toplar, tasarımı (Neo-brutalist/3D Voxel) hizalar, bellek/Nav mesh hatalarını önceden denetler ve test etmeden işi bırakmaz.
---

# Bizim Market Deep Planner & Architect (V2)

## Genel Bakış (Overview)
Bu "Skill", kullanıcının verdiği çok kısa, yüzeysel veya sığ komutları (örn: "Reyon ekle", "Kasiyeri değiştir") alır ve bunları **Bizim Market** projesinin katı kurallarına (bkz: `AGENTS.md`) uyan, uçtan uca tasarlanmış, test edilmiş, hatasız bir iş akışına (workflow) dönüştürür.

Kullanıcı `/bizim-market-architect [komut]` yazdığında, doğrudan koda dalmak YASAKTIR. KESİNLİKLE aşağıdaki 6 aşamalı protokole uymak zorundasınız.

---

## Aşama 1: Bağlam Mühendisliği (Context Engineering) [CRITICAL]
Hiçbir mantık kurmadan önce proje kodlarını okuyun. KOD OKURKEN ŞU 3 KURALA UYUN:
1. **Minimum Viable Context (MVC):** `view_file` ile 5000 satırlık dosyaların tamamını okumayın. Yalnızca görevi ilgilendiren satır aralıklarını veya fonksiyonları okuyun. Hafızanızı (Context) gereksiz bilgiyle doldurmak yasaktır.
2. **Referans Şablon (Pattern Matching):** Kodu sıfırdan "uydurmayın". Projede (örn: `entities.js` içinde) halihazırda var olan benzer bir 3D obje veya etkileşim kodunu bulun ve onu referans şablon (Pattern) olarak kopyalayıp uyarlayın.
3. **Belirsizlik Yönetimi (Confusion Management):** Kullanıcının isteği ile mevcut kod veya `AGENTS.md` kuralları çelişiyorsa KOD YAZMAYI DURDURUN. Çelişkiyi kullanıcıya açıkça raporlayın ve seçenek sunun (Sessizce tahmin etmek/halüsinasyon görmek YASAKTIR).

---

## Aşama 2: Komutu Derinleştirme (Deepening)
Sığ isteği teknik detaylara genişletin.
1. **Görsel/Fiziksel Kapsam:** Eklenen nesnenin 3D model (BoxGeometry) sınırları nedir?
2. **Çarpışma (Collision):** AABB çarpışma kutuları `entities.js` içerisine nasıl eklenecek?
3. **Etkileşim (Interaction):** Bu nesneye tıklandığında açılacak bir arayüz (UI) var mı?

---

## Aşama 3: Tasarım Hizalama (Design Alignment)
Projenin temel kurallarını zorunlu kılın:
- **Neo-Brutalist UI:** Arayüz eklenecekse, kesinlikle `border-radius: 0`, kalın siyah çerçeve, sert gölge içermelidir.
- **Emoji Yasak:** Arayüz veya model metinlerinde asla emoji kullanılamaz, sadece ASCII (örn: [X]) veya SVG.
- **3D Düşük Poligon:** Küre, silindir gibi yumuşak objeler kullanılamaz, her şey kübik/blokludur.

---

## Aşama 4: Risk ve Etki Analizi (Threat Model & Blast Radius)
Olası Hataları (Failure Modes) denetleyin:
- **Etki Alanı (Blast Radius):** Bu yeni kod projenin başka bir yerini bozar mı?
- **Memory Leak (VRAM Sızıntısı):** Bir nesne kaldırılacaksa `dispose()` çağrılıyor mu? Sahneden silinen materyaller temizleniyor mu?
- **Rota Çakışması (Navigation Mesh):** Eklenen yeni nesnenin koordinatları (X, Z), NPC'lerin yürüyüş yollarını tıkıyor mu?
- **Odak (Input Focus):** Eğer bir input eklendiyse, Escape tuşu veya Tab tuşu oyunun kısayollarını bozuyor mu?

### Aşama 4.1: Geçmiş Proje Hatalarından Dersler (Lessons Learned)
Bu projede geçmişte yaşanan ve **asla tekrarlanmaması gereken** kritik buglar şunlardır:
1. **Görünmez Çarpışma Kutuları (Missing AABB):** `this.addDecorCollider()` fonksiyonu çağrılmadığı için oyuncuların objelerin içinden geçmesi.
2. **Duvar ve Nesne İç İçe Geçmesi (Z-Fighting / Clipping):** Koordinat hesaplarken objenin merkeze olan genişliğini/derinliğini unutmak.
3. **Kapı / NPC Engelleme (Entrance Blocking):** Market Girişi veya yürüyüş yollarına katı model ekleyip sistemi kilitlemek.

---

## Aşama 5: Uygulama (Execution)
Yukarıdaki 4 aşamadan başarıyla geçtikten sonra, yapacağınız değişiklikleri kullanıcıya bir özet olarak sunun ve kod değişikliklerini uygulayın.

---

## Aşama 6: Kanıta Dayalı Doğrulama ve Geri Alma (Verification & Rollback) [CRITICAL]
Kodu yazıp işi bırakamazsınız!
1. Değişiklikten sonra ZORUNLU olarak terminalde `node tests/*.test.js` komutunu çalıştırın.
2. Eğer testler hata verirse (FAIL), başarılı olduğunu iddia ETMEK YASAKTIR. 
3. Hatanın loglarını analiz edip kendi kodunuzu geri alın (rollback) veya hatayı giderin. İşlem ancak tüm testler %100 başarılı olduğunda tamamlanmış sayılır.
