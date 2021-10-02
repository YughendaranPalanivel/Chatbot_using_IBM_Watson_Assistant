import './Message.css';

const Message = (props) => {
    return(
        <div style={props.isBot ? {justifyContent: 'flex-start'}:{justifyContent: 'flex-end'}} className="messageContainer">
            <div className="message-box">{props.message}</div>
        </div>
    );
}

export default Message;