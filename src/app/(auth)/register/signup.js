'use server'

import { SignupFormSchema } from '@/app/(auth)/register/SignupFormSchema'
import { redirect } from 'next/dist/server/api-utils';


export async function signup(state, formData) {
    const validFields = SignupFormSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
    })

    if (!validFields.success) {
        return {
            errors: validFields.error.flatten().fieldErrors,
        }
    }
    
    return await createUser(formData.get('email'), formData.get('password'));   
}

async function createUser(email, password) {

    const token = await fetch('http://poker-payout-calculator-auth-1:8080/realms/myrealm/protocol/openid-connect/token', {
        method: "POST",
        body: new URLSearchParams({
            grant_type: 'client_credentials',
            client_id: process.env.AUTH_KEYCLOAK_ID,
            client_secret: process.env.AUTH_KEYCLOAK_SECRET
        })
    })
        .then((response) => response.json())
        .then(data => {
            return data.access_token;
        })
        .catch(error => console.error("Fetching bearer failure", error));

    
        const bearerToken = await token;
        try {
            const userResponse = await fetch('http://poker-payout-calculator-auth-1:8080/admin/realms/myrealm/users/', {
                method: 'POST',
                headers: ({
                    "Authorization": `Bearer ${bearerToken}`,
                    "Content-Type": "application/json",
                }),
                body: JSON.stringify({
                    "attributes": {
                        "attribute_key": "test_value"
                    },
                    "credentials": [
                        {
                            "temporary": "false",
                            "type": "password",
                            "value": password
                        }
                    ],
                    "email": email,
                    "emailVerified": "false",
                    "enabled": "true"
                })
                    
            });
            console.log(userResponse);

            if (userResponse.status === 409){
                return {
                    errors: {email: "User with this email address already exists."}
                };
            } else if (!userResponse.ok) {
                return {
                    errors: {general:  "Error failed to create user. Please try again later."}
                };
            }
            return {
                errors: "",
                success: true, 
            };
        } catch (error) {
            throw new Error("Unknown Error Has Occured. " + error);
        }
        

        
}

