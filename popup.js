document.addEventListener('DOMContentLoaded', function() {
  const switchToJapaneseButton = document.getElementById('switchToJapanese');
  const switchToEnglishButton = document.getElementById('switchToEnglish');
  const statusElement = document.getElementById('status');

  // 現在のタブURLを取得し、リンクを更新する
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    const currentUrl = tabs[0].url;
    const isJetBrainsHelp = isJetBrainsHelpSite(currentUrl);

    if (isJetBrainsHelp) {
      const pathAfterHelp = currentUrl.split('/help/')[1];
      const isJapanese = currentUrl.includes('pleiades.io/help/');
      
      // リンクのhrefを設定
      switchToJapaneseButton.href = `https://pleiades.io/help/${pathAfterHelp}`;
      switchToEnglishButton.href = `https://www.jetbrains.com/help/${pathAfterHelp}`;
      
      // 現在の言語に応じて無効化
      if (isJapanese) {
        switchToJapaneseButton.classList.add('disabled');
      } else {
        switchToEnglishButton.classList.add('disabled');
      }
    } else {
      statusElement.textContent = 'JetBrains ヘルプサイトではありません';
      switchToJapaneseButton.classList.add('disabled');
      switchToEnglishButton.classList.add('disabled');
    }
  });

  // 日本語サイトへ切り替え
  switchToJapaneseButton.addEventListener('click', function(e) {
    if (this.classList.contains('disabled')) {
      e.preventDefault();
      return;
    }
    if (e.button === 0 && !e.ctrlKey && !e.metaKey) { // 通常の左クリック
      e.preventDefault();
      chrome.tabs.update({url: this.href});
    }
  });

  // 英語サイトへ切り替え
  switchToEnglishButton.addEventListener('click', function(e) {
    if (this.classList.contains('disabled')) {
      e.preventDefault();
      return;
    }
    if (e.button === 0 && !e.ctrlKey && !e.metaKey) { // 通常の左クリック
      e.preventDefault();
      chrome.tabs.update({url: this.href});
    }
  });

  // JetBrainsのヘルプサイトかどうかを判定
  function isJetBrainsHelpSite(url) {
    return url.includes('pleiades.io/help/') || 
           url.includes('jetbrains.com/help/');
  }
});
