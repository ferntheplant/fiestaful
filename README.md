# 🎉 Event RSVP Template

A beautiful, one-click deployable event RSVP template built with Astro, Supabase, and Tailwind CSS. Perfect for small social gatherings and events.

## ✨ Features

- **One-Click Deployment** - Deploy to Vercel with a single click
- **Password Protection** - Separate guest and admin passwords
- **Beautiful UI** - Modern, responsive design with Tailwind CSS
- **Communication Tools** - Copy guest lists, generate QR codes, download calendar files
- **Admin Dashboard** - Manage event details and view RSVPs
- **Mobile-First** - Works perfectly on all devices
- **AI-Friendly** - Easy to customize with AI tools

## 🚀 Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/event-template&project-name=my-event&repository-name=my-event&stores=[{"type":"integration","integrationSlug":"supabase","productSlug":"postgres"}])

## 📋 Prerequisites

- A [Vercel](https://vercel.com) account (free)
- A [Supabase](https://supabase.com) account (free tier available)

## 🛠️ Setup Instructions

### 1. Deploy to Vercel

Click the "Deploy with Vercel" button above, or:

1. Fork this repository
2. Go to [Vercel](https://vercel.com/new)
3. Import your forked repository
4. Add Supabase integration when prompted
5. Deploy!

### 2. Configure Supabase

After deployment:

1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Run the schema from `supabase/schema.sql`
4. Update the default passwords in the event table

### 3. Set Environment Variables

In your Vercel project settings, add:

```
PUBLIC_SUPABASE_URL=your_supabase_url
PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Customize Your Event

1. Visit your deployed site
2. Go to `/admin` with your admin password
3. Update event details, description, and settings
4. Share the guest password with your attendees

## 🎨 Customization

### Changing the Theme

The template is designed to be AI-friendly. You can easily modify:

- **Hero Section** - Main event title and visual theme
- **Event Details** - Core event information display
- **RSVP Section** - Response form and current attendees
- **Communication Helpers** - Copy buttons and communication assistance

### Using AI to Customize

Simply ask AI tools like ChatGPT or Claude to:

- "Make this more elegant"
- "Add a beach party theme"
- "Change the color scheme to red and gold"
- "Make it more formal for a wedding"

The clear section structure makes it easy for AI to understand and modify the design.

## 📱 Guest Experience

1. **Access Event** - Guests visit the event URL and enter the guest password
2. **View Details** - See event information, date, time, and location
3. **RSVP** - Submit their response with name, email, and optional message
4. **See Attendees** - View who else is coming (if enabled by host)

## 🔧 Admin Features

1. **Event Management** - Update event details, description, and settings
2. **RSVP Overview** - View all responses with detailed information
3. **Communication Tools** - Copy guest lists, generate QR codes, send emails
4. **Post Updates** - Share updates with all guests
5. **Control Access** - Open/close RSVPs, make event public/private

## 🛡️ Security

- **Password Protection** - Separate guest and admin passwords
- **Session Management** - Secure cookie-based sessions
- **Input Validation** - All form inputs are validated and sanitized
- **Rate Limiting** - Built-in protection against spam

## 📊 Database Schema

The template uses three main tables:

- **event** - Single event details and settings
- **rsvps** - Guest responses and contact information
- **updates** - Host updates and announcements

## 🎯 Use Cases

Perfect for:

- Birthday parties
- Weddings
- Corporate events
- Meetups
- Family gatherings
- Any small to medium event (<50 people)

## 🔄 Updates and Maintenance

- **Automatic Updates** - Vercel handles deployment updates
- **Database Backups** - Supabase provides automatic backups
- **No Maintenance** - Serverless architecture means no server management

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - feel free to use this template for any project!

## 🆘 Support

- **Documentation** - Check the code comments for detailed explanations
- **Issues** - Report bugs or feature requests on GitHub
- **Community** - Join the Astro Discord for help

## 🎊 Happy Event Planning

This template is designed to make event planning as simple as possible. Just deploy, customize, and share with your guests!

---

**Built with ❤️ using [Astro](https://astro.build), [Supabase](https://supabase.com), and [Tailwind CSS](https://tailwindcss.com)**
