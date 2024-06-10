import { Conversation, Message, User } from "@prisma/client";

declare global {
	type FullMessage = Message & {
		sender: User;
		seen: User[]
	}

	type FullConversation = Conversation & {
		users: User[]
		messages: FullMessage[]
	}

	type IParams<T> = {
		params: T;
	}
}

export {};
