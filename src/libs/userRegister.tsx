export default async function userRegister(userName: string, userEmail: string, userTel: string, userPassword: string) {

    const response = await fetch("https://a08-venue-explorer-backend.vercel.app/api/v1/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: userName,
            email: userEmail,
            password: userPassword,
            tel: userTel
        }), 
    });

    if (!response.ok) {
        throw new Error("Failed to register");
    } 

    return await response.json();
}
