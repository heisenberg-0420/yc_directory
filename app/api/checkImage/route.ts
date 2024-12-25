import { NextResponse } from "next/server";

export async function POST(request: Request) {
	try {
		const { url } = await request.json();

		const res = await fetch(url, {
			method: 'HEAD'
		});

		if(!res.ok) {
			return NextResponse.json(
				{ isValidImage: false },
				{ status: 400 }
			);
		}

		const contentType = res.headers.get('content-type');
		const isValidImage = contentType?.startsWith('image/');
		
		return NextResponse.json({ isValidImage });
	} catch (error) {
		console.error("Error during proxy request: ", error);
		return NextResponse.json(
			{ isValidImage: false },
			{ status: 500 }
		);
	}
};