import React from 'react';
import Login from '@/pages-section/login/page';

export const metadata = {
  title: 'Login in chatbot app',
  description: `Chatbot for your queries.`,
  authors: [
    {
      name: 'Saurabh Raut'
    },
  ],
  viewport: 'width=device-width, initial-scale=1',
  
};

const IndexPage = () => <Login />;

export default IndexPage;