import React, { useEffect, useState } from "react";

interface IMsgDataTypes {
  roomId: string | number;
  user: string;
  msg: string;
  time: string;
}

const ChatPage = ({ socket, username, roomId }: any) => {
  const [currentMsg, setCurrentMsg] = useState("");
  const [chat, setChat] = useState<IMsgDataTypes[]>([]);

  const sendData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (currentMsg !== "") {
      const msgData: IMsgDataTypes = {
        roomId,
        user: username,
        msg: currentMsg,
        time: `${new Date(Date.now()).getHours()}:${new Date(
          Date.now()
        ).getMinutes()}`,
      };
      await socket.emit("send_msg", msgData);
      setCurrentMsg("");
    }
  };

  useEffect(() => {
    socket.on("receive_msg", (data: IMsgDataTypes) => {
      setChat((pre) => [...pre, data]);
    });
  }, [socket]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="border rounded-lg p-4 w-96">
        <div className="mb-4">
          <p>
            Name: <b>{username}</b> and Room Id: <b>{roomId}</b>
          </p>
        </div>
        <div>
          {chat.map(({ user, msg }, key) => (
            <div
              key={key}
              className={`flex items-center ${
                user === username ? "justify-end" : "justify-start"
              }`}
            >
              <span className="rounded-full h-8 w-8 flex items-center justify-center bg-gray-300 text-gray-700">
                {user.charAt(0)}
              </span>
              <h3
                className={`bg-gray-100 p-2 rounded-lg text-black ${
                  user === username ? "ml-2" : "mr-2"
                }`}
              >
                {msg}
              </h3>
            </div>
          ))}
        </div>
        <div>
          <form onSubmit={(e) => sendData(e)} className="flex mt-4">
            <input
              className="border rounded-l-lg p-2 flex-1 text-black"
              type="text"
              value={currentMsg}
              placeholder="Type your message.."
              onChange={(e) => setCurrentMsg(e.target.value)}
            />
            <button className="bg-blue-500 text-white px-4 py-2 rounded-r-lg">
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
