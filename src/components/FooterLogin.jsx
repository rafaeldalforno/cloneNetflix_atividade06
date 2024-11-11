import styled from 'styled-components';

const DivFooter = styled.footer`
    position: absolute;
    display: flex;
    align-items: flex-start;
    justify-content: space-evenly;
    background: linear-gradient(rgba(0, 0, 0, 0.795), black);
    width: 100%;
    min-height: 20vh;
    margin-top: 70px;
`;

const Section = styled.section`
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-top: 30px;
`;

const A = styled.a`
    color: #B3B3B3;
`;

const P = styled.p`
    color: #B3B3B3;
`;

const Select = styled.select`
    background-color: black;
    padding: 10px;
    border-radius: 5px;
    color: white;  
`;

function FooterLogin() {
    return (
        <DivFooter>
            <Section>
                <P>Dúvidas? Ligue 0800 591 2876</P>
                <A href="#">Perguntas Frequentes</A>
                <A href="#">Preferência de Cookies</A>
                <Select>
                    <option>Português</option>
                    <option>English</option>
                </Select>
            </Section>
            <Section>
                <A href="#">Central de Ajuda</A>
                <A href="#">Perguntas Frequentes</A>
            </Section>
            <Section>
                <A href="#">Termos de Uso</A>
            </Section>
            <Section>
                <A href="#">Privacidade</A>
            </Section>
        </DivFooter>
    )
}

export default FooterLogin