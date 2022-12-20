// this file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions
import type { IronSessionOptions } from "iron-session";
import { IUser } from "models/User";

export const sessionOptions: IronSessionOptions = {
  password: 'SECRET_COOKIE_PASSWORD_SECRET_COOKIE_PASSWORD_SECRET_COOKIE_PASSWORD',
  cookieName: "iron-session/examples/next.js",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

// This is where we specify the typings of req.session.*
declare module "iron-session" {
  interface IronSessionData {
    siwe: any;
    nonce: any;
    user: IUser | undefined;
  }
}
