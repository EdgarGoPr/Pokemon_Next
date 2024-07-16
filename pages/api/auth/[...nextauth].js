import NextAuth from "next-auth";
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'

const authOptions = {
    providers: [
        GithubProvider({
            clientId: env('GitClient'),
            clientSecret: env('GitSecret')
        }),
        GoogleProvider({
            clientId: env('GoogleClient'),
            clientSecret: env('GoogleSecret')
        })
    ],
    callbacks: {
        async session({ session, token, user }) {
            session.user.username = session?.user?.name.split(" ").join("").toLocaleLowerCase();

            session.user.uid = token.sub

            return session
        }
    },
    secret: 'default_secret_key',
    // debug: true
};

export default NextAuth(authOptions)
