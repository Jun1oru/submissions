const Notification = ({ notificationMsg }) => {
    if (notificationMsg.message === null) {
        return null;
    }

    return (
        <div className={notificationMsg.type === "success"
            ? "success" :
            notificationMsg.type === "error"
            ? "error" :
            "notification"
        }>
            {notificationMsg.message}
        </div>
    );
};

export default Notification;