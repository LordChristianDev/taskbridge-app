import { usePathname, useRouter } from "next/navigation"

export const useRoutes = () => {
	const router = useRouter();
	const path = usePathname();

	const move = (path: string) => router.push(path);
	const back = () => router.back();

	return { path, move, back };
}