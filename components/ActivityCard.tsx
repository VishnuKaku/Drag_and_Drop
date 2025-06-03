'use client';

import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Activity } from '../data/itineraryMock';

interface ActivityCardProps {
  activity: Activity;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ activity }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: activity.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-white rounded-2xl shadow-md px-6 py-4 flex items-center justify-between ${isDragging ? 'transform scale-105 shadow-xl z-10' : ''} transition-all duration-200 ease-in-out`}
      role="listitem"
    >
      <div className="flex items-center space-x-4 w-full">
        <span className="text-gray-600 font-medium">{activity.time}</span>
        <span className="text-gray-800">{activity.title}</span>
      </div>
      <div
        {...attributes}
        {...listeners}
        className="text-gray-400 cursor-grab opacity-0 hover:opacity-100 focus:opacity-100 transition-opacity duration-200"
        aria-label="Drag to reorder"
        tabIndex={0}
      >
        ⋮⋮
      </div>
    </div>
  );
};

export default ActivityCard;