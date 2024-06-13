import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/lib/prisma";
import { pusherServer } from "@/app/lib/pusher";

export async function POST(request: Request) {
	try {
		const user = await getCurrentUser();

		if (!user?.id || !user.email) {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		const {
			userId,
			isGroup,
			name,
			members
		} = await request.json();

		if (isGroup) {
			if (!name || !members || members.length < 2) {
				return new NextResponse("Invalid data", { status: 400 });
			}

			const newConversation = await prisma.conversation.create({
				data: {
					name,
					isGroup,
					users: {
						connect: [
							...members.map((member: { id: string }) => ({ id: member.id })),
							{
								id: userId
							}
						]
					}
				},
				include: {
					users: true
				}
			});

			pusherServer.trigger(user.email, 'conversation:new', newConversation);

			return NextResponse.json(newConversation);
		}

		const existingConversation = await prisma.conversation.findMany({
			where: {
				OR: [
					{
						userIds: {
							equals: [userId, user.id]
						}
					},
					{
						userIds: {
							equals: [user.id, userId]
						}
					}
				]
			},
			include: {
				users: true
			}
		});

		if (existingConversation[0]) {
			return NextResponse.json(existingConversation[0]);
		}

		const newConversation = await prisma.conversation.create({
			data: {
				users: {
					connect: [
						{
							id: userId
						},
						{
							id: user.id
						}
					]
				}
			},
			include: {
				users: true
			}
		});

		newConversation.users.forEach((u) => {
			pusherServer.trigger(u.email!, 'conversation:new', newConversation);
		})

		return NextResponse.json(newConversation);
	} catch (e) {
		return new NextResponse("Internal Server", { status: 500 });
	}
}
