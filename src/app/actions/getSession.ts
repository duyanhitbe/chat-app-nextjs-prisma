import { getServerSession } from "next-auth";
import { options } from "@/app/lib/auth";

export default async function getSession() {
	return getServerSession(options)
}
