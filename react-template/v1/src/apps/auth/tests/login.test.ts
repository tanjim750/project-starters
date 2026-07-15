import { loginSchema } from "../validators/loginValidator";

describe("loginSchema", () => {
  it("accepts a valid login payload", () => {
    expect(() =>
      loginSchema.parse({
        email: "user@example.com",
        password: "password123",
      }),
    ).not.toThrow();
  });
});
