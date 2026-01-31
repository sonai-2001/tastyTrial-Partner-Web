import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function LoginPage() {
  return (
    <Card className="w-full max-w-md shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl text-center">
          Welcome back
        </CardTitle>
        <p className="text-sm text-muted-foreground text-center">
          Log in to manage your restaurant
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-3">
          <Input placeholder="Email address" />
          <Input type="password" placeholder="Password" />
        </div>

        <Button className="w-full">Log in</Button>

        <p className="text-center text-sm text-muted-foreground">
          Don’t have an account?{' '}
          <Link href="/register" className="text-primary hover:underline">
            Register
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}