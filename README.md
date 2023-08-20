### Pasos fundamentales para lenvantar un backend con nodejs, express y sequelize:

1. Crear el projecto y ejecutar `npm init -y`
2. Instalar las dependencias. Inicialmente solo `express` y `nodemon`. Esta ultima en modo desarrollo, que significa que cuando se haga el deploy a produccion no se instalará. Esto se logra ejecutando `npm i express nodemon -D`.
3. Luego lo comun es tener la siguiente estructura basica, sobre la cual iremos trabajando:

```bash
├── src
│   ├── app.js
├── README.md
├── package-lock.json
├── package.json

```
 
4. Antes de comenzar a programar cualquier cosa, es necesario configurar el archivo `package.json` para que se ejecute el servidor con `nodemon` y no con `node`. Esto
permite que no tengamos que estar reiniciando el servidor cada vez que hacemos un cambio. Para esto, en el archivo `package.json` agregamos lo siguiente:

```json

"scripts": {
    "dev": "nodemon src/index.js"
  }

//  Ahora el codigo se ejecuta con npm run dev
```

5. Ahora estamos listo para ensuciarnos las manos. Lo primero que haremos es levantar un servidor basico con `Express`. Para esto, tenemos que trabajar en el archivo `src/index.js`.
Aca en realidad se necesita muy poco codigo, pero ya nos enfrentamos a un punto donde debemos tomar una decision, ¿usaremos `commonjs` o usaremos modulos de `ES6`?. 
En este caso usaremos modulos de `ES6`, porque me parece mas intuitiva la sintaxis, es más facil de leer y más eficiente. Es importante tener en cuenta que **JavaScript** por defecto funciona con `commonjs`, por lo que para poder usar modulos de `ES6` debemos agregar la siguiente linea de codigo al `package.json`:

```json
"type": "module"
```
Ahora, en vez de realizar `imports` de esta forma:
```javascript
const express = require('express');
```
Lo haremos de esta forma:
```javascript
import express from 'express';
```
Sin mas preambulos, el codigo para levantar un servidor basico con express es el siguiente:

```javascript
// Primero importamos express
import express from "express"

// Luego creamos una nueva aplicacion de express
const app = express()

// Finalmente le decimos a esa aplicacion que escuche conexiones en algun puerto
app.listen(algun_puerto)
```

6. Ahora, algo muy importante es mantener un buen orden en el codigo con responsabilidades bien definidas. En esta linea, uno de los componentes principales de un backend son las **variables de entorno**, las cuales nos permiten tener configuraciones que pueden cambiar dependiendo del entorno en el que estemos trabajando. En terminos practicos, es una forma de almacenar datos sensibles o que pueden cambiar en el tiempo, como por ejemplo, la URL de una base de datos, un puerto, API keys, etc. Para esto, usaremos el paquete `dotenv`. Para instalarlo ejecutamos `npm i dotenv`.
Luego, creamos un archivo `.env` en la raiz del proyecto y agregamos las variables de entorno que necesitemos. Por ejemplo:

```bash
PORT=8000
```
> **Nota**: Es importante no dejar espacios como `PORT = 8000`. Ademas, si se ejecuta codigo que use alguna de estas variables, se debe ejecutar desde la raiz del proyecto, de lo contrario no funcionará.

En este caso, estamos definiendo una variable de entorno llamada `PORT` con el valor `8000`. Ahora, para poder usar estas variables de entorno en nuestro codigo debemos importar
el paquete `dotenv`, ejecutar el metodo `config()` para cargarlas y luego para usarlas se usa la sintaxis `process.env.NOMBRE_DE_LA_VARIABLE`. Lo anterior lo haremos en el archivo `src/index.js` de la siguiente forma:

```javascript
import express from "express"
import dotenv from "dotenv"

// Ejecutamos el metodo config() del paquete dotenv
dotenv.config()

// Ahora con las variables de entorno cargadas podemos usar la variable PORT, 
// en vez de tenerla definida en el codigo
const app = express()

// Aca
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
})
```
7. Una vez que hayamos configurado un servidor básico, es momento de establecer nuestras rutas y controladores. Comenzaremos creando dos directorios: `routes` y `controllers`, que deben ubicarse al mismo nivel que `src/index.js`. Como regla general, **por cada modelo en nuestro proyecto, requeriremos un archivo de rutas y otro de controladores**. Seguiremos una convención de nombres: `routes/model_name.routes.js` para rutas y `controllers/model_name.controller.js` para controladores. Así, si consideramos un modelo llamado `Task`, tendremos los archivos `routes/task.routes.js` y `controllers/task.controller.js`.

Las **rutas** definen **endpoints**: puntos de acceso representados por `URLs` que esperan un método `HTTP` específico (como `GET`, `POST`, etc.). Los **controladores**, por otro lado, determinan la lógica que se activa al acceder a estos endpoints. En términos prácticos, mientras una ruta señala qué método `HTTP` se espera, el controlador especifica la acción o respuesta que se dará.

