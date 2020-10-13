const app = require("./../src/app");
const request = require("supertest");
const StatusCodes = require("http-status-codes").StatusCodes;

test("Store Image", async () => {
  await request(app)
    .post("/store/images")
    .attach("image", "tests/fixtures/image.jpg")
    .expect(StatusCodes.CREATED);
});
