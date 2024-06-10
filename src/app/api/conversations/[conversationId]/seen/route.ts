import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/lib/prisma";

type Params = {
	conversationId: string;
}

export async function POST(
	request: Request,
	{ params: { conversationId } }: IParams<Params>
) {
	try {
		const user = await getCurrentUser();

		if (!user?.id || !user.email) {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		const conversation = await prisma.conversation.findUnique({
			where: {
				id: conversationId
			},
			include: {
				users: true,
				messages: {
					include: {
						seen: true
					}
				}
			}
		});

		if (!conversation) {
			return new NextResponse("Invalid conversation", { status: 400 });
		}

		const lastMessage = conversation.messages[conversation.messages.length - 1];

		if (!lastMessage) {
			return NextResponse.json(conversation);
		}

		const updatedMessage = await prisma.message.update({
			where: {
				id: lastMessage.id
			},
			data: {
				seen: {
					connect: {
						id: user.id
					}
				}
			},
			include: {
				sender: true,
				seen: true
			}
		});

		return NextResponse.json(updatedMessage);
	} catch (e) {
		return new NextResponse("Internal Server", { status: 500 });
	}
}
