
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

const Settings = () => {
  return (
    <div className="flex h-screen bg-secondary/30">
      <AppSidebar />
      
      <main className="flex-1 overflow-auto">
        <div className="max-w-4xl mx-auto p-6">
          <h1 className="text-2xl font-bold mb-6">Settings</h1>
          
          <Tabs defaultValue="account">
            <TabsList className="mb-6">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="subscription">Subscription</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="integrations">Integrations</TabsTrigger>
            </TabsList>
            
            <TabsContent value="account" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>
                    Update your account details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First Name</Label>
                      <Input id="first-name" defaultValue="John" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last Name</Label>
                      <Input id="last-name" defaultValue="Doe" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="john.doe@example.com" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input id="company" defaultValue="Acme Recruiting" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save Changes</Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Password</CardTitle>
                  <CardDescription>
                    Update your password
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Change Password</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="subscription" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Current Plan</CardTitle>
                  <CardDescription>
                    You are currently on the Pro plan
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-primary/10 rounded-lg p-4 mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <div className="font-semibold text-lg">Pro Plan</div>
                      <Badge variant="outline" className="bg-primary/20 text-primary border-primary/20">
                        Current
                      </Badge>
                    </div>
                    <div className="text-2xl font-bold mb-2">$49<span className="text-sm font-normal text-muted-foreground">/month</span></div>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center">
                        <Check className="h-4 w-4 mr-2 text-primary" />
                        Unlimited projects
                      </li>
                      <li className="flex items-center">
                        <Check className="h-4 w-4 mr-2 text-primary" />
                        Up to 1,000 candidate searches per month
                      </li>
                      <li className="flex items-center">
                        <Check className="h-4 w-4 mr-2 text-primary" />
                        Advanced candidate filtering
                      </li>
                      <li className="flex items-center">
                        <Check className="h-4 w-4 mr-2 text-primary" />
                        AI candidate summaries
                      </li>
                    </ul>
                  </div>
                  
                  <div className="text-sm text-muted-foreground">
                    Your plan renews on August 15, 2023
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="flex gap-2">
                    <Button variant="outline">Cancel Subscription</Button>
                    <Button>Upgrade Plan</Button>
                  </div>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Billing Information</CardTitle>
                  <CardDescription>
                    Update your billing details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Payment Method</Label>
                    <div className="border rounded-md p-3 flex items-center">
                      <div className="h-8 w-12 bg-slate-200 rounded mr-3"></div>
                      <div>
                        <div className="font-medium">Visa ending in 4242</div>
                        <div className="text-sm text-muted-foreground">Expires 03/2026</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="billing-email">Billing Email</Label>
                    <Input id="billing-email" type="email" defaultValue="billing@acmerecruiting.com" />
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="flex gap-2">
                    <Button variant="outline">Update Payment Method</Button>
                    <Button>Save Changes</Button>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>
                    Choose what notifications you receive
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-medium">Email Notifications</h3>
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">New candidates</div>
                        <div className="text-sm text-muted-foreground">Get notified when new candidates match your search criteria</div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Weekly digest</div>
                        <div className="text-sm text-muted-foreground">Receive a weekly summary of your recruitment activities</div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Product updates</div>
                        <div className="text-sm text-muted-foreground">Get notified about new features and improvements</div>
                      </div>
                      <Switch />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-medium">In-App Notifications</h3>
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Project activity</div>
                        <div className="text-sm text-muted-foreground">Notifications about updates to your projects</div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Candidate status changes</div>
                        <div className="text-sm text-muted-foreground">Get notified when candidate statuses change</div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save Preferences</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="integrations" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Connected Services</CardTitle>
                  <CardDescription>
                    Manage your connected accounts and services
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded bg-slate-200 flex items-center justify-center">GH</div>
                        <div>
                          <div className="font-medium">GitHub</div>
                          <div className="text-sm text-muted-foreground">Find candidates based on GitHub repositories and contributions</div>
                        </div>
                      </div>
                      <Button variant="outline">Connect</Button>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded bg-slate-200 flex items-center justify-center">LI</div>
                        <div>
                          <div className="font-medium">LinkedIn</div>
                          <div className="text-sm text-muted-foreground">Import candidate data from LinkedIn</div>
                        </div>
                      </div>
                      <Button variant="outline">Connect</Button>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded bg-slate-200 flex items-center justify-center">SC</div>
                        <div>
                          <div className="font-medium">Slack</div>
                          <div className="text-sm text-muted-foreground">Receive notifications and collaborate with your team</div>
                        </div>
                      </div>
                      <Button variant="outline">Connect</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>API Access</CardTitle>
                  <CardDescription>
                    Manage your API keys for programmatic access
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>API Key</Label>
                    <div className="flex gap-2">
                      <Input readOnly value="sk_test_•••••••••••••••••••••••••••" />
                      <Button variant="outline">Copy</Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Keep this key secret. This key can be used to make API requests on behalf of your account.
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="flex gap-2">
                    <Button variant="outline">Regenerate Key</Button>
                    <Button>View Documentation</Button>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Settings;
