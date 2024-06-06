import getSession from "@/app/actions/getSession";
import prisma from "@/app/lib/prisma";
import { User } from "@prisma/client";

export default async function getCurrentUser(): Promise<User | null> {
	try {
		const session = await getSession();

		if (!session?.user?.email) {
			return null;
		}

		const user = await prisma.user.findUnique({
			where: {
				email: session.user.email
			}
		});

		if (!user) return null;

		return user as User;
	} catch (err) {
		return null;
	}
}
