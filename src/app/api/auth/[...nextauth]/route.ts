import NextAuth, { AuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import FacebookProvider from "next-auth/providers/facebook";
import LinkedinProvider from "next-auth/providers/linkedin";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import prisma from "@/app/lib/prisma";

const options: AuthOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
		}),
		GithubProvider({
			clientId: process.env.GITHUB_CLIENT_ID as string,
			clientSecret: process.env.GITHUB_CLIENT_SECRET as string
		}),
		FacebookProvider({
			clientId: process.env.FACEBOOK_CLIENT_ID as string,
			clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string
		}),
		LinkedinProvider({
			clientId: process.env.LINKEDIN_CLIENT_ID as string,
			clientSecret: process.env.LINKEDIN_CLIENT_SECRET as string
		}),
		CredentialsProvider({
			name: "credentials",
			credentials: {
				email: { label: "email", type: "text" },
				password: { label: "password", type: "password" }
			},
			async authorize(credentials, req) {
				if (!credentials?.email || !credentials?.password) {
					throw new Error("Invalid Credentials");
				}

				const user = await prisma.user.findUnique({
					where: {
						email: credentials.email
					}
				});

				if (!user?.password) {
					throw new Error("Invalid Credentials");
				}

				if (!user) {
					throw new Error("Invalid Credentials");
				}

				const isMatchPassword = await compare(credentials.password, user.password);

				if (!isMatchPassword) {
					throw new Error("Invalid Credentials");
				}

				return user;
			}
		})
	],
	adapter: PrismaAdapter(prisma),
	session: {
		strategy: "jwt"
	},
	secret: process.env.REACT_APP_SECRET
}

const handler = NextAuth(options);

export { handler as GET, handler as POST, options }
