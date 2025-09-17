import Link from "next/link";
import Image from "next/image";

export default function FooterSection() {
	return (
		<footer className="py-12 px-4 bg-muted/30">
			<div className="container mx-auto">
				<div className="mb-8 flex flex-wrap justify-between gap-8">
					<div>
						<div className="flex items-center space-x-2 mb-4">
							<div className="flex items-center justify-center w-8 h-8 bg-primary/60 rounded-lg">
								<Image
									src="/taskbridge_white.png"
									alt="logo"
									width={250}
									height={250}
								/>
							</div>
							<span className="text-xl font-bold text-foreground">TaskBridge</span>
						</div>
						<p className="text-muted-foreground">
							The modern platform for freelancers and employers to connect and collaborate.
						</p>
					</div>

					<div>
						<h4 className="font-semibold mb-4">For Freelancers</h4>
						<ul className="space-y-2 text-muted-foreground">
							<li>
								<Link href="/browse-jobs" className="hover:text-foreground">
									Browse Jobs
								</Link>
							</li>
							<li>
								<Link href="/freelancer-resources" className="hover:text-foreground">
									Resources
								</Link>
							</li>
							<li>
								<Link href="/success-stories" className="hover:text-foreground">
									Success Stories
								</Link>
							</li>
						</ul>
					</div>

					<div>
						<h4 className="font-semibold mb-4">For Employers</h4>
						<ul className="space-y-2 text-muted-foreground">
							<li>
								<Link href="/post-job" className="hover:text-foreground">
									Post a Job
								</Link>
							</li>
							<li>
								<Link href="/find-talent" className="hover:text-foreground">
									Find Talent
								</Link>
							</li>
							<li>
								<Link href="/enterprise" className="hover:text-foreground">
									Enterprise
								</Link>
							</li>
						</ul>
					</div>
				</div>

				<hr />

				<div className="flex flex-wrap justify-between gap-8">
					<div className="mt-8 pt-8 text-center text-muted-foreground">
						<p>&copy; 2025 TaskBridge. All rights reserved.</p>
					</div>

					<div className="flex flex-row gap-2">
						<Link href="/privacy" className="hover:text-foreground">
							<div className="mt-8 pt-8 text-center text-muted-foreground">
								Privacy Policy
							</div>
						</Link>

						<div className="mt-8 pt-8 text-center text-muted-foreground">
							&
						</div>

						<Link href="/privacy" className="hover:text-foreground">
							<div className="mt-8 pt-8 text-center text-muted-foreground">
								Terms & Conditions
							</div>
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
}