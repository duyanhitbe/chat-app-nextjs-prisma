"use client";
import React, { useEffect, useRef, useState } from "react";
import MessageBox from "@/app/conversations/components/MessageBox";
import axios from "axios";
import useConversation from "@/app/hooks/useConversation";
import { pusherClient } from "@/app/lib/pusher";

type ConversationBodyProps = {
	messages: FullMessage[];
}

const ConversationBody: React.FC<ConversationBodyProps> = ({
															   messages: initMessages
														   }) => {
	const ref = useRef<HTMLDivElement>(null);
	const { conversationId } = useConversation();
	const [messages, setMessages] = useState(initMessages);

	useEffect(() => {
		ref.current?.scrollIntoView();
	}, []);

	useEffect(() => {
		axios.post(`/api/conversations/${conversationId}/seen`);
	}, [conversationId]);

	useEffect(() => {
		pusherClient.subscribe(conversationId);

		const messageHandler = (message: FullMessage) => {
			setMessages((current) => {
				const exist = messages.find(item => item.id === message.id);
				if (exist) return current;
				return [...current, message];
			});
			ref.current?.scrollIntoView();
		};

		const updateMessageHandler = (message: FullMessage) => {
			setMessages((current) => {
				return current.map(item => {
					if (item.id === message.id) return message;
					return item;
				});
			});
			ref.current?.scrollIntoView();
		};

		pusherClient.bind("message:new", messageHandler);
		pusherClient.bind("message:update", updateMessageHandler);

		return () => {
			pusherClient.unsubscribe(conversationId);
			pusherClient.unbind("message:new", messageHandler);
			pusherClient.unbind("message:update", updateMessageHandler);
		};
	}, [conversationId, messages]);

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
