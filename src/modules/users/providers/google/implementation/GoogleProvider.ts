import {google} from "googleapis"
import IGoogleProvider from "../IGoogleProvider"

const { OAuth2 } = google.auth

const clientAuth = new OAuth2(process.env.GOOGLE_CLIENT_ID)

class GoogleProvider implements IGoogleProvider{
    public async googleTokenVerify(token: string): Promise<any> {
      
      const verify = await clientAuth.verifyIdToken({idToken: token, audience: process.env.GOOGLE_CLIENT_ID})

      return verify
    }
  }

  export default GoogleProvider