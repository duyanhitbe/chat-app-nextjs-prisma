import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export async function POST(request: Request) {
	try {
		const {
			conversationId,
			body,
			image
		} = await request.json();

		const user = await getCurrentUser();

		if (!user?.id || !user?.email) {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		const newMessage = await prisma.message.create({
			data: {
				body,
				image,
				conversation: {
					connect: {
						id: conversationId
					}
				},
				sender: {
					connect: {
						id: user.id
					}
				},
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

		await prisma.conversation.update({
			where: {
				id: conversationId
			},
			data: {
				lastMessageAt: new Date(),
				messages: {
					connect: {
						id: newMessage.id
					}
				}
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

		return NextResponse.json(newMessage);
	} catch (e) {
		console.error(e);
		return new NextResponse("Internal Server", { status: 500 });
	}
}
