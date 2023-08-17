import React, { useState } from 'react';
import './App.css';
import { withAuthenticator, Button } from '@aws-amplify/ui-react';
import { Auth } from 'aws-amplify'; // Import Auth from aws-amplify

function App() {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    try {
      if (!file) {
        alert('Please select a file to upload.');
        return;
      }

      // Use AWS SDK or Amplify Storage to upload the file to S3 here
      // You can use the Amplify Storage.put() method for this purpose

      alert('File uploaded successfully.');
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('An error occurred while uploading the file.');
    }
  };

  const handleSignOut = async () => {
    try {
      await Auth.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>My DropBox App!</h1>
        <div>
          <input type="file" onChange={handleFileChange} />
          <Button onClick={handleFileUpload}>Upload File</Button>
        </div>
        <p></p>
        <div className="SignOut">
        <Button onClick={handleSignOut}>Sign Out</Button>
      </div>
      </header>
      
    </div>
  );
}

export default withAuthenticator(App);