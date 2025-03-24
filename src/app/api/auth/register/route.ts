import { NextResponse } from "next/server";
import userRegister from "@/libs/userRegister";

export async function POST(req: Request) {
    try {
        const { name, email, tel, password } = await req.json();

        if (!name || !email || !password) {
            return NextResponse.json({ error: "Missing fields" }, { status: 400 });
        }

        const newUser = await userRegister(name, email, tel, password);
        return NextResponse.json(newUser, { status: 201 });
    } catch (error) {
        return NextResponse.json({error}, { status: 500 });
    }
}
