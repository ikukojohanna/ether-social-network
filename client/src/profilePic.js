export default function ProfilePic({
    first,
    last,
    imageUrl,
    passDownToggleModal,
}) {
    return (
        <div>
            <img
                className="profile-pic"
                src={imageUrl || "/default.png"}
                alt={first + last}
                onClick={() => passDownToggleModal()}
            />
        </div>
    );
}
