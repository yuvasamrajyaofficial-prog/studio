"use client";

import { BlogPost } from "@/lib/admin/blog-actions";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Edit2, Trash2, Eye, Calendar } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { formatDistanceToNow } from "date-fns";

interface BlogListProps {
  blogs: BlogPost[];
  onEdit: (blog: BlogPost) => void;
  onDelete: (id: string) => Promise<void>;
}

export function BlogList({ blogs, onEdit, onDelete }: BlogListProps) {
  
  const handleDelete = async (id: string) => {
      try {
          await onDelete(id);
          toast.success("Blog deleted successfully");
      } catch (error) {
          console.error("Failed to delete blog:", error);
          toast.error("Failed to delete blog");
      }
  };

  if (blogs.length === 0) {
      return (
          <div className="text-center py-12 border rounded-lg bg-muted/10">
              <p className="text-muted-foreground">No blog posts found. Create your first one!</p>
          </div>
      );
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {blogs.map((blog) => (
            <TableRow key={blog.id}>
              <TableCell className="font-medium">
                <div>{blog.title}</div>
                <div className="text-xs text-muted-foreground truncate max-w-[200px]">{blog.slug}</div>
              </TableCell>
              <TableCell>
                <Badge variant={blog.published ? "default" : "secondary"}>
                  {blog.published ? "Published" : "Draft"}
                </Badge>
              </TableCell>
              <TableCell>{blog.author}</TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {blog.createdAt?.seconds 
                  ? formatDistanceToNow(new Date(blog.createdAt.seconds * 1000), { addSuffix: true }) 
                  : "Just now"}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                   <Button variant="ghost" size="icon" asChild title="View">
                    <Link href={`/blogs/${blog.slug || blog.id}`} target="_blank">
                      <Eye className="w-4 h-4" />
                    </Link>
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => onEdit(blog)} title="Edit">
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive hover:bg-destructive/10">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete the blog post "{blog.title}".
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete(blog.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
