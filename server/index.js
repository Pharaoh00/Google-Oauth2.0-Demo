const express = require('express');
var bodyParser = require('body-parser');
const { response } = require('express');
const axios = require('axios').default;

const app = express();
// Porta 5000 pq o react roda na 3000.
const port = 5000;

// NOTA:
//      Parâmetros como client id e secrets devem SEMPRE ser
//      variáveis de ambiente e NUNCA devem ficar no código.
//      
//      Por simplicidade foi colocado aqui. \/

// Client id do google
const CLIENT_ID = 'GOOGLE_CLIENT_ID';
// Client secre do google
const CLIENT_SECRET = 'GOOGLE_CLIENT_SECRET';

app.use(bodyParser.json())
app.listen(port, () => console.log(`Server is running on port ${port}`));

app.get('/oauth/google', (req, res) => {

    // URI do google.
    const GOOGLE_TOKEN_URL = `https://oauth2.googleapis.com/token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${req.query.code}&grant_type=authorization_code&redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Foauth%2Fgoogle`
    // O Content-Type DEVE SER application/x-www-form-urlencoded
    // Isso está definido no guide do Oauth2 da google.
    let headers = {'Content-Type': 'application/x-www-form-urlencoded'}

    const google_data = () => {
        // Fazendo a request e retornando uma promise.
        return new Promise((resolve, reject) => {
            axios.post(GOOGLE_TOKEN_URL, { headers })
            .then(response => {resolve(response.data)})
            .catch(reject);
        })
    }

    google_data().then(response => {
        // Por simplicidade decidi colocar o token e o code como cookies para ler no react-app.
        // NOTA:
        //      O 'code' so pode ser utilizado uma única vez,
        //      No caso já foi utilizado para trocar pelo token.
        //      
        //      SUPER IMPORTANTE NÃO SE DEVE 'SETAR' O PAYLOAD DO GOOGLE COMO TOKEN.
        //      NELE TEM O TOKEN DO USUÁRIO E PRINCIPALMENTE O REFRESH TOKEN.
        //      Como sabemos o refresh token é o usuário em si. Esse token somente deve ser
        //      conhecido pelo client.
        res.cookie('google_token', Buffer.from(JSON.stringify(response)).toString('base64url'));
        res.cookie('google_code', req.query.code);
        // Redirecionado para o react-app.
        res.redirect(307, 'http://localhost:3000/profile');

        // NOTA:
        //      O usuário deve vir de um banco de dados, e o mesmo deve estar previamente cadastro
        //      na plataforma do client. Essa etapa é somente para autenticar o usuário e saber se
        //      o mesmo é valido.
    })
})
