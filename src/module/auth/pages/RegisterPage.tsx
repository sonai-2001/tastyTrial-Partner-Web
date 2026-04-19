'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { setCookie } from 'nookies';
import { 
  X, 
  ShieldCheck, 
  RotateCcw, 
  ArrowRight 
} from "lucide-react";

import { Typography } from '@/components/ui/typography';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useRegisterHook, useSendOtpHook } from '@/api/hooks/auth/hooks';
import { useAuth } from '@/hooks/useAuth';
import { RegisterFormValues, registerSchema } from '../zod/register.zod';

export default function RegisterPage() {
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [tempRegData, setTempRegData] = useState<RegisterFormValues | null>(null);
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(0);
  
  const { control, formState: { errors }, handleSubmit } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: ""
    }
  })
  const router = useRouter();
  const { mutate: registerFn, isPending: registerLoading } = useRegisterHook()
  const { mutate: sendOtpFn, isPending: sendOtpPending } = useSendOtpHook()
  const { setHasToken } = useAuth()

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const onRegisterAttempt = (data: RegisterFormValues) => {
    // Stage 1: Send OTP
    sendOtpFn({ email: data.email }, {
      onSuccess: () => {
        setTempRegData(data);
        setShowOtpModal(true);
        setTimer(60); // Start 60s cooldown
      }
    });
  };

  const onResendOtp = () => {
    if (timer > 0 || !tempRegData) return;
    sendOtpFn({ email: tempRegData.email }, {
      onSuccess: () => setTimer(60)
    });
  };

  const onFinalRegister = () => {
    if (!tempRegData || otp.length !== 6) return;

    const payloadForRegister = {
      name: tempRegData.name,
      email: tempRegData.email,
      phone: tempRegData.phoneNumber,
      password: tempRegData.password,
      otp: otp
    }

    registerFn(payloadForRegister, {
      onSuccess: (res) => {
        const token = res.data.accessToken
        setHasToken(token)
        setCookie(null, process.env.NEXT_PUBLIC_TOKEN_NAME as string, token, {
          path: "/"
        })
        router.push("/onBoarding");
      }
    })
  };

  return (
    <>
      <Card className="w-full max-w-lg border-none bg-surface-lowest p-6 transition-all duration-500">
        <CardHeader className="space-y-1 pb-10 text-center">
          <Typography variant="h2" className="font-display text-4xl font-black text-foreground">
            Join the Ledger
          </Typography>
          <Typography variant="body2" className="text-secondary/60">
            Start your journey with Tasty Trial’s professional restaurant suite.
          </Typography>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onRegisterAttempt)} className="space-y-8">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="name">LEGAL NAME</Label>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <Input {...field} id="name" placeholder="Chef's Full Name" />
                  )}
                />
                {errors.name && <p className="text-[10px] font-bold text-destructive uppercase tracking-wider">{errors.name.message}</p>}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="email">EMAIL CONTACT</Label>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <Input {...field} id="email" type="email" placeholder="e.g. kitchen@restaura.com" />
                  )}
                />
                {errors.email && <p className="text-[10px] font-bold text-destructive uppercase tracking-wider">{errors.email.message}</p>}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="phoneNumber">MOBILE NO.</Label>
                <Controller
                  name="phoneNumber"
                  control={control}
                  render={({ field }) => (
                    <Input {...field} id="phoneNumber" placeholder="+1 (555) 000-0000" />
                  )}
                />
                {errors.phoneNumber && <p className="text-[10px] font-bold text-destructive uppercase tracking-wider">{errors.phoneNumber.message}</p>}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="password">PASSPHRASE</Label>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <Input {...field} id="password" type="password" placeholder="••••••••" />
                  )}
                />
                {errors.password && <p className="text-[10px] font-bold text-destructive uppercase tracking-wider">{errors?.password?.message}</p>}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="confirmPassword">VERIFY PASSWORD</Label>
                <Controller
                  name="confirmPassword"
                  control={control}
                  render={({ field }) => (
                    <Input {...field} id="confirmPassword" type="password" placeholder="••••••••" />
                  )}
                />
                {errors.confirmPassword && <p className="text-[10px] font-bold text-destructive uppercase tracking-wider">{errors?.confirmPassword?.message}</p>}
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 font-display text-primary font-bold tracking-tight shadow-lg"
              disabled={sendOtpPending || registerLoading}
            >
              {sendOtpPending ? "Authenticating Email..." : registerLoading ? "Establishing Record..." : "Register Restaurant"}
            </Button>

            <footer className="pt-4 text-center">
              <p className="text-xs font-medium text-secondary/50">
                Already a partner?{' '}
                <Link href="/login" className="text-primary font-bold hover:underline transition-all">
                  Sign In
                </Link>
              </p>
            </footer>
          </form>
        </CardContent>
      </Card>

      {/* OTP VERIFICATION MODAL - HIGH FIDELITY */}
      {showOtpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/10 backdrop-blur-md animate-in fade-in duration-300">
          <div className="relative w-full max-w-md bg-surface-lowest rounded-[2.5rem] shadow-[0_40px_100px_-20px_rgba(177,37,0,0.15)] overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-10 duration-500">
            {/* Modal Header */}
            <div className="bg-primary/5 p-10 text-center space-y-4">
              <div className="mx-auto size-16 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                <ShieldCheck className="size-8 text-primary" />
              </div>
              <div className="space-y-1">
                <Typography variant="h3" className="font-display font-black text-2xl">Verify Identity</Typography>
                <Typography variant="body2" className="text-secondary/60">
                  We've inscribed a security code to <br />
                  <span className="font-bold text-foreground">{tempRegData?.email}</span>
                </Typography>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-10 space-y-8">
              <div className="space-y-4">
                <Label className="text-center block text-[10px] font-black uppercase tracking-[0.2em] text-secondary/40">
                  6-DIGIT SECURITY CODE
                </Label>
                <Input 
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="000000"
                  className="h-16 text-center text-3xl font-display font-black tracking-[0.5em] border-primary/10 focus:ring-primary/20 bg-surface"
                />
              </div>

              <div className="space-y-4">
                <Button 
                  onClick={onFinalRegister}
                  className="w-full h-14 font-display font-bold text-lg group"
                  disabled={otp.length !== 6 || registerLoading}
                >
                  {registerLoading ? "Establishing..." : "Complete Registration"}
                  <ArrowRight className="ml-2 size-5 group-hover:translate-x-1 transition-transform" />
                </Button>

                <div className="flex flex-col items-center gap-3">
                  <button 
                    onClick={onResendOtp}
                    disabled={timer > 0 || sendOtpPending}
                    className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary disabled:text-secondary/30 transition-colors"
                  >
                    <RotateCcw className={`size-3 ${sendOtpPending ? 'animate-spin' : ''}`} />
                    {timer > 0 ? `Resend Available in ${timer}s` : "Resend Security Code"}
                  </button>
                  
                  <button 
                    onClick={() => setShowOtpModal(false)}
                    className="text-[10px] font-bold text-secondary/40 uppercase tracking-widest hover:text-foreground transition-colors"
                  >
                        Abandon Registration
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
