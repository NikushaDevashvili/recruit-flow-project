
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FolderHeart, FileText, Star } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Table, TableRow, TableCell } from "@/components/ui/table";

interface CandidateListItemProps {
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

export const CandidateListItem = ({ candidate, onShortlist }: CandidateListItemProps) => {
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
    <Card className="w-full overflow-hidden hover:shadow-md transition-all">
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="flex-grow">
            <div className="flex items-start justify-between mb-1">
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
            </div>
            
            <div className="mb-3">
              <p 
                className="text-sm line-clamp-2" 
                dangerouslySetInnerHTML={{ __html: highlightText(candidate.summary) }} 
              />
            </div>
            
            <Table className="w-full text-sm">
              <TableRow className="border-0">
                <TableCell className="py-1 pl-0 pr-2 font-medium w-24">Education:</TableCell>
                <TableCell className="py-1 pl-0">{candidate.education}</TableCell>
              </TableRow>
            </Table>
            
            <div className="flex flex-wrap gap-1.5 mt-2 mb-4">
              {candidate.skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="px-2 py-0.5 text-xs">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="flex flex-row sm:flex-col gap-2 sm:ml-4 sm:min-w-[120px]">
            <Button 
              variant={candidate.isShortlisted ? "secondary" : "default"}
              size="sm"
              className="gap-1 flex-1 sm:w-full"
              onClick={() => onShortlist(candidate.id)}
            >
              <FolderHeart className="h-4 w-4" />
              {candidate.isShortlisted ? "Shortlisted" : "Shortlist"}
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1 flex-1 sm:w-full">
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
        </div>
      </CardContent>
    </Card>
  );
};
