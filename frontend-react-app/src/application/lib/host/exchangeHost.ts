
export const ExchangeHost = ():string => {
    return import.meta.env.VITE_HOST_IP ? import.meta.env.VITE_HOST_IP : 'localhost'
}