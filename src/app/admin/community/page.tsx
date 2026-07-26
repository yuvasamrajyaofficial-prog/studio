'use client';

import React, { useEffect, useState } from 'react';
import { 
  MessageSquare, ShieldAlert, Flag, Users,
  CheckCircle2, XCircle, Trash2,
  ShieldCheck, Loader2, AlertTriangle
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  getPendingReports, 
  dismissReport, 
  resolveReportAndDelete, 
  ModerationReport 
} from '@/lib/admin/moderation-actions';
import { useToast } from '@/hooks/use-toast';

export default function CommunityModeration() {
  const [reports, setReports] = useState<ModerationReport[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    setLoading(true);
    try {
      const data = await getPendingReports();
      setReports(data);
    } catch (error) {
      console.error('Failed to load moderation reports:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDismiss = async (reportId: string) => {
    try {
      await dismissReport(reportId);
      toast({ title: 'Report Dismissed', description: 'Content marked as safe.' });
      setReports(prev => prev.filter(r => r.id !== reportId));
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to dismiss report.', variant: 'destructive' });
    }
  };

  const handleDeleteContent = async (report: ModerationReport) => {
    if (!confirm(`Are you sure you want to delete this reported ${report.targetType}?`)) return;

    try {
      await resolveReportAndDelete(report.id, report.targetType, report.targetId, report.postId);
      toast({ title: 'Content Removed', description: `Reported ${report.targetType} deleted and report resolved.` });
      setReports(prev => prev.filter(r => r.id !== report.id));
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to delete content.', variant: 'destructive' });
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Community Moderation</h2>
          <p className="text-muted-foreground">Review flagged posts, comments, and community reports</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 bg-card/50 border-border/50 text-foreground">
          <div className="text-sm text-muted-foreground">Pending Reports</div>
          <div className="text-3xl font-bold mt-1">{reports.length}</div>
        </Card>
        <Card className="p-6 bg-card/50 border-border/50 text-foreground">
          <div className="text-sm text-muted-foreground">Flagged Content</div>
          <div className="text-3xl font-bold mt-1 text-amber-500">
            {reports.filter(r => r.targetType === 'post').length} Posts
          </div>
        </Card>
        <Card className="p-6 bg-card/50 border-border/50 text-foreground">
          <div className="text-sm text-muted-foreground">Community Safety Score</div>
          <div className="text-3xl font-bold mt-1 text-green-500">
            {reports.length === 0 ? '100%' : '95%'}
          </div>
        </Card>
      </div>

      <Card className="bg-card/50 border-border/50 text-foreground p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-500" />
            <h3 className="text-xl font-bold">Moderation Queue</h3>
          </div>
          {loading && <Loader2 className="w-5 h-5 animate-spin text-primary" />}
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-12 gap-2 text-muted-foreground">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
            <p className="text-sm">Fetching moderation queue...</p>
          </div>
        ) : reports.length > 0 ? (
          <div className="space-y-4">
            {reports.map((report) => (
              <div key={report.id} className="p-4 rounded-xl bg-muted/20 border border-border/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/20 uppercase text-[10px]">
                      {report.targetType}
                    </Badge>
                    <span className="text-xs text-muted-foreground">Reported by {report.reportedBy || 'Seeker'}</span>
                  </div>
                  <p className="font-medium text-foreground">"{report.content}"</p>
                  <p className="text-xs text-destructive">Reason: {report.reason}</p>
                </div>

                <div className="flex items-center gap-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => handleDismiss(report.id)}
                    className="border-border/50 hover:bg-muted/30"
                  >
                    <CheckCircle2 className="w-4 h-4 mr-2 text-green-500" />
                    Dismiss Report
                  </Button>
                  <Button 
                    size="sm" 
                    variant="destructive" 
                    onClick={() => handleDeleteContent(report)}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Content
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-4">
              <ShieldCheck className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-1">All Clear!</h3>
            <p className="text-muted-foreground text-sm">There are currently no pending reports in the moderation queue.</p>
          </div>
        )}
      </Card>
    </div>
  );
}
