"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Send } from "lucide-react"

interface ProposalFormProps {
  jobTitle: string
  jobBudget: string
  onSubmit?: (proposal: any) => void
}

export function ProposalForm({ jobTitle, jobBudget, onSubmit }: ProposalFormProps) {
  const [formData, setFormData] = useState({
    coverLetter: "",
    proposedBudget: "",
    timeline: "",
    milestones: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Mock proposal submission
    setTimeout(() => {
      const proposal = {
        id: Date.now().toString(),
        jobTitle,
        ...formData,
        status: "pending",
        submittedDate: "Just now",
      }

      // Store proposal in localStorage for demo
      const existingProposals = JSON.parse(localStorage.getItem("proposals") || "[]")
      localStorage.setItem("proposals", JSON.stringify([...existingProposals, proposal]))

      setIsSubmitting(false)
      setIsOpen(false)
      onSubmit?.(proposal)
    }, 1000)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="lg">
          <Send className="w-4 h-4 mr-2" />
          Send Proposal
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Submit Proposal</DialogTitle>
          <DialogDescription>Send your proposal for "{jobTitle}"</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="coverLetter">Cover Letter *</Label>
            <Textarea
              id="coverLetter"
              placeholder="Introduce yourself and explain why you're the perfect fit for this project..."
              value={formData.coverLetter}
              onChange={(e) => handleInputChange("coverLetter", e.target.value)}
              rows={6}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="proposedBudget">Your Proposed Budget</Label>
              <Input
                id="proposedBudget"
                placeholder="e.g. $3,500"
                value={formData.proposedBudget}
                onChange={(e) => handleInputChange("proposedBudget", e.target.value)}
                required
              />
              <p className="text-xs text-muted-foreground">Client's budget: {jobBudget}</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="timeline">Delivery Timeline</Label>
              <Select value={formData.timeline} onValueChange={(value) => handleInputChange("timeline", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select timeline" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-week">1 week</SelectItem>
                  <SelectItem value="2-weeks">2 weeks</SelectItem>
                  <SelectItem value="1-month">1 month</SelectItem>
                  <SelectItem value="2-months">2 months</SelectItem>
                  <SelectItem value="3-months">3 months</SelectItem>
                  <SelectItem value="3-months-plus">3+ months</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="milestones">Project Milestones (Optional)</Label>
            <Textarea
              id="milestones"
              placeholder="Break down your approach into key milestones and deliverables..."
              value={formData.milestones}
              onChange={(e) => handleInputChange("milestones", e.target.value)}
              rows={4}
            />
          </div>

          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send Proposal"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
