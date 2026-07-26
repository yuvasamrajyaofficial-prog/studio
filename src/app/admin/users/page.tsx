'use client';

import React, { useEffect, useState } from 'react';
import { 
  Users, Search, Filter, MoreVertical, 
  Shield, ShieldAlert, ShieldCheck, Mail,
  Trash2, Edit, Eye, UserPlus, Loader2
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
} from "@/components/ui/dialog";
import { Badge } from '@/components/ui/badge';
import { getAllUsers, updateUserRole, updateUserStatus } from '@/lib/admin/user-actions';
import { UserProfile } from '@/types/user';
import { useToast } from '@/hooks/use-toast';

export default function UserManagement() {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (error) {
      console.error('Failed to load users:', error);
      toast({ title: 'Error', description: 'Failed to load user list.', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (uid: string, newRole: 'user' | 'moderator' | 'admin') => {
    try {
      await updateUserRole(uid, newRole);
      toast({ title: 'Role Updated', description: `User role changed to ${newRole}.` });
      setUsers(prev => prev.map(u => u.uid === uid ? { ...u, role: newRole } : u));
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to update user role.', variant: 'destructive' });
    }
  };

  const handleStatusToggle = async (uid: string, currentStatus?: string) => {
    const nextStatus = currentStatus === 'suspended' ? 'active' : 'suspended';
    if (!confirm(`Are you sure you want to set status to ${nextStatus}?`)) return;

    try {
      await updateUserStatus(uid, nextStatus);
      toast({ title: 'Status Updated', description: `User account set to ${nextStatus}.` });
      setUsers(prev => prev.map(u => u.uid === uid ? { ...u, status: nextStatus as any } : u));
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to update user status.', variant: 'destructive' });
    }
  };

  const filteredUsers = users.filter(user => {
    const nameStr = user.displayName || '';
    const emailStr = user.email || '';
    const query = searchQuery.toLowerCase();
    return nameStr.toLowerCase().includes(query) || emailStr.toLowerCase().includes(query);
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-foreground">User Management</h2>
          <p className="text-muted-foreground">Manage user accounts, roles, karma, and soul profiles</p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search users..." 
              className="pl-9 bg-muted/20 border-border/50 text-foreground w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <Card className="bg-card/50 border-border/50 text-foreground overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
            <p className="text-sm text-muted-foreground">Loading users from Firestore...</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="border-border/50 hover:bg-muted/20">
                <TableHead className="text-muted-foreground">User</TableHead>
                <TableHead className="text-muted-foreground">Role</TableHead>
                <TableHead className="text-muted-foreground">Karma</TableHead>
                <TableHead className="text-muted-foreground">Status</TableHead>
                <TableHead className="text-right text-muted-foreground">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.uid} className="border-border/50 hover:bg-muted/20">
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium text-foreground">{user.displayName || 'Anonymous Seeker'}</span>
                      <span className="text-xs text-muted-foreground">{user.email || user.uid}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={
                      user.role === 'admin' ? 'border-primary text-primary bg-primary/10' :
                      user.role === 'moderator' ? 'border-accent text-accent bg-accent/10' :
                      'border-muted-foreground text-muted-foreground'
                    }>
                      {user.role || 'user'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground font-mono">
                    {user.karma || 0}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={
                      (user as any).status === 'suspended' 
                        ? 'border-red-500/30 text-red-500 bg-red-500/10' 
                        : 'border-green-500/30 text-green-500 bg-green-500/10'
                    }>
                      {(user as any).status || 'active'}
                    </Badge>
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
                        <DropdownMenuItem onClick={() => handleRoleChange(user.uid, user.role === 'admin' ? 'user' : 'admin')}>
                          <Shield className="w-4 h-4 mr-2" /> 
                          Make {user.role === 'admin' ? 'Regular User' : 'Admin'}
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleStatusToggle(user.uid, (user as any).status)} 
                          className="text-destructive"
                        >
                          <Trash2 className="w-4 h-4 mr-2" /> 
                          {(user as any).status === 'suspended' ? 'Reactivate User' : 'Suspend User'}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>

      {!loading && filteredUsers.length === 0 && (
        <div className="text-center py-16 bg-muted/10 rounded-xl border border-dashed border-border/40">
          <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground">No users found</h3>
          <p className="text-muted-foreground text-sm">
            {searchQuery ? "No search results found." : "New user profiles will appear here as users log in."}
          </p>
        </div>
      )}

      {/* User Detail Dialog */}
      <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
        <DialogContent className="bg-card border-border/50 text-foreground max-w-2xl">
          <DialogHeader>
            <DialogTitle>User Details: {selectedUser?.displayName || 'Seeker'}</DialogTitle>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-lg border-b border-border/50 pb-2">Cultural Context</h4>
                <div className="mt-2 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tradition:</span>
                    <span>{selectedUser?.culturalContext?.tradition || 'Vedic'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Country:</span>
                    <span>{selectedUser?.culturalContext?.country || 'India'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Languages:</span>
                    <span>{selectedUser?.culturalContext?.languages?.join(', ') || 'English, Sanskrit'}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-lg border-b border-border/50 pb-2">Soul ID</h4>
                <div className="mt-2 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Rashi:</span>
                    <span>{selectedUser?.soulId?.rashi || 'Not Calculated'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Nakshatra:</span>
                    <span>{selectedUser?.soulId?.nakshatra || 'Not Calculated'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Dominant Guna:</span>
                    <span>{selectedUser?.soulId?.guna || 'Sattva'}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-lg border-b border-border/50 pb-2">Activity Stats</h4>
                <div className="mt-2 grid grid-cols-2 gap-4">
                  <div className="p-3 rounded-lg bg-muted/20 text-center">
                    <div className="text-2xl font-bold">{selectedUser?.karma || 0}</div>
                    <div className="text-[10px] text-muted-foreground uppercase">Karma Points</div>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/20 text-center">
                    <div className="text-2xl font-bold">{selectedUser?.role || 'user'}</div>
                    <div className="text-[10px] text-muted-foreground uppercase">Account Role</div>
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
