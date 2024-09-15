import { useState } from "react";
import styles from "./Card.module.css";
import Img from "./Img.jsx";

import img1 from "../assets/p445671491.png";
import img2 from "../assets/p356294160.png";
import img3 from "../assets/p369489339.png";
import img4 from "../assets/p32815055.png";

const imageMap = {
	1: img1,
	2: img2,
	3: img3,
	4: img4,
};

const Card = ({ imgSrc, altName, name, originalPrice, discountedPrice, isNew, discountPercent, reviewsCount, rating, link, onAddToCart }) => {
	const [quantity, setQuantity] = useState(1);

	const handleUp = () => {
		setQuantity(prev => prev + 1);
	};

	const handleDown = () => {
		setQuantity(prev => (prev > 1 ? prev - 1 : 1));
	};

	const totalOriginal = originalPrice * quantity;
	const totalDiscounted = discountedPrice ? discountedPrice * quantity : null;

	const handleAddToCart = () => {
		const product = { imgSrc: imageMap[imgSrc], altName, name, originalPrice, discountedPrice, quantity };
		onAddToCart(product);
	};

	return (
		<div className={styles.cardCntr}>

			<div className={styles.mainBody}>
				<div className={styles.imgBtnRight}>
					<div className={styles.labels}>
						{discountPercent > 0 && (<span className={styles.discountLabel}>-{discountPercent}%</span>)}
						{isNew === true && (<span className={styles.newLabel}>Новинка</span>)}
					</div>

					<Img imgSrc={imageMap[imgSrc]} altName={altName} />

					<div className={styles.btnRight}>
						<button className={styles.favBtn}>❤</button>
						<button className={styles.compareBtn}>⚖</button>
					</div>
				</div>

				<a href={link} className={styles.prodName}>{name}</a>
			</div>

			<div className={styles.reviews}>
				{reviewsCount > 0 && rating > 0 ? (
					<span className={styles.rating}>{"★".repeat(rating)} ({reviewsCount} отзывов)</span>
				) : (
					<span className={`${styles.rating} ${styles.noReviews}`}>{"★".repeat(rating)}Отзывов пока нет</span>
				)}
			</div>

			<div className={styles.priceBuy}>
				<div className={styles.priceContainer}>
					{discountedPrice ? (
						<>
							<span className={styles.originalPrice}>{totalOriginal} ₴</span>
							<span className={styles.discountedPrice}>{totalDiscounted} ₴</span>
						</>
					) : (
						<span className={styles.originalPricewoDisc}>{totalOriginal} ₴</span>
					)}
				</div>

				<button className={styles.cartBtn} onClick={handleAddToCart}>🛒</button>
			</div>
		</div>
	);
};

export default Card;
