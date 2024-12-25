import { z } from 'zod';

export const formSchema = z.object({
	title: z.string().min(3).max(100),
	description: z.string().min(20).max(500),
	category: z.string().min(3).max(20),
	pitch: z.string().min(10),
	link: z.string().url().refine(async (url) => {
		try {
			const res = await fetch("/api/checkImage", {
				method: 'POST',
				body: JSON.stringify({ url }),
				headers: { 'Content-Type' : 'application/json' },
			});

			const data = await res.json();

			if (!res.ok || !data.isValidImage){
				return false;
			}

			return true;
		} catch (error) {
			if (error instanceof z.ZodError){
				console.error(error.issues);
				return false;
			}

			console.error(error);
			return false;
		}
	}),
});