'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { signup } from '@/app/(auth)/(with-auth)/register/signup';

const initialState = {
    errors: "",
}

export function SignupForm(){
    const [state, formAction] = useFormState(signup, initialState);

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
                            <li key={error}>- {error} </li>
                        ))}
                    </ul>
                </div>
            )}

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