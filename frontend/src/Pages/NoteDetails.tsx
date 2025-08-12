import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, User, Video, MessageSquare } from "lucide-react";
import { Button } from "../components/ui/button";
import { ThemeToggle } from "../components/themeToggle";
import { useBrainEntryDetail } from "../hooks/useBrainEntries";

export default function NoteDetails() {
   const { id } = useParams<{ id: string }>();

  // Use a custom hook to fetch the note details
  if (!id) {
    return <div className="text-red-500">Note ID is missing</div>;
  }
  const { data: noteData } = useBrainEntryDetail(id);
  // Mock data for demonstration
//   const noteData = {
//     id: parseInt(id || "1"),
//     title: "The Future of AI in Healthcare",
//     source: "YouTube", // Changed to demonstrate video content
//     date: "2025-04-15",
//     content: `Artificial Intelligence is revolutionizing healthcare through improved diagnostics and personalized treatment plans. The integration of AI technologies in healthcare settings has shown promising results in various areas:

// 1. Early Disease Detection
// - Advanced image recognition for radiology
// - Pattern recognition in patient data
// - Predictive analytics for patient risk assessment

// 2. Treatment Optimization
// - Personalized medicine approaches
// - Drug development acceleration
// - Treatment response prediction

// 3. Healthcare Operations
// - Automated administrative tasks
// - Resource allocation optimization
// - Patient flow management

// The future implications of these developments are far-reaching, potentially transforming how we approach healthcare delivery and patient care.`,
//     tags: ["AI", "Healthcare", "Technology", "Research"],
//     videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Example YouTube embed URL
//     linkedinPost: "https://www.linkedin.com/embed/feed/update/urn:li:share:7064583498010497024" // Example LinkedIn post embed
//   };

  // Helper function to render content based on source
  const renderContent = () => {
    if(!noteData)
        return null;
    switch (noteData.source) {
      case "YouTube":
        return (
          <div className="aspect-video w-full mb-8 rounded-lg overflow-hidden">
            <iframe
              className="w-full h-full"
              src={noteData.videoUrl}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        );
      case "LinkedIn":
        return (
          <div className="w-full mb-8 bg-card rounded-lg overflow-hidden min-h-[400px]">
            <iframe
              className="w-full h-full"
              src={noteData.linkedinPost}
              allowFullScreen
            ></iframe>
          </div>
        );
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto">
          <div className="flex h-14 items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Link to="/dashboard">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <ArrowLeft className="h-5 w-5" />
                  <span className="sr-only">Back</span>
                </Button>
              </Link>
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
        {noteData && (
          <article className="max-w-3xl mx-auto">
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="text-sm px-3 py-1 rounded-full bg-secondary text-secondary-foreground font-medium flex items-center gap-2">
                  {noteData.source === "YouTube" && <Video className="h-4 w-4" />}
                  {noteData.source === "LinkedIn" && <MessageSquare className="h-4 w-4" />}
                  {noteData.source}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  {noteData.date}
                </div>
              </div>
              
              <h1 className="text-4xl font-bold mb-4">{noteData.title}</h1>
              
              {/* <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                  <User className="h-4 w-4" />
                </div>
                <span className="text-muted-foreground">
                  By <span className="text-foreground font-medium">{noteData.author}</span>
                </span>
              </div> */}

              <div className="flex flex-wrap gap-2 mb-8">
                {noteData.tags.map((tag) => (
                  <div
                    key={tag}
                    className="text-sm px-3 py-1 rounded-full bg-muted text-muted-foreground font-medium"
                  >
                    {tag}
                  </div>
                ))}
              </div>
            </div>

            {renderContent()}

            <div className="prose prose-gray dark:prose-invert max-w-none">
              {noteData.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-4 text-muted-foreground leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </article>
        )}
      </main>
    </div>
  );
}
