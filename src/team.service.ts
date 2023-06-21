export class TeamService {


    public async getTeams(): Promise<any> {
        const response = await fetch("http://localhost:8080/hello");
        return await response.json();
    }

}