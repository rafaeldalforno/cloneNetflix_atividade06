import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
import ModalSearch from './ModalSearch';
import api from '../api';

const Left = styled.div`
    position: absolute;
    width: 40px;
    height: 225px;
    background-color: rgba(0, 0, 0, 0.6);
    left: 0;
    z-index: 99;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    cursor: pointer;
    opacity: 0;
    transition: opacity ease 0.5s;

    @media (max-width: 760px) {
        opacity: 1;
    }
`;

const Right = styled.div`
    position: absolute;
    width: 40px;
    height: 225px;
    background-color: rgba(0, 0, 0, 0.6);
    right: 0;
    z-index: 99;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    cursor: pointer;
    opacity: 0;
    transition: opacity ease 0.5s;

    @media (max-width: 760px) {
        opacity: 1;
    }
`;

const Container = styled.div`
    margin-bottom: 30px;
    color: white;

    &:hover ${Left}, &:hover ${Right} {
        opacity: 1;
    }
`;

const Title = styled.h2`
    margin-left: 30px;
`;

const ListArea = styled.div`
    overflow-x: hidden;
    padding-left: 30px;
`;

const List = styled.div`
    transition: all ease 0.5s;
`;

const Item = styled.div`
    display: inline-block;
    width: 150px;
    cursor: pointer;
`;

const Img = styled.img`
    width: 100%;
    transform: scale(0.9);

    &:hover {
        transform: scale(1);
        transition: all ease 0.3s;
    }
`;


const Row = ({ title, items }) => {
    const [scrollX, setScrollX] = useState(-400);
    const [selectedItem, setSelectedItem] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        document.body.style.backgroundColor = '#111';

        return () => {
            document.body.style.backgroundColor = '';
        }
    }, []);

    const handleLeft = () => {
        let x = scrollX + Math.round(window.innerWidth / 2);
        if (x > 0) {
            x = 0;
        }
        setScrollX(x);
    };

    const handleRight = () => {
        let x = scrollX - Math.round(window.innerWidth / 2);
        let listW = items.results.length * 150;
        if ((window.innerWidth - listW) > x) {
            x = (window.innerWidth - listW) - 60;
        }
        setScrollX(x);
    };

    const handleItemClick = async (item) => {
        const type = item.media_type || (item.first_air_date ? 'tv' : 'movie');
        const detailedItem = await api.getMovieInfo(item.id, type);

        setSelectedItem(detailedItem);
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
        setSelectedItem(null);
    };

    return (
        <>
            <Container>
                <Title>{title}</Title>
                <Left onClick={handleLeft}>
                    <FaAngleLeft style={{ fontSize: 50 }} />
                </Left>
                <Right onClick={handleRight}>
                    <FaAngleRight style={{ fontSize: 50 }} />
                </Right>
                <ListArea>
                    <List style={{
                        marginLeft: scrollX,
                        width: items.results.length * 150,
                    }}>
                        {items.results?.length > 0 && items.results.map((item, key) => (
                            <Item key={key} onClick={() => handleItemClick(item)}>
                                <Img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt={item.original_title} />
                            </Item>
                        ))}
                    </List>
                </ListArea>
            </Container>
            {modalVisible && (
                <ModalSearch
                    item={selectedItem}
                    isVisible={modalVisible}
                    onClose={handleCloseModal}
                /> 
            )}
        </>
    )

}

export default Row