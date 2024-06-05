import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import prisma from "@/app/lib/prisma";

export async function POST(
	request: Request
) {
	const { email, username, password } = await request.json();

	if (!email || !username || !password) {
		return new NextResponse("Missing credentials", { status: 400 });
	}

	try {
		const hashPassword = await hash(password, 12);

		const existing = await prisma.user.findUnique({
			where: {
				email
			}
		});
		if (existing) {
			await prisma.user.update({
				where: {
					email
				},
				data: {
					password: hashPassword
				}
			});
			return NextResponse.json(existing, { status: 201 });
		}

		const user = await prisma.user.create({
			data: {
				email,
				password: hashPassword,
				username
			}
		});

		return NextResponse.json(user, { status: 201 });
	} catch (err: any) {
		return new NextResponse(err.message, { status: 500 });
	}

}