Para nuestra aplicación, consideraremos tres modelos: `User`, `Subject` y `Task`. Por ende, dentro de `routes/` y `controllers/`, tendremos los siguientes archivos:
```sh
├── src
│   ├── app.js
│   ├── routes
│   │   ├── user.routes.js
│   │   ├── subject.routes.js
│   │   ├── task.routes.js
│   ├── controllers
│   │   ├── user.controller.js
│   │   ├── subject.controller.js
│   │   ├── task.controller.js
.
.
.
```
En este proyecto, nuestras rutas implementarán métodos `HTTP` para realizar operaciones `CRUD`: crear, leer, actualizar y eliminar registros de la base de datos. Aunque este patrón se repite en todos los modelos, nos enfocaremos en el modelo `User` para ilustrarlo.

**Definiendo las rutas:**
En el archivo `routes/user.routes.js`, comenzamos importando `express` Creamos una instancia del método `Router()` que nos proporciona `express`. A esta instancia, le asignamos las rutas correspondientes, especificando el método `HTTP` y la acción que se ejecutará.
```js
import express from "express" 

export const userRoutes = express.Router()

userRoutes.get("/users", (req, res) => {
  res.send("This will fetch all users")
})

// Y así sucesivamente para POST, PUT, y DELETE...

```
Sin embargo, queremos seguir buenas prácticas y separar las responsabilidades. Así que, en lugar de definir la lógica de cada acción directamente en las rutas, la trasladamos a los controladores.

**Definiendo los controladores:**
El archivo `controllers/user.controller.js` contendrá las acciones o lógica para cada ruta.
```js
export const getUsers = async (req, res) => {
  // Lógica para obtener usuarios
  // De igual manera por ahora se puede dejar vacio.
}

// Y así para las demás acciones...
```
**Vinculando rutas y controladores:**
Ahora, simplemente importamos las funciones del controlador en el archivo de rutas y las asignamos a las rutas correspondientes.
```js
// En user.routes.js
import express from "express"
import { 
  getUsers, 
  // ... otros controladores
} from "../controllers/user.controller.js"

export const userRoutes = express.Router()

userRoutes.get("/users", getUsers)
// Y así sucesivamente para las demás rutas...
```
>**Nota:** Cuando trabajamos con módulos `ES6`, es importante incluir la extensión del archivo al importar un módulo propio. Por ejemplo, al importar el controlador, añadimos `.js` al final.

Observando las rutas que tenemos que definir para un `CRUD`, nos quedaria algo asi:

```js
userRoutes.get("/users", getUsers)
userRoutes.get("/users/:id", getUser)
userRoutes.put("/users/:id", updateUser)
userRoutes.delete("/users/:id", deleteUser)
userRoutes.post("/users", createUser)
```
Se puede notar la presencia de `:id` en algunas de ellas. Esto es lo que llamamos un parámetro de ruta en `Express`. Esencialmente, **es una manera de incluir variables en nuestras rutas**. Por ejemplo, si quisiéramos obtener, actualizar o eliminar un usuario específico con `id=5`, accederíamos a las rutas como `/users/5`. En nuestros controladores, este valor se puede acceder con `req.params.id`. En general podemos acceder a los parámetros de ruta con `req.params.nombre_del_parametro`.

Ahora, `Express` nos ofrece una manera más concisa de definir múltiples métodos para una ruta específica usando `.route()`. Podemos reescribir las rutas anteriores de una manera más limpia y estructurada:

```js
userRoutes.route("/users")
          .get(getUsers)
          .post(createUser)

userRoutes.route("/users/:id")
          .get(getUser)
          .put(updateUser)
          .delete(deleteUser)
```
Esto no solo es más legible, sino que también agrupa claramente las rutas por su patrón de `URL`.

Finalmente, para que estas rutas sean reconocidas y usadas por nuestra aplicación, debemos "montarlas" en nuestra aplicación principal usando el método `app.use()`. Dado que hemos utilizado el método `.route()`, es crucial especificar el prefijo de la ruta en este punto. Por ejemplo, en nuestro archivo `index.js`:

```js
import express from "express"
import { userRoutes } from "./routes/user.routes.js"

const app = express()

app.use("/users", userRoutes)

// ... Resto del código
```

De esta forma, todas las rutas definidas en `userRoutes` se prefijarán automáticamente con `/users`, lo que permite una estructura organizada y escalable para nuestro backend.

Finalmente, para asegurarnos de que todas las rutas se configuraron correctamente podemos usar `Postman` para testearlas.

8. ### **Middlewares**
Ahora que tenemos un servidor funcional con rutas y controladores, es hora de hablar sobre los **middlewares**. Un middleware es esencialmente una funcion que tiene acceso al objeto de la solicitud (request `req`), al objeto que se responda (response `res`), y al siguiente middleware en el ciclo de solicitud/respuesta, denominado (`next`). Pero, **¿para qué sirven? ¿en qué contexto se usan?** y **¿cómo se implementan?**.
La principal razon de si quiera por que son usados es porque pueden ser usados como intermediarios entre diferentes puntos de una request. Son algo asi como *"checkpoints"* por los cuales una request debe pasar antes de llegar a su punto final. Dentro de los middlewares podemos hacer basicamente de todo: 
- Ejecutar codigo
- Hacer cambios en el objeto request o response (`req` y `res`)
- Finalizar el ciclo de request/response 
- Llamar al siguiente middleware en la pila de middlewares 

