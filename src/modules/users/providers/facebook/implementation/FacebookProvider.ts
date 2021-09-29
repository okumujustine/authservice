
const got = require('got');

import IFacebookProvider from "../IFacebookProvider"


class FacebookProvider implements IFacebookProvider {
    public async facebookTokenVerify(accessToken: string, userId: string): Promise<any> {

        const url = `https://graph.facebook.com/${userId}?fields=id,name,email&access_token=${accessToken}`
        const response = await got.get(url)
        return response.body

    }
}

export default FacebookProvider