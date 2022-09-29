# Next.js × microCMS で JAMStack ブログ制作 🦖

## アーキテクチャ図

![アーキテクチャ図](public/images/architecture.png)
<br />

## 機能

- ### ブログ機能

  - 記事一覧ぺージ
  - カテゴリ別記事一覧ぺージ
  - 記事検索フォーム
  - 画面プレビュー(vercel と連動)
  <!-- - Google Analytics \*準備中
  - 人気記事 \*準備中 -->
  - 記事詳細ページ
  - コメント機能(Firestore)
  - OGP 自動生成機能
  - 目次機能

- ### プロフィールページ

- ### アプリ倉庫
    <br />

**アプリイメージ 🙌**

![アプリイメージ](public/images/thumbnail.png)

## microCMS API スキーマ

|     ID      |        表示名        |             種類              | 必須 |
| :---------: | :------------------: | :---------------------------: | :--: |
|    title    |       タイトル       |      テキストフィールド       |  ◯   |
| created_at  |       作成日時       |             日時              |  ◯   |
| updated_at  |       更新日時       |             日時              |  ×   |
| toc_visible |         目次         |            真偽値             |  ×   |
|  eyecatch   | アイキャッチ(絵文字) |             画像              |  ◯   |
|  category   |       カテゴリ       | 繰り返し(2 件)のフィールド\*1 |  ◯   |
|   content   |         内容         |        リッチエディタ         |  ◯   |
| description |  ディスクリプション  |        テキストエリア         |  ×   |

<br />

\*1: カスタムフィールド
| ID | 表示名 | 種類 | 必須 |
| :---------: | :------------------: | :------------------------: | :--: |
| richEditor | リッチエディタ | リッチエディタ | × |
| html | HTML | テキストエリア | × |
<br />

## Cloud Firestore DB

<table>
<tr align="center">
<th>データモデル</th>
<th>データ名</th>
<th>タイプ</th>
</tr>
<tr>
<tr align="center">
<th>collection</th>
<td>投稿記事ID</td>
<td>-</td>
</tr>
<tr align="center">
<th>document</th>
<td>自動ID</td>
<td>-</td>
</tr>
<tr align="center">
<th rowspan="3">data</th>
<td>date</td>
<td>timestamp</td>
</tr>
<tr  align="center">
<td>name</td>
<td>string</td>
</tr>
<tr align="center">
<td>text</td>
<td>string</td>
</tr>
</table>
<br />

## 環境変数

```
# microCMS
#microCMS: コンテンツ(API) > APIプレビュー
NEXT_PUBLIC_MICROCMS_ACCESS_KEY={your-serviceDomain}
NEXT_PUBLIC_MICROCMS_API_KEY={your-apiKey}
NEXT_PUBLIC_MICROCMS_OGP_ARTICLE={microCMS-storage} *自動生成(記事ページ) | 任意の画像アップロード要
NEXT_PUBLIC_MICROCMS_OGP_BASE={microCMS-storage} *ブログ以外のOGP画像 | 任意の画像アップロード要

# Firebase
#Firebase: プロジェクトの設定 > 全般 > マイアプリ 参照
NEXT_PUBLIC_FIREBASE_API_KEY={your-apiKey}
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN={your-authDomain}
NEXT_PUBLIC_FIREBASE_PROJECT_ID={your-projectId}
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET={your-storageBucket}
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID={your-messagingSenderId}
NEXT_PUBLIC_FIREBASE_APP_ID={your-appId}
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID={your-measurementId}

# Hosting
#Hosting: ホスティング先のURL
NEXT_PUBLIC_HOST={your-url}
```

## 環境構築

```
# clone してディレクトリ移動
git clone https://github.com/wadeen/nextjs-blog.git

# nextjs-blog に移動
cd nextjs-blog

# パッケージのインストール
npm install

# FirebaseコンソールからFirebaseアプリを作成

# microCMS管理画面から新規サービスを作成

# "環境変数" を.envファイルに適宜貼り付け

```

## 開発期間

12 日程度
開発期間：1 ヶ月程度(適宜アップデート)<br />
工数：12 人日

## 開発者

[わでぃん](https://github.com/wadeen)

## 公開 URL

https://wadeen.net/
