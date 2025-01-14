import supertest from "supertest";
import app from "../app.js";
import mongoose from "mongoose";
import { UserModel } from "../src/models/user.model.js";

describe('Pruebas de controladores de users IH', () => {

    /*
        beforeEach: para ejecutar acciones que queramos que se hagan antes de cada prueba
        afterAll: para ejecutar acciones despues que acaba la prueba
    */

        beforeEach(async () => {
            await UserModel.deleteMany({}) //Borra todo lo del db
        });
    
        afterAll(async () => {
            await mongoose.connection.close()
        });

    const testUser = {
        username: 'Pablo Albeiro',
        email: 'pablo_albeiro@test.com',
        password: '123456789'
    }

    // Bloque de prueba para POST
    describe('Pruebas POST /usuarios', () => {

        //Primer caso de prueba
        it('Debería crear un usuario correctamente', async () => {
            const res = await supertest(app).post('/usuarios/crear').send(testUser)

            //Defino lo que espero recibir como respuesta
            expect(res.statusCode).toBe(201)
        })

        //Primer caso de prueba
        it('Debería devolver un error al crear un usuario', async () => {
            const res = await supertest(app).post('/usuarios/crear').send({
                email: 'pablo_albeiro@test.com',
                password: '123456789'
            })

            //Definir que esperamos de esa respuesta
            expect(res.body).toHaveProperty('mensaje', 'Ocurrió un error al crear el usuario')
        })
    })

})