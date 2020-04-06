import React from "react";
import Dialog from "../Dialog/Dialog";

class DialogSwitcher extends React.PureComponent {
  render() {
    const { dialogs } = this.props;
    if (!dialogs.length) return null;

    return (
      <div>
        {dialogs.map(props => (
          <Dialog key={props.type} {...props} />
        ))}
      </div>
    );
  }
}

export default DialogSwitcher
