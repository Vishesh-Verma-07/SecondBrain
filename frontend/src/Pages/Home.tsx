import { Button } from "../components/ui/button";
import { ThemeProvider } from "../components/ui/themeProvider";
import { Navbar } from "../components/navbar";
import { FeatureCard } from "../components/ui/featureCard";
import { Testimonial } from "../components/testimonial";
import { Footer } from "../components/footer";


import { 
  ArrowRight, 
  Brain, 
  Search, 
  Youtube, 
  Linkedin, 
  MessageCircle, 
  SaveAll, 
  BookOpen,
  Layers
} from "lucide-react";

const Home = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        {/* Hero Section */}
        <section className="pt-28 md:pt-32 pb-16 md:pb-24">
          <div className="w-full mx-auto px-8 max-w-[1400px]">
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
              <div className="flex-1 text-center md:text-left animate-fade-in">
                <div className="inline-block bg-brain/10 dark:bg-brain/20 text-brain px-4 py-1 rounded-full text-sm font-medium mb-6">
                  Think better, together
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                  Your Mind, But <span className="text-brain">Searchable</span>.
                </h1>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto md:mx-0">
                  Save your thoughts, ideas, and discoveries from LinkedIn, YouTube, WhatsApp, and more – all in one searchable digital brain.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <Button size="lg" className="bg-brain hover:bg-brain-dark text-white">
                    Start Saving Now <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button size="lg" variant="outline">
                    See How It Works
                  </Button>
                </div>
              </div>
              
              <div className="flex-1 relative animate-fade-in delay-200">
                <div className="relative w-full aspect-square max-w-md mx-auto">
                  <div className="absolute inset-0 bg-gradient-to-r from-brain/30 to-brain-light/30 rounded-full blur-3xl opacity-30"></div>
                  <div className="relative z-10 bg-card border border-border rounded-lg shadow-xl overflow-hidden h-full animate-float">
                    <div className="bg-muted/50 border-b border-border p-3 flex items-center">
                      <div className="flex space-x-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      </div>
                    </div>
                    <div className="p-4 space-y-3">
                      <div className="flex items-center gap-2 mb-2">
                        <Search className="h-4 w-4 text-muted-foreground" />
                        <div className="h-8 bg-muted rounded w-full"></div>
                      </div>
                      <div className="space-y-3">
                        <div className="bg-muted p-3 rounded-md">
                          <div className="flex items-center gap-2 mb-2">
                            <Youtube className="h-4 w-4 text-red-500" />
                            <div className="h-4 bg-muted-foreground/30 rounded w-3/4"></div>
                          </div>
                          <div className="h-3 bg-muted-foreground/20 rounded w-full mb-1"></div>
                          <div className="h-3 bg-muted-foreground/20 rounded w-2/3"></div>
                        </div>
                        
                        <div className="bg-muted p-3 rounded-md">
                          <div className="flex items-center gap-2 mb-2">
                            <Linkedin className="h-4 w-4 text-blue-500" />
                            <div className="h-4 bg-muted-foreground/30 rounded w-1/2"></div>
                          </div>
                          <div className="h-3 bg-muted-foreground/20 rounded w-full mb-1"></div>
                          <div className="h-3 bg-muted-foreground/20 rounded w-4/5"></div>
                        </div>
                        
                        <div className="bg-muted p-3 rounded-md">
                          <div className="flex items-center gap-2 mb-2">
                            <MessageCircle className="h-4 w-4 text-green-500" />
                            <div className="h-4 bg-muted-foreground/30 rounded w-2/3"></div>
                          </div>
                          <div className="h-3 bg-muted-foreground/20 rounded w-full mb-1"></div>
                          <div className="h-3 bg-muted-foreground/20 rounded w-3/4"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section id="features" className="py-16 md:py-24 bg-muted/30">
          <div className="w-full mx-auto px-8 max-w-[1400px]">
            <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Your Digital Brain Just Got Smarter</h2>
              <p className="text-lg text-muted-foreground">
                Capture and connect ideas effortlessly across all your favorite platforms
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard
                icon={SaveAll}
                title="Save Content From Anywhere"
                description="Capture articles, videos, tweets, and conversations from anywhere on the web with our powerful browser extension."
                className="animate-fade-in delay-100"
              />
              
              <FeatureCard
                icon={Layers}
                title="Organize Your Ideas"
                description="Automatically categorize your saved content with AI-powered tags and custom collections for easy retrieval."
                className="animate-fade-in delay-200"
              />
              
              <FeatureCard
                icon={Search}
                title="Smart Search"
                description="Find exactly what you're looking for with powerful semantic search that understands the context of your notes."
                className="animate-fade-in delay-300"
              />
            </div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section id="how-it-works" className="py-16 md:py-24">
          <div className="w-full mx-auto px-8 max-w-[1400px]">
            <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How SecondBrain Works</h2>
              <p className="text-lg text-muted-foreground">
                Building your digital brain is easier than you think
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div className="order-2 md:order-1 animate-fade-in">
                <div className="space-y-8">
                  <div className="flex gap-4">
                    <div className="h-8 w-8 rounded-full bg-brain text-white flex items-center justify-center font-medium">1</div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Connect Your Sources</h3>
                      <p className="text-muted-foreground">
                        Link SecondBrain to all your favorite platforms like LinkedIn, YouTube, WhatsApp, and more.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="h-8 w-8 rounded-full bg-brain text-white flex items-center justify-center font-medium">2</div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Capture Ideas</h3>
                      <p className="text-muted-foreground">
                        Save anything interesting with one click using our browser extension or mobile app.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="h-8 w-8 rounded-full bg-brain text-white flex items-center justify-center font-medium">3</div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Search & Discover</h3>
                      <p className="text-muted-foreground">
                        Find exactly what you need with powerful search and discovery features.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative order-1 md:order-2 animate-fade-in delay-200">
                <div className="absolute inset-0 bg-gradient-to-br from-brain/20 to-brain-light/20 rounded-full blur-3xl opacity-30"></div>
                <div className="relative z-10">
                  <div className="bg-card border border-border rounded-lg shadow-lg p-6 md:p-8 max-w-md mx-auto">
                    <div className="flex justify-between items-center mb-6">
                      <div className="flex items-center gap-2">
                        <Brain className="h-6 w-6 text-brain" />
                        <span className="font-semibold">My Second Brain</span>
                      </div>
                      <div className="bg-muted rounded-md px-2 py-1 text-xs text-muted-foreground">Connected</div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="p-4 border border-border rounded-md bg-background">
                        <div className="flex items-start gap-3">
                          <BookOpen className="h-5 w-5 text-orange-500 mt-1" />
                          <div>
                            <h4 className="font-medium">How to Build a Second Brain</h4>
                            <p className="text-sm text-muted-foreground">A proven method to organize your digital life and unlock your creative potential.</p>
                            <div className="flex gap-2 mt-2">
                              <div className="bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 px-2 py-1 rounded text-xs">Book Notes</div>
                              <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-1 rounded text-xs">Productivity</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4 border border-border rounded-md bg-background">
                        <div className="flex items-start gap-3">
                          <Youtube className="h-5 w-5 text-red-500 mt-1" />
                          <div>
                            <h4 className="font-medium">The PARA Method: A Universal System</h4>
                            <p className="text-sm text-muted-foreground">How to organize your digital information across all platforms.</p>
                            <div className="flex gap-2 mt-2">
                              <div className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-2 py-1 rounded text-xs">YouTube</div>
                              <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 px-2 py-1 rounded text-xs">Organization</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section id="testimonials" className="py-16 md:py-24 bg-muted/30">
          <div className="w-full mx-auto px-8 max-w-[1400px]">
            <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
              <p className="text-lg text-muted-foreground">
                Join thousands of knowledge workers who are supercharging their productivity
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Testimonial 
                content="SecondBrain has completely transformed how I collect and find information. It's like having my own personal knowledge assistant."
                author={{
                  name: "Alex Martin",
                  role: "Product Designer",
                  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                }}
              />
              
              <Testimonial 
                content="As a researcher, I'm constantly jumping between papers, videos and articles. SecondBrain helps me keep everything organized and easily searchable."
                author={{
                  name: "Sarah Johnson",
                  role: "Academic Researcher",
                  avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                }}
              />
              
              <Testimonial 
                content="I've tried dozens of note-taking apps, but nothing compares to how SecondBrain connects ideas from different sources. It's genuinely changed how I work."
                author={{
                  name: "David Chen",
                  role: "Content Creator",
                  avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                }}
              />
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 md:py-24">
          <div className="w-full mx-auto px-8 max-w-[1400px]">
            <div className="bg-gradient-to-r from-brain/80 to-brain-dark rounded-2xl p-8 md:p-12 text-white text-center">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Build Your Second Brain?</h2>
                <p className="text-lg opacity-90 mb-8">
                  Start saving and organizing your digital knowledge today. No more lost ideas or forgotten inspiration.
                </p>
                <Button size="lg" variant="outline" className="bg-white text-brain hover:bg-white/90 border-white">
                  Start Saving Now <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Home;