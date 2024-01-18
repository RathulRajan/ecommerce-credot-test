import { Input, Button } from "antd";

import "./info.css";

const Info = () => {
  return (
    <div>
      <div className="final-div">
        <div className="info-div">
          <h2>LET'S STAY IN TOUCH</h2>
          <p>get updates on sales specials and more</p>
          <Input placeholder="Enter your email" />
          <Button
            style={{ width: "100px", height: "30px", background: "#e4007c" }}
            type="primary"
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Info;
