# Build a 1-Click Deployable Event RSVP Template

## Mission

Create a complete web application template that allows non-technical users to deploy their own personal event RSVP page with a single click via Vercel. Each deployment creates a disposable, single-event application optimized for small social gatherings (<50 people).

## Core Requirements

### Deployment Experience

- **One-click deployment**: Users click "Deploy to Vercel" button and get a working event page
- **Zero technical barriers**: No API key configuration, no manual environment setup
- **Single account**: Users only need to create a Vercel account (GitHub auth)
- **Disposable apps**: Each event gets its own fresh deployment, not multi-tenant

### Technical Stack (Non-Negotiable)

- **Hosting**: Vercel with GitHub integration
- **Database**: Supabase (native Vercel integration for automatic setup)
- **Frontend**: Astro framework with React islands for interactivity
- **Styling**: Tailwind CSS with mobile-first responsive design
- **Forms**: HTML forms with Astro server actions (no heavy JavaScript)
- **Data Access**: Direct Supabase SDK (no ORM)

## What You Need to Build

### 1. Database Schema

Create Supabase tables:

```sql
-- Single event per deployment
CREATE TABLE event (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  date timestamp,
  time text,
  location text,
  description text,
  admin_password_hash text NOT NULL,
  guest_password_hash text NOT NULL,
  accepting_rsvps boolean DEFAULT true,
  is_public boolean DEFAULT true,
  created_at timestamp DEFAULT now()
);

-- RSVP responses
CREATE TABLE rsvps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid REFERENCES event(id),
  guest_name text NOT NULL,
  guest_email text NOT NULL,
  guest_phone text,
  response text CHECK (response IN ('yes', 'no', 'maybe')),
  message text,
  created_at timestamp DEFAULT now()
);

-- Event updates from host
CREATE TABLE updates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid REFERENCES event(id),
  content text NOT NULL,
  created_at timestamp DEFAULT now()
);
```

### 2. Page Structure

Build these routes:

**`/` (Guest Event Page)**

- Password protection (guest password)
- Display event details
- RSVP form (HTML form, no JavaScript required)
- Show current RSVPs (if enabled by host)
- Display host updates
- Communication assistance features (mailto links, copy buttons)

**`/admin` (Host Dashboard)**

- Password protection (admin password)
- Event details management form
- RSVP list view with export capabilities
- Post updates functionality
- Event status controls (close RSVPs, make private)

**`/api/rsvp` (Form Handler)**

- Process RSVP submissions
- Validate and sanitize input
- Store in database
- Redirect with success/error message

### 3. AI-Friendly Template Structure

**Critical**: Structure all templates for easy AI modification. Use this pattern:

```astro
---
// Server-side logic here
const eventData = await getEventDetails();
---

<!-- HERO SECTION: Main event title and visual theme -->
<section class="hero-section bg-gradient-to-r from-blue-500 to-purple-600 text-white py-16">
  <div class="container mx-auto text-center">
    <h1 class="text-5xl font-bold mb-4">{eventData.name}</h1>
    <p class="text-xl opacity-90">Join us for an unforgettable celebration</p>
  </div>
</section>

<!-- EVENT DETAILS: Core event information -->
<section class="event-details bg-white py-12">
  <div class="container mx-auto max-w-2xl">
    <!-- Event info cards here -->
  </div>
</section>

<!-- RSVP SECTION: Response form and current attendees -->
<section class="rsvp-section bg-gray-50 py-12">
  <div class="container mx-auto max-w-lg">
    <!-- RSVP form here -->
  </div>
</section>
```

**Why this matters**: Hosts will use AI to modify appearance by saying "make this more elegant" or "add a beach party theme" - the AI needs clear sections to target.

### 4. Communication Assistance Features (Instead of Automated Email)

Build these helper features:

**Email Client Integration**

