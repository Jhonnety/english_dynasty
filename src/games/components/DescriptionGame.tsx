import { useLocation } from "react-router-dom";

export const DescriptionGame = () => {

    const location = useLocation();
    const pathname = location.pathname;
    const parts = pathname.split('/');
    const lastPart = parts[parts.length - 1];
    return (
        <div>{JSON.stringify(lastPart)}</div>
    )
}
