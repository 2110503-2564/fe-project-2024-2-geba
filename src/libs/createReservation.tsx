export default async function createReservation(user: string, reserveDate: string, coWorkingSpace: string, token:string) {
    
    const response = await fetch("https://a08-venue-explorer-backend.vercel.app/api/v1/reservation", {
        method: "POST",
        headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }, 
        body: JSON.stringify({
            user:user,
            reserveDate:reserveDate,
            coWorkingSpace:coWorkingSpace
        }), 
    })
}