import request from "supertest";
import { app } from "../../../app";

it("has a route handler listening to /api/tickets for post rewuest ", async () => {
  const response = await request(app).post("/api/projects").send({});

  expect(response.status).not.toEqual(404);
});

it("can only be access if the user signed in", async () => {
  const response = await request(app)
    .post("/api/projects")
    .send({})
    .expect(401);
});

it("returns a status other than 401 if user signed in", async () => {
  const response = await request(app)
    .post("/api/projects")
    .set("Cookie", global.signin2())
    .send({});

  expect(response.status).not.toEqual(401);
});
