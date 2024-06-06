import React from "react";
import SideBar from "@/app/users/components/Sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<SideBar>
			<div className="h-full">
				{children}
			</div>
		</SideBar>
	);
};

export default DashboardLayout;
