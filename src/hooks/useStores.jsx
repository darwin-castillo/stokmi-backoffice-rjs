import { useCallback, useEffect, useState } from "react"
import { storeService } from "../services/storeService";

export const useStores = () => {
    const [loadingStores, setLoadingStores] = useState(false);
    const [errorStores, setErrorStores] = useState(null);
    const [stores, setStores] = useState([]);
    const DEF_ERROR_MESSAGE = "No se pudieron cargar las tiendas";


    const fetchStores = useCallback(async () => {
        try {

            setLoadingStores(true)
            const stores = await storeService.getAllStores();
            console.log("tiendas ", stores)

            if (stores) {
                setStores(stores)
            }
            else
                throw new Error(DEF_ERROR_MESSAGE)

            setLoadingStores(false)

        }
        catch (err) {
            setLoadingStores(false)
            setErrorStores(err.message || DEF_ERROR_MESSAGE)
        }


    }
        , [])

    useEffect(() => {
        fetchStores();
    }, [fetchStores]);

    return { loadingStores, errorStores, stores, refresh: fetchStores };

}