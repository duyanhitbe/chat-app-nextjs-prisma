import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/route";

export default async function getSession() {
	return getServerSession(options)
}
