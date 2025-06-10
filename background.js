try {
  chrome.runtime.onInstalled.addListener(() => {
    console.log('Eklenti yüklendi, sağ tıklama menüsü oluşturuluyor.');
    chrome.contextMenus.create({
      id: "openPasswordGenerator",
      title: "Şifre Oluşturucu Aç",
      contexts: ["all"]
    });
  });

  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "openPasswordGenerator") {
      console.log('Sağ tıklama menüsünden Şifre Oluşturucu açılıyor.');
      try {
        chrome.action.openPopup();
      } catch (err) {
        console.warn('openPopup desteklenmiyor, lütfen eklenti simgesine tıklayın:', err);
        alert('Şifre Oluşturucu açılmadı. Lütfen tarayıcı çubuğundaki eklenti simgesine tıklayın.');
      }
    }
  });
} catch (error) {
  console.error('Background script hatası:', error);
}