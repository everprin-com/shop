import React from "react";

const Stars = ({ setRate, miniRate }) => {
  return (
    <div className={`${miniRate ? "miniRate" : "rate" }`}>
      <input
        type="radio"
        id="star5"
        name="rate"
        value="5"
        {...(!miniRate && { onChange: () => setRate(5) } )}
        defaultChecked
      />
      <label htmlFor="star5" title="Отлично">
        5 stars
      </label>
      <input
        type="radio"
        id="star4"
        name="rate"
        value="4"
        {...(!miniRate && { onChange: () => setRate(4) } )}
      />
      <label htmlFor="star4" title="Хорошо">
        4 stars
      </label>
      <input
        type="radio"
        id="star3"
        name="rate"
        value="3"
        {...(!miniRate && { onChange: () => setRate(3) } )}
      />
      <label htmlFor="star3" title="Удовлетворительно">
        3 stars
      </label>
      <input
        type="radio"
        id="star2"
        name="rate"
        value="2"
        {...(!miniRate && { onChange: () => setRate(2) } )}
      />
      <label htmlFor="star2" title="Не очень">
        2 stars
      </label>
      <input
        type="radio"
        id="star1"
        name="rate"
        value="1"
        {...(!miniRate && { onChange: () => setRate(1) } )}
      />
      <label htmlFor="star1" title="Слабовато">
        1 star
      </label>
    </div>
  );
};

export default Stars;
