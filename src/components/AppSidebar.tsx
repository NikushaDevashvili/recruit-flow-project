
import { useNavigate, useLocation } from "react-router-dom";
import { 
  Briefcase, 
  Search, 
  Users, 
  FolderHeart, 
  Settings, 
  PieChart,
  Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { NewProjectDialog } from "./NewProjectDialog";

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  href: string;
  isActive: boolean;
  onClick: () => void;
}

const SidebarItem = ({ icon: Icon, label, isActive, onClick }: SidebarItemProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-md w-full transition-colors",
        isActive 
          ? "bg-primary text-primary-foreground" 
          : "text-muted-foreground hover:bg-muted hover:text-foreground"
      )}
    >
      <Icon className="h-5 w-5" />
      <span>{label}</span>
    </button>
  );
};

export const AppSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isNewProjectOpen, setIsNewProjectOpen] = useState(false);

  const sidebarItems = [
    { icon: Briefcase, label: "Projects", href: "/dashboard" },
    { icon: Search, label: "Search", href: "/search" },
    { icon: FolderHeart, label: "Shortlist", href: "/shortlist" },
    { icon: Users, label: "Referrals", href: "/referrals" },
    { icon: PieChart, label: "Usage", href: "/usage" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ];

  return (
    <>
      <NewProjectDialog open={isNewProjectOpen} onOpenChange={setIsNewProjectOpen} />
      
      <div className="h-screen min-w-56 bg-white border-r p-4 flex flex-col">
        <div className="mb-6 flex justify-between items-center">
          <h2 className="font-bold text-xl">RecruiterBase</h2>
        </div>

        <Button 
          onClick={() => setIsNewProjectOpen(true)}
          className="mb-6 gap-2"
        >
          <Plus className="h-4 w-4" />
          New Project
        </Button>
        
        <nav className="space-y-1 flex-1">
          {sidebarItems.map((item) => (
            <SidebarItem
              key={item.href}
              icon={item.icon}
              label={item.label}
              href={item.href}
              isActive={location.pathname === item.href}
              onClick={() => navigate(item.href)}
            />
          ))}
        </nav>
        
        <div className="border-t pt-4 mt-auto">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-medium">
              JD
            </div>
            <div className="flex-1 truncate">
              <p className="text-sm font-medium">John Doe</p>
              <p className="text-xs text-muted-foreground truncate">john@example.com</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
