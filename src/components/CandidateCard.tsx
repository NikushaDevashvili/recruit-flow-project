
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FolderHeart, FileText, Star } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

interface CandidateCardProps {
  candidate: {
    id: number;
    name: string;
    title: string;
    company: string;
    location: string;
    summary: string;
    experience: number;
    education: string;
    skills: string[];
    isShortlisted?: boolean;
  };
  onShortlist: (id: number) => void;
}

export const CandidateCard = ({ candidate, onShortlist }: CandidateCardProps) => {
  // Function to highlight keywords in the summary
  const highlightText = (text: string) => {
    // This is a simple example - in a real app, you'd use the actual search keywords
    const keywords = ['experience', 'developed', 'led', 'product', 'teams', 'React', 'TypeScript'];
    
    let highlightedText = text;
    
    keywords.forEach(keyword => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
      highlightedText = highlightedText.replace(regex, match => `<span class="font-semibold text-primary">${match}</span>`);
    });
    
    return highlightedText;
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="pb-2 flex flex-row justify-between items-start">
        <div>
          <h3 className="text-lg font-bold">{candidate.name}</h3>
          <p className="text-sm text-muted-foreground">
            {candidate.title} at {candidate.company}
          </p>
          <p className="text-xs text-muted-foreground">
            {candidate.location} • {candidate.experience} years experience
          </p>
        </div>
        {candidate.isShortlisted && (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
            <Star className="h-3 w-3 mr-1 fill-amber-500 text-amber-500" />
            Shortlisted
          </Badge>
        )}
      </CardHeader>
      
      <CardContent className="space-y-3">
        <p 
          className="text-sm line-clamp-3" 
          dangerouslySetInnerHTML={{ __html: highlightText(candidate.summary) }} 
        />
        
        <div className="text-xs text-muted-foreground">
          <span className="font-medium">Education:</span> {candidate.education}
        </div>
        
        <div className="flex flex-wrap gap-1.5">
          {candidate.skills.map((skill) => (
            <Badge key={skill} variant="secondary" className="px-2 py-0.5 text-xs">
              {skill}
            </Badge>
          ))}
        </div>
        
        <div className="flex justify-between pt-2">
          <Button 
            variant={candidate.isShortlisted ? "secondary" : "default"}
            size="sm"
            className="gap-1"
            onClick={() => onShortlist(candidate.id)}
          >
            <FolderHeart className="h-4 w-4" />
            {candidate.isShortlisted ? "Shortlisted" : "Shortlist"}
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1">
                <FileText className="h-4 w-4" />
                Summarize
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuItem>Work History</DropdownMenuItem>
              <DropdownMenuItem>Skills Analysis</DropdownMenuItem>
              <DropdownMenuItem>Cultural Fit</DropdownMenuItem>
              <DropdownMenuItem>View Full Profile</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
};
