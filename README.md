# Next.js × microCMS で JAMStack なブログ制作 🧑‍💻

## 使用技術

- react ^18.2.0
- next ^12.2.5
- typescript ^4.7.4
- emotion ^11.10.0
- axios ^0.27.2
- microcms-js-sdk ^2.2.1
- recoil ^0.7.5
- eslint ^8.23.0
- prettier ^2.7.1
- mui ^5.10.2
- uuid ^8.3.2
- firebase ^9.9.4
- highlight.js ^11.6.0
- cheerio ^1.0.0-rc.12
- dayjs ^1.11.5
- swr ^1.3.0

## 機能

- ### ブログ機能

  - 記事一覧ぺージ
  - カテゴリ別記事一覧ぺージ
  - コンテンツ検索フォーム
  - 画面プレビュー(vercel と連動)
  - Google Analytics \*準備中
  - 人気記事 \*準備中
  - 記事詳細ページ
  - 目次

- ### その他
  - プロフィールページ
  - アプリ倉庫(Json から取り出し)

## バージョン管理

| バージョン | リリース日 |               リリース内容                |
| :--------: | :--------: | :---------------------------------------: |
|    1.00    | 2022.09.06 | ブログ一覧・詳細ページ/プロフィールページ |

## microCMS API スキーマ

|     ID      |        表示名        |           種類           |
| :---------: | :------------------: | :----------------------: |
|    title    |       タイトル       |    テキストフィールド    |
|    date     |       作成日時       |           日時           |
|   update    |       更新日時       |           日時           |
| toc_visible |         目次         |          真偽値          |
|  eyecatch   | アイキャッチ(絵文字) |           画像           |
|  category   |       カテゴリ       | コンテンツ参照 -カテゴリ |
|   content   |         内容         |      リッチエディタ      |
| description |  ディスクリプション  |      テキストエリア      |

## 環境変数

```json
# microCMS
NEXT_PUBLIC_MICROCMS_ACCESS_KEY={your-serviceDomain}
NEXT_PUBLIC_MICROCMS_API_KEY={your-apiKey}

# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY={your-apiKey}
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN={your-authDomain}
NEXT_PUBLIC_FIREBASE_PROJECT_ID={your-projectId}
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET={your-storageBucket}
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID={your-messagingSenderId}
NEXT_PUBLIC_FIREBASE_APP_ID={your-appId}
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID={your-measurementId}

# Hosting
NEXT_PUBLIC_HOST={your-url}
```

**アプリイメージ 🙌**
![アプリイメージ] \*準備中

## 作業期間

12 日程度

## 開発者

[わでぃん](https://github.com/wadeen)

## 公開 URL

https://wadeen.net

<!-- ### `npm start` -->
