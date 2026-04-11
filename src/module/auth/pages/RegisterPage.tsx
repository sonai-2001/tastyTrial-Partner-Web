'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Controller, useForm } from 'react-hook-form';
import { RegisterFormValues, registerSchema } from '../zod/register.zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRegisterHook } from '@/api/hooks/auth/hooks';
import { useAuth } from '@/hooks/useAuth';
import { setCookie } from 'nookies';

export default function RegisterPage() {

  const {control,formState:{errors},handleSubmit}=useForm<RegisterFormValues>({
    resolver : zodResolver(registerSchema),
    defaultValues:{
      name:"",
      email:"",
      phoneNumber:"",
      password:"",
      confirmPassword:""
    }
  })
  const router = useRouter();
  const {mutate : registerFn , isPending :registerLoading}=useRegisterHook()
  const {setHasToken}=useAuth()
  
  const onSubmit = (data: RegisterFormValues) => {
  console.log(data);

  const payloadForRegister={
    name:data.name,
    email:data.email,
    phone:data.phoneNumber,
    password:data.password
  }
  

  registerFn(payloadForRegister,{
    onSuccess:(res)=>{
      const token = res.data.accessToken
      setHasToken(token)
      setCookie(null,process.env.NEXT_PUBLIC_TOKEN_NAME as string,token,{
        path:"/"
      })

      router.push("/onBoarding");


    }
  })

};


  return (
    <Card className="w-full max-w-md shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Welcome back</CardTitle>
        <p className="text-sm text-muted-foreground text-center">
          Register to manage your restaurant
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <Controller
          name="name"
          control={control}
          render={({field})=>{
            return (
              <>
              <Input {...field} placeholder="Enter your name." />
              {errors.name && <p className="text-red-500">{errors.name.message}</p>}
               </>
            )
          }}
          />

          <Controller
           name='phoneNumber'
           control={control}
           render={({field})=>{
            return (
              <>
              <Input {...field} placeholder="Enter your Phone number." />
              {
                errors.phoneNumber && <p className='text-red-500'>
                  {errors?.phoneNumber?.message}
                </p>
              }

              </>
            )
           }}
          />
          {/* <Input placeholder="Email address" /> */}
          <Controller
          name='email'
          control={control}
          render={({field})=>{
           return (
            <>
            <Input {...field} type='email' placeholder='Enter your email.' />
            {errors.email && (
              <p className='text-red-500'>
                {errors?.email?.message}
              </p>
            )}
            </>
           )
          }}
          />
          <Controller
           name='password'
           control={control}
           render={({field})=>{
             return (
              <>
              <Input {...field} type='password' placeholder='Enter your password' />
               {errors.password && (
                <p className='text-red-500'>
                   {errors?.password?.message}
                </p>
               )}
              </>
             )
           }}
          />
          <Controller
          name='confirmPassword'
          control={control}
          render ={({field})=>{
            return (
              <>
              <Input {...field} type='password' placeholder='Enter your password again'/>
               {
                errors.confirmPassword && (
                  <p className='text-red-500'>
                    {errors?.confirmPassword?.message}

                  </p>
                )
               }
              </>
            )

          }}
          />
          <Button type='submit' className="w-full">
          Register
        </Button>
        </form>

        

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