Los middleware son **fundamentales** para mantener una buena aplicacion y su uso se puede ilustrar mejor con un ejemplo, especiamente para aclarar los ultimos dos puntos, que pueden ser menos evidentes. Para ello, mostraremos un ejemplo donde tendremos un middleware que solo deja pasar requests de tipo `get`.

```js
// Ejemplo
export const onlyAcceptGetsMiddleware = (req, res, next) => {
    if(req.method !== "GET"){
        return res.status(400).json({
            message: "Only GET requests are allowed"
        })
    }
    next()
}
```
Primero, podemos notar que la funcion espera tres parametros: `req`, `res` y `next`, que son los tres que mencionamos antes. Ahora, el objetivo era solo dejar pasar las requests de tipo `GET`, entonces como tenemos acceso al objeto de `req`, podemos comprobar esto facilmente. Ahora, solo continuaremos con el ciclo de la request si se cumple con la condicion, de lo contrario no llamaremos al siguiente middleware con `next()` y el ciclo finaliza. 

Ahora, algo crucial es el orden en que se ejecutan los middlewares, ya que no serviria de nada que revisemos esto luego de que la request se haya ejecutado, ¿no? Por ello es crucial estar consciente del orden en que se ejecutará. En terminos generales, los middlewares se deben ejecutar antes de lo que queremos manejar. En este caso queremos controlar las rutas, entonces el middleware debe ir antes las rutas. En concreto quedaria algo asi:

```js
import express from "express"

// Importamos el middleware
import { 
  onlyAcceptGetsMiddleware 
} 
from "./middlewares/onlyAcceptGets.middleware.js"

const app = express()

// Ahora usamos el middleware
app.use(onlyAcceptGetsMiddleware)

// Ruta que solo acepta GET
app.use("/users", userRoutes)

// ... Resto del codigo
```

Para que esto quede aun mas claro, hablaremos con mas detalle sobre el ciclo de vida de una request.

9. ### **Ciclo de vida de una request**
Antes de seguir avanzando, es muy muy importante tener claro el flujo exacto de una request en `Express`, desde que se inicia la solicitud hasta que se finaliza. 
* **Inicio de la solicitud**: 
Todo comienza cuando un cliente realiza una solicitud de algun tipo a alguna `URL` de nuestro servidor, como por ejemplo acceder al metodo `GET` a traves de visitar la `URL` `http://localhost:8000/users` o enviar un formulario con el metodo `POST`.
* **Entrada en el Middleware**:
Asumiendo que hay middlewares, entonces la solicitud entrara primero a ello. Ademas se ejecutaran en el orden en que esten definidos en el codigo. Por ejemplo

```js
app.use(middlewareA)
app.use(middlewareB)
```
Si un cliente realiza una solicitud, primero pasará por `middlewareA` y luego por `middlewareB`.

* **Ejecucion del Middleware**:
Como mencionamos, el middleware tiene la opcion de finalizar el ciclo o realizar operaciones adicionales y pasar al siguiente paso (tambien puede pasar errores al siguiente paso, esto puede ser util para manejar errores). Otro caso de uso para un middleware podria ser para autenticar. Por ejemplo si un usuario no esta autenticado entonces el middleware puede cortar el ciclo enviando algun codigo de error como `401 Unauthorized` y no llamar al `next()`. Pero si estuviese autorizado entonces simplemente pasamos al siguiente paso llamando a `next()`.

* **Llegada a la ruta**:
Ahora, si la solicitud pasa por todos los middlewares 


### Cosas por mencionar

#### BASE DE DATOS Y LA CONEXION
- Comenzar escribiendo una semi charla motivacional del estilo: "En este punto del proyecto se pueden tener muchos problemas, con incontables causas, pero no hay que preocuparse, al final del dia resolver estos problemas nos da caracter y nos hace mejores programadores. Asi que no hay que desanimarse y seguir adelante. Ahora, con eso dicho, vamos a hablar sobre la base de datos y como conectarnos a ella."
- Hablar sobre conexiones de la base da datos. En general podemos tener dos enfoques: 
    - Cliente unico (un solo cliente se conecta a la base de datos)
      Este es util solo cuando quiero una unica conexion, posiblemente util
      para hacer pruebas o para tener una base de datos local.
    - Pool de conexiones (varios clientes se conectan a la base de datos)
      En cambio el pool de conexiones es util cuando tenemos varios clientes
      conectados a la base de datos, por ejemplo, en un servidor. En nuestro caso usaremos el pool de conexiones.
- Para usar el pool de conexiones de postgresql, usaremos el paquete `pg`. Para instalarlo ejecutamos `npm i pg`.
- Para la implementacoin se siguio: https://node-postgres.com/apis/pool
- Ahora, inicialmente testearemos localmente entonce necesitamos tener una base de datos local con la cual trabajar. Para eso necesitamos trabajar en consola con `psql`. Para esto necesitamos pasos bien generales:
  1. Primero obviamente tener postgres instalado (sino creo que funciona `sudo apt-get install postgresql postgresql-contrib`)
  2. Luego ejecutar `sudo -i -u postgres`
  3. Una vez dentro de postgres ejecutamos `psql` para entrar a la consola de postgres
  4. Crear una base de datos con `CREATE DATABASE nombre_de_la_base_de_datos;`
  5. Crear un usuario con `CREATE USER nombre_de_usuario WITH ENCRYPTED PASSWORD 'contraseña';`
  6. Darle permisos al usuario sobre la base de datos con `GRANT ALL PRIVILEGES ON DATABASE nombre_de_la_base_de_datos TO nombre_de_usuario;`
