import { JobPost } from "@/components/job/post/job-post";
import { AuthGuard } from "@/components/authentication/auth-guard";

export default function PostJobPage() {
	return (
		<AuthGuard requiredUserType="employer">
			<JobPost />
		</AuthGuard>
	);
}