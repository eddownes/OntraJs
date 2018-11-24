import fetch from 'node-fetch';

export default class OntraportService {
  constructor(config) {
    this.config = config;

    this.headers = {
      'Content-Type': 'application/json',
      'Api-key': this.config.API_KEY,
      'Api-Appid': this.config.APP_ID
    };
    this.base_api_url = 'https://api.ontraport.com/';
  }

  getContactById() {}

  getContactsByIds() {}

  deleteContact() {}

  postContacts() {}

  upsertContacts() {}

  getCampaigns() {}

  postCampaigns() {}

  putCampaigns() {}

  deleteCampaigns() {}
}
