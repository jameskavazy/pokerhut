'use server'

import { SignupFormSchema } from '@/app/(auth)/(with-auth)/register/SignupFormSchema'

export async function signup(state, formData){
    const validFields = SignupFormSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
    })

    if (!validFields.success) {
        return {
            errors: validFields.error.flatten().fieldErrors,
          }
    }

    //Call Keycloak API...


}

