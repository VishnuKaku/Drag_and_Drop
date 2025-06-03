'use client';

import React, { useState, useEffect } from 'react';
import { DndContext, DragEndEvent, DragStartEvent, closestCenter, KeyboardSensor, PointerSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { restrictToVerticalAxis, restrictToParentElement } from '@dnd-kit/modifiers';
import { DragOverlay } from '@dnd-kit/core';
import { itineraryData, Day, Activity } from '../data/itineraryMock';
import DailyItineraryDay from './DailyItineraryDay';
import ActivityCard from './ActivityCard';

const DailyItineraryList: React.FC = () => {
  const [days, setDays] = useState<Day[]>(itineraryData);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeActivity, setActiveActivity] = useState<Activity | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  // Add useEffect to handle client-side mounting
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Configure sensors for mouse, touch, and keyboard interactions
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // 8px of movement required before activating
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 200, // 200ms delay for long-press on touch devices
        tolerance: 5, // 5px of movement allowed during delay
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveId(active.id.toString());

    // Find the active activity
    for (const day of days) {
      const activity = day.activities.find(a => a.id === active.id);
      if (activity) {
        setActiveActivity(activity);
        break;
      }
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    setActiveId(null);
    setActiveActivity(null);
    
    if (!over || active.id === over.id) return;

    // Find which day contains the dragged item
    const dayId = days.find(day => 
      day.activities.some(activity => activity.id === active.id)
    )?.id;

    if (!dayId) return;

    // Update the activities order for that specific day
    setDays(prevDays => 
      prevDays.map(day => 
        day.id === dayId
          ? {
              ...day,
              activities: arrayMove(
                day.activities,
                day.activities.findIndex(a => a.id === active.id),
                day.activities.findIndex(a => a.id === over.id)
              )
            }
          : day
      )
    );
  };

  const handleActivitiesReordered = (dayId: string, reorderedActivities: Day['activities']) => {
    setDays(prevDays => 
      prevDays.map(day => 
        day.id === dayId
          ? { ...day, activities: reorderedActivities }
          : day
      )
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8 text-center">Daily Itinerary</h1>
      
      {isMounted ? (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          modifiers={[restrictToVerticalAxis, restrictToParentElement]}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {days.map(day => (
              <DailyItineraryDay 
                key={day.id} 
                day={day} 
                onActivitiesReordered={handleActivitiesReordered} 
              />
            ))}
          </div>

          {/* Drag Overlay for visual feedback */}
          <DragOverlay>
            {activeId && activeActivity ? (
              <div className="transform scale-105 shadow-xl transition-all duration-200 ease-in-out">
                <ActivityCard activity={activeActivity} />
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {days.map(day => (
            <div key={day.id} className="bg-gray-50 rounded-lg shadow-sm sm:p-6 p-4">
              <h2 className="text-xl font-bold mb-6">
                {new Date(day.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </h2>
              
              <div role="list" className="space-y-4">
                {day.activities.map((activity) => (
                  <div 
                    key={activity.id}
                    className="bg-white rounded-2xl shadow-md px-6 py-4 flex items-center justify-between transition-all duration-200 ease-in-out"
                    role="listitem"
                  >
                    <div className="flex items-center space-x-4 w-full">
                      <span className="text-gray-600 font-medium">{activity.time}</span>
                      <span className="text-gray-800">{activity.title}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DailyItineraryList;