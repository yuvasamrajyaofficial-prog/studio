import { CMSLayout } from "@/components/cms/cms-layout";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";

export default function VoiceCloningPage() {
  return (
    <CMSLayout>
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
        <div className="p-6 rounded-full bg-purple-500/10">
          <Users className="w-12 h-12 text-purple-500" />
        </div>
        <h1 className="text-3xl font-bold font-headline">Voice Cloning</h1>
        <p className="text-muted-foreground max-w-md">
          Create a digital twin of your voice to narrate scriptures in multiple languages while retaining your unique tone.
        </p>
        <Button variant="secondary">Request Access</Button>
      </div>
    </CMSLayout>
  );
}
