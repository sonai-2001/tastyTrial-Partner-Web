'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export default function LoginPage() {
  const router = useRouter();
  return (
    <Card className="w-full max-w-md shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Welcome back</CardTitle>
        <p className="text-sm text-muted-foreground text-center">
          Register to manage your restaurant
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-3">
          <Input placeholder="Enter your name." />
          <Input placeholder="Enter your Phone number." />
          <Input placeholder="Email address" />
          <Input type="password" placeholder="Password" />
          <Input type="password" placeholder="Confirm password" />
        </div>

        <Button onClick={() => router.push('/onBoarding')} className="w-full">Register</Button>

        <p className="text-center text-sm text-muted-foreground">
          You have an account?{' '}
          <Link href="/login" className="text-primary hover:underline">
            Login
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
