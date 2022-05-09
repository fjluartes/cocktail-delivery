const axios = require('axios');
require('dotenv').config();

module.exports.getByQuery = async (params) => {
  const options = {
    method: 'GET',
    url: process.env.COCKTAIL_SEARCH_URL,
    params: params,
    headers: {
      'X-RapidAPI-Host': process.env.RAPIDAPI_HOST,
      'X-RapidAPI-Key': process.env.RAPIDAPI_KEY
    }
  };

  try {
    let data = await axios.request(options)
        .then((response) => {
          return response.data;
        });
    return data;
  } catch(err) {
    return { error: err };
  }
};

module.exports.getByFilter = async (params) => {
  console.log(params);
  const options = {
    method: 'GET',
    url: process.env.COCKTAIL_FILTER_URL,
    params: params,
    headers: {
      'X-RapidAPI-Host': process.env.RAPIDAPI_HOST,
      'X-RapidAPI-Key': process.env.RAPIDAPI_KEY
    }
  };

  try {
    let data = await axios.request(options)
        .then((response) => {
          return response.data;
        });
    return data;
  } catch(err) {
    return { error: err };
  }
};
