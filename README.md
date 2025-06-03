# Daily Itinerary Component

A React component that displays a daily itinerary with drag-and-drop functionality for reordering activities within each day. This project is built with [Next.js](https://nextjs.org) and bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Features

- Displays itinerary data in a responsive layout
- Smooth drag-and-drop reordering of activities within each day
- Mobile-friendly with touch support
- Keyboard accessible
- Responsive design (mobile and desktop layouts)

## Technologies Used

- React
- TypeScript
- Next.js
- Tailwind CSS for styling
- @dnd-kit libraries:
  - @dnd-kit/core: Core drag-and-drop functionality
  - @dnd-kit/sortable: Sortable functionality
  - @dnd-kit/accessibility: Accessibility features

## Getting Started

First, install dependencies and run the development server:

```bash
npm install && npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses Tailwind CSS for styling and @dnd-kit libraries for drag-and-drop functionality.

## How It Works

### Data Structure

The itinerary data is structured as an array of day objects, where each day has an ID, date, and list of activities. Activities have their own IDs, titles, and times.

### Drag-and-Drop Implementation

The drag-and-drop functionality is implemented using the @dnd-kit libraries. When a user drags an activity:

1. The `handleDragStart` function captures the active item and sets up the drag overlay
2. While dragging, the active item is visually lifted and given a shadow
3. Other items smoothly animate to show the potential insertion point
4. On drag end, the `handleDragEnd` function updates the state with the new order using the `arrayMove` utility

The state update looks like this:

```typescript
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
```

## Component Structure

- `DailyItineraryList`: Main container component that manages state and renders days
- `DailyItineraryDay`: Renders a single day with its activities
- `ActivityCard`: Renders a single activity with drag handle

## Accessibility

The component includes proper ARIA roles and supports keyboard navigation for accessibility:

- Activity containers have `role="list"`
- Activity items have `role="listitem"`
- Drag handles have `aria-label="Drag to reorder"` and `tabIndex={0}`
- Keyboard support for dragging with Space/Enter keys

## Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [@dnd-kit Documentation](https://docs.dndkit.com/)

## Deployment

This project can be deployed on [Vercel](https://vercel.com) or any other platform that supports Next.js applications.
"# Drag_and_Drop" 
