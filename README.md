# classic auth example

メールアドレス & パスワード認証の自前実装をしばらくしていなかったので思い出すためのコード。

- ブラウザフォームでメールアドレス & パスワードを入力、submit
- users レコードを作成
  - email_verified: false
- email_verification_intents レコードを作成
  - token: ランダム生成文字列
  - expires_at: 24時間後
- intent id、token を含む URL を載せたメールを送信
- 踏まれた時に email_verification_intents レコードを探し、expire していなければ users.email_verified を true に更新
- JWT を発行して Cookie に入れ、redirect
