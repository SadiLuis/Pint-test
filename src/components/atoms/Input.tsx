
const Inputs = ({ type, name, placeholder, value, onChange }) => {
  return (
    <input
    type={type}
    name={name}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
      className="w-full border border-gray-300 text-lg text-gray-400 bg-gray-200 rounded-md p-4 shadow-lg mb-4 focus:outline-none focus:border-red-500 focus:ring focus:ring-red-500"
    />
  );
};

export default Inputs;
