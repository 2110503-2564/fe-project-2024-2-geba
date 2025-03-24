export default async function updateReservation(rid: string, user: string, reserveDate: string, coWorkingSpace: string, token:string) {
    
    const response = await fetch(`https://cws-backend-five.vercel.app/api/v1/reservations/${rid}`, {
        method: "PUT",
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

    if (!response.ok) {
        throw new Error("Cannot update Reservation")
    }

    return await response.json()
}