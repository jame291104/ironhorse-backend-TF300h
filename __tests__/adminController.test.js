import supertest from "supertest";
import app from "../app.js";
import mongoose from "mongoose";
import { AdminModel } from "../src/models/administrador.modelo.js";

describe('Pruebas controladores de admins users IH', () => {
    /*
        beforeEach: para ejecutar acciones que queramos que se hagan antes de cada prueba
        afterAll: para ejecutar acciones despues que acaba la prueba
    */

    beforeEach(async () => {
        await AdminModel.deleteMany({}) //Borra todo lo del db
    });

    afterAll(async () => {
        await mongoose.connection.close()
    });

    const testAdminUser = {
        username: 'Admin Pablo Albeiro',
        email: 'admin_pablo_albeiro@test.com',
        password: '123456789',
        role: 'superadmin',
        permissions: {
            content: "read"
        }
           
    }


    // Bloque de prueba para POST
    describe('Pruebas POST /admin', () => {

        //Primer caso de prueba
        it('Debería crear un admin correctamente', async () => {
            const res = await supertest(app).post('/admin/crear').send(testAdminUser)

            //Defino lo que espero recibir como respuesta
            expect(res.statusCode).toBe(201)
            expect(res.body).toHaveProperty('message', 'Administrador creado exitosamente')

        })

        //Segundo caso de prueba
        it('Debería devolver un error al crear un admin', async () => {
            const res = await supertest(app).post('/admin/crear').send({
                email: 'admin_pablo_albeiro@test.com',
                password: '123456789'
            })

            //Definir que esperamos de esa respuesta
            expect(res.statusCode).toBe(500)
            expect(res.body).toHaveProperty('message', 'Error al crear el administrador')
        })
    })

    // Bloque de pruebas para GET
    describe('Pruebas GET /admin', () => {

        //Primer caso de prueba: Traer usuarios admin almacenados exitosamente
        it('Debería traer los usuarios admins que existen en la db', async () => {

            //Creamos un adminUser para probar 
            const adminCreater = await new AdminModel(testAdminUser).save()
            console.log(adminCreater);

            //Hacemos la petición
            const res = await supertest(app).get('/admin/obtener')

            console.log(res.statusCode);

            expect(res.statusCode).toBe(200)
            
        })

    })

    //Bloque de pruebas para GET /admin/:id
    describe('Pruebas GET /admin/:id', () => {

        //Primer caso de prueba: Traer un usuario admin pur su id
        it('Debería traer un usuario admin por su id', async () => {

            //Creamos un adminUser para probar 
            const adminCreater = await new AdminModel(testAdminUser).save()
            console.log(adminCreater._id);

            //Hacemos la petición
            const res = await supertest(app).get('/admin/obtener/' + adminCreater._id)

            expect(res.statusCode).toBe(200)
            
        })

        //Segundo caso de prueba: Debería indicar que no hay admin por ese id
        it('Debería decir que no hay un admin por ese id', async () => {

            //Creamos un adminUser para probar 
            const adminCreater = await new AdminModel(testAdminUser).save()
            console.log(adminCreater._id);

            //Hacemos la petición
            const res = await supertest(app).get('/admin/obtener/' + '678e88acd8de9241786ff849')

            //Definir que esperamos de esa respuesta
            expect(res.statusCode).toBe(404)
            expect(res.body).toHaveProperty('message', 'Administrador no encontrado')
            
        })
    })

    // Bloque de prueba para PUT
    describe('Pruebas PUT /admin/actualizar/:id', () => {

        //Primer caso de prueba
        it('Debería actualizar un admin correctamente por su id', async () => {
            //Creamos un adminUser para probar 
            const adminCreater = await new AdminModel(testAdminUser).save()
            console.log(adminCreater);

            const res = await supertest(app).put('/admin/actualizar/' + adminCreater._id).send(adminCreater)

            //Defino lo que espero recibir como respuesta
            expect(res.statusCode).toBe(200)
            expect(res.body).toHaveProperty('message', 'Administrador actualizado exitosamente')

        })

        //Segundo caso de prueba
        it('Debería devolver un error al actualizar un admin por su id', async () => {

            //Creamos un adminUser para probar 
            const adminCreater = await new AdminModel(testAdminUser).save()
            console.log("Admin creado", adminCreater);

            const res = await supertest(app).put('/admin/actualizar/' + '678e8d29c3ca5a371dd50c6f').send(adminCreater)

            //Definir que esperamos de esa respuesta
            expect(res.statusCode).toBe(404)
            expect(res.body).toHaveProperty('message', 'Administrador no encontrado')
        })
    })


    // Bloque de prueba para DELETE
    describe('Pruebas DELETE /admin/eliminar', () => {

        //Primer caso de prueba
        it('Debería eliminar un admin correctamente por su id', async () => {
            //Creamos un adminUser para probar 
            const adminCreater = await new AdminModel(testAdminUser).save()
            console.log(adminCreater);

            const res = await supertest(app).delete('/admin/eliminar/' + adminCreater._id)

            //Defino lo que espero recibir como respuesta
            expect(res.statusCode).toBe(200)
            expect(res.body).toHaveProperty('message', 'Administrador eliminado exitosamente')

        })

        //Segundo caso de prueba
        it('Debería devolver un error al eliminar un admin por su id', async () => {

            //Creamos un adminUser para probar 
            const adminCreater = await new AdminModel(testAdminUser).save()
            console.log("Admin creado", adminCreater);

            const res = await supertest(app).delete('/admin/eliminar/' + '678e8d29c3ca5a371dd50c6f')

            //Definir que esperamos de esa respuesta
            expect(res.statusCode).toBe(404)
            expect(res.body).toHaveProperty('message', 'Administrador no encontrado')
        })
    })

}) 