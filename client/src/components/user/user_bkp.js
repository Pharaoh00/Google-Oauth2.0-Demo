import React, {useState, useEffect} from 'react';
import {Buffer} from 'buffer';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import './user.css';

function User() {

    function b64_to_utf8( str ) {
        return decodeURIComponent(escape(atob(str)));
    }

    const [token, setToken] = useState({});
    const [jwtHeader, setJwtHeader] = useState({});
    const [jwtBody, setJwtBody] = useState({});
    const [jwtSignature, setJwtSignature] = useState({});
    const [googleCode, setGoogleCode] = useState({});

    useEffect(() => {
        let cookie = document.cookie.replace(/(?:(?:^|.*;\s*)google_token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        if(cookie) {
            let json_cookie = JSON.parse(b64_to_utf8(cookie));
            let splited_jwt = json_cookie.id_token.split('.');
            setToken(token => json_cookie);
            setJwtHeader(jwtHeader => JSON.parse(b64_to_utf8(splited_jwt[0])));
            setJwtBody(jwtBody => JSON.parse(b64_to_utf8(splited_jwt[1])));
            setJwtSignature(jwtSignature => splited_jwt[2])
            setGoogleCode(googleCode => document.cookie.replace(/(?:(?:^|.*;\s*)google_code\s*\=\s*([^;]*).*$)|^.*$/, "$1"));
        }
    }, []);

    return (
    <div className="User">
        <div className='profile'>
            <div>
                <h1 style={{marginRight:'10px'}}>{jwtBody.name}</h1>
                <img src={jwtBody.picture} referrerPolicy="no-referrer"/>
            </div>
        </div>
        <div className='google'>
        <h2>Payload Google</h2>
        <h3>Google Code = {googleCode}</h3>
            <h3>Google Token</h3>
            <SyntaxHighlighter
                lineProps={{style: {wordBreak: 'break-all', whiteSpace: 'pre-wrap'}}}
                wrapLines={true}
                language="json"
                style={dark}
            >
            {JSON.stringify(token).replace(/ *, */g, ',\n')}
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
            {JSON.stringify(jwtHeader).replace(/ *, */g, ',\n')}
            </SyntaxHighlighter>
            <h3>Body</h3>
            <SyntaxHighlighter
                lineProps={{style: {wordBreak: 'break-all', whiteSpace: 'pre-wrap'}}}
                wrapLines={true}
                language="json"
                style={dark}
            >
            {JSON.stringify(jwtBody).replace(/ *, */g, ',\n')}
            </SyntaxHighlighter>
            <h3>Signature</h3>
            <SyntaxHighlighter
                lineProps={{style: {wordBreak: 'break-all', whiteSpace: 'pre-wrap'}}}
                wrapLines={true}
                language="json"
                style={dark}
            >
            {JSON.stringify(jwtSignature).replace(/ *, */g, ',\n')}
            </SyntaxHighlighter>
        </div>
    </div>
    );
}

export default User;
