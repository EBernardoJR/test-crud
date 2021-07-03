# Frameworks/Packages utilizados 

   - Express;
   - Nodemon;
   - MongoDB;
   - Bcrypt;
   - JWT-simple;
   - Jest.
   
# Get start
### Install packages via npm

    npm i

### Now run the project via yarn or npm

    yarn start

or

    npm start

 
### Using Nodemon - Development

    yarn dev

## Testes - Jest

  
    yarn test

or 

    npm run test


## Endpoints

#### `/signup` - Cadastrar usuário ####

Entrada:
```js
{
  "name": string,
  "email": number,
  "password": string,
  "phones": [
      {
          "number": string,
          "ddd": string
      }
  ]
}
```

Retorno:

```js
{
  "userId": string,
  "createdAt": date,
  "updatedAt": date,
  "lastLogin": date,
  "token": string
}
```

Exemplo de uso:

```
POST -> http://localhost:3333/signup
{ "name": "Teste", email": "usuarioteste@gmail.com", "password": "12345566", "phones": [{"number": "8827727273", "ddd": "88"}] }
```
#### `/signin` - Realizar login ####

Entrada:
```js
{
  "email": number,
  "password": string,
}
```

Retorno:

```js
{
  "userId": string,
  "createdAt": date,
  "updatedAt": date,
  "lastLogin": date,
  "token": string
}
```

Exemplo de uso:

```
POST -> http://localhost:3333/signin
{ "email": "usuarioteste@gmail.com", "password": "12345566"  }
```

#### `/user/:user_id` - Buscar usuário ####

Entrada:

```js
params: {
  user_id: string
},
headers: {
  authorization: string
}
```

Retorno:

```js
{
  "_id": string,
  "name": string,
  "email": string,
  "password": string,
  "phones": [
    {
      "number": string,
      "ddd": string
    }
  ],
  "createdAt": date,
  "updatedAt": date,
}
```

Exemplo de uso:

```
GET -> http://localhost:3333/user/60df9529e422a0a7f62a2c8f
headers: {
    authorization: (token)60dfb49a8f750261bcd2c73e
}
```
