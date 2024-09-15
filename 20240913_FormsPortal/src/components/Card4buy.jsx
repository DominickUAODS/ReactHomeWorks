import { useState } from "react";
import Img from "./Img";
import styles from "./Card4buy.module.css";

const Card = ({ imgSrc, altName, name, originalPrice, discountedPrice, link, initQuantity }) => {
	const [quantity, setQuantity] = useState(initQuantity || 1);

	const handleUp = () => {
		setQuantity(prev => prev + 1);
	};

	const handleDown = () => {
		setQuantity(prev => (prev > 1 ? prev - 1 : 1));
	};

	const totalOriginal = originalPrice * quantity;
	const totalDiscounted = discountedPrice ? discountedPrice * quantity : null;

	return (
		<div className={styles.cardCntr}>
			<div className={styles.mainBody}>
				<Img imgSrc={imgSrc} altName={altName} />
				<a href={link} className={styles.prodName}>{name}</a>
			</div>

			<div className={styles.cardFooter}>
				<div className={styles.quantity}>
					<button className={styles.minusBtn} onClick={handleDown}>-</button>
					<input type="number" className={styles.inputQuantity} value={quantity} readOnly />
					<button className={styles.plusBtn} onClick={handleUp}>+</button>
				</div>

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
			</div>
		</div>
	);
};

export default Card;
