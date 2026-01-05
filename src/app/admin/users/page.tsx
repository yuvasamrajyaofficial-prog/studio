'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Search, MoreVertical, Shield, User, Star, Eye, Loader2 } from 'lucide-react';
import { getAllUsers, updateUserRole } from '@/lib/admin/actions';
import { UserProfile } from '@/types/user';
import { useToast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/badge';

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (error) {
      console.error('Failed to load users:', error);
      toast({ title: "Error", description: "Failed to load users.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleRoleUpdate = async (userId: string, newRole: 'user' | 'admin' | 'moderator') => {
    try {
      await updateUserRole(userId, newRole);
      setUsers(prev => prev.map(u => u.uid === userId ? { ...u, role: newRole } : u));
      toast({ title: "Success", description: `User role updated to ${newRole}.` });
    } catch (error) {
      toast({ title: "Error", description: "Failed to update role.", variant: "destructive" });
    }
  };

  const filteredUsers = users.filter(user => 
    user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.displayName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="flex justify-center p-12"><Loader2 className="animate-spin" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-white">User Management</h2>
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
          <Input 
            placeholder="Search users..." 
            className="pl-8 bg-white/5 border-white/10 text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Card className="bg-white/5 border-white/10 text-white">
        <CardHeader>
          <CardTitle>All Users ({users.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-white/10 hover:bg-white/5">
                <TableHead className="text-gray-400">User</TableHead>
                <TableHead className="text-gray-400">Role</TableHead>
                <TableHead className="text-gray-400">Karma</TableHead>
                <TableHead className="text-gray-400">Joined</TableHead>
                <TableHead className="text-right text-gray-400">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.uid} className="border-white/10 hover:bg-white/5">
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium text-white">{user.displayName || 'Anonymous'}</span>
                      <span className="text-xs text-gray-500">{user.email}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`
                      ${user.role === 'admin' ? 'border-red-500 text-red-400' : 
                        user.role === 'moderator' ? 'border-blue-500 text-blue-400' : 
                        'border-gray-500 text-gray-400'}
                    `}>
                      {user.role || 'user'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-amber-400">
                      <Star className="w-3 h-3 fill-current" />
                      {user.karmaMeter?.points || 0}
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-400">
                    {new Date(user.createdAt?.seconds * 1000 || Date.now()).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-slate-900 border-white/10 text-white">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => setSelectedUser(user)}>
                          <Eye className="mr-2 h-4 w-4" /> View Details
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-white/10" />
                        <DropdownMenuItem onClick={() => handleRoleUpdate(user.uid, 'admin')}>
                          <Shield className="mr-2 h-4 w-4 text-red-400" /> Make Admin
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleRoleUpdate(user.uid, 'moderator')}>
                          <Shield className="mr-2 h-4 w-4 text-blue-400" /> Make Moderator
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleRoleUpdate(user.uid, 'user')}>
                          <User className="mr-2 h-4 w-4" /> Remove Roles
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* User Details Dialog */}
      <Dialog open={!!selectedUser} onOpenChange={(open) => !open && setSelectedUser(null)}>
        <DialogContent className="bg-slate-900 border-white/10 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle>User Profile: {selectedUser?.displayName}</DialogTitle>
            <DialogDescription>
              Detailed view of user data and Soul ID.
            </DialogDescription>
          </DialogHeader>
          
          {selectedUser && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div className="space-y-4">
                <h4 className="font-bold text-lg border-b border-white/10 pb-2">Cultural Context</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <span className="text-gray-400">Religion:</span>
                  <span>{selectedUser.culturalContext?.religion || 'N/A'}</span>
                  <span className="text-gray-400">Country:</span>
                  <span>{selectedUser.culturalContext?.country || 'N/A'}</span>
                  <span className="text-gray-400">Languages:</span>
                  <span>{selectedUser.culturalContext?.languages?.join(', ') || 'N/A'}</span>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-bold text-lg border-b border-white/10 pb-2">Soul ID</h4>
                {selectedUser.soulID ? (
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Rashi:</span>
                      <span>{selectedUser.soulID.astrology?.rashi || 'Unknown'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Nakshatra:</span>
                      <span>{selectedUser.soulID.astrology?.nakshatra || 'Unknown'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Dominant Guna:</span>
                      <span>{selectedUser.soulID.psychology?.dominantGuna || 'Unknown'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Dosha:</span>
                      <span>{selectedUser.soulID.psychology?.dosha || 'Unknown'}</span>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500 italic">No Soul ID generated yet.</p>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
