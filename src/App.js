import React, { useState } from 'react';
import './App.css';
import { withAuthenticator, Button } from '@aws-amplify/ui-react';
import { Auth } from 'aws-amplify';
import AWS from 'aws-sdk';

const convertFileToBase64 = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      resolve(event.target.result.split(',')[1]);
    };
    reader.onerror = (error) => {
      reject(error);
    };
    reader.readAsDataURL(file);
  });
};

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

      const base64File = await convertFileToBase64(file);

      const lambda = new AWS.Lambda({
        region: 'eu-north-1',
      });

      const params = {
        FunctionName: 'Dropbox_lambda',
        InvocationType: 'RequestResponse',
        Payload: JSON.stringify({ file: base64File, filename: file.name }),
      };

      lambda.invoke(params, (error, data) => {
        if (error) {
          console.error('Error invoking Lambda function:', error);
          alert('An error occurred while uploading the file.');
        } else {
          alert('File uploaded successfully.');
        }
      });
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
