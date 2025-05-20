
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CandidateCard } from "@/components/CandidateCard";
import { X, SlidersHorizontal, Plus, List, LayoutGrid } from "lucide-react";
import { CandidateListItem } from "@/components/CandidateListItem";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

// Import the sample data from Search page
const roles = [
  { label: "Software Engineer", value: "software-engineer" },
  { label: "Frontend Developer", value: "frontend-developer" },
  { label: "Backend Developer", value: "backend-developer" },
  { label: "Full Stack Developer", value: "fullstack-developer" },
  { label: "DevOps Engineer", value: "devops-engineer" },
  { label: "Data Scientist", value: "data-scientist" },
  { label: "Product Manager", value: "product-manager" },
  { label: "UI/UX Designer", value: "ui-ux-designer" },
];

const technologies = [
  { label: "JavaScript", value: "javascript" },
  { label: "TypeScript", value: "typescript" },
  { label: "React", value: "react" },
  { label: "Vue", value: "vue" },
  { label: "Angular", value: "angular" },
  { label: "Node.js", value: "nodejs" },
  { label: "Python", value: "python" },
  { label: "Java", value: "java" },
  { label: "Ruby", value: "ruby" },
  { label: "Go", value: "go" },
  { label: "AWS", value: "aws" },
  { label: "Docker", value: "docker" },
  { label: "Kubernetes", value: "kubernetes" },
];

const locations = [
  { label: "San Francisco, CA", value: "san-francisco" },
  { label: "New York, NY", value: "new-york" },
  { label: "Los Angeles, CA", value: "los-angeles" },
  { label: "Seattle, WA", value: "seattle" },
  { label: "Austin, TX", value: "austin" },
  { label: "Boston, MA", value: "boston" },
  { label: "Chicago, IL", value: "chicago" },
  { label: "Denver, CO", value: "denver" },
  { label: "Remote", value: "remote" },
];

const experienceLevels = [
  { label: "Entry Level (0-2 years)", value: "entry" },
  { label: "Mid Level (3-5 years)", value: "mid" },
  { label: "Senior (6+ years)", value: "senior" },
  { label: "Principal/Lead (8+ years)", value: "principal" },
];

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
  
  // Filter editing state
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [roleOpen, setRoleOpen] = useState(false);
  const [techOpen, setTechOpen] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);
  const [roleValue, setRoleValue] = useState("software-engineer");
  const [techValue, setTechValue] = useState("react");
  const [locationValue, setLocationValue] = useState("san-francisco");
  const [experienceValue, setExperienceValue] = useState("senior");
  
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

  const toggleViewMode = () => {
    setViewMode(viewMode === "grid" ? "list" : "grid");
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
                <Button variant="outline" onClick={toggleViewMode}>
                  {viewMode === "grid" ? (
                    <List className="h-4 w-4 mr-2" />
                  ) : (
                    <LayoutGrid className="h-4 w-4 mr-2" />
                  )}
                  {viewMode === "grid" ? "List View" : "Grid View"}
                </Button>
                <Button variant="outline" onClick={handleNewSearch}>
                  <Plus className="h-4 w-4 mr-2" />
                  New Search
                </Button>
                <Button variant="outline" onClick={() => setFilterModalOpen(!filterModalOpen)}>
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

            {filterModalOpen && (
              <div className="mt-4 p-4 border rounded-lg bg-white shadow-md">
                <h3 className="text-lg font-medium mb-3">Edit Search Filters</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Role</label>
                    <Popover open={roleOpen} onOpenChange={setRoleOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={roleOpen}
                          className="w-full justify-between"
                        >
                          {roleValue
                            ? roles.find((role) => role.value === roleValue)?.label
                            : "Select role..."}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command>
                          <CommandInput placeholder="Search roles..." />
                          <CommandList>
                            <CommandEmpty>No role found.</CommandEmpty>
                            <CommandGroup>
                              {roles.map((role) => (
                                <CommandItem
                                  key={role.value}
                                  value={role.value}
                                  onSelect={(currentValue) => {
                                    setRoleValue(currentValue === roleValue ? "" : currentValue);
                                    setRoleOpen(false);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      roleValue === role.value ? "opacity-100" : "opacity-0"
                                    )}
                                  />
                                  {role.label}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Technology</label>
                    <Popover open={techOpen} onOpenChange={setTechOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={techOpen}
                          className="w-full justify-between"
                        >
                          {techValue
                            ? technologies.find((tech) => tech.value === techValue)?.label
                            : "Select technology..."}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command>
                          <CommandInput placeholder="Search technologies..." />
                          <CommandList>
                            <CommandEmpty>No technology found.</CommandEmpty>
                            <CommandGroup>
                              {technologies.map((tech) => (
                                <CommandItem
                                  key={tech.value}
                                  value={tech.value}
                                  onSelect={(currentValue) => {
                                    setTechValue(currentValue === techValue ? "" : currentValue);
                                    setTechOpen(false);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      techValue === tech.value ? "opacity-100" : "opacity-0"
                                    )}
                                  />
                                  {tech.label}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Location</label>
                    <Popover open={locationOpen} onOpenChange={setLocationOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={locationOpen}
                          className="w-full justify-between"
                        >
                          {locationValue
                            ? locations.find((location) => location.value === locationValue)?.label
                            : "Select location..."}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command>
                          <CommandInput placeholder="Search locations..." />
                          <CommandList>
                            <CommandEmpty>No location found.</CommandEmpty>
                            <CommandGroup>
                              {locations.map((location) => (
                                <CommandItem
                                  key={location.value}
                                  value={location.value}
                                  onSelect={(currentValue) => {
                                    setLocationValue(currentValue === locationValue ? "" : currentValue);
                                    setLocationOpen(false);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      locationValue === location.value ? "opacity-100" : "opacity-0"
                                    )}
                                  />
                                  {location.label}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Experience Level</label>
                    <Select value={experienceValue} onValueChange={setExperienceValue}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select experience level" />
                      </SelectTrigger>
                      <SelectContent>
                        {experienceLevels.map((level) => (
                          <SelectItem key={level.value} value={level.value}>
                            {level.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <Button 
                    onClick={() => setFilterModalOpen(false)}
                    className="mr-2"
                    variant="outline"
                  >
                    Cancel
                  </Button>
                  <Button onClick={() => setFilterModalOpen(false)}>
                    Apply Filters
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="max-w-5xl mx-auto p-6">
          <p className="text-muted-foreground mb-6">
            Found {candidates.length} candidates matching your criteria
          </p>
          
          {viewMode === "grid" ? (
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
            <div className="flex flex-col space-y-4">
              {candidates.map((candidate) => (
                <CandidateListItem 
                  key={candidate.id} 
                  candidate={candidate} 
                  onShortlist={handleShortlist} 
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default SearchResults;
