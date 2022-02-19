const Button = ({ text, onClick }) => {
    return (
      <button
        onClick={onClick}
        cursor="pointer"
        className="btn"
      >
        {text}
      </button>
    )
  }

  export default Button