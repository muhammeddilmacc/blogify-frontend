'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { Notification, NotificationType } from '@/components/ui/Notification';

interface NotificationContextType {
  showNotification: (message: string, type: NotificationType, duration?: number) => void;
  showQuestion: (
    message: string,
    onConfirm?: () => void,
    onCancel?: () => void,
    inputPlaceholder?: string,
    onInputSubmit?: (value: string) => void
  ) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<React.ReactNode[]>([]);

  const removeNotification = useCallback((id: number) => {
    setNotifications(prev => prev.filter((_, index) => index !== id));
  }, []);

  const showNotification = useCallback((message: string, type: NotificationType, duration = 5000) => {
    setNotifications(prev => [
      ...prev,
      <Notification
        key={Date.now()}
        message={message}
        type={type}
        duration={duration}
        onClose={() => removeNotification(prev.length)}
      />
    ]);
  }, [removeNotification]);

  const showQuestion = useCallback(
    (
      message: string,
      onConfirm?: () => void,
      onCancel?: () => void,
      inputPlaceholder?: string,
      onInputSubmit?: (value: string) => void
    ) => {
      setNotifications(prev => [
        ...prev,
        <Notification
          key={Date.now()}
          message={message}
          type="question"
          isQuestion={true}
          duration={0}
          onClose={() => removeNotification(prev.length)}
          onConfirm={onConfirm}
          onCancel={onCancel}
          inputPlaceholder={inputPlaceholder}
          onInputSubmit={onInputSubmit}
        />
      ]);
    },
    [removeNotification]
  );

  return (
    <NotificationContext.Provider value={{ showNotification, showQuestion }}>
      {children}
      <div className="notification-container">
        {notifications}
      </div>
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
}; 