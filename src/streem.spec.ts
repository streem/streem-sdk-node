// @ts-ignore
import jwtDecode from 'jwt-decode';
import test from 'ava';
import Streem from './streem';

test('TokenBuilder', async t => {
    const apiKeyId = 'api_4l1HLLbAKfiNcyU5fyPxPu';
    const apiKeySecret =
        'eyJrdHkiOiJFQyIsImQiOiJzR3VqdFFrZEJkcmFvN0NMUmZTMlQ0N1M1STdwV2NleTNwMzV6RWtmLXVnIiwidXNlIjoic2lnIiwiY3J2IjoiUC0yNTYiLCJ4IjoiY3VMYi1oZTg1NkFRM2NNOW9xVnBPRWJWcEg2WGJsXy16ZmdQTEFPdGVIOCIsInkiOiJwQ180eEtVYUVvQ3B1X0p0MktVNXY3ZjR1VXZ4ZllnNDc4MHNWYkpqd2dNIiwiYWxnIjoiRVMyNTYifQ';

    Streem.init(apiKeyId, apiKeySecret, 'test');
    const builder = new Streem.TokenBuilder();
    builder.userId = 'tester';
    builder.name = 'Test';
    builder.avatarUrl = 'https://tr.rbxcdn.com/680e8cd3b087d56459a92b93120b152d/352/352/Avatar/Png';
    builder.email = 'test@streem.pro';

    const tenMinutes = 10 * 60 * 1000;
    builder.tokenExpirationMs = tenMinutes;
    const oneHour = 60 * 60 * 1000;
    builder.sessionExpirationMs = oneHour;

    const token = await builder.build();
    t.truthy(token);

    const jwt: any = jwtDecode(token);
    t.is(jwt.iss, `streem:api:${apiKeyId}`);
    t.is(jwt.sub, `tester`);
    t.is(jwt.name, `Test`);
    t.is(jwt.picture, `https://tr.rbxcdn.com/680e8cd3b087d56459a92b93120b152d/352/352/Avatar/Png`);
    t.is(jwt.email, `test@streem.pro`);
    t.is(jwt.aud, `https://api.test.streem.cloud/`);

    // Expiration dates should be within one second
    const expectedTokenExpirationSeconds = Math.round((Date.now() + tenMinutes) / 1000.0);
    t.true(expectedTokenExpirationSeconds - jwt.exp <= 1);
    const expectedSessionExpirationSeconds = Math.round((Date.now() + oneHour) / 1000.0);
    t.true(expectedSessionExpirationSeconds - jwt.session_exp <= 1);
});
