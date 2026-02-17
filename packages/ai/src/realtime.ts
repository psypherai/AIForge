/**
 * Real-Time Collaborative AI — Supabase Realtime + AI Streaming
 *
 * Enables multiple users to collaborate on AI-powered tasks in real time:
 * - Shared chat sessions with live streaming
 * - Collaborative document editing with AI suggestions
 * - Live presence indicators for AI features
 * - Broadcast AI responses to all connected clients
 *
 * @example
 * ```tsx
 * import { useRealtimeChat, usePresence } from '@aiforge/ai/realtime';
 *
 * function CollabChat({ roomId }) {
 *   const { messages, sendMessage, participants } = useRealtimeChat(roomId);
 *   const presence = usePresence(roomId);
 *
 *   return (
 *     <View>
 *       <Text>{presence.online.length} users online</Text>
 *       {messages.map(m => <MessageBubble key={m.id} message={m} />)}
 *     </View>
 *   );
 * }
 * ```
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import type { SupabaseClient, RealtimeChannel } from '@supabase/supabase-js';

// ── Types ───────────────────────────────────────────────────────────

export interface RealtimeMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  userId: string;
  userName?: string;
  timestamp: number;
}

export interface PresenceState {
  online: Array<{ userId: string; userName: string; status: string }>;
  count: number;
}

export interface RealtimeChatConfig {
  supabase: SupabaseClient;
  roomId: string;
  userId: string;
  userName?: string;
  onMessage?: (message: RealtimeMessage) => void;
}

export interface RealtimeAIConfig {
  supabase: SupabaseClient;
  channelName: string;
  onAIResponse?: (response: { content: string; done: boolean }) => void;
}

// ── Hook: useRealtimeChat ───────────────────────────────────────────

/**
 * Real-time collaborative chat with AI responses broadcast to all clients.
 */
export function useRealtimeChat(config: RealtimeChatConfig) {
  const { supabase, roomId, userId, userName = 'Anonymous', onMessage } = config;
  const [messages, setMessages] = useState<RealtimeMessage[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const channelRef = useRef<RealtimeChannel | null>(null);

  useEffect(() => {
    const channel = supabase.channel(`chat:${roomId}`);

    channel
      .on('broadcast', { event: 'message' }, ({ payload }) => {
        const message = payload as RealtimeMessage;
        setMessages((prev) => [...prev, message]);
        onMessage?.(message);
      })
      .on('broadcast', { event: 'ai-stream' }, ({ payload }) => {
        // Handle streaming AI tokens broadcast by any participant
        const { messageId, token, done } = payload;
        setMessages((prev) => {
          const existing = prev.find((m) => m.id === messageId);
          if (existing) {
            return prev.map((m) =>
              m.id === messageId ? { ...m, content: m.content + token } : m
            );
          }
          if (!done) {
            return [
              ...prev,
              { id: messageId, role: 'assistant', content: token, userId: 'ai', timestamp: Date.now() },
            ];
          }
          return prev;
        });
      })
      .subscribe((status) => {
        setIsConnected(status === 'SUBSCRIBED');
      });

    channelRef.current = channel;

    return () => {
      channel.unsubscribe();
    };
  }, [supabase, roomId]);

  const sendMessage = useCallback(
    async (content: string) => {
      const message: RealtimeMessage = {
        id: crypto.randomUUID(),
        role: 'user',
        content,
        userId,
        userName,
        timestamp: Date.now(),
      };

      // Broadcast to all participants
      channelRef.current?.send({
        type: 'broadcast',
        event: 'message',
        payload: message,
      });

      // Also persist to database
      await supabase.from('chat_messages').insert({
        room_id: roomId,
        user_id: userId,
        role: 'user',
        content,
      });
    },
    [supabase, roomId, userId, userName]
  );

  const broadcastAIToken = useCallback(
    (messageId: string, token: string, done = false) => {
      channelRef.current?.send({
        type: 'broadcast',
        event: 'ai-stream',
        payload: { messageId, token, done },
      });
    },
    []
  );

  return {
    messages,
    sendMessage,
    broadcastAIToken,
    isConnected,
  };
}

// ── Hook: usePresence ───────────────────────────────────────────────

/**
 * Track who's online in a room — shows live presence indicators.
 */
export function usePresence(config: {
  supabase: SupabaseClient;
  roomId: string;
  userId: string;
  userName?: string;
}) {
  const { supabase, roomId, userId, userName = 'Anonymous' } = config;
  const [presence, setPresence] = useState<PresenceState>({ online: [], count: 0 });

  useEffect(() => {
    const channel = supabase.channel(`presence:${roomId}`);

    channel
      .on('presence', { event: 'sync' }, () => {
        const state = channel.presenceState();
        const online = Object.values(state)
          .flat()
          .map((p: any) => ({
            userId: p.userId,
            userName: p.userName,
            status: p.status || 'online',
          }));
        setPresence({ online, count: online.length });
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          await channel.track({ userId, userName, status: 'online' });
        }
      });

    return () => {
      channel.unsubscribe();
    };
  }, [supabase, roomId, userId, userName]);

  return presence;
}

// ── Hook: useRealtimeAI ─────────────────────────────────────────────

/**
 * Subscribe to AI responses on a Supabase Realtime channel.
 * Useful for background AI processing that broadcasts results.
 */
export function useRealtimeAI(config: RealtimeAIConfig) {
  const { supabase, channelName, onAIResponse } = config;
  const [latestResponse, setLatestResponse] = useState<string>('');
  const [isStreaming, setIsStreaming] = useState(false);

  useEffect(() => {
    const channel = supabase.channel(channelName);

    channel
      .on('broadcast', { event: 'ai-response' }, ({ payload }) => {
        const { content, done } = payload;
        if (!done) {
          setIsStreaming(true);
          setLatestResponse((prev) => prev + content);
        } else {
          setIsStreaming(false);
        }
        onAIResponse?.({ content, done });
      })
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [supabase, channelName]);

  return { latestResponse, isStreaming };
}
