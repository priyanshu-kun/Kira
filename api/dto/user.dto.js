class UserDto {
    id;
    fullName;
    username;
    email;
    avatar;
    activated;
    constructor(user) {
        this.id = user._id;  
        this.fullName = user.fullName;
        this.username = user.username;
        this.email = user.email;
        this.avatar = user.avatar;
        this.activated = user.activated
    }
}

export default UserDto