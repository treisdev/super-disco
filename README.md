# Aprovometro
* [Desafio Legislativo 2017](https://desafio.leg.br/desafios/app-legislativo-2017-com-dados-abertos)

## Download
* [App Store](https://itunes.apple.com/us/app/aprovometro/id1293617071)
* [Google Play](https://play.google.com/store/apps/details?id=br.devall.aprovometro)

## Autores
* [Carlos Eduardo Borges](https://www.github.com/xaxim)
* [Carlos Augusto Borges](https://www.github.com/calimaborges)
* [Paulo Felipe](https://www.github.com/paulofelipe)
* [Saulo Guerra](https://www.github.com/sauloguerra)


# Pra rodar localmente ou com [DevApp](https://ionicframework.com/docs/pro/devapp/)
```bash
$ npm install -g ionic cordova
$ npm i
$ ionic serve
```

## Gerando app iOS
```bash
$ ionic cordova build ios --release
$ open ./platforms/ios/Aprovometro.xcworkspace/
```

## Gerando app Android
* Copie o arquivo `aprovometro-release-key.jks` para a pasta do projeto. (Somente os proprietários do projeto possuem a chave)
```bash
$ ionic cordova build android --release
$ jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore aprovometro-release-key.jks platforms/android/build/outputs/apk/android-release-unsigned.apk aprovometroAlias
```
(aqui vai pedir a senha)
```bash
$ zipalign -v 4 platforms/android/build/outputs/apk/android-release-unsigned.apk Aprovometro.apk
$ apksigner verify Aprovometro.apk
```
