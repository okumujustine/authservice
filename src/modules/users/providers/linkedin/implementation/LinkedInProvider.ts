import ILinkedInProvider from "../ILinkedInProvider";

const got = require('got');


class LinkedInProvider implements ILinkedInProvider {
    public async getAccessToken(code: string): Promise<any> {

        const url = `https://www.linkedin.com/oauth/v2/accessToken?grant_type=authorization_code&code=${code}&redirect_uri=${process.env.REACT_APP_LINKEDIN_LOGIN_CALL_BACK_URL}&client_id=${process.env.REACT_APP_LINKEDIN_CLIENT_ID}&client_secret=${process.env.REACT_APP_LINKEDIN_CLIENT_SECRET}`
        const response = await got.get(url)

        const parsedResponse = JSON.parse(response.body)

        return parsedResponse
    }

    public async getUserEmailAddress(token: string): Promise<any> {

        const options = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };

        const url = `https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))`
        const response = await got.get(url, { ...options })
        const parsedResponse = JSON.parse(response.body)

        const email = parsedResponse["elements"][0]['handle~']['emailAddress']

        return email
    }


}

export default LinkedInProvider