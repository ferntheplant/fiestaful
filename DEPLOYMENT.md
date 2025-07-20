# 🚀 Deployment Guide

This guide will walk you through deploying your Event RSVP Template to Vercel with Supabase.

## Prerequisites

- [Vercel Account](https://vercel.com) (free)
- [Supabase Account](https://supabase.com) (free tier available)
- [GitHub Account](https://github.com) (for repository hosting)

## Step 1: Fork and Deploy

### Option A: One-Click Deploy (Recommended)

1. Click the "Deploy with Vercel" button in the README
2. Sign in to Vercel with your GitHub account
3. Configure your project:
   - **Project Name**: `my-event-rsvp` (or your preferred name)
   - **Framework Preset**: Astro (should auto-detect)
   - **Root Directory**: `./` (leave as default)
4. Click "Deploy"

### Option B: Manual Deploy

1. Fork this repository to your GitHub account
2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
3. Click "New Project"
4. Import your forked repository
5. Configure settings and deploy

## Step 2: Set Up Supabase

### Create Supabase Project

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - **Name**: `event-rsvp-db` (or your preferred name)
   - **Database Password**: Generate a strong password
   - **Region**: Choose closest to your event location
5. Click "Create new project"

### Configure Database

1. In your Supabase project, go to **SQL Editor**
2. Copy and paste the contents of `supabase/schema.sql`
3. Click "Run" to create the tables
4. Go to **Table Editor** → **event** table
5. Update the default passwords:

   ```sql
   UPDATE event SET 
     admin_password_hash = 'your_admin_password',
     guest_password_hash = 'your_guest_password'
   WHERE id = (SELECT id FROM event LIMIT 1);
   ```

### Get API Keys

1. Go to **Settings** → **API**
2. Copy the **Project URL** and **anon public** key
3. Keep these safe - you'll need them for Vercel

## Step 3: Configure Vercel Environment Variables

1. In your Vercel project dashboard, go to **Settings** → **Environment Variables**
2. Add the following variables:

```
PUBLIC_SUPABASE_URL=https://your-project.supabase.co
PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

3. Click "Save"
4. Go to **Deployments** and redeploy your project

## Step 4: Test Your Deployment

1. Visit your deployed URL (e.g., `https://my-event-rsvp.vercel.app`)
2. You should be redirected to the login page
3. Test with your guest password
4. Test admin access at `/admin` with your admin password

## Step 5: Customize Your Event

1. Go to `/admin` with your admin password
2. Update event details:
   - Event name and description
   - Date, time, and location
   - Event settings
3. Save changes
4. View your event page to see the updates

## Troubleshooting

### Common Issues

**"Missing Supabase environment variables"**

- Check that environment variables are set correctly in Vercel
- Ensure variable names start with `PUBLIC_`
- Redeploy after adding environment variables

**"Event not found" error**

- Make sure you've run the SQL schema in Supabase
- Check that the event table has at least one record

**Password not working**

- Verify passwords are set correctly in the database
- Check for extra spaces or special characters

**Build errors**

- Check Vercel build logs for specific error messages
- Ensure all dependencies are properly installed

### Getting Help

- Check the [Astro Documentation](https://docs.astro.build)
- Visit [Supabase Documentation](https://supabase.com/docs)
- Join the [Vercel Community](https://github.com/vercel/vercel/discussions)

## Security Notes

- Change default passwords immediately after deployment
- Use strong, unique passwords for admin access
- Consider enabling Supabase Row Level Security (RLS) for production use
- Regularly backup your database

## Next Steps

- Customize the design to match your event theme
- Add your own branding and colors
- Test the communication tools
- Share the guest password with your attendees

## Support

If you encounter issues:

1. Check the troubleshooting section above
2. Review the code comments for implementation details
3. Open an issue on the GitHub repository
4. Join the Astro Discord for community help

---

**Happy Event Planning! 🎉**
