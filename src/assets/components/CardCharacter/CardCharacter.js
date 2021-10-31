import React from "react";

const CardCharacter = props => {
    const { img, imgAlt, characterName, actorName, characterBackground } = props;

    return <div className="card">
        <img src={img} className="card-img-top" alt={imgAlt} />
        <div className="card-body">
            <p className="card-text">{characterName}</p>
            <p className="card-text">{actorName}</p>
            <p className="card-text">{characterBackground}</p>
        </div>
    </div>
}

export default CardCharacter;
