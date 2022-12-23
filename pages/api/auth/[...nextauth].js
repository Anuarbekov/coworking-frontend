import axios from "axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 60,
  },
  providers: [
    CredentialsProvider({
      name: "Email or Phone",
      credentials: {
        emailOrPhone: {
          label: "Email or phone",
          type: "text",
          placeholder: "email@email.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const { csrfToken, emailOrPhone, password } = credentials;
        console.log(emailOrPhone, password);
        const res = await axios.post("http://localhost:5000/auth/login", {
          emailOrPhone,
          password,
        });
        const token = await res.data["Access_Token"];
        if (token) {
          return {
            token: token,
            email: emailOrPhone,
          };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      user && (token.user = user);
      return token;
    },
    session: async ({ session, token }) => {
      session.user = token.user;
      return session;
    },
  },
  //pages: {
  // signIn: "/auth/signin",
  //},
  secret: "secret_key_MEIR",
};

export default NextAuth(authOptions);
