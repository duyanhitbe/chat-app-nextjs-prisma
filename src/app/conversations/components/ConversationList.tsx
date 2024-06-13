"use client";

import React, { useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import useConversation from "@/app/hooks/useConversation";
import { MdOutlineGroupAdd } from "react-icons/md";
import ConversationBox from "@/app/conversations/components/ConversationBox";
import { pusherClient } from "@/app/lib/pusher";
import { useSession } from "next-auth/react";

type ConversationListProps = {
	conversations: FullConversation[];
}

const ConversationList: React.FC<ConversationListProps> = ({
															   conversations: initConversations
														   }) => {
	const { conversationId, isOpen } = useConversation();
	const [conversations, setConversations] = useState(initConversations);
	const session = useSession();

	const pusherKey = useMemo(() => session.data?.user?.email, [session.data?.user?.email]);

	useEffect(() => {
		if (!pusherKey) return;

		const newConversationHandler = (conversation: FullConversation) => {
			setConversations((current) => {
				if (current.find((item => item.id === conversation.id))) {
					return current;
				}

				return [conversation, ...current];
			});
		};

		const updateConversationHandler = (conversation: FullConversation) => {
			setConversations((current) => {
				return current.map(item => {
					console.log(conversation.messages);
					if (item.id === conversation.id) return { ...item, messages: conversation.messages };
					return item;
				});
			});
		};

		pusherClient.subscribe(pusherKey);
		pusherClient.bind("conversation:new", newConversationHandler);
		pusherClient.bind("conversation:update", updateConversationHandler);

		return () => {
			pusherClient.unsubscribe(pusherKey);
			pusherClient.unbind("conversation:new", newConversationHandler);
			pusherClient.unbind("conversation:update", updateConversationHandler);
		};
	}, [pusherKey]);

	return (
		<aside className={clsx(`
			fixed 
			inset-y-0 
			pb-20 
			lg:pb-0 
			lg:left-20
			lg:w-80 
			lg:block 
			overflow-y-auto
			border-r
			border-gray-200
		`, isOpen ? "hidden" : "block w-full left-0")}>
			<div className="px-5">
				<div className="flex justify-between mb-4 pt-4">
					<div className="text-2xl font-bold text-neutral-800">
						Messages
					</div>
					<div className="
						rounded-full
						p-2
						hover:bg-gray-100
						text-gray-600
						cursor-pointer
						hover:opacity-75
						transition
					">
						<MdOutlineGroupAdd />
					</div>
				</div>
				{
					conversations.map((conversation) =>
						<ConversationBox
							key={conversation.id}
							conversation={conversation}
							isSelected={conversation.id === conversationId} />
					)
				}
			</div>
		</aside>
	);
};

export default ConversationList;
