import { ThemeToggle } from "./themeToggle";
import { Link } from "react-router-dom";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  footerText: string;
  footerLinkText: string;
  footerLinkHref: string;
}

export function AuthLayout({
  children,
  title,
  subtitle,
  footerText,
  footerLinkText,
  footerLinkHref,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header with logo and theme toggle */}
      <header className="w-full p-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-brain text-white font-bold">B</div>
          <span className="text-xl font-semibold">SecondBrain</span>
        </Link>
        <ThemeToggle />
      </header>
      
      {/* Main content */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6">
          {/* Auth form header */}
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold">{title}</h1>
            <p className="text-muted-foreground">{subtitle}</p>
          </div>
          
          {/* Auth form content */}
          {children}
          
          {/* Auth form footer */}
          <div className="text-center text-sm">
            <p className="text-muted-foreground">
              {footerText}{" "}
              <Link to={footerLinkHref} className="text-primary hover:underline font-medium">
                {footerLinkText}
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
