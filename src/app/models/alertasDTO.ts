
export class UsuarioAlertaCountDTO {
    idUsuario: number = 0;
    nombreUsuario: string = "";   
    total_alertas: number = 0;    
}

// ... Resto de DTOs ...
export class AlertasBusquedaDTO {
    nombreUsuario: string = "";
    nivel_alerta: number = 0;
}
export class UsuarioPromedioAlertasDTO {
    nombreUsuario: string = "";
    promedio_alertas: number = 0; 
}
export class UsuarioAlertaDTO {
    idUsuario: number = 0;
    nombreUsuario: string = ""; // <--- AGREGAR ESTO
    nivelMaximo: number = 0;
}