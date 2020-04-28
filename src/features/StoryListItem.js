import React from 'react'
import { NavLink } from 'react-router-dom'

const StoryListItem = ({ story }) => {
    const { created_at, title, author, url } = story
    return (
        <NavLink to={{ pathname: "rawJson", state: { story } }}>
            <div className="list-item">
                <p className="list-item-text">{created_at}</p>
                <p className="list-item-text">{title}</p>
                <p className="list-item-text">{author}</p>
                <p className="list-item-text">{url}</p>
            </div>
        </NavLink>
    )
};

export default StoryListItem;