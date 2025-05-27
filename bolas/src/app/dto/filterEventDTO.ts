export class FilterEventDTO {
    startDate: string;
    type: string;
    sport: string;
    gender: string;
    typeParticipant: string;

    constructor (startDate:string, type:string, sport:string, gender:string, typeParticipant:string) {
        this.startDate = startDate;
        this.type = type;
        this.sport = sport;
        this.gender = gender;
        this.typeParticipant = typeParticipant;
    }

    public static fromJSON(json: any): FilterEventDTO {
        return new FilterEventDTO(json.startDate, json.type, json.sport, json.gender, json.typeParticipant);
    }

    public static getFilter(): FilterEventDTO {
        const filter = localStorage.getItem("filter");
        if (filter) {
            try {
                return JSON.parse(filter) as FilterEventDTO;
            } catch (error) {
                console.error("Error parsing session data", error);
                return new FilterEventDTO("", "", "", "", "");
            }
        } else {
            return new FilterEventDTO("", "", "", "", "");
        }
    }

    public static setFilter(filter: any): void {
        localStorage.setItem("filter", JSON.stringify(filter));
    }
}