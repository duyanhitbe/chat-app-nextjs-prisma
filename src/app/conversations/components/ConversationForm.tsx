"use client";
import React from "react";
import useConversation from "@/app/hooks/useConversation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { HiPaperAirplane, HiPhoto } from "react-icons/hi2";
import MessageInput from "@/app/conversations/components/MessageInput";

type ConversationFormProps = {}

const ConversationForm: React.FC<ConversationFormProps> = () => {
	const { conversationId } = useConversation();

	const {
		register,
		reset,
		handleSubmit,
		formState: {
			errors
		}
	} = useForm<FieldValues>({
		defaultValues: {
			body: ""
		}
	});

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		axios.post("/api/message", { ...data, conversationId })
			.then()
			.finally(() => reset());
	};

	return (
		<div className="
				px-4
				py-4
				bg-white
				border-t
				flex
				items-center
				gap-2
				lg:gap-4
				w-full
			">
			<HiPhoto size={30} className="text-sky-500"/>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex items-center gap-2 lg:gap-4 w-full">
				<MessageInput id="body" register={register} errors={errors} />
				<button type="submit" className="
					bg-sky-500
					hover:bg-sky-600
					rounded-full
					p-2
					transition
					cursor-pointer
				">
					<HiPaperAirplane className="text-white" size={18}/>
				</button>
			</form>
		</div>
	);
};

export default ConversationForm;
