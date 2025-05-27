export class EventDTO {
    id: string;
    name: string;
    description: string;
    address: string;
    startDate: string;
    endDate: string;
    creationDate: string;
    type: string;
    sport: string;
    minParticipants: number;
    maxParticipants: number;
    price: number;
    gender: string;
    typeParticipant: string;
    creatorName: string;
    participants: number;

    constructor (id:string, name:string, description:string, address:string, startDate:string, endDate:string, creationDate:string, type:string, sport:string, minParticipants:number, maxParticipants:number, price:number, gender:string, typeParticipant:string, creatorName:string, participants:number) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.address = address;
        this.startDate = startDate;
        this.endDate = endDate;
        this.creationDate = creationDate;
        this.type = type;
        this.sport = sport;
        this.minParticipants = minParticipants;
        this.maxParticipants = maxParticipants;
        this.price = price;
        this.gender = gender;
        this.typeParticipant = typeParticipant;
        this.creatorName = creatorName;
        this.participants = participants;
    }
}