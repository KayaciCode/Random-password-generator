document.addEventListener('DOMContentLoaded', () => {
  const lengthSlider = document.getElementById('length');
  const lengthValue = document.getElementById('length-value');
  const passwordInput = document.getElementById('password');
  const passwordNameInput = document.getElementById('password-name');
  const uppercaseCheckbox = document.getElementById('uppercase');
  const lowercaseCheckbox = document.getElementById('lowercase');
  const numbersCheckbox = document.getElementById('numbers');
  const symbolsCheckbox = document.getElementById('symbols');
  const passwordList = document.getElementById('password-list');

  const generateBtn = document.getElementById('generate-btn');
  const copyBtn = document.querySelector('.copy-btn');
  const saveBtn = document.getElementById('save-btn');

  console.log('Popup script yüklendi.');

  // Sabit karakter setleri
  const CHAR_SETS = {
    UPPERCASE: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    LOWERCASE: 'abcdefghijklmnopqrstuvwxyz',
    NUMBERS: '0123456789',
    SYMBOLS: '!@#$%^&*()_+[]{}|;:,.<>?[]{}`~' // Daha fazla sembol ekledim
  };

  // --- Olay Dinleyicileri (Event Listeners) ---
  lengthSlider.addEventListener('input', () => {
    lengthValue.textContent = lengthSlider.value;
  });

  generateBtn.addEventListener('click', generatePassword);
  copyBtn.addEventListener('click', copyPassword);
  saveBtn.addEventListener('click', savePassword);

  // --- Fonksiyon Tanımlamaları ---

  function generatePassword() {
    console.log('generatePassword çağrıldı.');
    const length = parseInt(lengthSlider.value);
    const includeUppercase = uppercaseCheckbox.checked;
    const includeLowercase = lowercaseCheckbox.checked;
    const includeNumbers = numbersCheckbox.checked;
    const includeSymbols = symbolsCheckbox.checked;

    let characters = '';
    if (includeUppercase) characters += CHAR_SETS.UPPERCASE;
    if (includeLowercase) characters += CHAR_SETS.LOWERCASE;
    if (includeNumbers) characters += CHAR_SETS.NUMBERS;
    if (includeSymbols) characters += CHAR_SETS.SYMBOLS;

    if (characters === '') {
      alert('Lütfen en az bir karakter türü seçin!');
      passwordInput.value = ''; // Seçilmezse şifre alanını temizle
      console.warn('Karakter türü seçilmedi.');
      return;
    }

    let password = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      password += characters[randomIndex];
    }

    passwordInput.value = password;
    console.log('Şifre oluşturuldu:', password);
  }

  async function copyPassword() {
    try {
      if (!passwordInput.value) {
        alert('Kopyalanacak şifre yok!');
        console.warn('Kopyalanacak şifre yok.');
        return;
      }
      await navigator.clipboard.writeText(passwordInput.value);
      alert('Şifre panoya kopyalandı!');
      console.log('Şifre kopyalandı:', passwordInput.value);
    } catch (err) {
      console.error('Kopyalama hatası:', err);
      alert('Şifre kopyalanamadı. Lütfen manuel kopyalayın.');
    }
  }

  async function savePassword() {
    try {
      const name = passwordNameInput.value.trim();
      const password = passwordInput.value;

      if (!name) {
        alert('Lütfen şifre için bir isim girin!');
        console.warn('Şifre adı girilmedi.');
        return;
      }
      if (!password) {
        alert('Önce bir şifre oluşturun!');
        console.warn('Şifre oluşturulmadı.');
        return;
      }

      let savedPasswords = await new Promise(resolve => {
        chrome.storage.local.get(['passwords'], result => {
          resolve(result.passwords || []);
        });
      });

      // Aynı isimde şifre varsa güncelle (veya kullanıcıya sor)
      const existingPasswordIndex = savedPasswords.findIndex(item => item.name === name);
      if (existingPasswordIndex > -1) {
        if (confirm(`"${name}" adlı bir şifre zaten var. Üzerine yazılsın mı?`)) {
          savedPasswords[existingPasswordIndex] = { name, password, id: savedPasswords[existingPasswordIndex].id };
        } else {
          return; // Kullanıcı iptal etti
        }
      } else {
        savedPasswords.push({ name, password, id: Date.now() }); // Benzersiz ID ekle
      }

      await new Promise(resolve => {
        chrome.storage.local.set({ passwords: savedPasswords }, () => {
          resolve();
        });
      });

      alert('Şifre kaydedildi!');
      console.log('Şifre kaydedildi:', { name, password });
      passwordNameInput.value = '';
      loadSavedPasswords(); // Listeyi güncelle
    } catch (err) {
      console.error('Kaydetme hatası:', err);
      alert('Şifre kaydedilemedi. Lütfen konsolu kontrol edin.');
    }
  }

  async function loadSavedPasswords() {
    try {
      const passwords = await new Promise(resolve => {
        chrome.storage.local.get(['passwords'], result => {
          resolve(result.passwords || []);
        });
      });

      passwordList.innerHTML = ''; // Listeyi temizle

      if (passwords.length === 0) {
        passwordList.innerHTML = '<p style="text-align: center; color: #888;">Henüz kaydedilmiş şifre yok.</p>';
        return;
      }

      passwords.forEach((item) => { // artık index'e değil item.id'ye göre işlem yapacağız
        const div = document.createElement('div');
        div.className = 'password-item';
        div.setAttribute('data-id', item.id); // Her öğeye ID ata

        const nameSpan = document.createElement('span');
        nameSpan.className = 'password-name';
        nameSpan.textContent = item.name + ': ';
        div.appendChild(nameSpan);

        const passwordSpan = document.createElement('span');
        passwordSpan.className = 'password-hidden';
        passwordSpan.textContent = '****'; // Başlangıçta gizli
        passwordSpan.style.cursor = 'pointer'; // Tıklanabilir olduğunu belirt
        passwordSpan.addEventListener('click', () => {
          // Şifre görünürlüğünü aç/kapa
          if (passwordSpan.textContent === '****') {
            passwordSpan.textContent = item.password;
            passwordSpan.style.color = '#333'; // Açık şifre rengi
          } else {
            passwordSpan.textContent = '****';
            passwordSpan.style.color = '#777'; // Gizli şifre rengi
          }
        });
        div.appendChild(passwordSpan);

        const copySavedButton = document.createElement('button');
        copySavedButton.className = 'copy-saved-btn tooltip';
        copySavedButton.textContent = 'Kopyala';
        const tooltipSpan = document.createElement('span');
        tooltipSpan.className = 'tooltiptext';
        tooltipSpan.textContent = 'Şifreyi panoya kopyala';
        copySavedButton.appendChild(tooltipSpan);
        copySavedButton.addEventListener('click', () => copySavedPassword(item.password));
        div.appendChild(copySavedButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Sil';
        deleteButton.addEventListener('click', () => deletePassword(item.id)); // ID'ye göre sil
        div.appendChild(deleteButton);

        passwordList.appendChild(div);
      });
      console.log('Kaydedilen şifreler yüklendi:', passwords.length);
    } catch (err) {
      console.error('Şifre yükleme hatası:', err);
      alert('Kaydedilen şifreler yüklenemedi.');
    }
  }

  async function copySavedPassword(passwordToCopy) { // Parametre olarak şifreyi al
    try {
      await navigator.clipboard.writeText(passwordToCopy);
      alert('Kaydedilen şifre panoya kopyalandı!');
      console.log('Kaydedilen şifre kopyalandı.');
    } catch (err) {
      console.error('Kopyalama hatası:', err);
      alert('Şifre kopyalanamadı. Lütfen manuel kopyalayın.');
    }
  }

  async function deletePassword(idToDelete) { // ID'ye göre sil
    try {
      let passwords = await new Promise(resolve => {
        chrome.storage.local.get(['passwords'], result => {
          resolve(result.passwords || []);
        });
      });

      const initialLength = passwords.length;
      passwords = passwords.filter(item => item.id !== idToDelete); // ID'ye göre filtrele

      if (passwords.length === initialLength) {
        alert('Silinecek şifre bulunamadı!');
        console.warn('Silinecek şifre bulunamadı:', idToDelete);
        return;
      }

      await new Promise(resolve => {
        chrome.storage.local.set({ passwords }, () => {
          resolve();
        });
      });

      alert('Şifre silindi!');
      console.log('Şifre silindi:', idToDelete);
      loadSavedPasswords(); // Listeyi güncelle
    } catch (err) {
      console.error('Silme hatası:', err);
      alert('Şifre silinemedi. Lütfen konsolu kontrol edin.');
    }
  }

  // Eklenti yüklendiğinde şifre oluştur ve kaydedilen şifreleri yükle
  generatePassword();
  loadSavedPasswords();
});