"use client";

import { CMSLayout } from "@/components/cms/cms-layout";
import { ScriptureForm } from "@/components/cms/scripture-form";
import { ChapterEditor } from "@/components/cms/chapter-editor";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function UploadPage() {
  const [step, setStep] = useState(1);
  const { toast } = useToast();

  const handleMetadataSubmit = (data: any) => {
    console.log("Metadata:", data);
    toast({
      title: "Metadata Saved",
      description: "Proceeding to add content.",
    });
    setStep(2);
  };

  return (
    <CMSLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h2 className="text-3xl font-bold font-headline">Upload Content</h2>
          <p className="text-muted-foreground">Add new scriptures to the library.</p>
        </div>

        {step === 1 && (
          <ScriptureForm onSubmit={handleMetadataSubmit} />
        )}

        {step === 2 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
            <ChapterEditor />
          </div>
        )}
      </div>
    </CMSLayout>
  );
}
