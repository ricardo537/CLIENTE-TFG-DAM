import { StatsDSDTO } from "./statsDTO";

export class ProfileDTO {
    id: string;
	name: string;
	description: string;
	img: string;
	followers: number;
	follows: number;
	stats: StatsDSDTO;

    constructor (id:string, name:string, description:string, img:string, followers:number, follows:number, stats:StatsDSDTO) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.img = img;
        this.followers = followers;
        this.follows = follows;
        this.stats = stats;
    }

    public static getVoid(): ProfileDTO {
        return new ProfileDTO("","","","",0,0,StatsDSDTO.getVoid());
    }
}