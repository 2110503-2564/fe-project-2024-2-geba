export default async function getCoWorkingSpaces(token:string) {

    await new Promise((resolve) => setTimeout(resolve, 300))

    const response = await fetch("https://cws-backend-five.vercel.app/api/v1/coWorkingSpaces", {
        method: "GET",
        headers: {
            authorization: `Bearer ${token}`
        }
    })

    if (!response.ok) {
        throw new Error("Failed to Fetch Co-Working Spaces")
    }
    
    return await response.json()
}