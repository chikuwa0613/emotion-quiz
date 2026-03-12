# 実装タスクリスト

## Milestone 1: プロジェクト基盤 + 計算ロジック

> **目標：** Next.jsプロジェクトを構築し、全占いの計算ロジックを実装する

### 1-1. プロジェクト初期化
- [ ] `npx create-next-app@latest` で Next.js + TypeScript + Tailwind CSS を初期化
- [ ] Tailwind カスタムテーマ設定（濃紺・金・白のカラーパレット）
- [ ] Noto Serif JP フォント設定（layout.tsx）
- [ ] `types/index.ts` — TypeScript インターフェース定義
  - `BirthDate`, `PalmLines`, `MBTIType`, `UserInput`
  - `SanmeigakuResult`, `FiveAnimalResult`, `PalmResult`, `MBTIResult`
  - `IntegratedResult`, `DiagnosisResult`

### 1-2. 算命学ロジック（`lib/sanmeigaku.ts`）
- [ ] 天干・地支の定数定義（10天干・12地支）
- [ ] 年の天干地支計算（立春2/4補正あり）
- [ ] 日干計算（ユリウス日変換）
- [ ] 月柱計算（月干支テーブル）
- [ ] 十大主星の特定ロジック（日干と各柱蔵干の関係）
- [ ] 主星10種の性格テキストデータ定義
- [ ] `calcSanmeigaku(birthDate: BirthDate): SanmeigakuResult` 関数

### 1-3. 5アニマル占いロジック（`lib/fiveAnimals.ts`）
- [ ] 年月ベース数テーブル定義（1930〜2010年 × 12ヶ月）
- [ ] 命数計算（ベース数 + 日付、60進）
- [ ] 命数 → 10動物タイプマッピングテーブル
- [ ] 10タイプの性格・恋愛・仕事テキストデータ定義
- [ ] `calcFiveAnimals(birthDate: BirthDate): FiveAnimalResult` 関数

### 1-4. 手相占いロジック（`lib/palmReading.ts`）
- [ ] 各線・各選択肢のキーワードマッピング定義
- [ ] 線の組み合わせによる総合分析ロジック
- [ ] `analyzePalmLines(palmLines: PalmLines): PalmResult` 関数

### 1-5. MBTIデータ（`lib/mbti.ts`）
- [ ] 16タイプの性格・恋愛・仕事テキストデータ定義
- [ ] `getMBTIResult(type: MBTIType): MBTIResult` 関数

### 1-6. 統合ロジック（`lib/integrate.ts`）
- [ ] 各占い結果からキーワード集約ロジック
- [ ] 統合人物像テンプレート定義（キーワード組み合わせパターン）
- [ ] 恋愛タイプ・仕事タイプの導出ロジック
- [ ] キャッチコピー生成ロジック
- [ ] `integrate(results: Omit<DiagnosisResult, 'integrated'>): IntegratedResult` 関数

---

## Milestone 2: UI コンポーネント + 入力画面

> **目標：** 美しい入力画面を実装し、ユーザーが快適にデータを入力できるようにする

### 2-1. グローバルスタイル
- [ ] `app/globals.css` — Tailwindベース + カスタムアニメーション定義
  - `@keyframes fadeInUp`（カードフェードイン）
  - `@keyframes glowPulse`（金色の輝きパルス）
  - `@keyframes starFloat`（ローディング演出）
  - `@keyframes revealText`（キャッチコピー演出）
- [ ] `app/layout.tsx` — メタタグ・フォント・背景設定

### 2-2. 入力フォームコンポーネント（`components/InputForm.tsx`）
- [ ] 生年月日セクション（年・月・日セレクト）
- [ ] 手相チェックリストセクション（各線をラジオボタン）
- [ ] MBTIドロップダウン（任意）
- [ ] フォームバリデーション（未入力チェック）
- [ ] 「診断する」ボタン（アニメーション付き）

### 2-3. 入力画面（`app/page.tsx`）
- [ ] タイトル・サブタイトル表示（神秘的なデザイン）
- [ ] InputForm コンポーネント配置
- [ ] フォーム送信 → URLクエリパラメータに変換 → `/result` へ遷移

---

## Milestone 3: 結果画面 + 仕上げ

> **目標：** ドラマチックな結果表示・シェア機能を実装し、完成度を高める

### 3-1. 結果カードコンポーネント（`components/ResultCard.tsx`）
- [ ] カード共通デザイン（金枠・半透明背景・影）
- [ ] 算命学カード（主星アイコン・天干地支・性格傾向）
- [ ] 5アニマルカード（動物絵文字・タイプ名・特性）
- [ ] 手相カード（各線キーワードバッジ・サマリー）
- [ ] MBTIカード（タイプ名・特性）
- [ ] 統合人物像カード（特大・最もドラマチック）
- [ ] 恋愛タイプ・仕事タイプカード
- [ ] キャッチコピーカード（金色特大フォント）

### 3-2. SNSシェアボタン（`components/ShareButton.tsx`）
- [ ] 「結果をコピー」ボタン実装
- [ ] クリップボードコピー機能（Clipboard API）
- [ ] コピー完了フィードバック表示

### 3-3. 結果画面（`app/result/page.tsx`）
- [ ] URLクエリパラメータから入力値を取得
- [ ] 各計算ロジックを実行
- [ ] ローディングアニメーション（神秘的な演出）
- [ ] カードを順次アニメーション表示（`animation-delay`で時差）
- [ ] 「もう一度診断する」ボタン

### 3-4. 仕上げ・品質向上
- [ ] レスポンシブ確認（iPhone SE / iPhone 14 / iPad）
- [ ] ダークテーマの視認性確認（金文字の読みやすさ）
- [ ] Open Graph メタタグ設定（結果シェア用）
- [ ] `next.config.ts` 確認（Vercel デプロイ設定）
- [ ] 動作確認：1990年1月15日生まれでフル診断テスト

---

## 完了条件

- [ ] `npm run build` でエラーなくビルドできる
- [ ] モバイル（max-width: 480px）で正常表示される
- [ ] 全占いの結果が正しく表示される
- [ ] SNSシェアボタンが正常に機能する
- [ ] Vercel にデプロイして本番動作を確認
