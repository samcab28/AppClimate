let latVar: string = "";
let latLong: string = "";

function constructUrl(): string {
    console.log(`NUEVO NUEVO NUEVO NUEVO https://api.open-meteo.com/v1/forecast?latitude=${latVar}&longitude=${latLong}&current=wind_speed_10m&hourly=uv_index,uv_index_clear_sky,is_day&timezone=GMT`);
    return `https://api.open-meteo.com/v1/forecast?latitude=${latVar}&longitude=${latLong}&current=wind_speed_10m&hourly=uv_index,uv_index_clear_sky,is_day&timezone=GMT`;
}

export function GetUrlDefault(): string {
    return constructUrl();
}

export function ChangeUbication(newValorLat: string, newValorLong: string): void {
    latVar = newValorLat;
    latLong = newValorLong;

    constructUrl();
}


