const app = require("./../src/app");
const routes = require("./../src/constants").ROUTE_LIST;
const request = require("supertest");
const expect = require("chai").expect;
const uploaderError = require("./../src/libraries/uploader/errors");
const StatusCodes = require("http-status-codes").StatusCodes;

test("store image item in storage", async () => {
  await request(app)
    .post(routes.ROUTE_UPLOAD_IMAGE)
    .attach("image", "tests/fixtures/image.jpg")
    .expect(StatusCodes.CREATED);
});

test("store image item with invalid extension", async () => {
  await request(app)
    .post(routes.ROUTE_UPLOAD_IMAGE)
    .attach("image", "tests/fixtures/image.txt")
    .expect(StatusCodes.BAD_REQUEST)
    .then((response) => {
      expect(response.body.code).to.be.equal(
        uploaderError.invalidImageType.errorCode
      );
      expect(response.body.message).to.be.equal(
        uploaderError.invalidImageType.message
      );
    });
});

test("get image item", async () => {
  await request(app)
    .get(routes.ROUTE_GET_IMAGE.replace(":id", 1))
    .send()
    .expect(StatusCodes.OK);
});

test("get not existing image item", async () => {
  await request(app)
    .get(routes.ROUTE_GET_IMAGE.replace(":id", "not_existing_id"))
    .send()
    .expect(StatusCodes.NOT_FOUND);
});

test("get list of image items", async () => {
  await request(app)
    .get(routes.ROUTE_LIST_IMAGES)
    .send()
    .expect(StatusCodes.OK)
    .then((response) => {
      expect(response.body.length).to.be.equal(1);
    });
});

test("delete image item", async () => {
  await request(app)
    .delete(routes.ROUTE_DELETE_IMAGE.replace(":id", 1))
    .send()
    .expect(StatusCodes.OK);
});

test("delete not existing image item", async () => {
  await request(app)
    .delete(routes.ROUTE_DELETE_IMAGE.replace(":id", "not_existing_id"))
    .send()
    .expect(StatusCodes.NOT_FOUND);
});
