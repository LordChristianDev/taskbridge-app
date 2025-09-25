"use client"

import type React from "react"

import { useState } from "react";
import { Send } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ProposalForm from "@/components/proposal/proposal-form";

import { JobProp } from "@/types/dashboard/job-type";

export function ProposalDialog({ job }: { job: JobProp }) {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const { title } = job;

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button size="lg">
          <Send className="w-4 h-4" />
          Send Proposal
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Submit Proposal</DialogTitle>
          <DialogDescription>Send your proposal for "{title}"</DialogDescription>
        </DialogHeader>

        <ProposalForm
          job={job}
          onChange={(value) => {
            setIsDialogOpen(value);
          }}
        />
      </DialogContent>
    </Dialog>
  )
}
