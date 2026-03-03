'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Loader2, Sparkles } from 'lucide-react';
import { sendMessage } from '../actions/chat';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Welcome to Zerin Heritage! ✨ I\'m your personal fashion consultant. How may I assist you today with our luxury collections?',
      timestamp: new Date().toISOString(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = {
      role: 'user',
      content: input.trim(),
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const conversationHistory = messages.map(msg => ({
        role: msg.role,
        content: msg.content,
      }));

      const response = await sendMessage(input.trim(), conversationHistory);

      if (response.success) {
        const assistantMessage = {
          role: 'assistant',
          content: response.message,
          timestamp: response.timestamp,
        };
        setMessages(prev => [...prev, assistantMessage]);
      } else {
        const errorMessage = {
          role: 'assistant',
          content: response.message,
          timestamp: new Date().toISOString(),
        };
        setMessages(prev => [...prev, errorMessage]);
      }
    } catch (error) {
      const errorMessage = {
        role: 'assistant',
        content: 'I apologize for the inconvenience. Please try again or contact us at support@zerinheritage.com 💌',
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickQuestions = [
    'What are your prices?',
    'Tell me about Eid collection',
    'How to care for silk?',
    'Delivery information',
  ];

  const handleQuickQuestion = (question) => {
    setInput(question);
    setTimeout(() => handleSend(), 100);
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-4 md:bottom-8 md:right-6 z-50 w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-[#C5A059] to-[#B8935A] text-white rounded-full shadow-2xl flex items-center justify-center hover:shadow-[#C5A059]/50 transition-all duration-300"
            aria-label="Open chat"
          >
            <MessageCircle size={24} className="md:hidden" />
            <MessageCircle size={28} className="hidden md:block" />
            <motion.div
              className="absolute -top-1 -right-1 w-4 h-4 bg-[#D10056] rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed bottom-6 md:bottom-8 right-4 md:right-6 z-50 w-[92vw] md:w-full md:max-w-md h-[500px] md:h-[600px] bg-white rounded-2xl md:rounded-3xl shadow-2xl flex flex-col overflow-hidden"
            style={{ maxHeight: '60vh' }}
          >
            <div className="bg-gradient-to-r from-[#C5A059] to-[#B8935A] text-white px-4 py-3 md:px-6 md:py-4 flex items-center justify-between rounded-t-2xl md:rounded-t-3xl">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Sparkles size={16} className="md:hidden" />
                  <Sparkles size={20} className="hidden md:block" />
                </div>
                <div>
                  <h3 className="font-serif text-base md:text-lg font-semibold">Zerin Heritage</h3>
                  <p className="text-[10px] md:text-xs text-white/90">Fashion Consultant</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/20 rounded-full p-1.5 md:p-2 transition-colors"
                aria-label="Close chat"
              >
                <X size={18} className="md:hidden" />
                <X size={20} className="hidden md:block" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-3 md:space-y-4 bg-gradient-to-b from-white to-[#FFF9F5]">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-xl md:rounded-2xl px-3 py-2 md:px-4 md:py-3 ${
                      message.role === 'user'
                        ? 'bg-gradient-to-br from-[#C5A059] to-[#B8935A] text-white'
                        : 'bg-white text-[#2C2C2C] shadow-md border border-gray-100'
                    }`}
                  >
                    <p className="text-xs md:text-sm font-sans leading-relaxed whitespace-pre-wrap">
                      {message.content}
                    </p>
                    <p className={`text-[9px] md:text-[10px] mt-1 ${
                      message.role === 'user' ? 'text-white/70' : 'text-gray-400'
                    }`}>
                      {new Date(message.timestamp).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </motion.div>
              ))}

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-white rounded-xl md:rounded-2xl px-3 py-2 md:px-4 md:py-3 shadow-md border border-gray-100">
                    <div className="flex items-center gap-2">
                      <Loader2 size={14} className="md:hidden animate-spin text-[#C5A059]" />
                      <Loader2 size={16} className="hidden md:block animate-spin text-[#C5A059]" />
                      <p className="text-xs md:text-sm text-gray-500">Typing...</p>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {messages.length === 1 && (
              <div className="px-3 py-2 md:px-4 border-t border-gray-100 bg-white/50">
                <p className="text-[10px] md:text-xs text-gray-500 mb-1.5 md:mb-2 font-medium">Quick questions:</p>
                <div className="flex flex-wrap gap-1.5 md:gap-2">
                  {quickQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickQuestion(question)}
                      className="text-[10px] md:text-xs px-2.5 py-1 md:px-3 md:py-1.5 bg-[#FFF9F5] text-[#C5A059] rounded-full hover:bg-[#C5A059] hover:text-white transition-colors border border-[#C5A059]/20"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="p-3 md:p-4 border-t border-gray-100 bg-white rounded-b-2xl md:rounded-b-3xl">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about our collections..."
                  disabled={isLoading}
                  className="flex-1 px-3 py-2 md:px-4 md:py-3 border border-gray-200 rounded-lg md:rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C5A059] focus:border-transparent text-xs md:text-sm font-sans disabled:bg-gray-50 disabled:cursor-not-allowed"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="px-3 py-2 md:px-4 md:py-3 bg-gradient-to-br from-[#C5A059] to-[#B8935A] text-white rounded-lg md:rounded-xl hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  aria-label="Send message"
                >
                  <Send size={16} className="md:hidden" />
                  <Send size={20} className="hidden md:block" />
                </button>
              </div>
              <p className="text-[9px] md:text-[10px] text-gray-400 mt-1.5 md:mt-2 text-center">
                Powered by Local Knowledge Base • Zerin Heritage
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
