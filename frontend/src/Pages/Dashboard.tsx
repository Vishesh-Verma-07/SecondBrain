
import {useState } from "react";
import { Search, Share, Filter, Trash, Edit } from "lucide-react";
import { Link } from "react-router-dom";

import { Input } from "../components/ui/input";
import {Button} from "../components/ui/Button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "../components/ui/sidebar";
import { ThemeToggle } from "../components/themeToggle";
import { NewNoteDialog } from "../components/NewNoteDialog";
import { NewCollectionDialog } from "../components/NewCollectionDialog";
import { ShareDialog } from "../components/ShareDialog";
import { useBrainEntries, useDeleteBrainEntry } from "../hooks/useBrainEntries";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alertDiaglog";
import { toast } from "@/hooks/useToast";


export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [currentShareItem, setCurrentShareItem] = useState({ title: "", type: "note" as "note" | "collection" });
  const [sidebar, setSidebar]  = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState<string | null>(null);

  
  const {data: brainEntries = [], isLoading} = useBrainEntries();
  const deleteMutation = useDeleteBrainEntry();

  // if (isLoading) return <p>Loading entries...</p>;
  // if (isError) return <p>Error: {error.message}</p>;


  // Mock data for demonstration
  // const brainEntries = [
  //   {
  //     id: 1,
  //     title: "Why AI is revolutionizing note-taking",
  //     source: "LinkedIn",
  //     date: "2025-04-10",
  //     excerpt: "The integration of AI in note-taking apps is changing how we capture and organize information...",
  //     tags: ["AI", "Productivity"]
  //   },
  //   {
  //     id: 2,
  //     title: "The future of remote work",
  //     source: "YouTube",
  //     date: "2025-04-08",
  //     excerpt: "Remote work has become the new normal for many industries, but what does the future hold?",
  //     tags: ["Work", "Trends"]
  //   },
  //   {
  //     id: 3,
  //     title: "Daily habits of successful entrepreneurs",
  //     source: "WhatsApp",
  //     date: "2025-04-05",
  //     excerpt: "Most successful entrepreneurs share common daily habits that contribute to their productivity...",
  //     tags: ["Success", "Habits"]
  //   },
  //   {
  //     id: 4,
  //     title: "How to implement spaced repetition in learning",
  //     source: "Article",
  //     date: "2025-04-01",
  //     excerpt: "Spaced repetition is a learning technique that incorporates increasing intervals of time between review...",
  //     tags: ["Learning", "Memory"]
  //   }
  // ];

  // Filter entries based on search query
  const filteredEntries = searchQuery 
    ? brainEntries.filter(entry => 
        entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.tags.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : brainEntries;

  const openShareDialog = (title: string, type: "note" | "collection") => {
    setCurrentShareItem({ title, type });
    setShareDialogOpen(true);
  };

  const handleDeleteClick = (e: React.MouseEvent, noteId: string) => {
    e.preventDefault();
    setNoteToDelete(noteId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (noteToDelete) {
      console.log("Deleting note with ID:", noteToDelete);

      deleteMutation.mutate(noteToDelete, {
        onSuccess: () => {
          setNoteToDelete(null);
          setDeleteDialogOpen(false);
           toast({
            title: "Success",
            description: "You have been signed in successfully",
          });
        },
        onError: (error: any) => {
          console.error("Delete failed:", error.message);
          toast({
            title: "Error",
             description: error?.response?.data?.message || error.message || "Failed to delete note",
            variant: "destructive",
          });
        },
      });
    }
  };

  const openSidebar = ()=>{
    setSidebar((prev)=> !prev)
    console.log(sidebar)
  }

  return (
    <SidebarProvider className="">
      <div className="flex min-h-screen bg-background w-full">
        {/* Sidebar */}
        <Sidebar className={`transition-all duration-300   `} >
          <SidebarHeader>
            <div className="flex items-center gap-2 px-4 py-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-600 text-white font-bold">SB</div>
              <span className="text-xl font-semibold">SecondBrain</span>
            </div>
          </SidebarHeader>
          
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Collections</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="All Notes" isActive={true}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M14 3v4a1 1 0 0 0 1 1h4"/><path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z"/><line x1="9" y1="9" x2="10" y2="9"/><line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="15" y2="17"/></svg>
                      <span>All Notes</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="LinkedIn">
                      <div className="h-5 w-5 flex items-center justify-center">Li</div>
                      <span>LinkedIn</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="YouTube">
                      <div className="h-5 w-5 flex items-center justify-center">YT</div>
                      <span>YouTube</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="WhatsApp">
                      <div className="h-5 w-5 flex items-center justify-center">WA</div>
                      <span>WhatsApp</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            
            <SidebarGroup>
              <SidebarGroupLabel>Tags</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                      <span>AI</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <span className="w-2 h-2 rounded-full bg-green-500"></span>
                      <span>Productivity</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                      <span>Learning</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          
          <SidebarFooter className="p-4 border-t">
            <NewCollectionDialog />
          </SidebarFooter>
        </Sidebar>

        <div className={`border-amber-200 transition-all duration-500 ${sidebar == true ? 'w-52 ' : "w-0" }`}>
          <div> </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col ">
          {/* Header */}
          <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur-sm p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <SidebarTrigger  onClick={openSidebar}/>
                <div className="relative w-full max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search your brain..." 
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
                <NewNoteDialog />
                <ThemeToggle />
                <Link to="/profile">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium">U</div>
                </Link>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-6">
            <div className="mb-6">
              <h1 className="text-2xl font-bold">Your Brain</h1>
              <p className="text-muted-foreground">Explore your saved ideas and notes</p>
            </div>

            {/* Brain entries */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredEntries.map((entry) => (
                <Link to={`/note/${entry.id}`}>
                  <Card key={entry.id} className="transition-all hover:shadow-md">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between">
                        <div className="text-xs px-2 py-1 rounded bg-muted inline-flex items-center">
                          {entry.source}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {entry.date}
                        </div>
                      </div>
                      <CardTitle className="mt-2">{entry.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-3">{entry.excerpt}</p>
                    </CardContent>
                    <CardFooter className="flex justify-between pt-0">
                      <div className="flex gap-2">
                        {entry.tags.map((tag: string) => (
                          <div key={tag} className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">
                            {tag}
                          </div>
                        ))}
                      </div>
                      <div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          title="Edit" 
                          onClick={(e) => {
                                e.preventDefault();
                                openShareDialog(entry.title, "note");
                              }
                            }
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          title="Share" 
                          onClick={(e) => {
                                e.preventDefault();
                                openShareDialog(entry.title, "note");
                              }
                            }
                        >
                          <Share className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="icon" 
                          title="Delete" 
                          // className="text-red-400/85"
                          onClick={(e) => {
                                e.preventDefault();
                                handleDeleteClick(e, entry.id.toString());
                              }
                            }
                        >
                          <Trash className="h-4 w-4" />
                        </Button>

                      </div>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>

            {filteredEntries.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="rounded-full bg-muted p-3 mb-4">
                  <Search className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium">No results found</h3>
                <p className="text-muted-foreground mt-2 mb-6 max-w-md">
                  We couldn't find any notes that match your search. Try adjusting your search terms.
                </p>
                <Button onClick={() => setSearchQuery("")} variant="outline">Clear Search</Button>
              </div>
            )}
          </main>
        </div>
      </div>
      
      {/* Share Dialog */}
      <ShareDialog 
        isOpen={shareDialogOpen}
        onOpenChange={setShareDialogOpen}
        itemTitle={currentShareItem.title}
        itemType={currentShareItem.type}
      />

       <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your note.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </SidebarProvider>
  );
}
