import React from "react";
import SideBar from "@/app/users/components/Sidebar";
import getUsers from "@/app/actions/getUsers";
import UserList from "@/app/users/components/UserList";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
	const users = await getUsers();

	return (
		<SideBar>
			<div className="h-full">
				<UserList users={users}/>
				{children}
			</div>
		</SideBar>
	);
};

export default DashboardLayout;
