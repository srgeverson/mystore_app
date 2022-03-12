# MyStore - Sistema de Controle de Loja
Este aplicatico servirá para acompanhar e gerenciar as vendas da empresa.

## 📌 Versão ainda em desenvolvimento
0.0.1

### Pré-requisitos
Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com) e [Node.js](https://nodejs.org/en/) 
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

A criação e a execução do projeto foram realizadas seguindo a documentação oficial
[React Native](https://reactnative.dev/docs/environment-setup).

## 🚀 Procedimento realizados durante o desenvolvimento

```bash

### Criando o Projeto
$ npx react-native init mystore_app

### Executando o Metro Bundle
$ npx react-native start

### Executando projeto no Android
$ npx react-native run-android

### Executando projeto no iOS
$ npx react-native run-ios

### Biblioteca de navegação
$ npm install @react-navigation/native

### Instalação das dependências base de navegação
$ npm install react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view

### 
$ npm install react-native-gesture-handler

### 
$ npx react-native link react-native-gesture-handler

### Navegação stack
$ npm install @react-navigation/stack

### Navegação drawer
npm install @react-navigation/drawer

### Elementos/Componentes do React Native
$ npm install react-native-elements

### Biblioteca de icones [Configuração](https://github.com/oblador/react-native-vector-icons)
$ npm install react-native-vector-icons

### Cliente http
$ npm install --save axios

#Salvar dados no dispositivo
$ npm install --save react-native-sqlite-storage

### Estilização de componentes !!!!!CONFLITOU!!!!!
$ npm install --save styled-components

### Autenticação Base64
$ npm install --save bse64

### Biblioteca de configuração de variáveis de ambiente
$ npm install --save react-native-config

$ react-native link react-native-config

## no arquivo android/app/build.gradle adicione na segunda linha do arquivo o seguinte código
$ apply from: project(':react-native-config').projectDir.getPath() + "/dotenv.gradle"

## Crie o arquivo .env.dev e .env.prod na raiz do projeto
$ .env.development 
$ .env.production

## agora no seu arquivo package.json em scripts vamos adicionar este código:
$ "scripts": {
	...
	"android-dev": "ENVFILE=.env.dev react-native run-android",
	"android-prod": "ENVFILE=.env.prod react-native run-android"
},

### Biblioteca de gráficos
$ npm install --save react-native-svg-charts

```

#### 🎲 Rodando o aplicativo

```bash

### Baixando o projeto
$ https://github.com/tcc-mystore/mystore_app.git

### Entrando no diretótio
$ cd mysrore_app

### Instalando as dependências
$ npm install

```

## 👨‍💻 Equipe de Desenvolvimento

* **Geverson Souza** - [Geverson Souza](https://www.linkedin.com/in/srgeverson/)

## ✒️ Autor

* **Geverson Souza** - [Geverson Souza](https://www.linkedin.com/in/srgeverson/)