- Ahora nuevamente hay que tomar una decision. Sobre si usar una arquitectura para transacciones 
  o usar consultas simples porque no es necesario usar transaccions en este caso. Dejar clara la diferencia entre transaccion y consultas simples
- quiza mencionar que psql funciona como quiere en wsl y puede ser una mejor y mas sconsistente alternativa usar simplemente windows o docker. La instalacion: https://www.enterprisedb.com/postgresql-tutorial-resources-training-1?uuid=c70fc67b-ca1f-4dc2-b73b-ccb7367fb6b8&campaignId=Product_Trial_PostgreSQL_15
Luego sera necesario agregar psql a las variables de enterno. Para esto:
a. Haz clic derecho en el ícono de "Este equipo" o "Mi PC" y selecciona "Propiedades".
b. Haz clic en "Configuración avanzada del sistema".
c. Haz clic en el botón "Variables de entorno".
d. En "Variables del sistema", busca la variable Path y selecciona "Editar".
e. Haz clic en "Nuevo" y añade la ruta del directorio bin de tu instalación de PostgreSQL, por ejemplo, C:\Program Files\PostgreSQL\<version>\bin\.
f. Haz clic en "Aceptar" en todas las ventanas para guardar los cambios.
g. Cierra y vuelve a abrir tu símbolo del sistema o PowerShell y prueba nuevamente ejecutar psql -U postgres.
- En mi caso el puerto donde fue instalado postgres fue el 5433, por algun motivo al correr psql -U postgres no funcionaba, entonces al ejecutarlo tuve que espeecificar el puerto: `psql -U postgres -p 5433`
- Lo del puerto esmuy importante tenerlo claro porque luego esa informacion es usada al momento de conectarnos a la base de datos desde node. Algunas configuraciones por defecto no traen el argumento de port, este por defecto es 5432 y en la mayoria de los casos funciona, pero en mi caso no funciono y tuve que especificarlo. En concreto queo asi:

```js
import { Sequelize } from 'sequelize'
import dotenv from "dotenv"
dotenv.config()

export const sequelize = new Sequelize(
  process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, 
  {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'postgres'
})

try {
  await sequelize.authenticate()
  console.log('Connection has been established successfully.')
} catch (error) {
  console.error('Unable to connect to the database:', error)
}
```

- Al parecer es mejor usar sequelize: `npm install sequelize pg pg-hstore `: aqui sequelize es el orm y pg junto con pg-hstore son los drivers de postgresql
https://www.digitalocean.com/community/tutorials/how-to-use-sequelize-with-node-js-and-mysql
https://sequelize.org/docs/v6/getting-started/
- Como nota, sequelize usa pools de conexiones por defecto
- No olvidar iniciar el servicio de postgres con `sudo service postgresql start`

- luego solo exportamos la instancia de sequelize y la referenciamos donde sea que la necesitemos usar. Por ejemplo siempre va en el parametro de opciones al crear un modelo. De esa forma sequelize sabe a que base de datos conectarse.
#### Implementacion de Modelos
- En esencia los modelos son tablas de la base de datos. En sequelize se definen como clases que extienden de `Model` y se definen sus atributos y metodos. Luego se exporta el modelo y se usa en el controlador.
- En general hay dos formas de definir un modelo:
  - usando sequelize.define(modelName, attributes, options)
  - extendiendo de Model y llamando a init(attributes, options)
  En resumen extender un modelo es una opcion mas escalable y que permite tener mas control sobre el modelo. Aca podemos agregar metodos y hooks. Ademas las asociaciones quedan mas claras. Por esta razon se usara esta opcion.
- Mencionar que por defecto se creara una tabla con el plural del nombre del modelo. Aunque esto es configurable, en caso de que se busque otro comportamiento.
- Hay ciertos puntos claves que hay que tener en cuenta respecto a las tablas y los modelos. En general, si por ejemeplo creamos un modelo llamado User, que pasa si esta tabla ni siquiera existe? O que pasa si existe, pero tiene diferentes columnas, o cualquier diferencia. Aqui entra en juego la sincronizacion, a traves del metodo `sync()` de sequelize. Existen tres opciones:
  1. Model.sync(): Crea la tabla si no existe, y si existe no hace nada
  2. Model.sync({ force: true }): Crea la tabla, y si existe la elimina y la vuelve a crear para que sea igual al modelo
  3. Model.sync({ alter: true }): Si la tabla existe, verifica que sea igual al modelo y si no lo es, la actualiza para que sea igual al modelo
Ahora si quisiesemos por ejemplo sincronizar todos los modelos con sus respectivas tablas podemos hacer: `sequelize.sync({ force: true })`

