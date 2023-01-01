class UserDto {
    id;
    fullName;
    username;
    email;
    avatar;
    activated;
    Banner;
    Bio;
    constructor(user) {
        this.id = user._id;  
        this.fullName = user.fullName;
        this.username = user.username;
        this.email = user.email;
        this.avatar = user.avatar;
        this.activated = user.activated
        this.Banner = user.Banner;
        this.Bio = user.Bio;
    }
}

export default UserDto