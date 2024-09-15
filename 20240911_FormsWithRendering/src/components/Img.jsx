import styles from "./Img.module.css";

const Img = ({ imgSrc, altName }) => {
	return (
		<img src={imgSrc} alt={altName} className={styles.imgStyles} />
	);
};

export default Img;
