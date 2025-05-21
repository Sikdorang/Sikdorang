'use client';

import { useEffect } from 'react';
import { EventSourcePolyfill } from 'event-source-polyfill';
import { KEYS } from '@/constants/storage';

export default function SseTestPage() {
  useEffect(() => {
    const accessToken = localStorage.getItem(KEYS.ACCESS_TOKEN);
    if (!accessToken) {
      console.warn('Access token not found.');
      return;
    }

    const eventSource = new EventSourcePolyfill('http://localhost:4000/api/sse/subscribe', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true, // 서버에서 CORS에 credentials 허용 시 필요
    });

    eventSource.onmessage = (event) => {
      if (event.data === 'connected') {
        console.log('✅ SSE 연결 성공!');
      } else {
        console.log('💬 메시지:', event.data);
      }
    };

    eventSource.onerror = (error) => {
      console.error('❌ SSE Error:', error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
      console.log('🔌 SSE Disconnected');
    };
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">SSE 구독 테스트</h1>
    </div>
  );
}