- Validaciones. Estas se pueden hacer directo en los modelos o se pueden hacer en otros lados como controladores o incluso middlewares. Lo bueno de hacerlas en el modelo es que nos aseguramos de que lo que sea que se guarden en las base de datos va a ser valido, estaran centralizadas y siempre se haran en el mismo lugar. Existen caso donde se pierde flexiblidad, en caso de que quisiesemos hacer vlaidaciones condicionales, pero en general estan bien dentro de modelos. En particular para este caso, las haremos ahi. 

- ID y primary keys: en sequelize por defecto se crea un atributo de id que es primary key y se incrementa solo. Ahora, si quisiesemos modificar esto un poco podemos definir nuestro propio campo para id, y que en vez de que  sea un entero que se cinremente, que sea un string que se genere automaticamente. Para esto usamos el tipo de dato `UUID` y el metodo `UUIDV4` de sequelize. Esto se puede hacer de la siguiente forma:
```js
id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
}
```
De todas formas esto no sera usado para este proyecto, pero es bueno saberlo.
- Ahora algo importante son las validaciones. 
- Ahora, como extendemos de Model, podemos facilmente agregar metodos a nuestros modelos. Por ejemplo, podemos agregar un metodo que verifique si la contraseña es correcta. Esto se puede hacer de la siguiente forma:
```js
User.prototype.isPasswordValid = async function(password) {
  return await bcrypt.compare(password, this.password);
}
```
y luego cuando tenga una  instancia de usaurio entonces podre usar este metodo, por ejemplo asi:
```js
const email = 'user@example.com';
const plainPassword = 'user_password';

const user = await User.findOne({ where: { email } });
if (user) {
  if (await user.isPasswordValid(plainPassword)) {
    console.log('Contraseña correcta');
  } else {
    console.log('Contraseña incorrecta');
  }
} else {
  console.log('Usuario no encontrado');
}
```
- Ahora, que es esta sintaxis `prototype`? En javascript casi todos los objetos tienen un "prototipo", que es en terminos simples, un objeto al que el objeto original hace referencia. La gracia es que a traves de el podemos heredar comportamientos. En concreto, lo que ocurre cuando javascript intenta verificar si una propiedad de un objeto existe o no es la siguiente: Primero revisa en el objeto mismo y si no la encuentra, va a buscar en el prototipo, luego si no la encuentra en el prototipo entonces busca en el protitotipo del prototipo, y asi. Hasta que llegue al final y lo retornara o retornara undefined. Aca hay un ejemplo de uso:
```js
function Dog(name) {
  this.name = name;
}

Dog.prototype.bark = function() {
  console.log(this.name + " barks!");
}

const myDog = new Dog("Rex");
myDog.bark();  // Imprime "Rex barks!"
```
Esto en terminos de memoria es eficiente, porque en vez de que todos los objetos tengan copias de cada metodo, todos los objetos "heredan" de un unico objeto padre para compartir comportamientos.
Ahora, esta es la forma "antigua" de agregar metodos a clases. Con la version moderna de javascript se pueden implementar metodos como en demas lenguajes orientados a objetos. Por ejemplo:
```js
class Dog {
  constructor(name) {
    this.name = name;
  }

  bark() {
    console.log(this.name + " barks!");
  }
}
```
Y se obtendria el mismo comporatmiento. Menciono esto porque usar `prototype` fue la norma por mucho tiempo y es muy probable que se encuentre en codigo antiguo. Aca usaremos la forma mas moderna. Entonces nos quedaria algo asi:
```js
export class User extends Model {
    isPasswordValid() {
        // Tu código aquí
    }
}

User.init({
  // Tus definiciones de campo
}, {
  // Opciones adicionales
});
```
- Mencionar que en las opciones del init siempre debemos poner la instancia sobre la cual instanciamos la base datos. Ademas es buena practica agregar el campo modelName, por ejemplo para el modelo User, podemos modelName: 'user'

- Mencionar el razonamiento de las asociaiones y que esta mejor hacerlas en su propio archivo "models.js".


#### Seeds
- Mencionar el uso de seeders: 
    1. instalar sequelize-cli: `npm install --save-dev sequelize-cli`
    2. correr `npx sequelize-cli seed:generate --name demo-data`. Esto creara un archivo en la carpeta seeders con el nombre demo-data. Este archivo es un template para crear seeders.
