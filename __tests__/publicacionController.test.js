import supertest from "supertest";
import app from "../app.js";
import mongoose from "mongoose";
import publicacionModel from "../src/models/publicacion.model.js";

describe('Pruebas de controllers de publicaciones IH', () => {
    /*
        beforeEach: para ejecutar acciones que queramos que se hagan antes de cada prueba
        afterAll: para ejecutar acciones despues que acaba la prueba
    */

    beforeEach(async () => {
        await publicacionModel.deleteMany({}) //Borra todo lo del db
    });

    afterAll(async () => {
        await mongoose.connection.close()
    });

    const testPost = {
        title: "Hello World",
        image_url: "https://exampleimage123456789.png",
        description: "Esto es una prueba",
        content: "Esto es un contenido de prueba",
        author: "Jesús Moraá Test",
        category: "Prueba",
        createdAt: "01/01/1970",
        updatedAt: "01/01/1970", 
        views: 4,
    }

    // Defino bloque de preuba para GET
    describe('Prueba GET /publicaciones', () => {

        //primer caso de prueba: debería indicar que no hay usuarios almacenados
        it('Debería indicar que no hay publicaciones almacenadas', async () => {
            const res = await supertest(app).get('/publicaciones/obtener')
            
            console.log(res.statusCode);
            
            expect(res.statusCode).toBe(200)
            expect(res.body).toHaveProperty('mensaje', 'No hay publicaciones almacenadas')

        })


        it('Debería indicar que hay publicaciones almacenadas', async () => {
            const postCreater = await new publicacionModel(testPost).save()
            const res = await supertest(app).get('/publicaciones/obtener')
            
            console.log(res.statusCode);
            
            expect(res.statusCode).toBe(200)
            // expect(res.body).toHaveProperty('mensaje', 'No hay publicaciones almacenadas')

        })

        // Si van a probar que funcione la peticion get teniendo usuarios almacenados
        //await new userModel(testUser).save()

    });

    // Defino bloque de preuba para GET por ID
    describe('Prueba GET /publicaciones/:id', () => {

        //primer caso de prueba: debería indicar que no hay publicaciones almacenadas por id, retorna error 500 ya que no tiene ningun post almacenado en esta instancia

        it('Debería indicar que no hay publicaciones almacenadas por ese id', async () => {

            const postCreater = await new publicacionModel(testPost).save()
            const res = await supertest(app).get('/publicaciones/obtener/' + "67872a3af82930481d06e79b")
            
            console.log(res.statusCode);
            
            expect(res.statusCode).toBe(404)
            expect(res.body).toHaveProperty('message', 'Publicación no encontrada')

        })

        it('Debería consultar exitosamente la publicación creada', async () => {
            const postCreater = await new publicacionModel(testPost).save()
            const res = await supertest(app).get('/publicaciones/obtener/' + postCreater._id)
            
            console.log(res.statusCode);
            
            expect(res.statusCode).toBe(200)
            // expect(res.body).toHaveProperty('message', 'Error al obtener la publicación')

        })


    });


    // Bloque de prueba para POST
    describe('Pruebas POST /publicaciones/crear', () => {

        //Primer caso de prueba
        it('Debería crear una publicación correctamente', async () => {
            const res = await supertest(app).post('/publicaciones/crear').send(testPost)

            //Defino lo que espero recibir como respuesta
            expect(res.statusCode).toBe(201)
        })

        //Segundo caso de prueba
        it('Debería devolver un error al crear una publicación', async () => {
            const res = await supertest(app).post('/publicaciones/crear').send({
                content: 'Esto es una prueba',
                category: 'prueba123'
            })

            //Defino lo que espero recibir como respuesta
            expect(res.statusCode).toBe(400)
            expect(res.body).toHaveProperty('message', 'Error al crear publicación')
        })
    })



    // Bloque de prueba para PUT
    describe('Pruebas PUT /publicaciones/actualizar/:id', () => {
        //Primer caso de prueba
        it('Debería actualizarse correctamente', async () => {

            const postCreater = await new publicacionModel(testPost).save()
            console.log(postCreater._id);
            
            const res = await supertest(app).put('/publicaciones/actualizar/' + postCreater._id).send({
                title: "Updated Title",
            })

            //Defino lo que espero recibir como respuesta
            expect(res.statusCode).toBe(200)
            // expect(res.body).toHaveProperty('message', '')

        })

        //Segundo caso de prueba
        it('Debería devolver un error al crear una publicación', async () => {

            const postCreater = await new publicacionModel(testPost).save()
            console.log(postCreater._id);

            const res = await supertest(app).put('/publicaciones/actualizar/' + '67871bb1173a960f70df8a32').send({
                content: 'Esto es una prueba',
                category: 'prueba123'
            })

            //Defino lo que espero recibir como respuesta
            expect(res.statusCode).toBe(404)
            expect(res.body).toHaveProperty('message', 'Publicación no encontrada')
        })
    })


    //Bloque de pruebas para DELETE
    describe('Pruebas DELETE /publicaciones/eliminar/:id', () => {

        it('Debería eliminar exitosamente una publicación por su id', async () => {

            const postCreater = await new publicacionModel(testPost).save()
            console.log(postCreater._id);

            const res = await supertest(app).delete('/publicaciones/eliminar/' + postCreater._id)

            expect(res.statusCode).toBe(200)
            expect(res.body).toHaveProperty('message', 'Publicación eliminada con éxito')
        })

        it('Debería lanzar error 404 al eliminar una publicación por su id', async () => {

            const postCreater = await new publicacionModel(testPost).save()
            console.log(postCreater._id);

            const res = await supertest(app).delete('/publicaciones/eliminar/' + '67872a3af82930481d06e79b')

            expect(res.statusCode).toBe(404)
            expect(res.body).toHaveProperty('message', 'Publicación no encontrada')
        })
    })


})