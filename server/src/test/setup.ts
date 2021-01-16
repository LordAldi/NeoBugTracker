import { MongoMemoryServer } from "mongodb-memory-server";
import request from "supertest";
import mongoose from "mongoose";
import { app } from "../app";

declare global {
  namespace NodeJS {
    interface Global {
      email: string;
      password: string;
      signin(): Promise<string[]>;
    }
  }
}

let mongo: any;
beforeAll(async () => {
  process.env.JWT_KEY = "aldi";
  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});
global.email = "test@test.com";
global.password = "test@test.com";
global.signin = async () => {
  const email = global.email;
  const password = global.password;

  const response = await request(app)
    .post("/api/users/signup")
    .send({
      email,
      password,
    })
    .expect(201);

  const cookie = response.get("Set-Cookie");
  return cookie;
};
