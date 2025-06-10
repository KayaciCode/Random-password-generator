# Rastgele Şifre Oluşturucu Chrome Eklentisi

Bu, güçlü ve güvenli rastgele şifreler oluşturmanıza ve kaydetmenize olanak tanıyan basit ama etkili bir Chrome tarayıcı eklentisidir. Oluşturulan şifreleri panonuza kopyalayabilir ve daha sonra kolayca erişmek için kaydedebilirsiniz.

## Özellikler

* **Ayarlanabilir Şifre Uzunluğu:** 8 ile 50 karakter arasında şifre uzunluğunu ayarlayabilirsiniz.
* **Karakter Tipi Seçimi:** Şifrelerinizin büyük harfler, küçük harfler, sayılar ve semboller içermesini sağlayabilirsiniz.
* **Anında Şifre Üretimi:** "Şifre Oluştur" düğmesine tıklayarak anında yeni bir şifre üretebilirsiniz.
* **Tek Tıkla Kopyalama:** Oluşturulan şifreyi tek bir tıklamayla panonuza kopyalayabilirsiniz.
* **Şifre Kaydetme:** Oluşturduğunuz şifreleri özel bir isimle kaydedebilir ve daha sonra erişebilirsiniz.
* **Kaydedilen Şifreleri Listeleme:** Kaydedilmiş tüm şifrelerinizi eklenti arayüzünde liste halinde görebilirsiniz.
* **Kaydedilen Şifreleri Kopyalama ve Silme:** Kaydedilen şifreleri listeden doğrudan kopyalayabilir veya silebilirsiniz.
* **Sağ Tıklama Menüsü Entegrasyonu:** Tarayıcınızda herhangi bir yerde sağ tıklayarak eklentiyi kolayca açabilirsiniz.
* **Kullanıcı Dostu Arayüz:** Modern ve karanlık temalı temiz bir kullanıcı arayüzüne sahiptir.

## Kurulum

Bu eklentiyi Chrome tarayıcınıza yüklemek için aşağıdaki adımları izleyin:

1.  Bu depoyu bilgisayarınıza indirin veya klonlayın.
2.  Chrome tarayıcınızı açın.
3.  Adres çubuğuna `chrome://extensions` yazın ve Enter tuşuna basın.
4.  Sağ üst köşedeki "Geliştirici modu" (Developer mode) anahtarını açın.
5.  "Paketlenmemiş öğe yükle" (Load unpacked) düğmesine tıklayın.
6.  İndirdiğiniz veya klonladığınız proje klasörünü seçin (örneğin, `Random-password-generator-92ea42bc3ba644bda0276e4e2331acf56a70ff04`).
7.  Eklenti başarıyla yüklenecektir. Tarayıcınızın araç çubuğunda eklenti simgesini görmelisiniz.

## Kullanım

1.  **Eklentiyi Açma:**
    * Tarayıcı araç çubuğundaki **Rastgele Şifre Oluşturucu** simgesine tıklayın.
    * Veya herhangi bir web sayfasında sağ tıklayıp "Şifre Oluşturucu Aç" seçeneğini seçin.

2.  **Şifre Oluşturma:**
    * "Şifre Uzunluğu" kaydırıcısını kullanarak şifre uzunluğunu ayarlayın.
    * İstediğiniz karakter tiplerini seçmek için onay kutularını kullanın (Büyük Harfler, Küçük Harfler, Sayılar, Semboller).
    * "Şifre Oluştur" düğmesine tıklayın. Oluşturulan şifre "Şifre" alanında görünecektir.

3.  **Şifreyi Kopyalama:**
    * Oluşturulan şifrenin yanındaki "Kopyala" düğmesine tıklayarak şifreyi panonuza kopyalayabilirsiniz.

4.  **Şifreyi Kaydetme:**
    * "Şifre Adı" alanına kaydetmek istediğiniz şifre için bir isim girin (örneğin, "E-posta Şifresi").
    * "Şifreyi Kaydet" düğmesine tıklayın.
    * Eğer aynı isimde bir şifre zaten varsa, üzerine yazma onayı istenecektir.

5.  **Kaydedilen Şifreleri Yönetme:**
    * "Kaydedilen Şifreler" bölümünde tüm kayıtlı şifrelerinizi görebilirsiniz.
    * Kaydedilen şifrenin yanında bulunan "Kopyala" düğmesine tıklayarak o şifreyi panoya kopyalayabilirsiniz.
    * Kaydedilen şifrenin yanında bulunan "Sil" düğmesine tıklayarak o şifreyi listeden kaldırabilirsiniz.
    * Kaydedilen şifreleri varsayılan olarak gizlenir (\*\*\*\* şeklinde gösterilir). Şifrenin üzerine tıklayarak şifreyi görünür hale getirebilir ve tekrar tıklayarak gizleyebilirsiniz.

## Proje Yapısı

* `manifest.json`: Eklentinin adı, sürümü, açıklaması, izinleri ve pop-up HTML dosyası gibi temel yapılandırma bilgilerini içerir.
* `index.html`: Eklenti pop-up'ının kullanıcı arayüzünü (HTML yapısını) tanımlar.
* `script.js`: Şifre oluşturma mantığı, kopyalama işlevselliği, şifreleri kaydetme ve yükleme gibi tüm etkileşimli işlevleri yöneten JavaScript kodunu içerir.
* `background.js`: Eklentinin arka plan betiğidir. Sağ tıklama menüsü oluşturma ve pop-up'ı açma gibi arka plan görevlerini yerine getirir.
* `.gitignore`: Git versiyon kontrol sistemi tarafından izlenmeyecek dosyaları ve klasörleri belirtir.
* `icons/`: Eklenti için kullanılan simgeleri içerir.

## Geliştirme Notları

* Eklenti, tarayıcı depolamasını (`chrome.storage.local`) kullanarak şifreleri yerel olarak kaydeder. Bu, şifrelerin sadece sizin cihazınızda saklandığı anlamına gelir.
* Kopyalama işlevi `navigator.clipboard.writeText()` API'sini kullanır ve `clipboardWrite` izni gerektirir.
* Sağ tıklama menüsü için `contextMenus` izni kullanılır.
* Şifre listesinde, kaydedilen her şifreye benzersiz bir `id` atanır, bu da şifrelerin doğru bir şekilde yönetilmesini (silinmesini/güncellenmesini) sağlar.
* Güvenlik amacıyla, kaydedilen şifreler başlangıçta gizlenmiş olarak gösterilir (\*\*\*\*) ve üzerine tıklanarak açılır/kapanır.
