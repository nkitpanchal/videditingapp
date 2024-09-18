import { Bell, ChevronDown, Play, Image, Mic, Download, Scissors, Layout, MessageSquare, User, FileText, Youtube } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-purple-600">VideoEdit Pro</h1>
        </div>
        <nav className="mt-6">
          {[
            { name: 'Dashboard', icon: Layout },
            { name: 'My Projects', icon: Play },
            { name: 'My Exports', icon: Download },
            { name: 'My Assets', icon: Image },
          ].map((item) => (
            <a
              key={item.name}
              href="#"
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-purple-100"
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.name}
            </a>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-gray-800">Welcome back, User!</h2>
            <div className="flex items-center">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" className="ml-2">
                <User className="h-5 w-5 mr-2" />
                Profile
                <ChevronDown className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </header>

        {/* Dashboard content */}
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Quick actions */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Upload Video</CardTitle>
                </CardHeader>
                <CardContent>
                  <Input type="file" />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>New Project</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button>
                    <Play className="mr-2 h-4 w-4" /> Start Creating
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Recent Exports</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" /> View Exports
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Popular tools */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Popular Tools</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: 'Split Video', icon: Scissors },
                { name: 'Add Subtitles', icon: FileText },
                { name: 'Voice Over', icon: Mic },
                { name: 'AI Avatars', icon: User },
                { name: 'YouTube Export', icon: Youtube },
                { name: 'Chat GPT Video', icon: MessageSquare },
              ].map((tool) => (
                <Card key={tool.name}>
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <tool.icon className="h-8 w-8 mb-2 text-purple-500" />
                    <CardDescription>{tool.name}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
