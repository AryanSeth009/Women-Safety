export interface HelpRequest {
  id: string;
  user_id: string;
  location: string;
  questionnaire_completed: boolean;
  voice_verified: boolean;
  video_verified: boolean;
  status: 'pending' | 'verified' | 'connected' | 'completed';
  created_at: string;
}

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  phone_number: string;
  emergency_contacts: string[];
}