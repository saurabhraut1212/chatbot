import React from 'react';
import ChatPage from '@/pages-section/chat/page';

export const metadata = {
  title: 'chat page in chatbot app',
  description: `Chatbot for your queries.`,
  authors: [
    {
      name: 'Saurabh Raut'
    },
  ],
  viewport: 'width=device-width, initial-scale=1',
  
};

const IndexPage = () => <ChatPage />;

export default IndexPage;
