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
- Traer las instancias neceasarias para el pool y guardar la configuracion de la base de datos en
su propio archivo `src/db/config.js`
- Al parecer es mejor usar sequelize: `npm install sequelize pg pg-hstore `: aqui sequelize es el orm y pg junto con pg-hstore son los drivers de postgresql
https://www.digitalocean.com/community/tutorials/how-to-use-sequelize-with-node-js-and-mysql
https://sequelize.org/docs/v6/getting-started/
- Como nota, sequelize usa pools de conexiones por defecto
- No olvidar iniciar el servicio de postgres con `sudo service postgresql start`
- Adicionalmente segun la documentacion podemos testear la conexion con 
```js
try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}
```
- luego solo exportamos la instancia de sequelize
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

### Cosas por hacer

- Conectar a base de datos postgresql [done]
- Agregar sequelize como ORM [done]
- Crear tres modelos basicos: User, Subject, Task
- Crear asociaciones entre los modelos: User hasMany Subject, Subject hasMany Task, Task belongsTo Subject, Subject belongsTo User [x]

- Agregar migraciones para crear las tablas en la base de datos
- Agregar seeders para poblar la base de datos
- Agregar validaciones a los modelos
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