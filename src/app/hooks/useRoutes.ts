import useConversation from "@/app/hooks/useConversation";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { HiChat,  } from "react-icons/hi";
import { HiUsers, HiArrowLeftOnRectangle } from "react-icons/hi2";
import { signOut } from "next-auth/react";

const useRoutes = () => {
	const {conversationId} = useConversation()
	const pathname = usePathname();

	const routes = useMemo(() => [
		{
			label: "Conversations",
			href: "/conversations",
			icon: HiChat,
			active: pathname === '/conversations' || !!conversationId,
		},
		{
			label: "Users",
			href: "/users",
			icon: HiUsers,
			active: pathname === "/users"
		},
		{
			label: "Logout",
			href: "#",
			icon: HiArrowLeftOnRectangle,
			onClick: () => signOut(),
		}
	], [conversationId, pathname])

	return routes;
}

export default useRoutes;

