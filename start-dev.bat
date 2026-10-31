@echo off
echo ローカルサーバーを起動します...

cd /d "C:\Users\jiana\Documents\Kantei-System\meishiki-site"

echo ブラウザを開きます...
start http://localhost:5173/

call npm run dev