# Pra rodar
```bash
$ sudo npm install -g ionic cordova
$ npm i
$ ionic serve
```
## Gerando app android
```
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore aprovometro-release-key.jks platforms/android/build/outputs/apk/android-release-unsigned.apk aprovometroAlias
(quando pede a senha, é a famosa, com c minusculo)
zipalign -v 4 platforms/android/build/outputs/apk/android-release-unsigned.apk Aprovometro.apk
apksigner verify Aprovometro.apk
```



