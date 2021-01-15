import request from "supertest";
import { app } from "../../app";

it("return string", async () => {
  await request(app).get("/api").send().expect(200);
});
