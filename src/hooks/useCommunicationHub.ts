import { useState, useEffect } from 'react';
import { 
  Bot, 
  MessageCircle, 
  Mail, 
  CheckSquare, 
  Phone, 
  MessageSquare, 
  Video, 
  Calendar, 
  FileText 
} from 'lucide-react';
import { generateAiResponse, getAiSuggestions, getWelcomeMessage } from '../lib/aiResponder';
import type { 
  UseCommunicationHubReturn, 
  CommunicationTab, 
  AIMessage, 
  ChatMessage, 
  Email, 
  NewEmail, 
  Task, 
  NewTask, 
  PhoneCall, 
  SMSMessage, 
  NewSMS, 
  VideoMeeting, 
  CalendarEvent, 
  NewEvent, 
  Note, 
  NewNote 
} from '../components/CommunicationHub/types';

export const useCommunicationHub = (): UseCommunicationHubReturn => {
  // Communication Tabs State
  const [communicationTabs, setCommunicationTabs] = useState<CommunicationTab[]>([
    {
      id: 'ai-assistant',
      label: 'AI Assistant',
      icon: Bot,
      badge: 0,
      isAI: true,
      color: 'from-purple-500 to-indigo-600',
      bgColor: 'from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20',
      borderColor: 'border-purple-200 dark:border-purple-800',
    },
    {
      id: 'chat',
      label: 'Live Chat',
      icon: MessageCircle,
      badge: 3,
      color: 'from-blue-500 to-cyan-600',
      bgColor: 'from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20',
      borderColor: 'border-blue-200 dark:border-blue-800',
    },
    {
      id: 'email',
      label: 'Email',
      icon: Mail,
      badge: 7,
      color: 'from-emerald-500 to-teal-600',
      bgColor: 'from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20',
      borderColor: 'border-emerald-200 dark:border-emerald-800',
    },
    {
      id: 'tasks',
      label: 'Tasks',
      icon: CheckSquare,
      badge: 0,
      color: 'from-orange-500 to-amber-600',
      bgColor: 'from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20',
      borderColor: 'border-orange-200 dark:border-orange-800',
    },
    {
      id: 'phone',
      label: 'Phone',
      icon: Phone,
      badge: 0,
      color: 'from-green-500 to-emerald-600',
      bgColor: 'from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20',
      borderColor: 'border-green-200 dark:border-green-800',
    },
    {
      id: 'text',
      label: 'SMS',
      icon: MessageSquare,
      badge: 2,
      color: 'from-pink-500 to-rose-600',
      bgColor: 'from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20',
      borderColor: 'border-pink-200 dark:border-pink-800',
    },
    {
      id: 'video',
      label: 'Video',
      icon: Video,
      badge: 0,
      color: 'from-red-500 to-pink-600',
      bgColor: 'from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20',
      borderColor: 'border-red-200 dark:border-red-800',
    },
    {
      id: 'calendar',
      label: 'Calendar',
      icon: Calendar,
      badge: 0,
      color: 'from-indigo-500 to-purple-600',
      bgColor: 'from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20',
      borderColor: 'border-indigo-200 dark:border-indigo-800',
    },
    {
      id: 'notes',
      label: 'Notes',
      icon: FileText,
      badge: 0,
      color: 'from-slate-500 to-gray-600',
      bgColor: 'from-slate-50 to-gray-50 dark:from-slate-900/20 dark:to-gray-900/20',
      borderColor: 'border-slate-200 dark:border-slate-800',
    },
  ]);

  const [activeCrmTab, setActiveCrmTab] = useState('ai-assistant');

  // AI Assistant State
  const welcomeMessage = getWelcomeMessage();
  const [aiMessages, setAiMessages] = useState<AIMessage[]>([
    {
      id: 1,
      type: 'ai',
      message: welcomeMessage.message,
      time: 'Just now',
      suggestions: welcomeMessage.suggestions,
    }
  ]);
  const [newAiMessage, setNewAiMessage] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);

  // Chat State
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      sender: 'John Doe',
      message: 'Hey, how is the project going?',
      time: '2 min ago',
      unread: true,
      avatar: 'JD',
      status: 'online',
    },
    {
      id: 2,
      sender: 'Sarah Wilson',
      message: 'Can we schedule a meeting for tomorrow?',
      time: '5 min ago',
      unread: true,
      avatar: 'SW',
      status: 'away',
    },
    {
      id: 3,
      sender: 'Mike Johnson',
      message: 'The report is ready for review',
      time: '1 hour ago',
      unread: false,
      avatar: 'MJ',
      status: 'offline',
    },
  ]);
  const [newChatMessage, setNewChatMessage] = useState('');

  // Email State
  const [emailList, setEmailList] = useState<Email[]>([
    {
      id: 1,
      from: 'client@company.com',
      subject: 'Project Update Required',
      time: '10 min ago',
      unread: true,
      priority: 'high',
    },
    {
      id: 2,
      from: 'team@company.com',
      subject: 'Weekly Team Meeting',
      time: '1 hour ago',
      unread: true,
      priority: 'medium',
    },
    {
      id: 3,
      from: 'support@company.com',
      subject: 'System Maintenance Notice',
      time: '2 hours ago',
      unread: false,
      priority: 'low',
    },
  ]);
  const [newEmail, setNewEmail] = useState<NewEmail>({ to: '', subject: '', body: '' });
  const [showComposeEmail, setShowComposeEmail] = useState(false);

  // Tasks State
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: 'Review project proposal',
      priority: 'high',
      due: 'Today',
      completed: false,
    },
    {
      id: 2,
      title: 'Update documentation',
      priority: 'medium',
      due: 'Tomorrow',
      completed: false,
    },
    {
      id: 3,
      title: 'Team meeting preparation',
      priority: 'low',
      due: 'Friday',
      completed: true,
    },
  ]);
  const [newTask, setNewTask] = useState<NewTask>({ title: '', priority: 'low', due: '' });
  const [showAddTask, setShowAddTask] = useState(false);

  // Phone State
  const [recentCalls, setRecentCalls] = useState<PhoneCall[]>([
    {
      id: 1,
      contact: 'John Doe',
      type: 'incoming',
      time: '2 min ago',
      duration: '5:30',
    },
    {
      id: 2,
      contact: 'Sarah Wilson',
      type: 'outgoing',
      time: '1 hour ago',
      duration: '12:45',
    },
    {
      id: 3,
      contact: 'Mike Johnson',
      type: 'missed',
      time: '3 hours ago',
      duration: '0:00',
    },
  ]);

  // SMS State
  const [smsMessages, setSmsMessages] = useState<SMSMessage[]>([
    {
      id: 1,
      contact: 'John Doe',
      message: 'Thanks for the update!',
      time: '5 min ago',
      unread: true,
    },
    {
      id: 2,
      contact: 'Sarah Wilson',
      message: 'Meeting confirmed for 2 PM',
      time: '1 hour ago',
      unread: false,
    },
  ]);
  const [newSms, setNewSms] = useState<NewSMS>({ contact: '', message: '' });
  const [showComposeSms, setShowComposeSms] = useState(false);

  // Video State
  const [videoMeetings, setVideoMeetings] = useState<VideoMeeting[]>([
    {
      id: 1,
      title: 'Team Standup',
      time: '9:00 AM',
      participants: 5,
    },
  ]);

  // Calendar State
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>([
    {
      id: 1,
      title: 'Client Meeting',
      date: 'Today',
      time: '2:00 PM',
      type: 'meeting',
      attendees: 3,
    },
    {
      id: 2,
      title: 'Project Review',
      date: 'Friday',
      time: '10:00 AM',
      type: 'meeting',
      attendees: 8,
    },
  ]);
  const [newEvent, setNewEvent] = useState<NewEvent>({ title: '', date: '', time: '', type: 'meeting' });
  const [showAddEvent, setShowAddEvent] = useState(false);

  // Notes State
  const [notes, setNotes] = useState<Note[]>([
    {
      id: 1,
      title: 'Meeting Notes - Q4 Planning',
      content: 'Discussed budget allocation and resource planning for next quarter...',
      updated: '2 hours ago',
      tags: ['meeting', 'planning'],
    },
    {
      id: 2,
      title: 'Client Feedback',
      content: 'Customer satisfaction improved by 15% this month...',
      updated: '1 day ago',
      tags: ['feedback', 'metrics'],
    },
  ]);
  const [newNote, setNewNote] = useState<NewNote>({ title: '', content: '', tags: [] });
  const [showAddNote, setShowAddNote] = useState(false);

  // Functions
  const sendAiMessage = () => {
    if (newAiMessage.trim()) {
      const userMessage: AIMessage = {
        id: Date.now(),
        type: 'user',
        message: newAiMessage,
        time: 'now',
        suggestions: []
      };
      setAiMessages(prev => [...prev, userMessage]);
      setNewAiMessage('');
      setIsAiTyping(true);

      // Simulate AI response
      setTimeout(() => {
        const aiResponse: AIMessage = {
          id: Date.now() + 1,
          type: 'ai',
          message: generateAiResponse(newAiMessage),
          time: 'now',
          suggestions: getAiSuggestions(newAiMessage)
        };
        setAiMessages(prev => [...prev, aiResponse]);
        setIsAiTyping(false);
      }, 1500);
    }
  };

  const sendChatMessage = () => {
    if (newChatMessage.trim()) {
      const message: ChatMessage = {
        id: Date.now(),
        sender: 'You',
        message: newChatMessage,
        time: 'now',
        unread: false,
        avatar: 'YO',
        status: 'online',
      };
      setChatMessages(prev => [message, ...prev]);
      setNewChatMessage('');
    }
  };

  const sendEmail = () => {
    if (newEmail.to && newEmail.subject && newEmail.body) {
      const email: Email = {
        id: Date.now(),
        from: 'you@company.com',
        subject: newEmail.subject,
        time: 'now',
        unread: false,
        priority: 'medium',
      };
      setEmailList(prev => [email, ...prev]);
      setNewEmail({ to: '', subject: '', body: '' });
      setShowComposeEmail(false);
    }
  };

  const addTask = () => {
    if (newTask.title.trim()) {
      const task: Task = {
        id: Date.now(),
        title: newTask.title,
        priority: newTask.priority,
        due: newTask.due,
        completed: false,
      };
      setTasks(prev => [task, ...prev]);
      setNewTask({ title: '', priority: 'low', due: '' });
      setShowAddTask(false);
    }
  };

  const toggleTaskCompletion = (taskId: number) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const sendSms = () => {
    if (newSms.contact && newSms.message) {
      const sms: SMSMessage = {
        id: Date.now(),
        contact: newSms.contact,
        message: newSms.message,
        time: 'now',
        unread: false,
      };
      setSmsMessages(prev => [sms, ...prev]);
      setNewSms({ contact: '', message: '' });
      setShowComposeSms(false);
    }
  };

  const startVideoCall = () => {
    // Video call logic here
    console.log('Starting video call...');
  };

  const addEvent = () => {
    if (newEvent.title && newEvent.date && newEvent.time) {
      const event: CalendarEvent = {
        id: Date.now(),
        title: newEvent.title,
        date: newEvent.date,
        time: newEvent.time,
        type: newEvent.type,
        attendees: 1,
      };
      setCalendarEvents(prev => [event, ...prev]);
      setNewEvent({ title: '', date: '', time: '', type: 'meeting' });
      setShowAddEvent(false);
    }
  };

  const addNote = () => {
    if (newNote.title && newNote.content) {
      const note: Note = {
        id: Date.now(),
        title: newNote.title,
        content: newNote.content,
        updated: 'now',
        tags: newNote.tags,
      };
      setNotes(prev => [note, ...prev]);
      setNewNote({ title: '', content: '', tags: [] });
      setShowAddNote(false);
    }
  };

  const markAsRead = (type: string, id: number) => {
    switch (type) {
      case 'chat':
        setChatMessages(prev => prev.map(msg => 
          msg.id === id ? { ...msg, unread: false } : msg
        ));
        break;
      case 'email':
        setEmailList(prev => prev.map(email => 
          email.id === id ? { ...email, unread: false } : email
        ));
        break;
      case 'sms':
        setSmsMessages(prev => prev.map(sms => 
          sms.id === id ? { ...sms, unread: false } : sms
        ));
        break;
    }
  };

  // Update badge counts
  useEffect(() => {
    const chatUnread = chatMessages.filter(msg => msg.unread).length;
    const emailUnread = emailList.filter(email => email.unread).length;
    const smsUnread = smsMessages.filter(sms => sms.unread).length;
    const taskPending = tasks.filter(task => !task.completed).length;
    const aiUnread = aiMessages.filter(msg => msg.type === 'ai' && msg.id > 1).length;
    
    setCommunicationTabs(prev => prev.map(tab => {
      switch (tab.id) {
        case 'ai-assistant': return { ...tab, badge: aiUnread };
        case 'chat': return { ...tab, badge: chatUnread };
        case 'email': return { ...tab, badge: emailUnread };
        case 'tasks': return { ...tab, badge: taskPending };
        case 'text': return { ...tab, badge: smsUnread };
        default: return { ...tab, badge: 0 };
      }
    }));
  }, [chatMessages, emailList, smsMessages, tasks, aiMessages]);

  return {
    // State
    communicationTabs,
    setCommunicationTabs,
    activeCrmTab,
    setActiveCrmTab,
    
    // AI Assistant
    aiMessages,
    setAiMessages,
    newAiMessage,
    setNewAiMessage,
    isAiTyping,
    setIsAiTyping,
    
    // Chat
    chatMessages,
    setChatMessages,
    newChatMessage,
    setNewChatMessage,
    
    // Email
    emailList,
    setEmailList,
    newEmail,
    setNewEmail,
    showComposeEmail,
    setShowComposeEmail,
    
    // Tasks
    tasks,
    setTasks,
    newTask,
    setNewTask,
    showAddTask,
    setShowAddTask,
    
    // Phone
    recentCalls,
    setRecentCalls,
    
    // SMS
    smsMessages,
    setSmsMessages,
    newSms,
    setNewSms,
    showComposeSms,
    setShowComposeSms,
    
    // Video
    videoMeetings,
    setVideoMeetings,
    
    // Calendar
    calendarEvents,
    setCalendarEvents,
    newEvent,
    setNewEvent,
    showAddEvent,
    setShowAddEvent,
    
    // Notes
    notes,
    setNotes,
    newNote,
    setNewNote,
    showAddNote,
    setShowAddNote,
    
    // Functions
    sendAiMessage,
    sendChatMessage,
    sendEmail,
    addTask,
    toggleTaskCompletion,
    sendSms,
    startVideoCall,
    addEvent,
    addNote,
    markAsRead,
  };
};