export interface Activity {
  id: string;
  title: string;
  time: string;
}

export interface Day {
  id: string;
  date: string;
  activities: Activity[];
}

export const itineraryData: Day[] = [
  {
    id: 'day-1',
    date: '2025-06-10',
    activities: [
      { id: 'a1', title: 'Visit Eiffel Tower', time: '09:00 AM' },
      { id: 'a2', title: 'Lunch at Le Jules Verne', time: '12:30 PM' },
      { id: 'a3', title: 'Seine River Cruise', time: '03:00 PM' }
    ]
  },
  {
    id: 'day-2',
    date: '2025-06-11',
    activities: [
      { id: 'b1', title: 'Louvre Museum', time: '10:00 AM' },
      { id: 'b2', title: 'Notre Dame Visit', time: '01:00 PM' }
    ]
  }
];