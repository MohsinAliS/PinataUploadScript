const path = require("path");
const fs = require("fs");
const axios = require("axios");
const FormData = require("form-data");
const data = require("../Description/Dark.js");

const PinImageToIpfs = async (filePath, filename) => {
  const pinataEndpoint = "https://api.pinata.cloud/pinning/pinFileToIPFS";
  const pinataApiKey = "19bc27a71e11196e5f91";
  const pinataApiSecret ="d560e60ed7540e245ff72b23ee42fc7c6a84d805977cc5c47002d3a7d51437fd";

  const form_data = new FormData();
  try {
    form_data.append("file", fs.createReadStream(`${filePath}//${filename}`));

    const request = {
      method: "post",
      url: pinataEndpoint,
      maxContentLength: "Infinity",
      headers: {
        pinata_api_key: pinataApiKey,
        pinata_secret_api_key: pinataApiSecret,
        "Content-Type": `multipart/form-data; boundary=${form_data._boundary}`,
      },
      data: form_data,
    };

    const response = await axios(request);
    const imageHash = response.data.IpfsHash;
    console.log(imageHash);
    let str = filename;
    const Name = str.slice(0, -4);

// const path = require("path");
// const fs = require("fs");
   
//     const metaPath = path.join(__dirname, "../Description");
//     const Metadata = fs.readdirSync(metaPath);
//     for (const data of Metadata) {
//       console.log("###########",data.dis);
//     };
   

    metaData = {
      attributes: [
        {
          "trait_type": "Horror", 
          "value": "Street"
        }, 
        {
          "trait_type": "Homes", 
          "value": "Socity"
        }, 
        {
          "trait_type": "Street", 
          "value": "Sky"
        }, 
        
        {
          "trait_type": "PERSONALITY", 
          "value": "HORROR"
        },
        {
          "trait_type": "DREAM", 
          "value": "KNIGH"
        },
        {
          "trait_type": "VISIONS", 
          "value": "DARKSIDE"
        }],
        description:"Dark Side Views Of The Moon.. Every Dark Night Writing A Story & We can't see  Because That Time We Are Sleeping.. ",
        image: "https://ipfs.io/ipfs/" + imageHash,
        name: `${Name}`, 
    };

    const metadataJson = JSON.stringify(metaData);

    await fs.writeFile(
      path.join(__dirname, `../Metadata/${Name}.json`),
      metadataJson,
      "utf8",
      function (err) {
        if (err) {
          console.log("An error occured while writing JSON Object to File.");
          return console.log(err);
        } else {
          console.log("JSON file has been saved to " + `Metadata/${Name}`);
        }
      }
    );

    const getMetaDataJson = path.join(__dirname, `../Metadata/${Name}.json`);
    const form_meta_data = new FormData();
    try {
      form_meta_data.append("file", fs.createReadStream(getMetaDataJson));
      const request = {
        method: "post",
        url: pinataEndpoint,
        maxContentLength: "Infinity",
        headers: {
          pinata_api_key: pinataApiKey,
          pinata_secret_api_key: pinataApiSecret,
          "Content-Type": `multipart/form-data; boundary=${form_meta_data._boundary}`,
        },
        data: form_meta_data,
      };

      const response = await axios(request);
      console.log(response.data.IpfsHash);
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  PinImageToIpfs,
};

