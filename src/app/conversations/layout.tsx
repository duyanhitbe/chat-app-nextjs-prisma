import React from "react";
import SideBar from "@/app/users/components/Sidebar";
import ConversationList from "@/app/conversations/components/ConversationList";
import getConversations from "@/app/actions/getConversations";

const ConversationLayout = async ({ children }: { children: React.ReactNode }) => {
	const conversations = await getConversations();

	return (
		<SideBar>
			<div className="h-full">
				<ConversationList conversations={conversations}/>
				{children}
			</div>
		</SideBar>
	);
};

export default ConversationLayout;
