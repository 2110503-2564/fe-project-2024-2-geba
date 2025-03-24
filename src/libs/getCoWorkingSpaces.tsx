export default async function getCoWorkingSpaces() {

    await new Promise((resolve) => setTimeout(resolve, 300))

    const response = await fetch("https://a08-venue-explorer-backend-3.vercel.app/api/v1/venues")

    if (!response.ok) {
        throw new Error("Failed to Fetch Venues")
    }
    
    return await response.json()
}