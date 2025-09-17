"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  Search,
  Briefcase,
  DollarSign,
  MessageSquare,
  Send,
  Eye,
  LogOut,
  TrendingUp,
  CheckCircle,
  Settings,
} from "lucide-react"
import { useAuth } from "@/components/auth-guard"
import Link from "next/link"

// Mock data
const mockJobs = [
  {
    id: "1",
    title: "React Developer for E-commerce Platform",
    company: "TechCorp Inc.",
    description:
      "Looking for an experienced React developer to build a modern e-commerce platform with advanced features including payment integration, inventory management, and user authentication.",
    budget: "$3,000 - $5,000",
    duration: "2-3 months",
    skills: ["React", "TypeScript", "Node.js", "MongoDB"],
    posted: "2 days ago",
    proposals: 12,
    category: "Web Development",
    level: "Expert",
  },
  {
    id: "2",
    title: "UI/UX Designer for Mobile App",
    company: "StartupXYZ",
    description:
      "Need a talented designer to create user interfaces for our mobile application. Must have experience with modern design principles and mobile-first approach.",
    budget: "$2,000 - $3,000",
    duration: "1-2 months",
    skills: ["Figma", "UI Design", "Mobile Design", "Prototyping"],
    posted: "1 day ago",
    proposals: 8,
    category: "Design",
    level: "Intermediate",
  },
  {
    id: "3",
    title: "Content Writer for Tech Blog",
    company: "Digital Media Co.",
    description:
      "Seeking a skilled content writer to create engaging articles for our technology blog. Must have knowledge of current tech trends and SEO best practices.",
    budget: "$500 - $1,000",
    duration: "Ongoing",
    skills: ["Content Writing", "SEO", "Tech Writing", "Research"],
    posted: "3 days ago",
    proposals: 15,
    category: "Writing",
    level: "Intermediate",
  },
  {
    id: "4",
    title: "Python Data Analyst",
    company: "DataTech Solutions",
    description:
      "Looking for a Python developer with strong data analysis skills to help with machine learning projects and data visualization.",
    budget: "$4,000 - $6,000",
    duration: "3-4 months",
    skills: ["Python", "Pandas", "Machine Learning", "Data Visualization"],
    posted: "1 week ago",
    proposals: 6,
    category: "Data Science",
    level: "Expert",
  },
]

const mockProposals = [
  {
    id: "1",
    jobTitle: "React Developer for E-commerce Platform",
    company: "TechCorp Inc.",
    status: "pending",
    submittedDate: "2 days ago",
    proposedBudget: "$4,200",
    coverLetter: "I have 5+ years of experience building e-commerce platforms...",
  },
  {
    id: "2",
    jobTitle: "Mobile App UI Design",
    company: "AppCorp",
    status: "accepted",
    submittedDate: "1 week ago",
    proposedBudget: "$2,800",
    coverLetter: "I specialize in mobile-first design and have created...",
  },
  {
    id: "3",
    jobTitle: "Content Writing for Blog",
    company: "ContentCo",
    status: "rejected",
    submittedDate: "2 weeks ago",
    proposedBudget: "$800",
    coverLetter: "I'm a professional content writer with expertise in...",
  },
]

const mockActiveProjects = [
  {
    id: "1",
    title: "Mobile App UI Design",
    client: "AppCorp",
    status: "in-progress",
    progress: 75,
    budget: "$2,800",
    deadline: "Dec 1, 2024",
    lastUpdate: "1 hour ago",
  },
  {
    id: "2",
    title: "Website Redesign",
    client: "WebCorp",
    status: "review",
    progress: 95,
    budget: "$1,500",
    deadline: "Nov 25, 2024",
    lastUpdate: "2 days ago",
  },
]

