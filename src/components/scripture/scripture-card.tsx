import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Scripture } from "@/types/scripture";
import { BookOpen, MapPin, Clock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface ScriptureCardProps {
  scripture: Scripture;
}

export function ScriptureCard({ scripture }: ScriptureCardProps) {
  return (
    <Card className="overflow-hidden flex flex-col h-full hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 w-full bg-muted">
        {scripture.coverImageUrl ? (
          <Image
            src={scripture.coverImageUrl}
            alt={scripture.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-primary/10 text-primary">
            <BookOpen className="h-12 w-12" />
          </div>
        )}
        <div className="absolute top-2 right-2">
          <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
            {scripture.language}
          </Badge>
        </div>
      </div>
      
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl font-headline line-clamp-1">{scripture.title}</CardTitle>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
          <span className="flex items-center gap-1">
            <MapPin className="h-3 w-3" /> {scripture.region}
          </span>
          {scripture.era && (
            <span className="flex items-center gap-1 border-l pl-2 ml-1">
              <Clock className="h-3 w-3" /> {scripture.era.replace('_', ' ')}
            </span>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="flex-1">
        <p className="text-sm text-muted-foreground line-clamp-3">
          {scripture.description}
        </p>
        <div className="flex flex-wrap gap-1 mt-3">
          {scripture.tags.slice(0, 3).map(tag => (
            <Badge key={tag} variant="outline" className="text-xs font-normal">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="pt-0">
        <Button asChild className="w-full">
          <Link href={`/scriptures/${scripture.id}`}>
            Read Now
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
