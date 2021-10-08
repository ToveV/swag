import { api_address } from "../../../../utils/http";

export const ChatroomsHome = ({ user, userChatrooms }) => {
  return (
    <section className="flex dash-home-chatrooms">
      {userChatrooms.map((room) => {
        return <Chatroom room={room} />;
      })}

      <form action={api_address + "/create-chatroom"} method="post">
        <input type="text" name="name" id="" placeholder="chatroom name" />
        <input type="text" name="creater" id="" value={user._id} hidden />

        <button type="submit">create</button>
      </form>
    </section>
  );
};

const Chatroom = ({ room }) => {
  return (
    <section className="col2-chatroom-con">
      <div className="flex chatroom-con-title-fav-con">
        <h5>{room.name}</h5>
        <div className="title-fav-con-fav">O</div>
      </div>
      <div className="chatroom-con-mes">latest message</div>
    </section>
  );
};
