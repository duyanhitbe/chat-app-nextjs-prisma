"use client";
import React, { useState } from "react";
import useRoutes from "@/app/hooks/useRoutes";
import DesktopItem from "@/app/users/components/DesktopItem";
import { User } from "@prisma/client";
import Avatar from "@/app/components/Avatar";

type DesktopSidebarProps = {
	user?: User | null;
}

const DesktopSidebar: React.FC<DesktopSidebarProps> = ({ user }) => {
	const routes = useRoutes();
	const [isOpen, setIsOpen] = useState(false);
	console.log(user);

	return (
		<div className="
			hidden
			lg:fixed
			lg:inset-y-0
			lg:left-0
			lg:z-40
			lg:w-20
			xl:px-6
			lg:overflow-y-auto
			lg:bg-white
			lg:border-r-[1px]
			lg:pb-4
			lg:flex
			lg:flex-col
			justify-between">
			<nav className="mt-4 flex-col justify-between">
				<ul role="list" className="flex flex-col items-center space-y-1">
					{
						routes.map((item) =>
							<DesktopItem
								key={item.label}
								label={item.label}
								icon={item.icon}
								href={item.href}
								onClick={item.onClick}
								active={item.active}
							/>
						)
					}
				</ul>
			</nav>
			<nav className="mt-4 flex flex-col justify-between items-center">
				<div className="cursor-pointer hover:opacity-75 transition">
					<Avatar user={user} />
				</div>
			</nav>
		</div>
	);
};

export default DesktopSidebar;
