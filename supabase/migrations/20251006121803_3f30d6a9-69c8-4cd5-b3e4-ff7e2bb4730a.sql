
-- Fix the function to have search_path set
DROP FUNCTION IF EXISTS create_admin_role_for_user(TEXT);

CREATE OR REPLACE FUNCTION create_admin_role_for_user(user_email TEXT)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
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
$$;
