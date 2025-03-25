export default async function createReservation(
    token: string,
    reserveDate: Date,
    coWorkingSpace: string
  ) {
    const response = await fetch(`https://cws-backend-five.vercel.app/api/v1/coWorkingSpaces/${coWorkingSpace}/reservations`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }, 
      body: JSON.stringify({
        reserveDate: reserveDate.toISOString() 
      }), 
    });

    if (!response.ok) {
      throw new Error("Failed to create Reservation")
    }
  
    return await response.json();
  }
  