# CodeLife

![Image](https://github.com/user-attachments/assets/0197d770-a7b3-4f30-b905-796c281de9e9)

# Overview

## なぜプロジェクトを作ったのか

元々、中高生の時に WordPress でブログを作った経験があり、大学に入って Java を授業で勉強していくうちにプログラミングにハマり、当時たまたま目に入った SpringBoot で Web 開発がある程度できるようになった時に**当時のブログを、今なら作り直せる**と思い最初は Next.js と SpringBoot でゼロからブログアプリを作りました。

## SpringBoot & Next.js から Next.js 単体に切り替えた経緯

以下の点が一つ前のブログアプリケーションのネックとなり切り替えました。

- GCP を利用していたため**運用していく上でのコスト**の問題
- 機能追加の際に二つのアプリケーションを更新しなくてはならないため個人開発では運用が困難であった。

上記の点を踏まえ、今回の開発ではコストを抑えつつ機能追加やメンテナンスがしやすくなるような構成にしました。

# 技術スタック

## バージョン 1（Spring Boot + Next.js）

| 技術          | バージョン        | 用途           |
| ------------- | ----------------- | -------------- |
| Next.js       | 14.x              | フロントエンド |
| SpringBoot3.x | バックエンド(API) |
| GCP           | -                 | Storage/DB     |

## バージョン 2(Next.js 単体)

| 技術            | バージョン | 用途                      |
| --------------- | ---------- | ------------------------- |
| Next.js         | 15.1.5     | フロントエンド & API 部分 |
| MicoroCMS       | -          | CMS                       |
| Heroku Postgres | -          | DB                        |

# 技術的な課題と解決方法

## Spring Boot + Next.js で発生した運用コストとメンテナンス性の問題

- 最初のブログアプリは GCP + SringBoot でバックエンド側を構築したが、運用コストとメンテナンス性がネックだった。
- Auth.js で認可を通した User に Token を渡し,SpringBoot 側で検証していたため処理が複雑で扱いにくかった

1. 月々 1 万円前後の運用コストがかかっていた。
2. 新規の機能開発に 1 週間程度かかっていた

## 解決方法：Next.js 単体での構築にシフト

- MicroCMS に記事の管理を任せることでブログアプリの CMS 部分の技術的負債を軽減
- Vercel の Hobby プランと Heroku の Student Edition を活用することで費用を削減

1. 結果的に費用はドメイン代の年間約 3000 円に抑えることができた
2. 新規の機能開発は簡単なものでは 1 日で、複雑なものでも 5 日程度あれば実装できた。
3. Next.js 単体にシフトした結果、ユーザー認証の処理が明確でわかりやすくなった。

# URL

https://www.ayumutechblog.dev/
から閲覧部分をご覧いただけます。

https://www.ayumutechblog.dev/login
こちらからテストユーザーでログインいただけます。

# 今回の開発から得た学び（課題解決を通して）

- **「作るだけじゃなく、運用コストやメンテナンス性まで考えるのが大事」**と気が付くことができた。
- ソースコードは書かない方が良い、コードは開発者にとって負債であるということを身をもって実感した。
- 今後も**使う人や運用する人の視点を持って開発をしていく**態度を持っていこうと思う。

# 実装機能

## 閲覧者用の機能

- 記事の閲覧
- ポートフォリオページの閲覧
- 管理者へのコンタクト機能（私の Gmail に届くようになっています。）

## 認証ユーザー用の機能

- ログイン/ログアウト（ユーザー認証機能）
- 記事の編集機能（記事の更新,削除,新規投稿）
- ユーザー情報の更新機能

## 実際のページ

<div>
  <table style="width: 80%; margin: auto; table-layout: fixed;">
    <tr>
      <td style="width: 50%; text-align: center; vertical-align: top;">
        <p>記事ページ</p>
        <img src="https://github.com/user-attachments/assets/b4c742dd-1cdb-4a97-b1ca-485579807889" alt="記事ページ" style="max-width: 100%;" />
        <p>上からアイキャッチ,タイトル（更新日時）,カテゴリー,著者を表示しています。</p>
      </td>
      <td style="width: 50%; text-align: center; vertical-align: top;">
        <p>ポートフォリオページ</p>
        <img src="https://github.com/user-attachments/assets/e852f835-b119-4957-a31c-b99b67de0e4c" alt="ポートフォリオページ" style="max-width: 100%;" />
        <p>私の学習期間や技術スタック等が<br>まとめられたページです。</p>
      </td>
    </tr>
  </table>
</div>

<div>
  <table style="width: 80%; margin: auto; table-layout: fixed;">
    <tr>
      <td style="width: 50%; text-align: center; vertical-align: top;">
        <p>お問い合わせ</p>
        <img src="https://github.com/user-attachments/assets/0fe4900d-5c85-4670-bc94-20ad6ffdee96" alt="記事ページ" style="max-width: 100%;" />
        <p>ここから管理者に<br>問い合わせることができます。</p>
      </td>
      <td style="width: 50%; text-align: center; vertical-align: top;">
        <p>ログイン画面</p>
        <img src="https://github.com/user-attachments/assets/7d993795-e7b4-4f0d-95f4-57923a88f911" alt="ポートフォリオページ" style="max-width: 100%;" />
        <p>ここからGoogleか認証情報で<br>ログインすることができます。<br><b>テストユーザーは下の認証情報<br>でログインしてください。</b></p>
      </td>
    </tr>
  </table>
</div>

<div>
  <table style="width: 80%; margin: auto; table-layout: fixed;">
    <tr>
      <td style="width: 50%; text-align: center; vertical-align: top;">
        <p>ダッシュボード（HOME）</p>
        <img src="https://github.com/user-attachments/assets/d25f4f89-b5d9-4529-8c81-c6637a6f5645" alt="記事ページ" style="max-width: 100%;" />
        <p>ログインしたら、このページに遷移されます。<br>レスポンシブに対応しています。</p>
      </td>
      <td style="width: 50%; text-align: center; vertical-align: top;">
        <p>記事編集画面</p>
        <img src="https://github.com/user-attachments/assets/ec95f714-1e36-42c8-bdd4-fac37d04c562" alt="ポートフォリオページ" style="max-width: 100%;" />
        <p>ここで記事の編集が行えます。<br>アイキャッチをクリックすると<br>変更と新規の画像の<br>アップロードができます。</p>
      </td>
    </tr>
  </table>
</div>

<div>
  <table style="width: 80%; margin: auto; table-layout: fixed;">
    <tr>
      <td style="width: 50%; text-align: center; vertical-align: top;">
        <p>コンテンツリスト</p>
        <img src="https://github.com/user-attachments/assets/de4bc222-6ddb-4993-9adc-29851bc2c6ac" alt="記事ページ" style="max-width: 100%;" />
        <p>記事の一覧を見ることができます。<br>左のチェックボックスで選択した<br>コンテンツを左上の削除ボタンで<br>削除することができます。</p>
      </td>
      <td style="width: 50%; text-align: center; vertical-align: top;">
        <p>ユーザー設定画面</p>
        <img src="https://github.com/user-attachments/assets/d8604893-595c-4333-af24-a2a39bb71d95" alt="ポートフォリオページ" style="max-width: 100%;" />
        <p>ユーザーアイコンの変更や,ユーザーネームや自己紹介の文章を<br>変更することができます。</p>
      </td>
    </tr>
  </table>
</div>
