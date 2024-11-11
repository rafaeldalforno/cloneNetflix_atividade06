import styled from 'styled-components';

const CustomFooter = styled.footer`
  text-align: center;
  margin-bottom: 10px;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 600;
  color: white;
`;

function FooterHome() {
    return (
        <CustomFooter>
            Todos os direitos reservados à Netflix
            <br />
            Dados pegos da Api Tmdb Themoviedb.org
        </CustomFooter>
    )
}

export default FooterHome