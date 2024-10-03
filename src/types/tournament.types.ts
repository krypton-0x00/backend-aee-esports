export interface createTournamentBody {
  name: string;
  logo: string;
  orgName: string;
  game: "BGMI" | "VALORANT";
  slots: number;
  unit: number;
  status: "UPCOMING" | "ONGOING" | "COMPLETED";
  visibility: "PUBLIC" | "HIDDEN";
  userId: string;
}
export interface RegisterBody {
 
    email:string,
    password:string,
    confirmPassword:string

  
}