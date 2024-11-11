import styled from 'styled-components';
import { FaRegWindowClose } from "react-icons/fa";

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    color: white;
`;

const ModalContent = styled.div`
    background: #333333d6;
    padding: 20px;
    border-radius: 8px;
    max-width: 800px;
    width: 100%;
    position: relative;
    display: flex;
`;

const ModalButton = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    border: none;
    background: transparent;
    font-size: 24px;
    cursor: pointer;
`;

const ModalBody = styled.div`
    display: flex;
    align-items: flex-start;
`;

const ModalPoster = styled.img`
    width: 150px;
    height: auto;
    border-radius: 4px;
    margin-right: 20px;
`;

const ModalDetails = styled.div`
    max-width: 600px;
`;

const ModalSearch = ({ isVisible, onClose, item }) => {
    if (!isVisible || !item) {
        return null;
    }

    console.log(item);

    let genres = [];

    if (item.genres && item.genres.length > 0) {
        for (let i in item.genres) {
            genres.push(item.genres[i].name);
        }
    }

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const date = new Date(dateString).toLocaleDateString('pt-BR', options);

        return date.split('/').join('/');
    }

    const releaseDate = item.release_date || item.first_air_date;

    return (
        <ModalOverlay onClick={onClose}>
            <ModalContent onClick={(event) => event.stopPropagation()}>
                <ModalButton onClick={onClose}><FaRegWindowClose style={{ color: 'white' }} /></ModalButton>
                <ModalBody>
                    <ModalPoster
                        src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
                        alt={item.original_name || item.original_title}
                    />
                    <ModalDetails>
                        <h2>{item.original_name || item.original_title}</h2>
                        <p><strong>Sinopse:</strong> {item.overview}</p>
                        <p><strong>Avaliação:</strong> {item.vote_average}</p>
                        <p><strong>Data de Lançamento:</strong> {releaseDate ? formatDate(releaseDate) : 'Data não disponível'}</p>
                        <p><strong>Gêneros: </strong>{genres.length > 0 ? genres.join(', ') : 'Gêneros não disponíveis'}</p>
                        {item.number_of_seasons && (
                            <p><strong>Temporadas:</strong> {item.number_of_seasons} temporada{item.number_of_seasons !== 1 ? 's' : ''}</p>
                        )}
                        {item.runtime && (
                            <p><strong>Duração:</strong> {item.runtime
                                ? `${item.runtime} minutos`
                                : 'Duração não disponível'}</p>
                        )}
                        <p><strong>Idioma Original: </strong>{item.original_language}</p>
                    </ModalDetails>
                </ModalBody>
            </ModalContent>
        </ModalOverlay>
    )
}

export default ModalSearch