import "../../styles/QuickCategories.scss";

const QuickCategories = ({ categories, onSelect }) => {
  return (
    <div className="quick-categories">
      <p className="quick-categories__title">
        Categorías rápidas
      </p>

      <div className="quick-categories__grid">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            className="quick-categories__item"
            onClick={() => onSelect(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickCategories;