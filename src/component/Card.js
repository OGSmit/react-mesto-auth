import {useContext} from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {

  const userInfo = useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === userInfo._id;
  const isLiked = props.card.likes.some(i => i._id === userInfo._id);

  function handleCardClick() {
    props.onCardClick(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card)
  }

  function handleLikeClick() {
    props.onCardLike(props.card)
  }
  
  return (<div className="place-card">
    <img
      src={props.link}
      alt={props.name}
      className="place-card__image"
      onClick={handleCardClick}
    />
    <p className="place-card__author">by {props.card.owner.name}</p>
    <button className={isOwn? "place-card__buttons-delete" : "place-card__buttons-delete place-card__buttons-hidden" } onClick={handleDeleteClick} type="button" />
    <div className="place-card__container">
      <h2 className="place-card__subtitle">{props.name}</h2>
      <div className="place-card__like-container">
        <button onClick={handleLikeClick} className={isLiked? "place-card__buttons-like place-card__buttons-like_active" : "place-card__buttons-like"} type="button" />
        <p className="place-card__like-counter">{props.likes.length}</p>
      </div>
    </div>
  </div>)
}

export default Card;

// "place-card__author" в place-card.css