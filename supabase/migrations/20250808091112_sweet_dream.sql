/*
  # Fix signup error by making profile columns nullable

  1. Changes
    - Make `first_name`, `last_name`, and `age` columns nullable in profiles table
    - This allows users to sign up without immediately providing all profile information
    - Users can complete their profile after successful registration

  2. Security
    - Maintains existing RLS policies
    - No changes to authentication flow
*/

-- Make first_name, last_name, and age columns nullable
ALTER TABLE profiles 
ALTER COLUMN first_name DROP NOT NULL,
ALTER COLUMN last_name DROP NOT NULL,
ALTER COLUMN age DROP NOT NULL;

-- Remove the age constraint temporarily and recreate it to allow NULL values
ALTER TABLE profiles DROP CONSTRAINT IF EXISTS profiles_age_check;
ALTER TABLE profiles ADD CONSTRAINT profiles_age_check CHECK (age IS NULL OR (age > 0 AND age < 150));