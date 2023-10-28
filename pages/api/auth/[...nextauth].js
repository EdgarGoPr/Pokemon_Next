import NextAuth from "next-auth";
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'

const authOptions = {
    providers: [
        GithubProvider({
            clientId: 'Iv1.9626e7de1a27bd0d',
            clientSecret: '87e4997aea2069d7b54643b38ac992179b34af27'
        }),
        GoogleProvider({
            clientId: '376989954887-ge3ribhdl2tb5bl09u3nhmupg0560rr2.apps.googleusercontent.com',
            clientSecret: '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'
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
    debug: true
};

export default NextAuth(authOptions)
