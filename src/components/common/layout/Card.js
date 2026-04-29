function Card({ title, value }) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow">
      <h3 className="text-gray-500">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
      
    </div>

    
    
  );
}

export default Card;