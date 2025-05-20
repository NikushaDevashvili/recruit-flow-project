
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CandidateCard } from "@/components/CandidateCard";
import { X, SlidersHorizontal, Plus } from "lucide-react";

// Sample dummy data
const dummyCandidates = [
  {
    id: 1,
    name: "Alex Johnson",
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    summary: "Experienced frontend developer with 7+ years working on complex React applications. Led development teams and architected scalable solutions. Strong focus on performance optimization and user experience.",
    experience: 7,
    education: "BS Computer Science, Stanford University",
    skills: ["React", "TypeScript", "Redux", "GraphQL", "Webpack", "Jest"],
    isShortlisted: false
  },
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
    id: 3,
    name: "Taylor Kim",
    title: "Frontend Developer",
    company: "CreativeUI",
    location: "New York, NY",
    summary: "Frontend specialist with expertise in modern JavaScript frameworks. Built responsive and accessible interfaces for enterprise clients. Experience with design systems and component libraries.",
    experience: 4,
    education: "BA Design & Computer Science, NYU",
    skills: ["React", "CSS/SCSS", "JavaScript", "Figma", "Accessibility", "UI Design"],
    isShortlisted: false
  },
  {
    id: 4,
    name: "Jordan Patel",
    title: "Senior Software Engineer",
    company: "FinTech Solutions",
    location: "Chicago, IL",
    summary: "Full stack engineer with a focus on frontend technologies. Led the redesign of a financial dashboard used by thousands of customers. Experience with fintech and data visualization.",
    experience: 6,
    education: "BS Computer Engineering, University of Illinois",
    skills: ["React", "D3.js", "TypeScript", "Java", "Spring Boot", "SQL"],
    isShortlisted: false
  },
  {
    id: 5,
    name: "Morgan Lee",
    title: "Frontend Team Lead",
    company: "E-commerce Plus",
    location: "Seattle, WA",
    summary: "Frontend team lead managing 5 developers. Implemented CI/CD pipelines and improved code quality across the organization. Expert in React performance optimization and state management.",
    experience: 8,
    education: "MS Computer Science, University of Washington",
    skills: ["React", "Redux", "Next.js", "Performance", "Team Leadership", "CI/CD"],
    isShortlisted: false
  },
  {
    id: 6,
    name: "Jamie Wilson",
    title: "React Developer",
    company: "SocialApp Inc.",
    location: "Austin, TX",
    summary: "React developer with experience building social media applications. Implemented real-time features using WebSockets and optimized component rendering for large lists.",
    experience: 3,
    education: "BS Computer Science, UT Austin",
    skills: ["React", "WebSockets", "Firebase", "Redux", "JavaScript", "CSS"],
    isShortlisted: false
  }
];

const SearchResults = () => {
  const navigate = useNavigate();
  const [candidates, setCandidates] = useState(dummyCandidates);
  const [appliedFilters] = useState([
    "Software Engineer",
    "React",
    "San Francisco",
    "5+ years"
  ]);
  
  const handleShortlist = (id: number) => {
    setCandidates(
      candidates.map(candidate => 
        candidate.id === id 
          ? { ...candidate, isShortlisted: !candidate.isShortlisted } 
          : candidate
      )
    );
  };
  
  const handleRemoveFilter = (filter: string) => {
    // In a real app, this would update the search filters
    console.log("Removing filter:", filter);
  };
  
  const handleNewSearch = () => {
    navigate("/search");
  };

  return (
    <div className="flex h-screen bg-secondary/30">
      <AppSidebar />
      
      <main className="flex-1 overflow-auto">
        <div className="sticky top-0 z-10 bg-white shadow-sm border-b">
          <div className="max-w-5xl mx-auto px-6 py-4">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold">Search Results</h1>
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleNewSearch}>
                  <Plus className="h-4 w-4 mr-2" />
                  New Search
                </Button>
                <Button variant="outline">
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Edit Filters
                </Button>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {appliedFilters.map((filter) => (
                <Badge key={filter} variant="secondary" className="gap-1 py-1">
                  {filter}
                  <button
                    onClick={() => handleRemoveFilter(filter)}
                    className="ml-1 rounded-full hover:bg-secondary-foreground/10"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        </div>
        
        <div className="max-w-5xl mx-auto p-6">
          <p className="text-muted-foreground mb-6">
            Found {candidates.length} candidates matching your criteria
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {candidates.map((candidate) => (
              <CandidateCard 
                key={candidate.id} 
                candidate={candidate} 
                onShortlist={handleShortlist} 
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default SearchResults;
