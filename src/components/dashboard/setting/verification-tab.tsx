import React from 'react';
import { format } from 'date-fns';
import { ShieldCheck } from 'lucide-react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface VerificationTabProps {
  category: string;
}

export function VerificationTab({ category }: VerificationTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShieldCheck className="h-5 w-5" />
          Account Status
        </CardTitle>
        <CardDescription>Your account verification status and details</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="rounded-lg border p-4">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                <ShieldCheck className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold">Account Verified</h3>
                <p className="text-sm text-muted-foreground">
                  Your account was verified on {format(new Date('2024-12-31T05:45:14.300Z'), 'PPP')}
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border p-4">
              <h4 className="font-semibold">Seller Status</h4>
              <p className="text-sm text-muted-foreground">Active Seller</p>
            </div>
            <div className="rounded-lg border p-4">
              <h4 className="font-semibold">Account Type</h4>
              <p className="text-sm text-muted-foreground">{category} Services</p>
            </div>
            <div className="rounded-lg border p-4">
              <h4 className="font-semibold">Member Since</h4>
              <p className="text-sm text-muted-foreground">
                {format(new Date('2024-12-04T08:58:37.825Z'), 'PPP')}
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <h4 className="font-semibold">Last Updated</h4>
              <p className="text-sm text-muted-foreground">
                {format(new Date('2024-12-31T05:45:14.300Z'), 'PPP')}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
