#!/bin/bash

# Chrome拡張機能をパッケージ化するためのスクリプト

# 現在のディレクトリ名を取得
DIR_NAME=$(basename "$PWD")

# ファイル名の設定
ZIP_NAME="${DIR_NAME}.zip"

# スクリプトの実行ディレクトリを確認
if [ ! -f "manifest.json" ]; then
    echo "エラー: manifest.jsonが見つかりません。"
    echo "拡張機能のルートディレクトリで実行してください。"
    exit 1
fi

echo "Chrome拡張機能のパッケージ化を開始します..."

# 以前のZIPファイルがあれば削除
if [ -f "$ZIP_NAME" ]; then
    echo "既存の $ZIP_NAME を削除します..."
    rm "$ZIP_NAME"
fi

# アイコンが存在するか確認
if [ ! -f "images/icon16.png" ] || [ ! -f "images/icon32.png" ] || [ ! -f "images/icon48.png" ] || [ ! -f "images/icon128.png" ]; then
    echo "警告: 一部のアイコンファイルが見つかりません。"
    echo "Chrome ウェブストアに公開する前に、すべてのサイズのアイコンを用意してください。"
fi

# ZIPファイルの作成
echo "ファイルをパッケージ化しています..."
zip -r "$ZIP_NAME" * -x "*.git*" -x "*.DS_Store" -x "*.zip" -x "*.sh" -x "dist/*" -x "node_modules/*"

# 成功メッセージ
if [ $? -eq 0 ]; then
    echo "パッケージ化が完了しました: $ZIP_NAME"
    echo ""
    echo "このZIPファイルをChrome ウェブストア デベロッパーダッシュボードにアップロードできます。"
    echo "詳細な手順については PUBLISHING.md を参照してください。"
else
    echo "エラー: パッケージ化に失敗しました。"
    exit 1
fi
