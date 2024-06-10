import React, { useCallback, useMemo } from "react";
import { useOtherUser } from "@/app/hooks/useOtherUser";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import Avatar from "@/app/components/Avatar";
import { format } from "date-fns";

type ConversationBoxProps = {
	conversation: FullConversation;
	isSelected: boolean;
}

const ConversationBox: React.FC<ConversationBoxProps> = ({
															 isSelected,
															 conversation
														 }) => {
	const otherUser = useOtherUser(conversation);
	const session = useSession();
	const router = useRouter();

	const handleClick = useCallback(() => {
		router.push(`/conversations/${conversation.id}`);
	}, [router, conversation.id]);

	const lastMessage = useMemo(() => {
		const messages = conversation.messages || [];
		return messages[messages.length - 1];
	}, [conversation.messages]);

	const email = useMemo(() => session?.data?.user?.email, [session?.data?.user?.email]);

	const hasSeen = useMemo(() => {
		if (!lastMessage || !email) return false;

		const seen = lastMessage.seen || [];

		return seen.filter(user => user.email === email).length !== 0;
	}, [email, lastMessage]);

	const lastMessageText = useMemo(() => {
		if (lastMessage?.image) return "Sent an image";

		if (lastMessage?.body) return lastMessage.body;

		return "Started a conversation";
	}, [lastMessage]);

	return (
		<div
			onClick={handleClick}
			className={clsx(`
				w-full 
				relative 
				flex
				items-center
				space-x-3
				hover:bg-neutral-100
				rounded-lg
				transition
				cursor-pointer
				p-3
			`, isSelected ? "bg-neutral-100" : "bg-white")}>
			<Avatar user={otherUser} />
			<div className="min-w-0 flex-1">
				<div className="focus:outline-none">
					<div className="flex justify-between items-center mb-1">
						<p className="font-medium text-md text-gray-900">{conversation.name || otherUser?.name}</p>
						{lastMessage && <p className="text-xs text-gray-400 font-light">{format(lastMessage.createdAt, "p")}</p>}
					</div>
					<p className={clsx(`
						truncate 
						text-sm
					`, hasSeen ? "text-gray-500" : "text-black font-medium")}>
						{lastMessageText}
					</p>
				</div>
			</div>
		</div>
	);
};

export default ConversationBox;
