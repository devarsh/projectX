import UAParser from "ua-parser-js/dist/ua-parser.min";

class Api {
  constructor() {
    const result = UAParser(navigator.userAgent);
  }
}
