'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { signup } from '@/app/(auth)/(with-auth)/register/signup';
import { useRouter } from 'next/navigation';

const initialState = {
    errors: {
        email: null,
        password: null,
        general: null,
    },
    success: false,   
}

export function SignupForm(){
    const [state, formAction] = useFormState(signup, initialState);
    const router = useRouter();

    if (state.success) router.push('/');

    return (
        <form action={formAction}>
            <div>
                <label htmlFor="email">Email</label>
                <input id="email" name="email" placeholder="Email"/>
            </div>
            {state.errors.email && <p>{state.errors.email}</p>}

            <div>
                <label htmlFor="password">Password</label>
                <input id="password" name="password" type="password"/>
            </div>

            {state.errors.password && (
                <div>
                    <p>Password must:</p>
                    <ul>
                        {state.errors.password.map((error) => (
                            <li key={error}>{error}</li>
                        ))}
                    </ul>
                </div>
            )}

            {state.errors.general && <p>{state.errors.general}</p>}
            <SubmitButton/>    
        </form>
    )
}

function SubmitButton(){    
    const { pending } = useFormStatus();
    return (
        <button disabled={pending} type='submit'>Sign Up</button>
    )
}