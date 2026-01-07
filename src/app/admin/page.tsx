'use client';

import React from 'react';
import { 
  Users, BookOpen, MessageSquare, TrendingUp, 
  Activity, Shield, Bell, ArrowUpRight, ArrowDownRight,
  Clock, CheckCircle2, AlertCircle
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-2">Dashboard Overview</h2>
          <p className="text-muted-foreground">Welcome back, Administrator.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-border/50">
            <Clock className="w-4 h-4 mr-2" />
            Last 24h
          </Button>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Download Report
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Users" 
          value="12,482" 
          change="+12%" 
          isPositive={true} 
          icon={Users}
          color="text-blue-500"
        />
        <StatCard 
          title="Active Sessions" 
          value="842" 
          change="+5%" 
          isPositive={true} 
          icon={Activity}
          color="text-green-500"
        />
        <StatCard 
          title="Scripture Reads" 
          value="45.2k" 
          change="-2%" 
          isPositive={false} 
          icon={BookOpen}
          color="text-purple-500"
        />
        <StatCard 
          title="Community Posts" 
          value="1,204" 
          change="+18%" 
          isPositive={true} 
          icon={MessageSquare}
          color="text-amber-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <Card className="lg:col-span-2 bg-card/50 border-border/50 text-foreground p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold">Recent Activity</h3>
            <Button variant="ghost" size="sm" className="text-primary">View All</Button>
          </div>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-lg bg-muted/20">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm">
                    <span className="font-bold text-foreground">User_{1000+i}</span> completed a meditation session.
                  </p>
                  <p className="text-xs text-muted-foreground">2 minutes ago</p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
              </div>
            ))}
          </div>
        </Card>

        {/* System Health */}
        <Card className="bg-card/50 border-border/50 text-foreground p-6">
          <h3 className="text-xl font-bold mb-6">System Health</h3>
          <div className="space-y-6">
            <HealthItem title="API Server" status="Operational" isHealthy={true} />
            <HealthItem title="Database" status="Operational" isHealthy={true} />
            <HealthItem title="AI Models" status="High Latency" isHealthy={false} />
            <HealthItem title="Storage" status="Operational" isHealthy={true} />
          </div>
          
          <div className="mt-8 p-4 rounded-xl bg-primary/5 border border-primary/10">
            <div className="flex items-center gap-3 mb-2">
              <Shield className="w-5 h-5 text-primary" />
              <span className="font-bold text-sm">Security Status</span>
            </div>
            <p className="text-xs text-muted-foreground">All systems are currently protected. No threats detected in the last 24 hours.</p>
          </div>
        </Card>
      </div>
    </div>
  );
}

function StatCard({ title, value, change, isPositive, icon: Icon, color }: any) {
  return (
    <Card className="bg-card/50 border-border/50 text-foreground p-6">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-lg bg-muted/20 ${color}`}>
          <Icon className="w-6 h-6" />
        </div>
        <div className={`flex items-center text-sm ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {isPositive ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
          {change}
        </div>
      </div>
      <div>
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <h4 className="text-2xl font-bold mt-1">{value}</h4>
      </div>
    </Card>
  );
}

function HealthItem({ title, status, isHealthy }: any) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        {isHealthy ? (
          <CheckCircle2 className="w-5 h-5 text-green-500" />
        ) : (
          <AlertCircle className="w-5 h-5 text-amber-500" />
        )}
        <span className="text-sm font-medium">{title}</span>
      </div>
      <span className={`text-xs px-2 py-1 rounded-full ${
        isHealthy ? 'bg-green-500/10 text-green-500' : 'bg-amber-500/10 text-amber-500'
      }`}>
        {status}
      </span>
    </div>
  );
}
