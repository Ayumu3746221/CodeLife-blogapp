# CodeLife

![Image](https://github.com/user-attachments/assets/0197d770-a7b3-4f30-b905-796c281de9e9)

「自身でサイトを持ちたい」という理由でプログラミングを始めたのでブログアプリを作りました、テストユーザーでログインすることで出来るため採用担当者様にはアカウントを発行してお送りしています。
一部（閲覧者が見る部分）、レスポンシブ対応しています。

# URL

https://www.ayumutechblog.dev/
から閲覧部分をご覧いただけます。

https://www.ayumutechblog.dev/login
こちらからテストユーザーでログインいただけます。

# 使用技術

## 言語やフレームワーク等

- typescript 5.7.3
- React 19.0.0
- Next.Js 15.1.5
- TailwindCSS 2.6.0

## ライブラリ（用途）

- prisma（DB 操作）
- microCMS（ブログ記事の管理 , ユーザー情報の管理）
- zod（フォーム入力のバリデーション）
- swr（データ取得時に一部使用）
- fotrawesome（icon 等）
- dompurify（サニタイズ）
- authjs（ユーザー認証：Google/User name & password）
- bcryptjs（ソルトとハッシュ化でパスワードを扱うため）
- blocknote（記事編集画面でブロックエディターを扱うため）

## インフラ周り（デプロイ先等）

- vercel（デプロイ先）
- cloudflare（DNS）
- Heroku（DB のみ、Heroku postgres を使用）

## なぜこの構成にしたのか

### フレームワークについて

Next.js の SSR で極力 SSR 出来るようにした方が費用の点でインフラにお金がかけられなくても高いパフォーマンスを出せると当初は考えており選択しました。

API 内で処理をある程度、完結させたかったので Next.js の API routes を用いてフルスタックフレームワークとして扱っていました。

上記の二点に関してより詳細なことは下記記事に書いてあります。
https://www.ayumutechblog.dev/article/6brc32gtd

### インフラ等に関して

今後もブログとして、このサイトを使っていくにあたって私（学生）が無理なく使える費用であることが前提条件でした。

本来ブログアプリを作る際（特にポートフォリオ）では DB を使って運用していくのが基本だと認識していますが、記事データは文字数につれて肥大していく点から DB からデータを取得すると費用が多くかかると思い今回は記事データは microCMS に預けておいて DB はユーザー認証のデータだけ保存しています。

現在の費用は vercel(hobby plan),heroku(GitHub Student Developer)のため、これらは無料で扱えており cloudflare(DNS)のドメイン代だけがランニングコストとなっています。

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

<style>
  .table_style table {
    width: 80%;              
    margin: auto;            
    table-layout: fixed;     
  }
  .table_style td {
    width: 50%;              
    text-align: center;      
    vertical-align: top;     
  }
</style>

<div class="table_style">
  <table>
    <tr>
      <td>
        <p>記事ページ</p>
        <img src="https://github.com/user-attachments/assets/b4c742dd-1cdb-4a97-b1ca-485579807889" alt="記事ページ" style="max-width: 100%;" />
        <p>上からアイキャッチ,タイトル（更新日時）,カテゴリー,著者を表示しています。</p>
      </td>
      <td>
        <p>ポートフォリオページ</p>
        <img src="https://github.com/user-attachments/assets/e852f835-b119-4957-a31c-b99b67de0e4c" alt="ポートフォリオページ" style="max-width: 100%;" />
        <p>私の学習期間や技術スタック等が<br>まとめられたページです。</p>
      </td>
    </tr>
  </table>
</div>

<div class="table_style">
  <table>
    <tr>
      <td>
        <p>お問い合わせ</p>
        <img src="https://github.com/user-attachments/assets/0fe4900d-5c85-4670-bc94-20ad6ffdee96" alt="記事ページ" style="max-width: 100%;" />
        <p>ここから管理者に<br>問い合わせることができます。</p>
      </td>
      <td>
        <p>ログイン画面</p>
        <img src="https://github.com/user-attachments/assets/7d993795-e7b4-4f0d-95f4-57923a88f911" alt="ポートフォリオページ" style="max-width: 100%;" />
        <p>ここからGoogleか認証情報で<br>ログインすることができます。<br><b>テストユーザーは下の認証情報<br>でログインしてください。</b></p>
      </td>
    </tr>
  </table>
</div>

<div class="table_style">
  <table>
    <tr>
      <td>
        <p>ダッシュボード（HOME）</p>
        <img src="https://github.com/user-attachments/assets/d25f4f89-b5d9-4529-8c81-c6637a6f5645" alt="記事ページ" style="max-width: 100%;" />
        <p>ログインしたら、このページに遷移されます。<br>レスポンシブに対応しています。</p>
      </td>
      <td>
        <p>記事編集画面</p>
        <img src="https://github.com/user-attachments/assets/ec95f714-1e36-42c8-bdd4-fac37d04c562" alt="ポートフォリオページ" style="max-width: 100%;" />
        <p>ここで記事の編集が行えます。<br>アイキャッチをクリックすると<br>変更と新規の画像の<br>アップロードができます。</p>
      </td>
    </tr>
  </table>
</div>

<div class="table_style">
  <table>
    <tr>
      <td>
        <p>コンテンツリスト</p>
        <img src="https://github.com/user-attachments/assets/de4bc222-6ddb-4993-9adc-29851bc2c6ac" alt="記事ページ" style="max-width: 100%;" />
        <p>記事の一覧を見ることができます。<br>左のチェックボックスで選択した<br>コンテンツを左上の削除ボタンで<br>削除することができます。</p>
      </td>
      <td>
        <p>ユーザー設定画面</p>
        <img src="https://github.com/user-attachments/assets/d8604893-595c-4333-af24-a2a39bb71d95" alt="ポートフォリオページ" style="max-width: 100%;" />
        <p>ユーザーアイコンの変更や,ユーザーネームや自己紹介の文章を<br>変更することができます。</p>
      </td>
    </tr>
  </table>
</div>

#　今後の展望

- ユーザーロールを作る
  ※管理者が UI からユーザーを発行したり、メディアを削除できるようにしたい
- リファクタリング
  ※コーディングが汚い部分がある、勉強して修正していきたい。
