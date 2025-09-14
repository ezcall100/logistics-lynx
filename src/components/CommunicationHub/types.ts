import { LucideIcon } from 'lucide-react';

// Communication Tab Types
export interface CommunicationTab {
  id: string;
  label: string;
  icon: LucideIcon;
  badge: number;
  isAI?: boolean;
  color?: string;
  bgColor?: string;
  borderColor?: string;
}

// AI Message Types
export interface AIMessage {
  id: number;
  type: 'user' | 'ai';
  message: string;
  time: string;
  suggestions?: string[];
}

// Chat Message Types
export interface ChatMessage {
  id: number;
  sender: string;
  message: string;
  time: string;
  unread: boolean;
  avatar?: string;
  status?: 'online' | 'away' | 'offline';
}

// Email Types
export interface Email {
  id: number;
  from: string;
  subject: string;
  time: string;
  unread: boolean;
  priority: 'high' | 'medium' | 'low';
}

export interface NewEmail {
  to: string;
  subject: string;
  body: string;
}

// Task Types
export interface Task {
  id: number;
  title: string;
  priority: 'high' | 'medium' | 'low';
  due: string;
  completed: boolean;
}

export interface NewTask {
  title: string;
  priority: 'high' | 'medium' | 'low';
  due: string;
}

// Phone Call Types
export interface PhoneCall {
  id: number;
  contact: string;
  type: 'incoming' | 'outgoing' | 'missed';
  time: string;
  duration: string;
}

// SMS Types
export interface SMSMessage {
  id: number;
  contact: string;
  message: string;
  time: string;
  unread: boolean;
}

export interface NewSMS {
  contact: string;
  message: string;
}

// Video Meeting Types
export interface VideoMeeting {
  id: number;
  title: string;
  time: string;
  participants: number;
}

// Calendar Event Types
export interface CalendarEvent {
  id: number;
  title: string;
  date: string;
  time: string;
  type: 'meeting' | 'call' | 'event';
  attendees: number;
}

export interface NewEvent {
  title: string;
  date: string;
  time: string;
  type: 'meeting' | 'call' | 'event';
}

// Note Types
export interface Note {
  id: number;
  title: string;
  content: string;
  updated: string;
  tags: string[];
}

export interface NewNote {
  title: string;
  content: string;
  tags: string[];
}

// Communication Hub Hook Return Type
export interface UseCommunicationHubReturn {
  // State
  communicationTabs: CommunicationTab[];
  setCommunicationTabs: React.Dispatch<React.SetStateAction<CommunicationTab[]>>;
  activeCrmTab: string;
  setActiveCrmTab: React.Dispatch<React.SetStateAction<string>>;
  
  // AI Assistant
  aiMessages: AIMessage[];
  setAiMessages: React.Dispatch<React.SetStateAction<AIMessage[]>>;
  newAiMessage: string;
  setNewAiMessage: React.Dispatch<React.SetStateAction<string>>;
  isAiTyping: boolean;
  setIsAiTyping: React.Dispatch<React.SetStateAction<boolean>>;
  
  // Chat
  chatMessages: ChatMessage[];
  setChatMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  newChatMessage: string;
  setNewChatMessage: React.Dispatch<React.SetStateAction<string>>;
  
  // Email
  emailList: Email[];
  setEmailList: React.Dispatch<React.SetStateAction<Email[]>>;
  newEmail: NewEmail;
  setNewEmail: React.Dispatch<React.SetStateAction<NewEmail>>;
  showComposeEmail: boolean;
  setShowComposeEmail: React.Dispatch<React.SetStateAction<boolean>>;
  
  // Tasks
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  newTask: NewTask;
  setNewTask: React.Dispatch<React.SetStateAction<NewTask>>;
  showAddTask: boolean;
  setShowAddTask: React.Dispatch<React.SetStateAction<boolean>>;
  
  // Phone
  recentCalls: PhoneCall[];
  setRecentCalls: React.Dispatch<React.SetStateAction<PhoneCall[]>>;
  
  // SMS
  smsMessages: SMSMessage[];
  setSmsMessages: React.Dispatch<React.SetStateAction<SMSMessage[]>>;
  newSms: NewSMS;
  setNewSms: React.Dispatch<React.SetStateAction<NewSMS>>;
  showComposeSms: boolean;
  setShowComposeSms: React.Dispatch<React.SetStateAction<boolean>>;
  
  // Video
  videoMeetings: VideoMeeting[];
  setVideoMeetings: React.Dispatch<React.SetStateAction<VideoMeeting[]>>;
  
  // Calendar
  calendarEvents: CalendarEvent[];
  setCalendarEvents: React.Dispatch<React.SetStateAction<CalendarEvent[]>>;
  newEvent: NewEvent;
  setNewEvent: React.Dispatch<React.SetStateAction<NewEvent>>;
  showAddEvent: boolean;
  setShowAddEvent: React.Dispatch<React.SetStateAction<boolean>>;
  
  // Notes
  notes: Note[];
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
  newNote: NewNote;
  setNewNote: React.Dispatch<React.SetStateAction<NewNote>>;
  showAddNote: boolean;
  setShowAddNote: React.Dispatch<React.SetStateAction<boolean>>;
  
  // Functions
  sendAiMessage: () => void;
  sendChatMessage: () => void;
  sendEmail: () => void;
  addTask: () => void;
  toggleTaskCompletion: (taskId: number) => void;
  sendSms: () => void;
  startVideoCall: () => void;
  addEvent: () => void;
  addNote: () => void;
  markAsRead: (type: string, id: number) => void;
}
