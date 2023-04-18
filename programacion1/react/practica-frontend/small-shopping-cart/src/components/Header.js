import React from 'react'

const Header = (props) => {
    return (
        <header className="row block center">
            <div>
                <a href="#/">
                    <h1>Small Shopping Cart</h1>
                </a>
            </div>
            <div>
                <a href="#/cart">Cart</a> <a href="#/singin">Sign In</a>
            </div>
        </header>
    )
}

export default Header
