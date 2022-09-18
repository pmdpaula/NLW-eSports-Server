# NLW-eSports-Server

## Backe-end

## Entidades

### Game
  * id
  * title
  * bannerUrl

### Ad
  * id
  * gameId
  * name
  * yearsPlaying
  * discord
  * weekDays
  * hoursStart
  * hoursEnd
  * useVoiceChannel
  * createdAt

## Casos de uso

  *-* Listagem de games com contagem de anúncios  
  *-* Criação de novo anúncio  
  *-* Listagem de anúncios por game  
  *-* Buscar discord pelo ID do anúncio  



## Passos executados

### Aula 01 - Base Building
- Instalação do node.js
- Instalação do Yarn
- Instalação do Git


#### Configuração do backend

- Inicialização do projeto
```
mkdir -p esports/server
cd esports/server
yarn init
```
Isto criará o package.json

- [Instalação do express](https://expressjs.com/pt-br/starter/installing.html)
```
yarn add express
```

- Uso da extensão Thunder Client para testes das rotas da API

- Instalação do typescript

```
yarn add -D typescript @types/express
npx tsc --init
  # cria arquivo de configuração do typescript

```
Ajustar o tsconfig.json de acordo com as ncessidades.
Ex.:
> "target": "ESNext",                                  /* Set the JavaScript
> 
> "module": "CommonJS",                                /* Specify what module code
> 
> "rootDir": "./src",                                  /* Specify the root folder 
> 
> "outDir": "./build",                                   /* Specify an output folder
> 
> "exclude": [  
>     "node_modules",  
>     "dist"  
>   ]


- Pacote ts-node-dev para reiniciar o servidor sempre que houver mudança no código  
Para uso do yarn dev. Facilita o desenvolvimento para que não tenhamos que ficar reiniciando o servidor na mão o tempo todo.

```
yarn add -D ts-node-env
```

### Aula 02 - High Speed

### Aula 03 - To be continued

- [Instalação do Prisma](https://www.prisma.io/docs/getting-started/quickstart)

```
yarn add -D prisma
npx prisma init --datasource-provider SQLite
```
O segundo comando acima criará alguns arquivos do Prisma de acordo com o banco de dados passado. Um deles é o .env, onde será indicado a localização do arquivo do banco de dados SQLite.

No VS Code podemos adicionar as linhas abaixo nas configurações para melhor uso do Prisma. Instalar tb a extensão do Prisma.

>```
> "[prisma]": {  
>     "editor.formatOnSave": true  
>   },
>```

- Migrate do Prisma
Aqui vamos migrar as configurações feitas no schema.prisma para o banco. Será criado um versionamento com base no nome que daremos a esta migração.

```
npx prisma migrate dev
```
- Visualizar administrar os dados do banco via browser
Usamos aqui o Prisma Studio que é uma ferramenta simples e que ajuda bastante durante o desenvolvimento. A porta padrão usada será a 5555.

```
npx prisma studio
```

- Instalação do  client do Prisma

```
yarn add @prisma/client
```

- Uso do generate do Prisma para criar as tipagens do typescript  
A magia do Prisma com typescript está aqui.

```
npx prisma generate
```

- Instalação da biblioteca cors  
Esta biblioteca protege a aplicação de acessos indesejados.

```
yarn add cors
yarn add -D @types/cors
```


### Aula 04 - Power Up

### Aula 05 - Final Round
