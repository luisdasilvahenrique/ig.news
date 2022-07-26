import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

const github_id = '9d3fca6a9cbcfa1e4607';
const github_secret = '9af800325c6108da6af3d3c6e972111f8ac9669d';

export default NextAuth({
  providers: [
  GithubProvider({
    clientId: github_id,
    clientSecret: github_secret,
    authorization: {
       params: { scope: "openid your_custom_scope" } 
      }
  }),
]
})