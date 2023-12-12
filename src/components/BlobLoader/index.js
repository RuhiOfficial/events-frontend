import React, { useEffect, useState } from 'react';

function BlobLoader({ blob }) {
  const [blobUrl, setBlobUrl] = useState();

  useEffect(() => {
    if (blob) {
      // Create a URL for the Blob
      const url = URL.createObjectURL(blob);

      // Set the Blob URL to state
      setBlobUrl(url);

      // Revoke the Blob URL when the component unmounts
      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [blob]);

  return (
    <div>
      {/* Display the image using the Blob URL */}
      {blobUrl && <img src={blobUrl} alt="My Image" />}
    </div>
  );
}

export default BlobLoader;
