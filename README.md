# Aprovometro

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
