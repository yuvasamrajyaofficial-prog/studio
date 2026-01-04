'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, MessageSquare, Activity, AlertTriangle } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h2>
        <p className="text-gray-400">Welcome back, Administrator.</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard 
          title="Total Users" 
          value="1,234" 
          change="+12%" 
          icon={Users} 
          color="text-blue-400" 
        />
        <MetricCard 
          title="Active Souls" 
          value="856" 
          change="+5%" 
          icon={Activity} 
          color="text-green-400" 
        />
        <MetricCard 
          title="AI Messages" 
          value="45.2k" 
          change="+28%" 
          icon={MessageSquare} 
          color="text-purple-400" 
        />
        <MetricCard 
          title="System Alerts" 
          value="2" 
          change="Normal" 
          icon={AlertTriangle} 
          color="text-amber-400" 
        />
      </div>

      {/* Recent Activity & Quick Actions Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 bg-white/5 border-white/10 text-white">
          <CardHeader>
            <CardTitle>Live Activity Feed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center gap-4 p-3 rounded-lg bg-black/20">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <p className="text-sm text-gray-300">
                    <span className="font-bold text-white">User_{1000+i}</span> completed a meditation session.
                  </p>
                  <span className="ml-auto text-xs text-gray-500">{i}m ago</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10 text-white">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <button className="w-full p-3 text-left rounded-lg bg-purple-500/20 hover:bg-purple-500/30 text-purple-200 transition-colors">
              + Add New Scripture
            </button>
            <button className="w-full p-3 text-left rounded-lg bg-blue-500/20 hover:bg-blue-500/30 text-blue-200 transition-colors">
              Broadcast Message
            </button>
            <button className="w-full p-3 text-left rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-200 transition-colors">
              Emergency Stop AI
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function MetricCard({ title, value, change, icon: Icon, color }: any) {
  return (
    <Card className="bg-white/5 border-white/10 text-white">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-400">{title}</p>
            <h3 className="text-2xl font-bold mt-1">{value}</h3>
          </div>
          <div className={`p-3 rounded-lg bg-white/5 ${color}`}>
            <Icon className="w-6 h-6" />
          </div>
        </div>
        <div className="mt-4 flex items-center text-xs">
          <span className="text-green-400 font-medium">{change}</span>
          <span className="text-gray-500 ml-2">from last month</span>
        </div>
      </CardContent>
    </Card>
  );
}
