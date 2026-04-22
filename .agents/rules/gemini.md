# Antigravity 通用工程規則（Rules）

## 一、語言與輸出約定

* 所有回復、說明、注釋、文檔 **必須使用繁體中文**
* 代碼中的識別字保持英文
* 錯誤資訊、日誌內容允許為英文


## 二、技術預設約定

* 前端：預設使用 **React + TypeScript**
* 後端：預設使用 **Python（優先 FastAPI）**
* 若無特殊說明，均遵循以上技術選型


## 三、通用代碼規範

### 命名規範

* 變數 / 函數：camelCase
* 類 / 組件：PascalCase
* 常量：UPPER_SNAKE_CASE
* 文件 / 資料夾：kebab-case

命名應語義清晰，禁止隨意縮寫。


### 注釋規範（強制）

* 注釋用於解釋「為什麼這樣設計」，而不是代碼字面含義
* 複雜邏輯、業務判斷、邊界條件必須寫注釋
* 禁止無意義注釋

統一注釋標記：

```ts
// TODO: 待實現功能
// FIXME: 已知問題或潛在缺陷
// NOTE: 重要設計說明
// HACK: 臨時方案，後續必須重構
```

#### 函數注釋規範

前端（JSDoc）：

```ts
/**
 * 獲取使用者資訊
 * @param userId 用戶 ID
 * @returns 使用者資料
 */
```

後端（Python Docstring）：

```python
def get_user(user_id: str):
    """
    根據使用者 ID 獲取使用者資訊
    """
```


## 四、前端規範（React）

### 基本原則

* 使用函數元件，不使用類元件
* 單個組件只承擔單一職責
* 展示邏輯與業務邏輯分離
* 可複用邏輯必須抽離為自訂 Hook


### 命名約定

* 元件名使用 PascalCase
* 檔案名與組件名保持一致
* 自訂 Hook 必須以 `use` 開頭

```ts
function UserCard() {}
function useUserData() {}
```


### Hooks 使用規範

* 只能在函數元件或自訂 Hook 中調用
* 不允許在條件、迴圈中調用
* 一個 Hook 只處理一種職責


### Props 規範

* 必須使用 TypeScript 類型定義
* 使用解構方式接收 props
* 非必傳參數使用 `?`

```ts
interface UserCardProps {
  user: User
  onClick?: () => void
}
```


### 性能與結構要求

* 避免不必要的重複渲染
* 合理使用 useMemo / useCallback
* 列表渲染必須提供穩定的 key
* 大資料清單使用虛擬滾動
* 路由與組件支援懶載入


## 五、後端規範（Python）

### 基本要求

* Python ≥ 3.10
* 優先使用 FastAPI
* 所有函數與方法必須標注類型
* 禁止使用裸 `except`
* 禁止使用 `print` 作為日誌方式


### 分層結構（必須遵守）

* api：請求解析與回應封裝
* service：業務邏輯處理
* repository：資料庫訪問
* schema：請求 / 回應資料校驗
* model：ORM 模型定義

禁止在 api 層直接操作資料庫。


### 日誌規範

* 使用 logging 模組
* 合理區分日誌級別（DEBUG / INFO / WARNING / ERROR）
* 日誌中不得包含敏感資訊


## 六、安全規範（重點）

### 通用安全原則

* 永遠不信任用戶端輸入
* 所有輸入必須進行校驗
* 敏感操作必須經過身份與許可權校驗


### 前端安全

* 禁止使用 dangerouslySetInnerHTML
* 防止 XSS / CSRF 攻擊
* 不在前端存儲敏感資訊
* Token 推薦使用 HttpOnly Cookie


### 後端安全

* 使用 Pydantic 進行參數校驗
* 許可權校驗必須在 service 層完成
* 所有金鑰從環境變數中讀取

```python
import os
SECRET_KEY = os.getenv("SECRET_KEY")
```

* 敏感欄位返回前需脫敏
* 密碼等敏感性資料必須加密存儲


## 七、AI 協作使用規範

* 所有自動生成的代碼必須遵守本規則
* 生成結果應：

  * 結構清晰
  * 類型完整
  * 可維護
  * 安全
* 不生成不必要的複雜實現
