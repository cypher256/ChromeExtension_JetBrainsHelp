// JetBrainsヘルプサイト上でのコンテンツスクリプト
(function() {
  // ページ上部に言語切替ボタンを追加する
  function addLanguageSwitchButton() {
    // 既にボタンが存在する場合は追加しない
    if (document.getElementById('language-switch-btn')) {
      return;
    }

    // 現在のURLから言語を判定
    const isJapanese = window.location.hostname.includes('pleiades.io');
    
    // サイトに基づいて最適な位置を決定
    const positionRight = calculateOptimalPosition();
    
    // リンク作成
    const link = document.createElement('a');
    link.id = 'language-switch-btn';
    link.textContent = isJapanese ? 'English' : '日本語';
    
    // URLを設定
    const currentUrl = window.location.href;
    const pathAfterHelp = currentUrl.split('/help/')[1];
    if (isJapanese) {
      link.href = `https://www.jetbrains.com/help/${pathAfterHelp}`;
    } else {
      link.href = `https://pleiades.io/help/${pathAfterHelp}`;
    }
    
    // インラインスタイル設定
    link.style.cssText = `
      position: fixed;
      top: 0;
      right: ${positionRight}px;
      z-index: 9999;
      padding: 2px 6px;
      background-color: #5C6BC0;
      color: white;
      border: none;
      border-bottom-left-radius: 3px;
      border-bottom-right-radius: 3px;
      font-size: 11px;
      cursor: pointer;
      opacity: 0.85;
      box-shadow: 0 1px 2px rgba(0,0,0,0.2);
      transition: all 0.2s ease;
      text-decoration: none;
      display: inline-block;
    `;
    
    // ホバー効果
    link.addEventListener('mouseover', function() {
      this.style.opacity = '1';
      this.style.backgroundColor = '#3F51B5';
    });
    
    link.addEventListener('mouseout', function() {
      this.style.opacity = '0.85';
      this.style.backgroundColor = '#5C6BC0';
    });
    
    // 左クリック処理（現在のタブで開く）
    link.addEventListener('click', function(e) {
      if (e.button === 0 && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        window.location.href = this.href;
      }
    });
    
    // 本体にリンク追加
    document.body.appendChild(link);
  }

  // サイトに基づいて最適な位置を計算
  function calculateOptimalPosition() {
    // デフォルト位置
    let rightPosition = 20;
    
    // サイト特有の要素を検出して位置を調整
    const hostname = window.location.hostname;
    
    if (hostname.includes('pleiades.io')) {
      // pleiadesサイトの場合の位置調整
      const headerRight = document.querySelector('.header-right');
      if (headerRight) {
        rightPosition = 80; // 右端の要素を避ける
      }
    } else if (hostname.includes('jetbrains.com')) {
      // jetbrainsサイトの場合の位置調整
      const headerActions = document.querySelector('.js-header-actions');
      if (headerActions) {
        rightPosition = 100; // ヘッダーアクションを避ける
      }
    }
    
    // ビューポート幅に応じて調整
    const viewportWidth = window.innerWidth;
    if (viewportWidth < 768) { // モバイルサイズ
      rightPosition = Math.max(10, rightPosition - 10);
    }
    
    return rightPosition;
  }

  // ページ読み込み完了時にボタン追加
  if (document.readyState === 'complete') {
    addLanguageSwitchButton();
  } else {
    window.addEventListener('load', addLanguageSwitchButton);
  }
  
  // ウィンドウサイズ変更時にリンク位置を再調整
  window.addEventListener('resize', function() {
    const link = document.getElementById('language-switch-btn');
    if (link) {
      link.style.right = `${calculateOptimalPosition()}px`;
    }
  });
})();
