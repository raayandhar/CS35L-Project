import React from 'react';
import { useState } from 'react';
import NavButton from './navbutton.jsx';

const Gallery = () => {
    const [navBarOpen, setNavBarOpen] = useState(false);

    return (
        <div data-nav={navBarOpen.toString()}>
            <h1>Community Gallery here</h1>
            <NavButton setNavBarOpen={setNavBarOpen} navBarOpen={navBarOpen} />
        </div>

    );
}
export default Gallery;