import { api_address } from "../../../../utils/http";

export const ChatHome = ({ user, activeChatroom }) => {
  return (
    <section className="flex height100 col3-chat-con">
      <section className="flex chat-con-top">
        <div className="flex top-userinfo">
          <div className="userinfo-avatar">ava</div>
          <div className="userinfo-name">{user.name}</div>
          <div>{activeChatroom.name}</div>
        </div>
        <div className="flex top-settings">
          <div className="userinfo-avatar">...</div>
        </div>
      </section>
      <section className="height100 chat-con-mid">
        {activeChatroom.messages.map((m) => {
          return <div>ett message</div>;
        })}
      </section>
      <section className="chat-con-bot">
        <form action={api_address + "/create-message"} method="post">
          <input type="text" name="text" id="" placeholder="write message" />
          <input
            type="text"
            name="chatroom"
            value={activeChatroom._id}
            hidden
          />
          <input type="text" name="sender" value={user._id} hidden />
          {/* <input type="text" name="time" value="13.37" hidden /> */}
          <button type="submit">send</button>
        </form>
      </section>
    </section>
  );
};