export function FreelancerDashboard() {
  const { user, logout } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [levelFilter, setLevelFilter] = useState("all")

  const getStatusColor = (status: string) => {
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

  const filteredJobs = mockJobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = categoryFilter === "all" || job.category === categoryFilter
    const matchesLevel = levelFilter === "all" || job.level === levelFilter

    return matchesSearch && matchesCategory && matchesLevel
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50 dark:bg-background/80">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">FreelanceHub</span>
            </Link>
            <Badge variant="secondary">Freelancer</Badge>
          </div>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Button variant="outline" size="sm" asChild>
              <Link href="/messages">
                <MessageSquare className="w-4 h-4 mr-2" />
                Messages
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href="/settings">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Link>
            </Button>
            <div className="flex items-center space-x-2">
              <Avatar className="w-8 h-8">
                <AvatarImage src="/professional-person.png" />
                <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">{user?.name}</span>
              <Button variant="ghost" size="sm" onClick={logout}>
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Projects</p>
                  <p className="text-2xl font-bold">2</p>
                </div>
                <Briefcase className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Proposals Sent</p>
                  <p className="text-2xl font-bold">3</p>
                </div>
                <Send className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Earned</p>
                  <p className="text-2xl font-bold">$4,300</p>
                </div>
                <DollarSign className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Success Rate</p>
                  <p className="text-2xl font-bold">67%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="jobs">Browse Jobs</TabsTrigger>
            <TabsTrigger value="proposals">My Proposals</TabsTrigger>
            <TabsTrigger value="projects">Active Projects</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Dashboard Overview</h2>
              <Button>
                <Search className="w-4 h-4 mr-2" />
                Browse Jobs
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Job Matches */}
              <Card>
                <CardHeader>
                  <CardTitle>Recommended Jobs</CardTitle>
                  <CardDescription>Jobs that match your skills</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockJobs.slice(0, 2).map((job) => (
                    <div key={job.id} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-sm">{job.title}</h4>
                        <Badge variant="outline">{job.category}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">{job.company}</p>
                      <p className="text-xs text-muted-foreground mb-3">
                        {job.budget} • {job.duration}
                      </p>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {job.skills.slice(0, 3).map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">Posted {job.posted}</span>
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Active Projects */}
              <Card>
                <CardHeader>
                  <CardTitle>Active Projects</CardTitle>
                  <CardDescription>Your current work in progress</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockActiveProjects.map((project) => (
                    <div key={project.id} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-sm">{project.title}</h4>
                          <p className="text-xs text-muted-foreground">for {project.client}</p>
                        </div>
                        <Badge variant="outline" className={getStatusColor(project.status)}>
                          {project.status}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span>Progress</span>
                          <span>{project.progress}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-primary h-2 rounded-full" style={{ width: `${project.progress}%` }}></div>
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Due: {project.deadline}</span>
                          <span>{project.budget}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Browse Jobs Tab */}
          <TabsContent value="jobs" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Browse Jobs</h2>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search jobs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="Web Development">Web Development</SelectItem>
                    <SelectItem value="Design">Design</SelectItem>
                    <SelectItem value="Writing">Writing</SelectItem>
                    <SelectItem value="Data Science">Data Science</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={levelFilter} onValueChange={setLevelFilter}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Expert">Expert</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              {filteredJobs.map((job) => (
                <Card key={job.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-lg font-semibold">{job.title}</h3>
                          <Badge variant="outline">{job.level}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">{job.company}</p>
                        <p className="text-muted-foreground mb-3 line-clamp-2">{job.description}</p>

                        <div className="flex flex-wrap gap-2 mb-3">
                          {job.skills.map((skill) => (
                            <Badge key={skill} variant="secondary">
                              {skill}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span className="font-medium text-foreground">{job.budget}</span>
                          <span>{job.duration}</span>
                          <span>{job.proposals} proposals</span>
                          <span>Posted {job.posted}</span>
                        </div>
                      </div>

                      <div className="flex flex-col space-y-2">
                        <Button size="sm">
                          <Send className="w-4 h-4 mr-2" />
                          Send Proposal
                        </Button>
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Proposals Tab */}
          <TabsContent value="proposals" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">My Proposals</h2>
              <div className="text-sm text-muted-foreground">{mockProposals.length} proposals sent</div>
            </div>

            <div className="space-y-4">
              {mockProposals.map((proposal) => (
                <Card key={proposal.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-1">{proposal.jobTitle}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{proposal.company}</p>
                        <p className="text-muted-foreground mb-3 line-clamp-2">{proposal.coverLetter}</p>

                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span className="font-medium text-foreground">Proposed: {proposal.proposedBudget}</span>
                          <span>Submitted {proposal.submittedDate}</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className={getStatusColor(proposal.status)}>
                          {proposal.status}
                        </Badge>
                        {proposal.status === "accepted" && <CheckCircle className="w-5 h-5 text-green-600" />}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Active Projects Tab */}
          <TabsContent value="projects" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Active Projects</h2>
            </div>

            <div className="space-y-4">
              {mockActiveProjects.map((project) => (
                <Card key={project.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-1">{project.title}</h3>
                        <p className="text-sm text-muted-foreground mb-3">Working for {project.client}</p>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div>
                            <p className="text-xs text-muted-foreground">Budget</p>
                            <p className="font-semibold">{project.budget}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Deadline</p>
                            <p className="font-semibold">{project.deadline}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Progress</p>
                            <p className="font-semibold">{project.progress}%</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Last Update</p>
                            <p className="font-semibold">{project.lastUpdate}</p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span>{project.progress}%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div
                              className="bg-primary h-2 rounded-full"
                              style={{ width: `${project.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className={getStatusColor(project.status)}>
                          {project.status}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <MessageSquare className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
