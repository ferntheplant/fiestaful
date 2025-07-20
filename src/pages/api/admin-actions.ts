import type { APIRoute } from 'astro';
import { supabase } from '../../lib/supabase';

interface EventData {
  id: string;
}

interface EventUpdateData {
  name: string;
  date?: string;
  time?: string | null;
  location?: string | null;
  description?: string | null;
  accepting_rsvps: boolean;
  is_public: boolean;
}

type AdminAction = 'update_event' | 'post_update';

export const POST: APIRoute = async ({ request }) => {
  try {
    // Check if Supabase is configured
    if (!supabase) {
      return new Response('Database not configured', { status: 500 });
    }

    const formData = await request.formData();
    const action = formData.get('action') as AdminAction;

    // Get event ID (assuming single event per deployment)
    const { data: eventData, error: eventError } = await supabase
      .from('event')
      .select('id')
      .single();

    if (eventError || !eventData) {
      return new Response('Event not found', { status: 404 });
    }

    const event = eventData as EventData;

    if (action === 'update_event') {
      // Update event details
      const name = formData.get('name')?.toString().trim();
      const date = formData.get('date')?.toString();
      const time = formData.get('time')?.toString().trim();
      const location = formData.get('location')?.toString().trim();
      const description = formData.get('description')?.toString().trim();
      const accepting_rsvps = formData.has('accepting_rsvps');
      const is_public = formData.has('is_public');

      // Validation
      if (!name || name.length < 2) {
        return new Response('Invalid event name', { status: 400 });
      }

      const updateData: EventUpdateData = {
        name,
        time: time || null,
        location: location || null,
        description: description || null,
        accepting_rsvps,
        is_public
      };

      // Add date if provided
      if (date) {
        updateData.date = date;
      }

      const { error: updateError } = await supabase
        .from('event')
        .update(updateData)
        .eq('id', event.id);

      if (updateError) {
        console.error('Error updating event:', updateError);
        return new Response('Failed to update event', { status: 500 });
      }

      return new Response(null, {
        status: 302,
        headers: {
          'Location': '/admin?success=Event updated successfully'
        }
      });

    } else if (action === 'post_update') {
      // Post an update
      const content = formData.get('content')?.toString().trim();

      if (!content || content.length < 5) {
        return new Response('Update content is too short', { status: 400 });
      }

      const { error: insertError } = await supabase
        .from('updates')
        .insert({
          event_id: event.id,
          content
        });

      if (insertError) {
        console.error('Error posting update:', insertError);
        return new Response('Failed to post update', { status: 500 });
      }

      return new Response(null, {
        status: 302,
        headers: {
          'Location': '/admin?success=Update posted successfully'
        }
      });

    } else {
      return new Response('Invalid action', { status: 400 });
    }

  } catch (error) {
    console.error('Admin API error:', error);
    return new Response('Internal server error', { status: 500 });
  }
}; 