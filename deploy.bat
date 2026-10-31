@echo off
echo ビルド・デプロイを開始します...

cd /d "C:\Users\jiana\Documents\Kantei-System\meishiki-site"

echo ビルド中...
call npm run build

echo デプロイ中...
call npm run deploy

echo 完了しました！
pause