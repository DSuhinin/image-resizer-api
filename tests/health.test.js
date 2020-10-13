const app = require("./../src/app");
const routes = require("./../src/constants").ROUTE_LIST;
const request = require("supertest");
const StatusCodes = require("http-status-codes").StatusCodes;

test("Get Health Status", async () => {
  await request(app)
    .get(routes.ROUTE_GET_HEALTH_STATUS)
    .send()
    .expect(StatusCodes.OK);
});

test("Get Health Info", async () => {
  await request(app)
    .get(routes.ROUTE_GET_HEALTH_INFO)
    .send()
    .expect(StatusCodes.OK);
});
