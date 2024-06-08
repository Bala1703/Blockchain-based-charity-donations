import React, { useEffect, useState } from 'react';

const CustomPage = () => {
  const [customContent, setCustomContent] = useState('');

  useEffect(() => {
    const fetchCustomHtml = async () => {
      try {
        const customResponse = await fetch('../CustomPage.html');
        const customHtml = await customResponse.text();
        setCustomContent(customHtml);
      } catch (error) {
        console.error('Error fetching custom HTML:', error);
      }
    };

    fetchCustomHtml();
  }, []);

  return (
    <div dangerouslySetInnerHTML={{ __html: customContent }} />
  );
};

export default CustomPage;
