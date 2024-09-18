'use client'

import React, { useState, useEffect } from 'react'
import { Bell, ChevronDown, Play, Image, Mic, Download, Scissors, Layout, MessageSquare, User, FileText, Youtube, Upload } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/components/ui/use-toast"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Job {
  id: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  filename: string;
  progress: number;
}

export default function Dashboard() {
  const [file, setFile] = useState<File | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast()

  useEffect(() => {
    fetchJobs();
    const intervalId = setInterval(fetchJobs, 5000);
    return () => clearInterval(intervalId);
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await fetch('http://64.227.164.159/jobs');
      if (response.ok) {
        const data = await response.json();
        setJobs(data);
      } else {
        console.error('Failed to fetch jobs:', await response.text());
      }
    } catch (error) {
      console.error('Failed to fetch jobs:', error);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('video', file);

    try {
      const response = await fetch('http://64.227.164.159/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        toast({
          title: "Video uploaded successfully",
          description: "Your video is now being processed.",
        });
        setFile(null);
        fetchJobs();
      } else {
        const errorText = await response.text();
        throw new Error(`Upload failed: ${errorText}`);
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Upload failed",
        description: error instanceof Error ? error.message : "There was an error uploading your video. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
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

      <main className="flex-1 overflow-y-auto">
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

        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Upload Video</CardTitle>
              <CardDescription>Select a video file to upload and process</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                <Input type="file" onChange={handleFileChange} accept="video/*" />
                <Button onClick={handleUpload} disabled={!file || isUploading}>
                  {isUploading ? 'Uploading...' : 'Upload'}
                  <Upload className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Job Status</CardTitle>
              <CardDescription>Track the status of your video processing jobs</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>File Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Progress</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {jobs.map((job) => (
                    <TableRow key={job.id}>
                      <TableCell>{job.filename}</TableCell>
                      <TableCell>{job.status}</TableCell>
                      <TableCell>
                        <Progress value={job.progress} className="w-[60%]" />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="mt-8">
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