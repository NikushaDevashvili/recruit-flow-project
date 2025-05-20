
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppSidebar } from "@/components/AppSidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Check, ChevronsUpDown, Search as SearchIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// Sample data for filters
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

const Search = () => {
  const navigate = useNavigate();
  const [roleOpen, setRoleOpen] = useState(false);
  const [techOpen, setTechOpen] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);
  const [roleValue, setRoleValue] = useState("");
  const [techValue, setTechValue] = useState("");
  const [locationValue, setLocationValue] = useState("");
  const [experienceValue, setExperienceValue] = useState("");
  const [keywords, setKeywords] = useState("");
  
  const handleSearch = () => {
    navigate("/search/results");
  };

  return (
    <div className="flex h-screen bg-secondary/30">
      <AppSidebar />
      
      <main className="flex-1 overflow-auto">
        <div className="h-full flex items-center justify-center p-6">
          <Card className="w-full max-w-3xl shadow-lg">
            <CardContent className="p-6">
              <h1 className="text-2xl font-bold text-center mb-6">Find the perfect candidate</h1>
              
              <div className="space-y-4">
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
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Keywords</label>
                  <Input
                    placeholder="Enter keywords (e.g., specific skills, requirements)"
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                  />
                </div>
                
                <Button 
                  onClick={handleSearch} 
                  className="w-full mt-6"
                  size="lg"
                >
                  <SearchIcon className="mr-2 h-4 w-4" />
                  Find Candidates
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Search;
