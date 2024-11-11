import { useState } from 'react';
import styled from 'styled-components';
import LogoNetflix from '../assets/imagens/logo.png';
import Profile from '../assets/imagens/profileRed.png';
import { FaSearch } from "react-icons/fa";
import api from '../api';
import ModalSearch from './ModalSearch';
import './HeaderHome.css';

const Logo = styled.div`
    height: 30px;
    display: block;
    float: left;
    margin-top: 15px;
    margin-left: 20px;
`;

const LogoImg = styled.img`
    height: 100%;
`;

const UserImg = styled.img`
    height: 100%;
    display: block;
    float: right;
    margin-top: 15px;
    margin-right: 30px;
    border-radius: 3px;
`;

const User = styled.div`
    height: 35px;
`;

const SearchContainer = styled.div`
    float: right;
    margin-top: 15px;
    margin-right: 30px;
    position: relative;
`;

const HeaderHome = ({ black }) => {
    const [searchVisible, setSearchVisible] = useState(false);
    const [query, setQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);


    const handleSearch = () => {
        setSearchVisible(!searchVisible);
    }

    const handleInput = async (event) => {
        const value = event.target.value;
        setQuery(value);

        if (value.length > 2) {
            const results = await api.searchMoviesOrTv(value);
            setSearchResults(results);
        } else {
            setSearchResults([]);
        }
    }

    const handleItemClick = async (item) => {
        const type = item.media_type || (item.first_air_date ? 'tv' : 'movie');
        const detailedItem = await api.getMovieInfo(item.id, type);

        setSelectedItem(detailedItem);
        setSearchResults([]);
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
        setSelectedItem(null);
    };

    return (
        <header className={black ? 'black' : ''}>
            <Logo>
                <a href='/'>
                    <LogoImg src={LogoNetflix} alt='logo netflix' />
                </a>
            </Logo>
            <SearchContainer>
                <input
                    type='text'
                    className={`search-input ${searchVisible ? 'visible' : ''}`}
                    value={query}
                    onChange={handleInput}
                    placeholder='Search...'
                />
                <FaSearch onClick={handleSearch} style={{ cursor: 'pointer', marginLeft: '20px', color: 'white' }} />
                {searchResults.length > 0 && (
                    <div className='search-results' onClick={handleCloseModal}>
                        <div onClick={(e) => e.stopPropagation()}>
                            {searchResults.map((item, index) => (
                                <div key={index} className='modal-item' onClick={() => handleItemClick(item)}>
                                    <strong>{item.original_name || item.original_title}</strong>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </SearchContainer>
            <User>
                <a href='/'>
                    <UserImg src={Profile} alt='usuário' />
                </a>
            </User>
            <ModalSearch
                isVisible={modalVisible}
                onClose={handleCloseModal}
                item={selectedItem}
            />
        </header>
    )
}

export default HeaderHome