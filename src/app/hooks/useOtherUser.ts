import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useMemo } from "react";

export const useOtherUser = (conversation: FullConversation | { users: User[] }) => {
	const session = useSession();

	return useMemo(() => {
		const email = session?.data?.user?.email;

		if (!email) return null;

		return conversation.users.filter((user) => user.email !== email)[0];
	}, [conversation.users, session?.data?.user?.email]);
};
