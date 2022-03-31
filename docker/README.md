## 目的

Docker、Docker-composeの使用方法、案件でどのように運用されているかを学ぶ

ここではコマンドをメインに取り扱うものとする。スライド資料はコ <!-- ↑ --> コ↓

https://docs.google.com/presentation/d/1KuyB4PybKUFf2K1E0trbTeiEXR5at_-h/edit?usp=sharing&ouid=113382210091580383365&rtpof=true&sd=true


## 講義

1. Dockerを動かす

    作業ディレクトリに移動

    ```
    $ cd ncg2022-github-training-1/docker/docker-training
    ```


    1. docker経由でnginxの最新版を起動する

        ```

        $ cd ncg2022-github-training-1/docker
        $ docker run --name nginx-server --rm -d -p 8080:80 nginx:latest
        ```

        * `--name`: コンテナ名（重複できない）

        * `--rm`: コンテナ停止後、自動的にコンテナを削除する

        * `-d`: バックグラウンドで起動する

        * `-p`: ポートフォワーディング（外部との通信は8080番、内部は80番で通信）

        * `nginx:latest`: <image_name>:<tag>を指定、導入したいコンテナをググって確認する

        * `Tag`: latestは最新版

        エラーが出ない場合、 http://localhost:8080 にアクセスできるか確認する




    2. Dockerの便利コマンド
        * 起動中のコンテナ一覧、詳細を表示
        ```
        $ docker ps
        CONTAINER ID   IMAGE                  COMMAND                          CREATED              STATUS          PORTS                            NAMES
        6c254a79a5db   nginx:latest           "/docker-entrypoint.…"        16 minutes ago   Up 16 minutes   0.0.0.0:8080->80/tcp     nginx-server
        5c60315a9b80   openvino/cvat_ui       "/docker-entrypoint.…"   10 months ago    Up 5 weeks       80/tcp                              cvat_ui
        b5602199c251   openvino/cvat_server   "/usr/bin/supervisord"  10 months ago    Up 5 weeks      8080/tcp                            cvat
        22c53276da02   postgres:10-alpine     "docker-entrypoint.s…"   10 months ago    Up 5 weeks       5432/tcp                            cvat_db
        6d74ace8f633   redis:4.0-alpine       "docker-entrypoint.s…"      10 months ago    Up 5 weeks       6379/tcp                            cvat_redis

        $ docker ps –a # すべてのコンテナを表示
        ```
        * 起動中のコンテナを停止
        ```
        $ docker stop <CONTAINER ID>
         (実行しなくて良い)

        $ docker stop 6c254a79a5db # docker stop 6c2　も可
        ```
        1. で作成したコンテナを停止させよう


        * コンテナ上で任意のコマンドを実行
        ```
        $ docker exec -it <CONTAINER ID> <CMD>

        # 6c254a79a5dbコンテナ上でpwdを実行
        $ docker exec -it 6c254a79a5db pwd

        # 6c254a79a5dbコンテナ上でコマンド入力まち　(exitまたはCtrl+Dで入力まち解除)
        $ docker exec -it 6c254a79a5db /bin/bash
        ```

    3. Dockerへのディレクトリマウント

        * Mac本体とDockerコンテナ間でディレクトリ共有を行う
        ```
        $ docker run -v [ホストディレクトリの絶対パス]:[コンテナの絶対パス] --name ...(省略)
         (実行しなくて良い)
        ```
        * 共有できているか確認する
        ```
        $ pwd
        /Users/Ryoka.Oishi/Documents/ncg2022/ncg2022-github-training-1/docker
        $ echo "Mount from Mac" > ./mount.txt # mount.txtを作成し、「Mount from Mac」を書き込む
        $ cat ./mount.txt # mount.txtの中身を確認
        Mount from Mac
        $ docker run -v /Users/Ryoka.Oishi/Documents/ncg2022/ncg2022-github-training-1/docker:/tmp --name nginx-server --rm -d -p 8080:80 nginx:latest
        $ docker ps # 起動したか、CONTAINER IDを確認
        $ docker exec -it <CONTAINER_ID> /bin/bash

        # cat /tmp/mount.txt ## mount.txtの中身を確認
        Mount from Mac
        # echo "Mount from docker" >> /tmp/mount.txt ## /tmp/mount.txtに「Mount from docker」を上書き
        # exit

        $ cat ./mount.txt # mount.txtの中身を確認
        Mount from Mac
        Mount from docker
        ```
    4. Dockerイメージの自作

          nginx:latestのような予めあるイメージに、”独自の設定を追加したイメージ”を作成することが可能

          1. Dockerfileに独自設定を追加する方法

              Dockerfile、index.phpを作成し、以下の内容を書き込む
              ```
              vim Dockerfile
              ```

              書き込む内容
              * Dockerfile
              ```
              FROM centos:centos7

              RUN yum -y install httpd php
              COPY index.php /var/www/html/

              CMD ["/usr/sbin/httpd","-DFOREGROUND"]
              ```

              * index.php
              ```
              <html>
               <head>
                <title>Hello Docker</title>
               </head>
               <body>
               <?php echo '<p>Hello Docker!!!</p>'; ?> 
               </body>
              </html>
              ```

              Dockerfileをビルドし、イメージを作成する
              ```
              $ docker build -t <image_name>:<tag> <Dockerfileがあるディレクトリパス>  
              (実行しなくて良い)
              
              # ビルド
              $ docker build -t myphpserver:centos7 . 

              # イメージに追加されたかを確認
              $ docker images

              # 自作イメージを起動する
              $ docker run --name myphpserver --rm -d -p 8080:80 myphpserver:centos7
              ```
              コマンド実行後 http://localhost:8080/test.php にアクセス

          2. 起動中のコンテナに設定を追加し、イメージを保存する方法
              1. で作成したイメージにbashし、/var/www/html/index.phpを書き換える
              ```
              $ docker exec -it <CONTAINER_ID> /bin/bash
              # sed -i -e "s/Hello Docker/Hello <your name>/g" /var/www/html/index.php ## <your name>に自分の名前を入れよう！
              # cat /var/www/html/index.php # 書き換わっているか確認
              # exit
              ```

              2. コンテナをイメージに保存する
              ```
              $ docker commit <CONTAINER_ID> <image_name>:<tag>
              (実行しなくて良い)

              # コンテナをイメージに保存
              $ docker commit <CONTAINER_ID> myphpserver:centos7-ryokaoishi

              # イメージに追加されたかを確認
              $ docker images
              ```

              3. コンテナ起動
              ```
              $ docker run --name myphpserver --rm -d -p 8080:80 myphpserver:centos7-ryokaoishi
              ```

              コマンド実行後 http://localhost:8080/index.php にアクセス



