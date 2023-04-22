import '../index.css';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import api from '../utils/Api';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmDeletePopup from './ConfirmDeletePopup';
import SignUp from './SignUp';
import SignIn from './SignIn';
import ProtectedRouteElement from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import { useState, useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { tokencheck, authorize, register } from '../utils/Auth';



function App() {
  // States
  // boolean
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] = useState(false);
  const [isApiProcessing, setIsApiProcessing] = useState(false);
  const [isloggedIn, setIsloggedIn] = useState(false);
  const [isToolTipOpened, setIsToolTipOpened] = useState(false);
  const [isAuthActionDone, setIsAuthActionDone] = useState(false);
  const [isBurgerOpened, setIsBurgerOpened] = useState(false);
  const isSomePopupOpen = isEditProfilePopupOpen || isAddPlacePopupOpen || isEditAvatarPopupOpen || isImagePopupOpen || isConfirmDeletePopupOpen;
  // object
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [cardForRemove, setCardForRemove] = useState({});
  // string
  const [emailAccount, setEmailAccount] = useState('');
  const [toolTipMessage, setToolTipMessage] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    handleTokenCheck()
    return () => {
      console.log('handleTokenCheck()')
    }
  }, [])

  function handleCardRemoveClick(card) {
    setIsConfirmDeletePopupOpen(true);
    setCardForRemove(card);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsConfirmDeletePopupOpen(false);
    setIsApiProcessing(false);
    setIsBurgerOpened(false)
  }

  function handleTokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      return tokencheck(jwt).then((res) => {
        setIsloggedIn(true)
        setEmailAccount(res.data.email)
      })
        .then(() => {
          navigate("/main", { replace: true })
        })
        .catch(err => console.log(err))
    }
  }

  async function handleLogin(password, email) {
    return authorize(password, email)
      .then((res) => {
        if (res.token) {
          setEmailAccount(email)
          localStorage.setItem('jwt', res.token);
          setIsloggedIn(true)
          navigate('/main', { replace: true })
        }
      })
      .catch(() => {
        setIsToolTipOpened(true)
        setIsAuthActionDone(false)
        setToolTipMessage('Что-то пошло не так! Попробуйте ещё раз')
      })
  }

  async function handleRegistration(password, email) {
    return register(password, email)
      .then((res) => {
        if (res.data.email) {
          navigate('/sign-in', { replace: true })
          setIsAuthActionDone(true);
          setIsToolTipOpened(true);
          setToolTipMessage('Вы успешно зарегистрировались!')
        }
      })
      .catch(() => {
        setIsToolTipOpened(true)
        setIsAuthActionDone(false)
        setToolTipMessage('Что-то пошло не так! Попробуйте ещё раз')
      })
  }

  function handleCardClick(card) {
    setIsImagePopupOpen(true);
    setSelectedCard({
      ...selectedCard,
      name: card.name,
      link: card.link
    });
  }

  function handleCardDelete(e) {
    e.preventDefault();
    setIsApiProcessing(true)
    api.removeCard(cardForRemove._id)
      .then(() => {
        const updatedCards = cards.filter((element) => {
          if (element._id !== cardForRemove._id) {
            return element
          }
        })
        setCards([...updatedCards]);
        setIsConfirmDeletePopupOpen(false);
      })
      .catch(err => console.log(`Упс ${err}`))
      .finally(() => {
        setIsApiProcessing(false)
      })
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    if (isLiked) {
      api.removelikeCard(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch(err => console.log(`Упс ${err}`))
    } else {
      api.addlikeCard(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch(err => console.log(`Упс ${err}`))
    }
  }

  function handleUpdateUser(item) {
    setIsApiProcessing(true)
    api.editProfile(item)
      .then((data) => {
        setCurrentUser({
          ...currentUser,
          ...data
        });
        closeAllPopups();
      })
      .catch(err => console.log(`Упс ${err}`))
      .finally(() => {
        setIsApiProcessing(false)
      })
  }

  function handleUpdateAvatar(item) {
    setIsApiProcessing(true)
    api.editAvatar(item)
      .then((data) => {
        setCurrentUser({ ...currentUser, ...data });
        closeAllPopups();
      })
      .catch(err => console.log(`Упс ${err}`))
      .finally(() => {
        setIsApiProcessing(false)
      })
  }

  function goRegistration() {
    navigate('/sign-up', { replace: true });
  }

  function goExit() {
    localStorage.removeItem('jwt');
    setIsloggedIn(false) // --- крашится при смене стейта на false 
    navigate('/', { replace: true });
    console.log('ok')
  }

  function goEnter() {
    navigate('/sign-in', { replace: true });
  }

  function openBurger() {
    setIsBurgerOpened(true)
    document.querySelector('.burger').classList.add('burger_opened');
  }

 async function handleAddPlaceSubmit(item) {
    setIsApiProcessing(true)
    return api.addCard(item)
      .then((data) => {
        setCards([
          data,
          ...cards
        ]);
        closeAllPopups();
      })
      .catch(err => console.log(`Упс ${err}`))
      .finally(() => {
        setIsApiProcessing(false)
      })
  }

  useEffect(() => {
    if (isloggedIn) {
      return api.getProfile()
        .then((data) => {
          setCurrentUser({
            ...currentUser,
            ...data
          });
        })
        .catch(err => console.log(`Component Main get ${err}`))
    } return () => {
      console.log('api.getProfile()')
    }

  }, [isloggedIn]);

  useEffect(() => {
    if (isloggedIn) {
      return api.getInitialCard()
        .then((data) => {
          setCards([...cards, ...data]);
        }).catch(err => console.log(`Component Main get ${err}`))
    } return () => {
      console.log('api.getInitialCard()')
    }
  }, [isloggedIn]);

  useEffect(() => {
    function closeByEscape(e) {
      if (e.key === "Escape") {
        closeAllPopups();
      }
    }
    if (isSomePopupOpen) {
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isSomePopupOpen])




  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser} >

        <Header
          onClose={closeAllPopups}
          isBurgerOpened={isBurgerOpened}
          handleCloseBurger={closeAllPopups}
          handleOpenBurger={openBurger}
          toEnter={goEnter}
          toRegistration={goRegistration}
          toExit={goExit}
          isLoggedIn={isloggedIn}
          email={emailAccount} />

        <Routes>

          <Route path='/' element={isloggedIn ? <Navigate to="/main" replace /> : <Navigate to="/sign-in" replace />} />

          <Route path='/sign-up' element={<SignUp onRegistr={handleRegistration} />} />

          <Route path='/sign-in' element={<SignIn onLogin={handleLogin} />} />

          <Route path="/main" element={

            <ProtectedRouteElement
              element={Main}
              cards={cards}
              onCardDelete={handleCardRemoveClick}
              onCardLike={handleCardLike}
              onCardClick={handleCardClick}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              loggedIn={isloggedIn} />} />

        </Routes>

        <Footer />

        <ImagePopup
          isApiProcessing={isApiProcessing}
          isOpened={isImagePopupOpen}
          onClose={closeAllPopups}
          onCardClick={handleCardClick}
          card={selectedCard} />

        <EditProfilePopup
          isApiProcessing={isApiProcessing}
          onUpdateUser={handleUpdateUser}
          isOpened={isEditProfilePopupOpen}
          onClose={closeAllPopups} />

        <AddPlacePopup
          isApiProcessing={isApiProcessing}
          onAddPlace={handleAddPlaceSubmit}
          isOpened={isAddPlacePopupOpen}
          onClose={closeAllPopups} />

        <EditAvatarPopup
          isApiProcessing={isApiProcessing}
          onUpdateAvatar={handleUpdateAvatar}
          isOpened={isEditAvatarPopupOpen}
          onClose={closeAllPopups} />

        <ConfirmDeletePopup
          isApiProcessing={isApiProcessing}
          isOpened={isConfirmDeletePopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleCardDelete} />

        <InfoTooltip
          onClose={() => { setIsToolTipOpened(false) }}
          title={isAuthActionDone}
          message={toolTipMessage}
          isOpened={isToolTipOpened} />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
