# 🎉 Event Popup System Documentation

## Overview
The Event Popup System displays an automatic modal on the Events page that showcases upcoming events. Users can close the popup, but it will reappear on page refresh.

---

## ✨ Features

### 1. **Automatic Popup Display**
- Automatically shows for upcoming events (within 7 days)
- Displays event details with image, title, and key information
- Auto-opens when user first visits the events page

### 2. **User Control**
- Users can close the popup by:
  - Clicking the ✕ button in the top-right
  - Clicking the "Close" button
  - Clicking the backdrop (dark overlay)
- Popup persists on page refresh (no persistent storage)

### 3. **Event Status Labels**
- **Upcoming Event** - Shows in blue for events within 7 days from today
- **Past Event** - Shows in gray for events that have already occurred

### 4. **Navigation**
- Direct link to view full event details
- "View Event Details" button in the popup
- Links to event detail page (`/events/{slug}`)

---

## 🔧 Components

### EventPopup Component
**Location:** `src/components/EventPopup.tsx`

**Features:**
- Client-side component using React hooks
- Fetches upcoming events from API
- Determines event status based on date
- Displays modal with event information
- Responsive design (mobile, tablet, desktop)

**Props:** None (fetches data internally)

**State:**
- `event` - Currently displayed event data
- `isOpen` - Popup visibility state
- `eventStatus` - "upcoming" or "past"

---

## 🎯 How It Works

### Flow Diagram
```
User visits Events page
        ↓
EventPopup component mounts
        ↓
Fetches upcoming events from API
        ↓
Checks event date vs today
        ↓
If event is within 7 days:
  └─ Set status to "upcoming"
  └─ Auto-open popup (isOpen = true)
        ↓
User sees popup with event details
        ↓
User can:
  ├─ Click "View Event Details" → Navigate to event page
  ├─ Click close button (✕) → Close popup
  ├─ Click backdrop → Close popup
  └─ Click "Close" button → Close popup
        ↓
On page refresh:
  └─ Same event popup reappears
```

---

## 📱 Responsive Design

### Mobile (≤640px)
- Full-width popup with padding
- Stacked buttons (flex-col)
- Optimized spacing and font sizes

### Tablet (641px - 1024px)
- Slightly larger popup
- Improved spacing
- Better text sizing

### Desktop (≥1025px)
- Max-width: 2xl (42rem)
- Horizontal buttons (flex-row on larger screens)
- Larger images and text

---

## 🔌 API Integration

### Endpoint
**URL:** `/api/content/events`

**Parameters:**
- `upcoming=true` - Filter events within next 7 days
- `limit=1` - Get only 1 event

**Example Request:**
```
GET /api/content/events?upcoming=true&limit=1
```

**Response:**
```json
{
  "data": [
    {
      "id": "uuid",
      "title": "Community Durbar",
      "slug": "community-durbar",
      "description": "Event description...",
      "image_url": "https://...",
      "start_date": "2026-02-05T10:00:00Z",
      "venue": "Assembly Hall",
      "location": "Ngleshie Amanfro"
    }
  ]
}
```

---

## 📅 Date Logic

### Event Status Determination

```javascript
const eventDate = new Date(event.start_date);
const today = new Date();
const oneWeekFromNow = new Date();
oneWeekFromNow.setDate(oneWeekFromNow.getDate() + 7);

if (eventDate <= today) {
  status = "past"; // Event already happened
} else if (eventDate >= today && eventDate <= oneWeekFromNow) {
  status = "upcoming"; // Event is within next 7 days
}
```

### Timeline Example
```
Today: Jan 26, 2026
├─ Jan 20 event → "Past Event"
├─ Jan 27 event → "Upcoming Event" (popup shows)
├─ Jan 30 event → "Upcoming Event" (popup shows)
├─ Feb 02 event → "Upcoming Event" (popup shows)
├─ Feb 03 event → "Upcoming Event" (popup shows, last day in 7-day window)
└─ Feb 04 event → Not displayed (beyond 7 days)
```

---

## 🎨 Visual Design

### Colors
- **Upcoming Badge:** Blue (`bg-blue-600`)
- **Past Badge:** Gray (`bg-gray-600`)
- **Primary Button:** Dark Red (`bg-[#8B0000]`)
- **Border Color:** Light Gray (`border-gray-300`)

### Spacing (Tailwind)
- Popup max-width: `max-w-2xl`
- Padding: `p-6 sm:p-8`
- Image height: `h-[200px] sm:h-[250px] md:h-[300px]`

### Typography
- Font family: Aptos (or system fonts)
- Title: `text-2xl sm:text-3xl font-bold`
- Description: `text-gray-700 text-sm sm:text-base`
- Labels: `text-xs sm:text-sm font-semibold`

