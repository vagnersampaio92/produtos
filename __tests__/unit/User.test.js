const bcrypt = require("bcryptjs");
const { User } = require("../../src/app/models");
const truncate = require("../utils/truncate");
const faker = require('faker')

describe("User", () => {
  beforeEach(async () => {
    await truncate();
  });

  it("testa a criptografia da senha", async () => {
    const email = faker.internet.email()
    const password = faker.internet.password()
    const failPassword = faker.internet.password();
    const user = await User.create({
      name: faker.name.findName(),
      email: email,
      password: password
    });

    let compareHash = await bcrypt.compare(password, user.password_hash);
    expect(compareHash).toBe(true);

    compareHash = await bcrypt.compare(failPassword, user.password_hash);
    expect(compareHash).toBe(false);
  });
});