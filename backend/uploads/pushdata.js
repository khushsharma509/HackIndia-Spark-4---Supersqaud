const mongoose = require('mongoose');
const { PinataSDK } = require('pinata-web3');
const MetaData = require('../models/MetaData'); // Adjust the path if needed

// Initialize Pinata SDK
const pinata = new PinataSDK({
  pinataJwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJhZWI5ZGVjZi03ZGQ0LTRjZjgtOTM4NS0yNjFlNWI0NTU1ZTkiLCJlbWFpbCI6ImdyZWVuY3JlZGl0c3Byb2plY3RAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiRlJBMSJ9LHsiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiTllDMSJ9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6ImZkNzg1NDVlYjY1MjYyYjgzNmQyIiwic2NvcGVkS2V5U2VjcmV0IjoiNDMzMzNlZDM5NGE1Y2ZhOTExMjhiMjIzNTE5MDg4MDk1NzViNGI3ZjZlODI5OWFjY2QyOGNhOTdiNGIzNzdmMSIsImV4cCI6MTc2MDQzNjUyM30.luVQwLJfb0ZmS_DaQjvOWBgl5BQ65mwUAr_p_Gm6N5s',
  pinataGateway: 'QnTEkVJIsWp7TFBurzN0kfuKINltxwJB4oP0tU8KNEpCbqzkWUrei9efZg9JdcwZ'
});

// Connect to MongoDB
mongoose.connect('mongodb+srv://greencreditsproject:ihiMEyaHPtHcalq6@greencredits.ari96.mongodb.net/?retryWrites=true&w=majority&appName=GREENCREDITS', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit if MongoDB connection fails
  });

// Function to retrieve all metadata and push as a single file to IPFS
async function pushAllMetadataToIPFS() {
  try {
    const metadataRecords = await MetaData.find({});
    if (metadataRecords.length === 0) {
      console.log('No metadata found');
      return;
    }

    // Gather all metadata into a single array
    const allMetadataJSON = metadataRecords.map(metadata => ({
      desc: metadata.desc,
      lattitude: metadata.lattitude,
      longitude: metadata.longitude,
      numberTrees: metadata.numberTrees,
      AreaUnderSustainablePractices: metadata.AreaUnderSustainablePractices,
      Watersaved: metadata.Watersaved,
      PollutionReduced: metadata.PollutionReduced,
      Areaofmangroves: metadata.Areaofmangroves
    }));

    // Upload the entire array as a single file to IPFS
    const result = await pinata.upload.json(allMetadataJSON);
    console.log('All metadata uploaded to IPFS with hash:', result.IpfsHash);

  } catch (err) {
    console.error('Error retrieving metadata from MongoDB or uploading to IPFS:', err);
  } finally {
    mongoose.connection.close();
  }
}

// Call the function to push all metadata as a single file
(async () => {
  await pushAllMetadataToIPFS();
})();
