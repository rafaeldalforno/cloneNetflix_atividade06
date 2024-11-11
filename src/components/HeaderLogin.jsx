import Logo from '../assets/imagens/logo.png';
import styled from 'styled-components';

const CustomHeader = styled.header`
    position: absolute;
`;

const ImgLogo = styled.img`
    margin-left: 17%;
    margin-top: 20px;
    width: 200px;  
`;

function HeaderLogin() {
    return (
        <CustomHeader>
            <ImgLogo src={Logo} />
        </CustomHeader>
    )
}

export default HeaderLogin;