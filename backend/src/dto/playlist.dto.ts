export interface CreatePlaylistDTO {
    name : string
    description?: string
    songsId: string[]

}

export interface UpdatePlaylistDTO {
    name?: string,
    description?: string,
    songsId?: string[]
}
