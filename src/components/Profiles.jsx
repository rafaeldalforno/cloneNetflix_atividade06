import { useEffect } from 'react';
import styled from 'styled-components';
import ProfileRed from '../assets/imagens/profileRed.png';
import { RiAddCircleFill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin-top: 12%;

    @media (max-width: 768px) {
        margin-top: 20%;
    }
`;

const Title = styled.h1`
    display: flex;
    align-items: center;
    color: white;
    text-align: center;
    font-size: 4.3em;
    font-weight: 450;

    @media (max-width: 768px) {
        font-size: 3em;
    }
    @media (max-width: 480px) {
        font-size: 2.5em;
    }
`;

const Options = styled.div`
    display: flex;
    align-items: center;
    text-align: center;
`;

const Ul = styled.ul`
    display: flex;
    justify-content: space-around;
    padding: 25px;
    gap: 30px;

    @media (max-width: 768px) {
        flex-direction: column;
        gap: 15px;
    }
`;

const Li = styled.li`
    list-style-type: none;
    text-align: center;
    color: #808080;
    font-size: 1.5em;
    position: relative;

    &:hover {
        cursor: pointer;
        color: white;
    }

    @media (max-width: 768px) {
        font-size: 1.2em;
    }
`;

const Span = styled.span`
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    margin-top: 10px;
`;

const Img = styled.img`
    display: flex;
    width: 200px;
    border-radius: 5px;

    &:hover {
        outline: 3px solid white;
    }

    @media (max-width: 768px) {
        width: 150px;
    }
    @media (max-width: 480px) {
        width: 120px;
    }
`;

const Button = styled.button`
    display: flex;
    flex-direction: column;
    background: none;
    border: none;
    border-radius: 5px;
    padding: 22px;
    font-size: 6.5em;
    text-align: center;

    &:hover {
        cursor: pointer;
        background-color: #d8d6d6;
    }

    @media (max-width: 768px) {
        font-size: 5em;
        padding: 15px;
    }
    @media (max-width: 480px) {
        font-size: 4em;
        padding: 10px;
    }
`;

const CustomButton = styled.button`
    background: none;
    border: 1px solid #808080;
    color: #808080;
    font-size: 1.5em;
    padding: 10px 25px 10px 25px;
    margin-top: 50px;

    &:hover {
        cursor: pointer;
        color: white;
        border: 1px solid white;
    }

    @media (max-width: 768px) {
        font-size: 1.2em;
        padding: 8px 20px;
    }
    @media (max-width: 480px) {
        font-size: 1em;
        padding: 6px 15px;
    }
`;

const Profiles = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/homepage');
    };

    useEffect(() => {
        document.body.style.backgroundColor = '#141414';

        return () => {
            document.body.style.backgroundColor = '';
        }
    }, []);

    return (
        <Container>
            <Title>Quem está assistindo?</Title>
            <Options>
                <Ul>
                    <Li><a onClick={() => handleClick()}><Img src={ProfileRed}/></a><Span>Rafael Dal Forno</Span></Li>
                    <Li><Button><RiAddCircleFill color='#808080' /></Button><Span>Adicionar perfil</Span></Li>
                </Ul>
            </Options>
            <CustomButton>Gerenciar Perfis</CustomButton>
        </Container>
    )
}

export default Profiles