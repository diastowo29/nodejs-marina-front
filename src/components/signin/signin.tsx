"use client";
// import { useRouter } from 'next/navigation'
import { Button, Input } from '@nextui-org/react'
import { FormEvent } from 'react'
 
const LoginPage = () => {
//   const router = useRouter
 
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
 
    const formData = new FormData(event.currentTarget)
    const email = formData.get('email')
    const password = formData.get('password')
 
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
 
    if (response.ok) {
        console.log('response');
    //   router.push('/profile')
    } else {
      // Handle errors
    }
  }
 
  return (
    <form onSubmit={handleSubmit}>
        <Input type='email' placeholder='Email' required value={'diastowo@gmail.com'}></Input>
        <Input type='password' placeholder='Password' required value={'W3lcome123'}></Input>
        <Button type='submit'>Login</Button>
      {/* <input type="email" name="email" placeholder="Email" required /> */}
      {/* <input type="password" name="password" placeholder="Password" required /> */}
      {/* <button type="submit">Login</button> */}
    </form>
  )
}

export default LoginPage;