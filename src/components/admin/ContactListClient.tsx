"use client";

import React, { useState } from 'react';

type Message = {
  id: number;
  name: string;
  email: string;
  phone?: string | null;
  subject: string;
  message: string;
  created_at: string;
  handled: boolean;
};

export default function ContactListClient({ initialMessages }: { initialMessages: Message[] }) {
  const [messages, setMessages] = useState<Message[]>(initialMessages || []);

  const markHandled = async (id: number) => {
    try {
      const res = await fetch('/api/contact/handle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, handled: true }),
      });
      if (!res.ok) throw new Error('Failed');
      setMessages((m) => m.map((msg) => (msg.id === id ? { ...msg, handled: true } : msg)));
    } catch (err) {
      console.error(err);
      alert('Failed to mark message handled');
    }
  };

  return (
    <div className="space-y-4">
      {messages.length === 0 && <p className="text-sm">No messages found.</p>}
      {messages.map((msg) => (
        <div key={msg.id} className={`p-4 rounded border ${msg.handled ? 'bg-gray-50 border-gray-200' : 'bg-white border-red-200'}`}>
          <div className="flex justify-between items-start">
            <div>
              <div className="font-bold">{msg.name}</div>
              <div className="text-sm text-gray-600">{msg.email} {msg.phone ? `· ${msg.phone}` : ''}</div>
              <div className="text-sm text-gray-700 mt-2"><strong>Subject:</strong> {msg.subject}</div>
            </div>
            <div className="text-right">
              <div className="text-xs text-gray-500">{new Date(msg.created_at).toLocaleString()}</div>
              <div className="mt-2">
                <a href={`mailto:${msg.email}?subject=Re:%20${encodeURIComponent(msg.subject)}`} className="inline-block mr-2 text-sm text-blue-600">Reply</a>
                {!msg.handled && (
                  <button onClick={() => markHandled(msg.id)} className="inline-block px-3 py-1 bg-green-600 text-white rounded text-sm">Mark handled</button>
                )}
                {msg.handled && <span className="inline-block px-3 py-1 bg-gray-300 text-gray-700 rounded text-sm">Handled</span>}
              </div>
            </div>
          </div>
          <div className="mt-3 text-sm text-gray-800 whitespace-pre-wrap">{msg.message}</div>
        </div>
      ))}
    </div>
  );
}
