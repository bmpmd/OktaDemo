export default {
    oidc: {
        clientId: '0oa7flswrp5R0g1xt5d7',
        issuer: 'https://dev-46403968.okta.com/oauth2/default',
        redirectUri:  window.location.origin + '/login/callback',
        scopes:['openid', 'profile', 'email']
    }
}