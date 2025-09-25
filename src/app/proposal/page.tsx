
import { AuthGuard } from "@/components/authentication/auth-guard";

export default function PostJobPage() {
	return (
		<AuthGuard requiredUserType="freelancer">
			<JobPost />
		</AuthGuard>
	);
}