- En esencia las seeds son migraciones, por lo tanto tienen metodos up y down. Ahora, para correr estos metoos tenemos: `npx sequelize-cli db:seed:all` y para deshacerlos `npx sequelize-cli db:seed:undo:all`
- Entonces todo lo que pongamos en up se creara al correr `npx sequelize-cli db:seed:all` y todo lo que pongamos en down se deshara al correr `npx sequelize-cli db:seed:undo:all`. Entonces los datos "test" iran dentro del metodo up. Ahora debemos correr el siguiente comando para poder ejecutar las seeds: `npx sequelize-cli init`. Esto creara un archivo de configuracion para la base de datos y lo debemos ajustar para nuestro proyecto. El problema es que por defecto este archivo es un `.json`, y ahi no podemos usar variables de entorno. Ahora, si vamos al `index.cjs` que configura todo esto, vamos a ver que el `config.json` simplemente se trae con un `require`, pero lamentablemente esto no es sufuciente. Por detras `sequelize` sigue "apuntando" a un archivo de extension `json`, por lo tanto lo que hay que hacer es crear un nuevo archivo `.sequelizerc` y ahi especificar ciertas rutas. En particular quedaria asi:
```.squelizerc
const path = require('path');

module.exports = {
  'config': path.resolve('config', 'config.cjs'),
  'models-path': path.resolve('models'),
  'seeders-path': path.resolve('seeders'),
  'migrations-path': path.resolve('migrations')
};
```
Por otro lado, algo muy importante y particular para mi caso, como estoy trabajando con un puerto que no es el `5432`, entonces tambien debo especificarlo aqui, tal como lo hiccimos para `db.js`. En particular, `config.cjs` (la extension `.cjs` es para crear modulos de `commonjs` en configuracion `ES6`) quedaria asi:
```js
require('dotenv').config()

module.exports = {
    development: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT,
        host: process.env.DB_HOST,
        dialect: 'postgres',
    }
}
```
- FINALMENTE PODEMOS HACER SEEDS, que en esencia son migraciones, uno de los puntos mas fundamentales de una base de datos.
- Para seguir con las seeds, basicamente sirven para poblar la base de datos con los datos que sea que queramos poner. En general las seeds tienen dos metodos: `up` y `down`. Intuitivamente cuando hacemos `npx sequelieze-cli db:seed:all` ejecutamos el metodo up, y cuando hacemos `npx sequelize-cli db:seed:undo:all` se eecuta el metodo `down`. Entonces los datos que queramos rellenar deben ir en `up` y cuando corramos `down`, estos se borraran. 
- Una cosa a considerar es que en nuestros modelos pusimos `timestamps: true`. Esto hara que las columnas `updatedAt` y `createdAt` se rellenen automaticamnete, pero en las `seeds` esta info debemos ponerla manualmente, con `Date.now()`.


- Respecto a las migraciones, pasaron mil cosas pero en esencia hay que:
  1. Tener mucho ojo con poner bien las variables de entorno (XD)
  2. Al momento de hacer el `npx sequelize-cli init` se crean cuatro directorios nuevos: `config`, `migrations`, `models` y `seeders`. Toda la configuracion de la base de datos se guarda en config, basicamente lo mismo que hicismo para conectarnos en `db.js`. Luego aca hay un ligero problema, o potencial problema y es que 


#### Migraciones
- Hay un gran tema con las migraciones. En primer lugar, al igual que sync, son una manera de hacer modifiaciones a la base de datos, como agregar nuevos modelos o incluso modificar informacion sobre una tabla (modelo) ya existente. En terminos practicos, tanto sync() como migraciones logran lo mismo, pero de diferentes maneras. Esto ultimo es clave, ya que NO se debe usar juntos. A nivel bajo de codigo funcionan de maneras fundamentalmente diferentes y usarlas en conjunto podria llevar a cabo problemas de consistencia.

- Ahora nace la pregunta: cual es mejor y por que. Antes de pasar a lleno, definamos bien que hace exactamente cada una y como.

1. Sync(): basicamente definimos los modelos en codigo, manualmente. Ademas podemos definir las asociaciones alli mismo tal como mencione antes, de la forma `Model1.HasMany(Model2, {foreingKey: 'model1Id'})` y `Model2.HasOne(Model1, {foreingKey: 'model1Id'})`, por ejemplo. Esto es aceptable a nivel de desarrollo, pero tiene el problema que es propenso a errores.

2. Migraciones: con migraciones la cosa cambia un poco. En el fondo, hacemos todos los cambios grandes a traves de comandos en la consola. Por ejemplo para crear un modelo con ciertos atributos podemos ejecutar el comando `npx sequelice-cli model:generate --name Model --attributes firstColumn:type,secondColumn:type,...` Tambien, a traves del mismo formato de comandos por consola, podemos hacer cambios al alguna tabla en especifico, como por ejemplo modificar alguna columna, su tipo, que se yo. Esto es una increible ventaja, porque por cada migracion, se crea un archivo de migracion que representa exactamente a ese cambio. En esta linea, dentro de cada migracion existen dos metodos: `up` y `down`. Esto significa que podemos hacer y deshacer la migracion muy facilmente. Entonces podemos tener algo asi como un `git` para la base de datos, donde podemos versionar cambios, revertirlos, deshacerlos, etc. En general la forma en que se trabaja con la base de datos cambia un poco, respecto a si usaramos `sync()`. Por ejemplo ahora si dos modelos estan relacionados entre si, ademas de hcaer la asociacion respectiva, habria que ademas agregar una opcion extra para la columna que se quiera agregar, que debe hacer referencia al modelo con el cual se relaciona. Ahi mostrare un ejemplo.


3. Reestructuracion del codigo: Ya no necesitamos `db.js`. Es mas, ya ni siqueira necitamos el archivo `db.js` que exporta nuestra instancia de conexion a la base de datos. Ahora podemos simplemente hacer todo a traves de migraciones usando la conexion que se crea por defecto en `models/index.cjs`. Entonces: debemos eliminar el `sync()` y debemos eliminar el archivo `db.js`.

