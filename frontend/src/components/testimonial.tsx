import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface TestimonialProps {
  content: string;
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
}

export function Testimonial({ content, author }: TestimonialProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-6 flex flex-col h-full">
      <blockquote className="text-foreground mb-6 flex-grow">
        <p className="relative text-lg">
          <span className="absolute -top-2 -left-2 text-brain text-4xl">"</span>
          <span className="block pl-5">{content}</span>
        </p>
      </blockquote>
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src={author.avatar} />
          <AvatarFallback>{author.name.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium">{author.name}</p>
          <p className="text-sm text-muted-foreground">{author.role}</p>
        </div>
      </div>
    </div>
  );
}
