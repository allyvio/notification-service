require('dotenv').config()
const axios = require('axios')

const validatePhone = async (phone) => {
    const options = {
        method: 'POST',
        url: 'https://service-chat.qontak.com/api/open/v1/broadcasts/contacts',
        headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + process.env.AUTH_TOKEN },
        data: {
            channel_integration_id: process.env.WA_CH_ID,
            phone_numbers: [phone]
        }
    };
    const resp = await axios.request(options)
    return resp.data.data.contacts
}
const sendMessage = async (req, res) => {
    const valid_wa_number = await validatePhone(req.body.phone)
    // return res.send(valid_wa_number)
    if (valid_wa_number[0].status === "valid") {
        const options = {
            method: 'POST',
            url: 'https://service-chat.qontak.com/api/open/v1/broadcasts/whatsapp/direct',
            headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + process.env.AUTH_TOKEN },
            data: {
                to_number: valid_wa_number[0].wa_id,
                to_name: req.body.name,
                message_template_id: process.env.WA_TEMPLATE_ID,
                channel_integration_id: process.env.WA_CH_ID,
                language: { code: 'id' },
                parameters: {
                    body: [
                        {
                            key: '1',
                            value: 'ksp_name',
                            value_text: req.body.name
                        },
                        {
                            key: '2',
                            value: 'message_for',
                            value_text: req.body.message
                        },
                        {
                            key: '3',
                            value: 'amount_polis',
                            value_text: req.body.amount
                        }
                    ]
                }
            }
        };
        axios.request(options).then(function (response) {
            res.send(response.data);
        }).catch(function (error) {
            res.send(error);
        })
    } else {
        res.status(400)
        return res.send({
            status_code: '400',
            message: 'bad request, invalid whatsapp number',
            data: valid_wa_number[0]
        })
    }
}

module.exports = sendMessage