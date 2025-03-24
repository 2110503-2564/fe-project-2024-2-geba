export default async function createReservation(user: string, reserveDate: string, coWorkingSpace: string, token:string) {
    
    const response = await fetch("https://cws-backend-five.vercel.app/api/v1/reservations", {
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

    if (!response.ok) {
        throw new Error("Cannot create new Reservation")
    }

    return await response.json()
}