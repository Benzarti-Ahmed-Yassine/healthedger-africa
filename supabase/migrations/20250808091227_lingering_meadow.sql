/*
  # Fix profile columns to allow NULL values

  1. Changes
    - Make `first_name` column nullable in profiles table
    - Make `last_name` column nullable in profiles table  
    - Make `age` column nullable in profiles table

  2. Security
    - No changes to RLS policies needed
    - Existing constraints and triggers remain intact

  This fixes the signup error where new users couldn't be created because
  the handle_new_user trigger couldn't insert required profile data.
*/

-- Make first_name nullable
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' 
    AND column_name = 'first_name' 
    AND is_nullable = 'NO'
  ) THEN
    ALTER TABLE profiles ALTER COLUMN first_name DROP NOT NULL;
  END IF;
END $$;

-- Make last_name nullable  
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' 
    AND column_name = 'last_name' 
    AND is_nullable = 'NO'
  ) THEN
    ALTER TABLE profiles ALTER COLUMN last_name DROP NOT NULL;
  END IF;
END $$;

-- Make age nullable
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' 
    AND column_name = 'age' 
    AND is_nullable = 'NO'
  ) THEN
    ALTER TABLE profiles ALTER COLUMN age DROP NOT NULL;
  END IF;
END $$;