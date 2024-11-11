import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import api from './api';
import Login from './components/Login';
import Profiles from './components/Profiles';
import HeaderHome from './components/HeaderHome';
import Banner from './components/Banner';
import Row from './components/Row';
import FooterHome from './components/FooterHome';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [movieList, setMovieList] = useState([]);
  const [bannerData, setBannerData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {

    const loadAll = async () => {
      let list = await api.getHomeList();
      setMovieList(list);

      let originals = list.filter(i => i.slug === 'originals');
      let random = Math.floor(Math.random() * (originals[0].items.results.length - 1));
      let chosen = originals[0].items.results[random];
      let chosenInfo = await api.getMovieInfo(chosen.id, 'tv');
      setBannerData(chosenInfo);
    }

    loadAll();
  }, []);

  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 10) {
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    }

    window.addEventListener('scroll', scrollListener);

    return () => {
      window.removeEventListener('scroll', scrollListener);
    }
  }, []);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={
            <Login onLogin={() => setIsLoggedIn(true)} />
          } />
          <Route path="/profiles" element={<ProtectedRoute isLoggedIn={isLoggedIn}>
            <Profiles />
          </ProtectedRoute>
          } />
          <Route path="/homepage" element={<ProtectedRoute isLoggedIn={isLoggedIn}>
            <>
              <div style={{marginTop: '-150px'}}>
                <HeaderHome black={blackHeader} />
                {bannerData && <Banner item={bannerData} />}
                <section>
                  {movieList.map((item, key) => (
                    <Row key={key} title={item.title} items={item.items} />
                  ))}
                </section>
              </div>
              <FooterHome />
            </>
          </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </>
  )
}

export default App
