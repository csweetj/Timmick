# Timmick
## 概要
時間の効率化を目的として、経過した時間を計測して記録し
成果を投稿できるアプリケーションです。

## Application URL
https://www.timmick-app.com/

## ゲスト用アカウント
未ログイン状態でヘッダーの「ゲストログイン」をクリック  
（ゲストユーザーの編集＆削除はできません。）

## 利用方法
1.ホーム画面にて用意されている４つの分野（学習&リラックス&フィットネス&娯楽）の過ごした時間を計測し保存する  
2.計測した時間を保存し、成果を投稿する。

## 機能一覧
#### 時間計測関連
* 計測開始＆計測一時中断機能
* プログレスバーアニメーション(ProgressBar.js)
* タブメニュー&モーダルウィンドウ表記機能
* 時間入力&編集機能
* 直近一週間分グラフ可視化機能（Chartkick）

#### ユーザー関連
* ユーザーログイン機能（Devise）
* ゲストユーザーログイン機能
* プロフィール画像設定機能
* タブメニュー表記機能
* ユーザー詳細ページ機能（Devise）
* ユーザー情報編集機能（Devise）
* フォロー＆フォロワー機能

#### 投稿関連
* 画像投稿機能（最大４枚まで-/投稿）
* 画像拡大機能（LightBox）
* コメント&いいね機能（非同期）
* 投稿検索機能(Ransack)
* タグ関連付け機能(Acts-as-taggable-on)
* タグ一覧&タグ検索機能(Acts-as-taggable-on)
* 無限スクロール機能(Jscroll.js)
* ページネーション機能（Kaminari）

## 使用技術
* HTML / CSS(Tailwind) / JavaScript / Jquery / Ruby(2.6.6) / Ruby on Rails(6.0.0)
* AWS( EC2 / Nginx / Unicorn / MariaDB / S3 / ROUTE53 / ACM / ALB )
* Docker / Rubocop / Rspec / Capistrano
* Git / GitHub / Visual Studio Code

## 制作目的
* 私を含め人々がより効率的に時間を使用できるために作成しました。
* 時間の効率化を狙うため、計４分野８パターンの計測を用意しました。
* 交流を深めるためのユーザー詳細表示機能、フォロー＆フォロワー機能を実装しました。
* 集中力UPのためユーザーの操作を可能な限り減らし、時間経過が直感的にわかるアニメーションを実装しました。
* モチベーション向上のため記録した時間のグラフ可視化機能を実装し、成果を披露できる投稿機能を実装しました。

## 今後の予定
* デザインの向上（レスポンシブル化）
* テストコードの充実
* CircleCIを実装
* DM機能を実装
* 通知機能を実装

## ER図
![データベースER図](https://user-images.githubusercontent.com/69447485/119130839-b2e09480-ba73-11eb-9cb6-f0864e65eeaf.png)

## 画面遷移図
![画面遷移図](https://user-images.githubusercontent.com/69447485/119133636-17512300-ba77-11eb-8991-db71cde24acc.png)

## インフラ構成図
![インフラ図](https://user-images.githubusercontent.com/69447485/119228748-5fdc0f80-bb4f-11eb-991a-6594f204ffc8.png)

