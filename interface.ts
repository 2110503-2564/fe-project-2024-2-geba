
export interface CoWorkingSpaceItem {
  _id: string;
  name: string;
  address: string;
  tel: string;
  open_time: string;
  close_time: string;
}

export interface CoWorkingSpaceJson {
  success: boolean;
  count: number;
  pagination: Object;
  data: CoWorkingSpaceItem[];
}

export interface ReservationItem {
  user: string;
  reserveDate: string;
  coWorkingSpace: string;
}

