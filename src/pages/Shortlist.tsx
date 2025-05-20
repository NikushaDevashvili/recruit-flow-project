
import { useState } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CandidateCard } from "@/components/CandidateCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FolderOpen } from "lucide-react";

// Reuse the sample data but filter for shortlisted candidates
const dummyCandidates = [
  {
    id: 2,
    name: "Sam Rivera",
    title: "Full Stack Engineer",
    company: "DataSystems",
    location: "Remote",
    summary: "Full stack developer specializing in React and Node.js. Developed multiple high-traffic applications and improved performance by 40%. Experience with AWS and serverless architecture.",
    experience: 5,
    education: "MS Software Engineering, MIT",
    skills: ["React", "Node.js", "AWS", "MongoDB", "Express", "Docker"],
    isShortlisted: true
  },
  {
    id: 7,
    name: "Casey Zhang",
    title: "Senior Frontend Engineer",
    company: "TechStart",
    location: "San Francisco, CA",
    summary: "Experienced frontend engineer with a focus on building scalable and maintainable code. Led the frontend architecture for a SaaS product with over 100k users.",
    experience: 6,
    education: "BS Computer Science, UC Berkeley",
    skills: ["React", "TypeScript", "GraphQL", "State Management", "Design Systems"],
    isShortlisted: true
  }
];

const projects = [
  { id: 1, name: "Frontend Developer" },
  { id: 2, name: "React Engineer" },
  { id: 3, name: "Full Stack Developer" }
];

const Shortlist = () => {
  const [candidates, setCandidates] = useState(dummyCandidates);
  const [selectedProject, setSelectedProject] = useState("all");
  
  const handleShortlist = (id: number) => {
    setCandidates(
      candidates.map(candidate => 
        candidate.id === id 
          ? { ...candidate, isShortlisted: !candidate.isShortlisted } 
          : candidate
      )
    );
  };

  return (
    <div className="flex h-screen bg-secondary/30">
      <AppSidebar />
      
      <main className="flex-1 overflow-auto">
        <div className="max-w-5xl mx-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold">Shortlisted Candidates</h1>
              <p className="text-muted-foreground">Review and manage your shortlisted candidates</p>
            </div>
            
            <div className="w-[200px]">
              <Select value={selectedProject} onValueChange={setSelectedProject}>
                <SelectTrigger>
                  <SelectValue placeholder="Select project" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Projects</SelectItem>
                  {projects.map(project => (
                    <SelectItem key={project.id} value={project.id.toString()}>
                      {project.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Tabs defaultValue="all" className="mb-6">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="reviewing">Reviewing</TabsTrigger>
              <TabsTrigger value="contacted">Contacted</TabsTrigger>
              <TabsTrigger value="interviewed">Interviewed</TabsTrigger>
            </TabsList>
          </Tabs>
          
          {candidates.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {candidates.map((candidate) => (
                <CandidateCard 
                  key={candidate.id} 
                  candidate={candidate} 
                  onShortlist={handleShortlist} 
                />
              ))}
            </div>
          ) : (
            <div className="text-center p-12 border rounded-lg bg-card">
              <FolderOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No shortlisted candidates</h3>
              <p className="text-muted-foreground mb-4">
                You haven't shortlisted any candidates yet. Start by searching for candidates and adding them to your shortlist.
              </p>
              <Button>Start a Search</Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Shortlist;
