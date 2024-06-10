import getSession from "@/app/actions/getSession";
import prisma from "@/app/lib/prisma";

export default async function getUsers() {
	const session = await getSession();

	if (!session?.user?.email) return [];

	try {
		return prisma.user.findMany({
			where: {
				NOT: {
					email: session.user.email
				}
			},
			orderBy: {
				createdAt: 'desc'
			}
		});
	} catch (e) {
		console.error(e);
		return [];
	}
}
