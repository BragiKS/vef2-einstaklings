import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username:",
          type: "text",
          placeholder: "Bob",
        },
        password: {
          label: "Password:",
          type: "password",
        },
      },
      async authorize(credentials) {
        const res = await fetch(
          `https://vef2-einstaklings.vercel.app/api/users/${credentials?.username}`,
          {
            method: "GET",
          }
        );
        const user = await res.json();
        console.log(credentials?.password);
        console.log(user[0].password);
        console.log(credentials?.username);
        console.log(user[0].username);

        if (
          credentials?.username === user[0].username &&
          credentials?.password === user[0].password
        ) {
          return user;
        }

        return null;
      },
    }),
  ],
};
