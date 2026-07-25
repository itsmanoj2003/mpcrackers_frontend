import React, { useEffect, useRef, useState } from 'react'
import { useCart } from "../Components/CartContext";



import './Crackers.css'
import crackers from '../Components/assets/crackers.png'
import crackers2 from '../Components/assets/crackers2.png'
import axios from 'axios'
export default function Crackers() {

    const categories = ['Bomb', 'Sparkles', 'Flower Pots', 'Rockets', 'Ground Chakkars', 'Gift Boxes', 'Fancy Crackers']

    const [filter, setFilter] = useState(false)
    function handleFilter() {
        setFilter(!filter)
    }

    // Outside Click
    const menuRef = useRef(null);
    useEffect(() => {
        const handleScroll = () => {
            if (filter) {
                setFilter(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [filter]);




    const [crackdata, setCrackdata] = useState([])
    const [searhitem, setSearchItem] = useState('')
    const [searchCategory, setSearchCategory] = useState('All')
    useEffect(() => {
        axios.get('http://localhost:3001/mpcrackers/getcrackers')
            .then(res => {
                setCrackdata(res.data)
            })
            .catch(err => {
                console.log(err.response?.data?.message)
            })
    }, [])


    const filterCarackers = crackdata.filter((item) =>
        item.productName.toLowerCase().includes(searhitem.toLowerCase()) &&
        (searchCategory === 'All' || item.category === searchCategory)
    )

    const {cart, addToCart } = useCart();

    return (
        <div className='crcakers-main-container'>

            <div className='crackers-search-container'>
                <div className='crackers-image-conataier'>
                    <img src={crackers2} className='crackers-img' />
                </div>

                <div className='search-filter-container'>
                    <div className='search-field-container'>
                        <input type='text' placeholder='Search Crackers...' className='crackers-search-field' value={searhitem} onChange={(e) => setSearchItem(e.target.value)} />
                        <button className='filter-btn' onClick={handleFilter}><i className="fa-solid fa-filter"></i></button>
                    </div>

                    <div className='filter-options-container'>
                        {filter ?
                            <select className='category-selection' ref={menuRef} value={searchCategory} onChange={(e) => setSearchCategory(e.target.value)}>
                                <option value='All'>All Category</option>
                                {categories.map(x => <option key={x} value={x}>{x}</option>)}
                            </select> : <h3>Explore Our Exclusive Collection of Festival Favorites.</h3>
                        }
                    </div>

                </div>

                <div className='crackers-image-conataier'>
                    <img src={crackers} className='crackers-img' />
                </div>
            </div>


            <div className='crackers-list-container'>
                {filterCarackers.map((item) => {

                    const isInCart = cart.some(
                        cartItem => cartItem._id === item._id
                    );

                    return (

                        <div className="cracker-card" key={item._id}>

                            <div className="cracker-image-container">
                                <img
                                    src={`http://localhost:3001${item.productImage}`}
                                    alt={item.productName}
                                    className="crackers-image"
                                />
                            </div>

                            <p>{item.category}</p>

                            <h3>
                                {item.productName.length > 20
                                    ? item.productName.slice(0, 20) + "..."
                                    : item.productName}
                            </h3>

                            <div className="price-container">
                                <p className="mrp-price">₹{item.mrpPrice}</p>
                                <h4 className="selling-price">₹{item.sellingPrice}</h4>
                                <p className="quantity">Qty: {item.quantity} Pcs</p>
                            </div>

                            <div className="addtocart-btn-container">

                                <button className="addtocart-btn" onClick={() => addToCart(item)}> {isInCart ? "Added to Cart" : "Add to Cart"} </button>

                            </div>

                        </div>

                    );

                })}
            </div>

        </div>
    )
}
