# BChainIdentify_Server
This package provides the fraud prevention BChainIdentify REST-API for other applications and (shop-)modules to hook into. It depends on the BChainIdentify_Core to manage the blockchains' entries.

## Developers
* [Miguel Caceres](https://github.com/foxneo)
* [Marcel Menk](https://github.com/AniiXx)
* [Philipp Kynast](https://github.com/PhlppKnst)
* [Jakob Bussas](https://github.com/Jarkob)
* [Oz Arpali](https://github.com/corexo)
* [Kyung Cheng](https://github.com/kayung1997)

## Install & Run
* Clone Repository
```
git clone https://github.com/BChainIdentify/BChainIdentify_Server.git
```
You need to jump into the cloned directory "BChainIdentify_Server" in order to continue with the steps described below.
* Install Dependencies
```
npm install
```
* Start REST Server
```
node restServer.js
```
* Start Mocked Server
```
node mockedServer.js
```

## Use with Docker
* Build Image from current directory
```
docker build -t BChainIdentify/BChainIdentify_Server .
```
* Create instance
```
docker run -p 3000:3000 -d BChainIdentify/BChainIdentify_Server
```
Expose the port 3000 to use the REST-API hooks outside of the docker environment targeting: http://\<yourip\>:3000/\<hook\>
