import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://yxvqibqdjrbilirlhsuo.supabase.co';

const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl4dnFpYnFkanJiaWxpcmxoc3VvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM1Nzk5ODIsImV4cCI6MjA5OTE1NTk4Mn0.YjZmkO_negPnpF36GQtQnYA4P-_9lOW9Yh22UBnpJQo';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
