import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCommunicationHub } from '../../hooks/useCommunicationHub';
import { CommunicationTabs } from './CommunicationTabs';
import { AiAssistantPanel } from './AiAssistantPanel';
import { ChatPanel } from './ChatPanel';
import { EmailPanel } from './EmailPanel';
import { TasksPanel } from './TasksPanel';
import { PhonePanel } from './PhonePanel';
import { SmsPanel } from './SmsPanel';
import { VideoPanel } from './VideoPanel';
import { CalendarPanel } from './CalendarPanel';
import { NotesPanel } from './NotesPanel';

interface CommunicationHubProps {
  isCollapsed?: boolean;
}

export const CommunicationHub: React.FC<CommunicationHubProps> = ({
  isCollapsed = false,
}) => {
  const {
    // State
    communicationTabs,
    activeCrmTab,
    setActiveCrmTab,
    
    // AI Assistant
    aiMessages,
    newAiMessage,
    setNewAiMessage,
    isAiTyping,
    sendAiMessage,
    
    // Chat
    chatMessages,
    newChatMessage,
    setNewChatMessage,
    sendChatMessage,
    
    // Email
    emailList,
    newEmail,
    setNewEmail,
    showComposeEmail,
    setShowComposeEmail,
    sendEmail,
    
    // Tasks
    tasks,
    newTask,
    setNewTask,
    showAddTask,
    setShowAddTask,
    addTask,
    toggleTaskCompletion,
    
    // Phone
    recentCalls,
    startVideoCall,
    
    // SMS
    smsMessages,
    newSms,
    setNewSms,
    showComposeSms,
    setShowComposeSms,
    sendSms,
    
    // Video
    videoMeetings,
    
    // Calendar
    calendarEvents,
    newEvent,
    setNewEvent,
    showAddEvent,
    setShowAddEvent,
    addEvent,
    
    // Notes
    notes,
    newNote,
    setNewNote,
    showAddNote,
    setShowAddNote,
    addNote,
    
    // Functions
    markAsRead,
  } = useCommunicationHub();

  if (isCollapsed) {
    return null;
  }

  const renderActivePanel = () => {
    switch (activeCrmTab) {
      case 'ai-assistant':
        return (
    <AiAssistantPanel
            messages={aiMessages}
            newMessage={newAiMessage}
            setNewMessage={setNewAiMessage}
            isTyping={isAiTyping}
            onSendMessage={sendAiMessage}
          />
        );
      
      case 'chat':
        return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
          <ChatPanel
            messages={chatMessages}
            newMessage={newChatMessage}
            setNewMessage={setNewChatMessage}
            onSendMessage={sendChatMessage}
            onMarkAsRead={(id) => markAsRead('chat', id)}
          />
        );
      
      case 'email':
        return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
          <EmailPanel
            emails={emailList}
            newEmail={newEmail}
            setNewEmail={setNewEmail}
            showComposeEmail={showComposeEmail}
            setShowComposeEmail={setShowComposeEmail}
            onSendEmail={sendEmail}
            onMarkAsRead={(id) => markAsRead('email', id)}
          />
        );
      
      case 'tasks':
        return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
          <TasksPanel
            tasks={tasks}
            newTask={newTask}
            setNewTask={setNewTask}
            showAddTask={showAddTask}
            setShowAddTask={setShowAddTask}
            onAddTask={addTask}
            onToggleTaskCompletion={toggleTaskCompletion}
          />
        );
      
      case 'phone':
        return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
          <PhonePanel
            calls={recentCalls}
            onStartCall={startVideoCall}
          />
        );
      
      case 'text':
        return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
          <SmsPanel
            messages={smsMessages}
            newSms={newSms}
            setNewSms={setNewSms}
            showComposeSms={showComposeSms}
            setShowComposeSms={setShowComposeSms}
            onSendSms={sendSms}
            onMarkAsRead={(id) => markAsRead('sms', id)}
          />
        );
      
      case 'video':
        return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
          <VideoPanel
            meetings={videoMeetings}
            onStartVideoCall={startVideoCall}
          />
        );
      
      case 'calendar':
        return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
          <CalendarPanel
            events={calendarEvents}
            newEvent={newEvent}
            setNewEvent={setNewEvent}
            showAddEvent={showAddEvent}
            setShowAddEvent={setShowAddEvent}
            onAddEvent={addEvent}
          />
        );
      
      case 'notes':
        return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
          <NotesPanel
            notes={notes}
            newNote={newNote}
            setNewNote={setNewNote}
            showAddNote={showAddNote}
            setShowAddNote={setShowAddNote}
            onAddNote={addNote}
          />
        );
      
      default:
        return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
          <div className="flex items-center justify-center h-64 responsive-container sm:flex-col md:flex-row lg:grid">
            <p className="text-gray-500 dark:text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">
              Select a communication channel to get started
            </p>
          </div>
        );
    }
  };

  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
    <div className="flex flex-col h-full bg-white dark:bg-gray-800 responsive-container sm:flex-col md:flex-row lg:grid">
      {/* Communication Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700 responsive-container sm:flex-col md:flex-row lg:grid">
        <CommunicationTabs
          tabs={communicationTabs}
          activeTab={activeCrmTab}
          onTabChange={setActiveCrmTab}
        />
      </div>

      {/* Communication Content */}
      <div className="flex-1 overflow-hidden responsive-container sm:flex-col md:flex-row lg:grid">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCrmTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="h-full p-4 overflow-y-auto bg-gray-50 dark:bg-gray-900 responsive-container sm:flex-col md:flex-row lg:grid"
          >
            {renderActivePanel()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};