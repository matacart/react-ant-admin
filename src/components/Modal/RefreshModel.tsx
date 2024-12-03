import React, { useEffect, useState } from 'react';
 
const RefreshModel = () => {
  const [isLeaving, setIsLeaving] = useState(false);
 
  useEffect(() => {
    const handleBeforeUnload = (event:any) => {
        if (isLeaving) {
          console.log(12)
        // Custom message is ignored by most browsers, but they will show their own generic message
        event.preventDefault();
        event.returnValue = '';  // For older browsers
        return '';  // For modern browsers
      }
    };
 
    const handleLeavePage = (event:any) => {
        console.log(11)
        event.preventDefault();
      setIsLeaving(true);
      // Optionally, you can set a timeout to reset isLeaving after some time
      // setTimeout(() => setIsLeaving(false), 5000); // Reset after 5 seconds
    };
 
    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('beforeunload', handleLeavePage);  // To set isLeaving state
 
    // Cleanup listener on unmount
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('beforeunload', handleLeavePage);
    };
  }, []);
 
  return (
    <div>
      <h1>Protected Page</h1>
      <p>You will be prompted to confirm if you try to leave this page.</p>
      {/* Your other components and logic here */}
    </div>
  );
};
 
export default RefreshModel;