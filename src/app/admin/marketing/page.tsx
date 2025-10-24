'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Target, Mail, Users, TrendingUp, Plus, Eye, BarChart3, Calendar } from 'lucide-react'

export default function MarketingPage() {
  const handleCreateCampaign = () => {
    alert('Create new marketing campaign - This would open campaign creation wizard with multi-channel setup')
  }

  const handleViewCampaign = (campaignName: string) => {
    alert(`View ${campaignName} - This would show detailed campaign analytics and performance metrics`)
  }

  const handleViewAllCampaigns = () => {
    alert('View all campaigns - This would navigate to the campaigns management page')
  }

  const handleScheduleCampaign = (campaignName: string) => {
    alert(`Schedule ${campaignName} - This would open scheduling interface for campaign launch`)
  }

  const handleViewAnalytics = () => {
    alert('View marketing analytics - This would show comprehensive marketing performance dashboard')
  }
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Marketing Campaigns</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleViewAnalytics}>
            <BarChart3 className="h-4 w-4 mr-2" />
            View Analytics
          </Button>
          <Button onClick={handleCreateCampaign}>
            <Plus className="h-4 w-4 mr-2" />
            Create Campaign
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6</div>
            <p className="text-xs text-muted-foreground">
              2 launching this week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Email Subscribers</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,847</div>
            <p className="text-xs text-muted-foreground">
              +18% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Campaign ROI</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">324%</div>
            <p className="text-xs text-muted-foreground">
              Above industry average
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Leads</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">145</div>
            <p className="text-xs text-muted-foreground">
              This month
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Campaigns</CardTitle>
          <CardDescription>
            Track your Dubai property investment marketing campaigns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium">Downtown Dubai Launch</h4>
                <p className="text-sm text-gray-500">Email Campaign • 1,245 recipients</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                    Active
                  </span>
                  <p className="text-sm text-gray-500 mt-1">32% open rate</p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleViewCampaign('Downtown Dubai Launch')}
                >
                  <Eye className="h-4 w-4 mr-1" />
                  View
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium">Marina Investment Guide</h4>
                <p className="text-sm text-gray-500">Social Media • 15K reach</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                    Scheduled
                  </span>
                  <p className="text-sm text-gray-500 mt-1">Launches tomorrow</p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleScheduleCampaign('Marina Investment Guide')}
                >
                  <Calendar className="h-4 w-4 mr-1" />
                  Schedule
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium">Q4 Property Showcase</h4>
                <p className="text-sm text-gray-500">Landing Page • A/B Testing</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                    Testing
                  </span>
                  <p className="text-sm text-gray-500 mt-1">Variant B: +15% conversion</p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleViewCampaign('Q4 Property Showcase')}
                >
                  <Eye className="h-4 w-4 mr-1" />
                  View
                </Button>
              </div>
            </div>
            <div className="pt-4 border-t">
              <Button 
                variant="outline" 
                className="w-full"
                onClick={handleViewAllCampaigns}
              >
                View All Campaigns
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}