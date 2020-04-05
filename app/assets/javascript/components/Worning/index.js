import React from "react";

class Worning extends React.PureComponent {
  render() {
    const {
      props: {
        group,
      }
    } = this;
 
    return (
      <div className="worning">
        Этот товар в данный момент отсутствует
      </div>
    );
  }
}

export default Worning
