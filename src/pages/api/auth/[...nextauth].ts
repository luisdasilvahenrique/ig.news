import { query as q } from "faunadb";

import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

import { fauna } from "../../../services/fauna";

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      authorization: {
        params: {
          scope: 'read:user'
        }
      }
    }),
  ],
  jwt: {
    secret: process.env.SINGING_KEY,
  },
  callbacks: {
    async session(session){
     try {
      const useActiveSubscription = await fauna.query(
        q.Get(
          q.Intersection([
            q.Match(
              q.Index('subscription_by_user_red'),
              q.Select(
                "ref",
                q.Get(
                  q.Match(
                    q.Index('user_by_email'),
                    q.Casefold('session.user.email'),
                  )
                )
              )
            ),
            q.Match(
              q.Index('subscription_by_status'),
              "active"
            )
          ])
        )
      )

      return {
        ...session.session,
        subscription: useActiveSubscription
      }
     }catch {
      return {
        ...session.session,
        activeSubscription: null,
      }
     }

    },
    async signIn({ user }) {
      const { email } = user

      try {
        await fauna.query(
          q.If(
            q.Not(
              q.Exists(q.Match(q.Index('user_by_email'), q.Casefold(email)))
            ),
            q.Create(q.Collection('users'), { data: { email } }),
            q.Get(q.Match(q.Index('user_by_email'), q.Casefold(email)))
          )
        )

        return true
      } catch {
        return false
      }
    }
  },
});
