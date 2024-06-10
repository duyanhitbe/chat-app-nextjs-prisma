import getCurrentUser from "@/app/actions/getCurrentUser";

export default async function getConversations(): Promise<FullConversation[]> {
	const user = await getCurrentUser();

	if (!user || !user.id || !user.email) return [];

	try {
		return prisma.conversation.findMany({
			orderBy: {
				createdAt: "desc"
			},
			where: {
				userIds: {
					has: user.id
				}
			},
			include: {
				users: true,
				messages: {
					include: {
						seen: true,
						sender: true
					}
				}
			}
		});
	} catch (e) {
		console.error(e);
		return [];
	}
}
