import getCurrentUser from "@/app/actions/getCurrentUser";

export default async function getConversationById(conversationId: string): Promise<Omit<FullConversation, "messages"> | null> {
	const user = await getCurrentUser();

	if (!user || !user.id || !user.email) return null;

	try {
		return prisma.conversation.findUnique({
			where: {
				id: conversationId
			},
			include: {
				users: true
			}
		});
	} catch (e) {
		console.error(e);
		return null;
	}
}
