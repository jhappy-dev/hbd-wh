import Card from './Card';

function PhotoGrid({ data }) {
  return (
    <div className="photo-grid">
      {data.map((item, index) => (
        <Card
          key={index}
          image={item.thumbnail}
          title={item.title}
          description={item.description}
        />
      ))}
    </div>
  );
}

export default PhotoGrid;