2. docker-composeを動かす

    作業ディレクトリに移動
        
        
        $ cd ncg2022-github-training-1/docker/docker-compose-training

    1. docker composeよりwordpressを起動する
        1. docker-compose.yamlファイルを作成し、以下を記入
        ```
        version: '3'
    
        services:
          mysql:
            image: mysql:8.0.20
            restart: always
            environment:
              MYSQL_ROOT_PASSWORD: wordpress
              MYSQL_DATABASE: wordpress
              MYSQL_USER: wordpress
              MYSQL_PASSWORD: wordpress
        
          wordpress:
            depends_on:
              - mysql
            image: wordpress:php7.4-apache
            ports:
              - "80:80"
            restart: always
            environment:
              WORDPRESS_DB_HOST: mysql:3306
              WORDPRESS_DB_USER: wordpress
              WORDPRESS_DB_PASSWORD: wordpress
          ```

        * version: 書き方のフォーマットバージョン（だいだい2か3）
        * services: の下に起動したいコンテナたちを記入する（サービス名という）
          * mysql、wordpressが対象
        * image: にはDockerイメージ:タグを記入
        * ports: は使用するポート
        * environment: はコンテナごとの環境変数

        2. docker compose経由でコンテナを起動する
        ```
        $ docker-compose up -d
        ```

        使用するイメージがbuild前の場合、起動前にビルドを行う
        ```
        $ docker-compose build
        ```

        起動後、 http://localhost にアクセスできるか確認

    2. docker-compose便利コマンド
        * 実行中のdocker composeコンテナを確認
        ```
        $ docker ps
        ```

        * 実行中のdocker composeのコンテナ上で任意コマンド実行
        ```
        $ docker-compose exec <service_name> bash
        (実行しなくてよい)

        $ docker-compose exec wordpress bash
        # mysql -u wordpress -p ## パスワード：wordpress
        mysql> show database;
        +--------------------+
        | Database           |
        +--------------------+
        | information_schema |
        | wordpress          |
        +--------------------+
        2 rows in set (0.08 sec)
        ```

        * docker compose停止

        ```
        $ ls # 停止したいdocker-compose.yamlがあるか確認
        
        $ docker-compose stop

        # 停止かつ削除する場合
        $ docker-compose down
        ```

## 課題

1. 顧客から、Pytorchを動かせるコンテナをDocker Composeで作成してほしいと依頼

    ＜条件＞

    ```$ docker-compose exec torch bash```  が実行できること

    ```$ docker-compose exec torch python3 train.py``` が実行でき、最後にSUCCESS!!!と出力されること

    ncg2022-github-training-x/docker/docker-task/torch内の２つのファイルを修正する
    * Dockerfile
    * Docker-compose.yaml

2. 好きなDockerイメージを作成する


## うまく動かないとき

sudo を付けてみる
```
$ sudo docker ps
```