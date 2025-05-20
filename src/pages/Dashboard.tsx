
import { AppSidebar } from "@/components/AppSidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { NewProjectDialog } from "@/components/NewProjectDialog";

const Dashboard = () => {
  const [isNewProjectOpen, setIsNewProjectOpen] = useState(false);
  const [projects, setProjects] = useState<any[]>([]);

  // Dummy data for demo purposes
  const dummyProjects = [
    {
      id: 1,
      name: "Frontend React Developer",
      description: "Looking for senior React developers with 5+ years of experience.",
      role: "frontend",
      tags: ["React", "TypeScript", "Remote"],
      candidates: 24,
      createdAt: "2023-05-10T10:00:00Z"
    },
    {
      id: 2,
      name: "DevOps Engineer",
      description: "Need skilled DevOps engineers for cloud infrastructure management.",
      role: "devops",
      tags: ["AWS", "Kubernetes", "CI/CD"],
      candidates: 12,
      createdAt: "2023-05-15T10:00:00Z"
    }
  ];

  // For demo purposes, use dummy data if no projects exist
  const displayProjects = projects.length > 0 ? projects : dummyProjects;

  return (
    <div className="flex h-screen bg-secondary/30">
      <AppSidebar />
      <NewProjectDialog open={isNewProjectOpen} onOpenChange={setIsNewProjectOpen} />
      
      <main className="flex-1 overflow-auto p-6">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <p className="text-muted-foreground">Manage your recruitment projects</p>
            </div>
            <Button onClick={() => setIsNewProjectOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              New Project
            </Button>
          </div>
          
          {displayProjects.length === 0 ? (
            <Card className="border-dashed border-2 bg-card/50">
              <CardContent className="flex flex-col items-center justify-center p-12 text-center">
                <div className="rounded-full bg-primary/10 p-6 mb-4">
                  <Plus className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2">Create your first project</h3>
                <p className="text-muted-foreground mb-4 max-w-md">
                  Projects help you organize your candidate searches. Create one to get started!
                </p>
                <Button onClick={() => setIsNewProjectOpen(true)}>Create Project</Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {displayProjects.map((project) => (
                <Card key={project.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl">{project.name}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag: string) => (
                        <span key={tag} className="bg-secondary px-2 py-1 rounded-full text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{project.candidates} candidates</span>
                      <span className="text-muted-foreground">
                        Created {new Date(project.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              <Card className="border-dashed border-2 bg-card/50 flex items-center justify-center cursor-pointer hover:bg-card/80 transition-colors"
                onClick={() => setIsNewProjectOpen(true)}
              >
                <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                  <div className="rounded-full bg-primary/10 p-4 mb-2">
                    <Plus className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-base font-medium">Create New Project</h3>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
