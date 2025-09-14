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
          <PhonePanel
            calls={recentCalls}
            onStartCall={startVideoCall}
          />
        );
      
      case 'text':
        return (
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
          <VideoPanel
            meetings={videoMeetings}
            onStartVideoCall={startVideoCall}
          />
        );
      
      case 'calendar':
        return (
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
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-500 dark:text-gray-400">
              Select a communication channel to get started
            </p>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-800">
      {/* Communication Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <CommunicationTabs
          tabs={communicationTabs}
          activeTab={activeCrmTab}
          onTabChange={setActiveCrmTab}
        />
      </div>

      {/* Communication Content */}
      <div className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCrmTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="h-full p-4 overflow-y-auto bg-gray-50 dark:bg-gray-900"
          >
            {renderActivePanel()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
