"use client"

import * as React from "react"
import { Check, ChevronsUpDown, X } from "lucide-react"
import { cn } from "@/lib/utils"
import {
	Button,
} from "@/components/ui/button"
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover"
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command"
import { Badge } from "@/components/ui/badge"

export interface Option {
	value: string
	title: string
	disabled?: boolean
}

export interface MultiSelectComboBoxProps {
	options: Option[]
	value?: string[]
	onValueChange?: (value: string[]) => void
	placeholder?: string
	searchPlaceholder?: string
	emptyText?: string
	maxSelected?: number
	disabled?: boolean
	className?: string
	popoverClassName?: string
	badgeVariant?: "default" | "secondary" | "destructive" | "outline"
	allowSearch?: boolean
	closeOnSelect?: boolean
}

export const MultiSelectComboBox = React.forwardRef<
	HTMLButtonElement,
	MultiSelectComboBoxProps
>(({
	options = [],
	value,
	onValueChange,
	placeholder = "Select items...",
	searchPlaceholder = "Search...",
	emptyText = "No items found.",
	maxSelected,
	disabled = false,
	className,
	popoverClassName,
	badgeVariant = "secondary",
	allowSearch = true,
	closeOnSelect = false,
	...props
}, ref) => {
	const [open, setOpen] = React.useState(false)
	const [internalSelected, setInternalSelected] = React.useState<string[]>([])

	// Use controlled value if provided, otherwise use internal state
	const selected = value !== undefined ? value : internalSelected

	const toggleOption = (optionValue: string) => {
		if (disabled) return

		const newSelected = selected.includes(optionValue)
			? selected.filter((v) => v !== optionValue)
			: maxSelected && selected.length >= maxSelected
				? selected
				: [...selected, optionValue]

		// If controlled, call onChange, otherwise update internal state
		if (value !== undefined) {
			onValueChange?.(newSelected)
		} else {
			setInternalSelected(newSelected)
		}

		if (closeOnSelect) {
			setOpen(false)
		}
	}

	const filteredOptions = React.useMemo(() => {
		if (!allowSearch) return options
		return options
	}, [options, allowSearch])

	const isMaxSelected = maxSelected ? selected.length >= maxSelected : false

	return (
		<div className="w-full">
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						ref={ref}
						variant="outline"
						role="combobox"
						aria-expanded={open}
						disabled={disabled}
						className={cn("w-full justify-between", className)}
						{...props}
					>
						{selected.length > 0 ? (
							<div className="flex gap-1 flex-wrap">
								{selected.map((val) => {
									const item = options.find((f) => f.value === val)
									return (
										<Badge
											key={val}
											variant={badgeVariant}
											className="flex items-center gap-1"
										>
											{item?.title || val}
											{!disabled && (
												<X
													className="h-3 w-3 cursor-pointer"
													onClick={(e) => {
														e.stopPropagation()
														toggleOption(val)
													}}
												/>
											)}
										</Badge>
									)
								})}
							</div>
						) : (
							<span className="text-muted-foreground">{placeholder}</span>
						)}
						<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
					</Button>
				</PopoverTrigger>
				<PopoverContent className={cn("w-[300px] p-0", popoverClassName)}>
					<Command>
						{allowSearch && (
							<CommandInput placeholder={searchPlaceholder} />
						)}
						<CommandList>
							<CommandEmpty>{emptyText}</CommandEmpty>
							<CommandGroup>
								{filteredOptions.map((fw) => {
									const isSelected = selected.includes(fw.value)
									const isDisabled = fw.disabled || (isMaxSelected && !isSelected)

									if (isDisabled && fw.disabled) return null // Skip disabled options entirely

									return (
										<CommandItem
											key={fw.value}
											onSelect={() => !isDisabled && toggleOption(fw.value)}
											className={cn(
												isDisabled && "opacity-50 cursor-not-allowed"
											)}
										>
											<Check
												className={cn(
													"mr-2 h-4 w-4",
													isSelected ? "opacity-100" : "opacity-0"
												)}
											/>
											{fw.title}
										</CommandItem>
									)
								})}
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
			{maxSelected && (
				<div className="text-xs text-muted-foreground mt-1">
					{selected.length}/{maxSelected} selected
				</div>
			)}
		</div>
	)
})

MultiSelectComboBox.displayName = "MultiSelectComboBox"
