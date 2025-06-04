import React from "react";
import Button from "../commonComponents/button";

export default function CommonCard(props) {
    return (
        <div className="sell-card">
            <div className="sell-card__content">
                <h2 className="sell-card__title">{props.title}</h2>
                <p className="sell-card__desc">
                    {props.desc}
                </p>
            </div>
            <Button 
                text={props.buttonText} 
                className="sell-card__button" 
                onClick={props.onButtonClick} 
            />
        </div>
    );
}