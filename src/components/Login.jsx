import { useState, useEffect, useContext } from 'react';
import { VscError } from "react-icons/vsc";
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Background from '../assets/imagens/background.jpg';
import FooterLogin from './FooterLogin';
import HeaderLogin from './HeaderLogin';

const Container = styled.div`
    background-color: rgba(0, 0, 0, 0.75);
    width: 400px;
    height: 740px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 30px;
    border-radius: 5px;
    margin-top: 70px;

    @media (max-width: 760px) {
        width: 350px;
    }
`;

const Title = styled.h2`
    color: white;
    margin-bottom: 20px;
    text-align: left;
    width: 100%;
    margin-left: 20px;
`;

const Input = styled.input`
    margin: 10px;
    width: 300px;
    border-radius: 5px;
    height: 60px;
    border: 1px solid #8C8C8C;
    background-color: rgba(34, 33, 33, 0.671);
    padding: 5px;
    color: white;
    font-weight: 600;
    font-size: 0.9em;

    &:focus {
        outline: 2px solid white;
    }

    @media (max-width: 760px) {
        width: 250px;
    }
`;

const CustomCheckbox = styled.input`
    transform: scale(1.5);
    margin: 5px;

    &:hover {
        cursor: pointer;
    }

    &:checked {
        background-color: white;
        color: black;
    }
`;

const Error = styled.p`
    color: #E50914;
    font-size: 0.8em;
    font-weight: 600;
`;

const ButtonIn = styled.button`
    margin: 10px;
    padding: 5px;
    height: 40px;
    width: 300px;
    border: none;
    border-radius: 5px;
    color: white;
    font-weight: 700;
    font-size: 1em;
    background-color: #E50914;

    &:hover {
        cursor: pointer;
        background-color: #d10812;
    }

    @media (max-width: 760px) {
        width: 250px;
    }
`;

const ButtonCode = styled.button`
    margin: 10px;
    padding: 5px;
    height: 40px;
    width: 300px;
    border: none;
    border-radius: 5px;
    color: white;
    font-weight: 700;
    font-size: 1em;
    background-color: #8c8c8c70;
    margin-bottom: 20px;

    &:hover {
        cursor: pointer;
        background-color: #7272726f;
    }

    @media (max-width: 760px) {
        width: 250px;
    }
`;

const Por = styled.p`
    color: #8C8C8C;
    margin-top: 10px;
    margin-bottom: 10px;
    text-align: center;
`;

const Pnew = styled.p`
    color: #8C8C8C;
`;

const Anew = styled.a`
    text-decoration: none;
    color: white;

    &:hover {
        border-bottom: 1px solid white;
    }
`;

const Aforgot = styled.a`
    text-align: center;
    text-decoration: none;
    color: white;

    &:hover {
        border-bottom: 1px solid #8C8C8C;
        color: #8C8C8C;
    }
`;

const Precaptcha = styled.p`
    color: #8C8C8C;
    margin-top: 20px;
    font-size: 0.9em;
`;

const Arecaptcha = styled.a`
    text-decoration: none;
    color: #1071DE;

    &:visited {
    color: #1071DE;
    }

    &:hover {
        border-bottom: 1px solid #1071DE;
    }
`;

const DivLeft = styled.div`
    text-align: left;
`;

const Remember = styled.p`
    margin-top: 20px;
    text-align: left;
    margin-bottom: 25px;
    color: white;
`;

function Login({ onLogin }) {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [userErrorMessage, setUserErrorMessage] = useState('');
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    const [showMessage, setShowMessage] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {

        document.body.style.background = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
        url(${Background})`;
        document.body.style.backgroundSize = 'cover';

        return () => {
            document.body.style.background = '';
            document.body.style.backgroundSize = '';
        };
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!user || !password) {
            setUserErrorMessage('Informe um email ou número de telefone válido.');
            setPasswordErrorMessage('A senha deve ter entre 4 e 60 caracteres.');
        } else if (user !== "admin@test.com") {
            setUserErrorMessage('Usuário incorreto.');
        } else if (password !== "12345") {
            setPasswordErrorMessage('Senha incorreta.');
        } else {
            onLogin();
            navigate('/profiles');
        }
    }

    const validateUser = () => {
        const emailOrPhoneRegex = /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$|^[0-9]{10,15}$/;
        if (!emailOrPhoneRegex.test(user)) {
            setUserErrorMessage('Informe um email ou número de telefone válido.');
        } else {
            setUserErrorMessage('');
        }
    }

    const validatePassword = () => {
        if (password.length < 4 || password.length > 60) {
            setPasswordErrorMessage('A senha deve ter entre 4 e 60 caracteres.');
        }
    }

    const handleClick = () => {
        setShowMessage(true);
    }

    return (
        <>
            <HeaderLogin />
            <Container>
                <Title>Entrar</Title>
                <form onSubmit={handleSubmit}>
                    <Input type="text" placeholder="Email ou número de celular"
                        value={user} onChange={(event) => setUser(event.target.value)}
                        onBlur={validateUser}
                        style={{
                            borderColor: userErrorMessage ? 'red' : 'initial',
                            borderWidth: '1px',
                            borderStyle: 'solid',
                        }} />
                    {userErrorMessage && <Error><VscError /> {userErrorMessage}</Error>}
                    <br />
                    <Input type="password" placeholder="Senha"
                        value={password} onChange={(event) => setPassword(event.target.value)}
                        onBlur={validatePassword}
                        style={{
                            borderColor: passwordErrorMessage ? 'red' : 'initial',
                            borderWidth: '1px',
                            borderStyle: 'solid',
                        }} />
                    {passwordErrorMessage && <Error><VscError /> {passwordErrorMessage}</Error>}
                    <br />
                    <ButtonIn type="submit">Entrar</ButtonIn>
                    <Por>OU</Por>
                    <ButtonCode>Usar um código de acesso</ButtonCode>
                    <br />
                    <Aforgot href="#">Esqueceu a senha?</Aforgot>
                    <br />
                    <DivLeft>
                        <Remember><CustomCheckbox type="checkbox" id="remember" name="remember" /> Lembre-se de mim</Remember>
                        <Pnew>Novo por aqui?<Anew id="novo" href="#"><strong> Assine agora</strong></Anew></Pnew>
                        <Precaptcha>Essa página é protegida pelo Google reCAPTCHA para garantir que você não é um robô.
                            {!showMessage ? (
                                <Arecaptcha href="#" onClick={handleClick}> Saiba mais.</Arecaptcha>
                            ) : (
                                <Precaptcha>As informações recolhidas pelo Google reCAPTCHA estão sujeitas à <Arecaptcha href='#'>Política de Privacidade</Arecaptcha> e <Arecaptcha href='#'>Termos de Uso</Arecaptcha>, e são usadas para oferecer, manter e melhorar o serviço reCAPTCHA e por questões de segurança (não são usadas para exibir anúncios personalizados pelo Google).</Precaptcha>
                            )} </Precaptcha>
                    </DivLeft>
                </form>
            </Container>
            <FooterLogin />
        </>
    )
}

export default Login