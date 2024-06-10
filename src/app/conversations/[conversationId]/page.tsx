import getConversationById from "@/app/actions/getConversationById";
import getMessagesConversationId from "@/app/actions/getMessagesByConversationId";
import EmptyState from "@/app/users/components/EmptyState";
import ConversationHeader from "@/app/conversations/components/ConversationHeader";
import ConversationBody from "@/app/conversations/components/ConversationBody";
import ConversationForm from "@/app/conversations/components/ConversationForm";

type Params = {
	conversationId: string;
}

export default async function Page({ params }: IParams<Params>) {
	const { conversationId } = params;

	const conversation = await getConversationById(conversationId);
	const messages = await getMessagesConversationId(conversationId);

	return <div className="lg:pl-80 h-full">
		<div className="h-full flex flex-col">
			{!conversation && <EmptyState />}
			{conversation && <>
				<ConversationHeader conversation={conversation} />
				<ConversationBody messages={messages} />
				<ConversationForm />
			</>}
		</div>
	</div>;
}