```javascript
// Generate mailto: links with all recipients
function generateInviteEmail(rsvps, eventDetails) {
  const emails = rsvps.map(r => r.guest_email).join(';');
  const subject = `You're invited to ${eventDetails.name}`;
  const body = `Hi there!\n\nYou're invited to ${eventDetails.name}...\n\nRSVP here: ${eventUrl}`;
  return `mailto:${emails}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
```

**Copy-to-Clipboard Features**

- "Copy All Emails" button (semicolon-separated)
- "Copy Phone Numbers" button  
- "Copy Invitation Text" button
- "Copy Event Link" button

**QR Code Generation**

- Generate QR code linking to event page
- Downloadable image for sharing

**Calendar File Generation**

- Generate .ics file for event
- "Add to Calendar" download button

### 5. Password Protection System

**Guest Access**

```astro
---
// /src/pages/index.astro
const { request } = Astro;
const formData = await request.formData();
const password = formData.get('password');

if (!password || !await verifyGuestPassword(password)) {
  return Astro.redirect('/login');
}
---
```

**Admin Access**

- Similar password check for `/admin`
- Simple session management (cookies)
- Separate admin password from guest password

### 6. Deploy to Vercel Button Setup

Create this URL structure:

```
https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/event-template&project-name=my-event&repository-name=my-event&stores=[{"type":"integration","integrationSlug":"supabase","productSlug":"postgres"}]
```

### 7. Critical Implementation Details

**Responsive Design**

- Mobile-first approach
- Touch-friendly form inputs
- Readable text sizes on all devices

**Form Handling**

```astro
---
// Handle RSVP submission
if (Astro.request.method === 'POST') {
  const formData = await Astro.request.formData();
  const rsvp = {
    guest_name: formData.get('name'),
    guest_email: formData.get('email'),
    response: formData.get('response'),
    message: formData.get('message'),
  };
  
  await saveRSVP(rsvp);
  return Astro.redirect('/?success=true');
}
---
```

**Progressive Enhancement**

- Works without JavaScript
- Enhanced with JavaScript where helpful
- No client-side framework dependencies for core functionality

## Success Criteria

Your implementation is successful when:

✅ **Deployment**: Non-technical user can click "Deploy to Vercel" and get working event page in <5 minutes  
✅ **Guest Experience**: Guests can find event page, enter password, RSVP without creating accounts  
✅ **Host Experience**: Host can manage event details and see RSVPs via admin dashboard  
✅ **Communication**: Host can easily copy guest lists and launch pre-populated emails  
✅ **Customization**: AI can easily modify .astro templates to change event appearance  
✅ **Mobile**: Everything works perfectly on phones  

## Key Constraints

**DO NOT BUILD:**

- Multi-event support (one event per deployment)
- Real-time features (simple page refresh is fine)
- RSVP editing (responses are final)
- Automated email/SMS sending
- Complex authentication systems
- User accounts for guests

**PRIORITIZE:**

- Simple, clear code structure
- AI-friendly template organization
- Mobile-first responsive design  
- One-click deployment experience
- Communication assistance over automation

## File Structure to Create

```
/
├── src/
│   ├── pages/
│   │   ├── index.astro (guest event page)
│   │   ├── admin.astro (host dashboard)
│   │   ├── login.astro (password entry)
│   │   └── api/
│   │       ├── rsvp.js (form handler)
│   │       └── admin-actions.js (admin functions)
│   ├── components/
│   │   ├── EventHero.astro
│   │   ├── RSVPForm.astro
│   │   ├── RSVPList.astro
│   │   └── CommunicationHelpers.astro
│   ├── layouts/
│   │   └── Layout.astro
│   └── lib/
│       ├── supabase.js (database client)
│       ├── auth.js (password verification)
│       └── utils.js (helpers)
├── README.md (with Deploy to Vercel button)
└── package.json
```

Build this step by step, testing the deployment flow as you go. Remember: the goal is zero technical barriers for hosts while giving them powerful tools to manage their events and communicate with guests.

When scaffolding the project use `pnpm`. Also use the @Astro docs and use context7 to reference up to date docs.
