"use client"

import { useEffect, useState } from "react";
import { User, Users } from "lucide-react";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { RegisterPageProp } from "@/types/authentication/register-types";

type RegisterTypeSelectionProp = {
	onChange: (updates: RegisterPageProp) => void;
}

export default function RegisterTypeSelection({ onChange }: RegisterTypeSelectionProp) {
	const [userType, setUserType] = useState<RegisterPageProp["userType"]>("freelancer");

	useEffect(() => {
		onChange({
			userType,
		});
	}, [userType]);

	return (
		<div className="mb-6 space-y-3">
			<Label>I want to:</Label>
			<RadioGroup
				value={userType}
				onValueChange={(value: "employer" | "freelancer") => setUserType(value)}
				className="grid grid-cols-2 gap-4"
			>
				<div>
					<RadioGroupItem value="freelancer" id="freelancer" className="peer sr-only" />
					<Label
						htmlFor="freelancer"
						className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
					>
						<User className="mb-3 h-6 w-6" />
						<span className="text-sm font-medium">Find Work</span>
					</Label>
				</div>

				<div>
					<RadioGroupItem value="employer" id="employer" className="peer sr-only" />
					<Label
						htmlFor="employer"
						className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
					>
						<Users className="mb-3 h-6 w-6" />
						<span className="text-sm font-medium">Hire Talent</span>
					</Label>
				</div>
			</RadioGroup>
		</div>
	);
}