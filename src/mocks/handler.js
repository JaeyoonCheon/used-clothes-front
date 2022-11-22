import { rest } from "msw";

export const handlers = [
  rest.post("/user/login", (req, res, ctx) => {
    const email = req.body.email;
    return res(ctx.status(200), ctx.json(email));
  }),
  rest.post("/user/create", (req, res, ctx) => {
    const formData = req.body;

    if (formData) {
      return res(ctx.status(200));
    } else {
      return res(ctx.status(400));
    }
  }),
];
