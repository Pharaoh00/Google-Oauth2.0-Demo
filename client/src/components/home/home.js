import styled from "styled-components";
import './home.css';

const theme = {
  blue: {
    default: "#3f51b5",
    hover: "#283593"
  },
  pink: {
    default: "#e91e63",
    hover: "#ad1457"
  }
};

const Button = styled.button`
  background-color: ${(props) => theme[props.theme].default};
  color: white;
  padding: 5px 15px;
  border-radius: 5px;
  outline: 0;
  text-transform: uppercase;
  margin: 10px 0px;
  cursor: pointer;
  box-shadow: 0px 2px 2px lightgray;
  transition: ease background-color 250ms;
  font-size: 20px;
  &:hover {
    background-color: ${(props) => theme[props.theme].hover};
  }
  &:disabled {
    cursor: default;
    opacity: 0.7;
  }
`;

Button.defaultProps = {
  theme: "blue"
};

function Home() {
  return (
    <div className="home">
      <h1>Fluxo Oauth2 + Google</h1>
      <a href="https://accounts.google.com/o/oauth2/v2/auth?client_id=749494830937-nhfcihm9frvjcg5dp26dkj2porau9ff4.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Foauth%2Fgoogle&response_type=code&scope=profile%20email&access_type=offline&prompt=consent
" target="_self">
        <Button>Google Oauth2</Button>
      </a>
    </div>
  );
}

export default Home;