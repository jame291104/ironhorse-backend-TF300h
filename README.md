# Proyecto de Pruebas Unitarias con Node.js, MongoDB, Jest y Supertest

Este proyecto demuestra cómo realizar pruebas unitarias e de integración en una API RESTful construida con Node.js y MongoDB, utilizando Jest como framework de pruebas y Supertest para probar las rutas HTTP.

## Descripción

Este repositorio contiene ejemplos de pruebas para diferentes escenarios, incluyendo:

*   Pruebas de los modelos de datos (interacción con MongoDB).
*   Pruebas de los controladores (lógica de las rutas).
*   Pruebas de las rutas (endpoints de la API).

Se utiliza una base de datos en memoria para las pruebas de integración con MongoDB, lo que permite ejecutar las pruebas de forma aislada y sin afectar a una base de datos real.

## Tecnologías Utilizadas

*   [Node.js](https://nodejs.org/): Entorno de ejecución para JavaScript en el servidor.
*   [Express](https://expressjs.com/): Framework web para Node.js.
*   [MongoDB](https://www.mongodb.com/): Base de datos NoSQL.
*   [Mongoose](https://mongoosejs.com/): ODM (Object Data Modeling) para MongoDB.
*   [Jest](https://jestjs.io/): Framework de pruebas de JavaScript.
*   [Supertest](https://github.com/visionmedia/supertest): Librería para probar solicitudes HTTP.

## Instalación

1.  Clona el repositorio:

    ```bash
    git clone [[https://github.com/jame291104/ironhorse-backend-TF300h.git]]
    ```

2.  Navega al directorio del proyecto:

    ```bash
    cd NOMBRE_DEL_REPOSITORIO
    ```

3.  Instala las dependencias:

    ```bash
    npm install
    ```

## Ejecución de las Pruebas

Para ejecutar las pruebas, utiliza el siguiente comando:

```bash
npm test
```

## Autor:

Jesús Morán Espinoza

## Evidencia de pruebas unitarias exitosas

![Imagen del resultado de las pruebas](/src/assets/Pruebas%20back%20exitosas%20captura.png)