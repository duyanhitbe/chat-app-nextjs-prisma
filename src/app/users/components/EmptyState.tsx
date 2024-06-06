import React from "react";

const EmptyState = () => {
	return (
		<div className="h-full bg-gray-100 flex justify-center items-center text-center">
			<div className="flex flex-col items-center text-center">
				<h3 className="font-bold">Select a chat or start new conversation</h3>
			</div>
		</div>
	);
};

export default EmptyState;
