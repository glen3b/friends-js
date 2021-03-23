class FriendModel {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}

class EventModel {
    constructor(person, desc, date, rating) {
        // foreign key
        this.otherPerson = person;

        this.description = desc;
        this.date = date;
        this.rating = rating;
    }
}

export { FriendModel, EventModel };