export const ChatroomsSettings = ({ userChatrooms }) => {
  return (
    <section className="flex dash-settings-chatrooms">
      {userChatrooms.map((room) => {
        return <Chatroom room={room} />;
      })}
    </section>
  );
};

const Chatroom = ({ room }) => {
  return (
    <section className="col2-chatroom-con">
      <h5>{room.name}</h5>
    </section>
  );
};
