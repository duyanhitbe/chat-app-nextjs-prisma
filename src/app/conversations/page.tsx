"use client";
import React from "react";
import EmptyState from "@/app/users/components/EmptyState";
import clsx from "clsx";
import useConversation from "@/app/hooks/useConversation";

const Conversation = () => {
	const {isOpen} = useConversation()

	return (
		<div className={clsx(
			`lg:pl-80 h-full lg:block`,
			isOpen ? "block" : "hidden"
		)}>
			<EmptyState />
		</div>
	);
};

export default Conversation;