#### Sintaxis dentro de migraciones
Podemos hacer muchisimas cosas. Aqui muestro las que vaya encontrandome
1. Podemos crear un base de datos directamente con `npx sequelize-cli db:create`
  1.1 Si ya existe una db con ese nombre tira un error
  1.2 Si no existe entonces se creara (notar que el nombre viene en los parametros de conexion, en la key `database`)

2. Ahora, podemos crear modelos (tablas) muy facilmente con el comando: `npx sequelize-cli model:create --name Model --attributes column1:type,column2:type,...`

3. En general las migraciones son archivos que tienen alguna instruccion adentro que reflejaran algun cambio en la base de datos. La sintaxis general es `npx sequelize-cli migration:generate --name nombre_del_archivo`. Luego dentro de este archivo tenemos dos metodos maestros: `up` y `down`. En el `up` ponemos algun metodo que queramos. 

4. Metodos mas comunes:
reateTable: Crea una nueva tabla.
dropTable: Elimina una tabla.
renameTable: Renombra una tabla.
addColumn: Agrega una nueva columna a una tabla.
removeColumn: Elimina una columna de una tabla.
renameColumn: Renombra una columna.
changeColumn: Cambia el tipo o las propiedades de una columna.
addIndex: Agrega un índice a una tabla.
removeIndex: Elimina un índice de una tabla.

#### Asociaciones a traves de migraciones
En general existen tres tipos de asociaciones: uno a uno (has one: belongs to), uno a muchos (has many : belongs to) o muchos a muchos (has many: belongs to many)

1. Uno a uno: En este caso, por ejemplo, un usuario tiene un perfil. Entonces el usuario tiene un perfil y el perfil pertenece a un usuario. En este caso, el usuario tiene un perfilId que hace referencia al id del perfil. Entonces la asociacion se veria algo asi:
```js
User.hasOne(Profile)
Profile.belongsTo(User, {foreignKey: 'profileId'})
```
Respect al parametro `foreingKey`, este representara la columna que los "linkeara" a ambos. Es posible no poder este parametro y sequelize inferira el nombre de la columna, pero es mejor especificarlo.

2. Uno a muchos: En este caso, por ejemplo, un usuario tiene muchas tareas. Entonces el usuario tiene muchas tareas y la tarea pertenece a un usuario. La asociacion funciona igual que el caso anterior, sintacticamente hablando. La diferencia es que aqui la relacion como tal es difernete.
```js
User.hasMany(Task)
Task.belongsTo(User, {foreignKey: 'userId'})
```

3. Muchos a muchos: En este caso, por ejemplo, un alumno tiene muchas clases y cada clase tiene muchos alumnos. Entonces la asociacion se veria algo asi:
```js
Student.belongsToMany(Class, { through: 'StudentClass' })
Class.belongsToMany(Student, { through: 'StudentClass' })
```
Aca hay una gran diferencia. En este tipo de asociaciones es necesaria una tabla intermedia que contiene los ids de los modelos involucrados.


Ahora, si estamos trabajando con asociaciones, entonces ademas de definir el tipo de asociacion, como acabamos de mostrar, hay que agregar manualmente la columna a la tabla que haga referencia al id del modelo con el cual exista la asociacion. Pero, en que tabla exactamente? y donde? en las migraciones o en modelo? Esas son preguntas muy importantes

1. En que tabla debo agregar una referencia? 
Primero que todo, la referencia debe ir en solo una tabla, y a modo de regla general, debe ir en la tabla que define el belongsto. Recordar que solo debemos poner referencias en 1:1 y 1:n. En este caso, las referencias deberian ir en :1 y en :n. 

2. donde? en migraciones o modelo? 
La idea es que en ambas, aunque con ponerlas en una basta, pero para hacer nuestro programa mas robusto es ideal ponerlo en ambas. Aca igual es clave tener algo claro: las migraciones trabajan a nivel de base de datos, mientras que los modelos trabajan a nivel de codigo. Entonces, si queremos que nuestra base de datos sea consistente con nuestro codigo, debemos poner las referencias en ambos lados.

3. Finalmnete, como se ven estas "referencias" de las que tanto he hablado. En terminos practicos son simplmente una columna de esta forma:

```js

references: {
  model: 'ModelName',
  key: 'id' // <= este seria el primary key de la tabla ModelName
}

```

* Para este proyecto se intentara modelar una universidad y se tendran los siguientes modelos: User, Course, Tasks, TaskTemplate 
1. Cada alumno esta en uno o mas cursos y cada curso tiene uno o mas alumnos: User - Course : M - N
2. Cada curso tiene una o mas tareas y cada tarea pertenece a un curso en especifco: Course - TaskTemplate : 1 - N
3. Cada alumno en un curso tiene una o mas tareas que realizo y cada una de estas tareas pertenece a un unico alumno: User - Task : 1 - N
4. Cada tarea proviene de un unico template y un template puede originar multiples tareas: TaskTemplate - Task : 1 - N. Con esta asociacion, si quiero saber todas las tareas que provienen de un template, puedo hacer `taskTemplate.getTasks()`. Y si quiero saber de que template proviene una tarea, puedo hacer `task.getTaskTemplate()`

