'use client';

import React, { useEffect, useState, useRef } from 'react';
import { X, CheckCircle2, AlertCircle, HelpCircle } from 'lucide-react';

export type NotificationType = 'success' | 'error' | 'question';

interface NotificationProps {
  message: string;
  type: NotificationType;
  duration?: number;
  onClose: () => void;
  isQuestion?: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
  inputPlaceholder?: string;
  onInputSubmit?: (value: string) => void;
}

export const Notification: React.FC<NotificationProps> = ({
  message,
  type,
  duration = 5000,
  onClose,
  isQuestion = false,
  onConfirm,
  onCancel,
  inputPlaceholder,
  onInputSubmit,
}) => {
  const [progress, setProgress] = useState(100);
  const [inputValue, setInputValue] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  const [isEntering, setIsEntering] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const currentProgressRef = useRef(100);

  useEffect(() => {
    setIsEntering(true);
    const enterTimeout = setTimeout(() => setIsEntering(false), 50);
    return () => clearTimeout(enterTimeout);
  }, []);

  useEffect(() => {
    let animationFrameId: number;

    const animate = (startTime: number, initialProgress: number) => {
      const totalDuration = (duration * initialProgress) / 100;

      const updateProgress = () => {
        const elapsed = Date.now() - startTime;
        const remaining = totalDuration - elapsed;
        const newProgress = Math.max(0, (remaining / totalDuration) * initialProgress);

        currentProgressRef.current = newProgress;
        setProgress(newProgress);

        if (newProgress <= 0) {
          setIsVisible(false);
          setTimeout(onClose, 500);
        } else if (!isPaused) {
          animationFrameId = requestAnimationFrame(updateProgress);
        }
      };

      animationFrameId = requestAnimationFrame(updateProgress);
    };

    if (!isQuestion && duration > 0 && !isPaused) {
      animate(Date.now(), currentProgressRef.current);
    }

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [duration, isQuestion, onClose, isPaused]);

  const handleMouseEnter = () => {
    if (!isQuestion && duration > 0) {
      setIsPaused(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isQuestion && duration > 0) {
      setIsPaused(false);
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="w-[18px] h-[18px] text-emerald-500" />;
      case 'error':
        return <AlertCircle className="w-[18px] h-[18px] text-rose-500" />;
      case 'question':
        return <HelpCircle className="w-[18px] h-[18px] text-blue-500" />;
      default:
        return null;
    }
  };

  const getIconContainerColor = () => {
    switch (type) {
      case 'success':
        return 'bg-emerald-500/10 dark:bg-emerald-500/20';
      case 'error':
        return 'bg-rose-500/10 dark:bg-rose-500/20';
      case 'question':
        return 'bg-blue-500/10 dark:bg-blue-500/20';
      default:
        return 'bg-gray-500/10 dark:bg-gray-500/20';
    }
  };

  const getBorderColor = () => {
    switch (type) {
      case 'success':
        return 'border-t-2 border-emerald-500';
      case 'error':
        return 'border-t-2 border-rose-500';
      case 'question':
        return 'border-t-2 border-blue-500';
      default:
        return 'border-t-2 border-gray-500';
    }
  };

  const getProgressColor = () => {
    switch (type) {
      case 'success':
        return 'bg-emerald-400/70';
      case 'error':
        return 'bg-rose-400/70';
      case 'question':
        return 'bg-blue-400/70';
      default:
        return 'bg-gray-400/70';
    }
  };

  return (
    <div
      className={`fixed top-4 right-4 w-[350px] transform transition-all duration-500 ease-out ${isEntering ? 'translate-x-[120%] scale-95 opacity-0' : 'translate-x-0 scale-100 opacity-100'
        } ${isVisible ? 'opacity-100' : 'translate-x-[120%] scale-95 opacity-0'}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={`bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.12)] dark:shadow-[0_4px_12px_rgba(0,0,0,0.4)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.16)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)] transition-all duration-300 ${getBorderColor()}`}
      >
        <div className="p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3 flex-1 min-w-0">
              <div className={`flex-shrink-0 p-2 rounded-lg ${getIconContainerColor()} shadow-sm`}>
                {getIcon()}
              </div>
              <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300 pt-1.5 break-words">
                {message}
              </p>
            </div>
            <button
              onClick={() => {
                setIsVisible(false);
                setTimeout(onClose, 500);
              }}
              className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 focus:outline-none transform active:scale-90 hover:scale-110 transition-all duration-200 mt-1.5"
            >
              <X size={16} strokeWidth={2.5} />
            </button>
          </div>

          {isQuestion && (
            <div className="mt-4 space-y-3 pl-[52px]">
              {inputPlaceholder && (
                <form onSubmit={(e) => {
                  e.preventDefault();
                  onInputSubmit?.(inputValue);
                }}>
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={inputPlaceholder}
                    className="w-full px-4 py-2.5 text-sm bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30 dark:text-gray-200 transition-all duration-200"
                  />
                </form>
              )}
              <div className="flex justify-end space-x-2.5">
                {onCancel && (
                  <button
                    onClick={() => {
                      onCancel();
                      setIsVisible(false);
                      setTimeout(onClose, 500);
                    }}
                    className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transform active:scale-95 hover:scale-[1.02] transition-all duration-200"
                  >
                    Hayır
                  </button>
                )}
                {onConfirm && (
                  <button
                    onClick={() => {
                      onConfirm();
                      setIsVisible(false);
                      setTimeout(onClose, 500);
                    }}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-lg shadow-md hover:shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transform active:scale-95 hover:scale-[1.02] transition-all duration-200"
                  >
                    Evet
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {!isQuestion && duration > 0 && (
          <div className="h-0.5 bg-gray-100 dark:bg-gray-700 overflow-hidden">
            <div
              className={`h-full ${getProgressColor()} transition-none ${isPaused ? 'animate-pulse' : ''
                }`}
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>
    </div>
  );
};