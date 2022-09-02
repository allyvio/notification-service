require('dotenv').config()
const axios = require('axios')
const { Oauth_token } = require('../../models')

const {
    WA_EMAIL,
    WA_PASSWORD,
    WA_CLIENT_ID,
    WA_CLIENT_SECRET
} = process.env

const data = {
    username: WA_EMAIL,
    password: WA_PASSWORD,
    grant_type: 'password',
    client_id: WA_CLIENT_ID,
    client_secret: WA_CLIENT_SECRET
}
const header = {
    headers: { Accept: 'application/json' },
}

const auth = (req, res) => {
    axios.post('https://service-chat.qontak.com/oauth/token', data, header)
        .then((response) => {
            const payload = {
                access_token: response.data.access_token,
                token_type: response.data.token_type,
                expires_in: response.data.expires_in,
                refresh_token: response.data.refresh_token
            }
            Oauth_token.create(payload)
            res.send(response.data)
        })
        .catch((e) => {
            res.send(e)
        })
}

module.exports = auth