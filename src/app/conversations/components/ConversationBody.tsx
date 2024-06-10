"use client";
import React, { useRef } from "react";
import MessageBox from "@/app/conversations/components/MessageBox";

type ConversationBodyProps = {
	messages: FullMessage[];
}

const ConversationBody: React.FC<ConversationBodyProps> = ({
															   messages
														   }) => {
	const ref = useRef<HTMLDivElement>(null);

	return (
		<div className="flex-1 overflow-y-auto">
			{
				messages.map((message, i) =>
					<MessageBox key={message.id} message={message} isLast={i === messages.length - 1} />
				)
			}
			<div ref={ref} className="pt-24"></div>
		</div>
	);
};

export default ConversationBody;
