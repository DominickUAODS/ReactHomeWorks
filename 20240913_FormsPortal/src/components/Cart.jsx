import React from "react";
import styles from "./Cart.module.css";
import Card4Buy from "./Card4buy.jsx"

const Cart = ({ items, onClose }) => {
	const totalPrice = items.reduce((acc, item) => acc + (item.discountedPrice || item.originalPrice) * item.quantity, 0);

	return (
		<div className={styles.cartOverlay}>
			<div className={styles.cartContainer}>
				<button className={styles.closeBtn} onClick={onClose}>✖</button>
				<h2>Корзина</h2>
				{items.length === 0 ? (
					<p>Корзина пуста</p>
				) : (
					<div>
						{items.map((item, index) => (<Card4Buy key={index} {...item} />))}
						<p className={styles.totalPrice}>Общая сумма: {totalPrice} ₴</p>
						<button className={styles.checkoutBtn}>Оформить заказ</button>
					</div>
				)}

			</div>
		</div>
	);
};

export default Cart;
