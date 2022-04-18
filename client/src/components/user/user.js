import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import './user.css';

// Função para transformar uma string em base64(urlsafe) em utf-8
function b64_to_utf8( str ) {
    return decodeURIComponent(escape(atob(str)));
}

class User extends React.Component {

    constructor(props) {
        super(props);
        // Pegando os cookies com javascript.
        let cookie_token = document.cookie.replace(/(?:(?:^|.*;\s*)google_token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        let cookie_code = document.cookie.replace(/(?:(?:^|.*;\s*)google_code\s*\=\s*([^;]*).*$)|^.*$/, "$1");

        if(cookie_token && cookie_code) {
            this.google_token = JSON.parse(b64_to_utf8(cookie_token));

            // Splitando o JWT.
            // Como sabemos um jwt é composto por 3 pedaços:
            //  Header.Body.Signature
            let splited_jwt = this.google_token.id_token.split('.');
            this.jwtHeader = JSON.parse(b64_to_utf8(splited_jwt[0]));
            this.jwtBody = JSON.parse(b64_to_utf8(splited_jwt[1]));
            this.jwtSignature = splited_jwt[2];
            this.googleCode = cookie_code;
        }
    }


    render() {
        if(this.google_token && this.jwtHeader) {
            return (
                <div className="User">
                <div className='profile'>
                    <div>
                        <h1 style={{marginRight:'10px'}}>{this.jwtBody.name}</h1>
                        <img src={this.jwtBody.picture} referrerPolicy="no-referrer"/>
                    </div>
                </div>
                <div className='google'>
                <h2>Payload Google</h2>
                <h3>Google Code = {this.googleCode}</h3>
                    <h3>Google Token</h3>
                    <SyntaxHighlighter
                        lineProps={{style: {wordBreak: 'break-all', whiteSpace: 'pre-wrap'}}}
                        wrapLines={true}
                        language="json"
                        style={dark}
                    >
                    {JSON.stringify(this.google_token).replace(/ *, */g, ',\n')}
                    </SyntaxHighlighter>
                </div>
                <div className='jwt'>
                    <h2>JWT id_token</h2>
                    <h3>Header</h3>
                    <SyntaxHighlighter
                        lineProps={{style: {wordBreak: 'break-all', whiteSpace: 'pre-wrap'}}}
                        wrapLines={true}
                        language="json"
                        style={dark}
                    >
                    {JSON.stringify(this.jwtHeader).replace(/ *, */g, ',\n')}
                    </SyntaxHighlighter>
                    <h3>Body</h3>
                    <SyntaxHighlighter
                        lineProps={{style: {wordBreak: 'break-all', whiteSpace: 'pre-wrap'}}}
                        wrapLines={true}
                        language="json"
                        style={dark}
                    >
                    {JSON.stringify(this.jwtBody).replace(/ *, */g, ',\n')}
                    </SyntaxHighlighter>
                    <h3>Signature</h3>
                    <SyntaxHighlighter
                        lineProps={{style: {wordBreak: 'break-all', whiteSpace: 'pre-wrap'}}}
                        wrapLines={true}
                        language="json"
                        style={dark}
                    >
                    {JSON.stringify(this.jwtSignature).replace(/ *, */g, ',\n')}
                    </SyntaxHighlighter>
                </div>
            </div>
            );        
        }
        return <h1 style={{textAlign:'center'}}>Sem dados</h1>
    }
}

export default User;
