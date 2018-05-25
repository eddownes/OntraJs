import fetch from 'node-fetch';

export default class OntraportService {
  constructor(config) {
    this.config = config;

    this.headers = {
      'Content-Type': 'application/json',
      'Api-key': this.config.apiKey,
      'Api-Appid': this.config.appId
    };
  }
}
