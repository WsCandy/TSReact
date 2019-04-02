import { match } from "react-router";

interface Match<P> extends match<P> {
    readonly query: { [key: string]: string };
}

export default Match;
