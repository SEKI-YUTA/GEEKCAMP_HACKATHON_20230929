
export const ExchangeHost = ():string => {
    if (window.location.hostname === 'localhost') {
        return 'localhost'
    }
    return import.meta.env.VITE_HOST_IP ? import.meta.env.VITE_HOST_IP : 'localhost'
}