import console from 'console';
import { useEffect, useRef } from 'react';

interface MessageData {
  [key: string]: any;
}

interface Message {
  type: string;
  data: MessageData;
}

class PreviewCommunicationManager {
  private iframeRef: React.RefObject<HTMLIFrameElement>;
 
  constructor(iframeRef: React.RefObject<HTMLIFrameElement>) {
    this.iframeRef = iframeRef;
    this.init();
  }

  private init() {
    // 监听来自子窗口的消息
    // this.eventListener = this.handleMessage.bind(this);
    // window.addEventListener('message', this.eventListener);
  }

  // 发送消息到 iframe 子窗口
  sendToIframe(message: Message) {
    if (this.iframeRef.current && this.iframeRef.current.contentWindow) {
      try {
        // 验证 iframe 的源，这里使用 localhost，你可以根据实际情况调整
        const iframeOrigin = this.iframeRef.current.src.startsWith('http') ? new URL(this.iframeRef.current.src).origin : window.location.origin;
        this.iframeRef.current.contentWindow.postMessage(JSON.stringify(message), iframeOrigin);
      } catch (error) {
        console.error('Error sending message to iframe:', error);
      }
    }
  }
}

// React Hook 封装通信管理器
const usePreviewCommunication = (iframeRef: React.RefObject<HTMLIFrameElement>) => {

  const communicationManagerRef = useRef<PreviewCommunicationManager | null>(null);

  useEffect(() => {
    communicationManagerRef.current = new PreviewCommunicationManager(iframeRef);
  
  }, [iframeRef]);

  return {
    sendToIframe: (message: Message) => {
        if (communicationManagerRef.current) {
            communicationManagerRef.current.sendToIframe(message);
            console.log('Sent message:', message);
        } else {
          console.warn('Communication manager not ready when sending message:', message);
        }
    }
  };
};

export { PreviewCommunicationManager, usePreviewCommunication };

export type { Message, MessageData };