Consideraciones para cada asociacion.
1. Cuando se elimina un usuario no quiero eliminar el curso y cuando se elimina un curso no quiero eliminar un usuario

2. Cuando se elimina un curso, quiero eliminar a las tareas template, eso es correcto. Entonces pondre un `onDelete: 'cascade'` en `TaskTemplate.BelongsTo(Course, onDelete: 'CASCADE')`

3. Cuando se elimina un usuario quiero eliminar todas sus tareas, eso es correcto amigo. Entonces, pondre un `onDelete: 'cascade'` en `Task.BelongsTo(User, onDelete: 'CASCADE')`

4. Cuando se elimina un TaskTemplate quiero eliminar todas las tareas asociadas. Seria como cancelar la tarea. En ese caso pondre  un `onDelete: 'cascade'` en `Task.BelongsTo(TaskTemplate, onDelete: 'CASCADE')`. 

Al hacer asociaciones se crean metodos automaticamente. Por ejemplo si tenemos un usuario y queremos obtener sus tareas, podemos hacer `user.getTasks()`. Y asi un monton de metodos.

#### Agregue un linter: eslint
Para instalarlo use `npm i eslint -D`
Luego hice `npx eslint --init` y elegi la config de `airbnb`
despues se puede agregar un script en package.json para que se linteen todos los archivos de una vez: 
`"lint": "eslint 'src/**/*.{js,jsx}",`

#### Seeding
para probar que todo este en orden se puede rellenar la base de datos con valores por defecto. Esto puede ser muy tedioso hacerlo a mano, por ello usaremos una libreria que genera datos random llamada `faker-js`. Se instala con `npm i @faker-js/faker -D`.
Ahora para crear un seed file podemos correr el comando `npx sequelize-cli seed:generate --name file-name`. Luego para correr las seeds se usa `npx sequelize-cli seed:all`

- ### Cosas por hacer

- Conectar a base de datos postgresql [done]
- Agregar sequelize como ORM [done]
- Crear tres modelos basicos: User, Subject, Task [x]
- Crear asociaciones entre los modelos: User hasMany Subject, Subject hasMany Task, Task belongsTo Subject, Subject belongsTo User [x]

- Agregar seeders para poblar la base de datos [x]
- Agregar validaciones a los modelos [x]
- Agregar migraciones para crear las tablas en la base de datos 
- Agregar CI/CD
- Preparar terreno para autenticacion (bcrypt, jsonwebtoken, cookie-parser, cors)
- Configurar cookies y cors
- Actualizar el modelo de User para tener un metodo que verifique si la contraseña es correcta
- Crear un controlador para el modelo User que tenga un metodo para registrar un usuario y otro para loggear un usuario
- Crear un middleware para proteger las rutas
- Agregar las rutas de registro y login
- conectar las rutas de registro y login con los controladores
- Crear un controlador para el modelo Task que tenga un metodo para crear una task, otro para obtener todas las tasks de un subject y otro para eliminar una task
- Crear un controlador para el modelo Subject que tenga un metodo para crear un subject, otro para obtener todos los subjects de un usuario y otro para eliminar un subject
- Crear un middleware de autenticacion para proteger las rutas
- Aplicar el middleware de autenticacion a las rutas de subjects y tasks


#### Validaciones utiles
is / isNot: Permite especificar una expresión regular (regex) que el valor debe cumplir.

javascript
Copy code
attributeName: {
  validate: {
    is: /^[a-z]+$/i,
    msg: 'Solo se permiten letras.'
  }
}
isEmail: Comprueba si el valor es un correo electrónico válido.

javascript
Copy code
email: {
  type: DataTypes.STRING,
  validate: {
    isEmail: true
  }
}
len: Establece un rango de longitud aceptable para el valor.

javascript
Copy code
password: {
  type: DataTypes.STRING,
  validate: {
    len: [8, 100] // Contraseña debe tener entre 8 y 100 caracteres
  }
}
min / max: Especifica un valor mínimo y/o máximo (útil para números).

javascript
Copy code
age: {
  type: DataTypes.INTEGER,
  validate: {
    min: 18,
    max: 100
  }
}
isUrl: Verifica si el valor es una URL válida.

javascript
Copy code
website: {
  type: DataTypes.STRING,
  validate: {
    isUrl: true
  }
}
isDate: Asegura que el valor sea una fecha válida.

javascript
Copy code
birthdate: {
  type: DataTypes.DATE,
  validate: {
    isDate: true
  }
}
isAlpha: Verifica si el valor contiene solo letras.

javascript
Copy code
lastName: {
  type: DataTypes.STRING,
  validate: {
    isAlpha: true
  }
}
isNumeric: Comprueba si el valor contiene solo números.

javascript
Copy code
phoneNumber: {
  type: DataTypes.STRING,
  validate: {
    isNumeric: true
  }
}
isAlphanumeric: Asegura que el valor contenga solo letras y números.

javascript
Copy code
username: {
  type: DataTypes.STRING,
  validate: {
    isAlphanumeric: true
  }
}
notEmpty: Garantiza que el valor no esté vacío.

javascript
Copy code
username: {
  type: DataTypes.STRING,
  validate: {
    notEmpty: true
  }
}