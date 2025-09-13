// Base64エンコードされた画像データからPNGを作成するスクリプト

// 簡易的なアイコンデータ (16x16)
const icon16Data = "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MjhFNUZBNEQyQzJFMTFFQkEzODVCM0YyOTlCNzdFNTEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MjhFNUZBNEUyQzJFMTFFQkEzODVCM0YyOTlCNzdFNTEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoyOEU1RkE0QjJDMkUxMUVCQTM4NUIzRjI5OUI3N0U1MSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoyOEU1RkE0QzJDMkUxMUVCQTM4NUIzRjI5OUI3N0U1MSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PjT01SgAAAGeSURBVHjaYmSgAmBhYWFgZmZmYGJiYrh37x4DNze3PrYwJni79i2Dj48Pg7GxMcPNmzcZODg45IG4Fqjmf1pSkgGrAQcPHmSQkpJiePfuHcPr168ZlJSUGJSVlRmuXr2qFh0dvXojI+MZRnQDNm3axCAsLMzAzc0NMuj///9A7xQzGBgYMJw/f57h4cOHDFxcXAzoCpDxvXv3GHh4eBiAYQYW//PnD8OPHz8YXr16xXDu3DmG9+/fM/z9+5fh0KFD/3EN+P37NwMo8EF+B2EQBhmEbAioxki9c+cOw7dv3xiqq6v/EwywP3/+MCBHLbIhyJqfPHnCAAprUOQhA1DWAI4NdEPQwxQZg7zz9etXhpcvXzIAIxocVHC/oyuABRgyAKUQUPCA4gGbeoIGgFwC8hfIErB/oaaS5gd0jbBsgyv6QQFLjAEgDdh8ji0M4GGAqwChRA3CHBwcDH/+/AEn9OvXr/9XV1dPIVgWoqcJUL4HuQkUkSAsKirKBE7KWAI4AKgxGpjsGEECXFxc/6WkpP6DYgLE3r59O4MmJycfLsMBAgwAnlCV5rxyIrYAAAAASUVORK5CYII=";

// 同様にして他のサイズ用のデータも作成（実際は同じものを拡大縮小して使用）
const icon32Data = icon16Data;  // 実際には適切なサイズのデータを用意すべき
const icon48Data = icon16Data;
const icon128Data = icon16Data;

// Base64からBlobを生成
function base64ToBlob(base64, mime) {
  const byteString = atob(base64);
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  
  return new Blob([ab], {type: mime});
}

// ファイルシステムにアイコンを保存
async function saveIcons() {
  try {
    // icon16.png
    const blob16 = base64ToBlob(icon16Data, 'image/png');
    const fileHandle16 = await window.showSaveFilePicker({
      suggestedName: 'icon16.png',
      types: [{
        description: 'PNG Image',
        accept: {'image/png': ['.png']}
      }]
    });
    const writable16 = await fileHandle16.createWritable();
    await writable16.write(blob16);
    await writable16.close();
    
    // 同様に他のサイズのアイコンも保存
    // ...
    
    console.log('Icons saved successfully!');
  } catch (err) {
    console.error('Error saving icons:', err);
  }
}

// このスクリプトはブラウザ環境で実行する必要があります
