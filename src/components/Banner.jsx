import { useEffect } from 'react';
import styled from 'styled-components';
import { FaPlay } from "react-icons/fa";

const Featured = styled.section`
    height: 100vh;
    font-family: Arial, Helvetica, sans-serif;
    color: white;

    @media (max-width: 760px) {
        height: 80vh;
    }
`;

const Vertical = styled.div`
    width: inherit;
    height: inherit;
    background: linear-gradient(to top, #111 10%, transparent 90%);
`;

const Horizontal = styled.div`
    width: inherit;
    height: inherit;
    background: linear-gradient(to right, #111 30%, transparent 70%);
    padding-top: 300px;
    padding-left: 30px;
    padding-bottom: 100px;
`;

const Name = styled.div`
    font-size: 60px;
    font-weight: bold;

    @media (max-width: 760px) {
        font-size: 40px;
    }
`;

const Info = styled.div`
    font-size: 18px;
    font-weight: bold;
    margin-top: 15px;

    @media (max-width: 760px) {
        font-size: 16px;
    }
`;

const Points = styled.div`
    display: inline-block;
    color: #46d369;
    margin-right: 15px;
`;

const Year = styled.div`
    display: inline-block;
    margin-right: 15px;
`;

const Seasons = styled.div`
    display: inline-block;
`;

const Description = styled.div`
    display: inline-block;
    margin-top: 15px;
    font: 20px;
    color: #999;
    max-width: 40%;

    @media (max-width: 760px) {
        font-size: 14px;
        max-width: 100%;
        margin-right: 30px;
    }
`;

const DivButtons = styled.div`
    margin-top: 15px;
`;

const Watch = styled.a`
    display: inline-block;
    font-size: 20px;
    font-weight: bold;
    padding: 12px 25px;
    border-radius: 5px;
    text-decoration: none;
    margin-right: 10px;
    background-color: #FFF;
    color: black;
    opacity: 1;
    transition: all ease 0.2;

    &:hover {
        opacity: 0.7;
    }

    @media (max-width: 760px) {
        font-size: 16px;
    }
`;

const MyList = styled.a`
    display: inline-block;
    font-size: 20px;
    font-weight: bold;
    padding: 15px 25px;
    border-radius: 5px;
    text-decoration: none;
    margin-right: 10px;
    background-color: #333;
    color: #FFF;
    opacity: 1;
    transition: all ease 0.2;

    &:hover {
        opacity: 0.7;
    }

    @media (max-width: 760px) {
        font-size: 16px;
    }
`;

const Genres = styled.div`
    margin-top: 15px;
    font-size: 18px;
    color: #999;

    @media (max-width: 760px) {
        font-size: 14px;
    }
`;

const Banner = ({item}) => {

    useEffect(() => {
        document.body.style.backgroundColor = '#111';

        return () => {
            document.body.style.backgroundColor = '';
        }
    }, []);

    let firstDate = new Date(item.first_air_date);
    let genres = [];

    for (let i in item.genres) {
        genres.push(item.genres[i].name);
    }

    let description = item.overview;

    if (description.length > 300) {
        description = description.substring(0, 300) + '...';
    }

    return (
        <Featured style={{
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`
        }}>
            <Vertical>
                <Horizontal>
                    <Name>{item.original_name}</Name>
                    <Info>
                        <Points>{item.vote_average} pontos</Points>
                        <Year>{firstDate.getFullYear()}</Year>
                        <Seasons>{item.number_of_seasons} temporada{item.number_of_seasons !== 1 ? 's' : ''}</Seasons>
                    </Info>
                    <Description>{description}</Description>
                    <DivButtons>
                        <Watch href={`/watch/${item.id}`}><FaPlay />Assistir</Watch>
                        <MyList href={`/list/add/${item.id}`}>+ Minha Lista</MyList>
                    </DivButtons>
                    <Genres><strong>Gêneros: </strong> {genres.join(', ')}</Genres>
                </Horizontal>
            </Vertical>
        </Featured>
    )
}

export default Banner