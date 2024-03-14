import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";



export const authOptions: AuthOptions = {
    pages: {
        signIn: "/login",
    },
    providers: [
        CredentialsProvider({

            name: "Next Auth",

            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "Email"
                },
                password: {
                    label: "Password",
                    type: "password"
                }
            },
            async authorize(credentials, req) {

                const user = {
                    id: "",
                    name: "",
                    email: credentials?.email
                }

                if (user) {

                    return user
                } else {

                    return null


                }
            }
        })
    ]
}