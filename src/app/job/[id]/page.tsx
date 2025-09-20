"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Briefcase, Clock, DollarSign, Users, Star, MapPin, Calendar } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/components/authentication/auth-guard"

// Mock job data - in real app, this would be fetched based on the ID
const mockJob = {
  id: "1",
  title: "React Developer for E-commerce Platform",
  company: "TechCorp Inc.",
  description:
    "We are looking for an experienced React developer to build a modern e-commerce platform with advanced features including payment integration, inventory management, and user authentication. The ideal candidate should have strong experience with React, TypeScript, and modern web development practices.\n\nThis is a great opportunity to work on a cutting-edge project with a growing team. You'll be responsible for developing user-facing features, optimizing performance, and ensuring cross-browser compatibility.",
  budget: "$3,000 - $5,000",
  budgetType: "fixed",
  duration: "2-3 months",
  level: "Expert",
  category: "Web Development",
  skills: ["React", "TypeScript", "Node.js", "MongoDB", "AWS", "Payment Integration"],
  requirements:
    "- 5+ years of React development experience\n- Strong TypeScript skills\n- Experience with e-commerce platforms\n- Knowledge of payment gateway integration\n- AWS deployment experience preferred",
  posted: "2 days ago",
  proposals: 12,
  status: "active",
  isUrgent: false,
  location: "Remote",
  employer: {
    name: "John Smith",
    company: "TechCorp Inc.",
    rating: 4.8,
    reviews: 23,
    jobsPosted: 15,
    hireRate: "85%",
    avatar: "/professional-person.png",
  },
}

const mockProposals = [
  {
    id: "1",
    freelancer: {
      name: "Sarah Johnson",
      title: "Full-Stack Developer",
      rating: 4.9,
      reviews: 47,
      avatar: "/professional-woman-developer.png",
    },
    proposedBudget: "$4,200",
    timeline: "8 weeks",
    coverLetter:
      "I have over 6 years of experience building e-commerce platforms with React and TypeScript. I've successfully integrated multiple payment gateways including Stripe, PayPal, and Square...",
    submittedDate: "1 day ago",
  },
  {
    id: "2",
    freelancer: {
      name: "Mike Chen",
      title: "React Specialist",
      rating: 4.7,
      reviews: 32,
      avatar: "/professional-man-designer.jpg",
    },
    proposedBudget: "$3,800",
    timeline: "10 weeks",
    coverLetter:
      "I specialize in React development and have built several e-commerce solutions. My approach focuses on performance optimization and user experience...",
    submittedDate: "2 days ago",
  },
]

export default function JobDetailPage({ params }: { params: { id: string } }) {
  const { user } = useAuth()
  const [showProposals, setShowProposals] = useState(false)

  const isEmployer = user?.type === "employer"
  const isFreelancer = user?.type === "freelancer"

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link
              href={isEmployer ? "/employer/dashboard" : "/freelancer/dashboard"}
              className="flex items-center space-x-2 text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Dashboard</span>
            </Link>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">FreelanceHub</span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Header */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h1 className="text-2xl font-bold mb-2">{mockJob.title}</h1>
                    <p className="text-muted-foreground mb-3">{mockJob.company}</p>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{mockJob.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>Posted {mockJob.posted}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{mockJob.proposals} proposals</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">{mockJob.category}</Badge>
                      <Badge variant="outline">{mockJob.level}</Badge>
                      {mockJob.isUrgent && <Badge variant="destructive">Urgent</Badge>}
                    </div>
                  </div>
                  {isFreelancer && <Button size="lg">Send Proposal</Button>}
                </div>
              </CardContent>
            </Card>

            {/* Job Description */}
            <Card>
              <CardHeader>
                <CardTitle>Job Description</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm max-w-none">
                  {mockJob.description.split("\n").map((paragraph, index) => (
                    <p key={index} className="mb-4 last:mb-0">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Skills Required */}
            <Card>
              <CardHeader>
                <CardTitle>Skills Required</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {mockJob.skills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Requirements */}
            <Card>
              <CardHeader>
                <CardTitle>Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm max-w-none">
                  {mockJob.requirements.split("\n").map((requirement, index) => (
                    <p key={index} className="mb-2 last:mb-0">
                      {requirement}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Proposals (for employers) */}
            {isEmployer && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Proposals ({mockProposals.length})</CardTitle>
                    <Button variant="outline" onClick={() => setShowProposals(!showProposals)}>
                      {showProposals ? "Hide" : "View"} Proposals
                    </Button>
                  </div>
                </CardHeader>
                {showProposals && (
                  <CardContent className="space-y-4">
                    {mockProposals.map((proposal) => (
                      <div key={proposal.id} className="border rounded-lg p-4">
                        <div className="flex items-start space-x-4">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={proposal.freelancer.avatar || "/placeholder.svg"} />
                            <AvatarFallback>{proposal.freelancer.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <div>
                                <h4 className="font-semibold">{proposal.freelancer.name}</h4>
                                <p className="text-sm text-muted-foreground">{proposal.freelancer.title}</p>
                              </div>
                              <div className="text-right">
                                <p className="font-semibold">{proposal.proposedBudget}</p>
                                <p className="text-sm text-muted-foreground">{proposal.timeline}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-4 mb-3">
                              <div className="flex items-center space-x-1">
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                <span className="text-sm font-medium">{proposal.freelancer.rating}</span>
                                <span className="text-sm text-muted-foreground">
                                  ({proposal.freelancer.reviews} reviews)
                                </span>
                              </div>
                              <span className="text-sm text-muted-foreground">Submitted {proposal.submittedDate}</span>
                            </div>
                            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{proposal.coverLetter}</p>
                            <div className="flex space-x-2">
                              <Button size="sm">View Profile</Button>
                              <Button size="sm" variant="outline">
                                Message
                              </Button>
                              <Button size="sm" variant="outline">
                                Hire
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                )}
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Budget & Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Project Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Budget</span>
                  </div>
                  <span className="font-semibold">{mockJob.budget}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Duration</span>
                  </div>
                  <span className="font-semibold">{mockJob.duration}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Proposals</span>
                  </div>
                  <span className="font-semibold">{mockJob.proposals}</span>
                </div>
              </CardContent>
            </Card>

            {/* Employer Info */}
            <Card>
              <CardHeader>
                <CardTitle>About the Client</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start space-x-4 mb-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={mockJob.employer.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{mockJob.employer.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold">{mockJob.employer.name}</h4>
                    <p className="text-sm text-muted-foreground">{mockJob.employer.company}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Rating</span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{mockJob.employer.rating}</span>
                      <span className="text-sm text-muted-foreground">({mockJob.employer.reviews})</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Jobs Posted</span>
                    <span className="text-sm font-medium">{mockJob.employer.jobsPosted}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Hire Rate</span>
                    <span className="text-sm font-medium">{mockJob.employer.hireRate}</span>
                  </div>
                </div>

                {isFreelancer && (
                  <div className="mt-4 pt-4 border-t">
                    <Button className="w-full bg-transparent" variant="outline">
                      View Client Profile
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Similar Jobs */}
            <Card>
              <CardHeader>
                <CardTitle>Similar Jobs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { title: "Vue.js Developer Needed", budget: "$2,000 - $3,500" },
                  { title: "Full-Stack Web Application", budget: "$4,000 - $7,000" },
                  { title: "React Native Mobile App", budget: "$3,500 - $5,500" },
                ].map((job, index) => (
                  <div key={index} className="p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
                    <h5 className="font-medium text-sm mb-1">{job.title}</h5>
                    <p className="text-xs text-muted-foreground">{job.budget}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
