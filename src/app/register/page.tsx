import React from 'react';
import Register from '@/pages-section/register/page';

export const metadata = {
  title: 'Register in chatbot app',
  description: `Chatbot for your queries.`,
  authors: [
    {
      name: 'Saurabh Raut'
    },
  ],
  viewport: 'width=device-width, initial-scale=1',
  
};

const IndexPage = () => <Register />;

export default IndexPage;