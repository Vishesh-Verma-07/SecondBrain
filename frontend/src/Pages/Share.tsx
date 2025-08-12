import { useState } from "react";
// import { useParams } from "react-router-dom";
import { Search, Filter, User } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/Card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/Button";
import { ThemeToggle } from "../components/themeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdownMenu";

export default function Share() {
//   const { id } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<"all" | "article" | "youtube" | "whatsapp">("all");

  // Mock data for demonstration
  const sharedBrain = {
    title: "AI Research Collection",
    owner: "Sarah Parker",
    entries: [
      {
        id: 1,
        title: "The Future of AI in Healthcare",
        source: "Article",
        date: "2025-04-15",
        excerpt: "AI is revolutionizing healthcare through improved diagnostics and personalized treatment plans...",
        tags: ["AI", "Healthcare"]
      },
      {
        id: 2,
        title: "Machine Learning Basics",
        source: "YouTube",
        date: "2025-04-12",
        excerpt: "Understanding the fundamentals of machine learning and its practical applications...",
        tags: ["ML", "Tutorial"]
      }
    ]
  };

  // Filter entries based on search query and filter type
  const filteredEntries = sharedBrain.entries.filter(entry => {
    const matchesSearch = !searchQuery || 
      entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesFilter = filterType === "all" || entry.source.toLowerCase() === filterType;
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto">
          <div className="flex h-14 items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 text-white font-bold">
                  SB
                </div>
                <span className="text-xl font-semibold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                  SecondBrain
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="h-5 w-5" />
                <span className="sr-only">Profile</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{sharedBrain.title}</h1>
          <p className="text-muted-foreground">
            Shared by <span className="font-medium text-foreground">{sharedBrain.owner}</span>
          </p>
        </div>

        <div className="flex items-center gap-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search in shared brain..." 
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="h-10 w-10">
                <Filter className="h-4 w-4" />
                <span className="sr-only">Filter notes</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => setFilterType("all")}>
                All sources
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterType("article")}>
                Articles
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterType("youtube")}>
                YouTube
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterType("whatsapp")}>
                WhatsApp
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredEntries.map((entry) => (
            <Card key={entry.id} className="flex flex-col transition-all hover:shadow-md">
              <CardHeader className="pb-3 space-y-3">
                <div className="flex justify-between items-center">
                  <div className="text-xs px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground font-medium">
                    {entry.source}
                  </div>
                  <time className="text-xs text-muted-foreground">
                    {entry.date}
                  </time>
                </div>
                <CardTitle className="line-clamp-2">{entry.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {entry.excerpt}
                </p>
              </CardContent>
              <CardFooter>
                <div className="flex flex-wrap gap-2">
                  {entry.tags.map((tag) => (
                    <div key={tag} className="text-xs px-2.5 py-0.5 rounded-full bg-muted text-muted-foreground font-medium">
                      {tag}
                    </div>
                  ))}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredEntries.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="rounded-full bg-muted p-3 mb-4">
              <Search className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium">No results found</h3>
            <p className="text-muted-foreground mt-2 max-w-md">
              We couldn't find any notes that match your search. Try adjusting your search terms or filters.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
