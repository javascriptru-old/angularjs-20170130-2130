import templateUrl from './user-card.html';

const userCard = {
    templateUrl,
    bindings: {
        user: '<',
        selectedUser: '=',
        deleteUser: '&'
    }
};

export default userCard;
