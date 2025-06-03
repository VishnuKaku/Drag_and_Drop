'use client';

import React from 'react';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Day } from '../data/itineraryMock';
import ActivityCard from './ActivityCard';

interface DailyItineraryDayProps {
  day: Day;
  onActivitiesReordered: (dayId: string, reorderedActivities: Day['activities']) => void;
}

const DailyItineraryDay: React.FC<DailyItineraryDayProps> = ({ day, onActivitiesReordered }) => {
  // Format the date to display as "Month Day, Year"
  const formattedDate = new Date(day.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Get activity IDs for the SortableContext
  const activityIds = day.activities.map(activity => activity.id);

  return (
    <div className="bg-gray-50 rounded-lg shadow-sm sm:p-6 p-4">
      <h2 className="text-xl font-bold mb-6">{formattedDate}</h2>
      
      <div role="list" className="space-y-4">
        <SortableContext items={activityIds} strategy={verticalListSortingStrategy}>
          {day.activities.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </SortableContext>
      </div>
    </div>
  );
};

export default DailyItineraryDay;