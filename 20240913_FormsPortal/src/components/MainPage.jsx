import { useState } from "react";
import Card from "./Card";
import Cart from "./Cart";
import styles from "./MainPage.module.css";
import DBdata from "../models/goods.json";

const MainPage = () => {
	const [cartItems, setCartItems] = useState([]);
	const [isCartOpen, setIsCartOpen] = useState(false);

	const handleAddToCart = (product) => {
		setCartItems((prevItems) => {
			const existingItem = prevItems.find((item) => item.name === product.name);
			if (existingItem) {
				return prevItems.map((item) =>
					item.name === product.name ? { ...item, quantity: item.quantity + 1 } : item
				);
			} else {
				return [...prevItems, { ...product, quantity: 1 }];
			}
		});
	};

	const toggleCart = () => {
		setIsCartOpen(!isCartOpen);
	};

	return (
		<div className={styles.pageLayout}>
			<header className={styles.header}>
				<h1>Магазин</h1>
				<button className={styles.cartIcon} onClick={toggleCart}>🛒 ({cartItems.length})</button>
			</header>
			<div className={styles.container}>
				<nav className={styles.nav}>Навигация</nav>
				<main className={styles.content}>
					{DBdata.map(item => (
						<Card key={item.id} {...item} onAddToCart={handleAddToCart} />
					))}
				</main>
			</div>
			{isCartOpen && <Cart items={cartItems} onClose={toggleCart} />}
		</div>
	);
};

export default MainPage;
