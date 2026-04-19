'use client'
import Link from 'next/link';

import { Typography } from '@/components/ui/typography';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginFormValues, loginSchema } from '../zod/login.zod';
import { useAuthLoginHook } from '@/api/hooks/auth/hooks';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { setCookie } from 'nookies';


export default function LoginPage() {
  const {mutate:login, isPending : loginPending}=useAuthLoginHook()

  const router=useRouter()
  const {setHasToken}=useAuth()

  const {formState:{errors},control , handleSubmit}=useForm<LoginFormValues>({
    resolver:zodResolver(loginSchema),
    defaultValues:{
      email:'',
      password:''
    }
  })

  const storageTokenName = process.env.NEXT_PUBLIC_TOKEN_NAME as string

  const onSubmit = (data: LoginFormValues) => {
    login(data, {
      onSuccess: (res) => {
        const resCount = res?.data?.restaurantCount || 0;
        setHasToken(res?.data?.accessToken)
        setCookie(null, storageTokenName, res?.data?.accessToken, {
          path: "/"
        })

        if (resCount === 0) {
          router.push("/onBoarding")
        } else if (resCount === 1) {
          router.push(`/dashboard/${res?.data?.restaurants[0]?._id}`)
        } else {
          router.push("/restaurant-selection")
        }
      }
    })
  }

  return (
    <Card className="w-full max-w-md border-none bg-surface-lowest p-4">
      <CardHeader className="space-y-1 pb-8 text-center">
        <Typography variant="h2" className="font-display text-4xl font-black text-foreground">
          Welcome back
        </Typography>
        <Typography variant="body2" className="text-secondary/60">
          Access your restaurant ledger to manage operations.
        </Typography>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email">EMAIL ADDRESS</Label>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input 
                    {...field} 
                    id="email"
                    placeholder="e.g. chef@tastytrial.com" 
                    className={errors?.email ? "border-destructive/50 ring-destructive/20" : ""}
                  />
                )}
              />
              {errors?.email?.message && (
                <p className="text-[10px] font-bold text-destructive uppercase tracking-wider">
                  {errors?.email?.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password">PASSPHRASE</Label>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <Input 
                    {...field} 
                    id="password"
                    type="password" 
                    placeholder="••••••••" 
                    className={errors?.password ? "border-destructive/50 ring-destructive/20" : ""}
                  />
                )}
              />
              {errors?.password?.message && (
                <p className="text-[10px] font-bold text-destructive uppercase tracking-wider">
                  {errors?.password?.message}
                </p>
              )}
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full h-12 font-display text-base font-bold tracking-tight text-primary shadow-xl"
            disabled={loginPending}
          >
            {loginPending ? "Validating..." : "Login"}
          </Button>

          <footer className="pt-4 text-center">
            <p className="text-xs font-medium text-secondary/50">
              New to the platform?{' '}
              <Link href="/register" className="text-primary font-bold hover:underline transition-all">
                Create Account
              </Link>
            </p>
          </footer>
        </form>
      </CardContent>
    </Card>
  );
}
