"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  Plus,
  Search,
  Briefcase,
  Users,
  Clock,
  DollarSign,
  Star,
  MessageSquare,
  Eye,
  Edit,
  MoreHorizontal,
  LogOut,
  Settings,
} from "lucide-react"
import { useAuth } from "@/components/auth-guard"
import Link from "next/link"

// Mock data
const mockJobs = [
  {
    id: "1",
    title: "React Developer for E-commerce Platform",
    description: "Looking for an experienced React developer to build a modern e-commerce platform...",
    budget: "$3,000 - $5,000",
    duration: "2-3 months",
    skills: ["React", "TypeScript", "Node.js"],
    status: "active",
    proposals: 12,
    posted: "2 days ago",
  },
  {
    id: "2",
    title: "UI/UX Designer for Mobile App",
    description: "Need a talented designer to create user interfaces for our mobile application...",
    budget: "$2,000 - $3,000",
    duration: "1-2 months",
    skills: ["Figma", "UI Design", "Mobile Design"],
    status: "active",
    proposals: 8,
    posted: "1 week ago",
  },
  {
    id: "3",
    title: "Content Writer for Tech Blog",
    description: "Seeking a skilled content writer to create engaging articles for our technology blog...",
    budget: "$500 - $1,000",
    duration: "Ongoing",
    skills: ["Content Writing", "SEO", "Tech Writing"],
    status: "completed",
    proposals: 15,
    posted: "2 weeks ago",
  },
]

const mockFreelancers = [
  {
    id: "1",
    name: "Sarah Johnson",
    title: "Full-Stack Developer",
    rating: 4.9,
    reviews: 47,
    hourlyRate: "$75/hr",
    skills: ["React", "Node.js", "Python", "AWS"],
    avatar: "/professional-woman-developer.png",
    availability: "Available now",
  },
  {
    id: "2",
    name: "Mike Chen",
    title: "UI/UX Designer",
    rating: 4.8,
    reviews: 32,
    hourlyRate: "$60/hr",
    skills: ["Figma", "Adobe XD", "Prototyping", "User Research"],
    avatar: "/professional-man-designer.jpg",
    availability: "Available in 1 week",
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    title: "Content Strategist",
    rating: 5.0,
    reviews: 28,
    hourlyRate: "$45/hr",
    skills: ["Content Strategy", "SEO", "Copywriting", "Social Media"],
    avatar: "/professional-woman-writer.png",
    availability: "Available now",
  },
]

const mockProjects = [
  {
    id: "1",
    title: "E-commerce Platform Development",
    freelancer: "Sarah Johnson",
    status: "in-progress",
    progress: 65,
    budget: "$4,500",
    deadline: "Dec 15, 2024",
    lastUpdate: "2 hours ago",
  },
  {
    id: "2",
    title: "Mobile App UI Design",
    freelancer: "Mike Chen",
    status: "review",
    progress: 90,
    budget: "$2,500",
    deadline: "Nov 30, 2024",
    lastUpdate: "1 day ago",
  },
  {
    id: "3",
    title: "Blog Content Creation",
    freelancer: "Emily Rodriguez",
    status: "completed",
    progress: 100,
    budget: "$800",
    deadline: "Nov 20, 2024",
    lastUpdate: "3 days ago",
  },
]

export function EmployerDashboard() {
  const { user, logout } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")

  const getStatusColor = (status: string) => {
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
            <Badge variant="secondary">Employer</Badge>
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
                  <p className="text-sm font-medium text-muted-foreground">Active Jobs</p>
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
                  <p className="text-sm font-medium text-muted-foreground">Total Proposals</p>
                  <p className="text-2xl font-bold">20</p>
                </div>
                <Users className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">In Progress</p>
                  <p className="text-2xl font-bold">1</p>
                </div>
                <Clock className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Spent</p>
                  <p className="text-2xl font-bold">$7,800</p>
                </div>
                <DollarSign className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="jobs">My Jobs</TabsTrigger>
            <TabsTrigger value="freelancers">Find Talent</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Dashboard Overview</h2>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Post New Job
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Jobs */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Jobs</CardTitle>
                  <CardDescription>Your latest job postings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockJobs.slice(0, 2).map((job) => (
                    <div key={job.id} className="flex items-start justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm mb-1">{job.title}</h4>
                        <p className="text-xs text-muted-foreground mb-2">
                          {job.budget} • {job.duration}
                        </p>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className={getStatusColor(job.status)}>
                            {job.status}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{job.proposals} proposals</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Active Projects */}
              <Card>
                <CardHeader>
                  <CardTitle>Active Projects</CardTitle>
                  <CardDescription>Projects currently in progress</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockProjects
                    .filter((p) => p.status === "in-progress")
                    .map((project) => (
                      <div key={project.id} className="p-4 border rounded-lg">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-semibold text-sm">{project.title}</h4>
                            <p className="text-xs text-muted-foreground">with {project.freelancer}</p>
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
                            <div
                              className="bg-primary h-2 rounded-full"
                              style={{ width: `${project.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Jobs Tab */}
          <TabsContent value="jobs" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">My Jobs</h2>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Post New Job
              </Button>
            </div>

            <div className="space-y-4">
              {mockJobs.map((job) => (
                <Card key={job.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">{job.title}</h3>
                        <p className="text-muted-foreground mb-3">{job.description}</p>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {job.skills.map((skill) => (
                            <Badge key={skill} variant="secondary">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span>{job.budget}</span>
                          <span>{job.duration}</span>
                          <span>{job.proposals} proposals</span>
                          <span>Posted {job.posted}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className={getStatusColor(job.status)}>
                          {job.status}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Find Talent Tab */}
          <TabsContent value="freelancers" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Find Talent</h2>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search freelancers..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockFreelancers.map((freelancer) => (
                <Card key={freelancer.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4 mb-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={freelancer.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{freelancer.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="font-semibold">{freelancer.name}</h3>
                        <p className="text-sm text-muted-foreground">{freelancer.title}</p>
                        <div className="flex items-center space-x-1 mt-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{freelancer.rating}</span>
                          <span className="text-sm text-muted-foreground">({freelancer.reviews} reviews)</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Rate:</span>
                        <span className="font-semibold">{freelancer.hourlyRate}</span>
                      </div>

                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Skills:</p>
                        <div className="flex flex-wrap gap-1">
                          {freelancer.skills.slice(0, 3).map((skill) => (
                            <Badge key={skill} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                          {freelancer.skills.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{freelancer.skills.length - 3}
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">{freelancer.availability}</span>
                      </div>

                      <div className="flex space-x-2 pt-2">
                        <Button size="sm" className="flex-1">
                          Contact
                        </Button>
                        <Button size="sm" variant="outline">
                          View Profile
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Projects</h2>
            </div>

            <div className="space-y-4">
              {mockProjects.map((project) => (
                <Card key={project.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-1">{project.title}</h3>
                        <p className="text-sm text-muted-foreground mb-3">Working with {project.freelancer}</p>

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
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
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
