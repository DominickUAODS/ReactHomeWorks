const Button = ({ name, action, color }) => {
	//   const value = "Cancel";
	return (
		<>
			<button style={{ backgroundColor: color }} onClick={action}>
				{name}
			</button>
		</>
	);
};
export default Button;
