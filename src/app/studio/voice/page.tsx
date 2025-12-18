import { CMSLayout } from "@/components/cms/cms-layout";
import { Button } from "@/components/ui/button";
import { Mic } from "lucide-react";

export default function VoiceStudioPage() {
  return (
    <CMSLayout>
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
        <div className="p-6 rounded-full bg-primary/10">
          <Mic className="w-12 h-12 text-primary" />
        </div>
        <h1 className="text-3xl font-bold font-headline">AI Voice Studio</h1>
        <p className="text-muted-foreground max-w-md">
          Record, edit, and enhance your spiritual discourses with our advanced AI tools. Coming soon.
        </p>
        <Button>Join Waitlist</Button>
      </div>
    </CMSLayout>
  );
}
