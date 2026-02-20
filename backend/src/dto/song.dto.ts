
export interface SongCreateDTO {
    name: string,
    artist: string,
    album : string,
    yearPublish : number,
}

export interface SongUpdateDTO {
    name?: string,
    artist?: string,
    album? : string,
    yearPublish?: number,
}