# Antigravity - Patent Claim Chart Generator

Antigravity 是一個自動化生成專利權利要求圖表 (Patent Claim Chart) 的工具。它包含 React 前端、FastAPI 後端以及一個用於抓取 Google Patents 資料的瀏覽器擴充功能。

## 專利架構

- **Frontend**: React + Vite + Tailwind (選配)
- **Backend**: Python FastAPI (處理 PDF 解析、權利要求分析與 PPTX 生成)
- **Extension**: Chrome Extension (用於 Google Patents 頁面資料導入)

---

## 本地開發指南

### 1. 後端 (Backend)
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

### 2. 前端 (Frontend)
```bash
cd frontend
npm install
npm run dev
```

### 3. 瀏覽器擴充功能 (Extension)
1. 打開 Chrome 並進入 `chrome://extensions/`
2. 開啟「開發者模式」
3. 點擊「載入未封裝項目」，選擇 `extension` 資料夾

---

## CI/CD 部署與自動化 (GitHub Actions)

本專案已配置 GitHub Actions (`.github/workflows/main.yml`)，提供以下自動化流程：

### 自動化檢查
- **Frontend**: 每次 Push 會執行 `npm run lint` 與 `npm run build` 確認程式碼品質與建置成功。
- **Backend**: 執行 `flake8` 靜態掃描，檢查語法錯誤與程式碼風格。

### 部署引導
如果您想要將專案部署上線，請參考以下步驟：

#### 前端部署 (推薦 GitHub Pages / Vercel)
若要使用 GitHub Actions 自動部署到 GitHub Pages：
1. 取消 `.github/workflows/main.yml` 中 `deploy` 任務下 GitHub Pages 步驟的註釋。
2. 在 GitHub Repo 中設定 `Settings > Pages > Build and deployment > Source` 為 `GitHub Actions`。

#### 後端部署 (推薦 Render / Fly.io / VPS)
1. **Render**: 可以在 Render 儀表板連接 GitHub Repo，設定 Build Command 為 `pip install -r requirements.txt`，Start Command 為 `uvicorn main:app --host 0.0.0.0 --port $PORT`。
2. **VPS (SSH)**: 您可以擴充 GitHub Actions，使用 `appleboy/ssh-action` 登入您的伺服器並執行 `git pull` 與重啟服務。

## 環境變數
- `backend/.env`: 用於存放 API Key 或其他敏感資訊。
- GitHub Secrets: 若在 GitHub Actions 中需要存取敏感資訊，請在 Repo Settings 設置 `ENV_VARS`。
