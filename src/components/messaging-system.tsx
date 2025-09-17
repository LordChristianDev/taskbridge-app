"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ArrowLeft, Briefcase, Send, Search, MoreVertical, Paperclip, Phone, Video, LogOut } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/components/auth-guard"
import { cn } from "@/lib/utils"

// Mock conversations data
const mockConversations = [
  {
    id: "1",
    participant: {
      name: "Sarah Johnson",
      title: "Full-Stack Developer",
      avatar: "/professional-woman-developer.png",
      isOnline: true,
    },
    lastMessage: {
      text: "I've completed the initial wireframes for the project. Would you like to review them?",
      timestamp: "2 min ago",
      isRead: false,
      senderId: "freelancer",
    },
    project: "E-commerce Platform Development",
    unreadCount: 2,
  },
  {
    id: "2",
    participant: {
      name: "Mike Chen",
      title: "UI/UX Designer",
      avatar: "/professional-man-designer.jpg",
      isOnline: false,
    },
    lastMessage: {
      text: "Thanks for the feedback! I'll make those changes and send the updated designs tomorrow.",
      timestamp: "1 hour ago",
      isRead: true,
      senderId: "freelancer",
    },
    project: "Mobile App UI Design",
    unreadCount: 0,
  },
  {
    id: "3",
    participant: {
      name: "Emily Rodriguez",
      title: "Content Strategist",
      avatar: "/professional-woman-writer.png",
      isOnline: true,
    },
    lastMessage: {
      text: "The blog posts are ready for your review. I've focused on SEO optimization as discussed.",
      timestamp: "3 hours ago",
      isRead: true,
      senderId: "freelancer",
    },
    project: "Content Writing Project",
    unreadCount: 0,
  },
  {
    id: "4",
    participant: {
      name: "John Smith",
      title: "Project Manager",
      avatar: "/professional-person.png",
      isOnline: false,
    },
    lastMessage: {
      text: "Can we schedule a call to discuss the project requirements in more detail?",
      timestamp: "1 day ago",
      isRead: true,
      senderId: "employer",
    },
    project: "Website Redesign",
    unreadCount: 0,
  },
]

// Mock messages for active conversation
const mockMessages = [
  {
    id: "1",
    senderId: "employer",
    senderName: "You",
    text: "Hi Sarah! I reviewed your proposal and I'm impressed with your experience. I'd like to discuss the project further.",
    timestamp: "2 days ago",
    isRead: true,
  },
  {
    id: "2",
    senderId: "freelancer",
    senderName: "Sarah Johnson",
    text: "Thank you! I'm excited about this project. I have some questions about the specific requirements and timeline.",
    timestamp: "2 days ago",
    isRead: true,
  },
  {
    id: "3",
    senderId: "freelancer",
    senderName: "Sarah Johnson",
    text: "Could you provide more details about the payment gateway integration? Are there specific providers you prefer?",
    timestamp: "2 days ago",
    isRead: true,
  },
  {
    id: "4",
    senderId: "employer",
    senderName: "You",
    text: "We're looking to integrate Stripe and PayPal initially. The platform should also support adding more payment methods in the future.",
    timestamp: "1 day ago",
    isRead: true,
  },
  {
    id: "5",
    senderId: "employer",
    senderName: "You",
    text: "I've attached the detailed requirements document. Please review it and let me know if you have any questions.",
    timestamp: "1 day ago",
    isRead: true,
  },
  {
    id: "6",
    senderId: "freelancer",
    senderName: "Sarah Johnson",
    text: "Perfect! I've reviewed the document and everything looks clear. I can definitely work with those requirements.",
    timestamp: "1 day ago",
    isRead: true,
  },
  {
    id: "7",
    senderId: "freelancer",
    senderName: "Sarah Johnson",
    text: "I've completed the initial wireframes for the project. Would you like to review them?",
    timestamp: "2 min ago",
    isRead: false,
  },
  {
    id: "8",
    senderId: "freelancer",
    senderName: "Sarah Johnson",
    text: "I can also set up a demo environment if you'd like to see the progress so far.",
    timestamp: "1 min ago",
    isRead: false,
  },
]

export function MessagingSystem() {
  const { user, logout } = useAuth()
  const [selectedConversation, setSelectedConversation] = useState(mockConversations[0])
  const [messages, setMessages] = useState(mockMessages)
  const [newMessage, setNewMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    const message = {
      id: Date.now().toString(),
      senderId: user?.type === "employer" ? "employer" : "freelancer",
      senderName: "You",
      text: newMessage,
      timestamp: "Just now",
      isRead: true,
    }

    setMessages((prev) => [...prev, message])
    setNewMessage("")
  }

  const filteredConversations = mockConversations.filter(
    (conv) =>
      conv.participant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.project.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const formatTimestamp = (timestamp: string) => {
    // In a real app, you'd format this properly
    return timestamp
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link
              href={user?.type === "employer" ? "/employer/dashboard" : "/freelancer/dashboard"}
              className="flex items-center space-x-2 text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Dashboard</span>
            </Link>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">FreelanceHub</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Badge variant="secondary">{user?.type}</Badge>
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

      <div className="flex h-[calc(100vh-73px)]">
        {/* Conversations Sidebar */}
        <div className="w-80 border-r bg-muted/30 flex flex-col">
          {/* Search */}
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Conversations List */}
          <ScrollArea className="flex-1">
            <div className="p-2">
              {filteredConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={cn(
                    "p-3 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors mb-2",
                    selectedConversation.id === conversation.id && "bg-muted",
                  )}
                  onClick={() => setSelectedConversation(conversation)}
                >
                  <div className="flex items-start space-x-3">
                    <div className="relative">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={conversation.participant.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{conversation.participant.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      {conversation.participant.isOnline && (
                        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-background rounded-full"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold text-sm truncate">{conversation.participant.name}</h4>
                        <span className="text-xs text-muted-foreground">
                          {formatTimestamp(conversation.lastMessage.timestamp)}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mb-1">{conversation.participant.title}</p>
                      <p className="text-xs text-muted-foreground mb-2 truncate">{conversation.project}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-muted-foreground truncate flex-1 mr-2">
                          {conversation.lastMessage.text}
                        </p>
                        {conversation.unreadCount > 0 && (
                          <Badge variant="destructive" className="text-xs px-1.5 py-0.5 min-w-[20px] h-5">
                            {conversation.unreadCount}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b bg-white/80 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={selectedConversation.participant.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{selectedConversation.participant.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  {selectedConversation.participant.isOnline && (
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-background rounded-full"></div>
                  )}
                </div>
                <div>
                  <h3 className="font-semibold">{selectedConversation.participant.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedConversation.participant.title}</p>
                  <p className="text-xs text-muted-foreground">{selectedConversation.project}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  <Phone className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Video className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex",
                    message.senderId === (user?.type === "employer" ? "employer" : "freelancer")
                      ? "justify-end"
                      : "justify-start",
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[70%] rounded-lg px-4 py-2",
                      message.senderId === (user?.type === "employer" ? "employer" : "freelancer")
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted",
                    )}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p
                      className={cn(
                        "text-xs mt-1",
                        message.senderId === (user?.type === "employer" ? "employer" : "freelancer")
                          ? "text-primary-foreground/70"
                          : "text-muted-foreground",
                      )}
                    >
                      {formatTimestamp(message.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Message Input */}
          <div className="p-4 border-t bg-white/80 backdrop-blur-sm">
            <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
              <Button type="button" variant="ghost" size="sm">
                <Paperclip className="w-4 h-4" />
              </Button>
              <Input
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" size="sm" disabled={!newMessage.trim()}>
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
