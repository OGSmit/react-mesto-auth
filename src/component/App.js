import '../index.css';
import { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/Api';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmDeletePopup from './ConfirmDeletePopup';


function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] = useState(false);
  const [cardForRemove, setCardForRemove] = useState({});
  const [isApiProcessing, setIsApiProcessing] = useState(false);
  const isSomePopupOpen = isEditProfilePopupOpen || isAddPlacePopupOpen || isEditAvatarPopupOpen || isImagePopupOpen || isConfirmDeletePopupOpen;


  function handleCardRemoveClick(card) {
    // Не знал как лучше, но работает ч1
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
    // страховка , finally иногда почему-то не меняет setIsApiProcessing(false)
    setIsApiProcessing(false);
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
    // Не знал как лучше, но работает ч2
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

  function handleAddPlaceSubmit(item) {
    setIsApiProcessing(true)
    api.addCard(item)
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
    api.getProfile()
      .then((data) => {
        setCurrentUser({
          ...currentUser,
          ...data
        });
      })
      .catch(err => console.log(`Component Main get ${err}`))
  }, []);

  useEffect(() => {
    api.getInitialCard()
      .then((data) => {
        setCards([...cards, ...data]);
      }).catch(err => console.log(`Component Main get ${err}`))
  }, []);

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
        <Header />
        <Main onCardDelete={handleCardRemoveClick} cards={cards} onCardLike={handleCardLike} onCardClick={handleCardClick} onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} />
        <Footer />
        <ImagePopup isApiProcessing={isApiProcessing} isOpened={isImagePopupOpen} onClose={closeAllPopups} onCardClick={handleCardClick} card={selectedCard} />
        <EditProfilePopup isApiProcessing={isApiProcessing} onUpdateUser={handleUpdateUser} isOpened={isEditProfilePopupOpen} onClose={closeAllPopups} />
        <AddPlacePopup isApiProcessing={isApiProcessing} onAddPlace={handleAddPlaceSubmit} isOpened={isAddPlacePopupOpen} onClose={closeAllPopups} />
        <EditAvatarPopup isApiProcessing={isApiProcessing} onUpdateAvatar={handleUpdateAvatar} isOpened={isEditAvatarPopupOpen} onClose={closeAllPopups} />
        <ConfirmDeletePopup isApiProcessing={isApiProcessing} isOpened={isConfirmDeletePopupOpen} onClose={closeAllPopups} onSubmit={handleCardDelete} />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
