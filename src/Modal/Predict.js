import React from 'react';
import axios from 'axios';

function Predict(props) {

  const{latitude , longitude , month , day  , setResult}=props;
  // Define a function to send a request to the ML model endpoint
  async function sendRequest(inputData) {
    try {
      // Define the data you want to send in the request body
      const requestData = {
        input1: inputData[0],
        input2: inputData[1],
        input3: inputData[2],
        input4: inputData[3],
      };

      // Replace 'https://your-server-url.com/model-endpoint' with your actual model endpoint
      const response = await axios.post('http://192.168.18.20:5000/predict', requestData);

      // Handle the response and access the prediction result
      const prediction = response.data

      // Now you can use the prediction data as needed
      console.log('Prediction:', prediction);
      setResult(prediction);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  // Handle user input (e.g., user clicks) and collect input data
  const handlePredictionClick = () => {
    const inputData = [latitude, longitude , month , day]; // Replace with your actual input data

    // Call the sendRequest function to get predictions
    sendRequest(inputData);
  };

  return (
    <div>
      <button className="border-2 border-neutral-900 ml-4" onClick={handlePredictionClick}>Get Predictions</button>
    </div>
  );
}

export default Predict;
    