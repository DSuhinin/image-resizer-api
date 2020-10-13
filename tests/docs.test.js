const app = require("./../src/app");
const request = require("supertest");
const StatusCodes = require("http-status-codes").StatusCodes;

test("Get Swagger Docs", async () => {
  await request(app).get("/api/docs/").send().expect(StatusCodes.OK);
});
