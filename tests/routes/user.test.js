const request = require("supertest");
const app = require("../../src/app");

const mockUser = {
    firstName: "John",
    lastName: "Doe",
    email: "testingUser@gmail.com",
    password: "1234545454gdfgdfgFDDGDFGd!!!"
}

const mockUserID = 1

//this will test all the user routes
describe("Test the user routes", () => {
    test("It should response the GET method", async () => {
        const response = await request(app).get("/users");
        expect(response.statusCode).toBe(200);
    });
    test("This should test the GET for a specific user", async () => {
        const response = await request(app).get(`/users/${mockUserID}`);
        expect(response.statusCode).toBe(200);
    })

    test("It should response the POST method", async () => {
        const response = await request(app)
                                .post("/users")
                                .send(mockUser)
        expect(response.statusCode).toBe(201);
    });
    test("It should response the PUT method", async () => {
        const response = await request(app).put(`/users/${mockUserID}`);
        expect(response.statusCode).toBe(200);
    });
    test("It should response the DELETE method", async () => {
        const response = await request(app).delete(`/users/${mockUserID}`);
        expect(response.statusCode).toBe(200);
    });
});

