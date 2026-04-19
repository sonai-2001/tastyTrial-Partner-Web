'use client'
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
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

  const stotageTokenName = process.env.NEXT_PUBLIC_TOKEN_NAME as string

  console.log("errors are ======>",errors)

  const onSubmit = (data:LoginFormValues)=>{
    console.log("data=======>>>>>>>>>>",data);
    login(data,{
      onSuccess:(res)=>{
        console.log('response after login ', res)
        const resCount = res?.data?.restaurantCount || 0;
        setHasToken(res?.data?.accessToken)
        setCookie(null,stotageTokenName,res?.data?.accessToken,{
        path:"/"
      })

        if(resCount===0){
        router.push("/onBoarding")
        }else if (resCount===1){
        router.push(`/dashboard/${res?.data?.restaurants[0]?._id}`)
        }else{
        router.push("/restaurant-selection")
       }

      }
    })

    
    
  }
  return (
    <Card className="w-full max-w-md shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Welcome back</CardTitle>
        <p className="text-sm text-muted-foreground text-center">
          Log in to manage your restaurant
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-3">
         
          <Controller
          name='email'
          control={control}
          render={({field})=>{
            return <>
               <Input {...field} placeholder="Email address" />
               {
                errors?.email?.message && (
                  <p className='text-red-500'>
                    {errors?.email?.message}
                  </p>
                )
               }

            </>

          }}
          />
          {/* <Input type="password" placeholder="Password" /> */}
          <Controller
          name='password'
          control={control}
          render={({field})=>{
            return <>
            <Input {...field} type='password' placeholder='Enter your password'/>
            {
              errors?.password?.message && (
                <p className='text-red-500'>
                  {errors?.password?.message}
                </p>
              )
            }
            </>
          }}
          />
        </div>

        <Button className="w-full" onClick={handleSubmit(onSubmit)}>Log in</Button>

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
