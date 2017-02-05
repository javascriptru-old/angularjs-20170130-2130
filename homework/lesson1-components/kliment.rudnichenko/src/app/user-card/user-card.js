const userCard = {
    templateUrl: 'app/user-card/user-card.html',
    bindings: {
        user: '<',
        selectedUser: '=',
        deleteUser: '&'
    }
};

export default userCard;
