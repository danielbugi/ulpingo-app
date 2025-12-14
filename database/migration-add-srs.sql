-- Add SRS fields to user_progress table

ALTER TABLE user_progress 
ADD COLUMN IF NOT EXISTS ease_factor DECIMAL(3,2) DEFAULT 2.5,
ADD COLUMN IF NOT EXISTS interval INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS repetitions INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS next_review_date TIMESTAMP DEFAULT NOW(),
ADD COLUMN IF NOT EXISTS last_quality INTEGER DEFAULT 0;

-- Create index for finding due reviews
CREATE INDEX IF NOT EXISTS idx_user_progress_next_review ON user_progress(next_review_date);

-- Create index for user + next review (for when we add auth)
CREATE INDEX IF NOT EXISTS idx_user_progress_user_next_review ON user_progress(user_id, next_review_date);

COMMENT ON COLUMN user_progress.ease_factor IS 'SM-2 ease factor (1.3 to 2.5+)';
COMMENT ON COLUMN user_progress.interval IS 'Days until next review';
COMMENT ON COLUMN user_progress.repetitions IS 'Number of successful repetitions';
COMMENT ON COLUMN user_progress.next_review_date IS 'When this word should be reviewed next';
COMMENT ON COLUMN user_progress.last_quality IS 'Last quality rating (0-5)';