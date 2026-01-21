"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Share2, Link as LinkIcon, Twitter, Facebook, MessageCircle, Check } from "lucide-react";
import { toast } from "sonner";

interface ShareButtonProps {
  title: string;
  text?: string;
  url?: string;
  hashtags?: string[];
  className?: string;
}

export function ShareButton({ title, text, url, hashtags, className }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);
  
  const shareUrl = url || (typeof window !== "undefined" ? window.location.href : "");
  const shareText = text || title;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error("Failed to copy link");
    }
  };

  const handleTwitterShare = () => {
    const twitterUrl = new URL("https://twitter.com/intent/tweet");
    twitterUrl.searchParams.append("text", shareText);
    twitterUrl.searchParams.append("url", shareUrl);
    if (hashtags && hashtags.length > 0) {
      twitterUrl.searchParams.append("hashtags", hashtags.join(","));
    }
    window.open(twitterUrl.toString(), "_blank", "width=600,height=400");
  };

  const handleFacebookShare = () => {
    const facebookUrl = new URL("https://www.facebook.com/sharer/sharer.php");
    facebookUrl.searchParams.append("u", shareUrl);
    window.open(facebookUrl.toString(), "_blank", "width=600,height=400");
  };

  const handleWhatsAppShare = () => {
    const whatsappUrl = new URL("https://wa.me/");
    whatsappUrl.searchParams.append("text", `${shareText} ${shareUrl}`);
    window.open(whatsappUrl.toString(), "_blank");
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: shareText,
          url: shareUrl,
        });
      } catch (error) {
        // User cancelled or share failed
        console.log("Share cancelled");
      }
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className={className}>
          <Share2 className="w-4 h-4 mr-2" />
          Share
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={handleCopyLink} className="gap-2">
          {copied ? (
            <>
              <Check className="w-4 h-4 text-green-500" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <LinkIcon className="w-4 h-4" />
              <span>Copy Link</span>
            </>
          )}
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={handleTwitterShare} className="gap-2">
          <Twitter className="w-4 h-4 text-[#1DA1F2]" />
          <span>Share on Twitter</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={handleFacebookShare} className="gap-2">
          <Facebook className="w-4 h-4 text-[#1877F2]" />
          <span>Share on Facebook</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={handleWhatsAppShare} className="gap-2">
          <MessageCircle className="w-4 h-4 text-[#25D366]" />
          <span>Share on WhatsApp</span>
        </DropdownMenuItem>

        {typeof navigator !== "undefined" && navigator.share && (
          <DropdownMenuItem onClick={handleNativeShare} className="gap-2">
            <Share2 className="w-4 h-4" />
            <span>More Options...</span>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
