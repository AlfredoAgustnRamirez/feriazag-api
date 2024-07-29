import { HttpInterceptorFn } from "@angular/common/http";
import { SESSION } from "../../../share/constants/session.constant";
import { Session } from "../interfaces/user.interface";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    // Obtener el valor del localStorage una sola vez
    const localStorageItem = localStorage.getItem(SESSION.localStorage);

    // Inicializar token como vacío
    let token = '';

    // Verificar si el item existe y parsearlo
    if (localStorageItem) {
        try {
            const session: Session = JSON.parse(localStorageItem);
            token = session.token || ''; // Asegurarse de que token tenga un valor vacío si no está presente
        } catch (error) {
            console.error('Error parsing session from localStorage:', error);
        }
    }

    // Clonar la solicitud y agregar el encabezado de autorización si hay un token
    const autReq = req.clone({
        setHeaders: {
            Authorization: token ? `Bearer ${token}` : ''
        }
    });

    return next(autReq);
}
