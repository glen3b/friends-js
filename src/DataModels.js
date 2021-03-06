class FriendModel {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.events = [];
    }

    clone() {
        let retVal = new FriendModel(this.id, this.name);
        retVal.events = this.events.slice();
        return retVal;
    }

    cloneWithEvent(newEvent) {
        let retVal = this.clone();
        retVal.events.push(newEvent);
        return retVal;
    }
}

class EventModel {
    constructor(personId, desc, date, rating, eventId) {
        // foreign key
        this.personId = personId;

        this.description = desc;
        this.date = date;
        this.rating = rating;
        this.id = eventId;
    }

    clone() {
        let retVal = new EventModel(this.personId, this.description, this.date, this.rating, this.id);
        return retVal;
    }

    cloneWithId(newId) {
        let retVal = this.clone();
        retVal.id = newId;
        return retVal;
    }
}

export { FriendModel, EventModel };