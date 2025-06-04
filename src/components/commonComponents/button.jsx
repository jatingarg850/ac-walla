export default function Button({ text, onClick, className }) {
    return (
        <button className={`button ${className}`} onClick={onClick}>
            {text}
        </button>
    );
}