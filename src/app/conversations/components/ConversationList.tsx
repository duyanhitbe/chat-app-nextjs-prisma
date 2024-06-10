"use client";

import React from "react";
import clsx from "clsx";
import useConversation from "@/app/hooks/useConversation";
import { useRouter } from "next/navigation";
import { MdOutlineGroupAdd } from "react-icons/md";
import ConversationBox from "@/app/conversations/components/ConversationBox";

type ConversationListProps = {
	conversations: FullConversation[];
}

const ConversationList: React.FC<ConversationListProps> = ({
															   conversations
														   }) => {
	const { conversationId, isOpen } = useConversation();
	const router = useRouter();

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
