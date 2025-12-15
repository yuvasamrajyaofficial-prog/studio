"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { orderedCategories } from "@/lib/scriptures";
import { Loader2 } from "lucide-react";

interface ScriptureFormProps {
  onSubmit: (data: any) => void;
  isLoading?: boolean;
}

export function ScriptureForm({ onSubmit, isLoading = false }: ScriptureFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
    yuga: "",
    language: "",
    region: "",
    description: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Scripture Metadata</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input 
                id="title" 
                placeholder="e.g. Bhagavad Gita" 
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="author">Author / Sage</Label>
              <Input 
                id="author" 
                placeholder="e.g. Vyasa" 
                value={formData.author}
                onChange={(e) => handleChange("author", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select onValueChange={(val) => handleChange("category", val)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  {orderedCategories.map((cat) => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="yuga">Yuga (Era)</Label>
              <Select onValueChange={(val) => handleChange("yuga", val)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Era" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Satya">Satya Yuga</SelectItem>
                  <SelectItem value="Treta">Treta Yuga</SelectItem>
                  <SelectItem value="Dvapara">Dvapara Yuga</SelectItem>
                  <SelectItem value="Kali">Kali Yuga</SelectItem>
                  <SelectItem value="Timeless">Timeless</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="language">Original Language</Label>
              <Input 
                id="language" 
                placeholder="e.g. Sanskrit" 
                value={formData.language}
                onChange={(e) => handleChange("language", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="region">Region of Origin</Label>
              <Input 
                id="region" 
                placeholder="e.g. India" 
                value={formData.region}
                onChange={(e) => handleChange("region", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              placeholder="Brief summary of the scripture..." 
              className="min-h-[100px]"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </div>

          <div className="flex justify-end">
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Metadata
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
