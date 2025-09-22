import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { format } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const createFullName = (
  firstName: string,
  lastName: string,
  middleName?: string,
  suffix?: string,
) => {
  return [firstName, middleName, lastName, suffix].filter(Boolean).join(" ");
};

export const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('').toUpperCase();

export const getEmployerStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
    case "completed":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
    case "in-progress":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
    case "review":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
  }
}

export const getFreelancerStatusColor = (status: string) => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
    case "accepted":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
    case "rejected":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
    case "in-progress":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
    case "review":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
    case "completed":
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
  }
}

export function extractPriceAndPeriod(text: string) {
  if (!text) return null;

  const match = text.match(/₱?([\d.]+)\s+per\s+(\w+)/i);

  if (match) {
    return {
      number: parseFloat(match[1]),
      period: match[2]
    };
  }

  return null;
}

export const formatIsoString = (isoString: string) => {
  if (!isoString) return "";
  return format(new Date(isoString), "MMMM dd, yyyy");
}

export function formatDate(dateStr: string): string {
  if (!dateStr) return "";

  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
}