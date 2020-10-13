const app = require("./../src/app");
const request = require("supertest");
const StatusCodes = require("http-status-codes").StatusCodes;

test("Get Health Status", async () => {
  await request(app).get("/health/status").send().expect(StatusCodes.OK);
});

test("Get Health Info", async () => {
  await request(app).get("/health/info").send().expect(StatusCodes.OK);
});
