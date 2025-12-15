-- Clean up invalid guest user IDs that are out of integer range
-- This removes any user_progress entries with user_id outside PostgreSQL integer bounds

-- Delete records with user_id out of range (keeping NULL and valid integers)
DELETE FROM user_progress 
WHERE user_id IS NOT NULL 
  AND (user_id > 2147483647 OR user_id < -2147483648);

-- Verify cleanup
SELECT COUNT(*) as remaining_invalid_records
FROM user_progress 
WHERE user_id IS NOT NULL 
  AND (user_id > 2147483647 OR user_id < -2147483648);

-- Show summary of remaining data
SELECT 
  CASE 
    WHEN user_id IS NULL THEN 'Guest (NULL)'
    WHEN user_id > 0 THEN 'Authenticated Users'
    WHEN user_id < 0 THEN 'Guest (Hashed)'
  END as user_type,
  COUNT(*) as record_count
FROM user_progress
GROUP BY 
  CASE 
    WHEN user_id IS NULL THEN 'Guest (NULL)'
    WHEN user_id > 0 THEN 'Authenticated Users'
    WHEN user_id < 0 THEN 'Guest (Hashed)'
  END
ORDER BY user_type;
