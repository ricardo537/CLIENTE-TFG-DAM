export class EventCreationDTO {
    name: string;
    description: string;
    address: string;
    startDate: string;
    endDate: string;
    type: string;
    sport: string;
    minParticipants: number;
    maxParticipants: number;
    price: number;
    gender: string;
    typeParticipant: string;

    constructor (name:string, description:string, address:string, startDate:string, endDate:string, type:string, sport:string, minParticipants:number, maxParticipants:number, price:number, gender:string, typeParticipant:string) {
        this.name = name;
        this.description = description;
        this.address = address;
        this.startDate = startDate;
        this.endDate = endDate;
        this.type = type;
        this.sport = sport;
        this.minParticipants = minParticipants;
        this.maxParticipants = maxParticipants;
        this.price = price;
        this.gender = gender;
        this.typeParticipant = typeParticipant;
    }

    public static fromJSON(json: any): EventCreationDTO {
        return new EventCreationDTO(json.name, json.description, json.address, json.startDate, json.endDate, json.type, json.sport, json.minParticipants, json.maxParticipants, json.price, json.gender, json.typeParticipant);
    }
}