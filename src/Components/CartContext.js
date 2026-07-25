import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {

    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem("crackersCart");
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem("crackersCart", JSON.stringify(cart));
    }, [cart]);


    const addToCart = (product) => {
        setCart((prevCart) => {

            const existingItem = prevCart.find(
                (item) => item._id === product._id
            );

            if (existingItem) {
                return prevCart.map((item) =>
                    item._id === product._id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }

            return [...prevCart, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (productId, removeAll = false) => {

        setCart((prevCart) => {

            if (removeAll) {
                return prevCart.filter(
                    (item) => item._id !== productId
                );
            }

            return prevCart
                .map((item) =>
                    item._id === productId
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
                .filter((item) => item.quantity > 0);
        });
    };

    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                clearCart
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);