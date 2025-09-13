// バックグラウンドスクリプト
chrome.runtime.onInstalled.addListener(function() {
  console.log('JetBrains オンラインヘルプ英語日本語切り替え インストール完了');

  // contextMenus権限が必要なので、manifest.jsonに追加する必要があります
  if (chrome.contextMenus) {
    // インストール時にコンテキストメニュー項目を追加
    chrome.contextMenus.create({
      id: 'switchToJapanese',
      title: '日本語ヘルプに切り替え',
      contexts: ['page'],
      documentUrlPatterns: ['https://www.jetbrains.com/help/*']
    });

    chrome.contextMenus.create({
      id: 'switchToEnglish',
      title: 'Switch to English Help',
      contexts: ['page'],
      documentUrlPatterns: ['https://pleiades.io/help/*']
    });
  }
});

// コンテキストメニューがクリックされた時の処理
if (chrome.contextMenus) {
  chrome.contextMenus.onClicked.addListener(function(info, tab) {
    const currentUrl = tab.url;
    const pathAfterHelp = currentUrl.split('/help/')[1];
    
    let newUrl;
    if (info.menuItemId === 'switchToJapanese') {
      newUrl = `https://pleiades.io/help/${pathAfterHelp}`;
    } else if (info.menuItemId === 'switchToEnglish') {
      newUrl = `https://www.jetbrains.com/help/${pathAfterHelp}`;
    }
    
    if (newUrl) {
      chrome.tabs.update(tab.id, {url: newUrl});
    }
  });
}
