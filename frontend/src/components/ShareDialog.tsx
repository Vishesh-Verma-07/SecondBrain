
import { useState } from "react";
import { Copy, CheckCheck, Mail, Globe2, Lock, X } from "lucide-react";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../components/ui/radioGroup";
import { useToast } from "../hooks/useToast";

type ShareDialogProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  itemTitle: string;
  itemType: "note" | "collection";
};

export function ShareDialog({ isOpen, onOpenChange, itemTitle, itemType }: ShareDialogProps) {
  const [shareOption, setShareOption] = useState("link");
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const shareUrl = `https://secondbrain.app/share/${itemType}/${Date.now()}`;

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    toast({
      title: "Link copied!",
      description: "Share URL has been copied to your clipboard.",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const shareByEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    
    // In a real app, you would call an API to send the email
    console.log("Share with email:", email);
    
    toast({
      title: "Invite sent!",
      description: `An invitation to view "${itemTitle}" has been sent to ${email}`,
    });
    
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Share {itemType === "note" ? "Note" : "Collection"}</DialogTitle>
          <DialogDescription>
            Share "{itemTitle}" with others or make it public.
          </DialogDescription>
        </DialogHeader>
        
        <RadioGroup value={shareOption} onValueChange={setShareOption} className="my-4">
          <div className="flex items-center space-x-2 mb-4">
            <RadioGroupItem value="link" id="link" />
            <Label htmlFor="link" className="flex items-center cursor-pointer">
              <Globe2 className="h-4 w-4 mr-2 text-muted-foreground" />
              Share with link
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="email" id="email" />
            <Label htmlFor="email" className="flex items-center cursor-pointer">
              <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
              Share via email
            </Label>
          </div>
        </RadioGroup>
        
        {shareOption === "link" ? (
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Input value={shareUrl} readOnly className="flex-1" />
              <Button variant="outline" size="icon" onClick={copyLink}>
                {copied ? <CheckCheck className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            
            <div className="flex items-center text-sm text-muted-foreground">
              <Lock className="h-4 w-4 mr-2" />
              Only people with the link can access
            </div>
          </div>
        ) : (
          <form onSubmit={shareByEmail} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email-input">Email address</Label>
              <Input id="email-input" name="email" type="email" placeholder="name@example.com" required />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">Send Invite</Button>
            </DialogFooter>
          </form>
        )}
        
        {shareOption === "link" && (
          <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
            <Button onClick={copyLink}>
              {copied ? "Copied!" : "Copy Link"}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
