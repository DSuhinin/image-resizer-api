const app = require("./../src/app");
const routes = require("./../src/constants").ROUTE_LIST;
const request = require("supertest");
const StatusCodes = require("http-status-codes").StatusCodes;

test("Get Swagger Docs", async () => {
  await request(app)
    .get(routes.ROUTE_GET_API_DOCS)
    .send()
    .expect(StatusCodes.OK);
});
