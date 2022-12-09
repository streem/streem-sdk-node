import { JWK, JWS } from 'node-jose';
import { config } from './config';

const fiveMinutes = 5 * 60 * 1000;
const fourHours = 4 * 60 * 60 * 1000;

/**
 * Class for building Streem Tokens.  Configure the token using the available attributes, and finalize the token
 * by calling `build()`.  This returns a string representation of the token, that can be provided to the client.
 */
export class TokenBuilder {
    public userId?: string;
    public name?: string;
    public avatarUrl?: string;
    public email?: string;
    public tokenExpirationMs: number = fiveMinutes;
    public sessionExpirationMs: number = fourHours;
    public reservationSid?: string;

    public async build(): Promise<string> {
        const apiKeyId = config.apiKeyId;
        const apiKeySecret = config.apiKeySecret;
        const apiEnvironment = config.apiEnvironment;
        if (!apiKeyId || !apiKeySecret) {
            throw Error('Streem is not initialized. Call Streem.init()');
        }

        if (!this.userId) {
            throw Error('Cannot build token: userId is required');
        }

        const keyAsJson = Buffer.from(apiKeySecret, 'base64');
        const key = await JWK.asKey(keyAsJson, 'json');

        const claim: any = {
            aud: `https://api.${apiEnvironment}.streem.cloud/`,
            email: this.email,
            exp: Math.round((Date.now() + this.tokenExpirationMs) / 1000),
            session_exp: Math.round((Date.now() + this.sessionExpirationMs) / 1000),
            iat: Math.round(Date.now() / 1000),
            iss: `streem:api:${apiKeyId}`,
            name: this.name,
            picture: this.avatarUrl,
            sub: `${this.userId}`,
        };

        if (this.reservationSid) {
            claim['streem:reservation_sid'] = this.reservationSid;
        }

        const token = await JWS.createSign({ alg: 'ES256', format: 'compact' }, key)
            .update(JSON.stringify(claim))
            .final();

        return token.toString();
    }
}
