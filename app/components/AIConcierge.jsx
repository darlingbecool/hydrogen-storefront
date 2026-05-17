import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router';

export default function AIConcierge() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          role: 'assistant',
          content: "Hello. I'm here if you have any questions about our pieces, the making process, sizing, or anything else.",
        },
      ]);
    }
  }, [isOpen]);

  async function sendMessage() {
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', content: input.trim() };
    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('https://mercer79-proxy.vercel.app/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages,
          currentPage: location.pathname,
        }),
      });

      const text = await response.text();
      console.log('Raw response:', text);
      const data = JSON.parse(text);

      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data.reply },
      ]);
    } catch (error) {
      console.log('Fetch error:', error.message);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: "I'm sorry, something went wrong. Please try again or contact us directly.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '32px',
          right: '32px',
          width: '52px',
          height: '52px',
          borderRadius: '50%',
          backgroundColor: '#1A1A1A',
          border: '1px solid #D4AF37',
          color: '#D4AF37',
          cursor: 'pointer',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '20px',
          boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
        }}
        aria-label="Open concierge"
      >
        {isOpen ? '×' : '✦'}
      </button>

      {/* Chat panel */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '96px',
            right: '32px',
            width: '360px',
            maxHeight: '520px',
            backgroundColor: '#F5F2ED',
            border: '1px solid #E8D7AE',
            borderRadius: '4px',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 999,
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: '16px 20px',
              borderBottom: '1px solid #E8D7AE',
              backgroundColor: '#1A1A1A',
              borderRadius: '4px 4px 0 0',
            }}
          >
            <p style={{ margin: 0, fontSize: '13px', color: '#D4AF37', letterSpacing: '0.08em', fontFamily: 'system-ui, sans-serif' }}>
              MERCER 79
            </p>
            <p style={{ margin: '2px 0 0', fontSize: '11px', color: '#6A6A6A', fontFamily: 'system-ui, sans-serif' }}>
              Concierge
            </p>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '85%',
                }}
              >
                <div
                  style={{
                    padding: '10px 14px',
                    borderRadius: '4px',
                    fontSize: '13px',
                    lineHeight: '1.6',
                    backgroundColor: msg.role === 'user' ? '#1A1A1A' : '#FFFFFF',
                    color: msg.role === 'user' ? '#F5F2ED' : '#1A1A1A',
                    border: msg.role === 'assistant' ? '1px solid #E8D7AE' : 'none',
                    fontFamily: 'system-ui, sans-serif',
                  }}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {isLoading && (
              <div style={{ alignSelf: 'flex-start' }}>
                <div
                  style={{
                    padding: '10px 14px',
                    borderRadius: '4px',
                    fontSize: '13px',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E8D7AE',
                    color: '#6A6A6A',
                    fontFamily: 'system-ui, sans-serif',
                  }}
                >
                  ...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div
            style={{
              padding: '12px 16px',
              borderTop: '1px solid #E8D7AE',
              display: 'flex',
              gap: '8px',
              backgroundColor: '#F5F2ED',
            }}
          >
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask a question..."
              rows={1}
              style={{
                flex: 1,
                padding: '8px 12px',
                border: '1px solid #E8D7AE',
                borderRadius: '4px',
                backgroundColor: '#FFFFFF',
                color: '#1A1A1A',
                fontSize: '13px',
                fontFamily: 'system-ui, sans-serif',
                resize: 'none',
                outline: 'none',
                lineHeight: '1.5',
              }}
            />
            <button
              onClick={sendMessage}
              disabled={isLoading || !input.trim()}
              style={{
                padding: '8px 14px',
                backgroundColor: isLoading || !input.trim() ? '#E8D7AE' : '#1A1A1A',
                color: isLoading || !input.trim() ? '#6A6A6A' : '#D4AF37',
                border: 'none',
                borderRadius: '4px',
                cursor: isLoading || !input.trim() ? 'default' : 'pointer',
                fontSize: '13px',
                fontFamily: 'system-ui, sans-serif',
                transition: 'all 0.2s',
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
