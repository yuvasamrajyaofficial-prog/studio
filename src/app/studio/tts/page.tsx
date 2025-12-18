import { CMSLayout } from "@/components/cms/cms-layout";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

export default function TTSPage() {
  return (
    <CMSLayout>
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
        <div className="p-6 rounded-full bg-blue-500/10">
          <MessageSquare className="w-12 h-12 text-blue-500" />
        </div>
        <h1 className="text-3xl font-bold font-headline">Text-to-Voice (Multilingual)</h1>
        <p className="text-muted-foreground max-w-md">
          Convert written scriptures into lifelike audio in over 50 languages using our specialized spiritual TTS models.
        </p>
        <Button>Try Demo</Button>
      </div>
    </CMSLayout>
  );
}
