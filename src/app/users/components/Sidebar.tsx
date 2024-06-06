import React from "react";
import DesktopSidebar from "@/app/users/components/DesktopSidebar";
import MobileSidebar from "@/app/users/components/MobileSidebar";
import getCurrentUser from "@/app/actions/getCurrentUser";

type SidebarProps = {
	children: React.ReactNode;
}

const SideBar: React.FC<SidebarProps> = async ({
												   children
											   }) => {
	const user = await getCurrentUser();

	return (
		<div className="h-full">
			<DesktopSidebar user={user} />
			<MobileSidebar />
			<main className="lg:pl-20 h-full">
				{children}
			</main>
		</div>
	);
};

export default SideBar;
