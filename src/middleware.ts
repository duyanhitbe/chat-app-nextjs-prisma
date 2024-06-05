import { withAuth } from "next-auth/middleware";

export default withAuth({
	pages: {
		signIn: "/"
	},
	secret: process.env.REACT_APP_SECRET
});

export const config = {
	matcher: [
		"/dashboard/:path*"
	]
};
