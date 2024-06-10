import getCurrentUser from "@/app/actions/getCurrentUser";

export default async function getMessagesConversationId(conversationId: string): Promise<FullMessage[]> {
	const user = await getCurrentUser();

	if (!user || !user.id || !user.email) return [];

	try {
		return prisma.message.findMany({
			orderBy: {
				createdAt: "asc"
			},
			where: {
				conversationId
			},
			include: {
				seen: true,
				sender: true
			}
		});
	} catch (e) {
		console.error(e);
		return [];
	}
}
