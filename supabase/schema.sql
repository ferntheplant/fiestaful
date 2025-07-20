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

-- Insert a default event for new deployments
INSERT INTO event (
  name,
  date,
  time,
  location,
  description,
  admin_password_hash,
  guest_password_hash
) VALUES (
  'My Special Event',
  '2024-12-31 18:00:00',
  '6:00 PM',
  '123 Main Street, City, State',
  'Join us for a wonderful celebration!',
  '$2a$10$default.admin.password.hash.here',
  '$2a$10$default.guest.password.hash.here'
); 