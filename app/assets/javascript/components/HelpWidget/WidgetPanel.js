import React, { useState } from "react";
import CallBack from "./CallBack";
import SendMessage from "./SendMessage";

export default function WidgetPanel() {
  const [widgetStatus, setWidgetStatus] = useState(true);

  const sendQuestion = data => {
    fetch("/messagestoadministrators", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messagestoadministrator: {
          ...data
        }
      })
    });
  };

  return (
    <div>
      <CallBack
        sendQuestion={sendQuestion}
        setWidgetStatus={setWidgetStatus}
        widgetStatus={widgetStatus}
      />
      <SendMessage
        sendQuestion={sendQuestion}
        setWidgetStatus={setWidgetStatus}
        widgetStatus={widgetStatus}
      />
    </div>
  );
}