---

## 🚀 Usage

### Adding to a Page
```tsx
import EventPopup from "@/components/EventPopup";

export default function MyPage() {
  return (
    <>
      <EventPopup />
      {/* Rest of page content */}
    </>
  );
}
```

### Customization

#### Change 7-Day Window
Edit `src/components/EventPopup.tsx`:
```javascript
// Change this line:
oneWeekFromNow.setDate(oneWeekFromNow.getDate() + 7);

// To (e.g., 14 days):
oneWeekFromNow.setDate(oneWeekFromNow.getDate() + 14);
```

#### Change Auto-Open Behavior
```javascript
// Instead of:
setIsOpen(true); // Auto-open

// Use:
// setIsOpen(false); // Don't auto-open
```

#### Customize Colors
Edit the `className` in the badge:
```tsx
// Change from:
className={`... ${eventStatus === "upcoming" ? "bg-blue-600" : "bg-gray-600"}`}

// To custom colors:
className={`... ${eventStatus === "upcoming" ? "bg-green-600" : "bg-purple-600"}`}
```

---

## 📋 File Structure

```
src/
├── components/
│   └── EventPopup.tsx          ← Popup component
├── app/
│   ├── events/
│   │   └── page.tsx            ← Events page (includes popup)
│   └── api/
│       └── content/
│           └── events/
│               └── route.ts    ← API endpoint
```

---

## 🔍 Testing

### Test Cases

**1. Popup Display**
- [ ] Visit `/events` page
- [ ] Popup appears if upcoming event exists
- [ ] Event title, description, and image display
- [ ] Status badge shows "Upcoming Event"

**2. User Interaction**
- [ ] Close button (✕) closes popup
- [ ] "Close" button closes popup
- [ ] Clicking backdrop closes popup
- [ ] Popup reappears on refresh

**3. Navigation**
- [ ] "View Event Details" button links to correct event page
- [ ] Link format is `/events/{slug}`

**4. Date Logic**
- [ ] Popup shows only for events within 7 days
- [ ] Past events show "Past Event" label
- [ ] Upcoming events show "Upcoming Event" label
- [ ] Events beyond 7 days don't show popup

**5. Responsive Design**
- [ ] Popup displays correctly on mobile
- [ ] Popup displays correctly on tablet
- [ ] Popup displays correctly on desktop
- [ ] Images scale properly
- [ ] Buttons stack correctly on mobile

---

## 🐛 Troubleshooting

### Popup Not Showing
1. Check if there are any published events with `is_published: true`
2. Verify event `start_date` is within next 7 days
3. Check browser console for API errors
4. Ensure `/api/content/events` endpoint is working

### Popup Shows But No Image
- Check if `image_url` is correctly set in event
- Verify image URL is accessible
- Check browser network tab for image load errors

### Date Showing Incorrectly
- Verify event `start_date` format is correct (ISO 8601)
- Check timezone settings (API uses UTC)
- Confirm browser timezone is correct

### Popup Not Closing
- Check if z-index is conflicting with other elements
- Verify click handlers are working (console.log for debugging)
- Check if modal backdrop is clickable

---

## 📊 Event Database Schema

```sql
CREATE TABLE events (
    id UUID PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    image_url TEXT,
    start_date TIMESTAMP WITH TIME ZONE NOT NULL,
    venue VARCHAR(255),
    location TEXT,
    is_published BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE
);
```

---

## 🎯 Future Enhancements

Potential improvements:

1. **Multiple Events**
   - Show carousel of multiple upcoming events
   - Auto-rotate through events

2. **Persistent State**
   - Use localStorage to remember if user closed popup
   - Show only once per session

3. **Animations**
   - Fade-in/out transitions
   - Slide animation for modal
   - Progress indicator for events

4. **Notifications**
   - Email reminders for events
   - Browser push notifications
   - Event countdown timer

5. **Customization**
   - Admin panel to enable/disable popup
   - Custom popup message
   - Custom button text

6. **Analytics**
   - Track popup views
   - Track click-through to event details
   - Monitor user engagement

---

## 📚 Related Documentation

- [Events Page](/src/app/events/page.tsx)
- [Events API](/src/app/api/content/events/route.ts)
- [Event Detail Page](/src/app/events/[slug]/page.tsx)
- Database Schema: [Events Table](supabase/migrations/)

---

## ✅ Deployment Checklist

Before deploying to production:

- [ ] Test popup on all device sizes
- [ ] Verify API endpoint is working
- [ ] Check event data in production database
- [ ] Test popup closing functionality
- [ ] Verify event detail links work
- [ ] Check image loading and optimization
- [ ] Monitor performance in production
- [ ] Set up error logging
- [ ] Document any custom modifications

