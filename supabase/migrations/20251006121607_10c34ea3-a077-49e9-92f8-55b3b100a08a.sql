
-- Create admin user credentials
-- Note: This creates the necessary role entry. The actual auth user should be created via Supabase Auth
-- Admin credentials: admin@serviceprovider.com / Admin@123

-- First, let's create a function to safely insert admin role
CREATE OR REPLACE FUNCTION create_admin_role_for_user(user_email TEXT)
RETURNS void AS $$
DECLARE
  target_user_id UUID;
BEGIN
  -- Get user ID from auth.users by email
  SELECT id INTO target_user_id FROM auth.users WHERE email = user_email;
  
  IF target_user_id IS NOT NULL THEN
    -- Insert admin role if it doesn't exist
    INSERT INTO public.user_roles (user_id, role)
    VALUES (target_user_id, 'admin'::app_role)
    ON CONFLICT (user_id, role) DO NOTHING;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- This function will be called after the admin user signs up
