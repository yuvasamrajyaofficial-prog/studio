'use client';

import React, { useState } from 'react';
import { 
  Users, Search, Filter, MoreVertical, 
  Shield, ShieldAlert, ShieldCheck, Mail,
  Trash2, Edit, Eye, UserPlus
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from '@/components/ui/badge';

const MOCK_USERS = [
  { uid: '1', displayName: 'Prashant Hiremath', email: 'prashant@example.com', role: 'admin', karma: 1250, joined: '2023-10-01' },
  { uid: '2', displayName: 'Anjali Sharma', email: 'anjali@example.com', role: 'moderator', karma: 850, joined: '2023-10-15' },
  { uid: '3', displayName: 'Rahul Verma', email: 'rahul@example.com', role: 'user', karma: 420, joined: '2023-11-02' },
  { uid: '4', displayName: 'Sneha Patil', email: 'sneha@example.com', role: 'user', karma: 150, joined: '2023-11-10' },
  { uid: '5', displayName: 'Amit Singh', email: 'amit@example.com', role: 'user', karma: 280, joined: '2023-11-20' },
];

export default function UserManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<any>(null);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-3xl font-bold text-foreground">User Management</h2>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search users..." 
              className="pl-8 bg-muted/20 border-border/50 text-foreground"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <UserPlus className="w-4 h-4 mr-2" />
            Add User
          </Button>
        </div>
      </div>

      <Card className="bg-card/50 border-border/50 text-foreground">
        <Table>
          <TableHeader>
            <TableRow className="border-border/50 hover:bg-muted/20">
              <TableHead className="text-muted-foreground">User</TableHead>
              <TableHead className="text-muted-foreground">Role</TableHead>
              <TableHead className="text-muted-foreground">Karma</TableHead>
              <TableHead className="text-muted-foreground">Joined</TableHead>
              <TableHead className="text-right text-muted-foreground">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {MOCK_USERS.map((user) => (
              <TableRow key={user.uid} className="border-border/50 hover:bg-muted/20">
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium text-foreground">{user.displayName || 'Anonymous'}</span>
                    <span className="text-xs text-muted-foreground">{user.email}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={
                    user.role === 'admin' ? 'border-primary text-primary bg-primary/10' :
                    user.role === 'moderator' ? 'border-accent text-accent bg-accent/10' :
                    'border-muted-foreground text-muted-foreground'
                  }>
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {user.karma}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {user.joined}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-card border-border/50 text-foreground">
                      <DropdownMenuItem onClick={() => setSelectedUser(user)}>
                        <Eye className="w-4 h-4 mr-2" /> View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="w-4 h-4 mr-2" /> Edit Role
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Mail className="w-4 h-4 mr-2" /> Send Email
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="w-4 h-4 mr-2" /> Suspend User
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* User Detail Dialog */}
      <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
        <DialogContent className="bg-card border-border/50 text-foreground max-w-2xl">
          <DialogHeader>
            <DialogTitle>User Details: {selectedUser?.displayName}</DialogTitle>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-lg border-b border-border/50 pb-2">Cultural Context</h4>
                <div className="mt-2 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Religion:</span>
                    <span>Hinduism</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Country:</span>
                    <span>India</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Languages:</span>
                    <span>Sanskrit, Hindi, English</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-lg border-b border-border/50 pb-2">Soul ID</h4>
                <div className="mt-2 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Rashi:</span>
                    <span>Vrishabha (Taurus)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Nakshatra:</span>
                    <span>Rohini</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Dominant Guna:</span>
                    <span>Sattva</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Dosha:</span>
                    <span>Vata-Pitta</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-lg border-b border-border/50 pb-2">Activity Stats</h4>
                <div className="mt-2 grid grid-cols-2 gap-4">
                  <div className="p-3 rounded-lg bg-muted/20 text-center">
                    <div className="text-2xl font-bold">42</div>
                    <div className="text-[10px] text-muted-foreground uppercase">Meditations</div>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/20 text-center">
                    <div className="text-2xl font-bold">156</div>
                    <div className="text-[10px] text-muted-foreground uppercase">Scripture Reads</div>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/20 text-center">
                    <div className="text-2xl font-bold">12</div>
                    <div className="text-[10px] text-muted-foreground uppercase">Soul Circles</div>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/20 text-center">
                    <div className="text-2xl font-bold">850</div>
                    <div className="text-[10px] text-muted-foreground uppercase">Karma Points</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
