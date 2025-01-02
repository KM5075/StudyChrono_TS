# StudyChrono_TS

学習時間を記録するためのWebアプリ

## Features

- [x] React+TypeScriptの開発環境をViteで用意する
- [x] Azure App Serviceにデプロイする
- [x] Jestとreact-testing-libraryを導入する
    - [x] コンポーネントテストをサンプルで作成して動くことを確認
    - [x] GitHub Actionsでテストを自動実行する
- [x] MSTestを導入する
    - [x] サーバのテストをサンプルで作成して動くことを確認
    - [x] GitHub Actionsでテストを自動実行する
- [x] Github Actions(Push)でCDできる
- [x] ChakuraUIを導入する
- [x] ユーザーはタイトルをみることができる
- [ ] EF Coreの初期設定をする
- [x] ユーザーは学習記録一覧をみることができる
- [ ] ユーザーはデータ取得のときにローディング画面をみることができる
- [x] ユーザーは学習記録を登録することができる
    - [x] react-hook-formを導入する
    - [x] 学習記録を入力していないと「内容の入力は必須です」とでる
    - [x] 学習時間が入力していないと「時間の入力は必須です」とでる
    - [x] 時間を0以上でない値を入力したら「時間は0以上である必要があります」
- [x] 学習記録登録をモーダル経由に変更する
- [x] 登録をして再度登録モーダルを開いても前の入力内容が残っていない
- [x] ユーザーは学習記録を削除することができる
- [x] ユーザーは学習記録を編集することができる
- [ ] 自動テストを実装する(サーバとの通信はモックを入れる)
    - [ ] ローディング画面をみることができる
    - [ ] テーブルをみることができる
    - [ ] 新規登録ボタンがある
    - [ ] タイトルがあること
    - [ ] 学習記録が登録できること
    - [ ] モーダルが新規登録というタイトルになっている
    - [ ] 学習内容がないときに登録するとエラーがでる
    - [ ] 学習時間がないときに登録するとエラーがでる
    - [ ] 未入力のエラー
    - [ ] 0以上でないときのエラー
    - [ ] 学習記録が削除できること
- [ ] ユーザーは学習記録を編集できる
    - [ ] 編集ボタンがそれぞれの記録ごとに表示されている
    - [ ] 編集ボタンを押すとモーダルが表示される
    - [ ] モーダルにはフォームがあり、ボタンを押した記録の学習内容と学習時間が表示されている
    - [ ] 内容と時間を編集して保存することができる
    - [ ] タイトルが記録編集である(新規登録ではない)
    - [ ] 保存を押すとモーダルが閉じて、一覧の該当する記録が更新される
    - [ ] キャンセルを押すとモーダルが閉じる
    - [ ] 保存を押すとフォームがクリアされる
    - [ ] 編集のテストを書く
    - [ ] モーダルのタイトルが記録編集である
    - [ ] 編集して登録すると更新される

